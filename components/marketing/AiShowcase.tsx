"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  Bot,
  Sparkles,
  LineChart,
  Command,
  Search,
  Check,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { AiTool } from "@/types/content";

interface AiShowcaseProps {
  tools: AiTool[];
}

export function AiShowcase({ tools }: AiShowcaseProps) {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [typedChars, setTypedChars] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement>(null);

  // Rail refs
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  const seg1FillRef = useRef<HTMLDivElement>(null);
  const seg2FillRef = useRef<HTMLDivElement>(null);
  const seg3FillRef = useRef<HTMLDivElement>(null);

  const tutorAnswer =
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor evaluation.";

  // Word-by-word streaming effect when tutor tab (step 0) is active
  useEffect(() => {
    if (activeStep === 0) {
      setTypedChars(0);
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= tutorAnswer.length) {
            clearInterval(interval);
            return tutorAnswer.length;
          }
          return prev + 4;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  // GSAP Pin & Scrub for Desktop (>= 1024px)
  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // Initial rail states
        gsap.set(num1Ref.current, { color: "#161616", fontWeight: "700" });
        gsap.set([num2Ref.current, num3Ref.current, num4Ref.current], {
          color: "#9CA3AF",
          fontWeight: "600",
        });
        gsap.set([seg1FillRef.current, seg2FillRef.current, seg3FillRef.current], {
          scaleY: 0,
          transformOrigin: "top",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedWrapperRef.current,
            start: "center center",
            end: "+=300%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              let nextStep: 0 | 1 | 2 | 3 = 0;
              if (p >= 0.75) nextStep = 3;
              else if (p >= 0.5) nextStep = 2;
              else if (p >= 0.25) nextStep = 1;
              else nextStep = 0;
              setActiveStep((prev) => (prev !== nextStep ? nextStep : prev));
            },
          },
        });

        // Segment 1 (Step 0 -> Step 1)
        tl.to(seg1FillRef.current, { scaleY: 1, ease: "none", duration: 1 }, 0);
        tl.to(num2Ref.current, { color: "#161616", fontWeight: "700", duration: 0.2 }, 0.8);

        // Segment 2 (Step 1 -> Step 2)
        tl.to(seg2FillRef.current, { scaleY: 1, ease: "none", duration: 1 }, 1);
        tl.to(num3Ref.current, { color: "#161616", fontWeight: "700", duration: 0.2 }, 1.8);

        // Segment 3 (Step 2 -> Step 3)
        tl.to(seg3FillRef.current, { scaleY: 1, ease: "none", duration: 1 }, 2);
        tl.to(num4Ref.current, { color: "#161616", fontWeight: "700", duration: 0.2 }, 2.8);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentTool = tools[activeStep] || tools[0];

  // Render the specific illustration inside the window
  const renderIllustration = (stepIdx: number) => {
    switch (stepIdx) {
      // 0. HelpDesk AI Tutor
      case 0:
        return (
          <div
            aria-label="Illustration of the HelpDesk AI tutor"
            className="flex flex-col h-full justify-between space-y-3.5"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#ECEDEF] text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#161616] font-semibold">
                  Course: Modern Architecture
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F8F5] text-[#0D9488] font-semibold text-[11px]">
                  Active Session
                </span>
              </div>
              <span className="text-[11px] text-[#8F94A0] hidden sm:inline">HelpDesk AI</span>
            </div>

            {/* Saved Chats Chip List */}
            <div className="flex items-center gap-2 overflow-x-auto py-0.5 text-[11px] text-[#6B6F76] select-none">
              <span className="font-semibold text-[#8F94A0] shrink-0">Recent:</span>
              <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#ECEDEF] shrink-0">
                Module 1 Intro
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#ECEDEF] shrink-0">
                Module 2 Setup
              </span>
            </div>

            {/* Learner Question Bubble */}
            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl rounded-tr-xs border border-[#ECEDEF] ml-auto max-w-[88%] text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F94A0] block mb-1">
                Learner Question
              </span>
              <p className="text-xs sm:text-[13px] text-[#161616] font-medium leading-relaxed">
                What is the difference between a quiz and an assignment in this module?
              </p>
            </div>

            {/* AI Response Bubble */}
            <div className="bg-[#EEE9FF]/40 p-3.5 rounded-2xl rounded-tl-xs border border-[#7B5CF5]/20 max-w-[92%] text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5]">
                <Bot className="w-3.5 h-3.5" />
                <span>Domie AI Tutor</span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#161616] leading-relaxed">
                {tutorAnswer.slice(0, typedChars)}
                {typedChars < tutorAnswer.length && (
                  <span className="inline-block w-1.5 h-3 bg-[#7B5CF5] ml-1 animate-pulse align-middle" />
                )}
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-[#ECEDEF] text-[10px] font-medium text-[#7B5CF5]">
                  <span>✦</span>
                  <span>From: Lesson 3 · Layouts & Flexbox</span>
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#8F94A0]">
              <span>Saved in course chat history</span>
              <span className="font-medium text-[#7B5CF5]">Grounded in syllabus</span>
            </div>
          </div>
        );

      // 1. AI Prescriptive Analytics
      case 1:
        return (
          <div
            aria-label="Illustration of prescriptive analytics alerts"
            className="flex flex-col h-full justify-between space-y-3"
          >
            {/* Top AI Summary Paragraph */}
            <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#ECEDEF] text-left">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#ECEDEF] mb-1.5 text-xs">
                <span className="font-semibold text-[#161616]">Academy Operational Insights</span>
                <span className="px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#7B5CF5] font-semibold text-[10px]">
                  Daily Briefing
                </span>
              </div>
              <p className="text-[12px] text-[#6B6F76] leading-relaxed">
                Summary: Operational alerts and priority attention items across active courses and coupon campaigns this week.
              </p>
            </div>

            {/* 3 "Needs Attention" Rows with Diamond Dots */}
            <div className="space-y-2">
              {/* Row 1: Declining enrolments */}
              <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#EF4444] shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-[#161616] truncate">
                      Declining Enrolments
                    </p>
                    <p className="text-[11px] text-[#6B6F76] truncate">
                      Enrolments are down on one course this month
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#161616] text-[10px] font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  View
                </button>
              </div>

              {/* Row 2: Expiring coupon */}
              <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#F59E0B] shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-[#161616] truncate">
                      Expiring Promotional Coupon
                    </p>
                    <p className="text-[11px] text-[#6B6F76] truncate">
                      Code &apos;EARLYBIRD&apos; expires soon with remaining uses
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#161616] text-[10px] font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  View
                </button>
              </div>

              {/* Row 3: Course engagement check */}
              <div className="bg-white p-3 rounded-xl border border-[#ECEDEF] flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#0D9488] shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-xs font-semibold text-[#161616] truncate">
                      Course Engagement Check
                    </p>
                    <p className="text-[11px] text-[#6B6F76] truncate">
                      Lesson 3 checkpoint quiz has lower completion rate
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#161616] text-[10px] font-semibold transition-colors shrink-0 cursor-pointer"
                >
                  View
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-1.5 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#8F94A0]">
              <span>Surfaced for Academy Admins</span>
              <span className="font-medium text-[#161616]">3 Actionable Items</span>
            </div>
          </div>
        );

      // 2. Domie AI Content Generator
      case 2:
        return (
          <div
            aria-label="Illustration of the AI content generator"
            className="flex flex-col h-full justify-between space-y-3"
          >
            {/* Input Row: Course topic + Generate button */}
            <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#ECEDEF] flex items-center justify-between gap-2 text-left">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#8F94A0] tracking-wider block">
                  Course Topic
                </span>
                <span className="text-xs font-semibold text-[#161616] truncate block">
                  Full-Stack Web Engineering
                </span>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#161616] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-[#A78BFA]" />
                <span>Generate</span>
              </button>
            </div>

            {/* Three Output Fields Filling In */}
            <div className="space-y-2.5 text-left">
              {/* Field 1: Suggested Title */}
              <div className="p-2.5 rounded-xl bg-white border border-[#ECEDEF] shadow-2xs space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-[#7B5CF5] tracking-wider block">
                  Suggested Title
                </span>
                <p className="text-xs font-semibold text-[#161616]">
                  Full-Stack Web Engineering with TypeScript
                </p>
              </div>

              {/* Field 2: Description */}
              <div className="p-2.5 rounded-xl bg-white border border-[#ECEDEF] shadow-2xs space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-[#8F94A0] tracking-wider block">
                  Course Description
                </span>
                <p className="text-[11px] text-[#6B6F76] leading-relaxed line-clamp-2">
                  Master modern web development from backend APIs to interactive client interfaces with end-to-end type safety.
                </p>
              </div>

              {/* Field 3: Learning Outcomes */}
              <div className="p-2.5 rounded-xl bg-white border border-[#ECEDEF] shadow-2xs space-y-1">
                <span className="text-[9px] uppercase font-bold text-[#8F94A0] tracking-wider block">
                  Learning Outcomes (3 Bullets)
                </span>
                <ul className="text-[11px] text-[#161616] space-y-1">
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9488] font-bold">✓</span>
                    <span className="truncate">Build scalable REST APIs with Node.js and TypeScript</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9488] font-bold">✓</span>
                    <span className="truncate">Design responsive frontends with React and Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-[#0D9488] font-bold">✓</span>
                    <span className="truncate">Implement database migrations and secure authentication</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-1.5 border-t border-[#ECEDEF] flex items-center justify-between text-[11px] text-[#8F94A0]">
              <span>Draft ready for review</span>
              <span className="font-semibold text-[#161616]">Insert into Course →</span>
            </div>
          </div>
        );

      // 3. AI Command Bar
      case 3:
      default:
        return (
          <div
            aria-label="Illustration of the AI command bar search"
            className="flex flex-col h-full justify-between relative overflow-hidden"
          >
            {/* Dimmed Admin Background App (40% overlay) */}
            <div className="absolute inset-0 bg-[#F3F4F6] opacity-60 p-4 select-none pointer-events-none rounded-xl">
              <div className="h-4 bg-slate-300 rounded w-1/3 mb-4" />
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="h-14 bg-slate-200 rounded-lg" />
                <div className="h-14 bg-slate-200 rounded-lg" />
                <div className="h-14 bg-slate-200 rounded-lg" />
              </div>
              <div className="h-24 bg-slate-200 rounded-lg" />
            </div>

            {/* Dark 40% Backdrop Dimmer */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-xl z-10" />

            {/* Floating Command Bar Modal */}
            <div className="relative z-20 bg-white rounded-xl border border-[#ECEDEF] shadow-2xl p-3.5 space-y-2.5 text-left my-auto">
              {/* Search Bar with Typed Query */}
              <div className="flex items-center gap-2 pb-2 border-b border-[#ECEDEF]">
                <Search className="w-4 h-4 text-[#7B5CF5] shrink-0" />
                <span className="text-xs sm:text-[13px] font-semibold text-[#161616] truncate">
                  How do I configure custom certificates?
                </span>
                <span className="ml-auto px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[10px] font-mono text-[#8F94A0] shrink-0">
                  ESC
                </span>
              </div>

              {/* Grouped Results */}
              <div className="space-y-1.5 text-xs">
                {/* Group: Pages */}
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#ECEDEF] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8F94A0] block">Page</span>
                    <span className="font-semibold text-[#161616] text-[11px]">Certificate Templates</span>
                    <p className="text-[10px] text-[#6B6F76]">Courses &gt; Settings &gt; Certificates</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8F94A0]" />
                </div>

                {/* Group: Settings */}
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#ECEDEF] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#8F94A0] block">Setting</span>
                    <span className="font-semibold text-[#161616] text-[11px]">Enable Automatic Certificate Delivery</span>
                    <p className="text-[10px] text-[#6B6F76]">Toggle delivery on 100% completion</p>
                  </div>
                  <span className="text-[10px] text-[#0D9488] font-semibold">Enabled</span>
                </div>

                {/* Group: Answers */}
                <div className="p-2.5 rounded-lg bg-[#EEE9FF]/40 border border-[#7B5CF5]/20">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-[#7B5CF5] mb-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Domie Assistant Answer</span>
                  </div>
                  <p className="text-[11px] text-[#161616] leading-relaxed">
                    Upload your background layout in Certificate Settings and place merge tags for learner name and date.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Status */}
            <div className="relative z-20 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-white">
              <span>Press ↵ to select</span>
              <span className="font-mono text-white/80">Command Bar</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="domie-ai-tools"
      className="bg-[#F3F4F6] font-urbanist relative overflow-visible py-16 lg:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header (Scrolls normally before pin on desktop) */}
        <div className="text-left max-w-2xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
              <span>✦</span>
              <span>DOMIE AI SUITE</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
              Premium
            </span>
          </div>

          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.12] tracking-tight text-[#161616] mb-4">
            Four AI Tools Built into Your Learning Workflow
          </h2>

          <p className="text-[16px] lg:text-[18px] text-[#6B6F76] leading-relaxed">
            From tutoring students in active lessons to drafting course outlines and surfacing operational alerts for administrators.
          </p>
        </div>

        {/* ====================================================================== */}
        {/* DESKTOP PINNED SHOWCASE (>= 1024px) */}
        {/* ====================================================================== */}
        <div
          ref={pinnedWrapperRef}
          className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center min-h-[580px] will-change-transform"
        >
          {/* Vertical Progress Rail (1-4) on the far left */}
          <div className="col-span-1 flex flex-col items-center select-none py-2 shrink-0">
            {/* Step 1 */}
            <span ref={num1Ref} className="text-[15px] font-mono font-bold leading-none">
              1
            </span>
            <div className="w-[2px] h-16 bg-[#ECEDEF] relative overflow-hidden my-1 rounded-full">
              <div
                ref={seg1FillRef}
                className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
              />
            </div>

            {/* Step 2 */}
            <span ref={num2Ref} className="text-[15px] font-mono font-semibold leading-none text-[#9CA3AF]">
              2
            </span>
            <div className="w-[2px] h-16 bg-[#ECEDEF] relative overflow-hidden my-1 rounded-full">
              <div
                ref={seg2FillRef}
                className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
              />
            </div>

            {/* Step 3 */}
            <span ref={num3Ref} className="text-[15px] font-mono font-semibold leading-none text-[#9CA3AF]">
              3
            </span>
            <div className="w-[2px] h-16 bg-[#ECEDEF] relative overflow-hidden my-1 rounded-full">
              <div
                ref={seg3FillRef}
                className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
              />
            </div>

            {/* Step 4 */}
            <span ref={num4Ref} className="text-[15px] font-mono font-semibold leading-none text-[#9CA3AF]">
              4
            </span>
          </div>

          {/* Left Text Column: Eyebrow, H2, Summary, Bullets */}
          <div className="col-span-5 pr-4 relative min-h-[380px] flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTool.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                    {currentTool.badge}
                  </span>
                  {currentTool.audience && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-[#161616] border border-[#ECEDEF]">
                      {currentTool.audience}
                    </span>
                  )}
                </div>

                <h3 className="text-[28px] xl:text-[34px] font-bold text-[#161616] tracking-tight leading-tight">
                  {currentTool.name}
                </h3>

                <p className="text-[15px] xl:text-[16px] text-[#6B6F76] leading-relaxed">
                  {currentTool.summary}
                </p>

                {currentTool.bullets && currentTool.bullets.length > 0 && (
                  <ul className="space-y-2.5 pt-2">
                    {currentTool.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs xl:text-sm text-[#161616]">
                        <CheckCircle2 className="w-4 h-4 text-[#7B5CF5] shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Device Frame (Radius 28px, 16px Bezel, holding White App Window) */}
          <div className="col-span-6 flex justify-end">
            <div className="w-full max-w-[560px] bg-[#161616] p-4 rounded-[28px] shadow-2xl border border-white/10 transition-all">
              {/* Window Header */}
              <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-[#7B5CF5] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                    AI
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-tight block leading-tight text-white">
                      LMS Domain AI Studio
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {currentTool.name}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-semibold border border-white/10">
                  Premium Add-On
                </span>
              </div>

              {/* White App Window inside device frame */}
              <div className="w-full h-[400px] min-h-[400px] bg-white rounded-[20px] p-5 text-[#161616] shadow-inner relative overflow-hidden flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTool.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="h-full flex flex-col justify-between"
                  >
                    {renderIllustration(activeStep)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* MOBILE STACKED BLOCKS (< 1024px: No Pin, simple fade-up) */}
        {/* ====================================================================== */}
        <div className="lg:hidden space-y-12 sm:space-y-16">
          {tools.map((tool, idx) => (
            <div
              key={tool.id}
              className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#ECEDEF] p-6 sm:p-8 space-y-6 shadow-sm"
            >
              {/* Text */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#7B5CF5]">
                    {tool.badge}
                  </span>
                  {tool.audience && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F3F4F6] text-[#161616]">
                      {tool.audience}
                    </span>
                  )}
                </div>

                <h3 className="text-[22px] sm:text-[26px] font-bold text-[#161616] tracking-tight">
                  {tool.name}
                </h3>

                <p className="text-[14px] sm:text-[15px] text-[#6B6F76] leading-relaxed">
                  {tool.summary}
                </p>

                {tool.bullets && tool.bullets.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {tool.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#161616]">
                        <Check className="w-3.5 h-3.5 text-[#7B5CF5] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Window Illustration: with black frame on tablet, without on <640px */}
              <div className="sm:bg-[#161616] sm:p-3.5 sm:rounded-[24px] sm:shadow-lg">
                <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#ECEDEF] sm:border-transparent min-h-[340px] flex flex-col justify-between">
                  {renderIllustration(idx)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AiShowcase;
