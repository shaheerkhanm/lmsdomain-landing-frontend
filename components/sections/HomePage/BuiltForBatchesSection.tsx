"use client";

import React from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { AdminDashboardDark } from "@/components/marketing/mockups/screens/AdminDashboardDark";

const PILLARS = [
  { name: "Teach", color: "#7B5CFF" },
  { name: "Assess", color: "#F2894A" },
  { name: "Manage", color: "#17A06B" },
  { name: "Sell", color: "#E2539B" },
  { name: "Brand", color: "#3B82F6" },
  { name: "Domie AI", color: "#C9BEFF" },
  { name: "Security", color: "#9C9CAA" },
];

export function BuiltForBatchesSection() {
  return (
    <section className="py-[clamp(72px,9vw,128px)] font-sans" id="how">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="rv-v4 bg-[#0E0E11] text-white rounded-[28px] pt-[clamp(36px,6vw,72px)] px-[clamp(20px,5vw,64px)] pb-0 relative overflow-hidden isolate glow-warm-bottom">
          {/* Eyebrow */}
          <div className="text-left">
            <Eyebrow tone="gradient">Built for batches</Eyebrow>
            <h2 className="text-[clamp(32px,4.4vw,50px)] font-bold text-white tracking-[-0.035em] leading-[1.04] max-w-[20ch] mt-2">
              One platform for every batch, class and test.
            </h2>
            <p className="text-[#A9A9B6] text-[15px] sm:text-[16px] leading-[1.55] max-w-[62ch] mt-3">
              Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching.
            </p>
          </div>

          {/* Pillar Chips Row */}
          <div
            className="flex flex-wrap justify-center gap-2.5 mt-10 max-w-[720px] mx-auto"
            aria-hidden="true"
          >
            {PILLARS.map((pillar) => (
              <span
                key={pillar.name}
                className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-[10px] px-3.5 py-2 text-[13.5px] text-[#E7E7EE] backdrop-blur-md"
              >
                <i
                  className="w-2 h-2 rounded-[3px] inline-block shrink-0 not-italic"
                  style={{ backgroundColor: pillar.color }}
                />
                <span>{pillar.name}</span>
              </span>
            ))}
          </div>

          {/* Funnel SVG */}
          <div className="flex justify-center mt-4.5" aria-hidden="true">
            <svg
              viewBox="0 0 520 60"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              className="w-[min(520px,80%)] h-[60px]"
            >
              <path d="M20 0C20 40 260 20 260 60" strokeDasharray="4 6" className="animate-funnel-dash" />
              <path d="M140 0C140 40 260 20 260 60" strokeDasharray="4 6" className="animate-funnel-dash" />
              <path d="M260 0V60" strokeDasharray="4 6" className="animate-funnel-dash" />
              <path d="M380 0C380 40 260 20 260 60" strokeDasharray="4 6" className="animate-funnel-dash" />
              <path d="M500 0C500 40 260 20 260 60" strokeDasharray="4 6" className="animate-funnel-dash" />
            </svg>
          </div>

          {/* Glow Frame containing AdminDashboardDark */}
          <div className="relative mt-1 max-w-[980px] mx-auto rounded-t-[16px] p-2.5 pb-0 bg-gradient-to-b from-white/18 to-white/4 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_-20px_80px_-20px_rgba(242,137,74,0.45)]">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5 px-1.5 pb-2.5" aria-hidden="true">
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
            </div>

            {/* Dashboard Component */}
            <AdminDashboardDark />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuiltForBatchesSection;
