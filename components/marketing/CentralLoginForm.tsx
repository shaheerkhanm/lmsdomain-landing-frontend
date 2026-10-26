"use client";

// Central admin login (docs/central-login-api.md). Rendered by /login only when
// getCentralLoginConfig() is set; otherwise /login keeps AuthLoginForm.
//
// Everything the API returns (tokens, the academy list) and the password live
// in component state only: never logged, stored, put in a URL or sent elsewhere.

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { AuthLoginCopy } from "@/types/content";
import {
  centralErrorMessage,
  clearHandoffForms,
  goToAcademy,
  login,
  select,
  serviceUnavailable,
  type CentralAcademy,
  type CentralLoginError,
  type CentralRedirect,
  type CentralRedirectResponse,
} from "@/lib/auth/central-login";
import { useRecaptcha } from "./useRecaptcha";

const DEFAULT_ADMIN_NOTE = "Not an admin? Log in on your academy's site.";
const DEFAULT_SUBMIT_LABEL = "Sign in";

interface CentralLoginFormProps {
  copy: AuthLoginCopy;
  centralUrl: string;
  recaptchaSiteKey: string;
}

type View =
  | { name: "form" }
  | { name: "choose"; selectionToken: string; expiresIn: number; academies: CentralAcademy[] }
  | { name: "handoff"; redirect: CentralRedirect; academyName?: string };

const inputClass = (hasError: boolean) =>
  `w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
    hasError ? "border-red-500 ring-2 ring-red-100" : ""
  }`;

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5CF5] focus-visible:ring-offset-2";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? "")
    .join("")
    .toUpperCase();
}

function AcademyAvatar({ academy }: { academy: CentralAcademy }) {
  const [failed, setFailed] = useState(false);

  if (academy.logo_url && !failed) {
    return (
      <img
        src={academy.logo_url}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="size-10 shrink-0 rounded-full object-cover bg-[#F4F5F7] border border-[#ECEDEF]"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-10 shrink-0 rounded-full bg-[#EEEAFE] text-[#5B3FD9] text-sm font-semibold flex items-center justify-center"
    >
      {initials(academy.name)}
    </span>
  );
}

export function CentralLoginForm({ copy, centralUrl, recaptchaSiteKey }: CentralLoginFormProps) {
  const shouldReduceMotion = useReducedMotion();

  const [view, setView] = useState<View>({ name: "form" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [choosingId, setChoosingId] = useState<string | null>(null);
  const [error, setError] = useState<CentralLoginError | null>(null);
  const [errorSeq, setErrorSeq] = useState(0);

  // Synchronous guard: state updates are too slow to stop a fast double click.
  const inFlight = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const academyButtons = useRef<(HTMLButtonElement | null)[]>([]);

  const recaptcha = useRecaptcha(recaptchaSiteKey, () => setError(serviceUnavailable()));
  const resetRecaptcha = recaptcha.reset;

  // ------------------------------------------------------------------ helpers

  // Any error: back to the form, password cleared, fresh reCAPTCHA, email kept.
  const fail = useCallback(
    (err: CentralLoginError) => {
      setView({ name: "form" });
      setChoosingId(null);
      setPassword("");
      setShowPassword(false);
      resetRecaptcha();
      setError(err);
      setErrorSeq((n) => n + 1);
    },
    [resetRecaptcha],
  );

  const resetAll = useCallback(() => {
    clearHandoffForms();
    inFlight.current = false;
    setView({ name: "form" });
    setEmail("");
    setPassword("");
    setRemember(false);
    setShowPassword(false);
    setSubmitting(false);
    setChoosingId(null);
    setError(null);
    resetRecaptcha();
  }, [resetRecaptcha]);

  const handOff = useCallback((data: CentralRedirectResponse) => {
    setPassword("");
    setView({ name: "handoff", redirect: data.redirect, academyName: data.academy?.name });
  }, []);

  useEffect(() => {
    if (errorSeq > 0) errorRef.current?.focus();
  }, [errorSeq]);

  // Back from the academy (back-forward cache): never show a stale screen.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) resetAll();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [resetAll]);

  // ------------------------------------------------------------------ view 1

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || recaptcha.state !== "ready") return;

    const recaptchaToken = recaptcha.getToken();
    if (!recaptchaToken) {
      // Checked here before any request; same text as the API's recaptcha_failed
      fail({ code: "recaptcha_failed", message: centralErrorMessage("recaptcha_failed") });
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setError(null);

    try {
      const result = await login(centralUrl, { email, password, remember, recaptchaToken });
      if (!result.ok) return fail(result.error);

      resetRecaptcha();
      if (result.data.status === "redirect") return handOff(result.data);

      setPassword("");
      setView({
        name: "choose",
        selectionToken: result.data.selection_token,
        expiresIn: result.data.expires_in,
        academies: result.data.academies,
      });
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  // ------------------------------------------------------------------ view 2

  const choose = async (academyId: string) => {
    if (view.name !== "choose" || inFlight.current) return;
    inFlight.current = true;
    setChoosingId(academyId);

    try {
      const result = await select(centralUrl, { selectionToken: view.selectionToken, academyId });
      if (!result.ok) return fail(result.error);
      handOff(result.data);
    } finally {
      inFlight.current = false;
    }
  };

  const chooseExpiresIn = view.name === "choose" ? view.expiresIn : null;
  useEffect(() => {
    if (chooseExpiresIn === null) return;
    const timer = setTimeout(
      () => fail({ code: "selection_expired", message: centralErrorMessage("selection_expired") }),
      chooseExpiresIn * 1000,
    );
    return () => clearTimeout(timer);
  }, [chooseExpiresIn, fail]);

  useEffect(() => {
    if (view.name === "choose") academyButtons.current[0]?.focus();
  }, [view.name]);

  const onAcademyKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const buttons = academyButtons.current.filter((b): b is HTMLButtonElement => !!b);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index === -1) return;

    const last = buttons.length - 1;
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    buttons[next].focus();
  };

  // ------------------------------------------------------------------ view 3

  const handoffRedirect = view.name === "handoff" ? view.redirect : null;
  useEffect(() => {
    if (!handoffRedirect) return;
    const err = goToAcademy(centralUrl, handoffRedirect);
    if (err) fail(err);
  }, [handoffRedirect, centralUrl, fail]);

  // ------------------------------------------------------------------ render

  const fieldErrors = error?.code === "validation_failed" ? error.fieldErrors ?? {} : {};
  const otherFieldMessages = Object.entries(fieldErrors)
    .filter(([field]) => field !== "email" && field !== "password")
    .flatMap(([, messages]) => messages);
  const submitDisabled = submitting || recaptcha.state !== "ready";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 text-left"
    >
      <Script {...recaptcha.scriptProps} />

      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-tight">
          {copy.title}
        </h1>
        <p className="text-base text-[#6B6F76] leading-relaxed">{copy.subtitle}</p>
      </div>

      {/* View 1: sign-in form (kept mounted so the reCAPTCHA widget survives view changes) */}
      <form onSubmit={onSubmit} hidden={view.name !== "form"} className="pt-2 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="central-email" className="block text-sm font-semibold text-[#161616]">
            Email
          </label>
          <input
            id="central-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "central-email-error" : undefined}
            className={inputClass(!!fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p id="central-email-error" className="text-xs text-red-600">
              {fieldErrors.email.join(" ")}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="central-password" className="block text-sm font-semibold text-[#161616]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className={`text-xs text-[#6B6F76] hover:text-[#161616] font-medium transition-colors rounded ${focusRing}`}
            >
              {copy.forgotLabel || "Forgot password?"}
            </Link>
          </div>
          <div className="relative">
            <input
              id="central-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={fieldErrors.password ? true : undefined}
              aria-describedby={fieldErrors.password ? "central-password-error" : undefined}
              className={`${inputClass(!!fieldErrors.password)} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 size-9 rounded-lg flex items-center justify-center text-[#6B6F76] hover:text-[#161616] cursor-pointer ${focusRing}`}
            >
              {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p id="central-password-error" className="text-xs text-red-600">
              {fieldErrors.password.join(" ")}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2.5 text-sm text-[#161616] cursor-pointer select-none w-fit">
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded border-[#D5D7DC] accent-[#161616] cursor-pointer"
          />
          Remember me
        </label>

        <div ref={recaptcha.containerRef} className="min-h-[78px]" />

        {error && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <p>{error.message}</p>
            {otherFieldMessages.length > 0 && (
              <ul className="mt-1 list-disc pl-5">
                {otherFieldMessages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={submitDisabled}
          className={`w-full h-[48px] rounded-xl bg-[#161616] hover:bg-black text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs hover:shadow-md cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100 ${focusRing}`}
        >
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {submitting ? "Signing in…" : copy.centralSubmitLabel || DEFAULT_SUBMIT_LABEL}
        </button>

        <p className="text-xs text-[#8F94A0] text-center">{copy.adminNote || DEFAULT_ADMIN_NOTE}</p>
      </form>

      {/* View 2: academy picker */}
      {view.name === "choose" && (
        <div className="pt-2 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#161616]">Choose an academy</h2>
            <p className="text-sm text-[#6B6F76]">Your email is an admin in more than one academy.</p>
          </div>

          <ul className="space-y-2.5" onKeyDown={onAcademyKeyDown}>
            {view.academies.map((academy, i) => (
              <li key={academy.id}>
                <button
                  type="button"
                  ref={(el) => {
                    academyButtons.current[i] = el;
                  }}
                  onClick={() => choose(academy.id)}
                  disabled={choosingId !== null}
                  aria-busy={choosingId === academy.id || undefined}
                  className={`w-full flex items-center gap-3 rounded-xl border border-[#ECEDEF] bg-white px-3.5 py-3 text-left transition-all hover:border-[#D5D7DC] hover:bg-[#F9FAFB] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
                >
                  <AcademyAvatar academy={academy} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#161616] truncate">{academy.name}</span>
                    <span className="block text-xs text-[#6B6F76] truncate">{academy.domain}</span>
                  </span>
                  {choosingId === academy.id && (
                    <Loader2 className="size-4 shrink-0 animate-spin text-[#6B6F76]" aria-hidden="true" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              type="button"
              onClick={resetAll}
              className={`text-sm text-[#7B5CF5] font-semibold hover:underline cursor-pointer rounded ${focusRing}`}
            >
              Use a different account
            </button>
          </div>
        </div>
      )}

      {/* View 3: handoff (live region stays mounted so the message is announced) */}
      <div aria-live="polite">
        {view.name === "handoff" && (
          <div className="pt-6 pb-2 flex flex-col items-center gap-3 text-center">
            <Loader2 className="size-6 animate-spin text-[#161616]" aria-hidden="true" />
            <p className="text-base font-semibold text-[#161616]">
              {view.academyName ? `Taking you to ${view.academyName}…` : "Taking you to your academy…"}
            </p>
          </div>
        )}
      </div>

      {/* Switch to Signup Prompt */}
      {view.name === "form" && (
        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-[#6B6F76]">
            {copy.signupPrompt}{" "}
            <Link href="/signup" className="text-[#7B5CF5] font-semibold hover:underline cursor-pointer">
              {copy.signupLinkLabel}
            </Link>
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CentralLoginForm;
