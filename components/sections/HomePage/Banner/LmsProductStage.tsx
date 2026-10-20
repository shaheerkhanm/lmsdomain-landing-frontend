"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { heroContent } from "@/content/home/hero";
import {
  HeroCourseBuilderCard,
  HeroTutorCard,
  HeroCheckoutCard,
  HeroCertificateCard,
} from "@/types/content";

interface LmsProductStageProps {
  onOpenModal?: () => void;
}

export function LmsProductStage({ onOpenModal }: LmsProductStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // Mobile refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const card1MobileRef = useRef<HTMLDivElement>(null);
  const card2MobileRef = useRef<HTMLDivElement>(null);
  const card3MobileRef = useRef<HTMLDivElement>(null);
  const card4MobileRef = useRef<HTMLDivElement>(null);

  const [currency, setCurrency] = useState<"USD" | "INR">("USD");

  const card1Data = heroContent.cards[0] as HeroCourseBuilderCard;
  const card2Data = heroContent.cards[1] as HeroTutorCard;
  const card3Data = heroContent.cards[2] as HeroCheckoutCard;
  const card4Data = heroContent.cards[3] as HeroCertificateCard;

  useEffect(() => {
    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A05 Hero Card Convergence)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 72%",
            end: "top 18%",
            scrub: 0.8,
          },
        });

        // Start offsets matching Mota reference:
        // Cards float tilted around the frame on load, spanning 70-80% of width, >=48px margins
        tl.from(
          card1Ref.current,
          {
            x: -125,
            y: -25,
            scale: 1.08,
            rotateZ: -7,
            rotateX: 6,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0
        );

        tl.from(
          card2Ref.current,
          {
            x: 125,
            y: -25,
            scale: 1.08,
            rotateZ: 6,
            rotateX: 6,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.02
        );

        tl.from(
          card3Ref.current,
          {
            x: -100,
            y: 40,
            scale: 1.06,
            rotateZ: -5,
            rotateX: 6,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.05
        );

        tl.from(
          card4Ref.current,
          {
            x: 100,
            y: 40,
            scale: 1.06,
            rotateZ: 5,
            rotateX: 6,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.07
        );

        tl.from(
          frameRef.current,
          {
            scale: 0.92,
            ease: "power1.inOut",
          },
          0
        );
      });

      // Mobile / Tablet: under 1024px (Cards deal-in stack in 160vh container)
      mm.add("(max-width: 1023px)", () => {
        if (isReduced) {
          gsap.set(
            [card1MobileRef.current, card2MobileRef.current, card3MobileRef.current, card4MobileRef.current],
            { clearProps: "all" }
          );
          return;
        }

        // Start: the 4 cards stacked as a deck, each 10px lower than the one above,
        // tilts -3deg, 2deg, -2deg, 3deg. Course builder on top.
        gsap.set(card1MobileRef.current, { x: 0, y: 72, rotateZ: -3, scale: 1, zIndex: 40 });
        gsap.set(card2MobileRef.current, { x: 0, y: 82, rotateZ: 2, scale: 1, zIndex: 30 });
        gsap.set(card3MobileRef.current, { x: 0, y: 92, rotateZ: -2, scale: 1, zIndex: 20 });
        gsap.set(card4MobileRef.current, { x: 0, y: 102, rotateZ: 3, scale: 1, zIndex: 10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // 1. Card 1 moves straight up (no sideways movement), scales to 0.92, settles as 24px ledge at y=0
        tl.to(
          card1MobileRef.current,
          {
            x: 0,
            y: 0,
            scale: 0.92,
            rotateZ: 0,
            duration: 0.30,
            ease: "power1.out",
          },
          0
        );
        tl.to(
          card2MobileRef.current,
          {
            x: 0,
            y: 72,
            rotateZ: 0,
            duration: 0.28,
            ease: "power1.out",
          },
          0
        );
        // Card 2 takes higher z-index so it cleanly covers Card 1 below y=24
        tl.set(card2MobileRef.current, { zIndex: 40 }, 0.28);
        tl.set(card1MobileRef.current, { zIndex: 10 }, 0.28);

        // 2. Card 2 moves straight up, scales to 0.92, settles as 2nd 24px ledge at y=24
        tl.to(
          card2MobileRef.current,
          {
            x: 0,
            y: 24,
            scale: 0.92,
            rotateZ: 0,
            duration: 0.30,
            ease: "power1.out",
          },
          0.33
        );
        tl.to(
          card3MobileRef.current,
          {
            x: 0,
            y: 72,
            rotateZ: 0,
            duration: 0.28,
            ease: "power1.out",
          },
          0.33
        );
        // Card 3 takes higher z-index so it cleanly covers Card 2 below y=48
        tl.set(card3MobileRef.current, { zIndex: 40 }, 0.61);
        tl.set(card2MobileRef.current, { zIndex: 20 }, 0.61);

        // 3. Card 3 moves straight up, scales to 0.92, settles as 3rd 24px ledge at y=48
        tl.to(
          card3MobileRef.current,
          {
            x: 0,
            y: 48,
            scale: 0.92,
            rotateZ: 0,
            duration: 0.30,
            ease: "power1.out",
          },
          0.66
        );
        // Card 4 straightens, stays scale 1 at y=72 fully visible
        tl.to(
          card4MobileRef.current,
          {
            x: 0,
            y: 72,
            rotateZ: 0,
            scale: 1,
            duration: 0.28,
            ease: "power1.out",
          },
          0.66
        );
        // Card 4 takes top z-index, fully visible under the three 24px ledges
        tl.set(card4MobileRef.current, { zIndex: 40 }, 0.92);
        tl.set(card3MobileRef.current, { zIndex: 30 }, 0.92);

        // 4. Brief settle hold before hero unpins immediately
        tl.to({}, { duration: 0.06 }, 0.94);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full font-urbanist">
      {/* Desktop Stage: Dashboard frame with floating converging cards (>=1024px) */}
      <div
        ref={stageRef}
        style={{ perspective: 1200 }}
        className="relative mx-auto max-w-[960px] lg:max-w-[1020px] w-full min-h-[580px] sm:min-h-[620px] overflow-visible hidden lg:block"
      >
      <style jsx>{`
        @keyframes subtleFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes subtleFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3.5px); }
        }
        @keyframes subtleFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes subtleFloat4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .float-wrap-1 { animation: subtleFloat1 3.4s ease-in-out infinite; }
        .float-wrap-2 { animation: subtleFloat2 3.8s ease-in-out infinite 0.4s; }
        .float-wrap-3 { animation: subtleFloat3 3.6s ease-in-out infinite 0.8s; }
        .float-wrap-4 { animation: subtleFloat4 4.0s ease-in-out infinite 1.2s; }
      `}</style>

      {/* Frame Layer (Shell: Dark frame + Sidebar + App Bar + Dot grid canvas) */}
      <div
        ref={frameRef}
        className="rounded-[32px] sm:rounded-[36px] bg-[#18191B] p-2.5 sm:p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] min-h-[580px] sm:min-h-[620px] flex flex-col overflow-hidden"
      >
        <div className="rounded-[24px] sm:rounded-[28px] bg-[#FAF9F6] flex min-h-[560px] sm:min-h-[596px] relative overflow-hidden flex-1">
          {/* Left Dark Icon Sidebar */}
          <aside className="w-14 sm:w-16 bg-[#18191B] flex flex-col items-center justify-between py-5 shrink-0 text-white/50 border-r border-white/5 z-0">
            {/* Top Logo Mark */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-white p-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              </div>

              {/* Sidebar Navigation Icons */}
              <nav className="flex flex-col items-center gap-4 text-white/60">
                <div className="size-8 rounded-lg bg-white/15 text-white flex items-center justify-center cursor-pointer">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="size-8 rounded-lg hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="size-8 rounded-lg hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </nav>
            </div>

            {/* Bottom Utility Icons */}
            <div className="flex flex-col items-center gap-4 text-white/50">
              <div className="size-8 rounded-lg hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="size-8 rounded-lg hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Canvas Area */}
          <div className="flex-1 p-3 sm:p-5 flex flex-col justify-between relative z-0">
            {/* Background Dot Grid Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Top Application Bar */}
            <div className="relative z-0 flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200/80">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Home</h2>

              <div className="flex items-center gap-2.5">
                {/* Search Bar */}
                <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs w-44 lg:w-56 text-[11px] text-slate-400">
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search courses or cohorts...</span>
                </div>

                {/* Black Pill Button: Start Meeting */}
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#161616] hover:bg-black text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Start Class</span>
                  <svg className="size-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </button>

                {/* User Avatar */}
                <div className="size-7 rounded-full bg-purple-100 border border-purple-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[11px] text-[#7B5CF5]">
                  LD
                </div>
              </div>
            </div>

            {/* Reserve height in canvas for the 2x2 grid */}
            <div className="flex-1 min-h-[460px] sm:min-h-[490px]" />
          </div>
        </div>
      </div>

      {/* Cards Layer (4 Converging Product Cards - Absolutely positioned over canvas, z-10) */}
      <div className="absolute inset-0 pt-[68px] sm:pt-[76px] pl-[60px] sm:pl-[76px] pr-3 sm:pr-4 pb-3 sm:pb-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 z-10 pointer-events-auto items-stretch">
        {/* Card 1: Course builder (Top-Left) */}
        <div ref={card1Ref} className="will-change-transform flex">
          <div
            className="float-wrap-1 w-full rounded-[20px] bg-white p-3.5 sm:p-4 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[15px] sm:text-[16px] font-semibold text-[#161616] tracking-tight">
                  {card1Data.title}
                </h3>
              </div>
              <p className="text-[12px] text-[#6B6F76] mt-0.5 truncate">{card1Data.subtitle}</p>

              <div className="mt-2.5 space-y-1.5">
                {card1Data.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#F5F6F8] rounded-[10px] px-2.5 py-1.5 text-[11px]"
                  >
                    <span className="font-medium text-[#161616] truncate">{lesson.title}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6F76] bg-white border border-[#ECEDEF] px-1.5 py-0.5 rounded ml-2 shrink-0">
                      {lesson.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#6B6F76] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {card1Data.dripChip}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: HelpDesk AI tutor (Top-Right) */}
        <div ref={card2Ref} className="will-change-transform flex">
          <div
            className="float-wrap-2 w-full rounded-[20px] bg-white p-3.5 sm:p-4 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-[#7B5CF5] text-[10px] font-bold">
                    {card2Data.badge}
                  </span>
                  <h3 className="font-urbanist text-[15px] sm:text-[16px] font-semibold text-[#161616] tracking-tight">
                    {card2Data.title}
                  </h3>
                </div>
              </div>
              <p className="text-[12px] text-[#6B6F76] mt-0.5 truncate">{card2Data.subtitle}</p>

              <div className="mt-2 space-y-1.5">
                {/* Learner Question Bubble */}
                <div className="flex items-start gap-1.5 justify-end">
                  <div className="max-w-[88%] rounded-[10px] bg-[#F5F6F8] px-2.5 py-1 text-[11px] text-[#161616]">
                    <p className="font-medium truncate">{card2Data.question}</p>
                  </div>
                </div>

                {/* AI Tutor Response Bubble */}
                <div className="flex items-start gap-1.5">
                  <div className="size-5 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    AI
                  </div>
                  <div className="max-w-[90%] rounded-[10px] bg-purple-50/70 border border-purple-100 px-2.5 py-1.5 text-[11px] text-slate-800">
                    <p className="line-clamp-2 leading-relaxed text-[11px]">{card2Data.answer}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[10px] text-[#7B5CF5] font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                <span>✦</span>
                {card2Data.sourceChip}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Checkout (Bottom-Left) */}
        <div ref={card3Ref} className="will-change-transform flex">
          <div
            className="float-wrap-3 w-full rounded-[20px] bg-white p-3.5 sm:p-4 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[15px] sm:text-[16px] font-semibold text-[#161616] tracking-tight">
                  {card3Data.title}
                </h3>
                {/* Currency switch */}
                <div className="flex items-center gap-1 bg-[#F5F6F8] rounded-full p-0.5 border border-[#ECEDEF] text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                      currency === "USD" ? "bg-[#161616] text-white" : "text-[#6B6F76] hover:text-[#161616]"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                      currency === "INR" ? "bg-[#161616] text-white" : "text-[#6B6F76] hover:text-[#161616]"
                    }`}
                  >
                    INR
                  </button>
                </div>
              </div>
              <p className="text-[12px] text-[#6B6F76] mt-0.5 truncate">{card3Data.subtitle}</p>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between bg-[#F5F6F8] rounded-[10px] px-2.5 py-1.5 text-[11px]">
                  <span className="font-medium text-[#161616] truncate">{card3Data.courseName}</span>
                  <span className="font-bold text-[#161616] ml-1 shrink-0">
                    {currency === "USD" ? card3Data.priceUsd : card3Data.priceInr}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-100 rounded-[10px] px-2.5 py-1 text-[11px] text-emerald-800">
                  <span className="flex items-center gap-1 font-medium">
                    <svg className="size-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {card3Data.couponText}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Applied</span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
              <div className="flex items-center gap-1 flex-wrap">
                {card3Data.gateways.map((gw, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]"
                  >
                    {gw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Certificate issued (Bottom-Right) */}
        <div ref={card4Ref} className="will-change-transform flex">
          <div
            className="float-wrap-4 w-full rounded-[20px] bg-white p-3.5 sm:p-4 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[15px] sm:text-[16px] font-semibold text-[#161616] tracking-tight">
                  {card4Data.title}
                </h3>
              </div>
              <p className="text-[12px] text-[#6B6F76] mt-0.5 truncate">{card4Data.subtitle}</p>

              <div className="mt-2 flex items-center gap-2.5 bg-[#F5F6F8] rounded-[10px] p-2 border border-[#ECEDEF]">
                {/* 3D Medal Illustration */}
                <div className="size-8 rounded-lg bg-linear-to-br from-[#F3CF74] via-[#EAB308] to-[#CA8A04] flex items-center justify-center text-white shadow-xs shrink-0 border border-white/40">
                  <svg className="size-4 drop-shadow-xs" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-[#161616] truncate">{card4Data.learnerName}</p>
                  <p className="text-[10px] text-[#6B6F76] truncate">{card4Data.courseName}</p>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenModal}
                className="w-full py-1.5 px-3 rounded-[8px] bg-[#161616] hover:bg-black text-white text-[11px] font-semibold text-center transition-colors cursor-pointer"
              >
                {card4Data.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile / Tablet View (<1024px): 4 Cards Deal-In Stack in a Sticky Stage */}
      <div
        ref={mobileContainerRef}
        className="relative w-full h-[160vh] lg:hidden"
      >
        <div
          ref={mobileStageRef}
          className="sticky top-[calc((100vh-388px)/2)] w-full h-[388px] max-w-[420px] mx-auto overflow-visible px-4"
        >
          <div className="relative w-full h-[388px]">
            {/* Card 1: Course builder */}
            <div
              ref={card1MobileRef}
              style={{ zIndex: 40 }}
              className="absolute inset-x-0 top-0 h-[316px] rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between will-change-transform"
            >
              <div>
                <h3 className="font-urbanist text-base sm:text-lg font-semibold text-[#161616] tracking-tight">
                  {card1Data.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6F76] mt-0.5">{card1Data.subtitle}</p>

                <div className="mt-3 space-y-2">
                  {card1Data.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#F5F6F8] rounded-[10px] px-3 py-2 text-xs"
                    >
                      <span className="font-medium text-[#161616] truncate">{lesson.title}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6F76] bg-white border border-[#ECEDEF] px-1.5 py-0.5 rounded ml-2 shrink-0">
                        {lesson.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#ECEDEF] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6B6F76] flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  {card1Data.dripChip}
                </span>
              </div>
            </div>

            {/* Card 2: HelpDesk AI tutor */}
            <div
              ref={card2MobileRef}
              style={{ zIndex: 30 }}
              className="absolute inset-x-0 top-0 h-[316px] rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#7B5CF5] text-[10px] font-bold">
                    {card2Data.badge}
                  </span>
                  <h3 className="font-urbanist text-base sm:text-lg font-semibold text-[#161616] tracking-tight">
                    {card2Data.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6F76] mt-0.5">{card2Data.subtitle}</p>

                <div className="mt-2.5 space-y-2">
                  <div className="flex items-start gap-2 justify-end">
                    <div className="max-w-[85%] rounded-[10px] bg-[#F5F6F8] px-3 py-1.5 text-xs text-[#161616]">
                      <p className="font-medium">{card2Data.question}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="size-6 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      AI
                    </div>
                    <div className="max-w-[90%] rounded-[10px] bg-purple-50/70 border border-purple-100 px-3 py-2 text-xs text-slate-800">
                      <p className="leading-relaxed line-clamp-2">{card2Data.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-[#7B5CF5] font-semibold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                  <span>✦</span>
                  {card2Data.sourceChip}
                </span>
              </div>
            </div>

            {/* Card 3: Checkout */}
            <div
              ref={card3MobileRef}
              style={{ zIndex: 20 }}
              className="absolute inset-x-0 top-0 h-[316px] rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-urbanist text-base sm:text-lg font-semibold text-[#161616] tracking-tight">
                    {card3Data.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#F5F6F8] rounded-full p-0.5 border border-[#ECEDEF] text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setCurrency("USD")}
                      className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                        currency === "USD" ? "bg-[#161616] text-white" : "text-[#6B6F76] hover:text-[#161616]"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency("INR")}
                      className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                        currency === "INR" ? "bg-[#161616] text-white" : "text-[#6B6F76] hover:text-[#161616]"
                      }`}
                    >
                      INR
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6F76] mt-0.5">{card3Data.subtitle}</p>

                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center justify-between bg-[#F5F6F8] rounded-[10px] px-3 py-1.5 text-xs">
                    <span className="font-medium text-[#161616] truncate">{card3Data.courseName}</span>
                    <span className="font-bold text-[#161616] ml-2 shrink-0">
                      {currency === "USD" ? card3Data.priceUsd : card3Data.priceInr}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-100 rounded-[10px] px-3 py-1 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <svg className="size-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {card3Data.couponText}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Applied</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {card3Data.gateways.map((gw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F5F6F8] text-[#6B6F76] border border-[#ECEDEF]"
                    >
                      {gw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4: Certificate issued */}
            <div
              ref={card4MobileRef}
              style={{ zIndex: 10 }}
              className="absolute inset-x-0 top-0 h-[316px] rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between will-change-transform"
            >
              <div>
                <h3 className="font-urbanist text-base sm:text-lg font-semibold text-[#161616] tracking-tight">
                  {card4Data.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6F76] mt-0.5">{card4Data.subtitle}</p>

                <div className="mt-2.5 flex items-center gap-2.5 bg-[#F5F6F8] rounded-[10px] p-2 border border-[#ECEDEF]">
                  <div className="size-8 rounded-lg bg-linear-to-br from-[#F3CF74] via-[#EAB308] to-[#CA8A04] flex items-center justify-center text-white shadow-xs shrink-0 border border-white/40">
                    <svg className="size-4 drop-shadow-xs" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-[#161616] truncate">{card4Data.learnerName}</p>
                    <p className="text-[11px] text-[#6B6F76] truncate">{card4Data.courseName}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#ECEDEF] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-[#161616] hover:bg-black text-white text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer flex items-center justify-center"
                >
                  {card4Data.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LmsProductStage;
