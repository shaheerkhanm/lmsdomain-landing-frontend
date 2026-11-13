"use client";

import React from "react";
import { Eyebrow } from "@/components/marketing/ui";
import { AdminDashboardDark } from "@/components/marketing/mockups/screens/AdminDashboardDark";
import { CalendarDays, Users, Video } from "lucide-react";

export function BuiltForBatchesSection() {
  return (
    <section className="py-[clamp(72px,9vw,128px)] font-sans" id="how">
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="bg-[#0E0E11] text-white rounded-[28px] pt-[clamp(36px,6vw,72px)] px-[clamp(20px,5vw,64px)] pb-0 relative overflow-hidden isolate">
          {/* Orange -> Pink -> Violet Bottom Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-[260px] -translate-x-1/2 w-[110%] h-[520px] bg-[radial-gradient(closest-side,rgba(242,137,74,0.55),rgba(226,83,155,0.35)_45%,rgba(123,92,255,0.18)_70%,transparent)] -z-10 blur-[10px]"
          />

          {/* Eyebrow with Pink dot */}
          <div className="rv-v4 text-left">
            <Eyebrow dotColor="#E2539B">Built for batches</Eyebrow>
            <h2 className="text-[clamp(32px,4.4vw,50px)] font-bold text-white tracking-[-0.035em] leading-[1.04] max-w-[20ch] mt-2">
              One platform for every batch, class and test.
            </h2>
            <p className="text-[#A9A9B6] text-[15px] sm:text-[16px] leading-[1.55] max-w-[62ch] mt-3">
              Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching.
            </p>
          </div>

          {/* Mini Calendar / Week Strip & Attendance Bar (Replaces generic pillar tiles, §2d) */}
          <div className="rv-v4 mt-8 sm:mt-10 max-w-[840px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-3 sm:gap-4 items-center">
            {/* Week Strip */}
            <div className="bg-white/[0.05] border border-white/[0.1] rounded-[14px] p-3 px-4 flex items-center justify-between gap-3 text-[12.5px] backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#E7E7EE] shrink-0">
                <CalendarDays className="w-4 h-4 text-[#E2539B]" strokeWidth={2} />
                <span className="font-semibold">Batch Schedule:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-end font-mono text-[11px]">
                <span className="bg-[#E2539B] text-white px-2 py-0.5 rounded-[5px] font-semibold">
                  Mon · 7 PM
                </span>
                <span className="text-[#8C8C98] px-1.5 py-0.5">Wed · 7 PM</span>
                <span className="text-[#8C8C98] px-1.5 py-0.5">Fri · 7 PM</span>
              </div>
            </div>

            {/* Attendance Bar */}
            <div className="bg-white/[0.05] border border-white/[0.1] rounded-[14px] p-3 px-4 flex items-center justify-between gap-3 text-[12.5px] backdrop-blur-md">
              <div className="flex items-center gap-2 text-[#E7E7EE] shrink-0">
                <Users className="w-4 h-4 text-[#E2539B]" strokeWidth={2} />
                <span className="font-semibold">Batch B Attendance:</span>
              </div>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E2539B] rounded-full" style={{ width: "94%" }} />
                </div>
                <span className="font-mono font-bold text-[#E2539B] text-[12px]">
                  94%
                </span>
              </div>
            </div>
          </div>

          {/* Glow Frame containing AdminDashboardDark */}
          <div className="rv-v4 relative mt-7 max-w-[1040px] mx-auto rounded-t-[16px] p-2.5 pb-0 bg-gradient-to-b from-white/[0.18] to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_-20px_80px_-20px_rgba(242,137,74,0.45)]">
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