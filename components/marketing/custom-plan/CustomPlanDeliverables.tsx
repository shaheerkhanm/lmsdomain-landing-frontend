"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Globe,
  Smartphone,
  Shield,
  CreditCard,
  Sparkles,
  Database,
  Users,
  Server,
  Sliders,
  CheckCircle,
} from "lucide-react";
import type { CustomPlanDeliverables as CustomPlanDeliverablesType } from "@/types/content";

interface CustomPlanDeliverablesProps {
  deliverables: CustomPlanDeliverablesType;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Shield,
  CreditCard,
  Sparkles,
  Database,
  Users,
  Server,
  Sliders,
};

// Pastel pill colour by tag
const TAG_COLORS: Record<string, string> = {
  Web: "bg-[#EEE9FF] text-[#7B5CF5] border-[#DCD3FF]",
  Android: "bg-[#E8F8F5] text-[#0D9488] border-[#B2ECE1]",
  iOS: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  Admin: "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]",
  Payments: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
  AI: "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]",
  Setup: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
  "After launch": "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  Custom: "bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]",
};

export function CustomPlanDeliverables({ deliverables }: CustomPlanDeliverablesProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!deliverables || !deliverables.items || deliverables.items.length === 0) {
    return null;
  }

  const title = deliverables.title || "Everything you need to launch, done for you";
  const subtitle =
    deliverables.subtitle ||
    "One plan, one team, one launch date. Each item below is set up by us and handed over working.";

  // Render CSS micro-illustrations for the larger highlight cards
  const renderIllustration = (tag: string, isHovered: boolean) => {
    switch (tag) {
      // 1. Web: Mini browser bar with URL and animated cursor
      case "Web":
        return (
          <div className="w-full h-16 rounded-xl bg-[#F8FAFC] border border-[#ECEDEF] p-2 flex flex-col justify-between mt-4 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-400" />
              <span className="size-2 rounded-full bg-amber-400" />
              <span className="size-2 rounded-full bg-emerald-400" />
              <div className="ml-2 flex-1 h-3.5 bg-white border border-[#E5E7EB] rounded px-1.5 flex items-center text-[8px] font-mono text-[#8F94A0] truncate">
                https://yourdomain.com
              </div>
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1">
                <span className="size-3 rounded bg-[#7B5CF5]/20 flex items-center justify-center text-[7px] text-[#7B5CF5] font-bold">
                  ✓
                </span>
                <span className="text-[9px] font-semibold text-[#161616]">Custom SSL Active</span>
              </div>
              <span
                className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium transition-all duration-300 ${
                  isHovered ? "bg-[#7B5CF5] text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                100% Branded
              </span>
            </div>
          </div>
        );

      // 2. Android Phone illustration
      case "Android":
        return (
          <div className="w-full h-16 rounded-xl bg-[#F8FAFC] border border-[#ECEDEF] p-2 flex items-center justify-between gap-3 mt-4 overflow-hidden">
            <div className="flex items-center gap-2">
              <div
                className={`size-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs transition-transform duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              >
                App
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#161616] leading-tight">Google Play Listing</p>
                <p className="text-[8px] text-[#0D9488] font-medium">Your Developer Account</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-[#0D9488] bg-[#E8F8F5] px-2 py-1 rounded-md">
              <span>★ 4.9</span>
            </div>
          </div>
        );

      // 3. iOS Phone illustration
      case "iOS":
        return (
          <div className="w-full h-16 rounded-xl bg-[#F8FAFC] border border-[#ECEDEF] p-2 flex items-center justify-between gap-3 mt-4 overflow-hidden">
            <div className="flex items-center gap-2">
              <div
                className={`size-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs transition-transform duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              >
                iOS
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#161616] leading-tight">Apple App Store</p>
                <p className="text-[8px] text-[#2563EB] font-medium">iPhone &amp; iPad Native</p>
              </div>
            </div>
            <div className="px-2 py-1 rounded-md bg-[#EFF6FF] text-[9px] font-bold text-[#2563EB]">
              Store Ready
            </div>
          </div>
        );

      // 4. Domie AI Chat Bubble illustration
      case "AI":
        return (
          <div className="w-full h-16 rounded-xl bg-[#F8FAFC] border border-[#ECEDEF] p-2 flex items-center justify-between gap-3 mt-4 overflow-hidden">
            <div className="flex items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-[#161616] text-[#7B5CF5] flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="size-4" />
              </div>
              <div className="p-1.5 px-2.5 rounded-xl bg-white border border-[#ECEDEF] flex-1 flex items-center justify-between">
                <span className="text-[10px] font-medium text-[#161616]">Domie AI Tutor</span>
                {/* 3 typing dots */}
                <span className="flex items-center gap-0.5 ml-2">
                  <span
                    className={`size-1 rounded-full bg-[#7B5CF5] ${
                      isHovered ? "animate-bounce" : "opacity-60"
                    }`}
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className={`size-1 rounded-full bg-[#7B5CF5] ${
                      isHovered ? "animate-bounce" : "opacity-60"
                    }`}
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className={`size-1 rounded-full bg-[#7B5CF5] ${
                      isHovered ? "animate-bounce" : "opacity-60"
                    }`}
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-3">
            ✦ Complete Deliverables
          </span>
          <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-bold text-[#161616] tracking-tight leading-tight mb-4">
            {title}
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#6B6F76] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 4-column Bento Grid (2 col at tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deliverables.items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Globe;
            // First 3 items (Web, Android, iOS) and AI item are given 2-column span on desktop
            const isFeatured =
              item.tag === "Web" ||
              item.tag === "Android" ||
              item.tag === "iOS" ||
              item.tag === "AI";
            const colSpan = isFeatured ? "lg:col-span-2" : "lg:col-span-1";
            const tagClass = TAG_COLORS[item.tag] || "bg-slate-100 text-slate-700 border-slate-200";
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.06,
                  ease: "easeOut",
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`${colSpan} bg-white rounded-2xl border border-[#ECEDEF] p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col justify-between text-left group`}
              >
                <div>
                  {/* Card Top: Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-10 rounded-xl bg-[#F8FAFC] border border-[#ECEDEF] text-[#161616] flex items-center justify-center group-hover:bg-[#EEE9FF] group-hover:text-[#7B5CF5] transition-colors">
                      <Icon className="size-5 stroke-[2]" />
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${tagClass}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-[#161616] tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                    {item.text}
                  </p>
                </div>

                {/* CSS Illustration for featured cards */}
                {isFeatured && renderIllustration(item.tag, isHovered)}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomPlanDeliverables;

