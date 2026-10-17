"use client";

import React, { useState } from "react";

interface TestimonialCard {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  date: string;
}

const TESTIMONIALS: TestimonialCard[] = [
  {
    id: "mark",
    name: "Mark",
    role: "Project Manager",
    avatar: "/assets/img/reference/avatar-mid-left.png",
    quote:
      "The online meeting feature has revolutionized our team's collaboration, enabling us to connect and brainstorm ideas effectively, regardless of our geographical locations.",
    date: "March 17, 2023",
  },
  {
    id: "john",
    name: "John",
    role: "IT Support Specialist",
    avatar: "/assets/img/reference/avatar-top-left.png",
    quote:
      "The remote control feature of this platform has been a game-changer for my IT support team, allowing us to quickly resolve technical issues for our clients with ease.",
    date: "May 2, 2023",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Lead Academy Director",
    avatar: "/assets/img/reference/avatar-mid-right.png",
    quote:
      "The hardware L1 DRM video protection prevented our masterclass courses from leaking online. Single-tenant custom domain hosting gave us complete autonomy.",
    date: "Dec 13, 2022",
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
              className="absolute w-[320px] sm:w-[400px] rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200/90 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 ease-out"
            >
              {/* Header: Avatar, Name, Role, Twitter Bird */}
              <div className="flex items-center justify-between pb-3">
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

                {/* Twitter Bird Icon (Mota 00:28 Exact Icon) */}
                <div className="text-slate-400">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed py-1">
                {t.quote}
              </p>

              {/* Date Metadata */}
              <div className="pt-2 text-[11px] text-slate-400 font-mono">
                {t.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cycle Indicator */}
      <div className="mt-4 text-center">
        <span className="text-[11px] text-slate-400 font-medium">
          Click card to peel away ({activeDeckIndex + 1}/{TESTIMONIALS.length})
        </span>
      </div>
    </div>
  );
}

export default StackedAcademyDeck;
