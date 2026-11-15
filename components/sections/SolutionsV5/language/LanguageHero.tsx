import React from "react";
import { Award, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageDemo } from "./LanguageDemo";

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

/** Language & test-prep hero: essay review demo with two floating cards. Sample data only. */
export function LanguageHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[940px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <LanguageDemo />
      </div>

      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#FEF4E2] text-[#B45309]">
            <Timer className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Practice test 5 · Sat</p>
            <p className="text-[11px] text-[#9A9AA6]">Reading and listening · 90 min</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 right-6 hidden lg:block xl:right-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise flex w-[260px] rotate-[2deg] items-center gap-2.5 rounded-[16px] border border-[#ECECF1] bg-white p-3", shadow)}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#F4F5F8] text-[#0A0A0B]">
            <Award className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">Certificate issued</p>
            <p className="truncate text-[11px] text-[#9A9AA6]">Sofia · Advanced English course</p>
          </div>
        </div>
      </div>
    </div>
  );
}
