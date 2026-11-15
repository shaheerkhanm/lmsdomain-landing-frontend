import React from "react";
import { Check } from "lucide-react";
import type { MiniCard, MiniTone } from "@/content/solutions/types";
import { cn } from "@/lib/utils";

const TONE: Record<MiniTone, string> = {
  ok: "text-[#15803D] bg-[#E8F7EF]",
  warn: "text-[#B45309] bg-[#FEF4E2]",
  bad: "text-[#B91C1C] bg-[#FDECEC]",
  brand: "text-[#6C4BFF] bg-[#F1EDFF]",
  muted: "text-[#52525B] bg-[#F4F5F8]",
};

/** Small product card drawn from data. */
export function Mini({ card }: { card: MiniCard }) {
  return (
    <div className="h-full rounded-[16px] border border-[#EDEDF1] bg-white p-4 shadow-[0_1px_2px_rgba(16,16,24,0.05),0_16px_36px_-18px_rgba(16,16,24,0.22)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(16,16,24,0.05),0_24px_44px_-18px_rgba(16,16,24,0.3)]">
      <p className="text-[13px] font-semibold text-[#18181B]">{card.title}</p>
      {card.meta && <p className="text-[11px] text-[#9A9AA6]">{card.meta}</p>}
      {card.rows && (
        <div className="mt-3 space-y-1.5">
          {card.rows.map((r, i) => (
            <p
              key={r.label}
              style={{ "--d": `${250 + i * 110}ms` } as React.CSSProperties}
              className="v5-pop flex items-center justify-between gap-3 rounded-[9px] bg-[#F8F8FA] px-2.5 py-1.5 text-[11.5px]"
            >
              <span className="truncate text-[#3F3F46]">{r.label}</span>
              {r.value && (
                <span className={cn("shrink-0 font-semibold tabular-nums", r.tone ? cn("rounded-full px-2 py-0.5 text-[10.5px]", TONE[r.tone]) : "text-[#18181B]")}>
                  {r.value}
                </span>
              )}
            </p>
          ))}
        </div>
      )}
      {card.progress && (
        <div className="mt-3">
          <p className="text-[11.5px] font-medium text-[#3F3F46]">{card.progress.label}</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F1F1F4]">
            <div
              className="v5-fill h-full rounded-full bg-[#0A0A0B]"
              style={{ width: `${card.progress.value}%`, "--w": `${card.progress.value}%` } as React.CSSProperties}
            />
          </div>
        </div>
      )}
      {card.chip && (
        <span
          style={{ "--d": "450ms" } as React.CSSProperties}
          className={cn("v5-pop mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold", TONE[card.chip.tone || "muted"])}
        >
          <Check className="h-3 w-3" strokeWidth={3} /> {card.chip.label}
        </span>
      )}
    </div>
  );
}

