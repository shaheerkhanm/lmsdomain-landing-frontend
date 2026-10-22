"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import type { BillingPeriod, BillingPeriodId } from "@/types/content";

interface BillingToggleProps {
  periods: BillingPeriod[];
  activePeriod: BillingPeriodId;
  onChange: (period: BillingPeriodId) => void;
  yearlySavingsLabel?: string;
}

export function BillingToggle({
  periods,
  activePeriod,
  onChange,
  // Shown only when the backend provides it; no invented discount.
  yearlySavingsLabel,
}: BillingToggleProps) {
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
    <div className="flex justify-center my-8 font-urbanist select-none">
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label="Billing frequency options"
        className="inline-flex items-center bg-white border border-[#ECEDEF] rounded-[14px] p-1 shadow-xs"
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
              className={`relative px-4 sm:px-5 py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                isActive ? "text-white" : "text-[#6B6F76] hover:text-[#161616]"
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
                  className="absolute inset-0 bg-[#161616] rounded-[10px] shadow-sm z-0"
                />
              )}

              <span className="relative z-10">{period.label}</span>

              {isYearly && yearlySavingsLabel && (
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-[#F3CF74] text-slate-950 shadow-xs"
                      : "bg-[#F3CF74]/30 text-amber-900 border border-amber-300/40"
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

