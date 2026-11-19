import React from "react";
import { cn } from "@/lib/utils";
import { LmsDomainMark } from "@/components/brand/PartnerMarks";
import { NorthwindMark } from "@/components/brand/DemoAcademyLogo";

/* The two app options as one quiet line: small icon, name, plan in grey. */
export function AppOptions({ className, items }: { className?: string; items?: { title: string; plan: string }[] }) {
  const list =
    items && items.length >= 2
      ? items
      : [
          { title: "LMS Domain app", plan: "Every plan" },
          { title: "Your own branded app", plan: "Pro and up" },
        ];
  const icons = [<LmsDomainMark key="l" size={20} />, <span key="n" className="overflow-hidden rounded-[6px]"><NorthwindMark size={20} /></span>];
  return (
    <div className={cn("flex flex-col items-center gap-2 text-[14.5px] sm:flex-row sm:gap-0", className)}>
      {list.slice(0, 2).map((it, i) => (
        <span key={it.title} className={cn("inline-flex items-center gap-2", i === 1 && "sm:ml-5 sm:border-l sm:border-[#E4E4E7] sm:pl-5")}>
          {icons[i]}
          <span className="font-medium text-[#0A0A0B]">{it.title}</span>
          <span className="text-[#71717A]">{it.plan}</span>
        </span>
      ))}
    </div>
  );
}
