"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/marketing/ui";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import {
  computePlanPricing,
  formatPrice,
  DEFAULT_PRICING_V2,
  type PricingCurrency,
  type PricingV2Data,
} from "@/config/pricing";
import { DEFAULT_PRICING_HERO } from "@/content/pricing/page";

export interface PricingTeaserSectionProps {
  pricingV2?: PricingV2Data;
  heroTitle?: string;
  heroSubtitle?: string;
}

export function PricingTeaserSection({
  pricingV2 = DEFAULT_PRICING_V2,
  heroTitle,
  heroSubtitle,
}: PricingTeaserSectionProps) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<PricingCurrency>("INR");
  const [showDemoModal, setShowDemoModal] = useState(false);

  const annualMode = pricingV2.annualMode || "monthsFree";
  const monthsFree = pricingV2.monthsFree ?? 2;
  const trialDays = pricingV2.trialDays ?? 15;
  const activePlans = (pricingV2.plans || [])
    .filter((p) => p.active !== false)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const title = heroTitle || DEFAULT_PRICING_HERO.title;
  const subtitle =
    heroSubtitle ||
    `Your own domain, Zoom live classes and GST invoices are included from Starter. Try any plan free for ${trialDays} days.`;

  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="plans">
      <div className="max-w-[1080px] mx-auto px-5">
        <div className="rv-v4">
          <Eyebrow tone="gradient">Pricing</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            {title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch] mt-3">
            {subtitle}
          </p>
        </div>

        {/* Large White Sendr-Style Pricing Card */}
        <div className="rv-v4 mt-10 bg-white border border-[#E8E8EC] rounded-[24px] p-2.5 sm:p-3 shadow-[0_40px_80px_-50px_rgba(20,20,40,0.35)]">
          {/* Top Toggles Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-3.5 pb-4">
            {/* Monthly / Yearly Switch */}
            <div className="inline-flex bg-[#F1F1F4] rounded-[10px] p-0.5 gap-0.5">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`cursor-pointer font-semibold text-[12.5px] py-1.5 px-3 rounded-[8px] transition-all ${
                  period === "monthly"
                    ? "bg-white text-[#151517] shadow-xs"
                    : "text-[#535361] hover:text-[#151517]"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setPeriod("yearly")}
                className={`cursor-pointer font-semibold text-[12.5px] py-1.5 px-3 rounded-[8px] transition-all flex items-center gap-1 ${
                  period === "yearly"
                    ? "bg-white text-[#151517] shadow-xs"
                    : "text-[#535361] hover:text-[#151517]"
                }`}
              >
                <span>Yearly</span>
                <small className="text-[#17A06B] font-semibold text-[11px]">
                  {annualMode === "monthsFree" ? `${monthsFree} months free` : "Save 17%"}
                </small>
              </button>
            </div>

            {/* INR / USD Switch */}
            <div className="inline-flex bg-[#F1F1F4] rounded-[10px] p-0.5 gap-0.5">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`cursor-pointer font-semibold text-[12.5px] py-1.5 px-3 rounded-[8px] transition-all ${
                  currency === "INR"
                    ? "bg-white text-[#151517] shadow-xs"
                    : "text-[#535361] hover:text-[#151517]"
                }`}
              >
                ₹ INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`cursor-pointer font-semibold text-[12.5px] py-1.5 px-3 rounded-[8px] transition-all ${
                  currency === "USD"
                    ? "bg-white text-[#151517] shadow-xs"
                    : "text-[#535361] hover:text-[#151517]"
                }`}
              >
                $ USD
              </button>
            </div>
          </div>

          {/* 4 Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {activePlans.map((plan) => {
              const taxLabel = pricingV2.currencies?.[currency]?.taxLabel || (currency === "INR" ? "+ GST" : "tax incl.");
              const pricing = computePlanPricing(
                plan,
                currency,
                annualMode,
                monthsFree,
                taxLabel
              );

              const isPopular = Boolean(plan.isPopular);
              const isCustom = Boolean(plan.isCustom || plan.priceMonthly?.[currency] === null);

              const displayedPrice = isCustom
                ? null
                : period === "yearly" && pricing.perMonthEquivalent !== null
                ? pricing.perMonthEquivalent
                : pricing.monthly;

              return (
                <div
                  key={plan.slug}
                  className={`rounded-[18px] p-5 flex flex-col gap-3 transition-shadow ${
                    isPopular
                      ? "bg-[#0E0E11] text-white border border-[#0E0E11] relative overflow-hidden isolate shadow-lg"
                      : "bg-[#FCFCFD] border border-[#E8E8EC] text-[#151517]"
                  }`}
                >
                  {/* Warm Glow Background for Most Popular Plan */}
                  {isPopular && (
                    <div
                      className="pointer-events-none absolute -left-[20%] -right-[20%] -bottom-[140px] h-[240px] bg-[radial-gradient(closest-side,rgba(242,137,74,0.55),rgba(226,83,155,0.3)_50%,transparent)] -z-10"
                      aria-hidden="true"
                    />
                  )}

                  {/* Plan Name & Popular Badge */}
                  <div className="flex items-center justify-between font-semibold text-[16px]">
                    <span>{plan.name}</span>
                    {isPopular && (
                      <em className="bg-gradient-to-r from-[#E2539B] via-[#F2894A] to-[#7B5CFF] text-white text-[11px] rounded-[6px] px-2 py-0.5 not-italic font-semibold">
                        Most popular
                      </em>
                    )}
                  </div>

                  {/* Tagline */}
                  <p
                    className={`text-[13px] min-h-[38px] leading-relaxed ${
                      isPopular ? "text-[#B9B9C6]" : "text-[#535361]"
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  {/* Amount */}
                  <div className="mt-1">
                    {isCustom ? (
                      <div className="text-[28px] sm:text-[32px] font-bold tracking-[-0.04em] leading-tight">
                        Talk to us
                      </div>
                    ) : (
                      <div className="text-[32px] sm:text-[34px] font-bold tracking-[-0.04em] leading-none flex items-baseline gap-1">
                        <span>{formatPrice(displayedPrice ?? 0, currency)}</span>
                        <small
                          className={`text-[13px] font-medium tracking-normal ${
                            isPopular ? "text-[#B9B9C6]" : "text-[#535361]"
                          }`}
                        >
                          /mo
                        </small>
                      </div>
                    )}

                    {/* Tax / billing note */}
                    <p
                      className={`text-[12px] min-h-[18px] mt-1 ${
                        isPopular ? "text-[#B9B9C6]" : "text-[#8A8A96]"
                      }`}
                    >
                      {isCustom
                        ? ""
                        : period === "yearly"
                        ? `${pricing.taxLabel} · billed annually`
                        : pricing.taxLabel}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul
                    className={`list-none m-0 pt-3 border-t grid gap-2 text-[13px] ${
                      isPopular ? "border-white/12 text-[#B9B9C6]" : "border-[#E8E8EC] text-[#535361]"
                    }`}
                  >
                    {(plan.features || []).slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="text-[#17A06B] font-bold shrink-0">✓</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className={`mt-auto justify-center text-center cursor-pointer ${
                      isPopular
                        ? "btn-v4-light bg-white border-white text-[#151517] hover:bg-slate-100"
                        : plan.slug === "pro"
                        ? "btn-v4-dark"
                        : "btn-v4-light"
                    }`}
                  >
                    {isCustom ? "Talk to us" : `Start ${trialDays}-day free trial`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer Link */}
          <p className="text-center text-[13px] text-[#535361] pt-4 pb-2">
            <Link
              href="/pricing"
              className="hover:text-[#151517] font-semibold transition-colors"
            >
              See full pricing and plan comparison →
            </Link>
          </p>
        </div>
      </div>

      {/* Demo Enquiry Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PricingTeaserSection;
