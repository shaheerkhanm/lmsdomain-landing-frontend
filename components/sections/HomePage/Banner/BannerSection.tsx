"use client";

import React, { useState } from "react";
import MainHeading from "./MainHeading";
import LmsProductStage from "./LmsProductStage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

import { motion, Variants } from "motion/react";

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

import { heroContent } from "@/content/home/hero";

export function BannerSection({ data, graphData }: { data: any; graphData: any }) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative pt-[152px] pb-0 lg:pb-24 mb-16 lg:mb-0 overflow-x-clip bg-white font-urbanist">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* A24: Hero load entrance stagger */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* 1. Mota Display Headline: exactly 56px clearance from nav (Nav A h-24 = 96px, pt-[152px] -> 152 - 96 = 56px clearance) */}
          <motion.div variants={heroItemVariants} className="w-full">
            <MainHeading data={data} />
          </motion.div>

          {/* 2. Mota 2-Line Subtitle */}
          <motion.p
            variants={heroItemVariants}
            className="mt-2.5 max-w-lg text-center text-xs sm:text-sm text-[#6B6F76] leading-relaxed"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* 3. Black Pill CTA Button (Mota Pill Style) with id="hero-cta" */}
          <motion.div
            variants={heroItemVariants}
            id="hero-cta"
            className="mt-3.5 flex items-center justify-center"
          >
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-6 sm:px-8 py-2.5 rounded-full bg-[#161616] hover:bg-black text-white text-xs sm:text-sm font-medium shadow-2xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {heroContent.ctaText}
            </button>
          </motion.div>
        </motion.div>

        {/* 4. Mota Floating Cards & Converging Dashboard Stage (A05) */}
        <div className="mt-6 sm:mt-7 w-full">
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
