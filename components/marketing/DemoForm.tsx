"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_CONTACT_TOPICS } from "@/content/contact/page";
import type { ContactTopic } from "@/types/content";

export interface DemoFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  organizationName: string;
  topic: string;
  subject: string;
  website?: string; // Honeypot field
}

export interface DemoFormProps {
  onClose?: () => void;
  initialSubject?: string;
  initialTopic?: string;
  initialPlan?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
  privacyNote?: string;
  topics?: ContactTopic[];
  variant?: "modal" | "page";
  className?: string;
}

export function DemoForm({
  onClose,
  initialSubject,
  initialTopic,
  initialPlan,
  submitLabel,
  successTitle = "Message received",
  successMessage = "Thank you for reaching out. We will review your message and get back to you soon.",
  privacyNote,
  topics = DEFAULT_CONTACT_TOPICS,
  variant = "page",
  className = "",
}: DemoFormProps) {
  const defaultSubmitLabel = variant === "modal" ? "Schedule My Demo" : "Send message";
  const effectiveSubmitLabel = submitLabel || defaultSubmitLabel;
  const searchParams = useSearchParams();
  const urlTopic = searchParams?.get("topic") || undefined;
  const urlPlan = searchParams?.get("plan") || undefined;

  const activeTopic = initialTopic || urlTopic || topics[0]?.label || "Request an Academy Demo";
  const activePlan = initialPlan || urlPlan;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DemoFormInputs>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      organizationName: "",
      topic: activeTopic,
      subject: initialSubject || "",
      website: "",
    },
  });

  // Keep topic synced if URL parameters hydrate
  useEffect(() => {
    if (urlTopic) {
      const match = topics.find(
        (t) => t.id === urlTopic || t.label.toLowerCase().includes(urlTopic.toLowerCase())
      );
      if (match) {
        setValue("topic", match.label);
      }
    }
  }, [urlTopic, topics, setValue]);

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
      setIsSubmitted(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setNetworkError(null);

      const cleanedPhone = formData.phoneNumber.replace(/\D/g, "");

      // Bundle topic, plan, and message into the subject payload for the Enquiry backend
      const subjectParts = [
        variant !== "modal" && formData.topic ? `Topic: ${formData.topic}` : null,
        activePlan ? `Plan: ${activePlan}` : null,
        formData.subject.trim()
          ? variant === "modal"
            ? formData.subject.trim()
            : `Notes: ${formData.subject.trim()}`
          : null,
      ].filter(Boolean);

      const compositeSubject =
        subjectParts.join(" | ") || initialSubject || "Platform Demonstration Request";

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: cleanedPhone,
        organizationName: formData.organizationName.trim(),
        subject: compositeSubject,
        type: 1, // 1 = Request Demo / Contact enquiry
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const response = await res.json().catch(() => null);

      if (res.ok && response && response.success !== false) {
        toast.success("Enquiry submitted successfully! Our specialists will contact you shortly.", {
          richColors: true,
          duration: 5000,
        });
        reset();
        if (variant === "modal" && onClose) {
          onClose();
        } else {
          setIsSubmitted(true);
        }
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

  return (
    <div className={`w-full font-urbanist ${className}`}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success-panel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="py-12 sm:py-16 text-center flex flex-col items-center justify-center"
            role="status"
            aria-live="polite"
          >
            {/* Black Logo Square */}
            <div className="size-14 rounded-2xl bg-[#161616] flex items-center justify-center mb-6 shadow-sm">
              <img
                src="/assets/img/logo/mark-square.svg"
                alt="LMS Domain"
                className="size-8 object-contain"
              />
            </div>

            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-semibold text-[#161616] tracking-tight focus:outline-none"
            >
              {successTitle}
            </h3>

            <p className="text-sm sm:text-base text-[#6B6F76] mt-3 max-w-[440px] leading-relaxed">
              {successMessage}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#161616] text-white text-sm font-semibold hover:bg-black transition-all cursor-pointer"
                >
                  Close Window
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#F3F4F6] text-[#161616] text-sm font-semibold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Send Another Message
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
            className="space-y-5 text-left"
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

            {/* Row 1: Full Name & Work Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-name"
                  className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "field-name-error" : undefined}
                  className={`w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
                    errors.name ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                  placeholder="e.g. Sarah Jenkins"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Enter at least 2 characters" },
                  })}
                />
                {errors.name?.message && (
                  <span
                    id="field-name-error"
                    role="alert"
                    className="text-xs text-red-600 block mt-1 font-medium"
                  >
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-email"
                  className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "field-email-error" : undefined}
                  className={`w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
                    errors.email ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
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
                  <span
                    id="field-email-error"
                    role="alert"
                    className="text-xs text-red-600 block mt-1 font-medium"
                  >
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Phone Number & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Number */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-phoneNumber"
                  className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phoneNumber ? "true" : "false"}
                  aria-describedby={errors.phoneNumber ? "field-phoneNumber-error" : undefined}
                  className={`w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
                    errors.phoneNumber ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                  placeholder="e.g. +1 415 555 2671"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    validate: (val) => {
                      const digits = val.replace(/\D/g, "");
                      return (
                        (digits.length >= 7 && digits.length <= 15) ||
                        "Please enter 7 to 15 digits"
                      );
                    },
                  })}
                />
                {errors.phoneNumber?.message && (
                  <span
                    id="field-phoneNumber-error"
                    role="alert"
                    className="text-xs text-red-600 block mt-1 font-medium"
                  >
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* Organization Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="field-organizationName"
                  className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
                >
                  Organization / Academy <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-organizationName"
                  type="text"
                  autoComplete="organization"
                  aria-invalid={errors.organizationName ? "true" : "false"}
                  aria-describedby={
                    errors.organizationName ? "field-organizationName-error" : undefined
                  }
                  className={`w-full h-[48px] px-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all ${
                    errors.organizationName ? "border-red-500 ring-2 ring-red-100" : ""
                  }`}
                  placeholder="e.g. Apex Coding Academy"
                  {...register("organizationName", {
                    required: "Organization or academy name is required",
                  })}
                />
                {errors.organizationName?.message && (
                  <span
                    id="field-organizationName-error"
                    role="alert"
                    className="text-xs text-red-600 block mt-1 font-medium"
                  >
                    {errors.organizationName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 3: Discussion Topic (page variant only) */}
            {variant !== "modal" && (
              <div className="space-y-1.5">
                <label
                  htmlFor="field-topic"
                  className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
                >
                  Inquiry Topic
                </label>
                <div className="relative">
                  <select
                    id="field-topic"
                    aria-describedby="field-topic-description"
                    className="w-full h-[48px] px-3.5 pr-10 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all appearance-none cursor-pointer"
                    {...register("topic")}
                  >
                    {topics.map((t) => (
                      <option key={t.id} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6B6F76]">
                    <ChevronDown className="size-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Row 4: Scope or Project Details */}
            <div className="space-y-1.5">
              <label
                htmlFor="field-subject"
                className="block text-[13px] font-semibold uppercase text-[#6B6F76] tracking-wider"
              >
                Project Scope or Questions
              </label>
              <textarea
                id="field-subject"
                rows={3}
                aria-describedby="field-subject-description"
                className="w-full min-h-[96px] p-3.5 text-[16px] rounded-[12px] bg-[#F4F5F7] border border-[#ECEDEF] text-[#161616] placeholder:text-[#8F94A0] focus:outline-none focus:border-[#7B5CF5] focus:ring-2 focus:ring-[#7B5CF5]/15 focus:bg-white transition-all resize-none"
                placeholder="Tell us about your academy and what you need"
                {...register("subject")}
              />
            </div>

            {/* Privacy Note */}
            {privacyNote && (
              <p className="text-xs text-[#8F94A0] leading-relaxed">
                {privacyNote}
              </p>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-end gap-3">
              {variant === "modal" && onClose && (
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
                  variant === "modal"
                    ? "px-6 py-2.5 text-sm font-semibold text-white bg-MainColor hover:bg-[#5A3DE6] rounded-lg shadow-sm hover:shadow-[0_0_20px_-3px_rgba(108,75,255,0.35)] transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                    : "w-full sm:w-auto h-[48px] px-8 rounded-xl bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
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
