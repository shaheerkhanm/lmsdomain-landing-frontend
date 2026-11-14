"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { DomieOrb } from "@/components/ai/DomieOrb";
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
    "Drafts lesson outlines, reading summaries and key takeaways",
    "Edits to your tone and structure",
    "You review and publish when ready",
  ],
  analytics: [
    "Flags students with low engagement across 3 consecutive sessions",
    "Highlights test questions with high failure rates",
    "Suggests concrete interventions for your teaching team",
  ],
  command_bar: [
    "Jump to any course, batch or student with keyboard shortcuts",
    "Perform common admin tasks in seconds",
    "Available anywhere across the LMS dashboard",
  ],
};

const ROTATION_INTERVAL = 8000;

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animId: number;
    let isVisible = false;

    // 75 stars with soft twinkling
    const stars = Array.from({ length: 75 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 0.7 + 0.8,
      baseAlpha: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 1.5 + 0.8,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !animId) {
          loop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const loop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() * 0.001;

      for (const s of stars) {
        const alpha = s.baseAlpha * (0.65 + 0.35 * Math.sin(now * s.speed + s.phase));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}

export function DomieAiBand() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [interactiveQuery, setInteractiveQuery] = useState("");
  const [interactiveAnswer, setInteractiveAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const revealContainerRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  // Pointer spotlight capability check
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  // Edmingle-style circular dark reveal scroll handler
  useEffect(() => {
    const section = sectionRef.current;
    const revealContainer = revealContainerRef.current;
    if (!section || !revealContainer) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      section.style.setProperty("--reveal-r", "150vmax");
      section.style.setProperty("--halo-alpha", "0");
      section.style.setProperty("--outer-tint", "#0B0B0D");
      section.style.setProperty("--pre-glow", "0");
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!section || !revealContainer) return;

        const vh = window.innerHeight;
        const rect = revealContainer.getBoundingClientRect();

        // 1. Pre-glow: when section approaches from vh * 1.35 to vh
        let preGlow = 0;
        if (rect.top > vh) {
          preGlow = 0;
        } else if (rect.top > 0) {
          preGlow = Math.max(0, Math.min(1, (vh * 1.35 - rect.top) / (vh * 0.35)));
        } else {
          preGlow = 1;
        }

        // 2. Reveal scroll progress p (0 -> 1 over 90vh of scroll)
        const revealDistance = vh * 0.9;
        const scrolledIn = vh - rect.top;
        const p = Math.max(0, Math.min(1, scrolledIn / revealDistance));

        // Ease out
        const easeP = 1 - Math.pow(1 - p, 2.2);

        // Radius: start at clamp(190px, 24vmin, 280px), expand to 150vmax
        const minDim = Math.min(window.innerWidth, vh);
        const maxDim = Math.max(window.innerWidth, vh);
        const startR = Math.max(190, Math.min(280, minDim * 0.24));
        const maxR = maxDim * 1.5;
        const currentR = startR + (maxR - startR) * easeP;

        // Outside page tint: from #FFFFFF to #0B0B0D over p 0.35 -> 1.0
        const tintP = Math.max(0, Math.min(1, (p - 0.35) / 0.65));
        const r = Math.round(255 - 244 * tintP);
        const g = Math.round(255 - 244 * tintP);
        const b = Math.round(255 - 242 * tintP);

        // Halo opacity
        const haloAlpha = p < 0.75 ? 0.65 : 0.65 * (1 - (p - 0.75) / 0.25);

        section.style.setProperty("--reveal-r", `${currentR.toFixed(1)}px`);
        section.style.setProperty("--halo-alpha", haloAlpha.toFixed(3));
        section.style.setProperty("--pre-glow", preGlow.toFixed(3));
        section.style.setProperty("--outer-tint", `rgb(${r}, ${g}, ${b})`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty("--mouse-x", `${x}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const handleInteractiveAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactiveQuery.trim()) return;
    setIsAnswering(true);
    setInteractiveAnswer(null);

    setTimeout(() => {
      setIsAnswering(false);
      setInteractiveAnswer(
        "Based on your published Module 4 notes: Dynamic memory allocation stores structures in the heap rather than the call stack, requiring explicit deallocation with free()."
      );
    }, 900);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % aiSectionContent.tabs.length);
      setProgressKey((k) => k + 1);
    }, ROTATION_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentTab = aiSectionContent.tabs[activeTab];
  const chips = TOOL_CHIPS[currentTab.id] || ["AI Assistant", "Grounded in your content"];
  const bullets = TOOL_BULLETS[currentTab.id] || [];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = aiSectionContent.tabs.length;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % total;
      setActiveTab(next);
      setProgressKey((k) => k + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + total) % total;
      setActiveTab(prev);
      setProgressKey((k) => k + 1);
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
      id="ai"
      onPointerMove={handlePointerMove}
      className="relative w-full overflow-hidden isolate font-sans"
      style={{
        backgroundColor: "var(--outer-tint, #FFFFFF)",
      }}
    >
      {/* 1. Pre-Section Rising Soft Blue/Violet Radial Glow */}
      <div
        className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[480px] -z-10 blur-[20px] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,92,255,calc(var(--pre-glow, 0) * 0.45)), rgba(80,90,255,calc(var(--pre-glow, 0) * 0.25)) 45%, transparent 75%)",
          opacity: "var(--pre-glow, 0)",
        }}
        aria-hidden="true"
      />

      {/* 2. Pinned Reveal Stage (~180vh total scroll, intro sticky for ~70vh while disc expands) */}
      <div ref={revealContainerRef} className="relative w-full h-[180vh]">
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-[14vh] min-[900px]:pt-[18vh]">
          {/* Dark Expanding Circle Layer (#0B0B0D) */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              clipPath: "circle(var(--reveal-r, 24vmin) at 50% 40%)",
              WebkitClipPath: "circle(var(--reveal-r, 24vmin) at 50% 40%)",
            }}
          >
            <div className="absolute inset-0 bg-[#0B0B0D]" />
            {/* Twinkling Star Field on the dark layer */}
            <StarField />
          </div>

          {/* Soft Blue/Violet Halo Ring around the circular edge */}
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-200"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, transparent calc(var(--reveal-r, 24vmin) - 2px), rgba(123,92,255,var(--halo-alpha, 0.65)) calc(var(--reveal-r, 24vmin)), rgba(80,90,255,calc(var(--halo-alpha, 0.65) * 0.45)) calc(var(--reveal-r, 24vmin) + 3vmin), transparent calc(var(--reveal-r, 24vmin) + 12vmin))",
            }}
            aria-hidden="true"
          />

          {/* Intro Block: DomieOrb + Eyebrow + Heading + Subtitle (White on Dark from p=0) */}
          <div className="relative z-10 text-center max-w-[820px] mx-auto px-5 select-none pointer-events-auto">
            {/* Domie Orb Video (72px, lazy) */}
            <div className="w-[72px] h-[72px] rounded-full mx-auto mb-4 bg-[#1F1934] p-0.5 shadow-[0_0_36px_rgba(123,92,255,0.55)] flex items-center justify-center overflow-hidden">
              <DomieOrb size={68} surface="dark" />
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-[12.5px] text-[#D9D3FF] mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E2539B]" />
              <span className="font-medium">✦ Pro plan · Domie AI</span>
            </div>

            {/* Centered Heading */}
            <h2 className="text-[clamp(32px,4.8vw,54px)] font-bold text-white tracking-[-0.035em] leading-[1.05] max-w-[18ch] mx-auto">
              AI that works inside your academy
            </h2>

            {/* Centered Subtitle */}
            <p className="text-[#A9A9B6] text-[15px] sm:text-[16.5px] leading-[1.6] max-w-[56ch] mx-auto mt-3.5">
              Domie knows your syllabus, your student roster and your live schedule. It drafts lessons, flags struggling students and answers routine questions.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Followup Dark Cards & Feature Content (bg-[#0B0B0D], scrolls up seamlessly) */}
      <div className="relative bg-[#0B0B0D] text-white pt-2 pb-[clamp(72px,9vw,120px)] z-10">
        {/* Desktop Pointer Spotlight (600px very soft radial glow following cursor) */}
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

        <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
          {/* Mobile Tabs: 2x2 Compact Buttons (< 768px) */}
          <div className="grid grid-cols-2 gap-2 mb-8 md:hidden" role="tablist" aria-label="Domie AI Tools Mobile">
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
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 items-start">
            {/* LEFT: Living Window with Rotating Conic Border & Context Chips */}
            <div className="relative group">
              {/* Context Chips (Float half outside window, never cover text) */}
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

              {/* Living Window Outer Wrapper with rotating conic border */}
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
                  {/* Window Chrome */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#121217]">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#2A2440] overflow-hidden shrink-0 relative flex items-center justify-center">
                        <DomieOrb size={30} surface="dark" />
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] font-semibold text-white">Domie</span>
                          <span className="text-[10px] bg-[#6C4BFF]/25 border border-[#8B6CFF]/40 text-[#D9D3FF] px-1.5 py-0.2 rounded-full">
                            AI
                          </span>
                        </div>
                        <span className="text-[11px] text-[#A9A9B6] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
                          Online · Grounded in your content
                        </span>
                      </div>
                    </div>
                    <span className="text-[11.5px] text-[#A9A9B6] bg-white/[0.06] border border-white/[0.08] px-2 py-0.5 rounded-md">
                      {currentTab.shortLabel || currentTab.title}
                    </span>
                  </div>

                  {/* Window Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    {/* Dynamic Simulated Content per Tool */}
                    {currentTab.id === "tutor" && (
                      <div className="space-y-3.5">
                        <div className="flex gap-2.5 items-start">
                          <div className="w-6 h-6 rounded-full bg-white/10 text-[10px] font-bold flex items-center justify-center shrink-0 text-white/80">
                            L
                          </div>
                          <div className="bg-white/[0.06] border border-white/[0.08] rounded-[12px] p-2.5 px-3 text-[13px] text-white/90 max-w-[85%]">
                            When should we use dynamic memory allocation instead of the call stack?
                          </div>
                        </div>

                        <div className="flex gap-2.5 items-start">
                          <div className="w-6 h-6 rounded-full bg-[#6C4BFF]/30 border border-[#8B6CFF]/40 flex items-center justify-center shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
                          </div>
                          <div className="bg-[#201D2D] border border-[#6C4BFF]/20 rounded-[12px] p-3 text-[13px] text-white/95 leading-[1.5] max-w-[90%] space-y-2">
                            <p>
                              Based on your published Module 4 notes: Dynamic memory is allocated at runtime in the heap when the object size is unknown ahead of time or must outlive the creating function.
                            </p>
                            <div className="bg-white/[0.04] border border-white/[0.08] rounded-md p-2 text-[11.5px] text-[#C9BEFF] flex items-center gap-2">
                              <Folder className="w-3.5 h-3.5 shrink-0" />
                              <span>Source: Lecture 4 · Memory Management (Slide 18)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab.id === "generator" && (
                      <div className="space-y-3 bg-[#111116] border border-white/[0.06] rounded-[14px] p-4">
                        <div className="flex items-center justify-between text-[12px] border-b border-white/[0.08] pb-2 text-[#A9A9B6]">
                          <span>Drafted: Lesson 8 Summary & Key Takeaways</span>
                          <span className="text-[#3DD68C] flex items-center gap-1">
                            <Check className="w-3 h-3" /> Ready for review
                          </span>
                        </div>
                        <p className="text-[13px] text-white/90 leading-[1.5]">
                          In this session, students covered async programming, Promise resolution pipelines, and event loop microtask queues.
                        </p>
                        <div className="space-y-1.5 text-[12px] text-white/80">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#A48BFF]" />
                            <span>Microtasks run before the next browser rendering frame</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#A48BFF]" />
                            <span>Promise.all fails fast on the first rejected promise</span>
                          </div>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <button className="text-[11.5px] bg-[#6C4BFF] hover:bg-[#7B5CFF] text-white px-3 py-1 rounded-md font-medium transition-colors">
                            Approve & Publish
                          </button>
                          <button className="text-[11.5px] bg-white/[0.08] hover:bg-white/[0.12] text-white/80 px-3 py-1 rounded-md transition-colors">
                            Edit Draft
                          </button>
                        </div>
                      </div>
                    )}

                    {currentTab.id === "analytics" && (
                      <div className="space-y-2.5">
                        <div className="bg-[#241A1A] border border-[#FF6B6B]/30 rounded-[12px] p-3 text-[12.5px] flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-[#FF8585] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">3 students missed 2 live classes</span>
                            <p className="text-[#E7A5A5] text-[11.5px] mt-0.5">
                              Batch 2026-A · Sent automated WhatsApp & email catchup reminder.
                            </p>
                          </div>
                        </div>
                        <div className="bg-[#1A2222] border border-[#20C997]/30 rounded-[12px] p-3 text-[12.5px] flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#3DD68C] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">Quiz 3 submission rate: 94%</span>
                            <p className="text-[#96E2CE] text-[11.5px] mt-0.5">
                              Average score 82%. Question 7 had 41% error rate (Pointers).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab.id === "command_bar" && (
                      <div className="space-y-2">
                        <div className="bg-white/[0.05] border border-white/[0.1] rounded-[10px] p-2 px-3 flex items-center justify-between text-[12.5px] text-white/90">
                          <div className="flex items-center gap-2">
                            <Search className="w-3.5 h-3.5 text-[#A48BFF]" />
                            <span>Jump to Batch 2026-A Attendance</span>
                          </div>
                          <span className="text-[11px] text-[#A9A9B6] font-mono">↵ Enter</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[10px] p-2 px-3 flex items-center justify-between text-[12.5px] text-white/60">
                          <div className="flex items-center gap-2">
                            <Folder className="w-3.5 h-3.5 text-white/40" />
                            <span>Open Syllabus · Module 4</span>
                          </div>
                          <span className="text-[11px] text-white/40 font-mono">⌘4</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[10px] p-2 px-3 flex items-center justify-between text-[12.5px] text-white/60">
                          <div className="flex items-center gap-2">
                            <Settings className="w-3.5 h-3.5 text-white/40" />
                            <span>Configure Razorpay Webhook</span>
                          </div>
                          <span className="text-[11px] text-white/40 font-mono">⌘W</span>
                        </div>
                      </div>
                    )}

                    {/* Interactive Input Field at Bottom */}
                    <form onSubmit={handleInteractiveAsk} className="mt-4 pt-3 border-t border-white/[0.08]">
                      <div className="flex items-center gap-2 bg-[#0E0E12] border border-white/[0.12] rounded-[12px] p-1.5 pl-3 focus-within:border-[#8B6CFF]">
                        <input
                          type="text"
                          value={interactiveQuery}
                          onChange={(e) => setInteractiveQuery(e.target.value)}
                          placeholder="Try asking Domie about your academy..."
                          className="w-full bg-transparent text-[13px] text-white placeholder-[#787886] focus:outline-none"
                        />
                        <button
                          type="submit"
                          aria-label="Send query to Domie"
                          disabled={isAnswering || !interactiveQuery.trim()}
                          className="w-8 h-8 rounded-[9px] bg-[#6C4BFF] hover:bg-[#7B5CFF] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {isAnswering && (
                        <div className="flex items-center gap-2 mt-2 text-[12px] text-[#C9BEFF]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.15s]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.3s]" />
                          <span>Searching academy course documents...</span>
                        </div>
                      )}

                      {interactiveAnswer && (
                        <div className="mt-2.5 p-2.5 bg-[#201D2D] border border-[#6C4BFF]/30 rounded-[10px] text-[12.5px] text-white/95 leading-[1.45] animate-in fade-in duration-300">
                          {interactiveAnswer}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Desktop Tab Column (Hidden on < 1024px) */}
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Domie AI Tools"
              className="hidden lg:flex flex-col gap-3"
            >
              {aiSectionContent.tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`domie-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectTab(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={`rounded-[16px] p-4 transition-all duration-300 cursor-pointer border relative select-none ${
                      isActive
                        ? "bg-[#16161B] border-[#6C4BFF]/40 shadow-[0_12px_32px_-10px_rgba(108,75,255,0.25)]"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                    }`}
                  >
                    {/* Header: Icon + Title */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors shrink-0 ${
                          isActive
                            ? "bg-[#6C4BFF] text-white shadow-[0_0_16px_rgba(108,75,255,0.5)]"
                            : "bg-white/[0.06] text-[#A9A9B6]"
                        }`}
                      >
                        {AI_ICONS[tab.id] ?? <Sparkles className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[15px] font-semibold text-white tracking-[-0.01em]">
                            {tab.title}
                          </h3>
                          {isActive && (
                            <span className="text-[11px] font-medium text-[#C9BEFF] bg-[#6C4BFF]/20 border border-[#8B6CFF]/30 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-[#A9A9B6] line-clamp-1 mt-0.5">
                          {tab.description}
                        </p>
                      </div>
                    </div>

                    {/* Expanded Content with Progress Bar and Bullets when Active */}
                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-2.5 animate-in fade-in duration-200">
                        {/* Progress Bar for Auto-Rotation */}
                        <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            key={progressKey}
                            className={`h-full bg-gradient-to-r from-[#6C4BFF] to-[#E2539B] transition-none ${
                              isPaused ? "" : "animate-progress"
                            }`}
                            style={{ animationDuration: `${ROTATION_INTERVAL}ms` }}
                          />
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-1.5 pt-1">
                          {bullets.map((b, i) => (
                            <li key={i} className="text-[12.5px] text-[#D1D1DB] flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#3DD68C] shrink-0 mt-0.5" strokeWidth={2.5} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Card: Domie's Brief Preview */}
          <div className="mt-8 bg-gradient-to-r from-[#171424] via-[#14141B] to-[#171424] border border-[#6C4BFF]/30 rounded-[20px] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_12px_40px_-15px_rgba(108,75,255,0.2)]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#2A2440] p-0.5 shrink-0 flex items-center justify-center shadow-[0_0_20px_rgba(108,75,255,0.5)]">
                <DomieOrb size={44} surface="dark" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-white">Daily Academy Intelligence</span>
                  <span className="text-[10.5px] bg-[#3DD68C]/20 border border-[#3DD68C]/40 text-[#5DECB0] px-2 py-0.2 rounded-full">
                    Grounded
                  </span>
                </div>
                <p className="text-[13px] text-[#A9A9B6] mt-0.5">
                  Domie monitors enrollments, class attendance, and quiz completion across all your batches.
                </p>
              </div>
            </div>

            <Link
              href="/platform/ai"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[12px] bg-white/10 hover:bg-white/15 border border-white/15 text-white text-[13px] font-medium transition-colors shrink-0"
            >
              <span>Explore Domie AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DomieAiBand;
