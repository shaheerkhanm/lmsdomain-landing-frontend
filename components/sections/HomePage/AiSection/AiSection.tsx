"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { aiSectionContent } from "@/content/home/ai";

export function AiSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
  const [typedChars, setTypedChars] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRowRef = useRef<HTMLDivElement>(null);

  // Rail numbers & segment fills
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  const seg1FillRef = useRef<HTMLDivElement>(null);
  const seg2FillRef = useRef<HTMLDivElement>(null);
  const seg3FillRef = useRef<HTMLDivElement>(null);

  // Text column step containers
  const text0Ref = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  // Simulated typing effect for tutor response when Tab 0 is active
  const tutorFullResponse =
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor evaluation.";

  useEffect(() => {
    if (activeTab === 0) {
      setTypedChars(0);
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= tutorFullResponse.length) {
            clearInterval(interval);
            return tutorFullResponse.length;
          }
          return prev + 3;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (Pinned row only, centered, header scrolls away)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // Initial rail states
        gsap.set(num1Ref.current, { color: "#FFFFFF" });
        gsap.set([num2Ref.current, num3Ref.current, num4Ref.current], {
          color: "#6B7280",
        });
        gsap.set(
          [seg1FillRef.current, seg2FillRef.current, seg3FillRef.current],
          { scaleY: 0, transformOrigin: "top" }
        );

        // Initial text states: Step 0 visible, 1-3 hidden below (+40px)
        gsap.set(text0Ref.current, { y: 0, opacity: 1, pointerEvents: "auto" });
        gsap.set(
          [text1Ref.current, text2Ref.current, text3Ref.current],
          { y: 40, opacity: 0, pointerEvents: "none" }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinnedRowRef.current,
            start: "center center",
            end: "+=320%",
            pin: true,
            pinSpacing: true,
            scrub: 0.5,
            onUpdate: (self) => {
              const p = self.progress;
              let nextTab: 0 | 1 | 2 | 3 = 0;
              if (p >= 0.75) nextTab = 3;
              else if (p >= 0.5) nextTab = 2;
              else if (p >= 0.25) nextTab = 1;
              else nextTab = 0;
              setActiveTab((prev) => (prev !== nextTab ? nextTab : prev));
            },
          },
        });

        // ====================================================
        // Segment 1 (0 -> 1): Step 0 -> Step 1
        // ====================================================
        // Line 1 fills with #7B5CF5 (80px segment)
        tl.to(
          seg1FillRef.current,
          { scaleY: 1, ease: "none", duration: 1 },
          0
        );
        // Num 2 turns white as segment completes
        tl.to(
          num2Ref.current,
          { color: "#FFFFFF", duration: 0.2 },
          0.8
        );
        // Text 0 exits up (-40px, fades out)
        tl.to(
          text0Ref.current,
          { y: -40, opacity: 0, pointerEvents: "none", duration: 0.35, ease: "power1.inOut" },
          0.7
        );
        // Text 1 enters from below (+40px -> 0, fades in)
        tl.to(
          text1Ref.current,
          { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.35, ease: "power1.inOut" },
          0.75
        );

        // ====================================================
        // Segment 2 (1 -> 2): Step 1 -> Step 2
        // ====================================================
        // Line 2 fills with #7B5CF5
        tl.to(
          seg2FillRef.current,
          { scaleY: 1, ease: "none", duration: 1 },
          1
        );
        // Num 3 turns white
        tl.to(
          num3Ref.current,
          { color: "#FFFFFF", duration: 0.2 },
          1.8
        );
        // Text 1 exits up
        tl.to(
          text1Ref.current,
          { y: -40, opacity: 0, pointerEvents: "none", duration: 0.35, ease: "power1.inOut" },
          1.7
        );
        // Text 2 enters from below
        tl.to(
          text2Ref.current,
          { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.35, ease: "power1.inOut" },
          1.75
        );

        // ====================================================
        // Segment 3 (2 -> 3): Step 2 -> Step 3
        // ====================================================
        // Line 3 fills with #7B5CF5
        tl.to(
          seg3FillRef.current,
          { scaleY: 1, ease: "none", duration: 1 },
          2
        );
        // Num 4 turns white
        tl.to(
          num4Ref.current,
          { color: "#FFFFFF", duration: 0.2 },
          2.8
        );
        // Text 2 exits up
        tl.to(
          text2Ref.current,
          { y: -40, opacity: 0, pointerEvents: "none", duration: 0.35, ease: "power1.inOut" },
          2.7
        );
        // Text 3 enters from below
        tl.to(
          text3Ref.current,
          { y: 0, opacity: 1, pointerEvents: "auto", duration: 0.35, ease: "power1.inOut" },
          2.75
        );
      });

      // Mobile / Tablet: under 1024px (Normal stacked flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          [
            text0Ref.current,
            text1Ref.current,
            text2Ref.current,
            text3Ref.current,
            num1Ref.current,
            num2Ref.current,
            num3Ref.current,
            num4Ref.current,
            seg1FillRef.current,
            seg2FillRef.current,
            seg3FillRef.current,
          ],
          { clearProps: "all" }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentTab = aiSectionContent.tabs[activeTab];

  return (
    <section
      ref={sectionRef}
      id="extension"
      className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-white font-urbanist relative overflow-visible"
    >
      <div
        id="ai-studio"
        className="max-w-7xl mx-auto rounded-[36px] sm:rounded-[48px] lg:rounded-[56px] bg-[#161616] text-white py-12 sm:py-16 lg:pt-16 lg:pb-20 px-6 sm:px-10 lg:px-14 relative overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Soft Accent Glow behind Window */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] lg:w-[600px] h-[480px] lg:h-[600px] bg-[#7B5CF5]/15 rounded-full blur-[130px] pointer-events-none -z-0"
          aria-hidden="true"
        />

        {/* Section Header: Scrolls normally and leaves screen before pin */}
        <div className="max-w-3xl mb-12 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C9CCD1] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="text-[#7B5CF5]">✦</span>
            <span>{aiSectionContent.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            {aiSectionContent.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#C9CCD1] max-w-2xl leading-relaxed">
            {aiSectionContent.subtitle}
          </p>
        </div>

        {/* Mobile Horizontal Tabs Row (<1024px, no pin) */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 pb-6 relative z-10 -mx-1 px-1">
          {aiSectionContent.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx as 0 | 1 | 2 | 3)}
                className={`px-4 py-2.5 min-h-[44px] flex items-center justify-center rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#7B5CF5] text-white shadow-md font-bold"
                    : "bg-white/10 text-[#C9CCD1] hover:bg-white/15 hover:text-white"
                }`}
              >
                {tab.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Pinned Interactive Row (Desktop >=1024px): Max 600px tall, vertically centered */}
        <div
          ref={pinnedRowRef}
          className="w-full max-h-[600px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 will-change-transform"
        >
          {/* Left Column: Numbered Rail + Active Step Text (40px) */}
          <div className="hidden lg:flex lg:col-span-5 items-center">
            {/* Numbered Progress Rail (~6% from left) */}
            <div className="flex flex-col items-center select-none w-6 shrink-0 py-2">
              {/* Step 1 */}
              <span
                ref={num1Ref}
                className="text-[14px] font-mono font-bold transition-colors leading-none"
              >
                1
              </span>
              {/* Segment 1: 80px long, 2px wide */}
              <div className="w-[2px] h-20 bg-white/15 relative overflow-hidden my-1 rounded-full">
                <div
                  ref={seg1FillRef}
                  className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
                />
              </div>

              {/* Step 2 */}
              <span
                ref={num2Ref}
                className="text-[14px] font-mono font-bold transition-colors leading-none"
              >
                2
              </span>
              {/* Segment 2: 80px long, 2px wide */}
              <div className="w-[2px] h-20 bg-white/15 relative overflow-hidden my-1 rounded-full">
                <div
                  ref={seg2FillRef}
                  className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
                />
              </div>

              {/* Step 3 */}
              <span
                ref={num3Ref}
                className="text-[14px] font-mono font-bold transition-colors leading-none"
              >
                3
              </span>
              {/* Segment 3: 80px long, 2px wide */}
              <div className="w-[2px] h-20 bg-white/15 relative overflow-hidden my-1 rounded-full">
                <div
                  ref={seg3FillRef}
                  className="absolute inset-x-0 top-0 bottom-0 bg-[#7B5CF5] rounded-full origin-top"
                />
              </div>

              {/* Step 4 */}
              <span
                ref={num4Ref}
                className="text-[14px] font-mono font-bold transition-colors leading-none"
              >
                4
              </span>
            </div>

            {/* Text Column (Only Active Step Shown, title 40px, transitions +/- 40px) */}
            <div className="ml-8 sm:ml-10 max-w-md relative min-h-[220px] flex items-center flex-1">
              {/* Step 0 Text */}
              <div
                ref={text0Ref}
                className="absolute inset-x-0 will-change-transform space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7CF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ADD-ON</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.15]">
                  {aiSectionContent.tabs[0].title}
                </h3>
                <p className="text-base text-[#C9CCD1] leading-relaxed">
                  {aiSectionContent.tabs[0].description}
                </p>
              </div>

              {/* Step 1 Text */}
              <div
                ref={text1Ref}
                className="absolute inset-x-0 will-change-transform space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7CF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ADD-ON</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.15]">
                  {aiSectionContent.tabs[1].title}
                </h3>
                <p className="text-base text-[#C9CCD1] leading-relaxed">
                  {aiSectionContent.tabs[1].description}
                </p>
              </div>

              {/* Step 2 Text */}
              <div
                ref={text2Ref}
                className="absolute inset-x-0 will-change-transform space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7CF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ADD-ON</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.15]">
                  {aiSectionContent.tabs[2].title}
                </h3>
                <p className="text-base text-[#C9CCD1] leading-relaxed">
                  {aiSectionContent.tabs[2].description}
                </p>
              </div>

              {/* Step 3 Text */}
              <div
                ref={text3Ref}
                className="absolute inset-x-0 will-change-transform space-y-2.5"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8E7CF8] tracking-wider uppercase">
                  <span>✦</span>
                  <span>AI ADD-ON</span>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.15]">
                  {aiSectionContent.tabs[3].title}
                </h3>
                <p className="text-base text-[#C9CCD1] leading-relaxed">
                  {aiSectionContent.tabs[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Studio Window (At most 560px tall) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="max-h-[560px] w-full rounded-[28px] sm:rounded-[36px] bg-[#1E1F23] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-5 sm:p-6 lg:p-7 space-y-5">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-xl bg-[#7B5CF5] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    AI
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-bold tracking-tight text-white block leading-tight">
                      LMS Domain AI Studio
                    </span>
                    <span className="text-[10px] text-[#C9CCD1] font-mono">
                      {currentTab.title}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#7B5CF5]/20 text-[#C9CCD1] text-[10px] font-semibold border border-[#7B5CF5]/30">
                  Premium Add-On
                </span>
              </div>

              {/* 4 Tool Switcher Tabs inside Window */}
              <div className="grid grid-cols-4 gap-1.5 bg-white/5 p-1 rounded-xl text-xs font-medium border border-white/10">
                {aiSectionContent.tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx as 0 | 1 | 2 | 3)}
                    className={`py-1.5 px-1 rounded-lg transition-all cursor-pointer text-center truncate text-[10px] sm:text-xs ${
                      activeTab === idx
                        ? "bg-[#7B5CF5] text-white shadow-sm font-semibold"
                        : "text-[#C9CCD1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.shortLabel}
                  </button>
                ))}
              </div>

              {/* Window Content: 4 Distinct AI Tool Views */}
              <div className="min-h-[260px] flex flex-col justify-center">
                {/* 1. HelpDesk AI tutor */}
                {activeTab === 0 && (
                  <div className="space-y-3.5 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-white/10 border border-white/10 px-3.5 py-2.5 text-xs text-white">
                        <p className="font-medium">
                          What&apos;s the difference between a quiz and an assignment?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="size-7 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        AI
                      </div>
                      <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-white/5 border border-white/10 p-3.5 text-xs text-[#C9CCD1] space-y-2">
                        <p className="leading-relaxed">
                          {tutorFullResponse.slice(0, typedChars)}
                          {typedChars < tutorFullResponse.length && (
                            <span className="inline-block w-1.5 h-3 bg-[#7B5CF5] ml-1 animate-pulse align-middle" />
                          )}
                        </p>

                        <div className="pt-0.5">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#7B5CF5]/20 border border-[#7B5CF5]/30 text-[#A78BFA] text-[10px] font-semibold">
                            <span>✦</span>
                            From your course: Module 2
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#C9CCD1]">
                      <span>Course History Saved</span>
                      <span className="text-[#A78BFA] font-medium">Context-Aware AI Tutor</span>
                    </div>
                  </div>
                )}

                {/* 2. Domie AI content generator */}
                {activeTab === 1 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          DRAFTED COURSE TITLE
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-white">
                          Python Basics for Beginners
                        </p>
                        <p className="text-[11px] text-[#C9CCD1] leading-relaxed">
                          Build programming fundamentals, write real scripts, and automate daily tasks with Python.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                        <span className="text-[9px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          3 LEARNING OUTCOMES
                        </span>
                        <ul className="text-[11px] text-[#C9CCD1] space-y-1 leading-snug">
                          <li className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Write and execute clean Python syntax and functions</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Manipulate data structures, files, and external APIs</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Construct practical automation scripts from scratch</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-[#C9CCD1]">
                        Draft titles, descriptions & outcomes
                      </span>
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-lg bg-[#7B5CF5] hover:bg-[#6D4AE8] text-white text-[11px] font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Edit & Publish
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. AI prescriptive analytics */}
                {activeTab === 2 && (
                  <div className="space-y-2.5 animate-in fade-in duration-200">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-white">
                        <span className="size-1.5 rounded-full bg-amber-400" />
                        <span className="font-medium">Enrolments falling in Python Basics</span>
                      </div>
                      <span className="text-[9px] font-semibold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded">
                        Attention
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-white">
                        <span className="size-1.5 rounded-full bg-[#7B5CF5]" />
                        <span className="font-medium">2 coupons expire this week</span>
                      </div>
                      <span className="text-[9px] font-semibold text-purple-300 bg-purple-500/20 px-1.5 py-0.5 rounded">
                        Action
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 text-white">
                        <span className="size-1.5 rounded-full bg-rose-400" />
                        <span className="font-medium">Low engagement in Module 4</span>
                      </div>
                      <span className="text-[9px] font-semibold text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded">
                        Drop-off
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#A78BFA]">
                        <span>✦</span>
                        <span>Prescriptive Recommendation</span>
                      </div>
                      <p className="text-[11px] text-[#C9CCD1] leading-relaxed">
                        Review Module 4 checkpoint tasks and launch a reminder email for expiring promotions.
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#C9CCD1]">
                      <span>Continuous Academy Monitoring</span>
                      <span className="text-amber-400 font-medium">3 Suggested Actions</span>
                    </div>
                  </div>
                )}

                {/* 4. AI command bar */}
                {activeTab === 3 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white">
                      <svg className="size-3.5 text-[#A78BFA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-medium text-white truncate text-[11px]">Search or ask anything…</span>
                      <span className="ml-auto text-[9px] font-mono text-[#C9CCD1] bg-white/10 border border-white/15 px-1.5 py-0.5 rounded">
                        ⌘K
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-[11px] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-xs">⚙️</span>
                          <span className="font-medium">Settings / Custom Domain & SSL</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#A78BFA] bg-purple-500/20 px-1.5 py-0.5 rounded">
                          Admin page
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-[11px] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-xs">📚</span>
                          <span className="font-medium">Python Basics for Beginners</span>
                        </div>
                        <span className="text-[9px] font-mono text-[#A78BFA] bg-purple-500/20 px-1.5 py-0.5 rounded">
                          Course
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-[11px] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-xs">💬</span>
                          <span className="font-medium">How do I schedule recurring live classes with Zoom?</span>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                          Platform question
                        </span>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px] text-[#C9CCD1]">
                      <span>One search box for admin and answers</span>
                      <span className="text-[#A78BFA] font-medium">Instant Access</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSection;