"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Check,
  ArrowRight,
  Search,
  Send,
  TrendingUp,
  AlertCircle,
  Clock,
  Settings,
  Folder,
  CornerDownLeft,
  FileText,
  Bookmark,
} from "lucide-react";
import { aiSectionContent } from "@/content/home/ai";
import { heroContent } from "@/content/home/hero";
import { aiPlatformData } from "@/content/platform/ai";

/**
 * Reusable scaled UI container that calculates a scale factor based on container width.
 * Prevents text wrapping breaks on small viewports and provides razor-sharp responsive rendering.
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
  const sectionRef = useRef<HTMLElement>(null);
  const [orbInView, setOrbInView] = useState(false);
  const [uiActive, setUiActive] = useState(false);
  const [showHelpdeskAnswer, setShowHelpdeskAnswer] = useState(false);

  // Content sources
  const aiTutorHero = heroContent.cards?.find((c) => c.type === "ai_tutor");
  const heroQuestion =
    aiTutorHero?.question || "What's the difference between a quiz and an assignment?";
  const heroAnswer =
    aiTutorHero?.answer ||
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor review.";

  // Check bullets mapped strictly from content/platform/ai.ts
  const toolBullets: Record<string, string[]> = {
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

  const pillLabels: Record<string, string> = {
    tutor: "✦ For learners",
    generator: "✦ For your content team",
    analytics: "✦ For academy owners",
    command_bar: "✦ For admins",
  };

  // Scroll-linked background fade to dark (#FAFAFA -> #0B0B0F) and back
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pageRoot = document.getElementById("home-page-root");
    const el = sectionRef.current;
    if (!el || !pageRoot) return;

    if (prefersReducedMotion) {
      // With reduced motion, section is statically dark inside, wrapper stays default
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          pageRoot.setAttribute("data-ai-dark", "true");
          setOrbInView(true);
        } else {
          pageRoot.setAttribute("data-ai-dark", "false");
        }
      },
      {
        // Triggers when section's top moves from 100% to 40% of viewport
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

  // One-time UI animation trigger on section entry
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !uiActive) {
          setUiActive(true);
          const t = setTimeout(() => setShowHelpdeskAnswer(true), 900);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [uiActive]);

  return (
    <section
      ref={sectionRef}
      id="ai"
      className="relative w-full bg-[#0B0B0F] text-[#ECECF1] font-sans overflow-hidden isolate"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 24px 32px, rgba(255, 255, 255, 0.22), transparent),
          radial-gradient(1px 1px at 86px 120px, rgba(255, 255, 255, 0.16), transparent),
          radial-gradient(1.5px 1.5px at 170px 65px, rgba(255, 255, 255, 0.25), transparent),
          radial-gradient(1px 1px at 240px 180px, rgba(255, 255, 255, 0.14), transparent),
          radial-gradient(1px 1px at 320px 48px, rgba(255, 255, 255, 0.20), transparent)
        `,
        backgroundSize: "360px 240px",
      }}
    >
      {/* 1a. Pre-Section Rising Soft Violet Glow (240px, radial, rgba(139,108,255,.35)) */}
      <div
        className="pointer-events-none absolute -top-[120px] left-1/2 -translate-x-1/2 w-[min(1100px,100%)] h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(139,108,255,0.35)_0%,transparent_70%)] -z-10"
        aria-hidden="true"
      />

      {/* 1b. ORB HEADER (Sticky at top: 96px on desktop, slides under the feature panel) */}
      <div className="relative max-w-[1280px] mx-auto px-5 pt-16 md:pt-24 pb-8 md:pb-16">
        <div
          className={`md:sticky md:top-[96px] z-0 transition-all duration-700 ease-out ${
            orbInView ? "opacity-100 scale-100" : "opacity-90 scale-[0.92]"
          }`}
        >
          {/* Black Orb Circle: 440px desktop / 300px mobile */}
          <div className="relative mx-auto w-[300px] h-[300px] md:w-[440px] md:h-[440px] rounded-full bg-[#0E0E12] flex flex-col items-center justify-center text-center p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_-30px_120px_-10px_rgba(108,75,255,0.55)] before:content-[''] before:absolute before:-top-14 before:left-1/2 before:-translate-x-1/2 before:w-[130%] before:h-[130%] before:rounded-full before:bg-[radial-gradient(circle_at_50%_15%,#8B6CFF,#6C4BFF_45%,transparent_70%)] before:blur-[40px] before:opacity-65 before:-z-10">
            {/* Pro Plan Pill */}
            <span className="inline-flex items-center gap-1 bg-white/[0.08] border border-white/[0.14] rounded-full px-2.5 py-0.5 text-[11px] font-medium text-[#D9D3FF] mb-2 select-none">
              ✦ Pro plan
            </span>

            {/* Domie Avatar with slow breathing glow */}
            <div className="w-[52px] h-[52px] md:w-[64px] md:h-[64px] rounded-full bg-[#1F1934] p-1 shadow-[0_0_24px_rgba(108,75,255,0.5)] animate-pulse mb-3 shrink-0 relative overflow-hidden">
              <Image
                src="/images/ai/domie/domie-bot-sm.webp"
                alt="Domie AI"
                width={64}
                height={64}
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Title: Meet Domie AI */}
            <h2 className="text-[32px] md:text-[46px] font-bold font-urbanist tracking-[-0.03em] leading-tight">
              Meet{" "}
              <span className="bg-gradient-to-r from-[#A48BFF] to-[#6C4BFF] bg-clip-text text-transparent">
                Domie AI
              </span>
            </h2>

            {/* Subtitle in two short lines */}
            <p className="text-[13px] md:text-[14.5px] text-[#A9A9B6] leading-snug mt-2 max-w-[320px] md:max-w-[360px] mx-auto">
              <span>{aiSectionContent.title}.</span>
              <br />
              <span className="text-[#848494]">{aiSectionContent.subtitle}</span>
            </p>
          </div>
        </div>

        {/* 1c. FEATURE PANEL (Slides OVER the orb, z-index 10 with deep top shadow) */}
        <div className="relative z-10 max-w-[1180px] mx-auto mt-12 md:mt-20 bg-[#121216] border border-white/[0.08] rounded-[28px] p-4 sm:p-6 md:p-8 shadow-[0_-40px_80px_rgba(0,0,0,0.6)]">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ROW 1: HelpDesk AI tutor (Full Width, Text Left 40%, UI Right 60%) */}
            <div className="col-span-full bg-[#17171C] border border-white/[0.07] rounded-[20px] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 items-center">
              {/* Text Left */}
              <div className="flex flex-col items-start order-2 lg:order-1">
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-0.5 text-[12px] text-[#D9D3FF] font-medium mb-3">
                  <Sparkles className="w-3 h-3 text-[#A48BFF]" />
                  {pillLabels.tutor}
                </span>
                <h3 className="text-[22px] font-semibold text-white tracking-[-0.02em]">
                  {aiSectionContent.tabs[0]?.title || "HelpDesk AI tutor"}
                </h3>
                <p className="text-[14.5px] text-[#A9A9B6] leading-relaxed mt-2">
                  {aiSectionContent.tabs[0]?.description}
                </p>
                {/* 2-3 Check Bullets from content/platform/ai.ts */}
                <ul className="mt-4 space-y-2 text-[13px] text-[#C5C5D2]">
                  {toolBullets.tutor.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#6C4BFF]/20 text-[#A48BFF] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/platform/ai"
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#A48BFF] hover:text-[#C4B5FD] font-medium mt-5 transition-colors group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* UI Right: Live HelpDesk Mockup */}
              <div className="order-1 lg:order-2">
                <ScaledUiContainer baseWidth={580}>
                  <div className="bg-[#1C1C22] border border-white/[0.08] rounded-[16px] p-3.5 grid grid-cols-[180px_1fr] gap-3">
                    {/* Left: Saved Chats Stack */}
                    <div className="flex flex-col gap-2 border-r border-white/[0.06] pr-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8A96] font-medium px-1">
                        Saved Chats
                      </span>
                      {/* Dimmed card 1 */}
                      <div className="p-2 rounded-[8px] bg-white/[0.02] border border-white/[0.04] opacity-45">
                        <b className="block text-[11.5px] text-white font-medium truncate">
                          React & Node
                        </b>
                        <small className="text-[10px] text-[#8A8A96]">12 questions</small>
                      </div>
                      {/* Active card 2 with Live Dot */}
                      <div className="p-2 rounded-[8px] bg-[#6C4BFF]/15 border border-[#6C4BFF]/40 shadow-[0_0_12px_rgba(108,75,255,0.2)]">
                        <div className="flex items-center justify-between">
                          <b className="block text-[11.5px] text-white font-semibold truncate">
                            Full-Stack Web
                          </b>
                          <span className="flex items-center gap-1 text-[9px] text-[#7EE2B8]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
                            Live
                          </span>
                        </div>
                        <small className="text-[10px] text-[#D9D3FF]">34 questions</small>
                      </div>
                      {/* Dimmed card 3 */}
                      <div className="p-2 rounded-[8px] bg-white/[0.02] border border-white/[0.04] opacity-45">
                        <b className="block text-[11.5px] text-white font-medium truncate">
                          UI/UX Masterclass
                        </b>
                        <small className="text-[10px] text-[#8A8A96]">8 questions</small>
                      </div>
                    </div>

                    {/* Right: Live Chat Window */}
                    <div className="flex flex-col justify-between">
                      {/* Chat Header */}
                      <div className="flex items-center gap-2 pb-2.5 border-b border-white/[0.06]">
                        <span className="w-6 h-6 rounded-full bg-[#2A2440] overflow-hidden shrink-0">
                          <Image
                            src="/images/ai/domie/domie-bot-sm.webp"
                            alt="Domie"
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </span>
                        <div>
                          <b className="block text-[12px] text-white leading-none">
                            Domie · HelpDesk
                          </b>
                          <small className="text-[10px] text-[#8A8A96]">
                            Full-Stack Web Engineering
                          </small>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="py-3 flex flex-col gap-2 min-h-[140px]">
                        {/* Learner Question */}
                        <div className="self-end max-w-[85%] bg-[#262436] text-[#ECEAF8] text-[12px] p-2.5 px-3 rounded-[12px] rounded-br-[2px] leading-relaxed">
                          {heroQuestion}
                        </div>

                        {/* Typing indicator -> Answer */}
                        {!showHelpdeskAnswer ? (
                          <div className="self-start flex items-center gap-1 bg-white/[0.06] p-2 px-3 rounded-[12px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.3s]" />
                          </div>
                        ) : (
                          <div className="self-start max-w-[90%] bg-white/[0.07] text-[#ECECF1] text-[12px] p-2.5 px-3 rounded-[12px] rounded-bl-[2px] leading-relaxed">
                            {heroAnswer}
                            <span className="inline-block mt-1.5 text-[10px] text-[#A9A9B6] bg-white/[0.08] px-2 py-0.5 rounded-[4px]">
                              From your course content
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Input Box */}
                      <div className="border border-white/[0.1] rounded-[10px] p-2 px-3 text-[11.5px] text-[#7D7D8A] flex justify-between items-center select-none bg-black/20">
                        <span>Ask about this course…</span>
                        <Send className="w-3.5 h-3.5 text-[#9C9CAA]" />
                      </div>
                    </div>
                  </div>
                </ScaledUiContainer>
              </div>
            </div>

            {/* ROW 2 - LEFT: Domie AI Content Generator (UI on top, Text below) */}
            <div className="bg-[#17171C] border border-white/[0.07] rounded-[20px] p-6 sm:p-7 flex flex-col justify-between">
              {/* UI on Top */}
              <div className="mb-6">
                <ScaledUiContainer baseWidth={460}>
                  <div className="bg-[#1C1C22] border border-white/[0.08] rounded-[16px] p-4 flex flex-col gap-3">
                    {/* Header with animated underline sweep */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11.5px] text-[#D9D3FF] font-medium mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#A48BFF]" />
                        <span>Generating course details…</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#8B6CFF] to-transparent animate-pulse-flow" />
                      </div>
                    </div>

                    {/* Field 1: Title */}
                    <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-2.5">
                      <span className="block text-[10px] uppercase text-[#8A8A96] font-medium mb-0.5">
                        Course Title
                      </span>
                      <b className="block text-[12.5px] text-white font-medium">
                        Full-Stack Web Engineering Bootcamp
                      </b>
                    </div>

                    {/* Field 2: Description */}
                    <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-2.5">
                      <span className="block text-[10px] uppercase text-[#8A8A96] font-medium mb-0.5">
                        Description
                      </span>
                      <p className="text-[12px] text-[#ECECF1] leading-snug">
                        Master modern web architectures, API design, and deployment pipelines.
                      </p>
                    </div>

                    {/* Field 3: Learning Outcomes */}
                    <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-2.5">
                      <span className="block text-[10px] uppercase text-[#8A8A96] font-medium mb-0.5">
                        Learning Outcomes
                      </span>
                      <p className="text-[11.5px] text-[#C5C5D2] leading-snug">
                        • Build production React & Node apps <br />• Deploy containerized services
                        with CI/CD
                      </p>
                    </div>

                    {/* Buttons: Edit & Publish */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        className="px-3 py-1 rounded-[8px] border border-white/[0.12] text-[11.5px] text-[#C9BEFF] hover:bg-white/[0.04]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 rounded-[8px] bg-[#6C4BFF] hover:bg-[#7B5CFF] text-[11.5px] text-white font-medium shadow-[0_2px_8px_rgba(108,75,255,0.4)]"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </ScaledUiContainer>
              </div>

              {/* Text Below */}
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-0.5 text-[12px] text-[#D9D3FF] font-medium mb-3">
                  <Sparkles className="w-3 h-3 text-[#A48BFF]" />
                  {pillLabels.generator}
                </span>
                <h3 className="text-[20px] font-semibold text-white tracking-[-0.02em]">
                  {aiSectionContent.tabs[1]?.title || "Domie AI content generator"}
                </h3>
                <p className="text-[14px] text-[#A9A9B6] leading-relaxed mt-2">
                  {aiSectionContent.tabs[1]?.description}
                </p>
                <ul className="mt-3.5 space-y-1.5 text-[13px] text-[#C5C5D2]">
                  {toolBullets.generator.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#6C4BFF]/20 text-[#A48BFF] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/platform/ai"
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#A48BFF] hover:text-[#C4B5FD] font-medium mt-4 transition-colors group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* ROW 2 - RIGHT: AI Prescriptive Analytics (UI on top, Text below) */}
            <div className="bg-[#17171C] border border-white/[0.07] rounded-[20px] p-6 sm:p-7 flex flex-col justify-between">
              {/* UI on Top */}
              <div className="mb-6">
                <ScaledUiContainer baseWidth={460}>
                  <div className="bg-[#1C1C22] border border-white/[0.08] rounded-[16px] p-4 flex flex-col gap-3">
                    {/* Top KPI Numbers */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-2.5">
                        <small className="text-[10px] uppercase text-[#8A8A96] block">
                          Enrolments
                        </small>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <b className="text-[15px] font-bold text-white">1,342</b>
                          <span className="text-[10px] text-[#3DD68C] font-semibold">▲ 34%</span>
                        </div>
                      </div>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[10px] p-2.5">
                        <small className="text-[10px] uppercase text-[#8A8A96] block">Revenue</small>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <b className="text-[15px] font-bold text-white">₹4.86L</b>
                          <span className="text-[10px] text-[#3DD68C] font-semibold">▲ 31%</span>
                        </div>
                      </div>
                    </div>

                    {/* Dark Bar Chart with 10 Bars and Glowing Pill */}
                    <div className="relative bg-[#141418] border border-white/[0.06] rounded-[10px] p-3 pt-6 pb-2">
                      {/* Floating glowing pill next to last bar */}
                      <span className="absolute top-1.5 right-2 inline-flex items-center gap-1 bg-[#6C4BFF]/25 border border-[#8B6CFF]/50 text-[#D9D3FF] text-[9.5px] px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(108,75,255,0.4)]">
                        <Sparkles className="w-2.5 h-2.5 text-[#A48BFF]" />
                        Domie suggests
                      </span>
                      <div className="flex items-end justify-between h-[60px] gap-1.5 px-1">
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

                    {/* 2 Flag Rows */}
                    <div className="space-y-1.5">
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2 px-2.5 flex items-center justify-between text-[11px] text-[#ECECF1]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                          Coupon WELCOME10 expires Friday
                        </span>
                        <span className="text-[9.5px] text-[#A48BFF] bg-[#6C4BFF]/15 px-1.5 py-0.5 rounded">
                          Review
                        </span>
                      </div>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2 px-2.5 flex items-center justify-between text-[11px] text-[#ECECF1]">
                        <span className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-[#EF4444]" />
                          Frontend React progress below 40%
                        </span>
                        <span className="text-[9.5px] text-[#A48BFF] bg-[#6C4BFF]/15 px-1.5 py-0.5 rounded">
                          Nudge batch
                        </span>
                      </div>
                    </div>
                  </div>
                </ScaledUiContainer>
              </div>

              {/* Text Below */}
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-0.5 text-[12px] text-[#D9D3FF] font-medium mb-3">
                  <Sparkles className="w-3 h-3 text-[#A48BFF]" />
                  {pillLabels.analytics}
                </span>
                <h3 className="text-[20px] font-semibold text-white tracking-[-0.02em]">
                  {aiSectionContent.tabs[2]?.title || "AI prescriptive analytics"}
                </h3>
                <p className="text-[14px] text-[#A9A9B6] leading-relaxed mt-2">
                  {aiSectionContent.tabs[2]?.description}
                </p>
                <ul className="mt-3.5 space-y-1.5 text-[13px] text-[#C5C5D2]">
                  {toolBullets.analytics.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#6C4BFF]/20 text-[#A48BFF] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/platform/ai"
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#A48BFF] hover:text-[#C4B5FD] font-medium mt-4 transition-colors group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* ROW 3: AI Command Bar (Full Width, UI Left, Text Right) */}
            <div className="col-span-full bg-[#17171C] border border-white/[0.07] rounded-[20px] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 items-center">
              {/* UI Left */}
              <div>
                <ScaledUiContainer baseWidth={580}>
                  <div className="bg-[#1C1C22] border border-white/[0.08] rounded-[16px] p-4 flex flex-col gap-3">
                    {/* Search Bar with ⌘K and typed query */}
                    <div className="bg-[#141418] border border-white/[0.1] rounded-[10px] p-2.5 px-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-[#8A8A96]" />
                        <span className="text-[13px] text-white font-medium">refund policy</span>
                        <span className="w-[1.5px] h-4 bg-[#6C4BFF] animate-pulse" />
                      </div>
                      <span className="text-[10px] text-[#8A8A96] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded">
                        esc
                      </span>
                    </div>

                    {/* Results: Group 1 - Admin pages */}
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8A96] font-medium px-1 block mb-1.5">
                        Admin Pages
                      </span>
                      <div className="space-y-1">
                        <div className="bg-[#262436] border border-[#6C4BFF]/30 rounded-[8px] p-2 px-3 flex items-center justify-between text-[12px] text-white">
                          <span className="flex items-center gap-2">
                            <Folder className="w-3.5 h-3.5 text-[#A48BFF]" />
                            <span>Payments › Refunds</span>
                          </span>
                          <span className="text-[10px] text-[#A48BFF] flex items-center gap-1">
                            <CornerDownLeft className="w-3 h-3" /> Jump
                          </span>
                        </div>
                        <div className="bg-transparent rounded-[8px] p-2 px-3 flex items-center justify-between text-[12px] text-[#A9A9B6]">
                          <span className="flex items-center gap-2">
                            <Settings className="w-3.5 h-3.5 text-[#8A8A96]" />
                            <span>Settings › Policies › Terms & Refund Policy</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Results: Group 2 - Answer */}
                    <div className="pt-1 border-t border-white/[0.06]">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8A96] font-medium px-1 block mb-1.5">
                        Answer
                      </span>
                      <div className="bg-[#141418] border border-white/[0.06] rounded-[8px] p-2.5 px-3 text-[12px] text-[#ECECF1] flex items-start gap-2 leading-relaxed">
                        <Sparkles className="w-3.5 h-3.5 text-[#A48BFF] mt-0.5 shrink-0" />
                        <span>
                          Students can request refunds within 7 days of course enrollment before 20%
                          module completion.
                        </span>
                      </div>
                    </div>

                    {/* Keyboard Hints */}
                    <div className="flex items-center gap-4 text-[10.5px] text-[#7D7D8A] pt-1 px-1">
                      <span>↵ Select</span>
                      <span>↑↓ Navigate</span>
                      <span>esc Close</span>
                    </div>
                  </div>
                </ScaledUiContainer>
              </div>

              {/* Text Right */}
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-full px-2.5 py-0.5 text-[12px] text-[#D9D3FF] font-medium mb-3">
                  <Sparkles className="w-3 h-3 text-[#A48BFF]" />
                  {pillLabels.command_bar}
                </span>
                <h3 className="text-[22px] font-semibold text-white tracking-[-0.02em]">
                  {aiSectionContent.tabs[3]?.title || "AI command bar"}
                </h3>
                <p className="text-[14.5px] text-[#A9A9B6] leading-relaxed mt-2">
                  {aiSectionContent.tabs[3]?.description}
                </p>
                <ul className="mt-4 space-y-2 text-[13px] text-[#C5C5D2]">
                  {toolBullets.command_bar.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#6C4BFF]/20 text-[#A48BFF] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" strokeWidth={2.5} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/platform/ai"
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#A48BFF] hover:text-[#C4B5FD] font-medium mt-5 transition-colors group"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 1d. CLOSING LINE & BUTTONS */}
        <div className="mt-14 md:mt-20 text-center flex flex-col items-center">
          <p className="text-[15px] text-[#A9A9B6] max-w-[50ch] mb-6">
            AI that works inside your academy · Included on Pro plan with fair-use limits.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] bg-white hover:bg-[#F2F2F5] text-[#151517] font-semibold text-[15px] transition-all shadow-[0_4px_16px_rgba(255,255,255,0.12)] active:scale-[0.98]"
            >
              Book a 20-minute demo
            </Link>
            <Link
              href="/platform/ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-[12px] border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] transition-colors"
            >
              Learn more about Domie AI
            </Link>
          </div>
        </div>
      </div>

      {/* Post-Section Fade Out (Smooth transition back to #FAFAFA) */}
      <div
        className="pointer-events-none absolute -bottom-[120px] left-1/2 -translate-x-1/2 w-[min(1100px,100%)] h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(139,108,255,0.2)_0%,transparent_70%)] -z-10"
        aria-hidden="true"
      />
    </section>
  );
}

export default DomieAiBand;
