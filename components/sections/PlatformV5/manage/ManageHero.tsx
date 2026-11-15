import React from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ManageDemo } from "./ManageDemo";

/*
 * Manage hero: a batch dashboard (roster, attendance, schedule) with a scripted cursor demo,
 * plus two small cards floating on the stage. Sample data only.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

const WEEKS = [88, 92, 85, 96];

export function ManageHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[860px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <ManageDemo />
      </div>

      {/* Floating stage cards (desktop) */}
      <div className="mo-float absolute -top-6 left-6 hidden lg:block xl:left-16" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise flex -rotate-[2deg] items-center gap-2.5 rounded-[14px] border border-[#ECECF1] bg-white py-2.5 pl-2.5 pr-4", shadow)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#F4F5F8] text-[#0A0A0B]">
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12.5px] font-semibold text-[#18181B]">Class reminder emailed</p>
            <p className="text-[11px] text-[#9A9AA6]">Batch B · today&apos;s class at 18:00</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-12 right-6 hidden lg:block xl:right-10" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[230px] rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3.5", shadow)}
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11.5px] text-[#9A9AA6]">Attendance this month</p>
              <p className="font-urbanist text-[24px] font-semibold leading-tight text-[#18181B]">90%</p>
            </div>
            <div className="flex h-10 items-end gap-1.5">
              {WEEKS.map((w, i) => (
                <span
                  key={i}
                  className={cn("w-3 rounded-t-[3px]", i === WEEKS.length - 1 ? "bg-[#0A0A0B]" : "bg-[#E4E4E7]")}
                  style={{ height: `${(w - 70) * 1.6}px` }}
                />
              ))}
            </div>
          </div>
          <p className="mt-1.5 text-[11px] text-[#71717A]">Batch B · 4 weeks</p>
        </div>
      </div>
    </div>
  );
}
