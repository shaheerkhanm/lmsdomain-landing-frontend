"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/marketing/ui";

interface WorkflowStep {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  notifications: Array<{
    title: string;
    subtitle: string;
    time: string;
    bgColor: string;
    icon: React.ReactNode;
  }>;
}

const STEPS: WorkflowStep[] = [
  {
    id: "step-01",
    num: "01",
    tabLabel: "Set up batches",
    title: "Set up batches",
    description:
      "Create a course once and run it as many batches as you need, each with its own schedule, learners and drip release.",
    linkHref: "/platform/manage",
    linkLabel: "Learn about batches →",
    notifications: [
      {
        title: "Batch B created",
        subtitle: "Full-Stack Web Engineering",
        time: "now",
        bgColor: "#7B5CFF",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <rect x="3" y="4.5" width="14" height="12" rx="2" />
            <path d="M3 8.5h14" />
          </svg>
        ),
      },
      {
        title: "24 learners enrolled",
        subtitle: "Batch B",
        time: "2m",
        bgColor: "#151517",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <circle cx="10" cy="7" r="3" />
            <path d="M4 17c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5" />
          </svg>
        ),
      },
      {
        title: "Drip: unlocks Monday",
        subtitle: "Architecture Blueprint",
        time: "5m",
        bgColor: "#F2894A",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M10 5v5l3 2" />
            <circle cx="10" cy="10" r="7" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "step-02",
    num: "02",
    tabLabel: "Teach live",
    title: "Teach live",
    description:
      "Schedule Zoom classes for a batch, send reminders, and keep recordings with the course.",
    linkHref: "/platform/teach",
    linkLabel: "Learn about live classes →",
    notifications: [
      {
        title: "Zoom class scheduled",
        subtitle: "Batch B · Monday 7:00 PM",
        time: "now",
        bgColor: "#2D8CFF",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <rect x="2.5" y="5.5" width="10" height="9" rx="2" />
            <path d="m12.5 9 5-3v8l-5-3" />
          </svg>
        ),
      },
      {
        title: "Reminder sent",
        subtitle: "To 24 learners",
        time: "1h",
        bgColor: "#17A06B",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M4 8a6 6 0 0 1 12 0c0 5 2 6 2 6H2s2-1 2-6" />
          </svg>
        ),
      },
      {
        title: "Recording saved",
        subtitle: "Added to the course",
        time: "2h",
        bgColor: "#E5484D",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <circle cx="10" cy="10" r="4" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "step-03",
    num: "03",
    tabLabel: "Test and track",
    title: "Test and track",
    description:
      "Quizzes, assignments and in-video checkpoints, with attendance and progress for every learner.",
    linkHref: "/platform/assess",
    linkLabel: "Learn about tests & tracking →",
    notifications: [
      {
        title: "Checkpoint Evaluation",
        subtitle: "21 of 24 completed",
        time: "now",
        bgColor: "#F2894A",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M5 10.5 8.5 14 15 6.5" />
          </svg>
        ),
      },
      {
        title: "Assignment submitted",
        subtitle: "Waiting for review",
        time: "12m",
        bgColor: "#E2539B",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M4 4h9l3 3v9H4z" />
          </svg>
        ),
      },
      {
        title: "Attendance updated",
        subtitle: "Batch B progress report",
        time: "1h",
        bgColor: "#151517",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M3 16h14M5 13l3-4 3 2 4-6" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "step-04",
    num: "04",
    tabLabel: "Collect fees anywhere",
    title: "Collect fees anywhere",
    description:
      "Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval.",
    linkHref: "/platform/sell",
    linkLabel: "Learn about checkout & fees →",
    notifications: [
      {
        title: "Payment received · ₹7,999",
        subtitle: "Razorpay · UPI",
        time: "now",
        bgColor: "#17A06B",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M5 10.5 8.5 14 15 6.5" />
          </svg>
        ),
      },
      {
        title: "Coupon WELCOME10 applied",
        subtitle: "Full-Stack Web Engineering",
        time: "4m",
        bgColor: "#7B5CFF",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M3 7h14v9H3zM3 10h14" />
          </svg>
        ),
      },
      {
        title: "Offline payment to approve",
        subtitle: "Bank transfer screenshot",
        time: "20m",
        bgColor: "#F2894A",
        icon: (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M4 4h9l3 3v9H4z" />
          </svg>
        ),
      },
    ],
  },
];

export function HowAcademyRunsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-advance tabs every 6s unless hovered/focused or reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, activeIdx]);

  // ARIA tab keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIdx = (index + 1) % STEPS.length;
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIdx = (index - 1 + STEPS.length) % STEPS.length;
      setActiveIdx(prevIdx);
      tabRefs.current[prevIdx]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIdx(STEPS.length - 1);
      tabRefs.current[STEPS.length - 1]?.focus();
    }
  };

  const currentStep = STEPS[activeIdx];

  return (
    <section className="py-[clamp(72px,9vw,128px)] font-sans" id="workflow">
      <div className="max-w-[1080px] mx-auto px-5">
        <div>
          <Eyebrow tone="gradient">How it works</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            How does an academy run on LMS Domain?
          </h2>
        </div>

        {/* White Bordered Workflow Panel */}
        <div
          className="border border-[#E8E8EC] bg-white rounded-[22px] mt-10 overflow-hidden shadow-xs"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Tabs Grid */}
          <div
            role="tablist"
            aria-label="Academy workflow steps"
            className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#E8E8EC]"
          >
            {STEPS.map((step, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={step.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`workflow-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls={`workflow-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`p-4 sm:p-5 text-left border-r border-[#E8E8EC] last:border-r-0 relative text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isActive ? "text-[#151517]" : "text-[#8A8A96] hover:text-[#535361]"
                  }`}
                >
                  <span
                    className={`font-mono-code text-[11px] font-medium border rounded-[6px] px-1.5 py-0.5 transition-colors ${
                      isActive
                        ? "bg-[#151517] text-white border-[#151517]"
                        : "border-[#E8E8EC] text-[#8A8A96]"
                    }`}
                  >
                    {step.num}
                  </span>
                  <span className="truncate">{step.tabLabel}</span>

                  {/* Gradient progress bar under active tab */}
                  {isActive && (
                    <span
                      key={`progress-${idx}`}
                      className="absolute left-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-[#E2539B] via-[#F2894A] to-[#7B5CFF] animate-[fill_6s_linear_forwards] w-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Workflow Body: Left Step Text + Right Dotted Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] min-h-[360px]">
            {/* Left: Step Text */}
            <div
              role="tabpanel"
              id={`workflow-panel-${activeIdx}`}
              aria-labelledby={`workflow-tab-${activeIdx}`}
              className="p-6 sm:p-10 flex flex-col justify-center"
            >
              <h3 className="text-[24px] sm:text-[26px] font-bold text-[#151517] tracking-tight mb-2.5">
                {currentStep.title}
              </h3>
              <p className="text-[#535361] text-[15px] sm:text-[16px] leading-[1.55] max-w-[42ch]">
                {currentStep.description}
              </p>
              <Link
                href={currentStep.linkHref}
                className="mt-5 sm:mt-6 text-[14px] font-semibold text-[#151517] hover:text-[#6C4BFF] transition-colors inline-flex items-center gap-1.5 w-fit"
              >
                <span>{currentStep.linkLabel}</span>
              </Link>
            </div>

            {/* Right: Dotted Canvas with 3 Staggered Notification Cards */}
            <div className="bg-[#FBFBFC] bg-[radial-gradient(#DADAE0_1px,transparent_1.2px)] [background-size:18px_18px] border-t lg:border-t-0 lg:border-l border-[#E8E8EC] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              <div
                key={`cards-${activeIdx}`}
                className="w-full max-w-[380px] flex flex-col gap-2.5 animate-[pin_0.5s_cubic-bezier(0.2,0.7,0.2,1)]"
              >
                {currentStep.notifications.map((note, noteIdx) => {
                  const marginClass =
                    noteIdx === 0
                      ? "ml-0"
                      : noteIdx === 1
                      ? "ml-4 sm:ml-[22px]"
                      : "ml-8 sm:ml-[44px]";

                  return (
                    <div
                      key={noteIdx}
                      className={`bg-white border border-[#E2E2E8] rounded-[14px] p-3 px-3.5 grid grid-cols-[32px_1fr_auto] gap-3 items-center shadow-[0_10px_24px_-16px_rgba(0,0,0,0.3)] text-[13.5px] ${marginClass}`}
                    >
                      <span
                        className="w-8 h-8 rounded-[9px] flex items-center justify-center text-white shrink-0"
                        style={{ backgroundColor: note.bgColor }}
                      >
                        {note.icon}
                      </span>
                      <div className="min-w-0">
                        <b className="block font-semibold text-[13.5px] text-[#151517] truncate">
                          {note.title}
                        </b>
                        <small className="text-[#535361] text-[12px] block truncate">
                          {note.subtitle}
                        </small>
                      </div>
                      <time className="text-[11px] text-[#8A8A96] shrink-0 self-start mt-0.5">
                        {note.time}
                      </time>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowAcademyRunsSection;
