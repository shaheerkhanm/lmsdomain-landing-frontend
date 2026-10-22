import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AboutCareers as AboutCareersType } from "@/types/content";

interface AboutCareersProps {
  data?: AboutCareersType;
}

export function AboutCareers({ data }: AboutCareersProps) {
  if (!data) return null;

  return (
    <section className="bg-white py-16 sm:py-24 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Wide Card: radius 40px */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F8FAFC] border border-[#ECEDEF] p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xs text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-[11px] font-bold uppercase tracking-wider">
              <span>✦</span>
              <span>Careers</span>
            </div>
            <h3 className="text-[24px] sm:text-[30px] font-bold text-[#161616] tracking-tight leading-snug">
              {data.title}
            </h3>
            <p className="text-[15px] sm:text-[16px] text-[#6B6F76] leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Link
              href={data.cta.href || "/contact?topic=careers"}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <span>{data.cta.label}</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCareers;

