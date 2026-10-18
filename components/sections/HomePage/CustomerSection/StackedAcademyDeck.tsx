"use client";

import React, { useState } from "react";

interface TestimonialCard {
  id: string;
  tag: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  footerTag: string;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: "partner-1",
    tag: "ACADEMY SPOTLIGHT",
    name: "Enterprise Academy Spotlight",
    role: "Partner Case Study Placeholder",
    avatar: "/assets/img/reference/avatar-mid-right.png",
    quote:
      "Reserved for enterprise partner case study. Verified cohort completion metrics, graduation telemetry, and custom domain deployment architecture will appear here upon partner program onboarding.",
    footerTag: "Partner Verification Program",
  },
  {
    id: "partner-2",
    tag: "INSTITUTIONAL SPOTLIGHT",
    name: "Professional Training Spotlight",
    role: "Clinical & Continuing Ed Placeholder",
    avatar: "/assets/img/reference/avatar-mid-left.png",
    quote:
      "Reserved for institutional partner case study. Verified compliance telemetry, student assessment performance, and board certification data will appear here following accredited cohort launch.",
    footerTag: "Accredited Cohort Telemetry",
  },
  {
    id: "partner-3",
    tag: "PARTNER SHOWCASE",
    name: "Global Academy Spotlight",
    role: "Global Learning Platform Showcase",
    avatar: "/assets/img/reference/avatar-top-left.png",
    quote:
      "Reserved for early adopter academy spotlight. Custom branding, dedicated learning experiences, and online course workflows will be featured here.",
    footerTag: "Feature Your Academy",
  },
];

export function StackedAcademyDeck() {
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  const cycleCard = () => {
    setActiveDeckIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Testimonial Cards Stack (Mota 00:28 - 00:31 Exact Visual Stack) */}
      <div
        className="relative w-full max-w-md h-[260px] sm:h-[280px] flex items-center justify-center cursor-pointer select-none"
        onClick={cycleCard}
      >
        {TESTIMONIALS.map((t, idx) => {
          const relativePos = (idx - activeDeckIndex + TESTIMONIALS.length) % TESTIMONIALS.length;

          let transformStyle = "";
          let zIndex = 30 - relativePos * 10;
          let opacity = 1;

          if (relativePos === 0) {
            transformStyle = "translate3d(0, 0, 0) rotate(-1deg) scale(1)";
          } else if (relativePos === 1) {
            transformStyle = "translate3d(8px, 16px, 0) rotate(2deg) scale(0.96)";
            opacity = 0.85;
          } else {
            transformStyle = "translate3d(-8px, 30px, 0) rotate(-2deg) scale(0.92)";
            opacity = 0.65;
          }

          return (
            <div
              key={t.id}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
              }}
              className="absolute w-[320px] sm:w-[420px] rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 ease-out"
            >
              {/* Header: Avatar, Name, Role, Spotlight Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="size-9 sm:size-10 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {t.role}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {t.tag}
                </span>
              </div>

              {/* Quote Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed py-2">
                "{t.quote}"
              </p>

              {/* Footer Tag */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-medium text-slate-600">{t.footerTag}</span>
                <span className="font-mono">Spotlight Preview</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cycle Indicator & Attribution */}
      <div className="mt-4 text-center">
        <span className="text-[11px] text-slate-400 font-medium">
          Click card to peel away ({activeDeckIndex + 1}/{TESTIMONIALS.length}) • Partner Spotlight Showcase
        </span>
      </div>
    </div>
  );
}

export default StackedAcademyDeck;
