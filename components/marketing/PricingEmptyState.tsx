"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

interface PricingEmptyStateProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; action?: "demo" | "modal" };
  secondaryCta?: { label: string; href?: string; action?: "contact" };
}

export function PricingEmptyState({
  eyebrow = "Plans In Finalization",
  title = "Academy Plans & Custom Pricing",
  subtitle = "We are tailoring our pricing tiers to offer flexible configurations for training institutes, creator studios, and enterprise academies. Speak with our team to explore tailored plans or request a guided platform walkthrough.",
  primaryCta = { label: "Request a Demo", action: "demo" },
  secondaryCta = { label: "Contact sales", href: "/contact?topic=sales", action: "contact" },
}: PricingEmptyStateProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="bg-[#F3F4F6] py-16 sm:py-24 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto rounded-[32px] sm:rounded-[40px] bg-white border border-[#ECEDEF] p-8 sm:p-12 lg:p-14 text-center shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div
            className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-[#7B5CF5]/10 rounded-full blur-[90px] pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-5">
              <span>✦</span>
              <span>{eyebrow}</span>
            </div>

            <h2 className="text-[26px] sm:text-[34px] font-bold text-[#161616] tracking-tight leading-tight mb-4">
              {title}
            </h2>

            <p className="text-[15px] sm:text-[16px] text-[#6B6F76] leading-relaxed mb-8 max-w-lg">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </button>

              <Link
                href={secondaryCta.href || "/contact?topic=sales"}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#8F94A0]" />
                <span>{secondaryCta.label}</span>
              </Link>
            </div>
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

export default PricingEmptyState;
