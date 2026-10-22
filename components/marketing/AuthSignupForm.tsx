"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { AuthSignupCopy } from "@/types/content";

interface AuthSignupFormProps {
  copy: AuthSignupCopy;
}

export function AuthSignupForm({ copy }: AuthSignupFormProps) {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const envSignupUrl = process.env.NEXT_PUBLIC_APP_SIGNUP_URL;
  const isDev = process.env.NODE_ENV !== "production";
  const isMissingEnv = !envSignupUrl;

  const selectedPlan = searchParams?.get("plan");
  const selectedBilling = searchParams?.get("billing");

  useEffect(() => {
    setMounted(true);
    if (isMissingEnv) {
      console.error(
        "[auth/signup] NEXT_PUBLIC_APP_SIGNUP_URL environment variable is not defined."
      );
    }
  }, [isMissingEnv]);

  // Build the target signup redirect URL, forwarding ?plan= and ?billing= if present
  const getTargetUrl = () => {
    if (!envSignupUrl) return "#";
    try {
      const url = new URL(envSignupUrl, typeof window !== "undefined" ? window.location.origin : "https://app.lmsdomain.com");
      if (selectedPlan) url.searchParams.set("plan", selectedPlan);
      if (selectedBilling) url.searchParams.set("billing", selectedBilling);
      return url.toString();
    } catch {
      const params = new URLSearchParams();
      if (selectedPlan) params.set("plan", selectedPlan);
      if (selectedBilling) params.set("billing", selectedBilling);
      const qs = params.toString();
      if (qs) {
        const sep = envSignupUrl.includes("?") ? "&" : "?";
        return `${envSignupUrl}${sep}${qs}`;
      }
      return envSignupUrl;
    }
  };

  const targetUrl = mounted ? getTargetUrl() : envSignupUrl || "#";

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

      {/* Selected Plan Indicator Chip */}
      {selectedPlan && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EEE9FF] border border-[#DDD6FE] text-xs font-semibold text-[#7B5CF5]">
          <span>✦ Plan:</span>
          <span className="capitalize">{selectedPlan}</span>
          {selectedBilling && (
            <span className="text-[#6B6F76] font-normal">({selectedBilling})</span>
          )}
        </div>
      )}

      {/* Mode A Primary Action */}
      <div className="pt-2 space-y-4">
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
                Missing NEXT_PUBLIC_APP_SIGNUP_URL
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

        {/* Terms and Privacy note */}
        {copy.termsNote && (
          <p className="text-xs text-[#8F94A0] text-center leading-relaxed">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-[#6B6F76] underline hover:text-[#161616]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#6B6F76] underline hover:text-[#161616]">
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>

      {/* Switch to Login Prompt */}
      <div className="pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-[#6B6F76]">
          {copy.loginPrompt}{" "}
          <Link
            href="/login"
            className="text-[#7B5CF5] font-semibold hover:underline cursor-pointer"
          >
            {copy.loginLinkLabel}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default AuthSignupForm;
