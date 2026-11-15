import React from "react";
import { Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrainingDemo } from "./TrainingDemo";

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

/** Training companies hero: client cohort demo with two floating cards. Sample data only. */
export function TrainingHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[920px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <TrainingDemo />
      </div>

      <div className="mo-float absolute -top-6 right-6 hidden lg:block xl:right-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <Video className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Live session · Thu 10:00</p>
            <p className="text-[11px] text-[#9A9AA6]">Northwind Retail · Pivot tables</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-12 left-6 hidden lg:block xl:left-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[250px] -rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-1.5", shadow)}
        >
          <div className="rounded-[12px] border border-[#ECECF1] px-4 py-3 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9A9AA6]">Certificate of completion</p>
            <p className="mt-1 font-urbanist text-[16px] font-semibold text-[#18181B]">Kenji Tanaka</p>
            <p className="text-[10.5px] text-[#71717A]">Data skills · Northwind Retail</p>
          </div>
        </div>
      </div>
    </div>
  );
}
