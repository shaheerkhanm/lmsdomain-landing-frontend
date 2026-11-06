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
  className?: string;
  tone?: "dark" | "warm" | "violet";
}

export function CTABand({
  title = "See your academy running on LMS Domain.",
  subtitle = "Book a 20-minute demo. We'll show it with your own course structure.",
  buttonText = "Book a demo",
  secondaryCta,
  className,
  tone = "dark",
}: CTABandProps) {
  const [showModal, setShowModal] = useState(false);

  const isDark = tone === "dark";

  return (
    <>
      <div
        className={cn(
          "w-full py-16 sm:py-24 font-urbanist relative overflow-hidden",
          isDark
            ? "bg-[#161616] text-white"
            : tone === "violet"
            ? "bg-[#7B5CF5] text-white"
            : "bg-[#FAF9F6] text-[#161616] border-y border-[#EAE8E2]",
          className
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 text-center flex flex-col items-center">
          {/* H2 Title (never animated to keep LCP/readability solid) */}
          <h2 className="text-[28px] leading-[36px] sm:text-[36px] sm:leading-[44px] font-semibold tracking-tight max-w-[70ch] mx-auto">
            {title}
          </h2>

          {/* Subtitle Body (never animated) */}
          {subtitle && (
            <p
              className={cn(
                "mt-4 text-[16px] leading-[26px] sm:text-[18px] sm:leading-[28px] max-w-[70ch] mx-auto leading-relaxed",
                isDark ? "text-slate-300" : tone === "violet" ? "text-violet-100" : "text-[#6B6F76]"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* Action CTAs Button Container with optional subtle entry */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={cn(
                "px-7 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-95 shadow-sm inline-flex items-center gap-2 cursor-pointer",
                isDark
                  ? "bg-white hover:bg-slate-100 text-[#161616]"
                  : tone === "violet"
                  ? "bg-white hover:bg-slate-100 text-[#7B5CF5]"
                  : "bg-[#161616] hover:bg-black text-white"
              )}
            >
              <span>{buttonText}</span>
              <ArrowRight className="size-4" />
            </button>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(
                  "px-6 py-3.5 rounded-full text-sm font-semibold transition-all active:scale-95 border",
                  isDark
                    ? "border-white/20 hover:bg-white/10 text-white"
                    : tone === "violet"
                    ? "border-white/30 hover:bg-white/10 text-white"
                    : "border-[#EAE8E2] hover:bg-[#F3F4F6] text-[#161616]"
                )}
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
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

