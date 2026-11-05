"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import type { Plan, BillingPeriodId } from "@/types/content";
import { formatPriceParts } from "@/lib/pricing";

interface PricingCardProps {
  plan: Plan;
  period: BillingPeriodId;
  onRequestDemo: (planName: string, planSlug?: string) => void;
  index: number;
  taxLabel?: string;
}

export function PricingCard({
  plan,
  period,
  onRequestDemo,
  index,
  taxLabel = "+ GST",
}: PricingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // "Custom" only when the backend marks the plan. A missing price for the
  // selected period falls back to the other period, labelled "Billed …".
  const isCustomPrice = Boolean(plan.isCustom);
  const shownPeriod: BillingPeriodId | null =
    plan.prices[period] !== null
      ? period
      : plan.prices.monthly !== null
      ? "monthly"
      : plan.prices.yearly !== null
      ? "yearly"
      : null;
  const rawPrice = shownPeriod ? plan.prices[shownPeriod] : null;
  const billedNote =
    shownPeriod && shownPeriod !== period
      ? shownPeriod === "monthly"
        ? "Billed monthly"
        : "Billed yearly"
      : null;

  // Plain-text static price: static numbers rendered as a block, with an
  // optional <=200ms whole-price opacity crossfade on monthly/yearly toggle.
  const renderPriceDisplay = () => {
    if (isCustomPrice) {
      return (
        <span className="text-[34px] sm:text-[40px] font-semibold text-[#161616] tracking-tight">
          {plan.priceNote || "Custom"}
        </span>
      );
    }
    if (typeof rawPrice !== "number" || !shownPeriod) return null;

    const parts = formatPriceParts(rawPrice, plan.currency);
    const fullPrice = parts.map((part) => part.value).join("");
    const firstNumeric = parts.findIndex((part) => part.type === "integer");
    const prefix = parts.slice(0, firstNumeric).filter((part) => part.type === "currency");
    const suffix = parts.slice(firstNumeric).filter((part) => part.type === "currency");
    const numberParts = parts.filter((part) => part.type !== "currency" && part.type !== "literal");
    const numberString = numberParts.map((p) => p.value).join("");

    // Resolve per-period suffix: "/month" for monthly and "/year" for yearly (or CMS-provided)
    const periodSuffix =
      plan.priceSuffixes?.[shownPeriod] ||
      (shownPeriod === "yearly" ? "/year" : plan.priceSuffix || "/month");

    const symbolClass = "text-2xl sm:text-3xl font-semibold text-[#161616] self-start mt-2";

    return (
      <div className="flex flex-wrap items-baseline gap-x-1" aria-live="polite">
        <span className="sr-only">{fullPrice}</span>

        {prefix.map((part, i) => (
          <span key={`pre-${i}`} className={symbolClass} aria-hidden="true">
            {part.value}
          </span>
        ))}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={shownPeriod}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeInOut" }}
            className="flex items-baseline font-semibold text-[46px] sm:text-[56px] text-[#161616] tracking-[-0.02em] tabular-nums"
          >
            {numberString}
          </motion.div>
        </AnimatePresence>

        {suffix.map((part, i) => (
          <span key={`suf-${i}`} className={symbolClass} aria-hidden="true">
            {part.value}
          </span>
        ))}

        <span className="text-[14px] sm:text-[15px] font-medium text-[#6B6F76] ml-1 whitespace-nowrap">
          {periodSuffix || ""}
          <span className="ml-1.5 text-[12px] font-normal">{taxLabel}</span>
        </span>
      </div>
    );
  };

  // Yearly saving as on the live site: monthly × 12 struck through, plus "Save X%";
  // nothing extra when the plan has no discount.
  const showYearlySaving =
    !isCustomPrice &&
    shownPeriod === "yearly" &&
    typeof plan.yearlyFullPrice === "number" &&
    (plan.discountPercent ?? 0) > 0;
  const formatAmount = (amount: number) =>
    formatPriceParts(amount, plan.currency).map((part) => part.value).join("");

  const planSlug = plan.slug || plan.id || plan.name.toLowerCase().replace(/\s+/g, "-");

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRequestDemo(plan.name, planSlug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded-[32px] bg-white p-7 sm:p-8 flex flex-col md:grid md:grid-rows-subgrid md:row-span-4 md:gap-y-0 relative transition-all duration-300 font-urbanist ${
        plan.isPopular
          ? "border-2 border-[#161616] lg:-translate-y-3 shadow-xl z-10"
          : "border border-[#ECEDEF] shadow-sm hover:shadow-md z-0"
      }`}
    >
        {/* Popular Pill */}
        {plan.isPopular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#161616] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
            <span className="text-[#F3CF74]">✦</span>
            <span>Most Popular</span>
          </div>
        )}

        {/* Header: Plan Name & Tagline */}
        <div className="mb-6 text-left">
          <h3 className="text-[20px] font-semibold text-[#161616] tracking-tight mb-1.5">
            {plan.name}
          </h3>
          {plan.tagline && (
            <p className="text-[14px] text-[#6B6F76] leading-relaxed">
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Price Display */}
        <div className="mb-6 min-h-[72px] flex flex-col items-start justify-center text-left">
          {renderPriceDisplay()}
          {billedNote && !isCustomPrice && (
            <span className="text-[12px] font-medium text-[#6B6F76] mt-0.5">{billedNote}</span>
          )}
          {showYearlySaving && (
            <span className="text-[13px] font-medium text-[#6B6F76] mt-0.5 flex items-center gap-2">
              <s className="text-[#8F94A0]">{formatAmount(plan.yearlyFullPrice as number)}</s>
              <span className="px-2 py-0.5 rounded-full bg-[#F3CF74]/40 text-amber-900 text-[11px] font-bold">
                Save {plan.discountPercent}%
              </span>
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleCtaClick}
            className={`w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center justify-center gap-1.5 ${
              plan.isPopular
                ? "bg-[#161616] hover:bg-black text-white"
                : "bg-white hover:bg-[#F3F4F6] text-[#161616] border border-[#ECEDEF]"
            }`}
          >
            <span>{plan.cta.label || "Choose Plan"}</span>
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>
        </div>

        <div>
        {/* 1px Divider */}
        <div className="h-[1px] bg-[#ECEDEF] mb-6" />

        {/* Limits Rows */}
        {plan.limits && plan.limits.length > 0 && (
          <div className="mb-6 space-y-2.5 text-left text-xs">
            {plan.limits.map((limit, lIdx) => (
              <div
                key={lIdx}
                className="flex items-center justify-between py-1 border-b border-[#F8FAFC]"
              >
                <span className="text-[#6B6F76] font-medium">{limit.label}</span>
                <span className="font-semibold text-[#161616]">{limit.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Features List */}
        <div className="space-y-3 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F94A0] block">
            Included Features
          </span>
          <ul className="space-y-2.5">
            {plan.features.map((feat, fIdx) => (
              <li
                key={fIdx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#161616] leading-snug"
              >
                <div className="size-4 rounded-full bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default PricingCard;

