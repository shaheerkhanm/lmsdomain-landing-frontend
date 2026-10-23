"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import type { FaqItem } from "@/types/content";

interface MarketingFaqProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  eyebrow?: string;
  ctaText?: string;
}

export function MarketingFaq({
  eyebrow = "FAQS",
  ctaText = "Request a Demo",
  title = "You ask – we answer.",
  subtitle = "Everything you need to know about course grounding, privacy, and add-on availability.",
  items = [],
}: MarketingFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (!items || items.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Large Rounded Enclosure Card (Landing FAQ Card Style) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#ECEDEF] p-8 sm:p-12 lg:px-14 lg:pb-14 lg:pt-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Title & Subtitle */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
                <span>✦</span>
                <span>{eyebrow}</span>
              </div>

              <h2 className="text-[32px] sm:text-4xl lg:text-5xl font-semibold text-[#161616] tracking-tight leading-tight">
                {title}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                {subtitle}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  {ctaText}
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Divider Accordion Items */}
            <div className="lg:col-span-7 divide-y divide-slate-100 text-left">
              {items.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="text-sm sm:text-base font-medium text-[#161616] group-hover:text-[#7B5CF5] transition-colors">
                        {faq.question}
                      </span>
                      <motion.svg
                        className="size-4 text-slate-400 shrink-0"
                        animate={{ rotate: isOpen ? 180 : 0, color: isOpen ? "#161616" : "#94A3B8" }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-1 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
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

export default MarketingFaq;
