"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { DomieOrb } from "@/components/ai/DomieOrb";
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

const STAR_FIELD = [
  { x: 5, y: 8, size: 1.2, baseOpacity: 0.35, delay: 0.2, duration: 3.2 },
  { x: 12, y: 15, size: 1.0, baseOpacity: 0.25, delay: 1.1, duration: 4.0 },
  { x: 22, y: 6, size: 1.4, baseOpacity: 0.45, delay: 0.7, duration: 3.5 },
  { x: 31, y: 12, size: 1.1, baseOpacity: 0.30, delay: 1.8, duration: 4.2 },
  { x: 42, y: 5, size: 1.3, baseOpacity: 0.40, delay: 0.4, duration: 3.8 },
  { x: 58, y: 9, size: 1.0, baseOpacity: 0.20, delay: 2.1, duration: 4.5 },
  { x: 69, y: 7, size: 1.5, baseOpacity: 0.50, delay: 1.3, duration: 3.1 },
  { x: 79, y: 14, size: 1.2, baseOpacity: 0.35, delay: 0.9, duration: 3.7 },
  { x: 88, y: 8, size: 1.1, baseOpacity: 0.30, delay: 1.6, duration: 4.1 },
  { x: 94, y: 16, size: 1.3, baseOpacity: 0.40, delay: 0.5, duration: 3.4 },
  { x: 8, y: 28, size: 1.0, baseOpacity: 0.25, delay: 1.4, duration: 3.9 },
  { x: 18, y: 34, size: 1.4, baseOpacity: 0.45, delay: 0.8, duration: 4.3 },
  { x: 27, y: 25, size: 1.2, baseOpacity: 0.35, delay: 2.0, duration: 3.6 },
  { x: 38, y: 32, size: 1.0, baseOpacity: 0.20, delay: 0.3, duration: 4.4 },
  { x: 63, y: 26, size: 1.3, baseOpacity: 0.40, delay: 1.7, duration: 3.3 },
  { x: 74, y: 35, size: 1.1, baseOpacity: 0.30, delay: 0.6, duration: 4.1 },
  { x: 84, y: 29, size: 1.5, baseOpacity: 0.50, delay: 1.2, duration: 3.5 },
  { x: 92, y: 38, size: 1.0, baseOpacity: 0.25, delay: 2.3, duration: 4.6 },
  { x: 4, y: 48, size: 1.2, baseOpacity: 0.35, delay: 0.5, duration: 3.7 },
  { x: 15, y: 55, size: 1.4, baseOpacity: 0.45, delay: 1.9, duration: 4.0 },
  { x: 24, y: 46, size: 1.1, baseOpacity: 0.30, delay: 0.7, duration: 3.4 },
  { x: 34, y: 58, size: 1.0, baseOpacity: 0.20, delay: 1.5, duration: 4.2 },
  { x: 67, y: 52, size: 1.3, baseOpacity: 0.40, delay: 0.2, duration: 3.8 },
  { x: 78, y: 61, size: 1.2, baseOpacity: 0.35, delay: 1.1, duration: 4.3 },
  { x: 87, y: 50, size: 1.5, baseOpacity: 0.50, delay: 1.8, duration: 3.2 },
  { x: 96, y: 59, size: 1.0, baseOpacity: 0.25, delay: 0.4, duration: 4.5 },
  { x: 7, y: 72, size: 1.3, baseOpacity: 0.40, delay: 1.3, duration: 3.6 },
  { x: 19, y: 81, size: 1.1, baseOpacity: 0.30, delay: 0.9, duration: 4.1 },
  { x: 29, y: 75, size: 1.4, baseOpacity: 0.45, delay: 2.2, duration: 3.9 },
  { x: 41, y: 83, size: 1.0, baseOpacity: 0.20, delay: 0.6, duration: 4.4 },
  { x: 60, y: 77, size: 1.2, baseOpacity: 0.35, delay: 1.6, duration: 3.5 },
  { x: 72, y: 86, size: 1.5, baseOpacity: 0.50, delay: 0.3, duration: 3.8 },
  { x: 82, y: 79, size: 1.1, baseOpacity: 0.30, delay: 1.4, duration: 4.2 },
  { x: 91, y: 88, size: 1.3, baseOpacity: 0.40, delay: 0.8, duration: 3.7 },
  { x: 10, y: 92, size: 1.0, baseOpacity: 0.25, delay: 1.7, duration: 4.0 },
  { x: 23, y: 95, size: 1.4, baseOpacity: 0.45, delay: 0.5, duration: 3.3 },
  { x: 37, y: 91, size: 1.2, baseOpacity: 0.35, delay: 1.2, duration: 4.5 },
  { x: 52, y: 96, size: 1.1, baseOpacity: 0.30, delay: 2.0, duration: 3.6 },
  { x: 66, y: 93, size: 1.3, baseOpacity: 0.40, delay: 0.4, duration: 4.1 },
  { x: 80, y: 97, size: 1.0, baseOpacity: 0.20, delay: 1.5, duration: 3.9 },
  { x: 93, y: 94, size: 1.2, baseOpacity: 0.35, delay: 0.9, duration: 4.2 },
  { x: 14, y: 20, size: 1.1, baseOpacity: 0.30, delay: 0.3, duration: 3.5 },
  { x: 85, y: 22, size: 1.3, baseOpacity: 0.40, delay: 1.7, duration: 3.8 },
  { x: 48, y: 16, size: 1.2, baseOpacity: 0.35, delay: 1.0, duration: 4.0 },
  { x: 55, y: 21, size: 1.4, baseOpacity: 0.45, delay: 0.6, duration: 3.3 },
  { x: 3, y: 39, size: 1.0, baseOpacity: 0.25, delay: 1.8, duration: 4.4 },
  { x: 97, y: 44, size: 1.2, baseOpacity: 0.35, delay: 0.7, duration: 3.6 },
  { x: 46, y: 38, size: 1.1, baseOpacity: 0.30, delay: 2.1, duration: 4.1 },
  { x: 54, y: 41, size: 1.3, baseOpacity: 0.40, delay: 1.2, duration: 3.7 },
  { x: 11, y: 64, size: 1.2, baseOpacity: 0.35, delay: 0.4, duration: 4.3 },
  { x: 89, y: 67, size: 1.0, baseOpacity: 0.25, delay: 1.6, duration: 3.9 },
  { x: 44, y: 68, size: 1.4, baseOpacity: 0.45, delay: 0.8, duration: 3.4 },
  { x: 57, y: 65, size: 1.1, baseOpacity: 0.30, delay: 1.9, duration: 4.0 },
  { x: 6, y: 84, size: 1.3, baseOpacity: 0.40, delay: 0.5, duration: 3.8 },
  { x: 95, y: 80, size: 1.2, baseOpacity: 0.35, delay: 1.3, duration: 4.2 },
  { x: 49, y: 85, size: 1.0, baseOpacity: 0.20, delay: 2.2, duration: 3.5 },
  { x: 53, y: 88, size: 1.4, baseOpacity: 0.45, delay: 0.7, duration: 4.1 },
  { x: 17, y: 11, size: 1.1, baseOpacity: 0.30, delay: 1.1, duration: 3.7 },
  { x: 82, y: 10, size: 1.3, baseOpacity: 0.40, delay: 0.2, duration: 4.3 },
  { x: 26, y: 38, size: 1.2, baseOpacity: 0.35, delay: 1.5, duration: 3.6 },
  { x: 76, y: 42, size: 1.0, baseOpacity: 0.25, delay: 0.9, duration: 4.0 },
  { x: 36, y: 68, size: 1.4, baseOpacity: 0.45, delay: 1.4, duration: 3.4 },
  { x: 64, y: 71, size: 1.1, baseOpacity: 0.30, delay: 0.6, duration: 4.2 },
  { x: 20, y: 88, size: 1.3, baseOpacity: 0.40, delay: 1.8, duration: 3.8 },
  { x: 77, y: 92, size: 1.2, baseOpacity: 0.35, delay: 0.4, duration: 4.4 },
  { x: 9, y: 42, size: 1.0, baseOpacity: 0.20, delay: 1.0, duration: 3.7 },
  { x: 91, y: 46, size: 1.4, baseOpacity: 0.45, delay: 2.3, duration: 4.1 },
  { x: 33, y: 82, size: 1.2, baseOpacity: 0.35, delay: 0.7, duration: 3.5 },
  { x: 68, y: 81, size: 1.1, baseOpacity: 0.30, delay: 1.5, duration: 4.3 },
  { x: 13, y: 76, size: 1.3, baseOpacity: 0.40, delay: 0.3, duration: 3.9 },
  { x: 86, y: 73, size: 1.0, baseOpacity: 0.25, delay: 1.7, duration: 4.2 },
  { x: 50, y: 50, size: 1.2, baseOpacity: 0.35, delay: 1.1, duration: 3.6 },
];

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
  const pointerRafRef = useRef<number | null>(null);

  const currentTab = aiSectionContent.tabs[activeTab] || aiSectionContent.tabs[0];
  const chips = TOOL_CHIPS[currentTab.id] || TOOL_CHIPS.tutor;
  const bullets = TOOL_BULLETS[currentTab.id] || TOOL_BULLETS.tutor;

  const aiTutorCard = heroContent.cards?.find((c) => c.type === "ai_tutor");
  const question =
    aiTutorCard?.question || "What's the difference between a quiz and an assignment?";
  const answer =
    aiTutorCard?.answer ||
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor review.";

  // Scroll-driven light -> dark transition (Edmingle Veda style: no sticky, no spacers, no clip-path)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      section.style.setProperty("--p", "1");
      section.style.setProperty("--bg-base", "#0B0B0D");
      return;
    }

    let scrollRafId: number | null = null;

    const updateProgress = () => {
      scrollRafId = null;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // p = 0 when section top is at 100% of viewport height (rect.top >= vh)
      // p = 1 when section top reaches 15% of viewport height (rect.top <= 0.15 * vh)
      const range = vh * 0.85;
      const rawP = (vh - rect.top) / range;
      const p = Math.max(0, Math.min(1, rawP));

      section.style.setProperty("--p", p.toFixed(4));

      // Interpolate from light page color (#FFFFFF) to deep-dark (#0B0B0D)
      const r = Math.round(255 + (11 - 255) * p);
      const g = Math.round(255 + (11 - 255) * p);
      const b = Math.round(255 + (13 - 255) * p);
      section.style.setProperty("--bg-base", `rgb(${r}, ${g}, ${b})`);
    };

    const onScroll = () => {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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

    if (pointerRafRef.current) cancelAnimationFrame(pointerRafRef.current);
    pointerRafRef.current = requestAnimationFrame(() => {
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
      id="ai"
      onPointerMove={handlePointerMove}
      className="relative py-[clamp(72px,9vw,120px)] overflow-hidden isolate font-sans will-change-[background-color]"
      style={{
        backgroundColor: "var(--bg-base, #FFFFFF)",
      }}
    >
      {/* 1. Desktop Spotlight: Dark Core (#0B0B0D) ~260px radius + Blue/Violet Halo Fading to 560px */}
      <div
        className="hidden sm:block pointer-events-none absolute inset-x-0 top-0 h-[760px] -z-10"
        style={{
          background:
            "radial-gradient(circle 560px at 50% 210px, #0B0B0D 0px, #0B0B0D 260px, rgba(70,90,255,0.45) 360px, rgba(123,92,255,0.25) 460px, transparent 560px)",
        }}
        aria-hidden="true"
      />

      {/* 1b. Mobile Spotlight: Dark Core ~170px radius + Blue/Violet Halo Fading to 360px */}
      <div
        className="sm:hidden pointer-events-none absolute inset-x-0 top-0 h-[560px] -z-10"
        style={{
          background:
            "radial-gradient(circle 360px at 50% 170px, #0B0B0D 0px, #0B0B0D 170px, rgba(70,90,255,0.45) 230px, rgba(123,92,255,0.25) 290px, transparent 360px)",
        }}
        aria-hidden="true"
      />

      {/* 2. Desktop Pointer Spotlight (600px subtle radial glow following cursor) */}
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

      {/* 3. Star Field Layer: 72 tiny white dots, opacity linked to scroll progress --p */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
        style={{ opacity: "var(--p, 0)" }}
        aria-hidden="true"
      >
        {STAR_FIELD.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-star-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.baseOpacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* 4. Violet/Pink Bottom Atmospheric Glow */}
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[300px] -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(closest-side,rgba(123,92,255,0.35),rgba(226,83,155,0.18)_50%,transparent)] -z-10"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] relative z-10">
        {/* Centered Top Block: Domie Orb (~72px) + Eyebrow + H2 + Subtitle */}
        <div className="text-center max-w-[820px] mx-auto mb-10 md:mb-14">
          {/* Centered Domie Orb Video (~72px) */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-[72px] h-[72px] rounded-full bg-[#1F1934] p-1 shadow-[0_0_28px_rgba(108,75,255,0.55)] relative flex items-center justify-center">
              <DomieOrb size={68} surface="dark" />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center mb-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs text-[#D9D3FF]">
              ✦ Pro plan · Domie AI
            </span>
          </div>

          {/* H2 Title */}
          <h2 className="type-h2-v4 text-[#F4F4F6] text-center">
            {aiSectionContent.title}
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[16px] text-[#A9A9B6] leading-[1.55] max-w-[62ch] mx-auto mt-3">
            {aiSectionContent.subtitle}
          </p>
        </div>

        {/* Mobile Tabs: 2x2 Compact Buttons (< 768px) */}
        <div className="grid grid-cols-2 gap-2 mt-2 md:hidden" role="tablist" aria-label="Domie AI Tools Mobile">
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
                <span className={`shrink-0 ${isActive ? "text-[#D9D3FF]" : "text-[#7B7B8E]"}`}>
                  {AI_ICONS[tab.id]}
                </span>
                <span className="truncate">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Tabs: 4 Horizontal Pills (>= 768px) */}
        <div
          role="tablist"
          aria-label="Domie AI Tools"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden md:grid md:grid-cols-4 gap-3 mt-4 max-w-[1040px] mx-auto"
        >
          {aiSectionContent.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`domie-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`domie-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectTab(idx)}
                className={`group relative text-left p-3.5 rounded-[14px] border transition-all ${
                  isActive
                    ? "bg-white/7 border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                    : "bg-white/[0.02] border-white/6 hover:bg-white/[0.05] hover:border-white/12"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-[#6C4BFF] text-white shadow-[0_0_12px_rgba(108,75,255,0.5)]"
                        : "bg-white/6 text-[#A9A9B6] group-hover:text-white"
                    }`}
                  >
                    {AI_ICONS[tab.id]}
                  </span>
                  <span
                    className={`font-semibold text-[14px] truncate ${
                      isActive ? "text-white" : "text-[#A9A9B6] group-hover:text-white"
                    }`}
                  >
                    {tab.shortLabel}
                  </span>
                </div>

                {/* 5s Progress Bar on Active Tab */}
                {isActive && (
                  <div
                    key={progressKey}
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-white/10 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-gradient-to-r from-[#6C4BFF] via-[#E2539B] to-[#F2894A] ${
                        isPaused ? "" : "animate-progress-fill"
                      }`}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feature Workspace: Tab Panels */}
        <div
          className="mt-8 md:mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {aiSectionContent.tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            if (!isActive) return null;

            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`domie-panel-${tab.id}`}
                aria-labelledby={`domie-tab-${tab.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
              >
                {/* Left Description Column (5 cols) */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Chips */}
                  <div className="flex flex-wrap gap-2">
                    {chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1F1934] border border-[#A08CFF]/30 text-[#D9D3FF]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E2539B]" />
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-white tracking-[-0.01em]">
                      {tab.title}
                    </h3>
                    <p className="text-[15px] text-[#A9A9B6] leading-[1.6] mt-2">
                      {tab.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 pt-1">
                    {bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-[14px] text-[#D9D9E0]">
                        <span className="shrink-0 w-4 h-4 rounded-full bg-[#6C4BFF]/30 border border-[#A08CFF]/40 flex items-center justify-center mt-0.5 text-[#D9D3FF]">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Context Note */}
                  <div className="p-3.5 rounded-[12px] bg-white/[0.03] border border-white/8 text-[12px] text-[#8E8E9F] leading-[1.5]">
                    <strong className="text-white font-medium">Privacy guaranteed:</strong> Your course data never trains external AI models. All responses are generated strictly within your academy scope.
                  </div>
                </div>

                {/* Right Interactive Mockup (7 cols) */}
                <div className="lg:col-span-7">
                  <div className="rounded-[18px] border border-white/12 bg-[#121217] shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Mockup Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#18181F]">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                        <span className="ml-2 text-xs font-mono text-[#8E8E9F]">
                          domie://{tab.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#A9A9B6]">
                        <span className="w-2 h-2 rounded-full bg-[#27C93F] animate-pulse" />
                        <span className="font-mono">ONLINE</span>
                      </div>
                    </div>

                    {/* Mockup Body per Tool */}
                    <div className="p-4 sm:p-6 bg-[#0E0E12] min-h-[380px] flex flex-col justify-between">
                      {/* TAB 0: AI Tutor (HelpDesk Mock) */}
                      {tab.id === "tutor" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-white/6 text-xs text-[#8E8E9F]">
                            <span>Course: Full-Stack Web Development</span>
                            <span>Student: Alex M.</span>
                          </div>

                          {/* Student Question Bubble */}
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-white/10 text-xs font-semibold text-white flex items-center justify-center shrink-0">
                              AM
                            </div>
                            <div className="p-3.5 rounded-[14px] rounded-tl-sm bg-white/8 border border-white/10 text-[13px] text-white max-w-[85%]">
                              {question}
                            </div>
                          </div>

                          {/* Domie Answer Bubble */}
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-[#1F1934] p-0.5 shrink-0 flex items-center justify-center">
                              <DomieOrb size={24} surface="dark" />
                            </div>
                            <div className="p-3.5 rounded-[14px] rounded-tl-sm bg-[#6C4BFF]/15 border border-[#A08CFF]/30 text-[13px] text-[#E7E4FF] max-w-[85%] space-y-2">
                              {showHelpdeskAnswer ? (
                                <>
                                  <p>{answer}</p>
                                  <div className="text-[11px] text-[#A9A9B6] pt-1 flex items-center gap-1.5 border-t border-white/8">
                                    <Sparkles className="w-3 h-3 text-[#E2539B]" />
                                    <span>Sourced from Module 3: Assessment Guidelines</span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-1.5 py-1">
                                  <span className="w-2 h-2 rounded-full bg-[#D9D3FF] animate-bounce" />
                                  <span className="w-2 h-2 rounded-full bg-[#D9D3FF] animate-bounce [animation-delay:0.2s]" />
                                  <span className="w-2 h-2 rounded-full bg-[#D9D3FF] animate-bounce [animation-delay:0.4s]" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Input Bar */}
                          <div className="pt-2">
                            <div className="flex items-center gap-2 p-2 px-3 rounded-[10px] bg-white/5 border border-white/10 text-xs text-[#7B7B8E]">
                              <span>Ask a follow-up about Module 3...</span>
                              <Send className="w-3.5 h-3.5 ml-auto text-white/40" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 1: AI Generator (Curriculum Drafter) */}
                      {tab.id === "generator" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-white/6 text-xs text-[#8E8E9F]">
                            <span>Course Drafter</span>
                            <span className="text-[#A08CFF]">Draft ready for review</span>
                          </div>

                          <div className="p-3 rounded-[10px] bg-white/5 border border-white/8">
                            <div className="text-xs text-[#8E8E9F]">Topic Input</div>
                            <div className="text-[13px] font-medium text-white mt-1">
                              Advanced TypeScript Patterns for Backend Developers
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-[#D9D3FF] flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-[#E2539B]" />
                              Generated Module Outline (4 lessons)
                            </div>

                            {[
                              { num: "01", title: "Conditional & Mapped Types in Practice", time: "24m" },
                              { num: "02", title: "Template Literal Types & String Manipulation", time: "32m" },
                              { num: "03", title: "Type Guards, Assertions & Discriminated Unions", time: "28m" },
                              { num: "04", title: "Building a Type-Safe Router Framework", time: "45m" },
                            ].map((lesson, lIdx) => (
                              <div
                                key={lIdx}
                                className="flex items-center justify-between p-2.5 rounded-[8px] bg-white/[0.03] border border-white/6 text-xs"
                              >
                                <div className="flex items-center gap-2 text-white">
                                  <span className="font-mono text-[#8E8E9F]">{lesson.num}</span>
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-[#8E8E9F] font-mono">{lesson.time}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/6 text-xs">
                            <span className="text-[#8E8E9F]">You review before publishing</span>
                            <button
                              type="button"
                              className="px-3 py-1.5 rounded-[8px] bg-[#6C4BFF] text-white font-medium hover:bg-[#5839EE] transition-colors"
                            >
                              Insert into Course Builder
                            </button>
                          </div>
                        </div>
                      )}

                      {/* TAB 2: AI Analytics (Daily Summary & Alerts) */}
                      {tab.id === "analytics" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-white/6 text-xs text-[#8E8E9F]">
                            <span>Morning Academy Brief</span>
                            <span>Today · 08:30 AM</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-3 rounded-[10px] bg-white/5 border border-white/8 text-center">
                              <div className="text-[20px] font-bold text-white">94%</div>
                              <div className="text-[11px] text-[#8E8E9F] mt-0.5">Attendance avg</div>
                            </div>
                            <div className="p-3 rounded-[10px] bg-white/5 border border-white/8 text-center">
                              <div className="text-[20px] font-bold text-[#E2539B]">3</div>
                              <div className="text-[11px] text-[#8E8E9F] mt-0.5">Need attention</div>
                            </div>
                            <div className="p-3 rounded-[10px] bg-white/5 border border-white/8 text-center">
                              <div className="text-[20px] font-bold text-[#27C93F]">+18</div>
                              <div className="text-[11px] text-[#8E8E9F] mt-0.5">New signups</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-xs font-semibold text-[#D9D3FF]">Action Items</div>

                            <div className="p-3 rounded-[10px] bg-[#E2539B]/10 border border-[#E2539B]/30 flex items-start gap-2.5">
                              <AlertCircle className="w-4 h-4 text-[#E2539B] shrink-0 mt-0.5" />
                              <div className="text-xs text-white">
                                <strong className="font-semibold">Batch A · Python Bootcamp:</strong> 3 learners haven't submitted Assignment 2 (due in 6 hours).
                              </div>
                            </div>

                            <div className="p-3 rounded-[10px] bg-white/[0.03] border border-white/6 flex items-start gap-2.5">
                              <Clock className="w-4 h-4 text-[#6C4BFF] shrink-0 mt-0.5" />
                              <div className="text-xs text-white">
                                <strong className="font-semibold">Live class in 45m:</strong> "Advanced SQL" with Sarah K. (28 enrolled).
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: Command Bar (⌘K Search) */}
                      {tab.id === "command_bar" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-white/6 text-xs text-[#8E8E9F]">
                            <span>Universal Admin Palette</span>
                            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-white">⌘K</span>
                          </div>

                          {/* Search Input */}
                          <div className="flex items-center gap-2 p-3 rounded-[10px] bg-white/8 border border-white/15 text-sm text-white">
                            <Search className="w-4 h-4 text-white/50" />
                            <span className="font-mono text-xs">refund rahul kumar</span>
                            <CornerDownLeft className="w-3.5 h-3.5 ml-auto text-white/40" />
                          </div>

                          {/* Results */}
                          <div className="space-y-1.5">
                            <div className="text-[11px] text-[#8E8E9F] font-mono px-1">QUICK ACTIONS</div>

                            <div className="p-2.5 rounded-[8px] bg-[#6C4BFF]/20 border border-[#A08CFF]/40 flex items-center justify-between text-xs text-white">
                              <div className="flex items-center gap-2">
                                <Settings className="w-3.5 h-3.5 text-[#D9D3FF]" />
                                <span>Process refund for <strong>Rahul Kumar</strong> (₹3,999 · Batch 12)</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-white/50" />
                            </div>

                            <div className="p-2.5 rounded-[8px] bg-white/[0.03] border border-white/6 flex items-center justify-between text-xs text-white">
                              <div className="flex items-center gap-2">
                                <Folder className="w-3.5 h-3.5 text-white/50" />
                                <span>View Rahul Kumar's student record</span>
                              </div>
                              <span className="text-[11px] font-mono text-[#8E8E9F]">↵ Enter</span>
                            </div>

                            <div className="p-2.5 rounded-[8px] bg-white/[0.03] border border-white/6 flex items-center justify-between text-xs text-white">
                              <div className="flex items-center gap-2">
                                <Search className="w-3.5 h-3.5 text-white/50" />
                                <span>Search all transactions for "Rahul"</span>
                              </div>
                              <span className="text-[11px] font-mono text-[#8E8E9F]">↵ Enter</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Proof Strip & CTA */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-white font-semibold text-[16px]">
                Built into every Pro and Custom academy plan.
              </p>
              <p className="text-[#A9A9B6] text-[13px] mt-1">
                Zero API keys to configure. Grounded directly in your course content from day one.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
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
    </section>
  );
}

export default DomieAiBand;
