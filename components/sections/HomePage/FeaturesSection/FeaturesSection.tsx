"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
            Everything you need to deliver and protect learning
          </h2>
        </div>

        {/* Pinned Stage Wrapper (Desktop: pinned 200vh sequence; Mobile: vertical flow) */}
        <div ref={pinWrapperRef} className="relative w-full flex justify-center items-center py-4 overflow-visible">
          {/* Card Frame Geometry: Wide card format matching Mota frame 8.5s */}
          <div className="relative w-full max-w-[1320px] h-[470px] sm:h-[490px] hidden lg:block overflow-visible">
            {/* ======================================================== */}
            {/* Card 01: Hardware DRM Video Protection (z-index: 30) */}
            {/* ======================================================== */}
            <div
              ref={card1Ref}
              className="absolute inset-0 rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-8 sm:p-12 lg:p-14 flex flex-col justify-between overflow-hidden z-30 will-change-transform"
            >
              <div className="grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Column: Title & Subtitle */}
                <div className="col-span-5 space-y-4">
                  <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                    Hardware L1 Video DRM
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                    Widevine L1 and FairPlay decrypt streams inside the device hardware TEE. Any screen capture software receives black pixels, backed by dynamic forensic watermarking.
                  </p>
                </div>

                {/* Right Column: Encrypted Player & Forensic Watermark Diagram */}
                <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                  {/* Connecting Line with Center Icon */}
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-px bg-slate-200" />
                    <div className="absolute size-11 rounded-2xl bg-[#161616] text-white flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <path d="M9 9h6v6H9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Top-Right Overlapping Video Player Card */}
                  <div className="relative -mr-12 mb-20 w-72 rounded-2xl overflow-hidden bg-[#161616] p-4 border border-slate-800 shadow-md text-white">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 border-b border-white/10">
                      <span className="font-semibold text-white">Lecture 04: Cloud DRM</span>
                      <span className="text-emerald-400 font-mono">1080p HLS</span>
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
                      <span>14:28 / 45:00</span>
                      <span className="text-emerald-400">Widevine L1 Active</span>
                    </div>
                  </div>

                  {/* Bottom-Left Overlapping Watermark Card */}
                  <div className="relative -ml-12 mt-20 w-64 rounded-2xl overflow-hidden bg-white p-4 border border-slate-200 shadow-lg text-slate-900">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      FORENSIC WATERMARK
                    </span>
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-mono text-[11px] text-slate-700">
                      <div>User: #LMS-9481</div>
                      <div className="text-[10px] text-slate-400">IP: 192.168.1.104</div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Hardware Memory Guard Active</span>
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
            {/* Card 02: Curriculum & SCORM Hub (z-index: 20) */}
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
                      Curriculum & SCORM Hub
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                      Organize, version, and deliver interactive SCORM 2004 modules, multi-bitrate 4K video, PDFs, and assessments in one isolated tenant cloud.
                    </p>
                  </div>

                  {/* Right Column: Concentric Radar Orbit Graphic */}
                  <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                    {/* Module Card Left */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-40 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-sm z-10 text-xs">
                      <span className="text-[10px] font-bold text-[#7B5CF5] uppercase tracking-wider block">MODULE 02</span>
                      <p className="font-semibold text-slate-800 text-[11px] mt-1">Distributed Systems</p>
                      <div className="mt-2 text-[10px] text-slate-400">14 Lessons • 3 SCORM</div>
                    </div>

                    {/* Center Radar Rings Container */}
                    <div className="relative size-72 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-slate-200/80 pointer-events-none" />
                      <div className="absolute inset-8 rounded-full border border-slate-200/70 pointer-events-none" />
                      <div className="absolute inset-16 rounded-full border border-slate-200/60 pointer-events-none" />
                      <div className="absolute inset-24 rounded-full border border-slate-200/50 pointer-events-none" />

                      {/* Center Folder Tile */}
                      <div className="size-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm z-10">
                        <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                      </div>

                      {/* Orbiting Pastel File Category Pills */}
                      <div className="absolute top-2 left-12 px-2.5 py-1 rounded-xl bg-pink-100 text-pink-700 text-[10px] font-bold shadow-2xs">
                        SCORM 2004
                      </div>
                      <div className="absolute top-6 right-8 px-2.5 py-1 rounded-xl bg-amber-100 text-amber-700 text-[10px] font-bold shadow-2xs">
                        4K HLS
                      </div>
                      <div className="absolute bottom-6 left-12 px-2.5 py-1 rounded-xl bg-cyan-100 text-cyan-700 text-[10px] font-bold shadow-2xs">
                        PDF Notes
                      </div>
                      <div className="absolute bottom-3 right-12 px-2.5 py-1 rounded-xl bg-purple-100 text-purple-700 text-[10px] font-bold shadow-2xs">
                        Audio Lab
                      </div>
                    </div>

                    {/* Learner Progress Card Right */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-40 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-sm z-10 text-xs">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">PROGRESS</span>
                      <div className="font-bold text-slate-800 text-sm mt-1">84 %</div>
                      <div className="mt-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[84%]" />
                      </div>
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
            {/* Card 03: Live Interactive Classrooms (z-index: 10) */}
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
                      Live Classrooms & Cohorts
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                      Host low-latency interactive WebRTC lectures, breakout rooms, and live Q&A with automated student attendance syncing directly inside your portal.
                    </p>
                  </div>

                  {/* Right Column: Conference Video Tiles with Participant Tags */}
                  <div className="col-span-7 relative flex items-center justify-center min-h-[340px]">
                    {/* Primary Top Video Tile (Faculty Lead) */}
                    <div className="relative -mr-10 mb-16 w-72 rounded-3xl overflow-hidden bg-[#161616] p-4 border border-slate-800 shadow-md text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-rose-600 text-[10px] font-bold uppercase tracking-wider">
                          LIVE
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">1080p60 WebRTC</span>
                      </div>
                      <div className="py-6 text-center">
                        <span className="text-2xl">👨‍🏫</span>
                        <h5 className="font-bold text-xs mt-1">Dr. Sarah Jenkins</h5>
                        <p className="text-[10px] text-slate-400">Faculty Lead • Distributed Systems</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10">
                        <span className="text-emerald-400">● Mic Active</span>
                        <span>Attendance Sync Active</span>
                      </div>
                    </div>

                    {/* Secondary Bottom Video Tile (Cohort Breakout) */}
                    <div className="relative -ml-10 mt-16 w-72 rounded-3xl overflow-hidden bg-white p-4 border border-slate-200 shadow-lg text-slate-900">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 text-xs">Cohort 14 Breakout</span>
                        <span className="text-[11px] font-mono text-emerald-600 font-bold">142 Joined</span>
                      </div>
                      <div className="py-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-50">
                          <span>Quiz: Event Loop Concurrency</span>
                          <span className="font-bold text-[#7B5CF5]">94% Submitted</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                        <span>Breakout Pods: 8 Active</span>
                        <span className="text-emerald-600 font-semibold">Zero Lag</span>
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
                  Hardware L1 Video DRM
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  Widevine L1 and FairPlay decrypt streams inside the device hardware TEE. Any screen capture software receives black pixels.
                </p>
              </div>
              <div className="pt-6 text-xs font-mono font-semibold text-[#161616]">01</div>
            </div>

            {/* Card 2 */}
            <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                  Curriculum & SCORM Hub
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  Organize, version, and deliver interactive SCORM 2004 modules, multi-bitrate 4K video, PDFs, and assessments in one isolated tenant cloud.
                </p>
              </div>
              <div className="pt-6 text-xs font-mono font-semibold text-[#161616]">02</div>
            </div>

            {/* Card 3 */}
            <div className="rounded-[32px] bg-white border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                  Live Classrooms & Cohorts
                </h3>
                <p className="text-sm text-[#6B6F76] leading-relaxed">
                  Host low-latency interactive WebRTC lectures, breakout rooms, and live Q&A with automated student attendance syncing.
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
