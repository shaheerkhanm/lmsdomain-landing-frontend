"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { featuresContent } from "@/content/home/features";

export function FeaturesSection({ data }: { data?: any }) {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const cardStackWrapperRef = useRef<HTMLDivElement>(null);

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card2ContentRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card3ContentRef = useRef<HTMLDivElement>(null);

  // Card Numbers (single 14px label per card, shifts into ledge when stacked)
  const c1NumRef = useRef<HTMLDivElement>(null);
  const c2NumRef = useRef<HTMLDivElement>(null);
  const c3NumRef = useRef<HTMLDivElement>(null);

  // Card 1 inner visuals
  const c1TeacherPhotoRef = useRef<HTMLDivElement>(null);
  const c1LearnerPhotoRef = useRef<HTMLDivElement>(null);
  const c1IconRef = useRef<HTMLDivElement>(null);
  const c1LineRef = useRef<SVGLineElement>(null);
  const c1ChipRef = useRef<HTMLDivElement>(null);

  // Card 2 inner visuals
  const c2LearnerPhotoRef = useRef<HTMLDivElement>(null);
  const c2CenterNodeRef = useRef<HTMLDivElement>(null);
  const c2LineRef = useRef<SVGLineElement>(null);
  const c2CertCardRef = useRef<HTMLDivElement>(null);
  const c2AvatarFanRef = useRef<HTMLDivElement>(null);

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

      // Desktop: 1024px and up (Conveyor motion model)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        const getLayout = () => {
          const windowH = window.innerHeight;
          // Card height H: 68% of the window height (about 612px at 900)
          const cardH = Math.round(windowH * 0.68);

          // Nav bottom: Floating Nav B sits at fixed top-4 with bottom at ~67.33px
          const navB = document.querySelector(".fixed.top-4 > div");
          const navBRect = navB ? navB.getBoundingClientRect() : null;
          const navBottom =
            navBRect && navBRect.bottom > 0 ? navBRect.bottom : 67.33;

          // Held card top: exactly 85px below the bottom of the nav (~152px)
          const heldTop = Math.round(navBottom + 85);


          // Card stack wrapper offsetTop relative to pinned container at start
          const cardTopAtStart = cardStackWrapperRef.current?.offsetTop || 281;

          // y offset to position a card in the held spot
          const yHeld = heldTop - cardTopAtStart;

          // Next card sits directly behind held card, 78px lower
          const yBehind = yHeld + 78;

          // Card exits completely off the top of the screen (under nav)
          const yExit = -(cardTopAtStart + cardH + 60);

          // Incoming cards start cleanly below the fold
          const yBelowFold = windowH - cardTopAtStart + 100;

          return {
            windowH,
            cardH,
            heldTop,
            cardTopAtStart,
            yHeld,
            yBehind,
            yExit,
            yBelowFold,
          };
        };

        const { cardH, yBelowFold } = getLayout();

        // Initial setup:
        // Card 01 starts in front at y: 0 (zIndex: 30)
        gsap.set(card1Ref.current, { y: 0, height: cardH, zIndex: 30 });

        // Card 02 starts below the fold (zIndex: 20), pale content
        gsap.set(card2Ref.current, { y: yBelowFold, height: cardH, zIndex: 20 });
        gsap.set(card2ContentRef.current, { opacity: 0.35 });

        // Card 03 starts below the fold (zIndex: 10), pale content
        gsap.set(card3Ref.current, { y: yBelowFold, height: cardH, zIndex: 10 });
        gsap.set(card3ContentRef.current, { opacity: 0.35 });

        // Recompute H and update heights on window resize only, never during scroll
        const handleResize = () => {
          const { cardH: newH } = getLayout();
          gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
            height: newH,
          });
        };
        window.addEventListener("resize", handleResize);

        // Initial positions for Card 1 visuals:
        gsap.set(c1TeacherPhotoRef.current, { x: 50, y: -20, scale: 0.92 });
        gsap.set(c1LearnerPhotoRef.current, { x: -40, y: 30, scale: 0.92 });
        gsap.set(c1IconRef.current, { scale: 0.8, opacity: 0.6 });
        if (c1LineRef.current) {
          const pathLen = c1LineRef.current.getTotalLength() || 140;
          gsap.set(c1LineRef.current, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
        }
        gsap.set(c1ChipRef.current, { scale: 0.8, opacity: 0 });

        // Initial positions for Card 2 visuals:
        gsap.set(c2LearnerPhotoRef.current, { x: -40, scale: 0.92, opacity: 0.5 });
        gsap.set(c2CenterNodeRef.current, { scale: 0.8, opacity: 0.5 });
        gsap.set(c2CertCardRef.current, { x: 40, scale: 0.92, opacity: 0.5 });
        if (c2LineRef.current) {
          const pathLen = c2LineRef.current.getTotalLength() || 120;
          gsap.set(c2LineRef.current, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
        }
        gsap.set(c2AvatarFanRef.current, { scale: 0.7, opacity: 0 });

        // Initial positions for Card 3 visuals:
        gsap.set(c3Tile1Ref.current, { x: 50, y: -20, scale: 0.92, opacity: 0 });
        gsap.set(c3Tile2Ref.current, { x: -40, y: 30, scale: 0.92, opacity: 0 });
        gsap.set([c3Chip1Ref.current, c3Chip2Ref.current], { scale: 0.8, opacity: 0 });
        gsap.set(c3BookingChipRef.current, { scale: 0.8, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapperRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // ----------------------------------------------------
        // Stage 1 (0.00 -> 0.16): Card 01 -> held spot, Card 02 rises behind Card 01
        // Heading & Card 01 move up together until Card 01 top is 85px below nav.
        // Card 02 rises behind Card 01 to 78px lower (bottom 78px shows with "02").
        // ----------------------------------------------------
        tl.to(
          titleBlockRef.current,
          { y: -160, opacity: 0, duration: 0.16, ease: "power1.inOut" },
          0
        );
        tl.to(
          card1Ref.current,
          {
            y: () => getLayout().yHeld,
            duration: 0.16,
            ease: "power1.inOut",
          },
          0
        );
        tl.to(
          card2Ref.current,
          {
            y: () => getLayout().yBehind,
            duration: 0.16,
            ease: "power1.inOut",
          },
          0
        );

        // ----------------------------------------------------
        // Stage 2 (0.16 -> 0.36): Hold Card 01 while images animate
        // ----------------------------------------------------
        tl.to(
          c1TeacherPhotoRef.current,
          { x: 0, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.18
        );
        tl.to(
          c1LearnerPhotoRef.current,
          { x: 0, y: 0, scale: 1, duration: 0.16, ease: "power2.out" },
          0.18
        );
        tl.to(
          c1IconRef.current,
          { scale: 1, opacity: 1, duration: 0.12, ease: "power1.out" },
          0.22
        );
        if (c1LineRef.current) {
          tl.to(
            c1LineRef.current,
            { strokeDashoffset: 0, duration: 0.14, ease: "power1.inOut" },
            0.24
          );
        }
        tl.to(
          c1ChipRef.current,
          { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(1.5)" },
          0.28
        );

        // ----------------------------------------------------
        // Stage 3 (0.36 -> 0.54): Advance from Card 01 to Card 02
        // Card 01 moves up and leaves off the top (under nav).
        // Card 02 moves up 78px into held spot; text becomes dark (opacity: 1).
        // Card 03 rises behind Card 02 to 78px lower (showing its "03" strip).
        // ----------------------------------------------------
        tl.to(
          card1Ref.current,
          {
            y: () => getLayout().yExit,
            duration: 0.18,
            ease: "power1.inOut",
          },
          0.36
        );
        tl.to(
          card2Ref.current,
          {
            y: () => getLayout().yHeld,
            duration: 0.18,
            ease: "power1.inOut",
          },
          0.36
        );
        tl.to(
          card2ContentRef.current,
          { opacity: 1, duration: 0.14, ease: "power1.out" },
          0.42
        );
        tl.to(
          card3Ref.current,
          {
            y: () => getLayout().yBehind,
            duration: 0.18,
            ease: "power1.inOut",
          },
          0.36
        );

        // ----------------------------------------------------
        // Stage 4 (0.54 -> 0.72): Hold Card 02 while images animate
        // ----------------------------------------------------
        tl.to(
          c2LearnerPhotoRef.current,
          { x: 0, scale: 1, opacity: 1, duration: 0.16, ease: "power2.out" },
          0.56
        );
        tl.to(
          c2CenterNodeRef.current,
          { scale: 1, opacity: 1, duration: 0.14, ease: "back.out(1.2)" },
          0.58
        );
        tl.to(
          c2CertCardRef.current,
          { x: 0, scale: 1, opacity: 1, duration: 0.16, ease: "power2.out" },
          0.58
        );
        if (c2LineRef.current) {
          tl.to(
            c2LineRef.current,
            { strokeDashoffset: 0, duration: 0.14, ease: "power1.inOut" },
            0.62
          );
        }
        tl.to(
          c2AvatarFanRef.current,
          { scale: 1, opacity: 1, duration: 0.14, ease: "back.out(1.5)" },
          0.66
        );

        // ----------------------------------------------------
        // Stage 5 (0.72 -> 0.88): Advance from Card 02 to Card 03
        // Card 02 moves up and leaves off the top (under nav).
        // Card 03 moves up 78px into held spot; text becomes dark (opacity: 1).
        // Card 03 has no next card behind it.
        // ----------------------------------------------------
        tl.to(
          card2Ref.current,
          {
            y: () => getLayout().yExit,
            duration: 0.16,
            ease: "power1.inOut",
          },
          0.72
        );
        tl.to(
          card3Ref.current,
          {
            y: () => getLayout().yHeld,
            duration: 0.16,
            ease: "power1.inOut",
          },
          0.72
        );
        tl.to(
          card3ContentRef.current,
          { opacity: 1, duration: 0.14, ease: "power1.out" },
          0.76
        );

        // ----------------------------------------------------
        // Stage 6 (0.86 -> 0.98): Hold Card 03 while images animate
        // ----------------------------------------------------
        tl.to(
          c3Tile1Ref.current,
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.14, ease: "power2.out" },
          0.86
        );
        tl.to(
          c3Tile2Ref.current,
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.14, ease: "power2.out" },
          0.88
        );
        tl.to(
          [c3Chip1Ref.current, c3Chip2Ref.current],
          { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(1.4)" },
          0.90
        );
        tl.to(
          c3BookingChipRef.current,
          { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(1.4)" },
          0.94
        );

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      });

      // Mobile / Tablet: under 1024px (Normal stacked flow, no pin)
      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          [
            card1Ref.current,
            card2Ref.current,
            card3Ref.current,
            titleBlockRef.current,
            c1NumRef.current,
            c2NumRef.current,
            c3NumRef.current,
          ],
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
    <section id="features" className="py-12 sm:py-16 lg:py-0 bg-[#F3F4F6] font-urbanist overflow-visible">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
        {/* Pinned Stage Wrapper (Desktop >= 1024px) */}
        <div
          ref={pinWrapperRef}
          className="relative w-full flex flex-col items-center overflow-visible lg:pt-[84px] lg:pb-[32px] lg:min-h-screen"
        >
          {/* Section Header: Sits 16px below nav (Nav B bottom ~68px -> pt-[84px]), gap to card is 40px */}
          <div
            ref={titleBlockRef}
            className="text-center max-w-3xl mx-auto mb-[40px] will-change-transform"
          >
            <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#7B5CF5] mb-[12px]">
              <span>✦</span>
              <span className="uppercase tracking-widest text-[12px]">CORE CAPABILITIES</span>
            </div>
            <h2 className="text-[56px] font-semibold text-[#161616] tracking-tight leading-[1.1] max-w-3xl mx-auto">
              {featuresContent.sectionTitle}
            </h2>
          </div>

          {/* Card Stack Frame: Width 89vw (about 1280px), Height 68vh (about 612px at 900) */}
          <div
            ref={cardStackWrapperRef}
            className="relative w-[89vw] max-w-[1280px] h-[68vh] hidden lg:block overflow-visible"
          >
            {/* ======================================================== */}
            {/* Card 01: Courses that run themselves */}
            {/* ======================================================== */}
            <div
              ref={card1Ref}
              className="absolute inset-x-0 top-0 h-[68vh] rounded-[24px] bg-white border border-[#ECEDEF] px-12 py-8 overflow-hidden will-change-transform"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(22,22,22,0.12), 0 4px 12px rgba(22,22,22,0.04)",
              }}
            >
              {/* Bottom-Left Corner Number (14px font, 35px from left, 40px from bottom) */}
              <div
                ref={c1NumRef}
                className="absolute bottom-[40px] left-[35px] text-[14px] font-mono font-medium text-[#9CA3AF] select-none pointer-events-none z-30"
              >
                01
              </div>

              {/* Card Body: Left 40% (Vertically Centred), Right 48% (Image Composition) */}
              <div className="flex items-center justify-between h-full w-full">
                {/* Left Column (40%): Title 30px, Description 20px, max 3 lines, max-w 440px */}
                <div className="w-[40%] flex flex-col justify-center pr-6 space-y-4">
                  <h3 className="text-[30px] font-medium text-[#161616] tracking-tight leading-[1.2]">
                    {card1.title}
                  </h3>
                  <p className="text-[20px] text-[#6B7280] leading-relaxed max-w-[440px] line-clamp-3">
                    {card1.summary}
                  </p>
                </div>

                {/* Right Column (48% width, 100% height): Image Composition */}
                <div className="w-[48%] h-full relative flex items-center justify-center">
                  {/* SVG Connecting Line */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-15"
                    style={{ overflow: "visible" }}
                  >
                    <line
                      ref={c1LineRef}
                      x1="40"
                      y1="50%"
                      x2="170"
                      y2="50%"
                      stroke="#7B5CF5"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Small round icon on the left (Reference style) */}
                  <div
                    ref={c1IconRef}
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white border border-[#ECEDEF] shadow-md flex items-center justify-center text-[#7B5CF5] z-20 will-change-transform"
                  >
                    <span className="size-4 rounded-full border-2 border-[#7B5CF5] flex items-center justify-center">
                      <span className="size-1.5 rounded-full bg-[#7B5CF5]" />
                    </span>
                  </div>

                  {/* Photo 1: Teacher recording lesson (Top Right, ~320x180px) */}
                  <div
                    ref={c1TeacherPhotoRef}
                    className="absolute right-4 top-1/2 -translate-y-[65%] w-[320px] h-[180px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl z-10 will-change-transform"
                  >
                    <Image
                      src="/assets/img/home/features/instructor_lesson.jpg"
                      alt="Teacher recording lesson"
                      fill
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-12deg]">
                      <span className="text-white/30 font-mono text-[11px] tracking-wider font-semibold">
                        instructor@academy.com • 4K
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10">
                      <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                      Recording Lesson 02
                    </div>
                  </div>

                  {/* Photo 2: Learner on laptop (Bottom Left, ~280x165px) */}
                  <div
                    ref={c1LearnerPhotoRef}
                    className="absolute left-10 top-1/2 -translate-y-[15%] w-[280px] h-[165px] rounded-2xl overflow-hidden bg-slate-100 border border-[#ECEDEF] shadow-2xl z-20 will-change-transform"
                  >
                    <Image
                      src="/assets/img/home/features/learner_laptop.jpg"
                      alt="Learner on laptop"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Chip: "Unlocks in 3 days" pops in */}
                  <div
                    ref={c1ChipRef}
                    className="absolute right-6 bottom-16 z-30 will-change-transform"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold bg-white text-[#161616] border border-[#ECEDEF] shadow-lg">
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
              className="absolute inset-x-0 top-0 h-[68vh] rounded-[24px] bg-white border border-[#ECEDEF] px-12 py-8 overflow-hidden will-change-transform"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(22,22,22,0.12), 0 4px 12px rgba(22,22,22,0.04)",
              }}
            >
              {/* Bottom-Left Corner Number */}
              <div
                ref={c2NumRef}
                className="absolute bottom-[40px] left-[35px] text-[14px] font-mono font-medium text-[#9CA3AF] select-none pointer-events-none z-30"
              >
                02
              </div>

              {/* Card Body */}
              <div ref={card2ContentRef} className="flex items-center justify-between h-full w-full">
                {/* Left Column (40%): Title 30px, Description 20px */}
                <div className="w-[40%] flex flex-col justify-center pr-6 space-y-4">
                  <h3 className="text-[30px] font-medium text-[#161616] tracking-tight leading-[1.2]">
                    {card2.title}
                  </h3>
                  <p className="text-[20px] text-[#6B7280] leading-relaxed max-w-[440px] line-clamp-3">
                    {card2.summary}
                  </p>
                </div>

                {/* Right Column (48% width, 100% height): Image Composition */}
                <div className="w-[48%] h-full relative flex items-center justify-center">
                  {/* SVG Connecting Line */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-15"
                    style={{ overflow: "visible" }}
                  >
                    <line
                      ref={c2LineRef}
                      x1="180"
                      y1="50%"
                      x2="290"
                      y2="50%"
                      stroke="#7B5CF5"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Photo 1: Learner on left (~280x180px) */}
                  <div
                    ref={c2LearnerPhotoRef}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-[280px] h-[180px] rounded-2xl overflow-hidden bg-slate-100 border border-[#ECEDEF] shadow-xl z-10 will-change-transform"
                  >
                    <Image
                      src="/assets/img/home/features/learner_quiz.jpg"
                      alt="Learner taking assessment"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5 border border-white/10">
                      <span>✓</span>
                      Quiz Score: 98%
                    </div>
                  </div>

                  {/* Center Node with 6 colored squares */}
                  <div
                    ref={c2CenterNodeRef}
                    className="relative z-20 size-12 rounded-xl bg-[#161616] text-white flex items-center justify-center shadow-lg border border-white/20 will-change-transform"
                  >
                    <span className="text-base">✦</span>
                    <span className="absolute -top-3 -left-2 size-2.5 rounded-xs bg-[#7B5CF5]" />
                    <span className="absolute -top-3.5 right-1 size-2.5 rounded-xs bg-emerald-500" />
                    <span className="absolute top-2 -right-3.5 size-2.5 rounded-xs bg-amber-500" />
                    <span className="absolute -bottom-3 -right-1 size-2.5 rounded-xs bg-rose-500" />
                    <span className="absolute -bottom-3 left-1 size-2.5 rounded-xs bg-blue-500" />
                    <span className="absolute bottom-1 -left-3.5 size-2.5 rounded-xs bg-indigo-500" />
                  </div>

                  {/* Certificate Card on right (~280x180px) */}
                  <div
                    ref={c2CertCardRef}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-[280px] h-[180px] rounded-2xl bg-white border border-[#ECEDEF] shadow-xl p-5 flex flex-col justify-between z-10 will-change-transform"
                  >
                    <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-2.5">
                      <span className="text-[11px] font-mono font-bold text-[#7B5CF5] uppercase tracking-wider">
                        CERTIFICATE OF COMPLETION
                      </span>
                      <span className="text-base">🎓</span>
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-[14px] font-bold text-[#161616]">Full-Stack Architecture</p>
                      <p className="text-[11px] text-[#6B7280]">Awarded to certified cohort graduate</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] border-t border-[#F3F4F6] pt-2">
                      <span>ID: LMS-98421</span>
                      <span className="text-emerald-600 font-semibold">Verified</span>
                    </div>
                  </div>

                  {/* 3 Avatar Photos fanning out on right */}
                  <div
                    ref={c2AvatarFanRef}
                    className="absolute right-8 bottom-6 flex items-center -space-x-2.5 z-30 will-change-transform"
                  >
                    <div className="relative size-9 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <Image src="/assets/img/home/testimonials/author-1.jpg" alt="Learner" fill className="object-cover" />
                    </div>
                    <div className="relative size-9 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <Image src="/assets/img/home/testimonials/author-2.jpg" alt="Learner" fill className="object-cover" />
                    </div>
                    <div className="relative size-9 rounded-full overflow-hidden ring-2 ring-white shadow-md">
                      <Image src="/assets/img/home/testimonials/author-3.jpg" alt="Learner" fill className="object-cover" />
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
              className="absolute inset-x-0 top-0 h-[68vh] rounded-[24px] bg-white border border-[#ECEDEF] px-12 py-8 overflow-hidden will-change-transform"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(22,22,22,0.14), 0 4px 12px rgba(22,22,22,0.05)",
              }}
            >
              {/* Bottom-Left Corner Number */}
              <div
                ref={c3NumRef}
                className="absolute bottom-[40px] left-[35px] text-[14px] font-mono font-medium text-[#9CA3AF] select-none pointer-events-none z-30"
              >
                03
              </div>

              {/* Card Body */}
              <div ref={card3ContentRef} className="flex items-center justify-between h-full w-full">
                {/* Left Column (40%): Title 30px, Description 20px */}
                <div className="w-[40%] flex flex-col justify-center pr-6 space-y-4">
                  <h3 className="text-[30px] font-medium text-[#161616] tracking-tight leading-[1.2]">
                    {card3.title}
                  </h3>
                  <p className="text-[20px] text-[#6B7280] leading-relaxed max-w-[440px] line-clamp-3">
                    {card3.summary}
                  </p>
                </div>

                {/* Right Column (48% width, 100% height): Image Composition */}
                <div className="w-[48%] h-full relative flex items-center justify-center">
                  {/* Photo 1: Mia Lewis (Top Right, ~290x180px) */}
                  <div
                    ref={c3Tile1Ref}
                    className="absolute right-4 top-1/2 -translate-y-[65%] w-[290px] h-[180px] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl z-10 will-change-transform"
                  >
                    <Image
                      src="/assets/img/home/features/participant_mia.jpg"
                      alt="Mia Lewis"
                      fill
                      className="object-cover"
                    />
                    <div
                      ref={c3Chip1Ref}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-[12px] font-semibold text-white flex items-center gap-1.5 border border-white/15 will-change-transform"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Mia Lewis
                    </div>
                  </div>

                  {/* Photo 2: Alex Peterson (Bottom Left, ~270x165px) */}
                  <div
                    ref={c3Tile2Ref}
                    className="absolute left-8 top-1/2 -translate-y-[15%] w-[270px] h-[165px] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl z-20 will-change-transform"
                  >
                    <Image
                      src="/assets/img/home/features/participant_alex.jpg"
                      alt="Alex Peterson"
                      fill
                      className="object-cover"
                    />
                    <div
                      ref={c3Chip2Ref}
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-[12px] font-semibold text-white flex items-center gap-1.5 border border-white/15 will-change-transform"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Alex Peterson
                    </div>
                  </div>

                  {/* Chip: "Tomorrow, 10:00" booking chip pops in */}
                  <div
                    ref={c3BookingChipRef}
                    className="absolute right-4 bottom-4 z-30 will-change-transform"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#ECEDEF] shadow-lg text-[#161616]">
                      <span className="size-2 rounded-full bg-[#7B5CF5]" />
                      <span className="text-[13px] font-semibold">Tomorrow, 10:00</span>
                      <span className="text-[11px] text-[#6B7280]">1-on-1 Zoom</span>
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
