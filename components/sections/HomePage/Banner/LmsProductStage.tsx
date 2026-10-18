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
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

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
            start: "top 75%",
            end: "top 18%",
            scrub: 0.8,
          },
        });

        // Starts slightly floated and tilted within bounds (-6° to +6°, safe margins >= 48px)
        tl.from(
          card1Ref.current,
          {
            x: -70,
            y: -24,
            rotateZ: -4.5,
            rotateX: 4,
            transformPerspective: 1000,
            ease: "power1.inOut",
          },
          0
        );

        tl.from(
          card2Ref.current,
          {
            x: 70,
            y: -24,
            rotateZ: 4.5,
            rotateX: 4,
            transformPerspective: 1000,
            ease: "power1.inOut",
          },
          0.02
        );

        tl.from(
          card3Ref.current,
          {
            x: -50,
            y: 30,
            rotateZ: -3.5,
            rotateX: 4,
            transformPerspective: 1000,
            ease: "power1.inOut",
          },
          0.04
        );

        tl.from(
          card4Ref.current,
          {
            x: 50,
            y: 30,
            rotateZ: 3.5,
            rotateX: 4,
            transformPerspective: 1000,
            ease: "power1.inOut",
          },
          0.06
        );

        tl.from(
          frameRef.current,
          {
            scale: 0.94,
            ease: "power1.inOut",
          },
          0
        );
      });

      // Mobile / Tablet: under 1024px
      mm.add("(max-width: 1023px)", () => {
        if (isReduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.8,
          },
        });

        tl.from(
          [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current],
          {
            y: 20,
            opacity: 0.9,
            stagger: 0.05,
            ease: "power1.out",
          }
        );
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      style={{ perspective: 1200 }}
      className="relative mx-auto max-w-[940px] w-full font-urbanist overflow-visible scale-[0.88] sm:scale-95 lg:scale-100 origin-top"
    >
      <style jsx>{`
        @keyframes subtleFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes subtleFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes subtleFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes subtleFloat4 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2.5px); }
        }
        .float-wrap-1 { animation: subtleFloat1 3.5s ease-in-out infinite; }
        .float-wrap-2 { animation: subtleFloat2 3.8s ease-in-out infinite 0.4s; }
        .float-wrap-3 { animation: subtleFloat3 3.6s ease-in-out infinite 0.8s; }
        .float-wrap-4 { animation: subtleFloat4 4.0s ease-in-out infinite 1.2s; }
      `}</style>

      {/* Frame Layer (Shell: Dark frame + Sidebar + App Bar + Dot grid canvas) */}
      <div
        ref={frameRef}
        className="rounded-[28px] sm:rounded-[32px] bg-[#18191B] p-2 sm:p-2.5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.18)] min-h-[490px] sm:min-h-[520px] flex flex-col overflow-visible"
      >
        <div className="rounded-[22px] sm:rounded-[26px] bg-[#FAF9F6] flex min-h-[470px] sm:min-h-[500px] relative overflow-hidden flex-1">
          {/* Left Dark Icon Sidebar */}
          <aside className="w-12 sm:w-14 bg-[#18191B] flex flex-col items-center justify-between py-4 shrink-0 text-white/50 border-r border-white/5 z-0">
            {/* Top Logo Mark */}
            <div className="space-y-5 flex flex-col items-center">
              <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-white p-1.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              </div>

              {/* Sidebar Navigation Icons */}
              <nav className="flex flex-col items-center gap-3.5 text-white/60">
                <div className="size-7 rounded-md bg-white/15 text-white flex items-center justify-center cursor-pointer">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="size-7 rounded-md hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="size-7 rounded-md hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </nav>
            </div>

            {/* Bottom Utility Icons */}
            <div className="flex flex-col items-center gap-3.5 text-white/50">
              <div className="size-7 rounded-md hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="size-7 rounded-md hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Canvas Area */}
          <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between relative z-0">
            {/* Background Dot Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* Top Application Bar */}
            <div className="relative z-0 flex items-center justify-between pb-3.5 border-b border-slate-200/80">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Home</h2>

              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs text-[11px] text-slate-400">
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search courses or cohorts...</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenModal}
                  className="px-3 py-1 rounded-full bg-[#161616] hover:bg-black text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Start Class</span>
                  <svg className="size-2.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </button>

                <div className="size-7 rounded-full bg-purple-100 border border-purple-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-[11px] text-[#7B5CF5]">
                  LD
                </div>
              </div>
            </div>

            {/* Reserved space in canvas for docked 2x2 cards */}
            <div className="flex-1 min-h-[380px]" />
          </div>
        </div>
      </div>

      {/* Cards Layer (4 Mixed Product Cards - Sibling to frame, z-10) */}
      <div className="absolute inset-0 pt-[68px] sm:pt-[76px] pl-[54px] sm:pl-[66px] pr-3 sm:pr-4 pb-3 sm:pb-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 z-10 pointer-events-auto items-stretch">
        {/* Card 1: Course Builder (Top-Left) */}
        <div ref={card1Ref} className="will-change-transform flex">
          <div
            className="float-wrap-1 w-full rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <span className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#7B5CF5] opacity-80" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[17px] sm:text-[18px] font-semibold text-[#161616] tracking-tight">
                  {card1Data.title}
                </h3>
              </div>
              <p className="text-[13px] text-[#6B6F76] mt-0.5 truncate">{card1Data.subtitle}</p>

              {/* Three Lesson Rows with Icons */}
              <div className="mt-3 space-y-2">
                {card1Data.lessons.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#F5F6F8] rounded-[12px] px-3 py-2 text-[13px] text-[#161616]"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {lesson.type === "video" && (
                        <span className="size-5 rounded-md bg-purple-100 text-[#7B5CF5] flex items-center justify-center shrink-0">
                          <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      )}
                      {lesson.type === "pdf" && (
                        <span className="size-5 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </span>
                      )}
                      {lesson.type === "quiz" && (
                        <span className="size-5 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      )}
                      <span className="font-medium truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[11px] text-[#6B6F76] uppercase tracking-wider font-semibold ml-2 shrink-0">
                      {lesson.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#ECEDEF] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]">
                <span className="size-1.5 rounded-full bg-[#7B5CF5]" />
                {card1Data.dripChip}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: HelpDesk AI Tutor (Top-Right) */}
        <div ref={card2Ref} className="will-change-transform flex">
          <div
            className="float-wrap-2 w-full rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <span className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#8E7CF8] opacity-80" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[17px] sm:text-[18px] font-semibold text-[#161616] tracking-tight">
                  {card2Data.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#7B5CF5] text-white text-[10px] font-bold">
                  {card2Data.badge}
                </span>
              </div>
              <p className="text-[13px] text-[#6B6F76] mt-0.5 truncate">{card2Data.subtitle}</p>

              {/* Chat bubbles */}
              <div className="mt-3 space-y-2">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-[12px] rounded-tr-xs bg-[#F5F6F8] px-3 py-2 text-[12px] text-[#161616] font-medium leading-relaxed">
                    {card2Data.question}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="size-5 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                    AI
                  </div>
                  <div className="max-w-[88%] rounded-[12px] rounded-tl-xs bg-purple-50/70 border border-purple-100 px-3 py-2 text-[12px] text-slate-800 leading-relaxed">
                    {card2Data.answer}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#ECEDEF] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F5F6F8] text-[#161616] border border-[#ECEDEF]">
                <span className="size-1.5 rounded-full bg-[#8E7CF8]" />
                {card2Data.sourceChip}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Checkout (Bottom-Left) */}
        <div ref={card3Ref} className="will-change-transform flex">
          <div
            className="float-wrap-3 w-full rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <span className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#F3CF74] opacity-80" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[17px] sm:text-[18px] font-semibold text-[#161616] tracking-tight">
                  {card3Data.title}
                </h3>
                {/* Currency Switch */}
                <div className="inline-flex p-0.5 rounded-md bg-[#F5F6F8] border border-[#ECEDEF] text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`px-2 py-0.5 rounded ${
                      currency === "USD" ? "bg-white text-[#161616] shadow-2xs" : "text-[#6B6F76]"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`px-2 py-0.5 rounded ${
                      currency === "INR" ? "bg-white text-[#161616] shadow-2xs" : "text-[#6B6F76]"
                    }`}
                  >
                    INR
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-[#6B6F76] mt-0.5 truncate">{card3Data.subtitle}</p>

              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between bg-[#F5F6F8] rounded-[12px] px-3 py-2 text-[13px]">
                  <span className="font-medium text-[#161616] truncate">{card3Data.courseName}</span>
                  <span className="font-bold text-[#161616] ml-2 shrink-0">
                    {currency === "USD" ? card3Data.priceUsd : card3Data.priceInr}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-100 rounded-[12px] px-3 py-1.5 text-[12px] text-emerald-800">
                  <span className="flex items-center gap-1.5 font-medium">
                    <svg className="size-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {card3Data.couponText}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Applied</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#ECEDEF] flex items-center justify-between">
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
        </div>

        {/* Card 4: Certificate Issued (Bottom-Right) */}
        <div ref={card4Ref} className="will-change-transform flex">
          <div
            className="float-wrap-4 w-full rounded-[20px] bg-white p-4 sm:p-5 border border-[#ECEDEF] flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden"
            style={{
              boxShadow: "0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)",
            }}
          >
            <span className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-[#A6E3D3] opacity-80" />
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-urbanist text-[17px] sm:text-[18px] font-semibold text-[#161616] tracking-tight">
                  {card4Data.title}
                </h3>
              </div>
              <p className="text-[13px] text-[#6B6F76] mt-0.5 truncate">{card4Data.subtitle}</p>

              <div className="mt-3 flex items-center gap-3 bg-[#F5F6F8] rounded-[12px] p-3 border border-[#ECEDEF]">
                {/* 3D Medal Illustration */}
                <div className="size-11 rounded-xl bg-linear-to-br from-[#F3CF74] via-[#EAB308] to-[#CA8A04] flex items-center justify-center text-white shadow-md shrink-0 border border-white/40">
                  <svg className="size-6 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-[#161616] truncate">{card4Data.learnerName}</p>
                  <p className="text-[11px] text-[#6B6F76] truncate">{card4Data.courseName}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#ECEDEF] flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenModal}
                className="w-full py-1.5 px-3 rounded-[10px] bg-[#161616] hover:bg-black text-white text-[12px] font-semibold text-center transition-colors cursor-pointer"
              >
                {card4Data.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LmsProductStage;
