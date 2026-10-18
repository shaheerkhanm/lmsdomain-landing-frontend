"use client";

import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

  useEffect(() => {
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 1024px and up (A05 Hero Card Convergence)
      mm.add("(min-width: 1024px)", () => {
        if (isReduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 70%",
            end: "top 15%",
            scrub: 0.8,
          },
        });

        // Start offsets per spec §5.3 table (progress 0 -> progress 1)
        tl.from(
          card1Ref.current,
          {
            x: -140,
            y: -170,
            scale: 1.18,
            rotateZ: -2,
            rotateX: 8,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0
        );

        tl.from(
          card2Ref.current,
          {
            x: 120,
            y: -190,
            scale: 1.18,
            rotateZ: 2,
            rotateX: 8,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.02
        );

        tl.from(
          card3Ref.current,
          {
            x: -60,
            y: -40,
            scale: 1.12,
            rotateZ: 3,
            rotateX: 10,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.05
        );

        tl.from(
          card4Ref.current,
          {
            x: 60,
            y: -60,
            scale: 1.12,
            rotateZ: -3,
            rotateX: 10,
            transformPerspective: 1200,
            ease: "power1.inOut",
          },
          0.07
        );

        tl.from(
          frameRef.current,
          {
            scale: 0.85,
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
            end: "top 40%",
            scrub: 0.8,
          },
        });

        tl.from([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
          y: 20,
          opacity: 0.85,
          stagger: 0.04,
          ease: "power1.out",
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      style={{ perspective: 1200 }}
      className="relative mx-auto max-w-5xl w-full min-h-[580px] sm:min-h-[640px] font-urbanist overflow-visible"
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

      {/* Frame Layer (Shell: Dark frame + Sidebar + App Bar + Dot grid canvas) - Sibling to Cards */}
      <div
        ref={frameRef}
        className="rounded-[32px] sm:rounded-[36px] bg-[#18191B] p-2.5 sm:p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] min-h-[580px] sm:min-h-[640px] flex flex-col overflow-visible"
      >
        <div className="rounded-[24px] sm:rounded-[28px] bg-[#FAF9F6] flex min-h-[560px] sm:min-h-[616px] relative overflow-hidden flex-1">
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
              <div className="size-8 rounded-lg hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Canvas Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between relative z-0">
            {/* Background Dot Grid Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Top Application Bar */}
            <div className="relative z-0 flex items-center justify-between pb-5 sm:pb-6 border-b border-slate-200/80">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Home</h2>

              <div className="flex items-center gap-3">
                {/* Search Bar */}
                <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs w-48 lg:w-64 text-xs text-slate-400">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search courses or cohorts...</span>
                </div>

                {/* Black Pill Button: Start Meeting */}
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#161616] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Start Class</span>
                  <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </button>

                {/* User Avatar */}
                <div className="size-8 rounded-full bg-purple-100 border border-purple-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-[#7B5CF5]">
                  LD
                </div>
              </div>
            </div>

            {/* Reserve height in canvas for the 2x2 grid */}
            <div className="flex-1 min-h-[420px] sm:min-h-[460px]" />
          </div>
        </div>
      </div>

      {/* Cards Layer (4 Converging Cards - Sibling to frame, absolutely positioned over canvas, z-10) */}
      <div className="absolute inset-0 pt-[82px] sm:pt-[94px] pl-[64px] sm:pl-[84px] pr-4 sm:pr-6 pb-4 sm:pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 z-10 pointer-events-auto items-stretch">
        {/* Card 1: Protected Video Player (Top-Left) */}
        <div ref={card1Ref} className="will-change-transform flex">
          <div className="float-wrap-1 w-full rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Protected Video Player</h3>
              <p className="text-xs text-[#6B6F76] mt-0.5">White-label video playback with hardware L1 DRM.</p>

              <div className="mt-4 space-y-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">HARDWARE DRM SHIELD</span>
                  <div className="mt-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800">
                    <span>Widevine L1 + FairPlay</span>
                    <svg className="size-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">DYNAMIC WATERMARK</span>
                  <div className="mt-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800">
                    <span>#LMS-9481 | 192.168.1.104</span>
                    <svg className="size-3.5 text-slate-400 cursor-pointer hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Decrypted inside Hardware TEE
              </span>
              <span className="text-emerald-600 font-bold">0% Piracy Leakage</span>
            </div>
          </div>
        </div>

        {/* Card 2: Custom Domain & Single-Tenant Schema (Top-Right) */}
        <div ref={card2Ref} className="will-change-transform flex">
          <div className="float-wrap-2 w-full rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">Custom Domain & SSO</h3>
              <p className="text-xs text-[#6B6F76] mt-0.5">Isolated single-tenant academy schema.</p>

              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">ACADEMY HOSTNAME</span>
                  <div className="mt-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800">
                    <span>academy.yourbrand.com</span>
                    <span className="text-[10px] text-emerald-600 font-bold">LIVE</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 text-xs text-slate-700">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="size-3.5 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <span className="size-1.5 rounded-full bg-slate-900" />
                    </span>
                    <span className="font-medium">SSL Active</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-slate-500 cursor-pointer">
                    <span className="size-3.5 rounded-full border border-slate-300" />
                    <span>Okta / SAML SSO</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={onOpenModal}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Configure DNS
                </button>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
              <span>Custom Wildcard SSL</span>
              <span className="text-[#7B5CF5] font-semibold">100% White-Label</span>
            </div>
          </div>
        </div>

        {/* Card 3: Storage Capacity / Curriculum Hub (Bottom-Left) */}
        <div ref={card3Ref} className="will-change-transform flex">
          <div className="float-wrap-3 w-full rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Curriculum Storage</h3>
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Upload SCORM
                </button>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  124 <span className="text-slate-400 font-normal text-xs">/ 512 Gb</span>
                </div>
                <span className="text-xs font-mono font-semibold text-slate-600">24 %</span>
              </div>

              {/* Segmented Color Progress Bar (Mota 00:04 Exact Colors) */}
              <div className="mt-2.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden flex gap-0.5">
                <div className="w-[38%] bg-[#818CF8] rounded-l-full" />
                <div className="w-[32%] bg-[#5EEAD4]" />
                <div className="w-[17%] bg-[#FCD34D]" />
                <div className="w-[13%] bg-[#60A5FA] rounded-r-full" />
              </div>

              {/* 4 Category Breakdown Tiles */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#818CF8]" />
                    <span className="font-medium text-slate-700 text-[11px]">SCORM/HTML5</span>
                  </div>
                  <span className="font-bold text-slate-900 text-[11px]">48 Gb</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#5EEAD4]" />
                    <span className="font-medium text-slate-700 text-[11px]">DRM Videos</span>
                  </div>
                  <span className="font-bold text-slate-900 text-[11px]">42 Gb</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#FCD34D]" />
                    <span className="font-medium text-slate-700 text-[11px]">PDF Rubrics</span>
                  </div>
                  <span className="font-bold text-slate-900 text-[11px]">21 Gb</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#60A5FA]" />
                    <span className="font-medium text-slate-700 text-[11px]">Lecture Audio</span>
                  </div>
                  <span className="font-bold text-slate-900 text-[11px]">13 Gb</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              1,238 curriculum assets indexed
            </div>
          </div>
        </div>

        {/* Card 4: Domie AI Curriculum Copilot (Bottom-Right) */}
        <div ref={card4Ref} className="will-change-transform flex">
          <div className="float-wrap-4 w-full rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Domie AI Copilot</h3>
                <p className="text-xs text-[#6B6F76] leading-relaxed max-w-[190px]">
                  Auto-generate multi-week syllabi, rubric quizzes, and lecture briefs in seconds.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Generate Syllabus
                  </button>
                </div>
              </div>

              {/* 3D Pastel Gear/Illustration (Mota Motif) */}
              <div className="size-24 sm:size-28 shrink-0 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-tr from-purple-100/60 to-pink-100/60 rounded-2xl blur-lg -z-10" />
                <svg viewBox="0 0 100 100" className="size-full drop-shadow-md">
                  <path d="M15 65 L60 85 L85 70 L40 50 Z" fill="#F472B6" />
                  <circle cx="50" cy="40" r="22" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
                  <circle cx="50" cy="40" r="10" fill="#0F172A" />
                  <circle cx="70" cy="62" r="8" fill="#18181B" />
                </svg>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B6F76]">
              <span className="text-[#7B5CF5] font-semibold">Domie AI v2.4 Engine</span>
              <span className="text-emerald-600 font-bold">10x Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LmsProductStage;
