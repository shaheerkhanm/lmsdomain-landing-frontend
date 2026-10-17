"use client";

import React, { useState } from "react";

interface BenefitCard {
  id: string;
  title: string;
  description: string;
  accentColor: string;
  svgGraphic: React.ReactNode;
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: "collaborate",
    title: "Collaborate",
    description:
      "Seamless collaboration by allowing participants to communicate and interact in real-time.",
    accentColor: "#2DD4BF",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-36 drop-shadow-md">
        {/* 3D Isometric Pastel Cloud/Star Shape (Mota 00:26 Exact Motif) */}
        <path
          d="M60 20 L85 45 L75 80 L35 85 L20 50 Z"
          fill="#5EEAD4"
          stroke="#2DD4BF"
          strokeWidth="2"
        />
        <path
          d="M85 45 L105 60 L95 95 L75 80 Z"
          fill="#14B8A6"
        />
        <path
          d="M35 85 L75 80 L65 105 L25 100 Z"
          fill="#0F766E"
        />
      </svg>
    ),
  },
  {
    id: "security",
    title: "Security",
    description:
      "Hardware-level Widevine L1 DRM video protection and isolated single-tenant database schemas.",
    accentColor: "#A78BFA",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-36 drop-shadow-md">
        {/* 3D Isometric Pastel Cube / Lock (Mota Style) */}
        <path
          d="M60 15 L100 38 L60 61 L20 38 Z"
          fill="#C4B5FD"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path
          d="M20 38 L60 61 L60 105 L20 82 Z"
          fill="#8B5CF6"
        />
        <path
          d="M60 61 L100 38 L100 82 L60 105 Z"
          fill="#6D28D9"
        />
      </svg>
    ),
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Autonomous batch attendance tracking, auto-graded quizzes, and automated certificate issuance.",
    accentColor: "#FBBF24",
    svgGraphic: (
      <svg viewBox="0 0 120 120" className="size-28 sm:size-36 drop-shadow-md">
        {/* 3D Isometric Pastel Gear / Disc */}
        <circle cx="60" cy="60" r="38" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="60" cy="60" r="16" fill="#D97706" />
        <rect x="54" y="12" width="12" height="16" rx="3" fill="#FBBF24" />
        <rect x="54" y="92" width="12" height="16" rx="3" fill="#FBBF24" />
        <rect x="12" y="54" width="16" height="12" rx="3" fill="#FBBF24" />
        <rect x="92" y="54" width="16" height="12" rx="3" fill="#FBBF24" />
      </svg>
    ),
  },
];

export function AdvantageScrollMain({ data }: { data?: any }) {
  const [deckIndex, setDeckIndex] = useState(0);

  const nextCard = () => {
    setDeckIndex((prev) => (prev + 1) % BENEFIT_CARDS.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center">
      {/* Interactive Deck Trigger / Instruction */}
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={nextCard}
          className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition-colors flex items-center gap-2"
        >
          <span>Click to cycle cards</span>
          <span className="font-mono text-[11px] text-slate-400">
            ({deckIndex + 1}/{BENEFIT_CARDS.length})
          </span>
          <span>→</span>
        </button>
      </div>

      {/* Angled Stacked Card Container (Mota 00:24 - 00:27 Exact Visual Composition) */}
      <div className="relative w-full max-w-lg h-[340px] sm:h-[380px] flex items-center justify-center cursor-pointer select-none" onClick={nextCard}>
        {BENEFIT_CARDS.map((card, idx) => {
          // Relative position in deck: 0 = front, 1 = middle, 2 = back
          const relativePos = (idx - deckIndex + BENEFIT_CARDS.length) % BENEFIT_CARDS.length;

          // Angular rotation and translation matching Mota reference (-16deg tilt)
          let transformStyle = "";
          let zIndex = 30 - relativePos * 10;
          let opacity = 1;

          if (relativePos === 0) {
            transformStyle = "rotate(-16deg) translate3d(0, 0, 0) scale(1)";
          } else if (relativePos === 1) {
            transformStyle = "rotate(-12deg) translate3d(24px, -18px, 0) scale(0.96)";
            opacity = 0.85;
          } else {
            transformStyle = "rotate(-8deg) translate3d(48px, -36px, 0) scale(0.92)";
            opacity = 0.65;
          }

          return (
            <div
              key={card.id}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
              }}
              className="absolute w-[300px] sm:w-[380px] h-[220px] sm:h-[260px] rounded-[28px] sm:rounded-[32px] bg-white border border-slate-200/90 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.1)] p-5 sm:p-7 flex items-center justify-between transition-all duration-500 ease-out overflow-hidden"
            >
              {/* Internal Grid Paper Pattern (Mota 00:26 Exact Background) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: "radial-gradient(#94A3B8 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Left Text */}
              <div className="relative z-10 max-w-[150px] sm:max-w-[190px] space-y-2">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Right 3D Isometric Pastel Object */}
              <div className="relative z-10 shrink-0">
                {card.svgGraphic}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdvantageScrollMain;
