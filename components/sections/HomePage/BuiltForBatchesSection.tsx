"use client";

import React from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { AdminDashboardDark } from "@/components/marketing/mockups/screens/AdminDashboardDark";
import {
  GraduationCap,
  ClipboardCheck,
  CalendarDays,
  CreditCard,
  Palette,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const PILLARS = [
  { name: "Teach", icon: GraduationCap },
  { name: "Assess", icon: ClipboardCheck },
  { name: "Manage", icon: CalendarDays },
  { name: "Sell", icon: CreditCard },
  { name: "Brand", icon: Palette },
  { name: "Domie AI", icon: Sparkles },
  { name: "Security", icon: ShieldCheck },
];

export function BuiltForBatchesSection() {
  return (
    <section className="py-[clamp(72px,9vw,128px)] font-sans" id="how">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="rv-v4 bg-[#0E0E11] text-white rounded-[28px] pt-[clamp(36px,6vw,72px)] px-[clamp(20px,5vw,64px)] pb-0 relative overflow-hidden isolate" style={{ backgroundColor: "#0E0E11" }}>
          {/* Orange -> Pink -> Violet Bottom Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-[260px] -translate-x-1/2 w-[110%] h-[520px] bg-[radial-gradient(closest-side,rgba(242,137,74,0.55),rgba(226,83,155,0.35)_45%,rgba(123,92,255,0.18)_70%,transparent)] -z-10 blur-[10px]"
          />

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
            className="flex flex-wrap xl:flex-nowrap justify-center gap-2 sm:gap-2.5 mt-8 sm:mt-10 max-w-[520px] xl:max-w-none mx-auto"
            aria-hidden="true"
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <span
                  key={pillar.name}
                  className="h-9 inline-flex items-center gap-1.5 sm:gap-2 bg-white/[0.06] border border-white/[0.1] rounded-[10px] px-3 sm:px-3.5 text-[13.5px] sm:text-[14px] text-[#E7E7EE] backdrop-blur-[6px] shrink-0"
                >
                  <Icon className="w-4 h-4 text-white/85 shrink-0" strokeWidth={1.75} />
                  <span>{pillar.name}</span>
                </span>
              );
            })}
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
          <div className="relative mt-1 max-w-[900px] mx-auto rounded-t-[16px] p-2.5 pb-0 bg-gradient-to-b from-white/[0.18] to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_-20px_80px_-20px_rgba(242,137,74,0.45)]">
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
