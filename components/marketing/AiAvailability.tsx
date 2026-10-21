"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

interface AiAvailabilityProps {
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; action?: string };
}

export function AiAvailability({
  title = "Premium AI Add-Ons for Growing Academies",
  description = "Domie AI tools are available as premium add-ons to enhance your teaching and administration workflows. Explore our plans or speak with our team to add AI capabilities to your academy.",
  cta = { label: "View Plans & Pricing", href: "/pricing" },
  secondaryCta = { label: "Request Demo", action: "modal" },
}: AiAvailabilityProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Wide Card (radius 40px) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F8FAFC] border border-[#ECEDEF] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xs">
          {/* Subtle Ambient Background Gradient */}
          <div
            className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#7B5CF5]/10 rounded-full blur-[100px] pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-wider mb-5">
              <span>✦</span>
              <span>Availability & Plans</span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-bold text-[#161616] tracking-tight leading-[1.15] mb-4">
              {title}
            </h2>

            <p className="text-[15px] sm:text-[17px] text-[#6B6F76] leading-relaxed mb-8 max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href={cta.href || "/pricing"}
                className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{cta.label}</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>

              <button
                type="button"
                onClick={() => setShowDemoModal(true)}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all cursor-pointer"
              >
                {secondaryCta.label}
              </button>
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

export default AiAvailability;
