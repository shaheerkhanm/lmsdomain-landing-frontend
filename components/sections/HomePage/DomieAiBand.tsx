"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { aiSectionContent } from "@/content/home/ai";
import { heroContent } from "@/content/home/hero";

const AI_ICONS: Record<string, React.ReactNode> = {
  tutor: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]">
      <path d="M4 5h12v8H8l-4 3z" />
    </svg>
  ),
  generator: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]">
      <path d="M10 2.5l1.8 4.2 4.2 1.8-4.2 1.8L10 14.5l-1.8-4.2L4 8.5l4.2-1.8z" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]">
      <path d="M3 16h14M5 13l3-4 3 2 4-6" />
    </svg>
  ),
  command_bar: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]">
      <circle cx="9" cy="9" r="5" />
      <path d="m13 13 4 4" />
    </svg>
  ),
};

export function DomieAiBand() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const aiTutorCard = heroContent.cards?.find((c) => c.type === "ai_tutor");
  const question = aiTutorCard?.question || "What's the difference between a quiz and an assignment?";
  const answer =
    aiTutorCard?.answer ||
    "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor review.";

  // Typing indicator -> show answer after scroll into view
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
          const timer = setTimeout(() => {
            setShowAnswer(true);
          }, 1100);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasScrolledIn]);

  // Cycle tools highlight every 3.2s
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % aiSectionContent.tabs.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-[clamp(72px,9vw,128px)] bg-[#0E0E11] text-white relative overflow-hidden isolate font-sans" id="ai">
      {/* Violet Glow */}
      <div
        className="pointer-events-none absolute left-1/2 -bottom-[300px] -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(closest-side,rgba(123,92,255,0.55),rgba(226,83,155,0.3)_50%,transparent)] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1080px] mx-auto px-5">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-white/8 border border-white/14 rounded-full px-2.5 py-1 text-xs text-[#D9D3FF] mb-4">
            ✦ Pro plan
          </span>
          <br />
          <Eyebrow tone="gradient">Domie AI</Eyebrow>
          <h2 className="type-h2-v4 text-white mt-1">
            {aiSectionContent.title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#A9A9B6] leading-[1.55] max-w-[62ch] mt-3">
            {aiSectionContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 mt-11 items-start">
          {/* Left: Chat Window */}
          <div
            ref={chatRef}
            className="bg-[#16161B] border border-white/10 rounded-[18px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-3.5 px-4.5 border-b border-white/8">
              <span className="w-9 h-9 rounded-full bg-[#2A2440] overflow-hidden shrink-0 relative block">
                <Image
                  src="/images/ai/domie/domie-bot-sm.webp"
                  alt="Domie"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </span>
              <div>
                <b className="block text-[14px] text-white">Domie</b>
                <small className="text-[#9C9CAA] text-xs">
                  HelpDesk AI tutor · Full-Stack Web Engineering
                </small>
              </div>
              <span className="ml-auto text-[11.5px] text-[#7EE2B8] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
                Online
              </span>
            </div>

            {/* Chat Messages */}
            <div className="p-5 px-4.5 flex flex-col gap-3.5 min-h-[300px]">
              {/* Question */}
              <div className="max-w-[85%] text-[14px] p-3 px-3.5 rounded-[14px] bg-[#262436] text-[#ECEAF8] self-end rounded-br-[4px] leading-relaxed">
                {question}
              </div>

              {/* Typing Indicator */}
              {!showAnswer && (
                <div className="self-start flex items-center gap-1 bg-white/8 p-2.5 px-3.5 rounded-[14px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9C9CAA] animate-typing-dot [animation-delay:0.3s]" />
                </div>
              )}

              {/* Answer */}
              {showAnswer && (
                <div className="max-w-[85%] text-[14px] p-3 px-3.5 rounded-[14px] bg-white/8 text-[#ECECF1] self-start rounded-bl-[4px] leading-relaxed animate-in fade-in duration-300">
                  {answer}
                  <span className="block mt-1.5 text-[11px] text-[#A9A9B6] bg-white/8 px-2 py-0.5 rounded-[6px] w-fit">
                    From your course content
                  </span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="m-3.5 mt-0 border border-white/12 rounded-[12px] p-2.5 px-3.5 text-[13.5px] text-[#7D7D8A] flex justify-between items-center select-none">
              <span>Ask about this course…</span>
              <span className="text-[#9C9CAA]">↵</span>
            </div>
          </div>

          {/* Right: 4 AI Tool Cards */}
          <div
            className="grid gap-2.5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {aiSectionContent.tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`border rounded-[14px] p-4 px-4.5 grid grid-cols-[34px_1fr] gap-3.5 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#6C4BFF]/12 border-[#A08CFF]/45"
                      : "bg-white/3 border-white/10 hover:bg-white/5"
                  }`}
                >
                  <span className="w-[34px] h-[34px] rounded-[10px] bg-white/8 flex items-center justify-center text-[#C9BEFF] shrink-0">
                    {AI_ICONS[tab.id] ?? (
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[17px] h-[17px]">
                        <path d="M4 5h12v8H8l-4 3z" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <b className="text-[15px] font-semibold text-white block mb-0.5">
                      {tab.title}
                    </b>
                    <p className="text-[#A9A9B6] text-[13.5px] leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DomieAiBand;
