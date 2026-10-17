"use client";

import React, { useState } from "react";
import MainHeading from "./MainHeading";
import LmsProductStage from "./LmsProductStage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

export function BannerSection({ data, graphData }: { data: any; graphData: any }) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 overflow-hidden bg-white font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* 1. Mota Display Headline */}
        <MainHeading data={data} />

        {/* 2. Mota 2-Line Subtitle */}
        <p className="mt-6 max-w-xl text-center text-sm sm:text-base text-slate-600 leading-relaxed">
          Deploy white-label academies with hardware L1 DRM video protection, single-tenant custom domains, and Domie AI curriculum orchestration. Built for high-stakes learning.
        </p>

        {/* 3. Black Pill CTA Button (Mota Pill Style) */}
        <div className="mt-7 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="px-6 sm:px-8 py-3 rounded-full bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Request a Demo
          </button>
        </div>

        {/* 4. Mota Floating Cards & Converging Dashboard Stage */}
        <div className="mt-12 sm:mt-16 w-full">
          <LmsProductStage onOpenModal={() => setShowDemoModal(true)} />
        </div>
      </div>

      {/* Demo Enquiry Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default BannerSection;
