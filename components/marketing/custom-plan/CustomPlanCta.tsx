"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CustomPlanCta as CustomPlanCtaType } from "@/types/content";

interface CustomPlanCtaProps {
  cta?: CustomPlanCtaType;
}

export function CustomPlanCta({ cta }: CustomPlanCtaProps) {
  if (!cta) return null;

  const title = cta.title || "Ready for your own LMS?";
  const text = cta.text || "Share a few details and get your plan and quote within a day.";
  const primaryLabel = cta.primaryLabel || "Plan my custom LMS";
  const primaryHref = cta.primaryHref || "#plan";
  const secondaryLabel = cta.secondaryLabel || "Talk to sales";
  const secondaryHref = cta.secondaryHref || "/contact?topic=sales";

  const handlePrimaryClick = (e: React.MouseEvent) => {
    if (primaryHref.startsWith("#")) {
      e.preventDefault();
      const id = primaryHref.replace("#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#E5E5E7] font-urbanist">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="rounded-[36px] sm:rounded-[44px] bg-white p-3 sm:p-5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
          <div
            className="rounded-[30px] sm:rounded-[36px] relative overflow-hidden py-16 sm:py-24 px-6 sm:px-12 flex flex-col items-center justify-center text-center"
            style={{
              background:
                "linear-gradient(180deg, #A6C9D4 0%, #BAD4D9 18%, #C6D2CB 38%, #EAE5CE 62%, #F7E6C2 82%, #FDE6C0 100%)",
            }}
          >
            {/* Soft Ambient Inner Glow */}
            <div
              className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-[#161616] text-xs font-semibold uppercase tracking-wider shadow-2xs">
                ✦ Get Started Today
              </span>

              <h2 className="text-[34px] sm:text-[46px] lg:text-[52px] font-bold text-[#161616] tracking-tight leading-[1.1]">
                {title}
              </h2>

              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto">
                {text}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={primaryHref}
                  onClick={handlePrimaryClick}
                  className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="size-4" />
                </a>

                <Link
                  href={secondaryHref}
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-white/80 transition-all shadow-xs"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomPlanCta;

