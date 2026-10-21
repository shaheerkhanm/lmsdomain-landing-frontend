"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import type { Plan, BillingPeriodId, CurrencyConfig } from "@/types/content";

interface PricingCardProps {
  plan: Plan;
  period: BillingPeriodId;
  currency: CurrencyConfig;
  onRequestDemo: (planName: string) => void;
  index: number;
}

export function PricingCard({
  plan,
  period,
  currency,
  onRequestDemo,
  index,
}: PricingCardProps) {
  const rawPrice = plan.prices[period];
  const isCustomPrice = rawPrice === null;

  // Format price string with Intl.NumberFormat if numeric
  let formattedNumber = "";
  if (!isCustomPrice && typeof rawPrice === "number") {
    formattedNumber = new Intl.NumberFormat("en-US").format(rawPrice);
  }

  const currencySymbol = currency.symbol || "";

  // Render per-digit animated price string
  const renderPriceDisplay = () => {
    if (isCustomPrice) {
      return (
        <span className="text-[34px] sm:text-[40px] font-semibold text-[#161616] tracking-tight">
          {plan.priceNote || "Custom"}
        </span>
      );
    }

    const digits = formattedNumber.split("");

    return (
      <div className="flex items-baseline gap-1" aria-live="polite">
        {currencySymbol && (
          <span className="text-2xl sm:text-3xl font-semibold text-[#161616] self-start mt-2">
            {currencySymbol}
          </span>
        )}

        <div className="flex overflow-hidden h-[64px] items-baseline font-mono font-semibold text-[46px] sm:text-[56px] text-[#161616] tracking-[-0.02em] tabular-nums">
          <AnimatePresence mode="popLayout" initial={false}>
            {digits.map((digit, i) => (
              <motion.span
                key={`${period}-${i}-${digit}`}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {digit}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {plan.priceSuffix && (
          <span className="text-[14px] sm:text-[15px] font-medium text-[#6B6F76] ml-1">
            {plan.priceSuffix}
          </span>
        )}
      </div>
    );
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    if (plan.cta.action === "demo") {
      e.preventDefault();
      onRequestDemo(plan.name);
    }
  };

  const ctaHref =
    plan.cta.action === "demo"
      ? "#"
      : plan.cta.action === "contact"
      ? `/contact?topic=sales&plan=${encodeURIComponent(plan.name)}`
      : `/signup?plan=${encodeURIComponent(plan.slug || plan.id)}&billing=${period}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded-[32px] bg-white p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-300 font-urbanist ${
        plan.isPopular
          ? "border-2 border-[#161616] lg:-translate-y-3 shadow-xl z-10"
          : "border border-[#ECEDEF] shadow-sm hover:shadow-md z-0"
      }`}
    >
      <div>
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
            <p className="text-[14px] text-[#6B6F76] leading-relaxed line-clamp-2">
              {plan.tagline}
            </p>
          )}
        </div>

        {/* Price Display */}
        <div className="mb-6 h-[72px] flex items-center justify-start text-left">
          {renderPriceDisplay()}
        </div>

        {/* CTA Button */}
        <div className="mb-6">
          {plan.cta.action === "demo" ? (
            <button
              type="button"
              onClick={handleCtaClick}
              className={`w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                plan.isPopular
                  ? "bg-[#161616] hover:bg-black text-white"
                  : "bg-white hover:bg-[#F3F4F6] text-[#161616] border border-[#ECEDEF]"
              }`}
            >
              {plan.cta.label}
            </button>
          ) : (
            <Link
              href={ctaHref}
              onClick={handleCtaClick}
              className={`w-full py-3.5 px-5 rounded-full text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center justify-center gap-1.5 ${
                plan.isPopular
                  ? "bg-[#161616] hover:bg-black text-white"
                  : "bg-white hover:bg-[#F3F4F6] text-[#161616] border border-[#ECEDEF]"
              }`}
            >
              <span>{plan.cta.label}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </Link>
          )}
        </div>

        {/* 1px Divider */}
        <div className="h-[1px] bg-[#ECEDEF] my-6" />

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

