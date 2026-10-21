"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

export interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export function CTABand({
  title = "Ready to build your branded learning platform?",
  subtitle = "Launch interactive courses, deploy Domie AI tutors, and automate certifications in days.",
  buttonText = "Request Demo",
}: CTABandProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="w-full bg-[#161616] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden font-urbanist shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F3CF74] text-xs font-semibold uppercase tracking-wider mb-5">
            <span>✦</span>
            <span>Get Started</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-white mb-4">
            {title}
          </h2>

          <p className="text-[15px] sm:text-[17px] text-slate-300 max-w-lg mx-auto leading-relaxed mb-8">
            {subtitle}
          </p>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-7 py-3.5 rounded-full bg-white text-[#161616] text-sm font-semibold hover:bg-slate-100 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CTABand;
