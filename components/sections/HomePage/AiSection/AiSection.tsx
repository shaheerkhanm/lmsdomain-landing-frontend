"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { aiSectionContent } from "@/content/home/ai";

export function AiSection() {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2 | 3>(0);
  const [typedChars, setTypedChars] = useState(0);

  // Simulated typing effect for tutor response when Tab 0 is active
  const tutorFullResponse =
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and instructor review.";

  useEffect(() => {
    if (activeTab === 0) {
      setTypedChars(0);
      const interval = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= tutorFullResponse.length) {
            clearInterval(interval);
            return tutorFullResponse.length;
          }
          return prev + 3;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const currentTab = aiSectionContent.tabs[activeTab];

  return (
    <section
      id="extension"
      className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 bg-white font-urbanist relative overflow-visible"
    >
      <div
        id="ai-studio"
        className="max-w-7xl mx-auto rounded-[36px] sm:rounded-[48px] lg:rounded-[56px] bg-[#161616] text-white py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-14 relative overflow-hidden shadow-2xl border border-white/5"
      >
        {/* Soft Accent Glow behind Window */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[480px] lg:w-[600px] h-[480px] lg:h-[600px] bg-[#7B5CF5]/15 rounded-full blur-[130px] pointer-events-none -z-0"
          aria-hidden="true"
        />

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#C9CCD1] text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="text-[#7B5CF5]">✦</span>
            <span>{aiSectionContent.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight">
            {aiSectionContent.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#C9CCD1] max-w-2xl leading-relaxed">
            {aiSectionContent.subtitle}
          </p>
        </div>

        {/* Mobile Horizontal Tabs Row (<1024px, no pin) */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 pb-6 relative z-10">
          {aiSectionContent.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx as 0 | 1 | 2 | 3)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#7B5CF5] text-white shadow-md font-bold"
                    : "bg-white/10 text-[#C9CCD1] hover:bg-white/15 hover:text-white"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Desktop Rail + Viewport (Left) & Animated Window (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column: Numbered Rail + A13 Viewport (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 items-center gap-6 sm:gap-8">
            {/* Vertical Progress Rail with 4 Steps */}
            <div className="relative flex flex-col items-center justify-between h-[340px] w-7 shrink-0">
              {/* Background Rail Track */}
              <div className="absolute top-3 bottom-3 w-0.5 bg-white/10 -z-10" />
              {/* Active Purple Track */}
              <div
                className="absolute top-3 w-0.5 bg-[#7B5CF5] transition-all duration-500 ease-out -z-10"
                style={{
                  height: `${(activeTab / 3) * 100}%`,
                }}
              />

              {[0, 1, 2, 3].map((idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx as 0 | 1 | 2 | 3)}
                    className={`size-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#7B5CF5] text-white font-bold scale-110 shadow-lg shadow-[#7B5CF5]/40"
                        : "bg-white/10 text-white/40 hover:text-white hover:bg-white/20"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* A13: Single Visible Step Viewport */}
            <div className="overflow-hidden h-[340px] relative w-full flex items-center">
              <motion.div
                animate={{ y: -activeTab * 340 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="flex flex-col w-full"
              >
                {aiSectionContent.tabs.map((tab, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <motion.div
                      key={tab.id}
                      animate={{ opacity: isActive ? 1 : 0.2 }}
                      transition={{ duration: 0.4 }}
                      className="h-[340px] flex flex-col justify-center space-y-3.5 pr-4"
                    >
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5]">
                        <span>✦</span>
                        <span className="uppercase tracking-widest text-[11px] font-bold">
                          {tab.tag}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-white leading-snug">
                        {tab.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#C9CCD1] leading-relaxed max-w-md">
                        {tab.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Right Column: Animated Interactive Studio Window */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] sm:rounded-[36px] bg-[#1E1F23] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-5 sm:p-7 lg:p-8 space-y-6">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#7B5CF5] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    AI
                  </div>
                  <div>
                    <span className="text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
                      LMS Domain AI Studio
                    </span>
                    <span className="text-[11px] text-[#C9CCD1]/70 font-mono">
                      {currentTab.title}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#7B5CF5]/20 text-[#C9CCD1] text-[11px] font-semibold border border-[#7B5CF5]/30">
                  Premium Add-On
                </span>
              </div>

              {/* 4 Tool Switcher Tabs inside Window */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-white/5 p-1 rounded-2xl text-xs font-medium border border-white/5">
                {aiSectionContent.tabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(idx as 0 | 1 | 2 | 3)}
                    className={`py-2 px-2 rounded-xl transition-all cursor-pointer text-center truncate ${
                      activeTab === idx
                        ? "bg-[#7B5CF5] text-white shadow-sm font-semibold"
                        : "text-[#C9CCD1] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.title.replace("AI ", "")}
                  </button>
                ))}
              </div>

              {/* Window Content: 4 Distinct AI Tool Views */}
              <div className="min-h-[290px] flex flex-col justify-center">
                {/* 1. HelpDesk AI tutor */}
                {activeTab === 0 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-white/10 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white">
                        <p className="font-medium">
                          What&apos;s the difference between a quiz and an assignment?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="size-8 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                        AI
                      </div>
                      <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-white/5 border border-white/10 p-4 text-xs sm:text-sm text-[#C9CCD1] space-y-2.5">
                        <p className="leading-relaxed">
                          {tutorFullResponse.slice(0, typedChars)}
                          {typedChars < tutorFullResponse.length && (
                            <span className="inline-block w-1.5 h-3.5 bg-[#7B5CF5] ml-1 animate-pulse align-middle" />
                          )}
                        </p>

                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7B5CF5]/20 border border-[#7B5CF5]/30 text-[#A78BFA] text-[11px] font-semibold">
                            <span>✦</span>
                            From your course: Module 2
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#C9CCD1]/70">
                      <span>Course History Saved</span>
                      <span className="text-[#A78BFA] font-medium">Context-Aware AI Tutor</span>
                    </div>
                  </div>
                )}

                {/* 2. Domie AI content generator */}
                {activeTab === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          DRAFTED COURSE TITLE
                        </span>
                        <p className="text-sm font-bold text-white">
                          Python Basics for Beginners
                        </p>
                        <p className="text-xs text-[#C9CCD1] leading-relaxed">
                          Build programming fundamentals, write real scripts, and automate daily tasks with Python.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider block">
                          3 LEARNING OUTCOMES
                        </span>
                        <ul className="text-xs text-[#C9CCD1] space-y-1.5 leading-snug">
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Write and execute clean Python syntax and functions</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Manipulate data structures, files, and external APIs</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>Construct practical automation scripts from scratch</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-[#C9CCD1]/70">
                        Draft titles, descriptions & outcomes
                      </span>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl bg-[#7B5CF5] hover:bg-[#6D4AE8] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        Edit & Publish
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. AI prescriptive analytics */}
                {activeTab === 2 && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    {/* 3 Alert Rows */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-white">
                        <span className="size-2 rounded-full bg-amber-400" />
                        <span className="font-medium">Enrolments falling in Python Basics</span>
                      </div>
                      <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                        Attention
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-white">
                        <span className="size-2 rounded-full bg-[#7B5CF5]" />
                        <span className="font-medium">2 coupons expire this week</span>
                      </div>
                      <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                        Action
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 text-white">
                        <span className="size-2 rounded-full bg-rose-400" />
                        <span className="font-medium">Low engagement in Module 4</span>
                      </div>
                      <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded">
                        Drop-off
                      </span>
                    </div>

                    {/* Summary Card */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#A78BFA]">
                        <span>✦</span>
                        <span>Prescriptive Recommendation</span>
                      </div>
                      <p className="text-xs text-[#C9CCD1] leading-relaxed">
                        Review Module 4 checkpoint tasks and launch a reminder email for expiring promotions.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#C9CCD1]/70">
                      <span>Continuous Academy Monitoring</span>
                      <span className="text-amber-400 font-medium">3 Suggested Actions</span>
                    </div>
                  </div>
                )}

                {/* 4. AI command bar */}
                {activeTab === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Search Field */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-xs text-white">
                      <svg className="size-4 text-[#A78BFA] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-medium text-white truncate">Search or ask anything…</span>
                      <span className="ml-auto text-[10px] font-mono text-white/50 bg-white/10 border border-white/15 px-2 py-0.5 rounded">
                        ⌘K
                      </span>
                    </div>

                    {/* 3 Result Rows */}
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5 text-white">
                          <span className="text-sm">⚙️</span>
                          <span className="font-medium">Settings / Custom Domain & SSL</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#A78BFA] bg-purple-500/20 px-2 py-0.5 rounded">
                          Admin page
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5 text-white">
                          <span className="text-sm">📚</span>
                          <span className="font-medium">Python Basics for Beginners</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#A78BFA] bg-purple-500/20 px-2 py-0.5 rounded">
                          Course
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between text-xs transition-colors cursor-pointer">
                        <div className="flex items-center gap-2.5 text-white">
                          <span className="text-sm">💬</span>
                          <span className="font-medium">How do I schedule recurring live classes with Zoom?</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                          Platform question
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-[#C9CCD1]/70">
                      <span>One search box for admin and answers</span>
                      <span className="text-[#A78BFA] font-medium">Instant Universal Access</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiSection;