"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import MainHeading from "./MainHeading";
import LmsProductStage from "./LmsProductStage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";

export function BannerSection({ data, graphData }: { data: any; graphData: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const isStaleSubtitle =
    !heroContent.subtitle ||
    heroContent.subtitle.includes("Build courses, sell them and support every learner");
  const effectiveSubtitle = isStaleSubtitle
    ? defaultHeroContent.subtitle
    : heroContent.subtitle;
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-[152px] pb-0 lg:pb-24 mb-16 lg:mb-0 overflow-x-clip bg-[#F3F4F6] lg:bg-white font-urbanist">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Server-rendered visible at first paint without entrance opacity animations */}
        <div className="flex flex-col items-center w-full">
          {/* 1. Static Display Headline */}
          <div className="w-full">
            <MainHeading data={data} />
          </div>

          {/* 2. Subtitle */}
          <p className="mt-3 max-w-2xl text-center text-[15px] sm:text-base text-[#6B6F76] leading-relaxed">
            {effectiveSubtitle}
          </p>

          {/* 3. Action CTAs (Primary Demo Modal + Secondary Pricing Link) */}
          <div id="hero-cta" className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {heroContent.ctaText || "Book a 20-minute demo"}
            </button>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-xs sm:text-sm font-semibold border border-[#E5E7EB] shadow-2xs hover:shadow-xs transition-all active:scale-95"
            >
              {heroContent.secondaryCtaText || "See pricing"}
            </Link>
          </div>

          {/* 4. Microcopy under CTAs */}
          <p className="mt-3 text-sm text-[#6B6F76] text-center">
            {heroContent.microcopy || "Your own domain on every plan · Set up with our team"}
          </p>
        </div>

        {/* 5. Converging Dashboard Stage with <=300ms whileInView fade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-6 sm:mt-7 w-full"
        >
          <LmsProductStage onOpenModal={() => setShowDemoModal(true)} />
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
