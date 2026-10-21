"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LogoMark from "./LogoMark";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import type { PricingEnterprise as PricingEnterpriseType } from "@/types/content";

interface PricingEnterpriseProps {
  data?: PricingEnterpriseType;
}

export function PricingEnterprise({ data }: PricingEnterpriseProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (!data) return null;

  return (
    <section className="bg-white py-16 sm:py-24 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Wide Card (radius 40px) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F8FAFC] border border-[#ECEDEF] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xs text-left">
          {/* Left: LogoMark + Content */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1 min-w-0">
            <div className="shrink-0">
              <LogoMark className="size-14 sm:size-16" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-[11px] font-bold uppercase tracking-wider">
                <span>✦</span>
                <span>Custom Architecture</span>
              </div>
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#161616] tracking-tight leading-snug">
                {data.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#6B6F76] leading-relaxed max-w-2xl">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right: Black CTA Button */}
          <div className="shrink-0 w-full sm:w-auto">
            {data.cta.action === "demo" ? (
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{data.cta.label}</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>
            ) : (
              <Link
                href={data.cta.href || "/contact?topic=enterprise"}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>{data.cta.label}</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PricingEnterprise;
