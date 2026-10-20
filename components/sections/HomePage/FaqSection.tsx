"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { faqContent } from "@/content/home/faq";

const FAQS = faqContent.items;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // A23: Debounced ScrollTrigger.refresh() on accordion toggle
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => clearTimeout(timer);
  }, [openIndex]);

  // A22: Card entrance, heading transition #BDBDBD -> #161616, and row stagger
  useEffect(() => {
    const cardEl = cardRef.current;
    const headingEl = headingRef.current;
    const rowsEl = rowsRef.current;
    if (!cardEl || !headingEl || !rowsEl) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion?: boolean };

          if (reduceMotion) {
            gsap.set(cardEl, { y: 0, opacity: 1 });
            gsap.set(headingEl, { color: "#161616" });
            if (rowsEl.children) {
              gsap.set(rowsEl.children, { opacity: 1, y: 0 });
            }
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cardEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          // A22: The card rises 60 px on enter
          tl.fromTo(
            cardEl,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );

          // A22: The heading goes from #BDBDBD to #161616 on enter
          tl.fromTo(
            headingEl,
            { color: "#BDBDBD" },
            { color: "#161616", duration: 0.6, ease: "power2.out" },
            "<0.1"
          );

          // A22: Rows fade in with a 60 ms stagger
          if (rowsEl.children && rowsEl.children.length > 0) {
            tl.fromTo(
              rowsEl.children,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" },
              "<0.15"
            );
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="pt-0 lg:pt-6 pb-16 lg:pb-32 bg-[#F3F4F6] font-urbanist">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Large Rounded Enclosure Card (Mota 00:32 Exact Style) */}
        <div
          ref={cardRef}
          className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-100 p-8 sm:p-12 lg:px-14 lg:pb-14 lg:pt-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Title & Subtitle (Mota 00:32 Style) */}
            <div className="lg:col-span-5 space-y-4">
              <h2
                ref={headingRef}
                className="text-[32px] sm:text-4xl lg:text-5xl font-semibold text-[#161616] tracking-tight leading-tight"
              >
                You ask – we answer.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                {faqContent.subtitle}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161616] text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  Request a Demo
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Clean Divider Accordion Items */}
            <div ref={rowsRef} className="lg:col-span-7 divide-y divide-slate-100">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="faq-accordion-trigger w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="text-sm sm:text-base font-medium text-[#161616] group-hover:text-slate-600 transition-colors">
                        {faq.question}
                      </span>
                      {/* Subtle Right Chevron (Mota 00:32 Style) */}
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

                    {/* A23: Motion height: auto accordion expansion */}
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

      {/* Enquiry / Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default FaqSection;
