"use client";

import React from "react";
import { motion } from "motion/react";
import type { PricingCurrency } from "@/config/pricing";

interface CurrencyToggleProps {
  currency: PricingCurrency;
  onChange: (currency: PricingCurrency) => void;
}

export function CurrencyToggle({ currency, onChange }: CurrencyToggleProps) {
  const options: { id: PricingCurrency; label: string; symbol: string }[] = [
    { id: "INR", label: "INR", symbol: "₹" },
    { id: "USD", label: "USD", symbol: "$" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = (idx + 1) % options.length;
      onChange(options[nextIdx].id);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Currency selection"
      className="inline-flex items-center bg-white border border-[#ECEDEF] rounded-[14px] p-1 shadow-xs select-none"
    >
      {options.map((opt, idx) => {
        const isActive = currency === opt.id;

        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onClick={() => onChange(opt.id)}
            className={`relative min-w-[64px] sm:min-w-[70px] py-2 rounded-[10px] text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1 ${
              isActive ? "text-white" : "text-[#6B6F76] hover:text-[#161616]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="currency-active-pill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
                className="absolute inset-0 bg-[#161616] rounded-[10px] shadow-sm z-0"
              />
            )}
            <span className="relative z-10 font-bold">{opt.symbol}</span>
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CurrencyToggle;
