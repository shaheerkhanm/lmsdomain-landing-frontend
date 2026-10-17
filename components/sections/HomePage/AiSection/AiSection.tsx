"use client";

import React, { useState, useEffect } from "react";

export function AiSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [transferProgress, setTransferProgress] = useState(7);
  const [isTransferComplete, setIsTransferComplete] = useState(false);

  // Animate the circular progress ring when Tab 1 (DRM Transcoding) is active
  useEffect(() => {
    if (activeTab === 1 && !isTransferComplete) {
      const interval = setInterval(() => {
        setTransferProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTransferComplete(true);
            return 100;
          }
          return prev + 3;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [activeTab, isTransferComplete]);

  return (
    <section id="extension" className="py-24 sm:py-36 bg-white font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Step Progress & Descriptions (Mota 00:14 Style) */}
          <div className="lg:col-span-5 relative pl-8 sm:pl-10 space-y-16">
            {/* Vertical Progress Line */}
            <div className="absolute left-2.5 top-2 bottom-6 w-0.5 bg-slate-200">
              <div
                className="w-full bg-[#6C4BFF] transition-all duration-300 ease-out"
                style={{
                  height: activeTab === 0 ? "25%" : activeTab === 1 ? "60%" : "100%",
                }}
              />
            </div>

            {/* Step 1: AI Course Creation */}
            <div
              onClick={() => setActiveTab(0)}
              className="relative cursor-pointer group"
            >
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-0 size-6 sm:size-7 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                  activeTab === 0
                    ? "bg-[#6C4BFF] text-white"
                    : "bg-white border border-slate-300 text-slate-400 group-hover:text-slate-700"
                }`}
              >
                1
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C4BFF]">
                  <span>✦</span>
                  <span className="uppercase tracking-widest text-[10px]">AI AUTHORING</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 0 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  AI Course Creation
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Transform raw syllabi, lecture videos, or topic briefs into structured multi-week curricula, lesson briefs, and interactive coding challenges with Domie AI.
                </p>
              </div>
            </div>

            {/* Step 2: Protected Video Delivery */}
            <div
              onClick={() => setActiveTab(1)}
              className="relative cursor-pointer group"
            >
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-0 size-6 sm:size-7 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                  activeTab === 1
                    ? "bg-[#6C4BFF] text-white"
                    : "bg-white border border-slate-300 text-slate-400 group-hover:text-slate-700"
                }`}
              >
                2
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C4BFF]">
                  <span>✦</span>
                  <span className="uppercase tracking-widest text-[10px]">SECURITY ENGINE</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 1 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Protected Video Delivery
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Ingest and transcode 4K lecture uploads into encrypted multi-bitrate HLS streams protected by Widevine L1 & FairPlay, preventing screen recording in hardware.
                </p>
              </div>
            </div>

            {/* Step 3: Assessments & Progress */}
            <div
              onClick={() => setActiveTab(2)}
              className="relative cursor-pointer group"
            >
              <div
                className={`absolute -left-[30px] sm:-left-[38px] top-0 size-6 sm:size-7 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                  activeTab === 2
                    ? "bg-[#6C4BFF] text-white"
                    : "bg-white border border-slate-300 text-slate-400 group-hover:text-slate-700"
                }`}
              >
                3
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C4BFF]">
                  <span>✦</span>
                  <span className="uppercase tracking-widest text-[10px]">LEARNER PROGRESS</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 2 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Assessments & Live Classes
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Deploy auto-graded quizzes, live interactive WebRTC breakout classrooms, and attendance telemetry to track student engagement across cohorts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Studio Showcase Widget (Mota 00:15 - 00:23 Exact Style) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="rounded-[32px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-6">
              {/* LMS Domain Studio Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#18191B] text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                      LMS Domain Studio
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Curriculum & Security Engine</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#6C4BFF] text-[11px] font-semibold">
                  v2.4 Active
                </span>
              </div>

              {/* 3 Showcase Tabs (Mota 00:15 Exact Style) */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab(0)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 0
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Course Creation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 1
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  DRM Transcoding
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(2)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 2
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Live & Analytics
                </button>
              </div>

              {/* Tab 0: AI Course Creation */}
              {activeTab === 0 && (
                <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Domie AI Course Generator</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Generate multi-module curricula from lecture prompts.</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">TOPIC BRIEF</span>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value="Distributed Cloud Architecture & High-Scale Systems"
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 font-medium focus:outline-none truncate"
                          />
                          <button
                            type="button"
                            className="px-4 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-semibold shadow-xs shrink-0"
                          >
                            Generate
                          </button>
                        </div>
                      </div>

                      {/* Generated Modules Outline */}
                      <div className="space-y-2 pt-1">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span className="font-semibold text-slate-800">Module 1: Event-Driven Infrastructure</span>
                          </div>
                          <span className="text-[10px] text-slate-500">4 Lessons • 1 Quiz</span>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#6C4BFF] animate-pulse" />
                            <span className="font-semibold text-[#6C4BFF]">Module 2: High-Throughput Pipelines</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-medium">Synthesizing...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>10x Faster Course Authoring</span>
                    <span className="text-MainColor font-semibold">Ready for Review</span>
                  </div>
                </div>
              )}

              {/* Tab 1: DRM Transcoding with Animated Circular Progress Ring (Mota 00:18 Exact Style) */}
              {activeTab === 1 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  {!isTransferComplete ? (
                    <div className="relative rounded-2xl bg-[#FAF9F6] border border-slate-200/80 p-8 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                      {/* Grid Background */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40"
                        style={{
                          backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
                          backgroundSize: "16px 16px",
                        }}
                      />

                      {/* Circular Progress Ring */}
                      <div className="relative size-36 sm:size-40 flex items-center justify-center z-10">
                        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                          {/* Background Ring */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            stroke="#F1F5F9"
                            strokeWidth="10"
                            fill="none"
                          />
                          {/* Animated Progress Ring */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            stroke="#6C4BFF"
                            strokeWidth="10"
                            strokeDasharray={238.76}
                            strokeDashoffset={238.76 * (1 - transferProgress / 100)}
                            strokeLinecap="round"
                            fill="none"
                            className="transition-all duration-100 ease-out"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                            {transferProgress} %
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Transcoding Complete State (Mota 00:22 Exact Style) */
                    <div className="rounded-2xl bg-[#FAF9F6] border border-slate-200/80 p-6 flex flex-col items-center justify-center min-h-[260px] space-y-4">
                      {/* Big Blue DRM Shield Icon */}
                      <div className="size-20 rounded-2xl bg-[#38BDF8] text-white flex items-center justify-center shadow-md">
                        <svg className="size-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                        </svg>
                      </div>

                      <div className="text-center space-y-1">
                        <h4 className="text-base font-bold text-slate-900">Widevine L1 Protected!</h4>
                        <p className="text-xs text-slate-500">Video encrypted in hardware. Multi-bitrate HLS live.</p>
                      </div>

                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 truncate">
                          https://academy.yourbrand.com/courses/cloud-arch/lecture-04
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsTransferComplete(false);
                            setTransferProgress(7);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-semibold shrink-0 cursor-pointer hover:bg-black"
                        >
                          Transcode Next
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Video Metadata Row & Status */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">VIDEO ASSET</span>
                      <span className="font-semibold text-slate-800">Cloud_Architecture_Lecture_04.mp4</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">ENCRYPTION</span>
                      <span className="font-mono text-emerald-600 font-semibold">Widevine L1 + FairPlay</span>
                    </div>

                    {!isTransferComplete && (
                      <button
                        type="button"
                        onClick={() => {
                          setTransferProgress(7);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Assessments & Live Classrooms (Mota 00:23 Style) */}
              {activeTab === 2 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  <div className="aspect-16/10 rounded-2xl bg-slate-950 p-5 flex flex-col justify-between text-white border border-slate-800 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Classroom Active
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">1080p60 WebRTC</span>
                    </div>

                    <div className="text-center py-4">
                      <div className="size-12 rounded-full bg-white/10 mx-auto flex items-center justify-center text-xl mb-2">
                        🎓
                      </div>
                      <h5 className="font-bold text-sm">Interactive Live Classroom & Lab</h5>
                      <p className="text-xs text-slate-400 mt-1">Real-time attendance telemetry with auto-graded quiz sync</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2">
                      <span>AES-128 Encrypted Audio/Video</span>
                      <span className="text-emerald-400 font-mono">142 Learners Online</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">Classroom Link</span>
                      <span className="text-slate-500 font-mono text-[11px]">https://academy.yourbrand.com/live/class-84</span>
                    </div>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                    >
                      Join Classroom
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSection;