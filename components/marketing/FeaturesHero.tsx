"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { ArrowRight } from "lucide-react";

interface FeaturesHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

export function FeaturesHero({
  title = "Everything You Need to Build, Manage, and Grow Your Online Academy",
  subtitle = "Bring courses, assessments, live learning, AI-powered tools, payments, and academy management together in one flexible learning platform.",
  ctaText = "Request a Demo",
}: FeaturesHeroProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      <section className="bg-white pt-[124px] sm:pt-[140px] lg:pt-[172px] pb-10 sm:pb-14 font-urbanist text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3F4F6] text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em]">
              <span>✦</span>
              <span>FEATURES</span>
            </div>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-[34px] sm:text-[46px] lg:text-[58px] font-semibold leading-[1.08] tracking-[-0.025em] text-[#161616] max-w-4xl mx-auto mb-5"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-[17px] sm:text-[19px] text-[#6B6F76] max-w-[640px] mx-auto leading-relaxed mb-8"
          >
            {subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="px-7 py-3 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              {ctaText}
            </button>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#161616] hover:text-[#7B5CF5] transition-colors group cursor-pointer py-2"
            >
              <span>See pricing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Demo Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FeaturesHero;

