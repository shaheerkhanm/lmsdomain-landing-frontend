"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { CustomPlanFormConfig } from "@/types/content";

interface CustomPlanEnquiryFormProps {
  formConfig: CustomPlanFormConfig;
}

export function CustomPlanEnquiryForm({ formConfig }: CustomPlanEnquiryFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organisationType, setOrganisationType] = useState("Coaching");

  const [learners, setLearners] = useState("500–2,000");
  const [needs, setNeeds] = useState<string[]>(["Web academy", "Android app", "iOS app"]);
  const [launchTiming, setLaunchTiming] = useState("Within a month");
  const [currentPlatform, setCurrentPlatform] = useState("");

  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Form Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Options from CMS or defaults
  const orgTypes = formConfig.organisationTypes || [
    "Coaching",
    "School or college",
    "Company",
    "Training provider",
    "Other",
  ];
  const learnerBands = formConfig.learnerBands || [
    "Under 500",
    "500–2,000",
    "2,000–10,000",
    "10,000+",
  ];
  const needsOptions = formConfig.needs || [
    "Web academy",
    "Android app",
    "iOS app",
    "Migration from another LMS",
    "Custom features",
  ];
  const launchTimings = formConfig.launchTimings || [
    "As soon as possible",
    "Within a month",
    "1–3 months",
    "Just exploring",
  ];

  // Pre-select needs from URL query string ?needs=android,ios
  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const needsParam = urlParams.get("needs");
    if (needsParam) {
      const parsed = needsParam
        .split(",")
        .map((s) => s.trim().toLowerCase());
      const selected: string[] = [];
      for (const opt of needsOptions) {
        const norm = opt.toLowerCase();
        if (parsed.some((p) => norm.includes(p) || p.includes(norm))) {
          selected.push(opt);
        }
      }
      if (selected.length > 0) {
        setNeeds(selected);
      }
    }
  }, [needsOptions]);

  // Client-side step validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) {
      errs.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Please enter a valid email address";
    }
    if (!phoneNumber.trim()) {
      errs.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{7,25}$/.test(phoneNumber.trim())) {
      errs.phoneNumber = "Please enter a valid phone number";
    }
    if (!organizationName.trim()) {
      errs.organizationName = "Organisation name is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!learners) errs.learners = "Please select number of learners";
    if (!needs || needs.length === 0) {
      errs.needs = "Please select at least one requirement";
    }
    if (!launchTiming) errs.launchTiming = "Please select launch timing";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!consent) errs.consent = "You must agree to the Privacy Policy to proceed";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setDirection(1);
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setDirection(1);
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setServerError(null);
    setDirection(-1);
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const toggleNeed = (needItem: string) => {
    setNeeds((prev) =>
      prev.includes(needItem)
        ? prev.filter((i) => i !== needItem)
        : [...prev, needItem]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setServerError(null);

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      organizationName: organizationName.trim(),
      organisationType,
      learners,
      needs,
      launchTiming,
      currentPlatform: currentPlatform.trim() || undefined,
      message: message.trim() || undefined,
      type: 3,
      page: "/custom-lms",
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && (data?.status === "SUCCESS" || data?.success || data?.status === true)) {
        setSubmitted(true);
      } else {
        setServerError(
          data?.message || "Something went wrong sending your enquiry. Please try again."
        );
      }
    } catch (err: any) {
      setServerError(err?.message || "Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const successMessage = (formConfig.successMessage || "Thanks, {name}. We've got your request and will reply within one working day.").replace(
    "{name}",
    name || "there"
  );

  return (
    <section id="plan" className="py-20 sm:py-24 bg-white font-urbanist relative overflow-hidden border-b border-[#ECEDEF]">
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7B5CF5]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[760px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-3">
            ✦ Get Your Plan &amp; Quote
          </span>
          <h2 className="text-[30px] sm:text-[40px] font-bold text-[#161616] tracking-tight mb-3">
            {formConfig.title || "Tell us about your academy"}
          </h2>
          <p className="text-sm sm:text-base text-[#6B6F76] max-w-lg mx-auto">
            {formConfig.subtitle || "Takes two minutes. We reply within one working day with a plan and quote."}
          </p>
        </div>

        {/* Form Card (Radius 40px) */}
        <div className="bg-white rounded-[40px] border border-[#ECEDEF] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative">
          {submitted ? (
            /* Success State */
            <div className="py-12 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-16 rounded-full bg-[#E8F8F5] text-[#059669] flex items-center justify-center mx-auto shadow-md"
              >
                <Check className="size-8 stroke-[3]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#161616] tracking-tight">
                Request Received!
              </h3>
              <p className="text-base text-[#6B6F76] max-w-md mx-auto leading-relaxed">
                {successMessage}
              </p>
            </div>
          ) : (
            <div>
              {/* Step Progress Indicators */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F1F3F5]">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 1 ? "bg-[#161616] text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    1
                  </span>
                  <span className={`text-xs font-semibold ${step === 1 ? "text-[#161616]" : "text-[#8F94A0]"}`}>
                    About You
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-[#ECEDEF] hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 2 ? "bg-[#161616] text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-xs font-semibold ${step === 2 ? "text-[#161616]" : "text-[#8F94A0]"}`}>
                    Your Needs
                  </span>
                </div>

                <div className="w-12 h-0.5 bg-[#ECEDEF] hidden sm:block" />

                <div className="flex items-center gap-2">
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step >= 3 ? "bg-[#161616] text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    3
                  </span>
                  <span className={`text-xs font-semibold ${step === 3 ? "text-[#161616]" : "text-[#8F94A0]"}`}>
                    Confirm
                  </span>
                </div>
              </div>

              {/* Server error alert if any */}
              {serverError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 text-left">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <AnimatePresence mode="wait">
                  {/* ================= STEP 1: ABOUT YOU ================= */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-left"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-bold text-[#161616] mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                            }}
                            placeholder="Sarah Jenkins"
                            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all ${
                              errors.name ? "border-red-500" : "border-[#ECEDEF]"
                            }`}
                          />
                          {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-bold text-[#161616] mb-1.5">
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                            placeholder="sarah@academy.com"
                            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all ${
                              errors.email ? "border-red-500" : "border-[#ECEDEF]"
                            }`}
                          />
                          {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-bold text-[#161616] mb-1.5">
                            Phone (with country code) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value);
                              if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                            }}
                            placeholder="+1 (555) 000-0000"
                            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all ${
                              errors.phoneNumber ? "border-red-500" : "border-[#ECEDEF]"
                            }`}
                          />
                          {errors.phoneNumber && <p className="text-[11px] text-red-500 mt-1">{errors.phoneNumber}</p>}
                        </div>

                        {/* Organisation Name */}
                        <div>
                          <label className="block text-xs font-bold text-[#161616] mb-1.5">
                            Organisation Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={organizationName}
                            onChange={(e) => {
                              setOrganizationName(e.target.value);
                              if (errors.organizationName) setErrors((prev) => ({ ...prev, organizationName: "" }));
                            }}
                            placeholder="Apex Institute"
                            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all ${
                              errors.organizationName ? "border-red-500" : "border-[#ECEDEF]"
                            }`}
                          />
                          {errors.organizationName && <p className="text-[11px] text-red-500 mt-1">{errors.organizationName}</p>}
                        </div>
                      </div>

                      {/* Organisation Type */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-2">
                          Organisation Type
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {orgTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setOrganisationType(type)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                organisationType === type
                                  ? "bg-[#161616] text-white shadow-xs"
                                  : "bg-[#F8FAFC] text-[#6B6F76] border border-[#ECEDEF] hover:border-slate-300"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>Next: Your Needs</span>
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ================= STEP 2: YOUR NEEDS ================= */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6 text-left"
                    >
                      {/* Learners Segmented Pills */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-2">
                          Number of Learners <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {learnerBands.map((band) => (
                            <button
                              key={band}
                              type="button"
                              onClick={() => setLearners(band)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                                learners === band
                                  ? "bg-[#161616] text-white shadow-xs"
                                  : "bg-[#F8FAFC] text-[#6B6F76] border border-[#ECEDEF] hover:border-slate-300"
                              }`}
                            >
                              {band}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Needs Multi-Select Chips */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-2">
                          What do you need? <span className="text-red-500">*</span> (Select all that apply)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {needsOptions.map((opt) => {
                            const isSelected = needs.includes(opt);
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => toggleNeed(opt)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#EEE9FF] text-[#7B5CF5] border border-[#7B5CF5]/40 shadow-2xs font-bold"
                                    : "bg-[#F8FAFC] text-[#6B6F76] border border-[#ECEDEF] hover:border-slate-300"
                                }`}
                              >
                                {isSelected && <Check className="size-3.5 stroke-[3]" />}
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.needs && <p className="text-[11px] text-red-500 mt-1.5">{errors.needs}</p>}
                      </div>

                      {/* Launch Timing */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-2">
                          When do you want to launch? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {launchTimings.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setLaunchTiming(time)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                                launchTiming === time
                                  ? "bg-[#161616] text-white shadow-xs"
                                  : "bg-[#F8FAFC] text-[#6B6F76] border border-[#ECEDEF] hover:border-slate-300"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Current Platform (Optional) */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-1.5">
                          Current Platform <span className="text-[#8F94A0] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={currentPlatform}
                          onChange={(e) => setCurrentPlatform(e.target.value)}
                          placeholder="e.g. Moodle, Teachable, Kajabi, Spreadsheets"
                          className="w-full h-11 px-3.5 rounded-xl border border-[#ECEDEF] bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6B6F76] hover:text-[#161616] inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <ArrowLeft className="size-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>Next: Confirm</span>
                          <ArrowRight className="size-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ================= STEP 3: CONFIRM & SUBMIT ================= */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ x: direction > 0 ? 30 : -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -30 : 30, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5 text-left"
                    >
                      {/* Summary Recap Box */}
                      <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#ECEDEF] space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#8F94A0]">Academy:</span>
                          <span className="font-bold text-[#161616]">{organizationName} ({organisationType})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8F94A0]">Contact:</span>
                          <span className="font-semibold text-[#161616]">{name} · {email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8F94A0]">Learners &amp; Timing:</span>
                          <span className="font-semibold text-[#161616]">{learners} · {launchTiming}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#8F94A0]">Deliverables:</span>
                          <span className="font-bold text-[#7B5CF5]">{needs.join(", ")}</span>
                        </div>
                      </div>

                      {/* Anything else? */}
                      <div>
                        <label className="block text-xs font-bold text-[#161616] mb-1.5">
                          Anything else? <span className="text-[#8F94A0] font-normal">(Optional special requirements or questions)</span>
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about custom integrations, payment gateway preferences or migration timelines..."
                          className="w-full p-3.5 rounded-xl border border-[#ECEDEF] bg-white text-sm text-[#161616] focus:outline-none focus:ring-2 focus:ring-[#7B5CF5] transition-all resize-none"
                        />
                      </div>

                      {/* Consent Line */}
                      <div>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => {
                              setConsent(e.target.checked);
                              if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
                            }}
                            className="mt-0.5 size-4 rounded border-[#ECEDEF] text-[#7B5CF5] focus:ring-[#7B5CF5]"
                          />
                          <span className="text-xs text-[#6B6F76] leading-relaxed">
                            {formConfig.consentText || "By sending this form you agree to our Privacy Policy."}
                          </span>
                        </label>
                        {errors.consent && <p className="text-[11px] text-red-500 mt-1">{errors.consent}</p>}
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6B6F76] hover:text-[#161616] inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <ArrowLeft className="size-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>{formConfig.submitLabel || "Send my request"}</span>
                              <Sparkles className="size-4 text-[#A78BFA]" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CustomPlanEnquiryForm;

