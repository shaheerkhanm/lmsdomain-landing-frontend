"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import LogoMark from "./LogoMark";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import type { PricingEnterprise as PricingEnterpriseType } from "@/types/content";

interface PricingEnterpriseProps {
  data?: PricingEnterpriseType;
}

const ENTERPRISE_FEATURES = [
  "Multi-academy management",
  "Production uptime SLA",
  "Custom platform features",
  "Full migration assistance",
  "Dedicated support & account manager",
];

export function PricingEnterprise({ data }: PricingEnterpriseProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="bg-white py-16 sm:py-24 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Enterprise Card (radius 32-40px) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#FAF9F6] border border-[#EAE8E2] p-8 sm:p-12 lg:p-14 shadow-xs text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, Features */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <LogoMark className="size-10 sm:size-12 shrink-0" />
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-[#7B5CF5] border border-violet-500/20 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="size-3.5" />
                  <span>Enterprise & Custom LMS</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#161616] tracking-tight leading-snug">
                  Need multi-academy scale, custom features, or a dedicated SLA?
                </h3>
                <p className="type-body text-[#6B6F76] mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                  We build tailored infrastructure for training companies, education groups,
                  and growing academy networks requiring dedicated hosting and bespoke workflows.
                </p>
              </div>

              {/* 5 Enterprise Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {ENTERPRISE_FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-[#161616] font-medium">
                    <CheckCircle2 className="size-4 text-[#7B5CF5] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Actions */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="w-full px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 text-center"
              >
                <span>Talk to us</span>
                <ArrowRight className="size-4 text-white/80" />
              </button>

              <Link
                href="/custom-lms"
                className="w-full px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF9F6] text-[#161616] border border-[#D5D2CA] text-sm font-semibold transition-all shadow-2xs active:scale-95 inline-flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Custom LMS</span>
                <ArrowRight className="size-4 text-[#6B6F76]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal with ?plan=enterprise */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm
            onClose={() => setShowDemoModal(false)}
            initialPlan="enterprise"
            initialSubject="Enterprise plan consultation"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default PricingEnterprise;
