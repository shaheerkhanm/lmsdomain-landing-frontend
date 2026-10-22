"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { AuthLoginCopy } from "@/types/content";

interface AuthLoginFormProps {
  copy: AuthLoginCopy;
}

export function AuthLoginForm({ copy }: AuthLoginFormProps) {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const envLoginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL;
  const envForgotUrl = process.env.NEXT_PUBLIC_APP_FORGOT_PASSWORD_URL;
  const isDev = process.env.NODE_ENV !== "production";
  const isMissingEnv = !envLoginUrl;

  useEffect(() => {
    setMounted(true);
    if (isMissingEnv) {
      console.error(
        "[auth/login] NEXT_PUBLIC_APP_LOGIN_URL environment variable is not defined."
      );
    }
  }, [isMissingEnv]);

  // Build the target login redirect URL, forwarding ?redirect= if present
  const getTargetUrl = () => {
    if (!envLoginUrl) return "#";
    const redirect = searchParams?.get("redirect");
    if (!redirect) return envLoginUrl;

    try {
      const url = new URL(envLoginUrl, typeof window !== "undefined" ? window.location.origin : "https://app.lmsdomain.com");
      url.searchParams.set("redirect", redirect);
      return url.toString();
    } catch {
      const sep = envLoginUrl.includes("?") ? "&" : "?";
      return `${envLoginUrl}${sep}redirect=${encodeURIComponent(redirect)}`;
    }
  };

  const targetUrl = mounted ? getTargetUrl() : envLoginUrl || "#";

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 text-left"
    >
      {/* Title & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-tight">
          {copy.title}
        </h1>
        <p className="text-base text-[#6B6F76] leading-relaxed">
          {copy.subtitle}
        </p>
      </div>

      {/* Mode A Primary Action */}
      <div className="pt-4 space-y-4">
        {isMissingEnv ? (
          <div className={isDev ? "p-3 rounded-xl border-2 border-dashed border-red-500 bg-red-50/50 text-center space-y-1.5" : ""}>
            <button
              type="button"
              disabled
              className="w-full h-[48px] rounded-xl bg-slate-200 text-slate-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center"
            >
              {copy.submitLabel}
            </button>
            {isDev && (
              <span className="text-xs text-red-600 block font-mono">
                Missing NEXT_PUBLIC_APP_LOGIN_URL
              </span>
            )}
          </div>
        ) : (
          <a
            href={targetUrl}
            className="w-full h-[48px] rounded-xl bg-[#161616] hover:bg-black text-white font-semibold text-sm flex items-center justify-center transition-all active:scale-[0.98] shadow-xs hover:shadow-md cursor-pointer"
          >
            {copy.submitLabel}
          </a>
        )}

        {/* Forgot Password Link */}
        {copy.forgotLabel && envForgotUrl && (
          <div className="text-center pt-1">
            <a
              href={envForgotUrl}
              className="text-xs text-[#6B6F76] hover:text-[#161616] font-medium transition-colors"
            >
              {copy.forgotLabel}
            </a>
          </div>
        )}
      </div>

      {/* Switch to Signup Prompt */}
      <div className="pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-[#6B6F76]">
          {copy.signupPrompt}{" "}
          <Link
            href="/signup"
            className="text-[#7B5CF5] font-semibold hover:underline cursor-pointer"
          >
            {copy.signupLinkLabel}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default AuthLoginForm;
