"use client";

import React from "react";

export function FeaturesSection({ data }: { data?: any }) {
  return (
    <section id="features" className="py-20 sm:py-32 bg-white font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header (Mota 00:05 Exact Style) */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C4BFF] mb-3">
            <span>✦</span>
            <span className="uppercase tracking-widest text-[11px]">FEATURES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
            All must-have remote features in 1 place
          </h2>
        </div>

        {/* 3 Stacking Feature Cards (Mota 00:06 - 00:11 Exact Stacking Cards Deck) */}
        <div className="relative space-y-12 sm:space-y-16 pb-12">
          {/* Card 01: Remote Control / Hardware DRM Video Protection */}
          <div className="sticky top-24 sm:top-28 rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-6 sm:p-12 lg:p-14 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
              {/* Left Column: Title & Subtitle */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
                  Remote control
                </h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm">
                  To share access with your device or take a control of someone&apos;s device remotely with hardware L1 DRM protection.
                </p>
              </div>

              {/* Right Column: Interconnected Photos with Central Logo Connector (Mota 00:06 Style) */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
                {/* Horizontal / Diagonal Connecting Line with Central Brand Icon */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-slate-200" />
                  <div className="absolute size-11 rounded-2xl bg-[#18191B] text-white flex items-center justify-center shadow-md">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                  </div>
                </div>

                {/* Top-Right Overlapping Photo Card */}
                <div className="relative -mr-8 sm:-mr-12 mb-16 sm:mb-20 w-52 sm:w-64 aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="/assets/img/advantage/advantage-img-2.jpg"
                    alt="Instructor working remotely"
                    className="size-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white font-mono">
                    Widevine L1 Stream
                  </div>
                </div>

                {/* Bottom-Left Overlapping Photo Card */}
                <div className="relative -ml-8 sm:-ml-12 mt-16 sm:mt-20 w-52 sm:w-64 aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src="/assets/img/advantage/advantage-img-1.jpg"
                    alt="Student collaborating online"
                    className="size-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-emerald-600/80 backdrop-blur-xs text-[10px] text-white font-mono">
                    Forensic Watermark Active
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-Left Step Number */}
            <div className="pt-4 text-xs font-mono font-medium text-slate-400">
              01
            </div>
          </div>

          {/* Card 02: File Manager / Curriculum Hub with Concentric Radar Circles */}
          <div className="sticky top-24 sm:top-28 rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-6 sm:p-12 lg:p-14 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
              {/* Left Column: Title & Subtitle */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
                  File Manager
                </h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm">
                  To send/receive and manage all your files in easily and quickly with multi-tenant storage isolation.
                </p>
              </div>

              {/* Right Column: Concentric Radar Orbit Graphic (Mota 00:08 Style) */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
                {/* User Card Left */}
                <div className="hidden sm:block absolute left-2 top-1/2 -translate-y-1/2 w-28 sm:w-36 aspect-3/4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm z-10">
                  <img
                    src="/assets/img/advantage/advantage-img-3.jpg"
                    alt="Team member"
                    className="size-full object-cover"
                  />
                </div>

                {/* Center Radar Rings Container */}
                <div className="relative size-60 sm:size-72 flex items-center justify-center">
                  {/* Concentric Circles */}
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
                  <div className="absolute top-2 left-12 size-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-bold shadow-2xs">
                    📄
                  </div>
                  <div className="absolute top-6 right-8 size-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shadow-2xs">
                    📁
                  </div>
                  <div className="absolute bottom-6 left-12 size-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xs font-bold shadow-2xs">
                    ▶
                  </div>
                  <div className="absolute bottom-3 right-12 size-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold shadow-2xs">
                    🎵
                  </div>
                </div>

                {/* User Card Right */}
                <div className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 w-28 sm:w-36 aspect-3/4 rounded-2xl overflow-hidden border border-slate-200 shadow-sm z-10">
                  <img
                    src="/assets/img/advantage/advantage-img-1.jpg"
                    alt="Student studying"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom-Left Step Number */}
            <div className="pt-4 text-xs font-mono font-medium text-slate-400">
              02
            </div>
          </div>

          {/* Card 03: Video Meetings / Interactive Live Classrooms */}
          <div className="sticky top-24 sm:top-28 rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] p-6 sm:p-12 lg:p-14 min-h-[460px] sm:min-h-[520px] flex flex-col justify-between overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
              {/* Left Column: Title & Subtitle */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight leading-snug">
                  Video Meetings
                </h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm">
                  To stay in touch with everyone all over the world in couple of clicks with ultra low-latency WebRTC.
                </p>
              </div>

              {/* Right Column: Live Conference Video Tiles with Participant Tags (Mota 00:10 Style) */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[280px] sm:min-h-[340px]">
                {/* Primary Top Video Tile (Mia Lewis) */}
                <div className="relative -mr-6 sm:-mr-10 mb-12 sm:mb-16 w-56 sm:w-72 aspect-4/3 rounded-3xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src="/assets/img/advantage/advantage-img-2.jpg"
                    alt="Mia Lewis Video"
                    className="size-full object-cover"
                  />
                  {/* Floating Participant Tag */}
                  <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <span className="size-4 rounded-full bg-[#818CF8] text-[9px] font-bold flex items-center justify-center text-white">
                      M
                    </span>
                    <span>Mia Lewis</span>
                  </div>
                </div>

                {/* Secondary Bottom Video Tile (Alex Peterson) */}
                <div className="relative -ml-6 sm:-ml-10 mt-12 sm:mt-16 w-56 sm:w-72 aspect-4/3 rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src="/assets/img/advantage/advantage-img-3.jpg"
                    alt="Alex Peterson Video"
                    className="size-full object-cover"
                  />
                  {/* Floating Participant Tag */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                    <span className="size-4 rounded-full bg-pink-500 text-[9px] font-bold flex items-center justify-center text-white">
                      A
                    </span>
                    <span>Alex Peterson</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-Left Step Number */}
            <div className="pt-4 text-xs font-mono font-medium text-slate-400">
              03
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
