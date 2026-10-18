"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { featuresContent } from "@/content/home/features";

export function FeaturesSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card3ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A09 Rear-Reveal Stacking Cards)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // Initial positions per Mota frame 8.5s:
        // Card 1 at 0
        // Card 2 at +46px (peeking under card 1 with unblurred 02 number label)
        // Card 3 at +92px (peeking under card 2 with unblurred 03 number label)
        gsap.set(card1Ref.current, { y: 0 });
        gsap.set(card2Ref.current, { y: 46 });
        gsap.set(card2ContentRef.current, { opacity: 0.2, filter: "blur(4px)" });
        gsap.set(card3Ref.current, { y: 92 });
        gsap.set(card3ContentRef.current, { opacity: 0.2, filter: "blur(4px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 90px",
            end: "+=200%",
            pin: true,
            pinSpacing: true,
            scrub: true,
          },
        });

        // ----------------------------------------------------
        // Segment 1 (timeline 0 -> 1): Card 1 leaves, Card 2 reveals
        // ----------------------------------------------------
        // Card 1 leaves upwards out of view (-110vh)
        tl.to(
          card1Ref.current,
          {
            y: "-110vh",
            ease: "none",
            duration: 1,
          },
          0
        );

        // Card 2 rises from +46px to 0
        tl.to(
          card2Ref.current,
          {
            y: 0,
            ease: "power1.out",
            duration: 1,
          },
          0
        );

        // Card 2 content clarifies over the last 60% of segment (0.4 -> 1.0)
        tl.to(
          card2ContentRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power1.out",
            duration: 0.6,
          },
          0.4
        );

        // Card 3 rises from +92px to +46px (now peeking under Card 2)
        tl.to(
          card3Ref.current,
          {
            y: 46,
            ease: "power1.out",
            duration: 1,
          },
          0
        );

        // ----------------------------------------------------
        // Segment 2 (timeline 1 -> 2): Card 2 leaves, Card 3 reveals
        // ----------------------------------------------------
        // Card 2 leaves upwards out of view (-110vh)
        tl.to(
          card2Ref.current,
          {
            y: "-110vh",
            ease: "none",
            duration: 1,
          },
          1
        );

        // Card 3 rises from +46px to 0
        tl.to(
          card3Ref.current,
          {
            y: 0,
            ease: "power1.out",
            duration: 1,
          },
          1
        );

        // Card 3 content clarifies over the last 60% of segment (1.4 -> 2.0)
        tl.to(
          card3ContentRef.current,
          {
            opacity: 1,
            filter: "blur(0px)",
            ease: "power1.out",
            duration: 0.6,
          },
          1.4
        );
      });

      // Mobile / Tablet: under 1024px (Normal stacked flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        // Clear any leftover inline transforms
        gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], { clearProps: "all" });
        gsap.set([card2ContentRef.current, card3ContentRef.current], { clearProps: "all" });
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  const card1 = featuresContent.cards[0];
  const card2 = featuresContent.cards[1];
  const card3 = featuresContent.cards[2];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F3F4F6] font-urbanist overflow-visible">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Mota Exact Style) */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#161616] tracking-tight leading-tight">
            {featuresContent.sectionTitle}
          </h2>
        </div>

        {/* Pinned Stage Wrapper (Desktop: pinned 200vh sequence; Mobile: vertical flow) */}
        <div ref={pinWrapperRef} className="relative w-full flex justify-center items-center py-4 overflow-visible">
          {/* Card Frame Geometry: Wide card format matching Mota frame 8.5s */}
          <div className="relative w-full max-w-[1320px] h-[470px] sm:h-[490px] hidden lg:block overflow-visible">
            {/* ======================================================== */}
            {/* Card 01: Courses that run themselves (z-index: 30) */}
            {/* ======================================================== */}
            <div
              ref={card1Ref}
              className="absolute inset-0 rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden z-30 will-change-transform"
            >
              <div className="grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Column: Title & Subtitle */}
                <div className="col-span-5 space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                    {card1.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                    {card1.summary}
                  </p>
                </div>

                {/* Right Column: Course Structure & Watermark Diagram */}
                <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                  {/* Connecting Line with Center Icon */}
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-slate-200" />
                    <div className="absolute size-11 rounded-2xl bg-[#161616] text-white flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>

                  {/* Top-Right Overlapping Video Player Card */}
                  <div className="relative -mr-12 mb-20 w-72 rounded-2xl overflow-hidden bg-[#161616] p-4 border border-slate-800 shadow-md text-white">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 border-b border-white/10">
                      <span className="font-semibold text-white">Lesson 04: Structured Sections</span>
                      <span className="text-[#7B5CF5] font-mono text-[10px] font-semibold">Video + PDF</span>
                    </div>
                    <div className="py-5 text-center">
                      <div className="size-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-white text-sm">
                        ▶
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-[#7B5CF5]" />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Drip: Unlocks on progress</span>
                      <span className="text-emerald-400">Watermarked Video</span>
                    </div>
                  </div>

                  {/* Bottom-Left Overlapping Watermark & Device Limits Card */}
                  <div className="relative -ml-12 mt-20 w-64 rounded-2xl overflow-hidden bg-white p-4 border border-slate-200 shadow-lg text-slate-900">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      LESSON INTEGRITY
                    </span>
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-mono text-[11px] text-slate-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Watermark:</span>
                        <span className="text-emerald-600 font-bold">Enabled</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Device limits:</span>
                        <span>1 Active Session</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#7B5CF5] font-semibold">
                      <span className="size-1.5 rounded-full bg-[#7B5CF5] animate-pulse" />
                      <span>Video • Text • PDF • Documents</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Index label: "01" bottom-left, 15px, near-black */}
              <div className="absolute bottom-4 sm:bottom-5 left-8 text-[15px] font-mono font-semibold text-[#161616]">
                01
              </div>
            </div>

            {/* ======================================================== */}
            {/* Card 02: Assess and certify (z-index: 20) */}
            {/* ======================================================== */}
            <div
              ref={card2Ref}
              className="absolute inset-0 rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden z-20 will-change-transform"
            >
              <div ref={card2ContentRef} className="h-full flex flex-col justify-between">
                <div className="grid grid-cols-12 gap-8 items-center h-full">
                  {/* Left Column: Title & Subtitle */}
                  <div className="col-span-5 space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                      {card2.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                      {card2.summary}
                    </p>
                  </div>

                  {/* Right Column: Concentric Orbit Graphic for Assessments */}
                  <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                    {/* Left Quiz Card */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-44 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-sm z-10 text-xs">
                      <span className="text-[10px] font-bold text-[#7B5CF5] uppercase tracking-wider block">QUIZ EVALUATION</span>
                      <p className="font-semibold text-slate-800 text-[11px] mt-1">Graded Quiz #3</p>
                      <div className="mt-2 text-[10px] text-emerald-600 font-semibold">Automated Scoring: 92%</div>
                    </div>

                    {/* Center Radar Rings Container */}
                    <div className="relative size-72 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-slate-200/80 pointer-events-none" />
                      <div className="absolute inset-8 rounded-full border border-slate-200/70 pointer-events-none" />
                      <div className="absolute inset-16 rounded-full border border-slate-200/60 pointer-events-none" />
                      <div className="absolute inset-24 rounded-full border border-slate-200/50 pointer-events-none" />

                      {/* Center Award/Check Tile */}
                      <div className="size-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm z-10">
                        <svg className="size-6 text-[#7B5CF5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>

                      {/* Orbiting Assessment Tool Category Pills */}
                      <div className="absolute top-2 left-10 px-2.5 py-1 rounded-xl bg-purple-100 text-[#7B5CF5] text-[10px] font-bold shadow-2xs">
                        Graded Quizzes
                      </div>
                      <div className="absolute top-6 right-8 px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-[10px] font-bold shadow-2xs">
                        Certificates
                      </div>
                      <div className="absolute bottom-6 left-8 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-[10px] font-bold shadow-2xs">
                        Instructor Review
                      </div>
                      <div className="absolute bottom-3 right-8 px-2.5 py-1 rounded-xl bg-pink-100 text-pink-800 text-[10px] font-bold shadow-2xs">
                        In-Video Checkpoints
                      </div>
                    </div>

                    {/* Certificate Card Right */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-44 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-sm z-10 text-xs">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">COMPLETION</span>
                      <div className="font-bold text-slate-800 text-[11px] mt-1">Certificate Issued</div>
                      <div className="mt-1 text-[10px] text-slate-500">Configurable Design ✓</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Index label: "02" bottom-left, rendered in peeking bottom shelf, crisp & unblurred */}
              <div className="absolute bottom-3 left-8 text-[15px] font-mono font-semibold text-[#161616] z-20 pointer-events-none">
                02
              </div>
            </div>

            {/* ======================================================== */}
            {/* Card 03: Live and cohort learning (z-index: 10) */}
            {/* ======================================================== */}
            <div
              ref={card3Ref}
              className="absolute inset-0 rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden z-10 will-change-transform"
            >
              <div ref={card3ContentRef} className="h-full flex flex-col justify-between">
                <div className="grid grid-cols-12 gap-8 items-center h-full">
                  {/* Left Column: Title & Subtitle */}
                  <div className="col-span-5 space-y-4">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                      {card3.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                      {card3.summary}
                    </p>
                  </div>

                  {/* Right Column: Live Classes & Tutor Booking Visual */}
                  <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                    {/* Primary Top Video Tile (Live Class with Zoom) */}
                    <div className="relative -mr-10 mb-16 w-72 rounded-3xl overflow-hidden bg-[#161616] p-4 border border-slate-800 shadow-md text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold uppercase tracking-wider">
                          ZOOM LIVE
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">Recurring Bootcamp</span>
                      </div>
                      <div className="py-6 text-center">
                        <span className="text-2xl">📹</span>
                        <h5 className="font-bold text-xs mt-1">Live Interactive Class</h5>
                        <p className="text-[10px] text-slate-400">Class Recording Saved to Course</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10">
                        <span className="text-emerald-400">● Zoom Integrated</span>
                        <span>Interactive Attendance</span>
                      </div>
                    </div>

                    {/* Secondary Bottom Card (Tutor Booking & Team Training) */}
                    <div className="relative -ml-10 mt-16 w-72 rounded-3xl overflow-hidden bg-white p-4 border border-slate-200 shadow-lg text-slate-900">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 text-xs">1-on-1 Tutor Booking</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">Confirmed</span>
                      </div>
                      <div className="py-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-50">
                          <span>Team Training Package</span>
                          <span className="font-bold text-[#7B5CF5]">Enterprise Ready</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                        <span>Cohort Bootcamps</span>
                        <span className="text-emerald-600 font-semibold">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Index label: "03" bottom-left, rendered in peeking bottom shelf, crisp & unblurred */}
              <div className="absolute bottom-3 left-8 text-[15px] font-mono font-semibold text-[#161616] z-20 pointer-events-none">
                03
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Mobile / Tablet Responsive Fallback (Vertical Flow) */}
          {/* ======================================================== */}
          <div className="w-full flex flex-col gap-6 lg:hidden">
            {/* Card 1 */}
            <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                  {card1.title}
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  {card1.summary}
                </p>
              </div>
              <div className="pt-6 text-xs font-mono font-semibold text-[#161616]">01</div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                  {card2.title}
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  {card2.summary}
                </p>
              </div>
              <div className="pt-6 text-xs font-mono font-semibold text-[#161616]">02</div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                  {card3.title}
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  {card3.summary}
                </p>
              </div>
              <div className="pt-6 text-xs font-mono font-semibold text-[#161616]">03</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
