"use client";

import React from "react";
import { ArrowRight, Tag } from "lucide-react";
import type { CustomPlanPricingNote as CustomPlanPricingNoteType } from "@/types/content";

interface CustomPlanPricingNoteProps {
  pricingNote?: CustomPlanPricingNoteType;
}

export function CustomPlanPricingNote({ pricingNote }: CustomPlanPricingNoteProps) {
  if (!pricingNote) return null;

  const title = pricingNote.title || "A plan that fits what you need";
  const text =
    pricingNote.text ||
    "Every Custom Plan is quoted on what you actually need: number of learners, migration and custom features. You get a clear written quote after our call, with no hidden costs.";
  const ctaLabel = pricingNote.ctaLabel || "Get my quote";

  // Format startingFrom if set and valid number
  const formattedPrice = (() => {
    const sp = pricingNote.startingFrom;
    if (!sp || !sp.amount) return null;
    const num = Number(sp.amount);
    if (isNaN(num) || num <= 0) return null;
    const currency = sp.currency || "USD";
    try {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(num);
      return `${formatted}${sp.suffix || "/month"}`;
    } catch (e) {
      return `${currency} ${num}${sp.suffix || "/month"}`;
    }
  })();

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("plan");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-20 bg-white font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-[#FAF5FF] via-white to-[#F3F4F6] border border-[#ECEDEF] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="size-8 rounded-lg bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center">
                <Tag className="size-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B5CF5]">
                Custom Pricing
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#161616] tracking-tight mb-3">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
              {text}
            </p>

            {formattedPrice && (
              <p className="mt-4 text-sm font-semibold text-[#161616]">
                Starting from:{" "}
                <span className="text-lg font-bold text-[#7B5CF5]">
                  {formattedPrice}
                </span>
              </p>
            )}
          </div>

          <div className="shrink-0">
            <a
              href="#plan"
              onClick={handleCtaClick}
              className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomPlanPricingNote;

