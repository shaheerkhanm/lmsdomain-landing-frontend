"use client";

import React, { useState, useEffect } from "react";

export function AiSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [transferProgress, setTransferProgress] = useState(7);
  const [isTransferComplete, setIsTransferComplete] = useState(false);

  // Animate the circular progress ring when Tab 1 (Transfer Files) is active
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

            {/* Step 1: Remote Control */}
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
                  <span className="uppercase tracking-widest text-[10px]">EXTENSION</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 0 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Empower Your Devices
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Effortlessly manage and operate your devices from anywhere, empowering you to take charge with ease and efficiency, no matter the distance.
                </p>
              </div>
            </div>

            {/* Step 2: Transfer Files */}
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
                  <span className="uppercase tracking-widest text-[10px]">EXTENSION</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 1 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Effortless File Transfers
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  With lightning-fast speeds and seamless integration, effortlessly transfer files between devices, empowering you to collaborate, share, and access your important documents with ease.
                </p>
              </div>
            </div>

            {/* Step 3: Collaborate Anywhere */}
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
                  <span className="uppercase tracking-widest text-[10px]">EXTENSION</span>
                </div>
                <h3
                  className={`text-2xl sm:text-4xl font-semibold tracking-tight transition-colors ${
                    activeTab === 2 ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Collaborate Anywhere
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                  Connect and brainstorm with teams in real-time interactive workspaces with zero latency WebRTC video and attendance logging.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Extension Popup Widget (Mota 00:15 - 00:23 Exact Style) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="rounded-[32px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 space-y-6">
              {/* App Brand Header */}
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#18191B] text-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <path d="M9 9h6v6H9z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">mota</span>
              </div>

              {/* 3 Extension Tabs (Mota 00:15 Exact Style) */}
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
                  Remote Control
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
                  Transfer Files
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
                  Start Meeting
                </button>
              </div>

              {/* Tab 0: Remote Control */}
              {activeTab === 0 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Allow remote control</h4>
                      <p className="text-xs text-slate-500 mt-0.5">To share access with your device to someone.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">YOUR ID</span>
                        <div className="mt-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-800">
                          <span>883 992 234</span>
                          <svg className="size-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">PASSWORD</span>
                        <div className="mt-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-mono text-slate-800">
                          <span>aakd2239djq</span>
                          <svg className="size-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Take the control</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Of someone&apos;s device remotely.</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">PARTNER ID</span>
                        <div className="mt-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter code"
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-black text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                          >
                            Submit
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-5 text-xs text-slate-700 pt-1">
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
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1: Transfer Files with Animated Circular Progress Ring (Mota 00:18 - 00:21 Exact Style) */}
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
                    /* Transfer Complete State (Mota 00:22 Exact Style) */
                    <div className="rounded-2xl bg-[#FAF9F6] border border-slate-200/80 p-6 flex flex-col items-center justify-center min-h-[260px] space-y-4">
                      {/* Big Blue Folder Icon */}
                      <div className="size-20 rounded-2xl bg-[#38BDF8] text-white flex items-center justify-center shadow-md">
                        <svg className="size-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                      </div>

                      <div className="text-center space-y-1">
                        <h4 className="text-base font-bold text-slate-900">Complete!</h4>
                        <p className="text-xs text-slate-500">Copy your link or look what&apos;s inside.</p>
                      </div>

                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 truncate">
                          https://lmsdomain.com/share/8892-dshfj2ww
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsTransferComplete(false);
                            setTransferProgress(7);
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-semibold shrink-0 cursor-pointer hover:bg-black"
                        >
                          Send another?
                        </button>
                      </div>
                    </div>
                  )}

                  {/* File Metadata Row & Cancel Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">TITLE</span>
                      <span className="font-semibold text-slate-800">Mockups</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">SIZE</span>
                      <span className="font-mono text-slate-800">133.6Mb</span>
                    </div>

                    {!isTransferComplete && (
                      <button
                        type="button"
                        onClick={() => {
                          setTransferProgress(7);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Start Meeting (Mota 00:23 Style) */}
              {activeTab === 2 && (
                <div className="space-y-6 pt-2 animate-in fade-in duration-200">
                  <div className="aspect-16/10 rounded-2xl bg-slate-950 p-5 flex flex-col justify-between text-white border border-slate-800 relative overflow-hidden">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        Room Ready
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">1080p60 WebRTC</span>
                    </div>

                    <div className="text-center py-4">
                      <div className="size-12 rounded-full bg-white/10 mx-auto flex items-center justify-center text-xl mb-2">
                        📹
                      </div>
                      <h5 className="font-bold text-sm">Interactive Live Classroom</h5>
                      <p className="text-xs text-slate-400 mt-1">Multi-instructor live video with attendance telemetry</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2">
                      <span>AES-128 Encrypted Stream</span>
                      <span className="text-emerald-400 font-mono">Zero Lag</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">Instant Meeting Link</span>
                      <span className="text-slate-500 font-mono text-[11px]">https://lmsdomain.com/live/class-84</span>
                    </div>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                    >
                      Launch Room
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