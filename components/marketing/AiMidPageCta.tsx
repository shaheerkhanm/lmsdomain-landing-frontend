"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

const DEFAULT_MID_CTA = {
  eyebrow: "See Domie AI in Action",
  title: "Accelerate Learning and Content Creation with Built-in AI",
  subtitle:
    "Test Domie AI tutors grounded in your curriculum or request a guided walkthrough of our administrative analytics.",
  primaryCtaText: "Request a Demo",
  secondaryCtaText: "Explore Domie AI",
};

export function AiMidPageCta({ content = DEFAULT_MID_CTA }: { content?: typeof DEFAULT_MID_CTA }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="bg-[#F3F4F6] pb-16 lg:pb-24 font-urbanist">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#ECEDEF] p-7 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.03),_0_12px_40px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.eyebrow}</span>
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#161616] tracking-tight mb-2">
                {content.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#6B6F76] leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-6 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                {content.primaryCtaText}
              </button>

              <Link
                href="/ai"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#ECEDEF] hover:border-[#161616] text-[#161616] text-xs sm:text-sm font-semibold transition-colors group cursor-pointer"
              >
                <span>{content.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Enquiry Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AiMidPageCta;

