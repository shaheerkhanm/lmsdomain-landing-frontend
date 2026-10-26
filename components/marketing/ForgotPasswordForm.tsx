"use client";

// /forgot-password for the central admin login (docs/central-login-api.md,
// "Forgot password"). Each academy resets its own password; the API emails a
// link per academy and always answers "sent" with a message we show as is.

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion, useReducedMotion } from "motion/react";
import { Loader2 } from "lucide-react";
import type { AuthForgotCopy } from "@/types/content";
import {
  centralErrorMessage,
  forgotPassword,
  RESET_ERROR_TEXT,
  serviceUnavailable,
  type CentralLoginError,
} from "@/lib/auth/central-login";
import { useRecaptcha } from "./useRecaptcha";

const FALLBACK: Required<AuthForgotCopy> = {
  title: "Reset your password",
  subtitle:
    "Each academy has its own password. If your email is an admin, we'll email a reset link for each of your academies.",
  submitLabel: "Send reset link",
  backLabel: "Back to log in",
};

interface ForgotPasswordFormProps {
  copy?: AuthForgotCopy;
  centralUrl: string;
  recaptchaSiteKey: string;
}

const inputClass = (hasError: boolean) =>
  `w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
    hasError ? "border-red-500 ring-2 ring-red-100" : ""
  }`;

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5CF5] focus-visible:ring-offset-2";

export function ForgotPasswordForm({ copy, centralUrl, recaptchaSiteKey }: ForgotPasswordFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const text = {
    title: copy?.title || FALLBACK.title,
    subtitle: copy?.subtitle || FALLBACK.subtitle,
    submitLabel: copy?.submitLabel || FALLBACK.submitLabel,
    backLabel: copy?.backLabel || FALLBACK.backLabel,
  };

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [error, setError] = useState<CentralLoginError | null>(null);
  const [errorSeq, setErrorSeq] = useState(0);

  const inFlight = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLParagraphElement>(null);

  const recaptcha = useRecaptcha(recaptchaSiteKey, () => setError(serviceUnavailable(RESET_ERROR_TEXT)));

  useEffect(() => {
    if (errorSeq > 0) errorRef.current?.focus();
  }, [errorSeq]);

  useEffect(() => {
    if (sentMessage) sentRef.current?.focus();
  }, [sentMessage]);

  // Any error: fresh reCAPTCHA, email kept, focus on the message
  const fail = (err: CentralLoginError) => {
    recaptcha.reset();
    setError(err);
    setErrorSeq((n) => n + 1);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current || recaptcha.state !== "ready") return;

    const recaptchaToken = recaptcha.getToken();
    if (!recaptchaToken) {
      fail({ code: "recaptcha_failed", message: centralErrorMessage("recaptcha_failed") });
      return;
    }

    inFlight.current = true;
    setSending(true);
    setError(null);

    try {
      const result = await forgotPassword(centralUrl, { email, recaptchaToken });
      if (!result.ok) return fail(result.error);
      setSentMessage(result.data.message);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  const fieldErrors = error?.code === "validation_failed" ? error.fieldErrors ?? {} : {};
  const otherFieldMessages = Object.entries(fieldErrors)
    .filter(([field]) => field !== "email")
    .flatMap(([, messages]) => messages);

  const backLink = (
    <Link
      href="/login"
      className={`inline-flex items-center gap-1.5 text-sm text-[#7B5CF5] font-semibold hover:underline cursor-pointer rounded ${focusRing}`}
    >
      <span aria-hidden="true">←</span>
      {text.backLabel}
    </Link>
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 text-left"
    >
      <Script {...recaptcha.scriptProps} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-tight">{text.title}</h1>
        <p className="text-base text-[#6B6F76] leading-relaxed">{text.subtitle}</p>
      </div>

      {sentMessage !== null && (
        <div className="pt-2 space-y-6">
          <p
            ref={sentRef}
            tabIndex={-1}
            role="status"
            className="rounded-xl border border-[#ECEDEF] bg-[#F9FAFB] px-4 py-3.5 text-sm text-[#161616] leading-relaxed focus:outline-none"
          >
            {sentMessage}
          </p>
          <div className="pt-6 border-t border-slate-100 text-center">{backLink}</div>
        </div>
      )}

      {/* Kept mounted (hidden once sent) so the reCAPTCHA widget isn't torn down */}
      <form onSubmit={onSubmit} hidden={sentMessage !== null} className="pt-2 space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="block text-sm font-semibold text-[#161616]">
            Email
          </label>
          <input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "forgot-email-error" : undefined}
            className={inputClass(!!fieldErrors.email)}
          />
          {fieldErrors.email && (
            <p id="forgot-email-error" className="text-xs text-red-600">
              {fieldErrors.email.join(" ")}
            </p>
          )}
        </div>

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
          disabled={sending || recaptcha.state !== "ready"}
          className={`w-full h-[48px] rounded-xl bg-[#161616] hover:bg-black text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs hover:shadow-md cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100 ${focusRing}`}
        >
          {sending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {text.submitLabel}
        </button>

        <div className="pt-6 border-t border-slate-100 text-center">{backLink}</div>
      </form>
    </motion.div>
  );
}

export default ForgotPasswordForm;
