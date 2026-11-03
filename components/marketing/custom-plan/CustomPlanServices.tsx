"use client";

import React from "react";
import { Headphones, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import type { CustomPlanServices as CustomPlanServicesType } from "@/types/content";

interface CustomPlanServicesProps {
  services: CustomPlanServicesType;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Headphones,
  RefreshCw,
  ShieldCheck,
  Zap,
};

export function CustomPlanServices({ services }: CustomPlanServicesProps) {
  if (!services || !services.items || services.items.length === 0) {
    return null;
  }

  const title = services.title || "We don't disappear after launch";

  return (
    <section className="py-20 sm:py-24 bg-white font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-3">
            ✦ Post-Launch Partnership
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-bold text-[#161616] tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Headphones;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl border border-[#ECEDEF] p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all text-left group"
              >
                <div className="size-11 rounded-xl bg-white border border-[#ECEDEF] text-[#7B5CF5] flex items-center justify-center mb-4 group-hover:bg-[#7B5CF5] group-hover:text-white transition-colors shadow-2xs">
                  <Icon className="size-5 stroke-[2]" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#161616] tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6F76] leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomPlanServices;

