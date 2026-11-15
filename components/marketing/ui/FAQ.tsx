"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm, { DEMO_DIALOG_CLASS } from "@/components/layout/common/EnquiryForm";

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  id?: string;
  className?: string;
  showJsonLd?: boolean;
  variant?: "default" | "dark-panel";
  contactHref?: string;
  ctaText?: string;
  defaultOpenIndex?: number;
  /** Quieter style: no sparkle, neutral open border, light outlined icon. */
  minimal?: boolean;
}

export function FAQ({
  items = [],
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about setting up, running and scaling your academy on LMS Domain.",
  eyebrow = "FAQs",
  id = "faq",
  className,
  showJsonLd = true,
  contactHref = "/contact",
  ctaText = "Book a demo",
  defaultOpenIndex,
  minimal = false,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    typeof defaultOpenIndex === "number" ? defaultOpenIndex : null
  );
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (!items || items.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Generate FAQPage JSON-LD for rich snippets
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/<[^>]*>/g, ""),
      },
    })),
  };

  return (
    <section id={id} className={cn("bg-white py-16 sm:py-20 lg:py-24 font-sans border-b border-[#ECEDEF]", className)}>
      {showJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Large Rounded Enclosure Card (Matching /pricing FAQ layout & structure) */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#FAFAFA] border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Heading, Subtitle, CTA Button */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#6C4BFF]">
                  {!minimal && <span>✦</span>}
                  <span>{eyebrow}</span>
                </div>

                <h2 className="text-[30px] sm:text-[36px] lg:text-[44px] font-semibold text-[#151517] tracking-tight leading-[1.1] mt-3">
                  {title}
                </h2>

                <p className="text-[15px] sm:text-[16px] text-[#535361] leading-relaxed font-normal mt-3 max-w-[38ch]">
                  {subtitle}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#151517] text-white text-[13px] font-semibold hover:bg-black transition-all active:scale-95 shadow-xs cursor-pointer"
                  >
                    <span>{ctaText}</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <Link
                    href={contactHref}
                    className="text-[13.5px] font-semibold text-[#535361] hover:text-[#151517] transition-colors"
                  >
                    Contact us →
                  </Link>
                </div>
              </div>

              {/* Helper Microcopy at bottom of left column */}
              <p className="hidden lg:block text-xs text-[#8A8A96] mt-8">
                Need help choosing? Our team is available 7 days a week.
              </p>
            </div>

            {/* Right Column: Clean Accordion Items with Dark Round + Button & Gradient Active Border */}
            <div className="lg:col-span-7 flex flex-col gap-2.5 text-left">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const panelId = `faq-answer-${idx}`;
                const triggerId = `faq-trigger-${idx}`;

                return (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-[16px] transition-all duration-200 overflow-hidden",
                      isOpen
                        ? minimal
                          ? "bg-white border border-[#0A0A0B]"
                          : "shadow-[0_8px_24px_-6px_rgba(123,92,255,0.14)]"
                        : "bg-white border border-[#E8E8EC] hover:border-[#D4D4DC]"
                    )}
                    style={
                      isOpen && !minimal
                        ? {
                            border: "1px solid transparent",
                            background:
                              "linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(135deg, #7B5CFF 0%, #E2539B 50%, #F2894A 100%) border-box",
                          }
                        : {}
                    }
                  >
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(idx)}
                      className="group w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <span className="text-[15px] sm:text-[16px] font-medium text-[#151517] group-hover:text-[#7B5CFF] transition-colors">
                        {item.question}
                      </span>

                      {/* Dark round button with white '+' rotating 45° to '×' (200ms) (§4c) */}
                      <span
                        className={cn(
                          "w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full grid place-items-center shrink-0 transition-transform duration-200 group-hover:scale-105",
                          minimal ? "border border-[#E4E4E7] bg-white text-[#0A0A0B]" : "text-white bg-[#151517] shadow-xs"
                        )}
                      >
                        <span
                          className={cn(
                            minimal ? "text-[#0A0A0B]" : "text-white",
                            "text-[20px] font-light leading-none mb-0.5 inline-block transition-transform duration-200 motion-reduce:transition-none",
                            isOpen && "rotate-45"
                          )}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </span>
                    </button>

                    {/* Smooth height animation via CSS grid-template-rows (250ms) (§4d) */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="grid transition-[grid-template-rows] duration-250 ease-out motion-reduce:transition-none"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-[14px] sm:text-[14.5px] text-[#535361] leading-relaxed max-w-[65ch]">
                          {item.answer.includes("<") ? (
                            <div
                              className="prose prose-sm max-w-none text-[#535361]"
                              dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                          ) : (
                            <p>{item.answer}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Enquiry Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className={DEMO_DIALOG_CLASS}>
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default FAQ;
