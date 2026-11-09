"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import BrandLogo from "@/components/brand/BrandLogo";

export const COUNTRY_CODES = [
  { code: "+91", label: "+91 (IN)", digits: "91" },
  { code: "+1", label: "+1 (US/CA)", digits: "1" },
  { code: "+44", label: "+44 (UK)", digits: "44" },
  { code: "+61", label: "+61 (AU)", digits: "61" },
  { code: "+62", label: "+62 (ID)", digits: "62" },
  { code: "+65", label: "+65 (SG)", digits: "65" },
  { code: "+971", label: "+971 (AE)", digits: "971" },
  { code: "+977", label: "+977 (NP)", digits: "977" },
  { code: "+880", label: "+880 (BD)", digits: "880" },
  { code: "+94", label: "+94 (LK)", digits: "94" },
  { code: "+60", label: "+60 (MY)", digits: "60" },
];

export const LEARNER_OPTIONS = ["<100", "100–500", "500–2,000", "2,000+"] as const;

export interface DemoFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  organizationName: string;
  learners: string;
  message?: string;
  website?: string; // Honeypot field
}

export interface DemoFormProps {
  onClose?: () => void;
  initialSubject?: string;
  initialTopic?: string;
  initialPlan?: string;
  initialBilling?: string;
  initialCurrency?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  privacyNote?: string;
  topics?: any[];
  variant?: "modal" | "page";
  className?: string;
}

export function DemoForm({
  onClose,
  initialSubject,
  initialPlan,
  initialBilling,
  initialCurrency,
  submitLabel,
  privacyNote,
  variant = "page",
  className = "",
}: DemoFormProps) {
  const defaultSubmitLabel = variant === "modal" ? "Schedule My Demo" : "Book a 20-minute demo";
  const effectiveSubmitLabel = submitLabel || defaultSubmitLabel;
  const searchParams = useSearchParams();
  const urlPlan = searchParams?.get("plan") || undefined;
  const urlBilling = searchParams?.get("billing") || undefined;
  const urlCurrency = searchParams?.get("currency") || undefined;
  const activePlan = initialPlan || urlPlan;
  const activeBilling = initialBilling || urlBilling;
  const activeCurrency = initialCurrency || urlCurrency;

  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState("there");
  const [networkError, setNetworkError] = useState<string | null>(null);

  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      organizationName: "",
      learners: "",
      message: "",
      website: "",
    },
  });

  // Focus success heading when submission succeeds
  useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus();
    }
  }, [isSubmitted]);

  const onError: SubmitErrorHandler<DemoFormInputs> = (fieldErrors) => {
    const errorKeys = Object.keys(fieldErrors) as (keyof DemoFormInputs)[];
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0];
      const element = document.getElementById(`field-${firstKey}`);
      element?.focus();
    }
  };

  const onSubmit: SubmitHandler<DemoFormInputs> = async (formData) => {
    // Spam Honeypot Check: if filled by a bot, pretend success
    if (formData.website && formData.website.trim().length > 0) {
      setSubmittedFirstName(formData.name.trim().split(/\s+/)[0] || "there");
      setIsSubmitted(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setNetworkError(null);

      const codeDigits = countryCode.replace(/\D/g, "");
      const rawDigits = formData.phoneNumber.replace(/\D/g, "");
      const fullDigits = rawDigits.startsWith(codeDigits) ? rawDigits : `${codeDigits}${rawDigits}`;

      let planMeta = "";
      if (activePlan) {
        planMeta = `Plan: ${activePlan}`;
        if (activeBilling) planMeta += ` (${activeBilling})`;
        if (activeCurrency) planMeta += ` [${activeCurrency.toUpperCase()}]`;
      }

      const combinedMessage = formData.message?.trim()
        ? (planMeta ? `${formData.message.trim()}\n\n${planMeta}` : formData.message.trim())
        : (planMeta || undefined);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: fullDigits,
        organizationName: formData.organizationName.trim(),
        learners: formData.learners,
        message: combinedMessage,
        topic: "Demo",
        plan: activePlan || undefined,
        billing: activeBilling || undefined,
        currency: activeCurrency ? activeCurrency.toUpperCase() : undefined,
        subject: activePlan
          ? `Demo request: ${formData.organizationName.trim()} (${activePlan}${activeBilling ? ` - ${activeBilling}` : ""})`
          : initialSubject || `Demo request: ${formData.organizationName.trim()}`,
        page: typeof window !== "undefined" ? window.location.pathname : "",
        type: 1, // 1 = Request Demo / Contact enquiry
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const response = await res.json().catch(() => null);

      if (res.ok && response && response.success !== false) {
        toast.success("Enquiry submitted successfully! Our team will contact you shortly.", {
          richColors: true,
          duration: 5000,
        });
        const first = formData.name.trim().split(/\s+/)[0] || "there";
        setSubmittedFirstName(first);
        reset();
        setIsSubmitted(true);
      } else {
        const errorMsg =
          response?.message || "Unable to submit enquiry. Please verify your details and retry.";
        setNetworkError(errorMsg);
        toast.error(errorMsg, { richColors: true });
      }
    } catch (err: any) {
      const errorMsg =
        err?.message || "A network error occurred while sending your request. Please try again.";
      setNetworkError(errorMsg);
      toast.error(errorMsg, { richColors: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isModal = variant === "modal";

  const labelClass = isModal
    ? "text-xs font-semibold text-slate-700 uppercase tracking-wider block"
    : "block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider";

  const getInputClass = (hasError: boolean) =>
    isModal
      ? `w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
          hasError
            ? "border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/10"
        }`
      : `w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
          hasError ? "border-red-500 ring-2 ring-red-100" : ""
        }`;

  const getSelectClass = (hasError: boolean) =>
    isModal
      ? `w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none transition appearance-none cursor-pointer ${
          hasError
            ? "border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/10"
        }`
      : `w-full h-[48px] px-3.5 pr-10 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all appearance-none cursor-pointer ${
          hasError ? "border-red-500 ring-2 ring-red-100" : ""
        }`;

  const getTextareaClass = (hasError: boolean) =>
    isModal
      ? `w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition resize-none ${
          hasError
            ? "border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-300 focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/10"
        }`
      : `w-full min-h-[96px] p-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all resize-none ${
          hasError ? "border-red-500 ring-2 ring-red-100" : ""
        }`;

  return (
    <div className={`w-full ${isModal ? "font-urbanist" : "font-urbanist"} ${className}`}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success-panel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="py-10 sm:py-14 text-center flex flex-col items-center justify-center font-urbanist"
            role="status"
            aria-live="polite"
          >
            {/* Success Brand Header */}
            <div className="mb-6 flex justify-center">
              <BrandLogo variant="wordmark" tone="light" height={28} />
            </div>

            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-semibold text-[#161616] tracking-tight focus:outline-none"
            >
              Thanks, {submittedFirstName}.
            </h3>

            <p className="text-sm sm:text-base text-[#6B6F76] mt-3 max-w-[440px] leading-relaxed">
              Our team will email you to fix a 20-minute demo time that suits you.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              {onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all cursor-pointer"
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit, onError)}
            noValidate
            className={isModal ? "space-y-4 text-left" : "space-y-5 text-left"}
          >
            {/* Active Plan Indicator Badge (if ?plan= is present) */}
            {activePlan && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EEE9FF] border border-[#DDD6FE] text-xs font-semibold text-[#7B5CF5]">
                <span>✦ Inquiring about plan:</span>
                <span className="capitalize">{activePlan}</span>
              </div>
            )}

            {/* Network Error Inline Banner */}
            {networkError && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2.5"
              >
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{networkError}</span>
              </div>
            )}

            {/* Spam Honeypot (hidden from screen readers & visual UI) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="field-website">Website</label>
              <input
                id="field-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            {/* 1. Full Name */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-name" className={labelClass}>
                Full Name {isModal ? "*" : <span className="text-red-500">*</span>}
              </label>
              <input
                id="field-name"
                type="text"
                autoComplete="name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "field-name-error" : undefined}
                className={getInputClass(!!errors.name)}
                placeholder="e.g. Sarah Jenkins"
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Enter at least 2 characters" },
                })}
              />
              {errors.name?.message && (
                <span id="field-name-error" role="alert" className="text-xs text-red-600 block mt-1 font-medium">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* 2. Work Email */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-email" className={labelClass}>
                Work Email {isModal ? "*" : <span className="text-red-500">*</span>}
              </label>
              <input
                id="field-email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "field-email-error" : undefined}
                className={getInputClass(!!errors.email)}
                placeholder="sarah@institution.com"
                {...register("email", {
                  required: "Work email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email?.message && (
                <span id="field-email-error" role="alert" className="text-xs text-red-600 block mt-1 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* 3. Phone / WhatsApp */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-phoneNumber" className={labelClass}>
                Phone / WhatsApp {isModal ? "*" : <span className="text-red-500">*</span>}
              </label>
              <div className="flex gap-2">
                <div className="relative shrink-0 w-[110px] sm:w-[125px]">
                  <select
                    id="field-countryCode"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className={getSelectClass(false)}
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B6F76]">
                    <ChevronDown className="size-3.5" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <input
                    id="field-phoneNumber"
                    type="tel"
                    autoComplete="tel-national"
                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                    aria-describedby={errors.phoneNumber ? "field-phoneNumber-error" : undefined}
                    className={getInputClass(!!errors.phoneNumber)}
                    placeholder="98765 43210"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      validate: (val) => {
                        const rawDigits = val.replace(/\D/g, "");
                        const codeDigits = countryCode.replace(/\D/g, "");
                        const totalDigits = rawDigits.startsWith(codeDigits)
                          ? rawDigits
                          : `${codeDigits}${rawDigits}`;
                        return (
                          (totalDigits.length >= 7 && totalDigits.length <= 15) ||
                          "Enter a valid phone number (7–15 digits)"
                        );
                      },
                    })}
                  />
                </div>
              </div>
              {errors.phoneNumber?.message && (
                <span id="field-phoneNumber-error" role="alert" className="text-xs text-red-600 block mt-1 font-medium">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            {/* 4. Academy Name */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-organizationName" className={labelClass}>
                Academy Name {isModal ? "*" : <span className="text-red-500">*</span>}
              </label>
              <input
                id="field-organizationName"
                type="text"
                autoComplete="organization"
                aria-invalid={errors.organizationName ? "true" : "false"}
                aria-describedby={errors.organizationName ? "field-organizationName-error" : undefined}
                className={getInputClass(!!errors.organizationName)}
                placeholder="e.g. Apex Coding Academy"
                {...register("organizationName", {
                  required: "Academy name is required",
                })}
              />
              {errors.organizationName?.message && (
                <span id="field-organizationName-error" role="alert" className="text-xs text-red-600 block mt-1 font-medium">
                  {errors.organizationName.message}
                </span>
              )}
            </div>

            {/* 5. Active Learners */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-learners" className={labelClass}>
                Active Learners {isModal ? "*" : <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <select
                  id="field-learners"
                  aria-invalid={errors.learners ? "true" : "false"}
                  aria-describedby={errors.learners ? "field-learners-error" : undefined}
                  className={getSelectClass(!!errors.learners)}
                  {...register("learners", {
                    required: "Please select active learner count",
                  })}
                >
                  <option value="">Select learner count</option>
                  {LEARNER_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6B6F76]">
                  <ChevronDown className="size-4" />
                </div>
              </div>
              {errors.learners?.message && (
                <span id="field-learners-error" role="alert" className="text-xs text-red-600 block mt-1 font-medium">
                  {errors.learners.message}
                </span>
              )}
            </div>

            {/* 6. Message (Optional) */}
            <div className={isModal ? "space-y-1" : "space-y-1.5"}>
              <label htmlFor="field-message" className={labelClass}>
                Message <span className="text-xs font-normal text-[#8F94A0] normal-case">(optional)</span>
              </label>
              <textarea
                id="field-message"
                rows={3}
                className={getTextareaClass(false)}
                placeholder="Anything specific you'd like to see in your demo?"
                {...register("message")}
              />
            </div>

            {/* Privacy Note */}
            {privacyNote && (
              <p className="text-xs text-[#8F94A0] leading-relaxed">
                {privacyNote}
              </p>
            )}

            {/* Action Bar */}
            <div className={isModal ? "flex items-center justify-end gap-3 pt-3" : "pt-2 flex items-center justify-end gap-3"}>
              {isModal && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  isModal
                    ? "px-6 py-2.5 text-sm font-semibold text-white bg-[#161616] hover:bg-black rounded-full shadow-sm transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                    : "w-full sm:w-auto h-[48px] px-8 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin shrink-0" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>{effectiveSubmitLabel}</span>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DemoForm;
