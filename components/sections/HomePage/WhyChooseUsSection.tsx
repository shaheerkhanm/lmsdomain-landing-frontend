"use client";

import React from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/marketing/ui";
import { Check } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section className="py-[clamp(72px,9vw,128px)] pt-0 font-sans" id="why">
      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)]">
        <div className="rv-v4">
          <Eyebrow dotColor="#151517">Why choose us</Eyebrow>
          <h2 className="type-h2-v4 text-[#151517] mt-1">
            Why academies choose LMS Domain
          </h2>
        </div>

        {/* Stacked Cards Container */}
        <div className="flex flex-col gap-5 sm:gap-[22px] mt-11">
          {/* Card 1: Built for batches */}
          <article className="rv-v4 lg:sticky lg:top-[96px] bg-white border border-[#E8E8EC] rounded-[24px] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] overflow-hidden shadow-[0_30px_60px_-40px_rgba(20,20,40,0.35)] min-h-[360px]">
            <div className="p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono-code font-medium text-[12px] text-[#8A8A96]">
                  01
                </span>
                <h3 className="text-[clamp(24px,3vw,32px)] font-bold text-[#151517] tracking-tight my-2.5">
                  Built for batches
                </h3>
                <p className="text-[#535361] text-[15px] sm:text-[16px] leading-[1.55] max-w-[40ch]">
                  Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching.
                </p>
              </div>
              <span className="w-10 h-10 rounded-[12px] bg-[#151517] text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M5 11 11 5M6 5h5v5" />
                </svg>
              </span>
            </div>

            {/* Visual: Live Class Photo + Real Zoom Logo */}
            <div className="relative bg-[#F4F4F7] min-h-[260px] md:min-h-[320px] overflow-hidden">
              <Image
                src="/images/features/live-class-screen.webp"
                alt="Live class in progress"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                loading="lazy"
                className="object-cover"
              />
              <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 bg-[#D9383E] text-white font-bold text-[10.5px] tracking-[0.08em] px-2 py-1 rounded-[6px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-live-blink" />
                LIVE
              </span>
              <div className="absolute left-3.5 right-3.5 bottom-3.5 sm:left-4 sm:right-4 sm:bottom-4 bg-white/95 backdrop-blur-md rounded-[14px] p-3 px-3.5 flex items-center gap-3 text-[13px] shadow-sm">
                <div className="w-8 h-8 rounded-[9px] bg-white border border-[#E8E8EC] flex items-center justify-center shrink-0 p-1">
                  <Image
                    src="/assets/img/integration/integration-6.png"
                    alt="Zoom"
                    width={24}
                    height={24}
                    className="w-5 h-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <b className="block text-[13.5px] text-[#151517] truncate">
                    Batch B · Architecture Blueprint
                  </b>
                  <small className="text-[#535361] text-xs block truncate">
                    Zoom Class · 24 learners · recording on
                  </small>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: Sell in any currency */}
          <article className="rv-v4 lg:sticky lg:top-[96px] bg-white border border-[#E8E8EC] rounded-[24px] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] overflow-hidden shadow-[0_30px_60px_-40px_rgba(20,20,40,0.35)] min-h-[360px]">
            <div className="p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono-code font-medium text-[12px] text-[#8A8A96]">
                  02
                </span>
                <h3 className="text-[clamp(24px,3vw,32px)] font-bold text-[#151517] tracking-tight my-2.5">
                  Sell in any currency
                </h3>
                <p className="text-[#535361] text-[15px] sm:text-[16px] leading-[1.55] max-w-[40ch]">
                  Indian and international gateways on one checkout.
                </p>
              </div>
              <span className="w-10 h-10 rounded-[12px] bg-[#151517] text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M5 11 11 5M6 5h5v5" />
                </svg>
              </span>
            </div>

            {/* Visual: Dotted Canvas with Real Gateway Logos & Currencies */}
            <div className="relative bg-[#FBFBFC] bg-[radial-gradient(#DADAE0_1px,transparent_1.2px)] [background-size:18px_18px] p-6 sm:p-8 flex items-center justify-center min-h-[260px] md:min-h-[320px]">
              <div className="flex flex-wrap gap-2.5 justify-center max-w-[340px]">
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-semibold text-[14px] text-[#151517] shadow-xs flex items-center gap-1.5">
                  <em className="not-italic text-[#12A27A] font-bold">INR</em>₹4,499
                </span>
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-semibold text-[14px] text-[#151517] shadow-xs flex items-center gap-1.5">
                  <em className="not-italic text-[#2F6BFF] font-bold">USD</em>$54
                </span>
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-semibold text-[14px] text-[#535361] shadow-xs">
                  EUR €
                </span>
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-semibold text-[14px] text-[#535361] shadow-xs">
                  GBP £
                </span>
                {/* Real Razorpay Logo */}
                <div className="bg-white border border-[#E8E8EC] rounded-[10px] py-1.5 px-3 flex items-center shadow-xs">
                  <Image
                    src="/assets/img/integration/integration-1.png"
                    alt="Razorpay"
                    width={68}
                    height={20}
                    className="h-4.5 w-auto object-contain"
                  />
                </div>
                {/* Clean Paytm Wordmark */}
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-bold text-[13px] text-[#00B9F1] shadow-xs">
                  Paytm
                </span>
                {/* Real Stripe Logo */}
                <div className="bg-white border border-[#E8E8EC] rounded-[10px] py-1.5 px-3 flex items-center shadow-xs">
                  <Image
                    src="/assets/img/integration/integration-8.png"
                    alt="Stripe"
                    width={52}
                    height={20}
                    className="h-4.5 w-auto object-contain"
                  />
                </div>
                {/* Clean DOKU Wordmark */}
                <span className="bg-white border border-[#E8E8EC] rounded-[10px] py-2 px-3 font-bold text-[13px] text-[#E2231A] shadow-xs">
                  DOKU
                </span>
              </div>
            </div>
          </article>

          {/* Card 3: Set up with you */}
          <article className="rv-v4 lg:sticky lg:top-[96px] bg-white border border-[#E8E8EC] rounded-[24px] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] overflow-hidden shadow-[0_30px_60px_-40px_rgba(20,20,40,0.35)] min-h-[360px]">
            <div className="p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <span className="font-mono-code font-medium text-[12px] text-[#8A8A96]">
                  03
                </span>
                <h3 className="text-[clamp(24px,3vw,32px)] font-bold text-[#151517] tracking-tight my-2.5">
                  Set up with you
                </h3>
                <p className="text-[#535361] text-[15px] sm:text-[16px] leading-[1.55] max-w-[40ch]">
                  Our team helps move your courses and learners in and trains your staff.
                </p>
              </div>
              <span className="w-10 h-10 rounded-[12px] bg-[#151517] text-white flex items-center justify-center shrink-0">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d="M5 11 11 5M6 5h5v5" />
                </svg>
              </span>
            </div>

            {/* Visual: Dotted Canvas with Onboarding Checklist */}
            <div className="relative bg-[#FBFBFC] bg-[radial-gradient(#DADAE0_1px,transparent_1.2px)] [background-size:18px_18px] p-6 sm:p-8 flex items-center justify-center min-h-[260px] md:min-h-[320px]">
              <div className="bg-white border border-[#E8E8EC] rounded-[16px] p-4.5 w-full max-w-[330px] grid gap-2.5 shadow-xs">
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#151517]">
                  <span className="w-5 h-5 rounded-[6px] bg-[#E8F8F0] text-[#12A27A] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Courses & video migration</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#151517]">
                  <span className="w-5 h-5 rounded-[6px] bg-[#E8F8F0] text-[#12A27A] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Domain & SSL configuration</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#151517]">
                  <span className="w-5 h-5 rounded-[6px] bg-[#E8F8F0] text-[#12A27A] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Payment gateway & GST setup</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#151517]">
                  <span className="w-5 h-5 rounded-[6px] bg-[#E8F8F0] text-[#12A27A] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Faculty & instructor training</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
