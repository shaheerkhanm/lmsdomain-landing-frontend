"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import type { BillingPeriodId } from "@/types/content";
import {
  formatPrice,
  computePlanPricing,
  PricingPlanV2,
  PricingCurrency,
} from "@/config/pricing";

interface PricingCardProps {
  plan: PricingPlanV2;
  currency: PricingCurrency;
  period: BillingPeriodId;
  annualMode: "monthsFree" | "percent";
  monthsFree: number;
  trialDays: number;
  taxLabel: string;
  previousPlanName?: string;
  onRequestDemo: (planName: string, planSlug: string, billing: BillingPeriodId, currency: PricingCurrency) => void;
  index: number;
  isResolved?: boolean;
}

export function PricingCard({
  plan,
  currency,
  period,
  annualMode,
  monthsFree,
  trialDays,
  taxLabel,
  previousPlanName,
  onRequestDemo,
  index,
  isResolved = true,
}: PricingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const isCustomPrice = Boolean(plan.isCustom || plan.priceMonthly?.[currency] === null);
  const pricing = computePlanPricing(plan, currency, annualMode, monthsFree, taxLabel);

  const displayPrice = period === "yearly" ? pricing.perMonthEquivalent : pricing.monthly;
  const isYearly = period === "yearly" && !isCustomPrice && pricing.yearly !== null;

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onRequestDemo(plan.name, plan.slug, period, currency);
  };

  const formatLimit = (label: string, val: number | "Custom", unit: string) => {
    if (val === "Custom") return "Custom";
    if (typeof val === "number") {
      return `${val.toLocaleString()} ${unit}`.trim();
    }
    return String(val);
  };

  const ctaLabel = isCustomPrice ? "Talk to sales" : `Start ${trialDays}-day free trial`;
  const pop = Boolean(plan.isPopular);
  void formatLimit; // limits live in the comparison table, not on the card

  const FEATURE_COUNT = 5;
  const features = plan.features.slice(0, FEATURE_COUNT);
  const more = plan.features.length - features.length;

  // Text colours flip on the highlighted (filled) card
  const t = pop
    ? { title: "text-white", body: "text-[#B9B6C8]", muted: "text-[#A09CB3]", price: "text-white", rule: "border-white/10" }
    : { title: "text-[#0A0A0B]", body: "text-[#52525B]", muted: "text-[#71717A]", price: "text-[#0A0A0B]", rule: "border-[#ECECF1]" };

  return (
    <div
      style={{ "--rv-delay": `${120 + index * 120}ms` } as React.CSSProperties}
      className={`rv-v4 pc-rise relative isolate flex h-full flex-col rounded-[28px] p-6 font-sans transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 sm:p-7 ${
        pop
          ? "bg-[linear-gradient(170deg,#1C1538_0%,#130F26_45%,#2B1B7A_100%)] ring-1 ring-white/10 shadow-[0_1px_2px_rgba(16,16,24,0.1),0_34px_64px_-28px_rgba(19,15,38,0.7)] hover:shadow-[0_1px_2px_rgba(16,16,24,0.1),0_44px_74px_-28px_rgba(19,15,38,0.75)] lg:pt-9 lg:pb-9"
          : "border border-[#ECECF1] bg-white shadow-[0_1px_2px_rgba(16,16,24,0.04),0_20px_44px_-30px_rgba(16,16,24,0.3)] hover:shadow-[0_1px_2px_rgba(16,16,24,0.04),0_30px_56px_-28px_rgba(16,16,24,0.35)]"
      }`}
    >
      {/* Name, popular tag, who it's for */}
      {pop && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#161616] px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm ring-[3px] ring-white">
          <span className="text-[#F3CF74]" aria-hidden="true">✦</span>
          Most popular
        </span>
      )}
      <div className="flex min-h-[30px] items-center justify-between gap-3">
        <h3 className={`font-urbanist text-[24px] font-semibold tracking-[-0.015em] ${t.title}`}>{plan.name}</h3>
      </div>
      <p className={`mt-1 min-h-[44px] text-[14px] leading-[1.5] ${t.body}`}>
        {plan.audience ? `For ${plan.audience.charAt(0).toLowerCase()}${plan.audience.slice(1)}` : plan.tagline}
      </p>

      {/* Price */}
      <div style={{ "--d": "60ms" } as React.CSSProperties} className="v5-pop relative mt-5 min-h-[78px]">
        {isCustomPrice ? (
          <div>
            <span className={`block font-urbanist text-[44px] font-semibold leading-none tracking-[-0.035em] ${t.price}`}>Custom</span>
            <span className={`mt-2 block text-[13px] ${t.muted}`}>Priced for your academy</span>
          </div>
        ) : (
          displayPrice !== null && (
            <>
              <div className={`pricing-card-price-content w-full ${!isResolved ? "invisible" : ""}`}>
                <div className="flex items-baseline gap-1.5" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`${displayPrice}-${currency}-${period}`}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                      className={`font-urbanist font-semibold leading-none tracking-[-0.04em] tabular-nums ${t.price} ${pop ? "text-[52px]" : "text-[44px]"}`}
                    >
                      {formatPrice(displayPrice, currency)}
                    </motion.span>
                  </AnimatePresence>
                  <span className={`text-[14px] ${t.muted}`}>/ month</span>
                </div>
                <div className={`mt-2 flex flex-wrap items-center gap-2 text-[12.5px] ${t.muted}`}>
                  {isYearly && pricing.yearly !== null ? (
                    <>
                      <span>
                        {formatPrice(pricing.yearly, currency)} billed yearly {taxLabel}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${pop ? "bg-[#6C4BFF]/25 text-[#C9BFFF]" : "bg-[#EDE9FF] text-[#6C4BFF]"}`}>
                        {pricing.yearlySavingsLabel}
                      </span>
                    </>
                  ) : (
                    <span>Billed monthly {taxLabel}</span>
                  )}
                </div>
              </div>
              {!isResolved && (
                <div className="pricing-card-shimmer pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className={`h-10 w-32 animate-pulse rounded-xl ${pop ? "bg-white/20" : "bg-[#ECECEF]"}`} />
                  <div className={`mt-2.5 h-3.5 w-24 animate-pulse rounded ${pop ? "bg-white/15" : "bg-[#F1F1F4]"}`} />
                </div>
              )}
            </>
          )
        )}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={handleCtaClick}
        className={`group mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
          pop
            ? "bg-white text-[#0A0A0B] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-[#F1EDFF] focus-visible:outline-white"
            : "bg-[#0A0A0B] text-white hover:bg-[#27272A] focus-visible:outline-[#6C4BFF]"
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Key features */}
      <div className={`mt-7 border-t pt-6 ${t.rule}`}>
        <p className={`text-[13px] font-semibold ${t.title}`}>
          {plan.includesPrevious && previousPlanName ? `Everything in ${previousPlanName}, plus:` : "Key features:"}
        </p>
        <ul className="mt-3.5 space-y-3">
          {features.map((feat, fIdx) => (
            <li
              key={fIdx}
              style={{ "--d": `${200 + fIdx * 70}ms` } as React.CSSProperties}
              className={`v5-pop flex items-start gap-2.5 text-[14px] leading-[1.45] ${pop ? "text-[#E4E2EE]" : "text-[#3F3F46]"}`}>
              <span
                className={`mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full ${
                  pop ? "bg-[#6C4BFF] text-white" : "bg-[#F1EDFF] text-[#6C4BFF]"
                }`}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
        {more > 0 && (
          <a
            href="#compare"
            className={`mt-4 inline-block text-[13px] font-semibold hover:underline ${pop ? "text-[#B9A9FF]" : "text-[#6C4BFF]"}`}
          >
            + {more} more {more === 1 ? "feature" : "features"}
          </a>
        )}
      </div>
    </div>
  );
}

export default PricingCard;
