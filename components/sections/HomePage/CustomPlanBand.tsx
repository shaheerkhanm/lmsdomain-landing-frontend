"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandPreviewProvider } from "@/components/marketing/custom-plan/BrandPreviewContext";
import { BrandPreviewMock } from "@/components/marketing/custom-plan/BrandPreviewMock";
import type { HomeCustomPlanBand } from "@/types/content";
import { usePageVisibility } from "@/lib/pages-context";

interface CustomPlanBandProps {
  data: HomeCustomPlanBand;
}

export function CustomPlanBand({ data }: CustomPlanBandProps) {
  const { isPathVisible } = usePageVisibility();

  if (!data || !data.title) return null;

  const targetHref = data.ctaHref || "/custom-lms";
  if (!isPathVisible(targetHref)) return null;

  return (
    <section className="bg-white py-14 sm:py-20 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F8FAFC] border border-[#ECEDEF] p-8 sm:p-12 lg:p-16 shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Copy & CTA */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-bold uppercase tracking-wider">
                <span>✦</span>
                <span>{data.eyebrow || "CUSTOM PLAN"}</span>
              </div>

              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#161616] tracking-tight leading-[1.15]">
                {data.title}
              </h2>

              <p className="text-[16px] sm:text-[18px] text-[#6B6F76] leading-relaxed max-w-xl">
                {data.text}
              </p>

              <div className="pt-2">
                <Link
                  href={targetHref}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm sm:text-base font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <span>{data.ctaLabel || "See how it works"}</span>
                  <ArrowRight className="size-4 text-white/80" />
                </Link>
              </div>
            </div>

            {/* Right Column: Compact Static Brand Preview Mock */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-[460px] pointer-events-none">
                <BrandPreviewProvider defaultName="Apex Academy" defaultColor="#7B5CF5">
                  <BrandPreviewMock interactive={false} className="scale-[0.92] sm:scale-100 origin-center" />
                </BrandPreviewProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomPlanBand;
