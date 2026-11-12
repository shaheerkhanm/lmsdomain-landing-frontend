"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/marketing/ui";
import { aiSectionContent } from "@/content/home/ai";
import { heroContent } from "@/content/home/hero";
import {
  Sparkles,
  Check,
  Send,
  Clock,
  AlertCircle,
  Search,
  Folder,
  Settings,
  CornerDownLeft,
  ArrowRight,
} from "lucide-react";

const AI_ICONS: Record<string, React.ReactNode> = {
  tutor: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]" aria-hidden="true">
      <path d="M4 5h12v8H8l-4 3z" />
    </svg>
  ),
  generator: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]" aria-hidden="true">
      <path d="M10 2.5l1.8 4.2 4.2 1.8-4.2 1.8L10 14.5l-1.8-4.2L4 8.5l4.2-1.8z" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]" aria-hidden="true">
      <path d="M3 16h14M5 13l3-4 3 2 4-6" />
    </svg>
  ),
  command_bar: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]" aria-hidden="true">
      <circle cx="9" cy="9" r="5" />
      <path d="m13 13 4 4" />
    </svg>
  ),
};

const TOOL_CHIPS: Record<string, [string, string]> = {
  tutor: ["From your course content", "Saved to course history"],
  generator: ["Draft ready to edit", "You review before publishing"],
  analytics: ["3 things need attention", "Daily summary"],
  command_bar: ["Every admin page", "⌘K"],
};

const TOOL_BULLETS: Record<string, string[]> = {
  tutor: [
    "Grounded in your published course materials",
    "Supports learners 24/7 when instructors are offline",
    "Answers repetitive syllabus questions automatically",
  ],
  generator: [
    "Drafts course titles, descriptions, and learning outcomes",
    "Helps instructors prepare curriculum modules faster",
    "Full instructor review control before publishing",
  ],
  analytics: [
    "Surfaces proactive administrative alerts",
    "Highlights learners before they fall behind in their batch",
    "Daily morning summary of academy activity and schedules",
  ],
  command_bar: [
    "One search box for every admin page & setting",
    "Quick keyboard shortcuts to jump to tools instantly",
    "Instant answers to questions about the platform",
  ],
};

/**
 * ScaledUiContainer: scales down inner UIs smoothly on smaller containers
 * to ensure text never wraps unexpectedly or triggers horizontal scroll.
 */
function ScaledUiContainer({
  baseWidth,
  children,
  className = "",
}: {
  baseWidth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && contentRef.current) {
        const clientW = containerRef.current.clientWidth;
        if (clientW > 0) {
          const s = Math.min(1, clientW / baseWidth);
          setScale(s);
          setHeight(contentRef.current.offsetHeight * s);
        }
      }
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: height !== undefined ? `${height}px` : "auto" }}
    >
      <div
        ref={contentRef}
        style={{
          width: `${baseWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function DomieAiBand() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHelpdeskAnswer, setShowHelpdeskAnswer] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const currentTab = aiSectionContent.tabs[activeTab] || aiSectionContent.tabs[0];
  const chips = TOOL_CHIPS[currentTab.id] || TOOL_CHIPS.tutor;
  const bullets = TOOL_BULLETS[currentTab.id] || TOOL_BULLETS.tutor;

  const aiTutorCard = heroContent.cards?.find((c) => c.type === "ai_tutor");
  const question =
    aiTutorCard?.question || "What's the difference between a quiz and an assignment?";
  const answer =
    aiTutorCard?.answer ||
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor review.";

  // Scroll-linked page background fade: #FAFAFA -> #0E0E11 -> #FAFAFA
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pageRoot = document.getElementById("home-page-root");
    const el = sectionRef.current;
    if (!el || !pageRoot || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          pageRoot.setAttribute("data-ai-dark", "true");
        } else {
          pageRoot.setAttribute("data-ai-dark", "false");
        }
      },
      {
        rootMargin: "0px 0px -40% 0px",
        threshold: [0, 0.1, 0.4, 0.8],
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      pageRoot.setAttribute("data-ai-dark", "false");
    };
  }, []);

  // Detect fine pointer for cursor spotlight
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsFinePointer(hasFinePointer && !prefersReducedMotion);
  }, []);

  // Pointer spotlight rAF-throttled
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!isFinePointer || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
        sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
      }
    });
  }, [isFinePointer]);

  // Typing indicator -> show answer in HelpDesk after entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpdeskAnswer(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Auto-advance tools every 5s with progress bar
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const next = (prev + 1) % aiSectionContent.tabs.length;
        setProgressKey((k) => k + 1);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, progressKey]);

  // Keyboard navigation for ARIA tabs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const total = aiSectionContent.tabs.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab((prev) => {
        const next = (prev + 1) % total;
        setProgressKey((k) => k + 1);
        return next;
      });
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab((prev) => {
        const next = (prev - 1 + total) % total;
        setProgressKey((k) => k + 1);
        return next;
      });
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(0);
      setProgressKey((k) => k + 1);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(total - 1);
      setProgressKey((k) => k + 1);
    }
  };

  const handleSelectTab = (idx: number) => {
    setActiveTab(idx);
    setProgressKey((k) => k + 1);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="py-[clamp(72px,9vw,128px)] bg-[#0E0E11] text-white relative overflow-hidden isolate font-sans"
      id="ai"
    >
      {/* 1a. Pre-Section Rising Soft Violet Glow (240px, radial, rgba(139,108,255,.35)) */}
      <div
        className="pointer-events-none absolute -top-[120px] left-1/2 -translate-x-1/2 w-[min(1100px,100%)] h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(139,108,255,0.35)_0%,transparent_70%)] -z-10"
        aria-hidden="true"
      />

      {/* 2e. Desktop Pointer Spotlight (600px very soft radial glow following cursor) */}
      {isFinePointer && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(108,75,255,0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Violet/Pink Bottom Glow */}
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[300px] -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(closest-side,rgba(123,92,255,0.55),rgba(226,83,155,0.3)_50%,transparent)] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1080px] mx-auto px-5">
        {/* Left-Aligned Header with 2c Domie Presence */}
        <div>
          {/* Mobile Domie Avatar (above eyebrow) */}
          <div className="block md:hidden mb-3.5">
            <div className="w-[48px] h-[48px] rounded-full bg-[#1F1934] p-1 shadow-[0_0_20px_rgba(108,75,255,0.45)] relative inline-block">
              <Image
                src="/images/ai/domie/domie-bot-sm.webp"
                alt="Domie AI"
                width={48}
                height={48}
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 bg-white/8 border border-white/14 rounded-full px-2.5 py-1 text-xs text-[#D9D3FF] mb-4">
            ✦ Pro plan
          </span>
          <br />
          <Eyebrow tone="gradient">Domie AI</Eyebrow>

          {/* Heading + Desktop Floating Domie Avatar with bob and sparkles */}
          <div className="flex items-center gap-4 mt-1">
            <h2 className="type-h2-v4 text-white">
              {aiSectionContent.title}
            </h2>

            {/* Desktop Domie Bobbing Avatar with Twinkling Sparkles */}
            <div
              className="hidden md:inline-flex items-center relative animate-domie-bob shrink-0 ml-1 select-none"
              aria-hidden="true"
            >
              <div className="w-[56px] h-[56px] rounded-full bg-[#1F1934] p-1 shadow-[0_0_24px_rgba(108,75,255,0.5)] relative overflow-hidden">
                <Image
                  src="/images/ai/domie/domie-bot-sm.webp"
                  alt="Domie AI"
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Sparkle 1 */}
              <Sparkles className="absolute -top-1.5 -right-2 w-4 h-4 text-[#A48BFF] animate-pulse" />
              {/* Sparkle 2 */}
              <Sparkles className="absolute -bottom-1 -left-2 w-3.5 h-3.5 text-[#E2539B] animate-pulse [animation-delay:0.7s]" />
              {/* Sparkle 3 */}
              <span className="absolute top-2 -right-3 w-1.5 h-1.5 rounded-full bg-[#D9D3FF] animate-ping [animation-delay:1.4s]" />
            </div>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#A9A9B6] leading-[1.55] max-w-[62ch] mt-3">
            {aiSectionContent.subtitle}
          </p>
        </div>

        {/* Mobile Tabs: 2x2 Compact Buttons (< 768px) */}
        <div className="grid grid-cols-2 gap-2 mt-8 md:hidden" role="tablist" aria-label="Domie AI Tools Mobile">
          {aiSectionContent.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`mobile-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`domie-panel-${tab.id}`}
                onClick={() => handleSelectTab(idx)}
                className={`flex items-center gap-2 p-2.5 px-3 rounded-[12px] text-[13px] font-medium border text-left transition-all ${
                  isActive
                    ? "bg-[#6C4BFF]/20 border-[#A08CFF]/50 text-white shadow-[0_0_16px_rgba(108,75,255,0.3)]"
                    : "bg-white/4 border-white/10 text-[#A9A9B6]"
                }`}
              >
                <span className="text-[#C9BEFF] shrink-0">
                  {AI_ICONS[tab.id] ?? <Sparkles className="w-4 h-4" />}
                </span>
                <span className="truncate">{tab.shortLabel || tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop & Mobile Main Stage: 2-Column on Desktop (1.15fr / 1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 mt-8 md:mt-11 items-start">
          {/* LEFT: 2b Living Window with Rotating Conic Border & 2d Context Chips */}
          <div className="relative group">
            {/* 2d Context Chips (Float half outside window, never cover text) */}
            <div
              className="absolute -top-3.5 right-6 z-20 bg-[#1C1C24]/90 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 text-[11.5px] text-[#D9D3FF] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center gap-1.5 select-none pointer-events-none transition-all duration-300"
              aria-hidden="true"
            >
              <Sparkles className="w-3 h-3 text-[#A48BFF]" />
              <span>{chips[0]}</span>
            </div>

            <div
              className="absolute -bottom-3.5 left-6 z-20 bg-[#1C1C24]/90 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 text-[11.5px] text-[#D9D3FF] shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center gap-1.5 select-none pointer-events-none transition-all duration-300"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
              <span>{chips[1]}</span>
            </div>

            {/* 2b Living Window Outer Wrapper with rotating conic border */}
            <div className="relative p-[1.5px] rounded-[20px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(108,75,255,0.35)]">
              {/* Rotating conic gradient border */}
              <div
                className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#7B5CFF,#E2539B,transparent_65%,#7B5CFF)] animate-spin-slow -z-10"
                aria-hidden="true"
              />

              {/* Inner Window Box: #16161B */}
              <div
                id={`domie-panel-${currentTab.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${currentTab.id}`}
                className="bg-[#16161B] rounded-[18.5px] overflow-hidden min-h-[420px] flex flex-col justify-between"
              >
                {/* TOOL 0: HelpDesk AI Tutor UI */}
                {activeTab === 0 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-250 flex flex-col h-full justify-between">
                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-3.5 px-4.5 border-b border-white/8 bg-white/[0.01]">
                      <span className="w-8 h-8 rounded-full bg-[#2A2440] overflow-hidden shrink-0 relative block">
                        <Image
                          src="/images/ai/domie/domie-bot-sm.webp"
                          alt="Domie"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <div>
                        <b className="block text-[13.5px] text-white">Domie · HelpDesk</b>
                        <small className="text-[#A9A9B6] text-xs">
                          Full-Stack Web Engineering
                        </small>
                      </div>
                      <span className="ml-auto text-[11.5px] text-[#7EE2B8] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
                        Online
                      </span>
                    </div>

                    {/* Chat Body with Saved Chats column + Messages */}
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3.5">
                      {/* Saved Chats Stack */}
                      <div className="hidden sm:flex flex-col gap-2 border-r border-white/8 pr-3">
                        <span className="text-[10px] uppercase tracking-wider text-[#A9A9B6] font-medium px-1">
                          Saved Chats
                        </span>
                        <div className="p-2 rounded-[8px] bg-white/[0.02] border border-white/[0.04] opacity-40">
                          <b className="block text-[11px] text-white truncate">React & Node</b>
                          <small className="text-[9.5px] text-[#A9A9B6]">12 questions</small>
                        </div>
                        <div className="p-2 rounded-[8px] bg-[#6C4BFF]/15 border border-[#6C4BFF]/40 shadow-[0_0_12px_rgba(108,75,255,0.2)]">
                          <div className="flex items-center justify-between">
                            <b className="block text-[11px] text-white font-semibold truncate">
                              Full-Stack
                            </b>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
                          </div>
                          <small className="text-[9.5px] text-[#D9D3FF]">34 questions</small>
                        </div>
                        <div className="p-2 rounded-[8px] bg-white/[0.02] border border-white/[0.04] opacity-40">
                          <b className="block text-[11px] text-white truncate">UI/UX Design</b>
                          <small className="text-[9.5px] text-[#A9A9B6]">8 questions</small>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex flex-col gap-3 min-h-[240px] justify-center">
                        {/* Question */}
                        <div className="max-w-[90%] text-[13px] p-3 px-3.5 rounded-[14px] bg-[#262436] text-[#ECEAF8] self-end rounded-br-[3px] leading-relaxed">
                          {question}
                        </div>

                        {/* Typing Indicator -> Answer */}
                        {!showHelpdeskAnswer ? (
                          <div className="self-start flex items-center gap-1 bg-white/8 p-2.5 px-3.5 rounded-[14px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.3s]" />
                          </div>
                        ) : (
                          <div className="max-w-[92%] text-[13px] p-3 px-3.5 rounded-[14px] bg-white/8 text-[#ECECF1] self-start rounded-bl-[3px] leading-relaxed animate-in fade-in duration-300">
                            {answer}
                            <span className="block mt-2 text-[10.5px] text-[#A9A9B6] bg-white/8 px-2 py-0.5 rounded-[4px] w-fit">
                              From your course content
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Input Bar */}
                    <div className="m-3.5 mt-0 border border-white/12 rounded-[12px] p-2.5 px-3.5 text-[13px] text-[#A9A9B6] flex justify-between items-center select-none bg-black/20">
                      <span>Ask about this course…</span>
                      <Send className="w-4 h-4 text-[#A9A9B6]" />
                    </div>
                  </div>
                )}

                {/* TOOL 1: Domie AI Content Generator UI */}
                {activeTab === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-250 p-5 flex flex-col justify-between h-full">
                    {/* Header with animated underline sweep */}
                    <div>
                      <div className="flex items-center gap-2 text-[12.5px] text-[#D9D3FF] font-medium mb-1.5">
                        <Sparkles className="w-4 h-4 text-[#A48BFF]" />
                        <span>Generating course details…</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#8B6CFF] to-transparent animate-pulse-flow" />
                      </div>
                    </div>

                    {/* Form Fields filling in */}
                    <div className="space-y-3 my-4">
                      {/* Field 1 */}
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-3">
                        <span className="block text-[10.5px] uppercase text-[#A9A9B6] font-medium mb-1">
                          Course Title
                        </span>
                        <b className="block text-[13px] text-white font-medium">
                          Full-Stack Web Engineering Bootcamp
                        </b>
                      </div>

                      {/* Field 2 */}
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-3">
                        <span className="block text-[10.5px] uppercase text-[#A9A9B6] font-medium mb-1">
                          Description
                        </span>
                        <p className="text-[12.5px] text-[#ECECF1] leading-relaxed">
                          Master modern web architectures, API design, and deployment pipelines.
                        </p>
                      </div>

                      {/* Field 3 */}
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-3">
                        <span className="block text-[10.5px] uppercase text-[#A9A9B6] font-medium mb-1">
                          Learning Outcomes
                        </span>
                        <p className="text-[12px] text-[#C5C5D2] leading-relaxed">
                          • Build production React & Node apps <br />• Deploy containerized services with CI/CD
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2.5 pt-1 border-t border-white/8">
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-[8px] border border-white/[0.14] text-[12px] text-[#C9BEFF] hover:bg-white/[0.04]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-3.5 py-1.5 rounded-[8px] bg-[#6C4BFF] hover:bg-[#7B5CFF] text-[12px] text-white font-medium shadow-[0_2px_10px_rgba(108,75,255,0.4)]"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                )}

                {/* TOOL 2: AI Prescriptive Analytics UI */}
                {activeTab === 2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-250 p-5 flex flex-col justify-between h-full">
                    {/* Top KPI Numbers */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-3">
                        <small className="text-[10.5px] uppercase text-[#A9A9B6] block">
                          Enrolments
                        </small>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <b className="text-[16px] font-bold text-white">1,342</b>
                          <span className="text-[10.5px] text-[#3DD68C] font-semibold">▲ 34%</span>
                        </div>
                      </div>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-3">
                        <small className="text-[10.5px] uppercase text-[#A9A9B6] block">Revenue</small>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <b className="text-[16px] font-bold text-white">₹4.86L</b>
                          <span className="text-[10.5px] text-[#3DD68C] font-semibold">▲ 31%</span>
                        </div>
                      </div>
                    </div>

                    {/* Dark Bar Chart with 10 Violet Bars + Glowing Pill */}
                    <div className="relative bg-[#141418] border border-white/[0.06] rounded-[10px] p-3 pt-7 pb-2 mb-3">
                      <span className="absolute top-1.5 right-2 inline-flex items-center gap-1 bg-[#6C4BFF]/25 border border-[#8B6CFF]/50 text-[#D9D3FF] text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(108,75,255,0.4)]">
                        <Sparkles className="w-2.5 h-2.5 text-[#A48BFF]" />
                        Domie suggests
                      </span>
                      <div className="flex items-end justify-between h-[75px] gap-2 px-1">
                        {[32, 40, 48, 45, 60, 56, 72, 68, 80, 92].map((height, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${height}%` }}
                            className={`w-full rounded-t-[3px] transition-all duration-500 ${
                              idx === 9
                                ? "bg-gradient-to-t from-[#6C4BFF] to-[#A48BFF] shadow-[0_0_8px_rgba(108,75,255,0.5)]"
                                : "bg-gradient-to-t from-[#2F294D] to-[#513AA6]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 2 Proactive Flag Rows */}
                    <div className="space-y-2">
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2.5 px-3 flex items-center justify-between text-[11.5px] text-[#ECECF1]">
                        <span className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Coupon WELCOME10 expires Friday
                        </span>
                        <span className="text-[10px] text-[#A48BFF] bg-[#6C4BFF]/15 px-2 py-0.5 rounded">
                          Review
                        </span>
                      </div>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2.5 px-3 flex items-center justify-between text-[11.5px] text-[#ECECF1]">
                        <span className="flex items-center gap-2">
                          <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                          Frontend React progress below 40%
                        </span>
                        <span className="text-[10px] text-[#A48BFF] bg-[#6C4BFF]/15 px-2 py-0.5 rounded">
                          Nudge batch
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TOOL 3: AI Command Bar UI */}
                {activeTab === 3 && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-250 p-5 flex flex-col justify-between h-full">
                    {/* ⌘K Search Input */}
                    <div className="bg-[#141418] border border-white/[0.1] rounded-[10px] p-2.5 px-3 flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#A9A9B6]" />
                        <span className="text-[13px] text-white font-medium">refund policy</span>
                        <span className="w-[1.5px] h-4 bg-[#6C4BFF] animate-pulse" />
                      </div>
                      <span className="text-[10.5px] text-[#A9A9B6] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded">
                        esc
                      </span>
                    </div>

                    {/* Group 1: Admin Pages */}
                    <div className="mb-3">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#A9A9B6] font-medium px-1 block mb-1.5">
                        Admin Pages
                      </span>
                      <div className="space-y-1.5">
                        <div className="bg-[#262436] border border-[#6C4BFF]/30 rounded-[8px] p-2 px-3 flex items-center justify-between text-[12.5px] text-white">
                          <span className="flex items-center gap-2">
                            <Folder className="w-3.5 h-3.5 text-[#A48BFF]" />
                            <span>Payments › Refunds</span>
                          </span>
                          <span className="text-[10.5px] text-[#A48BFF] flex items-center gap-1">
                            <CornerDownLeft className="w-3 h-3" /> Jump
                          </span>
                        </div>
                        <div className="bg-transparent rounded-[8px] p-2 px-3 flex items-center justify-between text-[12.5px] text-[#A9A9B6]">
                          <span className="flex items-center gap-2">
                            <Settings className="w-3.5 h-3.5 text-[#A9A9B6]" />
                            <span>Settings › Policies › Terms & Policies</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Group 2: Neutral Navigation Answer (Part 4a fix) */}
                    <div className="pt-2 border-t border-white/[0.06] mb-3">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#A9A9B6] font-medium px-1 block mb-1.5">
                        Answer
                      </span>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2.5 px-3 text-[12px] text-[#ECECF1] flex items-start gap-2 leading-relaxed">
                        <Sparkles className="w-3.5 h-3.5 text-[#A48BFF] mt-0.5 shrink-0" />
                        <span>
                          Refund requests are under Payments › Refunds, where you can review and approve them.
                        </span>
                      </div>
                    </div>

                    {/* Keyboard Hints */}
                    <div className="flex items-center gap-4 text-[11px] text-[#A9A9B6] pt-1 px-1 border-t border-white/6">
                      <span>↵ Select</span>
                      <span>↑↓ Navigate</span>
                      <span>esc Close</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Desktop 4 Tool Cards with ARIA Tabs + Progress Line */}
          <div className="flex flex-col gap-6">
            <div
              role="tablist"
              aria-label="Domie AI Tools"
              className="grid gap-2.5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onKeyDown={handleKeyDown}
            >
              {aiSectionContent.tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`domie-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectTab(idx)}
                    className={`relative border rounded-[14px] p-4 px-4.5 grid grid-cols-[34px_1fr] gap-3.5 transition-all duration-300 cursor-pointer text-left overflow-hidden ${
                      isActive
                        ? "bg-[#6C4BFF]/12 border-[#A08CFF]/45 shadow-[0_0_24px_rgba(108,75,255,0.18)]"
                        : "bg-white/3 border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <span className="w-[34px] h-[34px] rounded-[10px] bg-white/8 flex items-center justify-center text-[#C9BEFF] shrink-0">
                      {AI_ICONS[tab.id] ?? <Sparkles className="w-4 h-4" />}
                    </span>
                    <div>
                      <b className="text-[15px] font-semibold text-white block mb-0.5">
                        {tab.title}
                      </b>
                      <p className="text-[#A9A9B6] text-[13.5px] leading-relaxed">
                        {tab.description}
                      </p>
                    </div>

                    {/* 2a. Active Card Bottom 5s Gradient Progress Line */}
                    {isActive && (
                      <span
                        key={progressKey}
                        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#6C4BFF] via-[#E2539B] to-[#6C4BFF] rounded-b-[14px] animate-progress-fill ${
                          isPaused ? "[animation-play-state:paused]" : ""
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Tool Detail bullets (< 768px) */}
            <div className="block md:hidden bg-white/[0.02] border border-white/[0.06] rounded-[14px] p-4">
              <span className="text-[11.5px] text-[#D9D3FF] font-medium block mb-2">
                ✦ {currentTab.title} capabilities:
              </span>
              <ul className="space-y-1.5 text-[12.5px] text-[#C5C5D2]">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#6C4BFF]/20 text-[#A48BFF] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2f Closing Line & Buttons */}
            <div className="pt-2">
              <p className="text-[13.5px] text-[#A9A9B6] mb-4">
                AI that works inside your academy · Included on Pro plan with fair-use limits.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] bg-white hover:bg-[#F2F2F5] text-[#151517] font-semibold text-[14px] transition-all shadow-[0_4px_16px_rgba(255,255,255,0.12)] active:scale-[0.98]"
                >
                  Book a 20-minute demo
                </Link>
                <Link
                  href="/platform/ai"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-[12px] border border-white/20 hover:border-white/40 text-white font-medium text-[14px] transition-colors"
                >
                  Learn more about Domie AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DomieAiBand;
