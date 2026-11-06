"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section, Eyebrow } from "@/components/marketing/ui";
import { formatPriceParts } from "@/lib/pricing";
import type { PlanCurrency } from "@/types/content";

export interface PricingTeaserSectionProps {
  lowestMonthlyPrice?: number | null;
  currency?: PlanCurrency;
}

export function PricingTeaserSection({
  lowestMonthlyPrice,
  currency = { code: "INR", locale: "en-IN" },
}: PricingTeaserSectionProps) {
  const hasPrice =
    typeof lowestMonthlyPrice === "number" && lowestMonthlyPrice > 0;

  const formattedPrice = hasPrice
    ? formatPriceParts(lowestMonthlyPrice, currency).map((p) => p.value).join("")
    : null;

  const title = hasPrice
    ? `Plans from ${formattedPrice}/month, all with your own domain.`
    : "See plans and pricing";

  return (
    <Section tone="white" spacing="default">
      <div className="max-w-4xl mx-auto rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-8 sm:p-12 text-center flex flex-col items-center">
        <Eyebrow tone="violet">TRANSPARENT PRICING</Eyebrow>
        <h2 className="type-h2 text-[#161616] mt-3 max-w-2xl">
          {title}
        </h2>
        <p className="type-body text-[#6B6F76] mt-3 max-w-xl">
          Everything you need to launch, teach and grow your academy. Zero platform transaction fees on course sales.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#161616] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-4 text-[#7B5CF5]" /> Custom domain with SSL
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-4 text-[#7B5CF5]" /> Unlimited batches & courses
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-4 text-[#7B5CF5]" /> Direct payment gateway payout
          </span>
        </div>

        <div className="mt-8">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs hover:shadow-sm active:scale-95"
          >
            <span>See plans and pricing</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export default PricingTeaserSection;
