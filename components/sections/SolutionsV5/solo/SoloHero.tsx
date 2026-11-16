import React from "react";
import { Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SoloDemo } from "./SoloDemo";

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

/** Solo educators hero: creator dashboard demo with two floating cards. Sample data only. */
export function SoloHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[900px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <SoloDemo />
      </div>

      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">learn.miacollins.com</p>
            <p className="text-[11px] text-[#9A9AA6]">Your own domain, with SSL</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 right-6 hidden lg:block xl:right-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[250px] rotate-[2deg] overflow-hidden rounded-[16px] border border-[#ECECF1] bg-white", shadow)}
        >
          <div className="flex items-center gap-2 bg-[#0F766E] px-3 py-2.5 text-white">
            <Globe className="h-3.5 w-3.5" />
            <p className="text-[12px] font-semibold">Mia&apos;s Data Academy</p>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5">
            <div>
              <p className="text-[12px] font-semibold text-[#18181B]">Python for Beginners</p>
              <p className="text-[10.5px] text-[#9A9AA6]">Recorded course</p>
            </div>
            <span className="rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[11px] font-semibold text-white">$59</span>
          </div>
        </div>
      </div>
    </div>
  );
}
