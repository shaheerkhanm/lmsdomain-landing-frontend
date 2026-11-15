import React from "react";
import { Lock, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { SecurityDemo } from "./SecurityDemo";

/*
 * Security hero: settings window with a scripted cursor demo,
 * plus two small cards floating on the stage. Sample data only.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

export function SecurityHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[900px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <SecurityDemo />
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
            <p className="text-[12.5px] font-semibold text-[#18181B]">Encrypted with TLS</p>
            <p className="text-[11px] text-[#9A9AA6]">HTTPS on academy.northwind.com</p>
          </div>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 right-6 hidden lg:block xl:right-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise flex w-[250px] rotate-[2deg] items-center gap-2.5 rounded-[16px] border border-[#ECECF1] bg-white p-3", shadow)}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#FDECEC] text-[#B91C1C]">
            <Tablet className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-semibold text-[#18181B]">New sign-in blocked</p>
            <p className="truncate text-[11px] text-[#9A9AA6]">Device limit reached · Kenji</p>
          </div>
        </div>
      </div>
    </div>
  );
}
