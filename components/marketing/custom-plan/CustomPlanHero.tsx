"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import type { CustomPlanHero as CustomPlanHeroType } from "@/types/content";
import { BrandPreviewMock } from "./BrandPreviewMock";

interface CustomPlanHeroProps {
  hero: CustomPlanHeroType;
}

export function CustomPlanHero({ hero }: CustomPlanHeroProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const eyebrow = hero.eyebrow || "✦ CUSTOM PLAN";
  const title = hero.title || "Your own LMS and mobile apps, live in days";
  const highlightedWords = hero.highlightedWords || "live in days";
  const subtitle =
    hero.subtitle ||
    "Tell us how you teach. Our team builds your branded academy, website and Android & iOS apps, sets everything up, and stays with you after launch.";
  const primaryCta = hero.primaryCta || { label: "Plan my custom LMS", href: "#plan" };
  const secondaryCta = hero.secondaryCta || { label: "Book a 20-minute call", action: "demo" };
  const proofChips = hero.proofChips || [
    "Web + Android + iOS",
    "Your domain and brand",
    "Setup and support included",
  ];

  // Render title with highlighted words styled in accent
  const renderTitle = () => {
    if (!highlightedWords || !title.includes(highlightedWords)) {
      return title;
    }
    const parts = title.split(highlightedWords);
    return (
      <>
        {parts[0]}
        <span className="text-[#7B5CF5] relative inline-block">
          {highlightedWords}
        </span>
        {parts[1]}
      </>
    );
  };

  const handlePrimaryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("plan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSecondaryClick = () => {
    setShowDemoModal(true);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-28 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 font-urbanist border-b border-[#ECEDEF]">
      {/* Subtle Dot Grid Hero Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hero-dot-pattern"
      />

      {/* Background Soft Purple Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-[#7B5CF5]/7 rounded-full blur-[140px] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Hero Copy & Actions */}
          <div className="lg:col-span-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#7B5CF5] text-xs font-semibold uppercase tracking-[0.08em] mb-6">
              <span>✦</span>
              <span>{eyebrow.replace(/^✦\s*/, "")}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-bold text-[#161616] tracking-tight leading-[1.08] mb-5">
              {renderTitle()}
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] text-[#6B6F76] max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8">
              <a
                href="#plan"
                onClick={handlePrimaryClick}
                className="px-7 py-3.5 rounded-full bg-[#161616] hover:bg-black text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                {primaryCta.label}
              </a>

              <button
                type="button"
                onClick={handleSecondaryClick}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F4F6] text-[#161616] text-sm font-semibold border border-[#ECEDEF] transition-all cursor-pointer group shadow-2xs"
              >
                <Calendar className="w-4 h-4 text-[#7B5CF5]" />
                <span>{secondaryCta.label}</span>
              </button>
            </div>

            {/* Proof Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-medium text-[#6B6F76]">
              {proofChips.map((chip, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Brand Preview Signature Widget */}
          <div className="lg:col-span-6 flex justify-center">
            <BrandPreviewMock config={hero.brandPreview} interactive={true} />
          </div>
        </div>
      </div>

      {/* Demo Modal with Topic "Custom plan" */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent
          className="max-w-[460px] p-0 border-none bg-transparent shadow-none"
          showCloseButton={false}
        >
          <EnquiryForm
            onClose={() => setShowDemoModal(false)}
            initialTopic="Custom plan"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default CustomPlanHero;

