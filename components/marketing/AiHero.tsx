"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Command, FileText, Sliders, Bot } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import type { CommandBarExample } from "@/types/content";

interface AiHeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; action?: string; href?: string };
  secondaryCta?: { label: string; href: string };
  commandBarExamples?: CommandBarExample[];
  badge?: string;
  suggestionsLabel?: string;
  keyboardLabel?: string;
}

export function AiHero({
  eyebrow = "✦ DOMIE AI",
  title = "AI Grounded in Your Courses, Built for Your Entire Academy",
  subtitle = "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.",
  primaryCta = { label: "Request Demo", action: "modal" },
  secondaryCta = { label: "View Pricing", href: "/pricing" },
  commandBarExamples = [],
  badge = "Premium",
  suggestionsLabel = "Suggestions",
  keyboardLabel = "Keyboard Nav Available",
}: AiHeroProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  const examples = commandBarExamples.length > 0 ? commandBarExamples : [
    {
      query: "How do I configure custom certificates?",
      results: [
        { kind: "page" as const, title: "Certificate Templates", subtitle: "Courses > Settings > Certificates" },
        { kind: "setting" as const, title: "Enable Automatic Certificate Issuing", subtitle: "Issue PDF certificates upon 100% completion" },
        { kind: "answer" as const, title: "Upload your certificate template and place merge tags for learner name and completion date." },
      ],
    },
  ];

  const currentExample = examples[activeIdx] || examples[0];
  const fullText = currentExample.query;

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReduced(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReduced(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Time-based typewriter effect: 40ms per char, pause 1.6s, then delete and next
  useEffect(() => {
    if (isReduced) {
      setCharCount(fullText.length);
      return;
    }

    let timer: NodeJS.Timeout;

    if (!isDeleting && charCount < fullText.length) {
      timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 40);
    } else if (!isDeleting && charCount === fullText.length) {
      // Pause 1.6s at full length
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && charCount > 0) {
      // Faster backspace
      timer = setTimeout(() => {
        setCharCount((prev) => prev - 2 > 0 ? prev - 2 : 0);
      }, 25);
    } else if (isDeleting && charCount === 0) {
      setIsDeleting(false);
      setActiveIdx((prev) => (prev + 1) % examples.length);
    }

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, fullText, examples.length, isReduced]);

  const displayedText = isReduced ? fullText : fullText.slice(0, charCount);

  return (
    <section className="bg-white pt-32 sm:pt-36 lg:pt-40 pb-20 sm:pb-24 lg:pb-28 font-urbanist relative overflow-hidden border-b border-[#ECEDEF]">
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] bg-[#7B5CF5]/8 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow & Premium Pill */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5]">
            <span>✦</span>
            <span>{eyebrow.replace(/^✦\s*/, "")}</span>
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EEE9FF] text-[#161616]">
            {badge}
          </span>
        </div>

        {/* H1 (64px desktop / 40px mobile) */}
        <h1 className="text-[38px] sm:text-[50px] lg:text-[64px] font-bold text-[#161616] tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#6B6F76] max-w-2xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14 sm:mb-16">
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            {primaryCta.label}
          </button>

          <Link
            href={secondaryCta.href || "/pricing"}
            className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all cursor-pointer group"
          >
            <span>{secondaryCta.label}</span>
            <ArrowRight className="w-4 h-4 text-[#8F94A0] group-hover:text-[#161616] group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* AI COMMAND BAR (Hero Visual) */}
        <div className="max-w-[720px] mx-auto text-left">
          {/* Outer Command Bar Input */}
          <div
            aria-label="Interactive demonstration of the AI command bar search"
            className="w-full h-16 rounded-[20px] bg-white border border-[#ECEDEF] shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-4 sm:px-6 flex items-center justify-between gap-3 relative transition-all"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="size-8 rounded-lg bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 flex items-center">
                <span className="text-sm sm:text-base font-medium text-[#161616] truncate">
                  {displayedText}
                </span>
                {!isReduced && (
                  <span className="inline-block w-0.5 h-5 bg-[#7B5CF5] ml-0.5 animate-pulse shrink-0" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2 py-1 rounded-md bg-[#F3F4F6] text-xs font-mono font-medium text-[#8F94A0] border border-[#ECEDEF] hidden sm:inline-flex items-center gap-0.5">
                <Command className="w-3 h-3 inline" />
                <span>K</span>
              </span>
            </div>
          </div>

          {/* White Results Card below Command Bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExample.query}
              initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-3.5 rounded-[20px] bg-white border border-[#ECEDEF] p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.05)] space-y-2"
            >
              <div className="flex items-center justify-between px-2 pt-1 pb-1 text-[11px] font-semibold text-[#8F94A0] uppercase tracking-wider border-b border-[#F3F4F6]">
                <span>{suggestionsLabel}</span>
                <span>{keyboardLabel}</span>
              </div>

              {currentExample.results.map((res, i) => (
                <motion.div
                  key={i}
                  initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: isReduced ? 0 : i * 0.06, duration: 0.2 }}
                  className="p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors flex items-start gap-3 border border-transparent hover:border-[#ECEDEF] cursor-default"
                >
                  <div className="size-7 rounded-lg bg-[#F3F4F6] text-[#6B6F76] flex items-center justify-center shrink-0 mt-0.5">
                    {res.kind === "page" && <FileText className="w-3.5 h-3.5" />}
                    {res.kind === "setting" && <Sliders className="w-3.5 h-3.5" />}
                    {res.kind === "answer" && <Bot className="w-3.5 h-3.5 text-[#7B5CF5]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-[#161616] truncate">
                        {res.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F3F4F6] text-[#8F94A0] uppercase font-bold shrink-0">
                        {res.kind}
                      </span>
                    </div>
                    {res.subtitle && (
                      <p className="text-[12px] text-[#6B6F76] truncate">
                        {res.subtitle}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Demo Enquiry Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default AiHero;
