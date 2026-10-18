"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { featuresContent } from "@/content/home/features";

export function FeaturesSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card3ContentRef = useRef<HTMLDivElement>(null);

  // VisualRefs for Card 1
  const c1MainImgRef = useRef<HTMLDivElement>(null);
  const c1SecondPanelRef = useRef<HTMLDivElement>(null);
  const c1ChipRef = useRef<HTMLDivElement>(null);
  const c1SvgPathRef = useRef<SVGPathElement>(null);

  // VisualRefs for Card 2
  const c2MainImgRef = useRef<HTMLDivElement>(null);
  const c2SecondPanelRef = useRef<HTMLDivElement>(null);
  const c2ChipRef = useRef<HTMLDivElement>(null);
  const c2SvgPathRef = useRef<SVGPathElement>(null);

  // VisualRefs for Card 3
  const c3MainImgRef = useRef<HTMLDivElement>(null);
  const c3SecondPanelRef = useRef<HTMLDivElement>(null);
  const c3ChipRef = useRef<HTMLDivElement>(null);
  const c3SvgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (Mota exact paper-stacking cards)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // Card 1 starts at top: 0px, settled.
        // Card 2 starts below (y: 440px), showing its top strip "02" at bottom of Card 1.
        // Card 2 content starts pale (opacity 0.25, light grey). NO BLUR.
        // Card 3 starts below Card 2 (y: 486px), showing its top strip "03". Content opacity: 0.25. NO BLUR.
        gsap.set(card1Ref.current, { y: 0, zIndex: 10 });
        gsap.set(card2Ref.current, { y: 440, zIndex: 20 });
        gsap.set(card2ContentRef.current, { opacity: 0.25 });
        gsap.set(card3Ref.current, { y: 486, zIndex: 30 });
        gsap.set(card3ContentRef.current, { opacity: 0.25 });

        // Initial setup for inner visuals animations
        gsap.set([c2MainImgRef.current, c3MainImgRef.current], { x: 40, opacity: 0 });
        gsap.set([c2SecondPanelRef.current, c3SecondPanelRef.current], { scale: 0.9, opacity: 0 });
        gsap.set([c2ChipRef.current, c3ChipRef.current], { scale: 0.85, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 90px",
            end: "+=220%",
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
          },
        });

        // ----------------------------------------------------
        // Segment 1 (progress 0 -> 1): Card 02 arrives from below and covers Card 01
        // Card 01 remains in place at y: 0. Its top strip (0px -> 48px) stays visible with "01" label!
        // Card 02 rises from y: 440 to y: 48px!
        // ----------------------------------------------------
        tl.to(
          card2Ref.current,
          {
            y: 48,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );

        // Card 02 content reaches full color (opacity 0.25 -> 1.0) without blur
        tl.to(
          card2ContentRef.current,
          {
            opacity: 1,
            ease: "power1.out",
            duration: 0.8,
          },
          0.1
        );

        // Card 02 inner visual motion (0 -> 0.4 main image, 0.2 -> 0.6 second panel, 0.4 -> 0.8 chip)
        tl.to(
          c2MainImgRef.current,
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.4,
          },
          0.1
        );

        tl.to(
          c2SecondPanelRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.2)",
            duration: 0.4,
          },
          0.3
        );

        tl.to(
          c2ChipRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          },
          0.5
        );

        // Card 03 strip rises slightly with Card 02 to stay peeking at bottom
        tl.to(
          card3Ref.current,
          {
            y: 486,
            ease: "none",
            duration: 1,
          },
          0
        );

        // ----------------------------------------------------
        // Segment 2 (progress 1 -> 2): Card 03 arrives from below and covers Card 02
        // Card 02 top strip (48px -> 96px) stays visible with "02" label!
        // Card 03 rises from y: 486 to y: 96px!
        // ----------------------------------------------------
        tl.to(
          card3Ref.current,
          {
            y: 96,
            ease: "power1.inOut",
            duration: 1,
          },
          1
        );

        // Card 03 content reaches full color (opacity 0.25 -> 1.0) without blur
        tl.to(
          card3ContentRef.current,
          {
            opacity: 1,
            ease: "power1.out",
            duration: 0.8,
          },
          1.1
        );

        // Card 03 inner visual motion
        tl.to(
          c3MainImgRef.current,
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.4,
          },
          1.1
        );

        tl.to(
          c3SecondPanelRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.2)",
            duration: 0.4,
          },
          1.3
        );

        tl.to(
          c3ChipRef.current,
          {
            scale: 1,
            opacity: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
          },
          1.5
        );
      });

      // Mobile / Tablet: under 1024px (Normal stacked flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          { clearProps: "all" }
        );
        gsap.set(
          [card2ContentRef.current, card3ContentRef.current],
          { clearProps: "all" }
        );
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, []);

  const card1 = featuresContent.cards[0];
  const card2 = featuresContent.cards[1];
  const card3 = featuresContent.cards[2];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F3F4F6] font-urbanist overflow-visible">
      <div className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#161616] tracking-tight leading-tight">
            {featuresContent.sectionTitle}
          </h2>
        </div>

        {/* Pinned Stage Wrapper */}
        <div
          ref={pinWrapperRef}
          className="relative w-full flex justify-center items-center py-4 overflow-visible"
        >
          {/* Card Frame Geometry: Wide card format matching Mota reference */}
          <div className="relative w-full max-w-[1280px] h-[520px] hidden lg:block overflow-visible">
            {/* ======================================================== */}
            {/* Card 01: Courses that run themselves (Bottom of stack) */}
            {/* ======================================================== */}
            <div
              ref={card1Ref}
              className="absolute inset-0 rounded-[36px] bg-white border border-[#ECEDEF] p-8 lg:p-12 flex flex-col justify-between overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
            >
              {/* Top Strip with 01 label */}
              <div className="flex items-center justify-between pb-4 border-b border-[#ECEDEF]">
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-mono font-bold text-[#161616] px-2.5 py-0.5 rounded-md bg-[#F5F6F8] border border-[#ECEDEF]">
                    01
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B6F76]">
                    Course Management
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 items-center h-full pt-4">
                {/* Left Column (55%): Title, Text, Checklist */}
                <div className="col-span-6 space-y-4 pr-4">
                  <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                    {card1.title}
                  </h3>
                  <p className="text-base text-[#6B6F76] leading-relaxed max-w-md">
                    {card1.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {card1.details.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]"
                      >
                        <span className="size-1.5 rounded-full bg-[#7B5CF5]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column (45%): Moving Visuals Group */}
                <div className="col-span-6 relative flex items-center justify-center min-h-[340px]">
                  {/* Visual 1: Lesson Player with Watermark */}
                  <div
                    ref={c1MainImgRef}
                    className="relative w-[340px] rounded-2xl overflow-hidden bg-[#161616] border border-slate-800 shadow-xl text-white will-change-transform z-10"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/assets/img/home/features/instructor_lesson.jpg"
                        alt="Lesson player preview"
                        fill
                        className="object-cover opacity-85"
                      />
                      {/* Faint moving watermark across video */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-15deg]">
                        <span className="text-white/35 font-mono text-xs tracking-wider font-semibold animate-pulse">
                          learner@email.com • 1080p
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xs pl-0.5">
                          ▶
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#18191B] flex items-center justify-between text-[11px] text-slate-300">
                      <span className="font-semibold text-white">Lesson 02: Architecture Blueprint</span>
                      <span className="text-[#7B5CF5] font-mono">12:40</span>
                    </div>
                  </div>

                  {/* Visual 2: Overlapping Section Outline Panel */}
                  <div
                    ref={c1SecondPanelRef}
                    className="absolute -left-4 bottom-2 w-56 rounded-xl bg-white p-3 border border-[#ECEDEF] shadow-lg text-[#161616] z-20"
                  >
                    <p className="text-[11px] font-bold text-[#6B6F76] uppercase tracking-wider">
                      Module Outline
                    </p>
                    <p className="text-[12px] font-semibold text-[#161616] mt-0.5 truncate">
                      Sections & Lessons
                    </p>
                    <div className="mt-2 space-y-1 text-[11px] text-[#6B6F76]">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                        <span>✓</span>
                        <span className="truncate">1. Video lesson (ready)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#161616]">
                        <span>•</span>
                        <span className="truncate">2. Architecture PDF doc</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual 3: Floating Chip (Drip lock) */}
                  <div
                    ref={c1ChipRef}
                    className="absolute -right-2 top-4 z-30 animate-[float1_3s_ease-in-out_infinite]"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white text-[#161616] border border-[#ECEDEF] shadow-md">
                      <span className="size-2 rounded-full bg-amber-500" />
                      Unlocks in 3 days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Card 02: Assess and certify (Middle of stack) */}
            {/* ======================================================== */}
            <div
              ref={card2Ref}
              className="absolute inset-0 rounded-[36px] bg-white border border-[#ECEDEF] p-8 lg:p-12 flex flex-col justify-between overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
            >
              <div ref={card2ContentRef} className="h-full flex flex-col justify-between">
                {/* Top Strip with 02 label */}
                <div className="flex items-center justify-between pb-4 border-b border-[#ECEDEF]">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold text-[#161616] px-2.5 py-0.5 rounded-md bg-[#F5F6F8] border border-[#ECEDEF]">
                      02
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B6F76]">
                      Evaluation & Certificates
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 items-center h-full pt-4">
                  {/* Left Column (55%): Title, Text, Checklist */}
                  <div className="col-span-6 space-y-4 pr-4">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                      {card2.title}
                    </h3>
                    <p className="text-base text-[#6B6F76] leading-relaxed max-w-md">
                      {card2.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {card2.details.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]"
                        >
                          <span className="size-1.5 rounded-full bg-[#8E7CF8]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (45%): Visuals (Checkpoint Overlay + Quiz Card + Certificate) */}
                  <div className="col-span-6 relative flex items-center justify-center min-h-[340px]">
                    {/* Visual 1: Paused Video with Checkpoint Question Overlay */}
                    <div
                      ref={c2MainImgRef}
                      className="relative w-[340px] rounded-2xl overflow-hidden bg-[#161616] border border-slate-800 shadow-xl text-white will-change-transform z-10"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                        <Image
                          src="/assets/img/home/features/course_preview.jpg"
                          alt="Checkpoint quiz overlay"
                          fill
                          className="object-cover opacity-40"
                        />
                        {/* Checkpoint Question Overlay */}
                        <div className="absolute inset-0 p-3.5 flex flex-col justify-between bg-black/60 backdrop-blur-2xs">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-bold uppercase tracking-wider">
                              In-Video Checkpoint
                            </span>
                            <span className="text-[10px] text-slate-300">04:18 Paused</span>
                          </div>
                          <div>
                            <p className="text-[12px] font-medium text-white">
                              Which architecture pattern enables multi-tenant scaling?
                            </p>
                            <div className="mt-2 space-y-1 text-[10px]">
                              <div className="px-2 py-1 rounded bg-white/10 text-slate-300">A. Single database instance</div>
                              <div className="px-2 py-1 rounded bg-emerald-500/30 border border-emerald-400 text-emerald-200 font-semibold flex items-center justify-between">
                                <span>B. Isolated tenant routing</span>
                                <span>✓ Correct</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2.5 bg-[#18191B] flex items-center justify-between text-[11px] text-slate-300">
                        <span>Checkpoint quiz required to unlock lesson finish</span>
                      </div>
                    </div>

                    {/* Visual 2: Overlapping Quiz Card */}
                    <div
                      ref={c2SecondPanelRef}
                      className="absolute -left-4 bottom-2 w-56 rounded-xl bg-white p-3 border border-[#ECEDEF] shadow-lg text-[#161616] z-20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#7B5CF5]">Graded Quiz</span>
                        <span className="text-[11px] font-bold text-emerald-600">92% Score</span>
                      </div>
                      <p className="text-[12px] font-semibold text-[#161616] mt-1">Instructor Review</p>
                      <p className="text-[10px] text-[#6B6F76]">Automated evaluation completed</p>
                    </div>

                    {/* Visual 3: Certificate Preview Chip */}
                    <div
                      ref={c2ChipRef}
                      className="absolute -right-2 top-4 z-30 animate-[float2_3.2s_ease-in-out_infinite]"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white text-[#161616] border border-[#ECEDEF] shadow-md">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        Certificate issued
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Card 03: Live and cohort learning (Top of stack) */}
            {/* ======================================================== */}
            <div
              ref={card3Ref}
              className="absolute inset-0 rounded-[36px] bg-white border border-[#ECEDEF] p-8 lg:p-12 flex flex-col justify-between overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
              }}
            >
              <div ref={card3ContentRef} className="h-full flex flex-col justify-between">
                {/* Top Strip with 03 label */}
                <div className="flex items-center justify-between pb-4 border-b border-[#ECEDEF]">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-mono font-bold text-[#161616] px-2.5 py-0.5 rounded-md bg-[#F5F6F8] border border-[#ECEDEF]">
                      03
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-[#6B6F76]">
                      Interactive Cohorts & Zoom
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 items-center h-full pt-4">
                  {/* Left Column (55%): Title, Text, Checklist */}
                  <div className="col-span-6 space-y-4 pr-4">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight leading-snug">
                      {card3.title}
                    </h3>
                    <p className="text-base text-[#6B6F76] leading-relaxed max-w-md">
                      {card3.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {card3.details.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]"
                        >
                          <span className="size-1.5 rounded-full bg-[#10B981]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (45%): Participant Video Call Tile (Matching Mota reference exactly!) */}
                  <div className="col-span-6 relative flex items-center justify-center min-h-[340px]">
                    {/* Main Live Class Tile with 2 Participant Photos */}
                    <div
                      ref={c3MainImgRef}
                      className="relative w-[340px] rounded-2xl overflow-hidden bg-[#18191B] p-3 border border-slate-800 shadow-xl text-white will-change-transform z-10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1.5 font-semibold text-white">
                          <span className="size-2 rounded-full bg-red-500 animate-ping" />
                          Live Zoom Session
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          Bootcamp Cohort
                        </span>
                      </div>

                      {/* Video Grid: 2 Participant Camera Feeds */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Feed 1: Learner (Mia Lewis) */}
                        <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                          <Image
                            src="/assets/img/home/features/participant_mia.jpg"
                            alt="Mia Lewis"
                            fill
                            className="object-cover"
                          />
                          {/* Mota style dark name pill */}
                          <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15">
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            Mia Lewis
                          </div>
                        </div>

                        {/* Feed 2: Tutor (Alex Peterson) */}
                        <div className="relative h-28 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                          <Image
                            src="/assets/img/home/features/participant_alex.jpg"
                            alt="Alex Peterson"
                            fill
                            className="object-cover"
                          />
                          {/* Mota style dark name pill */}
                          <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15">
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            Alex Peterson
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 pt-1">
                        <span>One-to-one tutor booking & team training</span>
                        <span className="text-white font-mono">24 participants</span>
                      </div>
                    </div>

                    {/* Visual 2: Overlapping Tutor Booking Slot Picker */}
                    <div
                      ref={c3SecondPanelRef}
                      className="absolute -left-4 bottom-2 w-56 rounded-xl bg-white p-3 border border-[#ECEDEF] shadow-lg text-[#161616] z-20"
                    >
                      <span className="text-[10px] font-bold uppercase text-emerald-600">
                        1-on-1 Booking
                      </span>
                      <p className="text-[12px] font-semibold text-[#161616] mt-0.5">
                        Tomorrow, 10:00 AM
                      </p>
                      <p className="text-[10px] text-[#6B6F76]">45-min Zoom live consultation</p>
                    </div>

                    {/* Visual 3: Floating Bootcamp Chip */}
                    <div
                      ref={c3ChipRef}
                      className="absolute -right-2 top-4 z-30 animate-[float3_3.4s_ease-in-out_infinite]"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white text-[#161616] border border-[#ECEDEF] shadow-md">
                        <span className="size-2 rounded-full bg-[#7B5CF5]" />
                        Bootcamp: week 3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Mobile / Tablet Responsive Fallback (Vertical Flow) */}
          {/* ======================================================== */}
          <div className="w-full flex flex-col gap-6 lg:hidden">
            {featuresContent.cards.map((card, idx) => (
              <div
                key={card.id}
                className="rounded-[28px] bg-white border border-[#ECEDEF] shadow-md p-6 sm:p-8 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#161616] px-2 py-0.5 rounded bg-[#F5F6F8] border border-[#ECEDEF]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#161616]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6B6F76] leading-relaxed">
                    {card.summary}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {card.details.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
