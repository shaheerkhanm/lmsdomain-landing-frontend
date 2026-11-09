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

  const ctaLabel = isCustomPrice ? "Talk to us" : `Start ${trialDays}-day free trial`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded-[32px] bg-white p-6 sm:p-7 flex flex-col justify-between relative transition-all duration-300 font-urbanist h-full ${
        plan.isPopular
          ? "border-2 border-[#161616] lg:-translate-y-2.5 shadow-xl z-10"
          : "border border-[#ECEDEF] shadow-sm hover:shadow-md z-0"
      }`}
    >
      <div>
        {/* Popular Pill */}
        {plan.isPopular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#161616] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[#F3CF74]">✦</span>
            <span>Most Popular</span>
          </div>
        )}

        {/* Header: Plan Name & Audience Line */}
        <div className="mb-4 text-left">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[22px] font-bold text-[#161616] tracking-tight">
              {plan.name}
            </h3>
          </div>
          {plan.audience && (
            <p className="text-[13px] font-medium text-[#7B5CF5] mt-0.5">
              {plan.audience}
            </p>
          )}
          {plan.tagline && (
            <p className="text-[13px] text-[#6B6F76] leading-snug mt-1.5">
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Price Display */}
        <div className="mb-5 min-h-[82px] flex flex-col items-start justify-center text-left">
          {isCustomPrice ? (
            <div>
              <span className="text-[34px] sm:text-[38px] font-semibold text-[#161616] tracking-tight block">
                Talk to us
              </span>
              <span className="text-[12px] font-medium text-[#6B6F76]">
                Custom capacity & terms
              </span>
            </div>
          ) : (
            displayPrice !== null && (
              <div>
                <div className="flex flex-wrap items-baseline gap-x-1" aria-live="polite">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${displayPrice}-${currency}-${period}`}
                      initial={shouldReduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeInOut" }}
                      className="font-bold text-[38px] sm:text-[44px] text-[#161616] tracking-[-0.02em] tabular-nums"
                    >
                      {formatPrice(displayPrice, currency)}
                    </motion.div>
                  </AnimatePresence>

                  <span className="text-[13px] sm:text-[14px] font-semibold text-[#6B6F76] ml-0.5 whitespace-nowrap">
                    {period === "yearly" ? "/mo" : "/month"}
                    <span className="ml-1 text-[11px] font-normal text-[#8F94A0]">{taxLabel}</span>
                  </span>
                </div>

                {isYearly && pricing.yearly !== null ? (
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[12px] text-[#6B6F76]">
                    <span>Billed yearly: {formatPrice(pricing.yearly, currency)}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#F3CF74]/40 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                      {pricing.yearlySavingsLabel}
                    </span>
                  </div>
                ) : (
                  <div className="text-[12px] font-medium text-[#6B6F76] mt-0.5">
                    Billed monthly
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleCtaClick}
            className={`w-full py-3 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center justify-center gap-1.5 ${
              plan.isPopular
                ? "bg-[#161616] hover:bg-black text-white"
                : "bg-white hover:bg-[#F3F4F6] text-[#161616] border border-[#ECEDEF]"
            }`}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 opacity-70" />
          </button>
        </div>

        {/* 1px Divider */}
        <div className="h-[1px] bg-[#ECEDEF] mb-5" />

        {/* Limits Block */}
        <div className="mb-5 space-y-1.5 text-left text-xs bg-[#F8FAFC] p-3 rounded-2xl border border-[#F1F3F5]">
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#6B6F76]">Active Learners</span>
            <span className="font-semibold text-[#161616]">
              {formatLimit("Learners", plan.limits.activeLearners, "")}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#6B6F76]">Team Seats</span>
            <span className="font-semibold text-[#161616]">
              {formatLimit("Seats", plan.limits.teamSeats, "seats")}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#6B6F76]">Storage</span>
            <span className="font-semibold text-[#161616]">
              {formatLimit("Storage", plan.limits.storageGb, "GB")}
            </span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span className="text-[#6B6F76]">Bandwidth</span>
            <span className="font-semibold text-[#161616]">
              {formatLimit("Bandwidth", plan.limits.bandwidthGbPerMonth, "GB/mo")}
            </span>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2.5 text-left pb-4">
          {plan.includesPrevious && previousPlanName ? (
            <span className="text-[11px] font-bold text-[#7B5CF5] block">
              Everything in {previousPlanName}, plus:
            </span>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F94A0] block">
              What&apos;s included
            </span>
          )}
          <ul className="space-y-2">
            {plan.features.map((feat, fIdx) => (
              <li
                key={fIdx}
                className="flex items-start gap-2 text-xs sm:text-[13px] text-[#161616] leading-snug"
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
