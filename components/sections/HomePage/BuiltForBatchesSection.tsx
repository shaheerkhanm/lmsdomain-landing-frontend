"use client";

import React from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { AdminDashboardDark } from "@/components/marketing/mockups/screens/AdminDashboardDark";
import { useInsetPanelProgress } from "@/hooks/useInsetPanelProgress";
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
  const { containerRef, panelRef, contentRef } = useInsetPanelProgress();

  return (
    <div ref={containerRef} className="relative w-full bg-white overflow-hidden isolate" id="how">
      <section
        ref={panelRef}
        className="py-[clamp(56px,7vw,96px)] bg-[#0E0E11] text-white relative overflow-hidden isolate font-sans origin-center will-change-[transform,clip-path]"
      >
        {/* Orange -> Pink -> Violet Bottom Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -bottom-[260px] -translate-x-1/2 w-[110%] h-[520px] bg-[radial-gradient(closest-side,rgba(242,137,74,0.55),rgba(226,83,155,0.35)_45%,rgba(123,92,255,0.18)_70%,transparent)] -z-10 blur-[10px]"
        />

        <div
          ref={contentRef}
          className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] relative z-10 will-change-[transform,opacity]"
        >
          {/* Eyebrow with pink accent dot */}
          <div className="rv-v4 text-left">
            <Eyebrow dotColor="#E2539B">Built for batches</Eyebrow>
            <h2 className="text-[clamp(32px,4.4vw,50px)] font-bold text-white tracking-[-0.035em] leading-[1.04] max-w-[20ch] mt-2">
              One platform for every batch, class and test.
            </h2>
            <p className="text-[#A9A9B6] text-[15px] sm:text-[16px] leading-[1.55] max-w-[62ch] mt-3">
              Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching.
            </p>
          </div>

          {/* Restored Pillar Chips Row (tightened to 20px below subtitle) */}
          <div
            className="rv-v4 flex flex-wrap xl:flex-nowrap justify-center gap-2 sm:gap-2.5 mt-5 max-w-[520px] xl:max-w-none mx-auto"
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

          {/* Restored Funnel SVG Animation */}
          <div className="flex justify-center mt-3.5" aria-hidden="true">
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

          {/* Glow Frame containing AdminDashboardDark (tightened to 32px below funnel, cropped to 560px with soft 120px bottom fade) */}
          <div className="rv-v4 relative mt-8 max-w-[1040px] mx-auto rounded-t-[16px] p-2.5 pb-0 bg-gradient-to-b from-white/[0.18] to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_-20px_80px_-20px_rgba(242,137,74,0.45)]">
            {/* Window Dots */}
            <div className="flex items-center gap-1.5 px-1.5 pb-2.5" aria-hidden="true">
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
              <span className="w-[9px] h-[9px] rounded-full bg-white/30" />
            </div>

            {/* Dashboard Component Cropped with Soft Bottom Fade into Dark Panel */}
            <div className="max-h-[560px] max-[640px]:max-h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_calc(100%-120px),transparent_100%)]">
              <AdminDashboardDark />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BuiltForBatchesSection;
