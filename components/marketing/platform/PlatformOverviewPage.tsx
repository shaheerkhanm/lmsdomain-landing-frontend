"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import {
  platformOverviewPillars,
  PlatformOverviewPillar,
} from "@/content/platform/overview";
import {
  BookOpen,
  CheckSquare,
  CalendarRange,
  CreditCard,
  Globe2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  CheckSquare,
  CalendarRange,
  CreditCard,
  Globe2,
  Sparkles,
  ShieldCheck,
};

export function PlatformOverviewPage() {
  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">THE LMS DOMAIN PLATFORM</Eyebrow>

          {/* Single H1 on page */}
          <h1 className="type-h1 text-[#161616] max-w-4xl tracking-tight mt-4">
            Everything an academy needs to teach, test and get paid.
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            Seven unified pillars designed to run courses, live batches, assessments,
            global multi-currency commerce, and grounded AI under your own brand.
          </p>
        </div>
      </section>

      {/* 2. Platform Pillars Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {platformOverviewPillars.map((pillar: PlatformOverviewPillar, idx: number) => {
            const Icon = (pillar.icon && ICON_MAP[pillar.icon]) || Sparkles;
            const isSeventh = idx === 6;

            return (
              <motion.div
                key={pillar.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className={cn(
                  "flex",
                  isSeventh && "md:col-span-2 lg:col-span-1"
                )}
              >
                <Link
                  href={pillar.href}
                  className="group relative w-full rounded-3xl bg-white border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="size-12 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] shadow-2xs group-hover:scale-105 group-hover:bg-[#F3F0FF] transition-all">
                        <Icon className="size-6" />
                      </div>
                      {pillar.badge && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/10 text-[#7B5CF5] border border-violet-500/20 text-[11px] font-semibold uppercase tracking-wider">
                          <Sparkles className="size-3" />
                          {pillar.badge}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight mb-2 group-hover:text-[#6842ED] transition-colors">
                      {pillar.title}
                    </h2>

                    <p className="text-sm sm:text-base font-semibold text-[#161616] mb-3 leading-snug">
                      {pillar.tagline}
                    </p>

                    <p className="text-sm text-[#6B6F76] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#F2EFE9] flex items-center gap-1.5 text-sm font-semibold text-[#161616] group-hover:text-[#6842ED] transition-colors">
                    <span>Explore {pillar.title}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CTABand */}
      <CTABand
        title="See your academy running on LMS Domain."
        subtitle="Book a 20-minute demo. We'll show it with your own course structure."
        buttonText="Book a demo"
        tone="dark"
      />
    </div>
  );
}

export default PlatformOverviewPage;

