"use client";

import React, { useEffect, useState } from "react";
import { Section, Eyebrow, ScreenshotFrame } from "@/components/marketing/ui";
import { Calendar, Video, FileCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const BATCH_STATUSES = [
  { label: "Scheduled", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "● Live", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { label: "Recorded", color: "bg-violet-50 text-violet-700 border-violet-200" },
];

export function HowAcademyRunsSection() {
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % BATCH_STATUSES.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const currentStatus = BATCH_STATUSES[statusIdx];

  const steps = [
    {
      num: "01",
      icon: Calendar,
      title: "Set up batches",
      description:
        "Create a course once and run it as many batches as you need, each with its own schedule, learners and drip release.",
      frameTitle: "Batch Manager & Schedule",
      frameAlt: "Batch Scheduler — separate dates, drip rules and learner rosters per cohort",
      extraBadge: null,
    },
    {
      num: "02",
      icon: Video,
      title: "Teach live",
      description:
        "Schedule Zoom classes for a batch, send reminders, and keep recordings with the course.",
      frameTitle: "Live Classroom & Zoom Sync",
      frameAlt: "Live Class Hub — Zoom schedule, attendee roster and automatic recordings",
      extraBadge: (
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-300",
            currentStatus.color
          )}
        >
          {currentStatus.label}
        </span>
      ),
    },
    {
      num: "03",
      icon: FileCheck,
      title: "Test and track",
      description:
        "Quizzes, assignments and in-video checkpoints, with attendance and progress for every learner.",
      frameTitle: "Gradebook & Assessments",
      frameAlt: "Assessment Center — quizzes, assignments and completion certificates",
      extraBadge: null,
    },
    {
      num: "04",
      icon: CreditCard,
      title: "Collect fees anywhere",
      description:
        "Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval.",
      frameTitle: "Multi-Currency Checkout",
      frameAlt: "Checkout & Payments — instant enrollment, coupons and invoice generation",
      extraBadge: null,
    },
  ];

  return (
    <Section tone="white" spacing="default">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <Eyebrow tone="violet">THE WORKFLOW</Eyebrow>
        <h2 className="type-h2 text-[#161616] mt-3">
          How an academy runs on LMS Domain
        </h2>
        <p className="type-body text-[#6B6F76] mt-3">
          Four interconnected steps to build courses, manage live teaching, evaluate learners and collect revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center size-9 rounded-xl bg-white border border-[#EAE8E2] text-xs font-bold text-[#161616]">
                      {step.num}
                    </span>
                    <Icon className="size-4 text-[#7B5CF5]" />
                  </div>
                  {step.extraBadge}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Screenshot Frame with neutral placeholder */}
              <div className="mt-2">
                {/* TODO(content): add real screenshots for ${step.title} */}
                <ScreenshotFrame
                  title={step.frameTitle}
                  alt={step.frameAlt}
                  className="bg-white shadow-sm ring-1 ring-black/5"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default HowAcademyRunsSection;
