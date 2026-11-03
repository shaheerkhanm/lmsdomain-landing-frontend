"use client";

import React from "react";
import { BookOpen, Award, TrendingUp, GraduationCap, Building2, Users } from "lucide-react";
import type { CustomPlanAudiences as CustomPlanAudiencesType } from "@/types/content";

interface CustomPlanAudiencesProps {
  audiences: CustomPlanAudiencesType;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Award,
  TrendingUp,
  GraduationCap,
  Building2,
  Users,
};

export function CustomPlanAudiences({ audiences }: CustomPlanAudiencesProps) {
  if (!audiences || !audiences.items || audiences.items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {audiences.title && (
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-3">
              ✦ Built For Growth
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#161616] tracking-tight">
              {audiences.title}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {audiences.items.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || BookOpen;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ECEDEF] p-6 sm:p-8 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="size-12 rounded-xl bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                    <Icon className="size-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#161616] tracking-tight mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B6F76] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomPlanAudiences;

