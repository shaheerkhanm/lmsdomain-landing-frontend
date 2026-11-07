"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import MainHeading from "./MainHeading";
import { ScreenshotFrame } from "@/components/marketing/ui/ScreenshotFrame";
import { DashboardScreen } from "@/components/marketing/mockups/screens";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";

export function BannerSection({ data, graphData }: { data?: any; graphData?: any }) {
  // Phase 2 copy is code-owned until cutover; site-home-hero is still used by the live site.
  const heroContent = defaultHeroContent;
  const effectiveSubtitle = defaultHeroContent.subtitle;
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-20 overflow-x-clip bg-[#FAF9F6] font-urbanist">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Server-rendered visible at first paint without entrance opacity animations */}
        <div className="flex flex-col items-center w-full">
          {/* 1. Static Display Headline (Single H1) */}
          <div className="w-full">
            <MainHeading data={data} />
          </div>

          {/* 2. Subtitle */}
          <p className="mt-4 max-w-2xl text-center text-[16px] sm:text-[18px] text-[#6B6F76] leading-[26px] sm:leading-[28px]">
            {effectiveSubtitle}
          </p>

          {/* 3. Action CTAs (Primary Demo Modal + Secondary Pricing Link) */}
          <div id="hero-cta" className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {heroContent.ctaText || "Book a 20-minute demo"}
            </button>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-[#EAE8E2] shadow-2xs hover:shadow-xs transition-all active:scale-95"
            >
              {heroContent.secondaryCtaText || "See pricing"}
            </Link>
          </div>

          {/* 4. Microcopy under CTAs */}
          <p className="mt-3 text-xs sm:text-sm text-[#6B6F76] text-center">
            {heroContent.microcopy || "Your own domain on every plan · Set up with our team"}
          </p>
        </div>

        {/* 5. One ScreenshotFrame with <=300ms whileInView fade */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-10 sm:mt-12 w-full max-w-5xl min-w-0 overflow-hidden"
        >
          <ScreenshotFrame
            screen={<DashboardScreen />}
            title="lmsdomain.com/admin/dashboard"
            alt="Northstar Academy sample dashboard in LMS Domain — batches, live classes and tests in one place"
            className="shadow-xl ring-1 ring-black/5"
          />
        </motion.div>
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
