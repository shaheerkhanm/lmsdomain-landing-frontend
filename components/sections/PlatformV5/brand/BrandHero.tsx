import React from "react";
import { Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandDemo } from "./BrandDemo";

/*
 * Brand hero: site editor with live preview and a scripted cursor demo,
 * plus two small cards floating on the stage. Sample data only.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

export function BrandHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[940px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <BrandDemo />
      </div>

      {/* Floating stage cards (desktop) */}
      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#E8F7EF] text-[#15803D]">
            <Lock className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">SSL certificate active</p>
            <p className="text-[11px] text-[#9A9AA6]">Renews automatically</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 right-6 hidden lg:block xl:right-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[270px] rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3.5", shadow)}
        >
          <p className="flex items-center gap-1.5 text-[10.5px] font-medium text-[#9A9AA6]">
            <Search className="h-3 w-3" /> Search preview
          </p>
          <p className="mt-1.5 truncate text-[11px] text-[#3F3F46]">academy.northwind.com › courses</p>
          <p className="truncate text-[13.5px] font-medium text-[#1A0DAB]">Data Analysis Bootcamp | Northwind</p>
          <p className="mt-0.5 line-clamp-2 text-[11px] leading-[1.45] text-[#52525B]">
            Learn data skills with live mentors. New batches start 3 March.
          </p>
        </div>
      </div>
    </div>
  );
}
