"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import type { BillingPeriod, BillingPeriodId } from "@/types/content";

interface BillingToggleProps {
  periods: BillingPeriod[];
  activePeriod: BillingPeriodId;
  onChange: (period: BillingPeriodId) => void;
  yearlySavingsLabel?: string;
  tone?: "light" | "dark";
}

export function BillingToggle({
  periods,
  activePeriod,
  onChange,
  // Shown only when the backend provides it; no invented discount.
  yearlySavingsLabel,
  tone = "light",
}: BillingToggleProps) {
  const dark = tone === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIdx = (idx + 1) % periods.length;
      onChange(periods[nextIdx].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIdx = (idx - 1 + periods.length) % periods.length;
      onChange(periods[nextIdx].id);
    }
  };

  return (
    <div className="flex justify-center font-sans select-none">
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label="Billing frequency options"
        className={`inline-flex items-center rounded-full p-1 ${dark ? "border border-white/10 bg-white/[0.05] backdrop-blur" : "bg-[#F1F1F4]"}`}
      >
        {periods.map((period, idx) => {
          const isActive = activePeriod === period.id;
          const isYearly = period.id === "yearly";

          return (
            <button
              key={period.id}
              role="radio"
              aria-checked={isActive}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onClick={() => onChange(period.id)}
              className={`relative px-4 sm:px-5 py-2 rounded-full text-[13.5px] font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#6C4BFF] ${
                isActive ? "text-[#0A0A0B]" : dark ? "text-[#A1A1AA] hover:text-white" : "text-[#71717A] hover:text-[#0A0A0B]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="billing-active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                  className="absolute inset-0 bg-white rounded-full shadow-[0_1px_2px_rgba(10,10,11,0.08),0_2px_8px_-2px_rgba(10,10,11,0.08)] z-0"
                />
              )}

              <span className="relative z-10">{period.label}</span>

              {isYearly && yearlySavingsLabel && (
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                    isActive ? "bg-[#6C4BFF] text-white" : dark ? "bg-[#6C4BFF]/20 text-[#C9BFFF]" : "bg-[#EDE9FF] text-[#6C4BFF]"
                  }`}
                >
                  {yearlySavingsLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BillingToggle;

