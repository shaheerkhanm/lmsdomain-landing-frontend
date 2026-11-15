"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/marketing/ui";
import {
  CalendarDays,
  Video,
  ClipboardCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  PlayCircle,
  FileText,
  Clock,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  uiType: "builder" | "calendar" | "assess" | "payout";
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
    icon: CalendarDays,
    uiType: "builder",
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
    icon: Video,
    uiType: "calendar",
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
    icon: ClipboardCheck,
    uiType: "assess",
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
    icon: CreditCard,
    uiType: "payout",
  },
];

export function HowAcademyRunsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-advance tabs every 7s unless hovered/focused or reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 7000);

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
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="rv-v4">
          <Eyebrow dotColor="#2F6BFF">How it works</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            How does an academy run on LMS Domain?
          </h2>
        </div>

        {/* White Bordered Workflow Panel */}
        <div
          className="rv-v4 border border-[rgba(15,15,20,0.08)] bg-white rounded-[22px] mt-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Tabs Grid with plain ink icons & ink underline */}
          <div
            role="tablist"
            aria-label="Academy workflow steps"
            className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#E8E8EC]"
          >
            {STEPS.map((step, idx) => {
              const isActive = activeIdx === idx;
              const StepIcon = step.icon;
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
                    isActive ? "text-[#151517] bg-[#FAFAFC]" : "text-[#8A8A96] hover:text-[#535361] bg-white"
                  }`}
                >
                  <StepIcon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? "text-[#151517]" : "text-[#8A8A96]"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span className="truncate">{step.tabLabel}</span>

                  {/* Clean ink underline under active tab */}
                  {isActive && (
                    <span
                      key={`progress-${idx}`}
                      className="absolute left-0 -bottom-[1px] h-[2px] bg-[#151517] w-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Workflow Body: Left Step Text + Right Real UI Slice */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] min-h-[380px]">
            {/* Left: Step Text */}
            <div
              role="tabpanel"
              id={`workflow-panel-${activeIdx}`}
              aria-labelledby={`workflow-tab-${activeIdx}`}
              className="p-6 sm:p-10 flex flex-col justify-center"
            >
              <span className="font-mono text-[12px] font-semibold text-[#8C8C98] mb-1">
                Step {currentStep.num}
              </span>
              <h3 className="text-[24px] sm:text-[26px] font-bold text-[#151517] tracking-tight mb-2.5">
                {currentStep.title}
              </h3>
              <p className="text-[#535361] text-[15px] sm:text-[16px] leading-[1.55] max-w-[42ch]">
                {currentStep.description}
              </p>
              <Link
                href={currentStep.linkHref}
                className="mt-5 sm:mt-6 text-[14px] font-semibold text-[#151517] hover:text-[#2F6BFF] transition-colors inline-flex items-center gap-1.5 w-fit"
              >
                <span>{currentStep.linkLabel}</span>
              </Link>
            </div>

            {/* Right: Real UI Slice for Each Step */}
            <div className="bg-[#F7F7FA] border-t lg:border-t-0 lg:border-l border-[#E8E8EC] p-6 sm:p-8 flex items-center justify-center overflow-hidden">
              {/* Tab 1: Course Builder Outline */}
              {currentStep.uiType === "builder" && (
                <div className="w-full max-w-[420px] bg-white border border-[#E8E8EC] rounded-[16px] p-4 sm:p-5 text-[13px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F3] mb-3">
                    <b className="font-bold text-[#151517] text-[14px]">
                      Full-Stack Web Engineering
                    </b>
                    <span className="bg-[#E8F8F0] text-[#12A27A] font-semibold text-[11px] px-2 py-0.5 rounded-[5px]">
                      Batch B · Active
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Module 1 */}
                    <div className="bg-[#F7F7FA] border border-[#E8E8EC] rounded-[10px] p-2.5 px-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#151517] flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#12A27A]" />
                          Module 1: Architecture & Foundations
                        </span>
                        <span className="text-[#8C8C98] text-[11px]">8 lessons</span>
                      </div>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-[#F7F7FA] border border-[#E8E8EC] rounded-[10px] p-2.5 px-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#151517] flex items-center gap-2">
                          <PlayCircle className="w-3.5 h-3.5 text-[#2F6BFF]" />
                          Module 2: Server Runtimes & APIs
                        </span>
                        <span className="text-[#2F6BFF] text-[11px] font-semibold">In progress</span>
                      </div>
                    </div>

                    {/* Module 3 with Drip Release */}
                    <div className="bg-white border border-dashed border-[#C8C8D4] rounded-[10px] p-2.5 px-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[#535361] flex items-center gap-2 font-medium">
                          <Lock className="w-3.5 h-3.5 text-[#8C8C98]" />
                          Module 3: Database Scaling & Caching
                        </span>
                        <span className="bg-[#FFF4E5] text-[#B45309] text-[10.5px] font-semibold px-2 py-0.5 rounded-[5px]">
                          Unlocks Mon 9 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Batch Calendar / Live Class */}
              {currentStep.uiType === "calendar" && (
                <div className="w-full max-w-[420px] bg-white border border-[#E8E8EC] rounded-[16px] p-4 sm:p-5 text-[13px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F3] mb-3">
                    <div>
                      <b className="font-bold text-[#151517] text-[14px] block">
                        Live Class Schedule
                      </b>
                      <small className="text-[#8C8C98] text-[11px]">Next session today</small>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-[#E8F8F0] text-[#12A27A] font-semibold text-[11px] px-2 py-0.5 rounded-[5px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12A27A] animate-pulse" />
                      Live in 35m
                    </span>
                  </div>

                  {/* Scheduled Class Card */}
                  <div className="border border-[#E8E8EC] rounded-[12px] p-3.5 bg-[#FAFAFC] mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] uppercase font-semibold text-[#8C8C98] block">
                          Batch B · Live Class #14
                        </span>
                        <b className="text-[14px] font-bold text-[#151517] block mt-0.5">
                          REST vs GraphQL & Serverless Handlers
                        </b>
                        <span className="text-[12px] text-[#535361] mt-1 block">
                          Mon 7:00 PM – 8:30 PM · 24 learners enrolled
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E8EC] text-[11.5px]">
                      <span className="text-[#12A27A] font-semibold">● Auto-recording enabled</span>
                      <button
                        type="button"
                        className="bg-[#151517] text-white font-semibold px-3 py-1 rounded-[6px]"
                      >
                        Join Zoom Class
                      </button>
                    </div>
                  </div>

                  {/* Week mini-strip */}
                  <div className="grid grid-cols-5 gap-1 text-center text-[11px]">
                    <div className="p-1 rounded bg-[#E8E8EC]/40 text-[#535361]">Mon · 7 PM</div>
                    <div className="p-1 rounded text-[#8C8C98]">Tue · Off</div>
                    <div className="p-1 rounded bg-[#E8E8EC]/40 text-[#535361]">Wed · 7 PM</div>
                    <div className="p-1 rounded text-[#8C8C98]">Thu · Off</div>
                    <div className="p-1 rounded bg-[#E8E8EC]/40 text-[#535361]">Fri · 7 PM</div>
                  </div>
                </div>
              )}

              {/* Tab 3: Test & Assessment Tracker */}
              {currentStep.uiType === "assess" && (
                <div className="w-full max-w-[420px] bg-white border border-[#E8E8EC] rounded-[16px] p-4 sm:p-5 text-[13px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F3] mb-3">
                    <b className="font-bold text-[#151517] text-[14px]">
                      Assessment & Attendance
                    </b>
                    <span className="text-[#8C8C98] text-[11.5px]">Batch B Progress</span>
                  </div>

                  {/* Checkpoint quiz progress */}
                  <div className="border border-[#E8E8EC] rounded-[12px] p-3.5 bg-[#FAFAFC] mb-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <b className="font-semibold text-[#151517] text-[13px]">
                        Module 2 Checkpoint Quiz
                      </b>
                      <span className="font-mono font-bold text-[#12A27A] text-[12px]">
                        21 / 24 submitted
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E8E8EC] overflow-hidden">
                      <div className="h-full bg-[#12A27A] rounded-full" style={{ width: "87.5%" }} />
                    </div>
                    <div className="flex justify-between text-[#8C8C98] text-[11px] mt-2">
                      <span>Average score: 84%</span>
                      <span>3 awaiting review</span>
                    </div>
                  </div>

                  {/* Attendance row */}
                  <div className="border border-[#E8E8EC] rounded-[10px] p-3 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-[#151517] block">Live Class Attendance</span>
                      <small className="text-[#8C8C98] text-[11px]">Last session: 23 of 24 present</small>
                    </div>
                    <span className="bg-[#E8F8F0] text-[#12A27A] font-bold text-[12px] px-2.5 py-1 rounded-[6px]">
                      96% Present
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 4: Payout Summary */}
              {currentStep.uiType === "payout" && (
                <div className="w-full max-w-[420px] bg-white border border-[#E8E8EC] rounded-[16px] p-4 sm:p-5 text-[13px]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F3] mb-3">
                    <b className="font-bold text-[#151517] text-[14px]">
                      Payout & Fee Settlement
                    </b>
                    <span className="text-[#12A27A] font-semibold text-[11.5px]">
                      Direct to Bank ✓
                    </span>
                  </div>

                  <div className="border border-[#E8E8EC] rounded-[12px] p-3.5 bg-[#FAFAFC] mb-3 space-y-2">
                    <div className="flex justify-between items-center text-[12.5px]">
                      <span className="text-[#535361]">Course enrollment fee</span>
                      <span className="font-medium text-[#151517]">₹4,999.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[12.5px] text-[#12A27A]">
                      <span>Coupon discount (WELCOME10)</span>
                      <span>−₹500.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[12.5px] text-[#8C8C98]">
                      <span>Gateway processing (Razorpay UPI)</span>
                      <span>₹0.00 (Standard)</span>
                    </div>
                    <div className="flex justify-between items-center text-[12.5px] text-[#8C8C98]">
                      <span>LMS Domain platform fee</span>
                      <span className="font-semibold text-[#12A27A]">₹0.00 (0% Cut)</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-[#E8E8EC]">
                      <b className="text-[13.5px] text-[#151517]">Settled to account</b>
                      <span className="font-bold text-[18px] text-[#151517]">₹4,499.00</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11.5px] text-[#8C8C98]">
                    <span>Settlement schedule: Daily T+1</span>
                    <span className="text-[#151517] font-medium">Auto-reconciled</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowAcademyRunsSection;