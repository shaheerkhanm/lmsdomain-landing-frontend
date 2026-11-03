"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { CustomPlanFaq as CustomPlanFaqType } from "@/types/content";

interface CustomPlanFaqProps {
  faq?: CustomPlanFaqType;
}

export function CustomPlanFaq({ faq }: CustomPlanFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || !faq.items || faq.items.length === 0) return null;

  const title = faq.title || "Frequently asked questions";
  const items = faq.items;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-20 lg:py-28 font-urbanist border-b border-[#ECEDEF]">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Large Rounded Enclosure Card (Landing FAQ Card Style) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#ECEDEF] p-8 sm:p-12 lg:px-14 lg:pb-14 lg:pt-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Title & Subtitle */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
                <span>✦</span>
                <span>FAQS</span>
              </div>

              <h2 className="text-[32px] sm:text-4xl lg:text-5xl font-semibold text-[#161616] tracking-tight leading-tight">
                {title}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                Everything you need to know about timeline, custom apps, data ownership, and pricing.
              </p>

              <div className="pt-2">
                <a
                  href="#plan"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Plan my custom LMS</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Clean Divider Accordion Items */}
            <div className="lg:col-span-7 divide-y divide-slate-100 text-left">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#161616] group-hover:text-[#7B5CF5] transition-colors">
                        {item.question}
                      </span>
                      <div
                        className={`size-7 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                          isOpen
                            ? "bg-[#161616] border-[#161616] text-white"
                            : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                        }`}
                      >
                        <ChevronDown
                          className={`size-3.5 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                            {item.answer}
                          </p>
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
    </section>
  );
}

export default CustomPlanFaq;

