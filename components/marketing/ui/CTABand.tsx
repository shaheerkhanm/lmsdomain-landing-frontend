"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";

export interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  handNote?: string;
  className?: string;
  tone?: "dark" | "warm" | "violet";
}

export function CTABand({
  title = "See your academy running on LMS Domain.",
  subtitle = "Book a 20-minute demo. We'll show it with your own course structure.",
  buttonText = "Book a demo",
  secondaryCta = { label: "See pricing", href: "/pricing" },
  handNote = "Your own domain on every plan · Set up with our team",
  className,
  tone = "dark",
}: CTABandProps) {
  const [showModal, setShowModal] = useState(false);

  const isDark = tone === "dark";

  return (
    <>
      <div
        className={cn(
          "w-full py-20 sm:py-28 font-sans relative overflow-hidden",
          isDark
            ? "bg-[#0E0E11] text-white"
            : tone === "violet"
            ? "bg-[#6C4BFF] text-white"
            : "bg-[#FAFAFA] text-[#151517] border-y border-[#E8E8EC]",
          className
        )}
      >
        {/* Soft warm glow behind dark CTA */}
        {isDark && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 glow-warm-bottom opacity-70"
          />
        )}

        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          <span className="eyebrow inline-block font-sans font-semibold text-[11.5px] uppercase tracking-[0.12em] text-grad-v4 mb-3.5 select-none">
            Book a demo
          </span>

          <h2 className="type-h2-v4 text-white max-w-[20ch] mx-auto">
            {title}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "mt-4 text-[16px] leading-[26px] max-w-[56ch] mx-auto leading-relaxed",
                isDark ? "text-[#8A8A96]" : tone === "violet" ? "text-violet-100" : "text-[#535361]"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="btn-v4-dark cursor-pointer"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3.5 h-3.5">
                <path d="M5 11 11 5M6 5h5v5" />
              </svg>
              <span>{buttonText}</span>
            </button>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn-v4-light"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {handNote && (
            <p className="font-hand text-[19px] leading-tight text-[#8A8A96] mt-3">
              {handNote}
            </p>
          )}
        </div>
      </div>

      {/* Demo Enquiry Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[560px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-slate-200">
          <EnquiryForm onClose={() => setShowModal(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CTABand;

