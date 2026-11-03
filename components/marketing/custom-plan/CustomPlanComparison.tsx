"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, X, Sparkles } from "lucide-react";
import type { CustomPlanComparison as CustomPlanComparisonType } from "@/types/content";

interface CustomPlanComparisonProps {
  comparison: CustomPlanComparisonType;
}

export function CustomPlanComparison({ comparison }: CustomPlanComparisonProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!comparison || !comparison.rows || comparison.rows.length === 0) {
    return null;
  }

  const title = comparison.title || "Why teams choose a Custom Plan";
  const leftLabel = comparison.leftLabel || "Building it yourself";
  const rightLabel = comparison.rightLabel || "LMS Domain Custom Plan";

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#F8FAFC] font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-3">
            ✦ Honest Comparison
          </span>
          <h2 className="text-[30px] sm:text-[40px] font-bold text-[#161616] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Comparison Table / Card */}
        <div className="bg-white rounded-3xl border border-[#ECEDEF] shadow-[0_15px_45px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Table Header Row (Desktop) */}
          <div className="hidden md:grid md:grid-cols-12 bg-[#F8FAFC] border-b border-[#ECEDEF] p-4 sm:p-5 text-sm font-bold text-[#161616]">
            <div className="md:col-span-4 text-left pl-3 text-[#8F94A0] uppercase tracking-wider text-xs">
              Topic
            </div>
            <div className="md:col-span-4 text-left text-[#6B6F76]">
              {leftLabel}
            </div>
            <div className="md:col-span-4 text-left text-[#7B5CF5] flex items-center gap-1.5">
              <Sparkles className="size-4" />
              <span>{rightLabel}</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#ECEDEF]">
            {comparison.rows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.05,
                  ease: "easeOut",
                }}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 items-center gap-3 sm:gap-4 hover:bg-[#FAF5FF]/30 transition-colors"
              >
                {/* Topic Column */}
                <div className="md:col-span-4 text-left font-bold text-sm text-[#161616] pl-1 md:pl-3">
                  {row.topic}
                </div>

                {/* Left Column (Building it yourself) */}
                <div className="md:col-span-4 text-left text-xs sm:text-sm text-[#6B6F76] bg-[#F8FAFC] md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none flex items-start gap-2">
                  <div className="size-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 md:hidden">
                    <X className="size-3 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#8F94A0] block md:hidden mb-0.5">
                      {leftLabel}
                    </span>
                    <span>{row.left}</span>
                  </div>
                </div>

                {/* Right Column (LMS Domain Custom Plan - Accent highlighted) */}
                <div className="md:col-span-4 text-left text-xs sm:text-sm font-semibold text-[#161616] bg-[#EEE9FF]/40 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none border-2 border-[#161616] md:border-none flex items-start gap-2 shadow-2xs md:shadow-none">
                  <div className="size-5 rounded-full bg-[#7B5CF5] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#7B5CF5] block md:hidden mb-0.5">
                      {rightLabel}
                    </span>
                    <span>{row.right}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomPlanComparison;

