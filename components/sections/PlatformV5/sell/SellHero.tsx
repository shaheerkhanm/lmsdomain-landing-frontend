import React from "react";
import { ArrowDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SellDemo } from "./SellDemo";
import { BrandMark } from "@/components/brand/PartnerMarks";

/*
 * Sell hero: the academy's own checkout with a scripted cursor demo,
 * plus two small cards floating on the stage. Sample data only.
 */

const shadow = "shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_56px_-24px_rgba(16,16,24,0.28)]";

export function SellHero() {
  return (
    <div aria-hidden="true" className="rv-v4 relative rounded-[32px] bg-[#F4F5F8] p-3 sm:rounded-[40px] sm:p-8 lg:p-12">
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(#DCDCE3_1px,transparent_1px)] bg-[size:18px_18px] opacity-60 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,#000_100%)]" />

      <div className={cn("relative mx-auto max-w-[880px] overflow-hidden rounded-[20px] border border-[#ECECF1] bg-white", shadow)}>
        <SellDemo />
      </div>

      {/* Floating stage cards (desktop) */}
      <div className="mo-float absolute -top-6 right-6 hidden lg:block xl:right-12" style={{ "--fd": "0s" } as React.CSSProperties}>
        <div
          style={{ "--d": "900ms" } as React.CSSProperties}
          className={cn("v5-rise w-[236px] rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3.5", shadow)}
        >
          <p className="inline-flex items-center gap-1.5 text-[11px] text-[#9A9AA6]"><BrandMark name="Stripe" size={12} className="rounded-[3px]" /> Paid to your Stripe account</p>
          <p className="font-urbanist text-[24px] font-semibold tabular-nums text-[#15803D]">+$199.00</p>
          <span className="mt-1 inline-block rounded-full bg-[#F1EDFF] px-2 py-0.5 text-[10.5px] font-semibold text-[#6C4BFF]">0% commission</span>
        </div>
      </div>

      <div className="mo-float absolute -bottom-10 left-6 hidden lg:block xl:left-12" style={{ "--fd": "-3s" } as React.CSSProperties}>
        <div
          style={{ "--d": "1050ms" } as React.CSSProperties}
          className={cn("v5-rise w-[250px] -rotate-[2deg] rounded-[16px] border border-[#ECECF1] bg-white p-3", shadow)}
        >
          <p className="px-1 text-[11.5px] font-semibold text-[#18181B]">Today&apos;s sales</p>
          {[
            { t: "Course sale · Razorpay", a: "+₹4,999" },
            { t: "Bootcamp · Stripe", a: "+€183.00" },
          ].map((r) => (
            <div key={r.t} className="mt-2 flex items-center gap-2.5 rounded-[10px] bg-[#F8F8FA] px-2 py-1.5">
              <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#E8F7EF] text-[#15803D]">
                <ArrowDownLeft className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 truncate text-[11.5px] text-[#3F3F46]">{r.t}</span>
              <span className="text-[11.5px] font-semibold tabular-nums text-[#18181B]">{r.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
