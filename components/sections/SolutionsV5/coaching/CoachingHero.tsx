import React from "react";
import { CalendarRange, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CoachingDemo } from "./CoachingDemo";

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

/** Coaching institutes hero: timetable demo on a grey stage with two floating cards. Sample data only. */
export function CoachingHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[980px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <CoachingDemo />
      </div>

      <div className="mo-float absolute -top-6 right-6 hidden lg:block xl:right-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <CalendarRange className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">3 batches, 1 course</p>
            <p className="text-[11px] text-[#9A9AA6]">Morning, evening and weekend</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 left-6 hidden lg:block xl:left-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[230px] -rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3.5", shadow)}
        >
          <p className="text-[11px] text-[#9A9AA6]">Batch average · last 4 tests</p>
          <div className="mt-1 flex items-end justify-between">
            <p className="font-urbanist text-[24px] font-semibold leading-none text-[#18181B]">71%</p>
            <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-[#15803D]">
              <TrendingUp className="h-3.5 w-3.5" /> +9%
            </span>
          </div>
          <div className="mt-2.5 flex h-8 items-end gap-1.5">
            {[52, 60, 66, 71].map((v, i) => (
              <span key={i} className={cn("flex-1 rounded-t-[3px]", i === 3 ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")} style={{ height: `${v - 30}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
