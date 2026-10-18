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

  // Card 1 inner visuals
  const c1LessonTileRef = useRef<HTMLDivElement>(null);
  const c1OutlineTileRef = useRef<HTMLDivElement>(null);
  const c1LineRef = useRef<SVGLineElement>(null);
  const c1LockChipRef = useRef<HTMLDivElement>(null);

  // Card 2 inner visuals
  const c2QuizCardRef = useRef<HTMLDivElement>(null);
  const c2CenterNodeRef = useRef<HTMLDivElement>(null);
  const c2LineRef = useRef<SVGLineElement>(null);
  const c2Cert1Ref = useRef<HTMLDivElement>(null);
  const c2Cert2Ref = useRef<HTMLDivElement>(null);
  const c2Cert3Ref = useRef<HTMLDivElement>(null);

  // Card 3 inner visuals
  const c3Tile1Ref = useRef<HTMLDivElement>(null);
  const c3Tile2Ref = useRef<HTMLDivElement>(null);
  const c3Chip1Ref = useRef<HTMLDivElement>(null);
  const c3Chip2Ref = useRef<HTMLDivElement>(null);
  const c3BookingChipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (Reference paper-stacking cards)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        // Card 1 settled at top: 0
        gsap.set(card1Ref.current, { y: 0, zIndex: 10 });
        // Card 2 peeks 28px below Card 1 (y: 512px)
        gsap.set(card2Ref.current, { y: 512, zIndex: 20 });
        gsap.set(card2ContentRef.current, { opacity: 0.35 });
        // Card 3 peeks below Card 2 (y: 540px)
        gsap.set(card3Ref.current, { y: 540, zIndex: 30 });
        gsap.set(card3ContentRef.current, { opacity: 0.35 });

        // Initial positions for Card 1 visual composition:
        // Video tile and outline start 60px apart (outline at -30px, lesson at +30px)
        gsap.set(c1LessonTileRef.current, { x: 30 });
        gsap.set(c1OutlineTileRef.current, { x: -30 });
        if (c1LineRef.current) {
          const pathLen = c1LineRef.current.getTotalLength() || 120;
          gsap.set(c1LineRef.current, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
        }
        gsap.set(c1LockChipRef.current, { scale: 0.8, opacity: 0 });

        // Initial positions for Card 2 visual composition:
        gsap.set(c2QuizCardRef.current, { x: -20, opacity: 0.5 });
        gsap.set(c2CenterNodeRef.current, { scale: 0.8, opacity: 0.5 });
        if (c2LineRef.current) {
          const pathLen = c2LineRef.current.getTotalLength() || 90;
          gsap.set(c2LineRef.current, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
        }
        gsap.set(c2Cert1Ref.current, { rotateZ: 0, x: 0, y: 0 });
        gsap.set(c2Cert2Ref.current, { rotateZ: 0, x: 0, y: 0 });
        gsap.set(c2Cert3Ref.current, { rotateZ: 0, x: 0, y: 0 });

        // Initial positions for Card 3 visual composition:
        gsap.set(c3Tile1Ref.current, { x: 40, opacity: 0 });
        gsap.set(c3Tile2Ref.current, { x: 40, opacity: 0 });
        gsap.set([c3Chip1Ref.current, c3Chip2Ref.current], { scale: 0.8, opacity: 0 });
        gsap.set(c3BookingChipRef.current, { scale: 0.8, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top 120px",
            end: "+=260%",
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
          },
        });

        // ----------------------------------------------------
        // Segment 1 (timeline 0.0 -> 0.35): Card 1 active
        // ----------------------------------------------------
        // Lesson tile and outline slide toward each other to overlap
        tl.to(
          c1LessonTileRef.current,
          { x: 0, duration: 0.25, ease: "power2.out" },
          0
        );
        tl.to(
          c1OutlineTileRef.current,
          { x: 0, duration: 0.25, ease: "power2.out" },
          0
        );
        // Line draws to lock icon
        if (c1LineRef.current) {
          tl.to(
            c1LineRef.current,
            { strokeDashoffset: 0, duration: 0.2, ease: "power1.inOut" },
            0.15
          );
        }
        // "Unlocks in 3 days" chip pops in (scale 0.8 to 1)
        tl.to(
          c1LockChipRef.current,
          { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(1.5)" },
          0.25
        );

        // ----------------------------------------------------
        // Segment 2 (timeline 0.35 -> 0.70): Card 2 slides up over Card 1
        // Card 1 stays in place, leaving 28px top ledge with "01" exposed.
        // Card 2 rises to y: 28px.
        // ----------------------------------------------------
        tl.to(
          card2Ref.current,
          { y: 28, duration: 0.35, ease: "power1.inOut" },
          0.35
        );

        // Content opacity 0.35 -> 1.0 when settled
        tl.to(
          card2ContentRef.current,
          { opacity: 1, duration: 0.25, ease: "power1.out" },
          0.45
        );

        // Card 2 visual motion:
        tl.to(
          c2QuizCardRef.current,
          { x: 0, opacity: 1, duration: 0.2, ease: "power1.out" },
          0.4
        );
        tl.to(
          c2CenterNodeRef.current,
          { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(1.2)" },
          0.42
        );
        if (c2LineRef.current) {
          tl.to(
            c2LineRef.current,
            { strokeDashoffset: 0, duration: 0.2, ease: "power1.inOut" },
            0.48
          );
        }
        // Certificates fan out into 3 stacked layers
        tl.to(
          c2Cert1Ref.current,
          { rotateZ: -6, x: -8, y: -4, duration: 0.25, ease: "power2.out" },
          0.52
        );
        tl.to(
          c2Cert2Ref.current,
          { rotateZ: 0, x: 0, y: 0, duration: 0.25, ease: "power2.out" },
          0.52
        );
        tl.to(
          c2Cert3Ref.current,
          { rotateZ: 6, x: 8, y: 4, duration: 0.25, ease: "power2.out" },
          0.52
        );

        // ----------------------------------------------------
        // Segment 3 (timeline 0.70 -> 1.0): Card 3 slides up over Card 2
        // Card 2 top ledge (28px to 56px) with "02" stays exposed.
        // Card 3 rises to y: 56px.
        // ----------------------------------------------------
        tl.to(
          card3Ref.current,
          { y: 56, duration: 0.3, ease: "power1.inOut" },
          0.7
        );

        // Content opacity 0.35 -> 1.0 when settled
        tl.to(
          card3ContentRef.current,
          { opacity: 1, duration: 0.2, ease: "power1.out" },
          0.8
        );

        // Card 3 visual motion:
        // Mia slides in
        tl.to(
          c3Tile1Ref.current,
          { x: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
          0.72
        );
        // Alex slides in 0.15 later
        tl.to(
          c3Tile2Ref.current,
          { x: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
          0.78
        );
        // Name chips pop in
        tl.to(
          [c3Chip1Ref.current, c3Chip2Ref.current],
          { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(1.4)" },
          0.85
        );
        // "Tomorrow, 10:00" chip pops in
        tl.to(
          c3BookingChipRef.current,
          { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(1.4)" },
          0.9
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
        {/* Section Header: Scrolls away normally */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#161616] tracking-tight leading-tight">
            {featuresContent.sectionTitle}
          </h2>
        </div>

        {/* Pinned Stage Wrapper (Desktop >= 1024px) */}
        <div
          ref={pinWrapperRef}
          className="relative w-full flex justify-center items-center py-4 overflow-visible"
        >
          {/* Card Frame Geometry: 90% width, radius 24px, height ~540px (~62vh at 1440x900) */}
          <div className="relative w-[90%] max-w-[1240px] h-[540px] hidden lg:block overflow-visible">
            {/* ======================================================== */}
            {/* Card 01: Courses that run themselves */}
            {/* ======================================================== */}
            <div
              ref={card1Ref}
              className="absolute inset-x-0 top-0 h-[540px] rounded-[24px] bg-white border border-[#ECEDEF] p-8 lg:p-12 overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 20px 50px -15px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              {/* Top Ledge Label: Exposed when Card 02 stacks at y: 28px */}
              <div className="absolute top-2.5 left-10 text-[11px] font-mono text-[#9CA3AF] select-none pointer-events-none">
                01
              </div>

              {/* Bottom Left Corner Number */}
              <div className="absolute bottom-8 left-10 text-[11px] font-mono text-[#9CA3AF] select-none">
                01
              </div>

              {/* Card Body Grid */}
              <div className="grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Half (~50%): Title & 1-2 lines grey description */}
                <div className="col-span-6 pr-6 space-y-2">
                  <h3 className="text-[22px] sm:text-[24px] font-medium text-[#161616] tracking-tight leading-snug">
                    {card1.title}
                  </h3>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-md">
                    {card1.summary}
                  </p>
                </div>

                {/* Right Half (~50%): Image Composition */}
                <div className="col-span-6 relative flex items-center justify-center min-h-[380px]">
                  {/* SVG Connecting Line */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-15"
                    style={{ overflow: "visible" }}
                  >
                    <line
                      ref={c1LineRef}
                      x1="180"
                      y1="230"
                      x2="280"
                      y2="140"
                      stroke="#7B5CF5"
                      strokeWidth="1.5"
                      strokeDasharray="140"
                      strokeDashoffset="140"
                    />
                  </svg>

                  {/* Visual 1: Lesson Video Tile */}
                  <div
                    ref={c1LessonTileRef}
                    className="relative w-[320px] rounded-2xl overflow-hidden bg-[#161616] border border-slate-800 shadow-xl text-white will-change-transform z-10"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <Image
                        src="/assets/img/home/features/instructor_lesson.jpg"
                        alt="Lesson player preview"
                        fill
                        className="object-cover opacity-85"
                      />
                      {/* Watermark across video */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-12deg]">
                        <span className="text-white/35 font-mono text-[11px] tracking-wider font-semibold">
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

                  {/* Visual 2: Overlapping Module Outline Card */}
                  <div
                    ref={c1OutlineTileRef}
                    className="absolute left-6 bottom-6 w-52 rounded-xl bg-white p-3.5 border border-[#ECEDEF] shadow-lg text-[#161616] z-20 will-change-transform"
                  >
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                      Module Outline
                    </p>
                    <p className="text-[12px] font-semibold text-[#161616] mt-0.5">
                      Sections & Lessons
                    </p>
                    <div className="mt-2 space-y-1 text-[11px] text-[#6B7280]">
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

                  {/* Visual 3: Lock Chip */}
                  <div
                    ref={c1LockChipRef}
                    className="absolute right-6 top-8 z-30 will-change-transform"
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
            {/* Card 02: Assess and certify */}
            {/* ======================================================== */}
            <div
              ref={card2Ref}
              className="absolute inset-x-0 top-0 h-[540px] rounded-[24px] bg-white border border-[#ECEDEF] p-8 lg:p-12 overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 20px 50px -15px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              {/* Top Ledge Label: Exposed when Card 03 stacks at y: 56px */}
              <div className="absolute top-2.5 left-10 text-[11px] font-mono text-[#9CA3AF] select-none pointer-events-none">
                02
              </div>

              {/* Bottom Left Corner Number */}
              <div className="absolute bottom-8 left-10 text-[11px] font-mono text-[#9CA3AF] select-none">
                02
              </div>

              {/* Card Body Grid with pale-to-full text opacity */}
              <div ref={card2ContentRef} className="grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Half (~50%): Title & 1-2 lines grey description */}
                <div className="col-span-6 pr-6 space-y-2">
                  <h3 className="text-[22px] sm:text-[24px] font-medium text-[#161616] tracking-tight leading-snug">
                    {card2.title}
                  </h3>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-md">
                    {card2.summary}
                  </p>
                </div>

                {/* Right Half (~50%): Image Composition (Quiz + Central Node + Fanning Certificates) */}
                <div className="col-span-6 relative flex items-center justify-center min-h-[380px]">
                  {/* SVG Connecting Line from Quiz to Center Icon */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-15"
                    style={{ overflow: "visible" }}
                  >
                    <line
                      ref={c2LineRef}
                      x1="180"
                      y1="190"
                      x2="260"
                      y2="190"
                      stroke="#7B5CF5"
                      strokeWidth="1.5"
                      strokeDasharray="90"
                      strokeDashoffset="90"
                    />
                  </svg>

                  {/* Left: Quiz Card */}
                  <div
                    ref={c2QuizCardRef}
                    className="absolute left-4 w-44 rounded-xl bg-white p-3.5 border border-[#ECEDEF] shadow-lg text-[#161616] z-10 will-change-transform"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F3F4F6]">
                      <span className="text-[10px] font-bold uppercase text-[#7B5CF5]">Graded Quiz</span>
                      <span className="text-[11px] font-bold text-emerald-600">100%</span>
                    </div>
                    <p className="text-[11px] font-semibold text-[#161616] mt-2">Evaluation</p>
                    <div className="mt-1.5 space-y-1 text-[9px] text-[#6B7280]">
                      <div className="flex items-center gap-1 text-emerald-600">
                        <span>✓</span>
                        <span>Multi-tenant routing</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#9CA3AF]">
                        <span>•</span>
                        <span>Automated score</span>
                      </div>
                    </div>
                  </div>

                  {/* Center: Small central icon with 6 colored squares around it (Reference File Manager) */}
                  <div
                    ref={c2CenterNodeRef}
                    className="relative z-20 size-11 rounded-xl bg-[#161616] text-white flex items-center justify-center shadow-lg border border-white/20 will-change-transform"
                  >
                    <span className="text-sm">✦</span>
                    {/* 6 colored satellite squares */}
                    <span className="absolute -top-3 -left-2 size-2 rounded-xs bg-[#7B5CF5]" />
                    <span className="absolute -top-3.5 right-1 size-2 rounded-xs bg-emerald-500" />
                    <span className="absolute top-2 -right-3.5 size-2 rounded-xs bg-amber-500" />
                    <span className="absolute -bottom-3 -right-1 size-2 rounded-xs bg-rose-500" />
                    <span className="absolute -bottom-3 left-1 size-2 rounded-xs bg-blue-500" />
                    <span className="absolute bottom-1 -left-3.5 size-2 rounded-xs bg-indigo-500" />
                  </div>

                  {/* Right: Certificate Stack that Fans Out into 3 Layers */}
                  <div className="absolute right-4 w-52 h-40 relative flex items-center justify-center z-10">
                    {/* Layer 1 (Back left tilt) */}
                    <div
                      ref={c2Cert1Ref}
                      className="absolute inset-0 rounded-xl bg-slate-50 border border-[#ECEDEF] p-3 shadow-md will-change-transform"
                    >
                      <div className="h-full border border-dashed border-[#CBD5E1] rounded-lg p-2 flex flex-col justify-between">
                        <span className="text-[9px] font-mono text-[#9CA3AF]">CERTIFICATE #01</span>
                        <div className="size-4 rounded-full bg-[#7B5CF5]/20 self-end" />
                      </div>
                    </div>

                    {/* Layer 2 (Middle) */}
                    <div
                      ref={c2Cert2Ref}
                      className="absolute inset-0 rounded-xl bg-white border border-[#ECEDEF] p-3 shadow-lg will-change-transform"
                    >
                      <div className="h-full border border-dashed border-[#CBD5E1] rounded-lg p-2 flex flex-col justify-between">
                        <span className="text-[9px] font-mono text-[#9CA3AF]">CERTIFICATE #02</span>
                        <div className="size-4 rounded-full bg-emerald-500/20 self-end" />
                      </div>
                    </div>

                    {/* Layer 3 (Top right tilt) */}
                    <div
                      ref={c2Cert3Ref}
                      className="absolute inset-0 rounded-xl bg-white border border-[#ECEDEF] p-3 shadow-xl will-change-transform"
                    >
                      <div className="h-full border border-dashed border-[#7B5CF5]/40 bg-[#FDFCFF] rounded-lg p-2 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold text-[#7B5CF5]">VERIFIED CERTIFICATE</span>
                          <span className="text-[10px]">🎓</span>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#161616]">Course Completion</p>
                          <p className="text-[9px] text-[#6B7280]">Issued on completion</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* Card 03: Live and cohort learning */}
            {/* ======================================================== */}
            <div
              ref={card3Ref}
              className="absolute inset-x-0 top-0 h-[540px] rounded-[24px] bg-white border border-[#ECEDEF] p-8 lg:p-12 overflow-hidden will-change-transform"
              style={{
                boxShadow: "0 20px 50px -15px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              {/* Bottom Left Corner Number */}
              <div className="absolute bottom-8 left-10 text-[11px] font-mono text-[#9CA3AF] select-none">
                03
              </div>

              {/* Card Body Grid with pale-to-full text opacity */}
              <div ref={card3ContentRef} className="grid grid-cols-12 gap-8 items-center h-full">
                {/* Left Half (~50%): Title & 1-2 lines grey description */}
                <div className="col-span-6 pr-6 space-y-2">
                  <h3 className="text-[22px] sm:text-[24px] font-medium text-[#161616] tracking-tight leading-snug">
                    {card3.title}
                  </h3>
                  <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-md">
                    {card3.summary}
                  </p>
                </div>

                {/* Right Half (~50%): Participant Video Feeds + Chips */}
                <div className="col-span-6 relative flex items-center justify-center min-h-[380px]">
                  <div className="relative w-[340px] flex flex-col gap-3">
                    {/* Live Video Feeds Row */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Tile 1: Mia Lewis */}
                      <div
                        ref={c3Tile1Ref}
                        className="relative h-32 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md will-change-transform"
                      >
                        <Image
                          src="/assets/img/home/features/participant_mia.jpg"
                          alt="Mia Lewis"
                          fill
                          className="object-cover"
                        />
                        {/* Name Chip */}
                        <div
                          ref={c3Chip1Ref}
                          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15 will-change-transform"
                        >
                          <span className="size-1.5 rounded-full bg-emerald-400" />
                          Mia Lewis
                        </div>
                      </div>

                      {/* Tile 2: Alex Peterson */}
                      <div
                        ref={c3Tile2Ref}
                        className="relative h-32 rounded-xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md will-change-transform"
                      >
                        <Image
                          src="/assets/img/home/features/participant_alex.jpg"
                          alt="Alex Peterson"
                          fill
                          className="object-cover"
                        />
                        {/* Name Chip */}
                        <div
                          ref={c3Chip2Ref}
                          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15 will-change-transform"
                        >
                          <span className="size-1.5 rounded-full bg-emerald-400" />
                          Alex Peterson
                        </div>
                      </div>
                    </div>

                    {/* Booking Chip: Pops in */}
                    <div
                      ref={c3BookingChipRef}
                      className="self-center will-change-transform"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#ECEDEF] shadow-md text-[#161616]">
                        <span className="size-2 rounded-full bg-[#7B5CF5]" />
                        <span className="text-[12px] font-semibold">Tomorrow, 10:00</span>
                        <span className="text-[10px] text-[#6B7280]">1-on-1 Zoom</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Mobile / Tablet Responsive Fallback (<1024px: Unchanged Flow) */}
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
                  <p className="text-sm text-[#6B7280] leading-relaxed">
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

                  {/* Visual panel below text */}
                  <div className="mt-5 rounded-2xl bg-[#18191B] border border-slate-200 overflow-hidden relative">
                    {idx === 0 && (
                      <div className="flex flex-col">
                        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                          <Image
                            src="/assets/img/home/features/instructor_lesson.jpg"
                            alt="Lesson player preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                            <div className="size-10 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center text-white text-xs pl-0.5">
                              ▶
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-[#18191B] flex items-center justify-between text-xs text-slate-300">
                          <span className="font-semibold text-white truncate">Lesson 02: Architecture Blueprint</span>
                          <span className="text-[#7B5CF5] font-mono ml-2 shrink-0">12:40</span>
                        </div>
                      </div>
                    )}

                    {idx === 1 && (
                      <div className="p-4 bg-slate-900 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <span className="font-semibold text-white">Quiz Evaluation</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            100% Score
                          </span>
                        </div>
                        <div className="relative h-36 sm:h-44 w-full rounded-xl overflow-hidden border border-white/10">
                          <Image
                            src="/assets/img/home/features/course_preview.jpg"
                            alt="Course Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {idx === 2 && (
                      <div className="p-4 bg-slate-900 flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                            <Image
                              src="/assets/img/home/features/participant_mia.jpg"
                              alt="Mia Lewis"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15">
                              <span className="size-1.5 rounded-full bg-emerald-400" />
                              Mia Lewis
                            </div>
                          </div>
                          <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                            <Image
                              src="/assets/img/home/features/participant_alex.jpg"
                              alt="Alex Peterson"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-xs text-[10px] font-semibold text-white flex items-center gap-1 border border-white/15">
                              <span className="size-1.5 rounded-full bg-emerald-400" />
                              Alex Peterson
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
                          <span>1-on-1 Live Consultation</span>
                          <span className="text-white font-mono">24 participants</span>
                        </div>
                      </div>
                    )}
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
