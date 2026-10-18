"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface StepItem {
  step: number;
  tag: string;
  title: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    step: 1,
    tag: "AI AUTHORING",
    title: "AI Course Creation",
    description:
      "Transform raw syllabi, lecture videos, or topic briefs into structured multi-week curricula, lesson briefs, and interactive coding challenges with Domie AI.",
  },
  {
    step: 2,
    tag: "SECURITY ENGINE",
    title: "Protected Video Delivery",
    description:
      "Ingest and transcode 4K lecture uploads into encrypted multi-bitrate HLS streams protected by Widevine L1 & FairPlay, preventing screen recording in hardware.",
  },
  {
    step: 3,
    tag: "LEARNER PROGRESS",
    title: "Assessments & Live Classes",
    description:
      "Deploy auto-graded quizzes, live interactive WebRTC breakout classrooms, and attendance telemetry to track student engagement across cohorts.",
  },
];

export function AiSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  // Tab 1 (DRM Transcoding) multi-stage sequence:
  // 0: dropzone + file tile fly-in (A14)
  // 1: circular progress ring 0->100% (A15)
  // 2: encrypted & ready complete state (A16)
  const [tab1Stage, setTab1Stage] = useState<0 | 1 | 2>(0);
  const [transferProgress, setTransferProgress] = useState(0);
  const [isTileEntering, setIsTileEntering] = useState(false);

  // Run A14 -> A15 sequence when Tab 1 becomes active
  useEffect(() => {
    if (activeTab === 1) {
      setTab1Stage(0);
      setTransferProgress(0);
      setIsTileEntering(false);

      // A14: after 0.5s, video file tile slides in and dropzone turns lavender
      const t1 = setTimeout(() => {
        setIsTileEntering(true);
      }, 500);

      // Settle tile and advance to progress ring
      const t2 = setTimeout(() => {
        setTab1Stage(1);
      }, 1400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [activeTab]);

  // A15: Animate progress ring 0 -> 100%
  useEffect(() => {
    if (activeTab === 1 && tab1Stage === 1) {
      setTransferProgress(0);
      const interval = setInterval(() => {
        setTransferProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setTab1Stage(2), 300);
            return 100;
          }
          return prev + 4;
        });
      }, 65);
      return () => clearInterval(interval);
    }
  }, [activeTab, tab1Stage]);

  return (
    <section id="extension" className="py-24 sm:py-36 bg-white font-urbanist relative overflow-visible">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Numbered Rail + A13 Single Visible Step Viewport */}
          <div className="lg:col-span-5 flex items-center gap-6 sm:gap-8">
            {/* Vertical Progress Rail with Steps 1, 2, 3 */}
            <div className="relative flex flex-col items-center justify-between h-[280px] shrink-0">
              {/* Background Rail Track */}
              <div className="absolute top-3 bottom-3 w-0.5 bg-slate-200 -z-10" />
              {/* Active Purple Track */}
              <div
                className="absolute top-3 w-0.5 bg-[#7B5CF5] transition-all duration-500 ease-out -z-10"
                style={{
                  height: activeTab === 0 ? "0%" : activeTab === 1 ? "50%" : "100%",
                }}
              />

              {[0, 1, 2].map((idx) => {
                const isActive = activeTab === idx;
                const isPassed = activeTab >= idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx as 0 | 1 | 2)}
                    className={`size-8 sm:size-9 rounded-full flex items-center justify-center text-xs font-semibold font-mono transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#7B5CF5] text-white shadow-sm scale-110"
                        : isPassed
                        ? "bg-[#161616] text-white"
                        : "bg-white border border-slate-300 text-slate-400 hover:text-slate-800"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* A13: Single Visible Step Viewport (overflow: hidden, translates vertically on tab change) */}
            <div className="overflow-hidden h-[300px] sm:h-[320px] relative w-full flex flex-col justify-center">
              <motion.div
                animate={{ y: -activeTab * 320 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="flex flex-col"
              >
                {STEPS.map((s, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <motion.div
                      key={s.step}
                      animate={{ opacity: isActive ? 1 : 0.2 }}
                      transition={{ duration: 0.4 }}
                      className="h-[320px] flex flex-col justify-center space-y-3"
                    >
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5]">
                        <span>✦</span>
                        <span className="uppercase tracking-widest text-[10px]">{s.tag}</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold tracking-tight text-[#161616] leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed max-w-sm">
                        {s.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right Column: Studio Showcase Window */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-6">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#161616] text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-base sm:text-lg font-bold tracking-tight text-[#161616] block leading-tight">
                      LMS Domain Studio
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Curriculum & Security Engine</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-purple-50 text-[#7B5CF5] text-[11px] font-semibold">
                  v2.4 Active
                </span>
              </div>

              {/* 3 Showcase Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab(0)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 0
                      ? "bg-white text-[#161616] shadow-2xs font-semibold"
                      : "text-[#6B6F76] hover:text-[#161616]"
                  }`}
                >
                  Course Creation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 1
                      ? "bg-white text-[#161616] shadow-2xs font-semibold"
                      : "text-[#6B6F76] hover:text-[#161616]"
                  }`}
                >
                  DRM Transcoding
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab(2)}
                  className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                    activeTab === 2
                      ? "bg-white text-[#161616] shadow-2xs font-semibold"
                      : "text-[#6B6F76] hover:text-[#161616]"
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
                      <h4 className="text-sm font-bold text-[#161616]">Domie AI Course Generator</h4>
                      <p className="text-xs text-[#6B6F76] mt-0.5">Generate multi-module curricula from lecture prompts.</p>
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
                            className="px-4 py-2.5 rounded-xl bg-[#161616] text-white text-xs font-semibold shadow-xs shrink-0 cursor-pointer"
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
                            <span className="size-2 rounded-full bg-[#7B5CF5] animate-pulse" />
                            <span className="font-semibold text-[#7B5CF5]">Module 2: High-Throughput Pipelines</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-medium">Synthesizing...</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#6B6F76]">
                    <span>10x Faster Course Authoring</span>
                    <span className="text-[#7B5CF5] font-semibold">Ready for Review</span>
                  </div>
                </div>
              )}

              {/* Tab 1: DRM Transcoding Sequence (A14 -> A15 -> A16) */}
              {activeTab === 1 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  {/* Stage 0: Dropzone + Flying Tile (A14) */}
                  {tab1Stage === 0 && (
                    <div
                      className={`relative rounded-2xl border-2 border-dashed p-8 flex flex-col items-center justify-center min-h-[260px] overflow-hidden transition-colors duration-300 ${
                        isTileEntering
                          ? "bg-[#EEE9FF] border-[#7B5CF5]/50"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="text-center space-y-2 z-10">
                        <div className="size-12 rounded-2xl bg-white border border-slate-200 mx-auto flex items-center justify-center text-slate-700 shadow-2xs">
                          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-bold text-[#161616]">Upload a lecture</h4>
                        <p className="text-xs text-[#6B6F76]">Drag a video here or choose from your device</p>
                      </div>

                      {/* Flying Video File Tile */}
                      {isTileEntering && (
                        <motion.div
                          initial={{ x: 200, opacity: 0, rotate: 6 }}
                          animate={{ x: 0, opacity: 1, rotate: 0 }}
                          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                          className="absolute z-20 px-4 py-2.5 rounded-xl bg-white border border-purple-200 shadow-lg flex items-center gap-2.5 text-xs font-semibold text-[#161616]"
                        >
                          <span className="size-2 rounded-full bg-[#7B5CF5]" />
                          <span>Lecture_04.mp4</span>
                          <span className="text-[10px] text-slate-400 font-mono">1.2 GB</span>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Stage 1: Circular Progress Ring on Pure White (A15) */}
                  {tab1Stage === 1 && (
                    <div className="relative rounded-2xl bg-white p-8 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                      <div className="relative size-32 sm:size-36 flex items-center justify-center">
                        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                          {/* Background Track per spec: #F1F1F4 */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            stroke="#F1F1F4"
                            strokeWidth="10"
                            fill="none"
                          />
                          {/* Animated Ring per spec: #7B5CF5 */}
                          <circle
                            cx="50"
                            cy="50"
                            r="38"
                            stroke="#7B5CF5"
                            strokeWidth="10"
                            strokeDasharray={238.76}
                            strokeDashoffset={238.76 * (1 - transferProgress / 100)}
                            strokeLinecap="round"
                            fill="none"
                            className="transition-all duration-75 ease-out"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-2xl font-bold font-mono text-[#161616]">
                            {transferProgress}%
                          </span>
                          <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                            Transcoding
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 2: Encrypted & Ready Complete State (A16) */}
                  {tab1Stage === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col items-center justify-center min-h-[260px] space-y-4"
                    >
                      <div className="size-16 rounded-2xl bg-[#7B5CF5] text-white flex items-center justify-center shadow-md">
                        <svg className="size-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                        </svg>
                      </div>

                      <div className="text-center space-y-1">
                        <h4 className="text-base font-bold text-[#161616]">Encrypted & ready</h4>
                        <p className="text-xs text-[#6B6F76]">Widevine L1 + FairPlay hardware keys registered.</p>
                      </div>

                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 truncate">
                          https://academy.yourbrand.com/courses/cloud-arch/lecture-04
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setTab1Stage(0);
                            setIsTileEntering(false);
                            setTimeout(() => setIsTileEntering(true), 300);
                            setTimeout(() => setTab1Stage(1), 1200);
                          }}
                          className="px-4 py-2 rounded-xl bg-[#161616] hover:bg-black text-white text-xs font-semibold shrink-0 cursor-pointer"
                        >
                          Upload another
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Metadata Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">VIDEO ASSET</span>
                      <span className="font-semibold text-slate-800">Lecture_04.mp4</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">HARDWARE SHIELD</span>
                      <span className="font-mono text-emerald-600 font-semibold">Widevine L1 Active</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Live & Analytics (A17 Light Panel + 3D Scale-up) */}
              {activeTab === 2 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  <div className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col items-center justify-center min-h-[260px] space-y-4">
                    {/* A17: 3D Illustration scaling 0.4 -> 1.0 */}
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="size-28 sm:size-32 relative flex items-center justify-center"
                    >
                      <svg viewBox="0 0 120 120" className="size-full drop-shadow-md">
                        {/* 3D Classroom Gear / Hub */}
                        <circle cx="60" cy="60" r="42" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="2" />
                        <path d="M40 70 L60 35 L80 70 Z" fill="#7B5CF5" />
                        <circle cx="60" cy="65" r="16" fill="#161616" />
                        <circle cx="85" cy="45" r="10" fill="#38BDF8" />
                      </svg>
                    </motion.div>

                    <div className="text-center space-y-1">
                      <h4 className="text-base font-bold text-[#161616]">Your class is one click away.</h4>
                      <p className="text-xs text-[#6B6F76]">Instant low-latency WebRTC lecture with attendance telemetry.</p>
                    </div>

                    <div className="w-full flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        readOnly
                        value="CLASS-8491"
                        className="w-36 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 text-center uppercase tracking-wider"
                      />
                      <button
                        type="button"
                        className="flex-1 px-4 py-2 rounded-xl bg-[#161616] hover:bg-black text-white text-xs font-semibold cursor-pointer transition-all"
                      >
                        Start live class
                      </button>
                    </div>
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