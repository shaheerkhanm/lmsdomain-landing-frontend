"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plan, BillingPeriodId } from "@/types/content";
import { formatPriceParts } from "@/lib/pricing";

export interface PlanCardProps {
  plan: Plan;
  period?: BillingPeriodId;
  onRequestDemo?: (planName: string, planSlug?: string) => void;
  taxLabel?: string;
  className?: string;
  index?: number;
}

export function PlanCard({
  plan,
  period = "monthly",
  onRequestDemo,
  taxLabel = "+ GST",
  className,
  index = 0,
}: PlanCardProps) {
  const isCustomPrice = Boolean(plan.isCustom);
  const shownPeriod: BillingPeriodId | null =
    plan.prices?.[period] !== null && plan.prices?.[period] !== undefined
      ? period
      : plan.prices?.monthly !== null && plan.prices?.monthly !== undefined
      ? "monthly"
      : plan.prices?.yearly !== null && plan.prices?.yearly !== undefined
      ? "yearly"
      : null;

  const rawPrice = shownPeriod && plan.prices ? plan.prices[shownPeriod] : null;

  const renderPrice = () => {
    if (isCustomPrice) {
      return (
        <span className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight">
          {plan.priceNote || "Custom"}
        </span>
      );
    }
    if (typeof rawPrice !== "number" || !shownPeriod) {
      return (
        <span className="text-3xl font-semibold text-[#161616] tracking-tight">
          Contact us
        </span>
      );
    }

    const parts = formatPriceParts(rawPrice, plan.currency);
    const formatted = parts.map((p) => p.value).join("");
    const periodLabel = shownPeriod === "yearly" ? "/year, billed annually" : "/month";

    return (
      <div className="flex flex-col items-start">
        <div className="flex items-baseline gap-1">
          {/* Static number, never animated */}
          <span className="text-3xl sm:text-4xl font-semibold text-[#161616] tracking-tight">
            {formatted}
          </span>
          <span className="text-xs sm:text-sm text-[#6B6F76] font-normal">
            {periodLabel}
          </span>
          {taxLabel && (
            <span className="text-[11px] font-semibold text-[#8F94A0] uppercase ml-1">
              {taxLabel}
            </span>
          )}
        </div>
      </div>
    );
  };

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRequestDemo) {
      onRequestDemo(plan.name, plan.slug || plan.id);
    } else {
      // Default to /demo or /#demo
      if (typeof window !== "undefined") {
        window.location.href = `/#demo?plan=${encodeURIComponent(plan.slug || plan.id || "")}`;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.08, 0.24), ease: "easeOut" }}
      className={cn(
        "rounded-3xl bg-white p-7 sm:p-8 flex flex-col justify-between relative font-urbanist border transition-shadow duration-200",
        plan.isPopular
          ? "border-[#161616] shadow-xl ring-1 ring-[#161616]/10"
          : "border-[#EAE8E2] shadow-sm hover:shadow-md",
        className
      )}
    >
      <div>
        {/* Popular Pill */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#161616] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs flex items-center gap-1.5 select-none">
            <span className="text-[#F3CF74]">✦</span>
            <span>Most Popular</span>
          </div>
        )}

        {/* Card Header */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-[#161616] tracking-tight mb-2">
            {plan.name}
          </h3>
          {plan.tagline && (
            <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Static Price Area */}
        <div className="mb-6 min-h-[56px] flex items-center">
          {renderPrice()}
        </div>

        {/* Plan Limits */}
        {plan.limits && plan.limits.length > 0 && (
          <div className="mb-6 py-3 border-y border-[#F0EFEA] space-y-2 text-xs">
            {plan.limits.map((lim, lIdx) => (
              <div key={lIdx} className="flex items-center justify-between">
                <span className="text-[#6B6F76]">{lim.label}</span>
                <span className="font-semibold text-[#161616]">{lim.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Feature List */}
        {plan.features && plan.features.length > 0 && (
          <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-[#161616]" aria-label={`${plan.name} features`}>
            {plan.features.slice(0, 10).map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5">
                <Check className="size-4 text-[#7B5CF5] shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={handleCta}
        className={cn(
          "w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center justify-center gap-1.5",
          plan.isPopular
            ? "bg-[#161616] hover:bg-black text-white"
            : "bg-[#FAF9F6] hover:bg-[#F3F4F6] text-[#161616] border border-[#EAE8E2]"
        )}
      >
        <span>{plan.cta?.label || "Choose Plan"}</span>
        <ArrowRight className="size-4 opacity-75" />
      </button>
    </motion.div>
  );
}

export default PlanCard;
