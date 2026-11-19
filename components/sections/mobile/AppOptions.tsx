import React from "react";
import { cn } from "@/lib/utils";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";

/*
 * The two app options side by side, each: icon, name, and the plan on its own line underneath.
 * Two equal columns with a hairline between, so they line up on every screen size.
 */
export function AppOptions({ className, items }: { className?: string; items?: { title: string; plan: string }[] }) {
  const list =
    items && items.length >= 2
      ? items
      : [
          { title: "LMS Domain app", plan: "Every plan" },
          { title: "Your own branded app", plan: "Pro and up" },
        ];
  const icons = [
    <span key="l" className="grid h-9 w-9 place-items-center rounded-[10px] bg-white ring-1 ring-[#E4E4E7]"><LmsDomainMark size={22} /></span>,
    <span key="n" className="overflow-hidden rounded-[10px] ring-1 ring-black/5"><NorthwindMark size={36} /></span>,
  ];
  return (
    <div className={cn("inline-grid grid-cols-1 divide-y divide-[#E4E4E7] text-left sm:grid-cols-2 sm:divide-x sm:divide-y-0", className)}>
      {list.slice(0, 2).map((it, i) => (
        <div key={it.title} className={cn("flex items-center gap-3 py-2.5 sm:py-0", i === 0 ? "sm:pr-6" : "sm:pl-6")}>
          <span className="shrink-0">{icons[i]}</span>
          <span className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap text-[14px] font-semibold text-[#0A0A0B] sm:text-[14.5px]">{it.title}</span>
            <span className="mt-0.5 block text-[12px] text-[#71717A] sm:text-[13px]">{it.plan}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
