"use client";

import React, { useEffect, useState } from "react";

interface LmsProductStageProps {
  onOpenModal?: () => void;
}

export function LmsProductStage({ onOpenModal }: LmsProductStageProps) {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the user has scrolled relative to the hero
      const y = window.scrollY;
      // Start converging at 40px, fully converged by 260px
      const ratio = Math.min(Math.max((y - 40) / 220, 0), 1);
      setScrollRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute transform styles based on scrollRatio
  // When scrollRatio === 0: cards are scattered/offset & tilted
  // When scrollRatio === 1: cards are fully docked in 2x2 grid (translate 0, rotate 0)
  const isConverged = scrollRatio > 0.85;

  const card1Transform = {
    transform: `translate3d(${-32 * (1 - scrollRatio)}px, ${-22 * (1 - scrollRatio)}px, 0) rotate(${
      -3 * (1 - scrollRatio)
    }deg)`,
  };

  const card2Transform = {
    transform: `translate3d(${32 * (1 - scrollRatio)}px, ${-20 * (1 - scrollRatio)}px, 0) rotate(${
      2.5 * (1 - scrollRatio)
    }deg)`,
  };

  const card3Transform = {
    transform: `translate3d(${-24 * (1 - scrollRatio)}px, ${26 * (1 - scrollRatio)}px, 0) rotate(${
      2 * (1 - scrollRatio)
    }deg)`,
  };

  const card4Transform = {
    transform: `translate3d(${26 * (1 - scrollRatio)}px, ${28 * (1 - scrollRatio)}px, 0) rotate(${
      -2.5 * (1 - scrollRatio)
    }deg)`,
  };

  return (
    <div className="relative mx-auto max-w-5xl w-full">
      {/* Outer Browser/Application Window Container (Mota 00:00 - 00:05 Style) */}
      <div className="rounded-[32px] sm:rounded-[36px] bg-[#18191B] p-2.5 sm:p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.18)] transition-all duration-300">
        <div className="rounded-[24px] sm:rounded-[28px] bg-[#FAF9F6] flex overflow-hidden min-h-[580px] sm:min-h-[640px]">
          {/* Left Dark Icon Sidebar (Mota 00:04 Style) */}
          <aside className="w-14 sm:w-16 bg-[#18191B] flex flex-col items-center justify-between py-5 shrink-0 text-white/50 border-r border-white/5">
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
          <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden relative">
            {/* Background Dot Grid Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Top Application Bar (Mota 00:04 Style) */}
            <div className="relative z-10 flex items-center justify-between pb-5 sm:pb-6 border-b border-slate-200/80">
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
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  <span>Start Class</span>
                  <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                  </svg>
                </button>

                {/* User Avatar */}
                <div className="size-8 rounded-full bg-purple-100 border border-purple-200 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-MainColor">
                  LD
                </div>
              </div>
            </div>

            {/* The 4 Converging Cards Grid (Mota 00:00 -> 00:04 Assembly) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-4 sm:pt-6 flex-1 items-stretch">
              {/* Card 1: Remote Control / Hardware DRM Protection (Top-Left) */}
              <div
                style={card1Transform}
                className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-150 ease-out hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Remote control</h3>
                  <p className="text-xs text-slate-500 mt-0.5">To share access with your device securely.</p>

                  <div className="mt-4 space-y-2.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">YOUR ID</span>
                      <div className="mt-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800">
                        <span>883 992 234</span>
                        <svg className="size-3.5 text-slate-400 cursor-pointer hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">PASSWORD</span>
                      <div className="mt-1 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-mono text-slate-800">
                        <span>aakd2239djq</span>
                        <svg className="size-3.5 text-slate-400 cursor-pointer hover:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Widevine L1 DRM Active
                  </span>
                  <span className="text-emerald-600 font-bold">0% Piracy Leakage</span>
                </div>
              </div>

              {/* Card 2: Take the Control / Custom Domain (Top-Right) */}
              <div
                style={card2Transform}
                className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-150 ease-out hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Take the control</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Of someone&apos;s device remotely.</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">PARTNER ID</span>
                      <input
                        type="text"
                        readOnly
                        value="Enter code"
                        className="mt-1 w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-5 text-xs text-slate-700">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <span className="size-3.5 rounded-full border-2 border-slate-900 flex items-center justify-center">
                          <span className="size-1.5 rounded-full bg-slate-900" />
                        </span>
                        <span className="font-medium">Connect</span>
                      </label>
                      <label className="inline-flex items-center gap-1.5 text-slate-400 cursor-pointer">
                        <span className="size-3.5 rounded-full border border-slate-300" />
                        <span>Browse Files</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Custom Domain SSL</span>
                  <span className="text-MainColor font-semibold">100% White-Label</span>
                </div>
              </div>

              {/* Card 3: Storage Capacity / Curriculum Hub (Bottom-Left) */}
              <div
                style={card3Transform}
                className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-150 ease-out hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">Storage capacity</h3>
                    <button
                      type="button"
                      onClick={onOpenModal}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      Send Files
                    </button>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between">
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      87 <span className="text-slate-400 font-normal text-xs">/ 512 Gb</span>
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
                        <span className="font-medium text-slate-700 text-[11px]">Documents</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">38 Gb</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#5EEAD4]" />
                        <span className="font-medium text-slate-700 text-[11px]">Videos</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">32 Gb</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#FCD34D]" />
                        <span className="font-medium text-slate-700 text-[11px]">Images</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">17 Gb</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#60A5FA]" />
                        <span className="font-medium text-slate-700 text-[11px]">Music</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">13 Gb</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  1,238 curriculum assets indexed
                </div>
              </div>

              {/* Card 4: Mota in Full Throttle / Domie AI (Bottom-Right) */}
              <div
                style={card4Transform}
                className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-5 border border-slate-200/90 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-150 ease-out hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">Mota in full throttle!</h3>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                      Receive our special -25% offer and use all our features without restrictions.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onOpenModal}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Upgrade now
                      </button>
                    </div>
                  </div>

                  {/* 3D Pastel Gear/Illustration (Mota 00:04 Exact Motif) */}
                  <div className="size-24 sm:size-28 shrink-0 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-linear-to-tr from-purple-100/60 to-pink-100/60 rounded-2xl blur-lg -z-10" />
                    <svg viewBox="0 0 100 100" className="size-full drop-shadow-md">
                      {/* Pink Base Block */}
                      <path d="M15 65 L60 85 L85 70 L40 50 Z" fill="#F472B6" />
                      {/* Blue/Cyan Floating Gear */}
                      <circle cx="50" cy="40" r="22" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="2" />
                      <circle cx="50" cy="40" r="10" fill="#0F172A" />
                      {/* Black Sphere */}
                      <circle cx="70" cy="62" r="8" fill="#18181B" />
                    </svg>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="text-MainColor font-semibold">Domie AI v2.4 Engine</span>
                  <span className="text-emerald-600 font-bold">10x Speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LmsProductStage;
