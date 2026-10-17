"use client";

import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does Widevine L1 hardware DRM prevent screen recording?",
    answer:
      "Widevine L1 decrypts video frames directly inside the device's secure hardware memory (TEE). Any screen capture application (such as OBS, QuickTime, browser recording extensions, or HDMI capture cards) receives a stream of pure black pixels. Additionally, a dynamic forensic watermark with the student's unique ID is burned into playback to identify unauthorized physical recording.",
  },
  {
    question: "Can I host the academy entirely on my own custom domain?",
    answer:
      "Yes. Every LMS Domain instance is 100% white-label. You point your custom DNS (e.g., academy.yourbrand.com) to our edge infrastructure. We automatically provision and renew wildcard SSL certificates, and all student emails and transactional receipts come from your branded domain.",
  },
  {
    question: "Do you take any revenue share or percentage from course sales?",
    answer:
      "No. We take a 0% revenue take rate. You connect your direct Stripe, Razorpay, or PayPal accounts, and all tuition and subscription fees deposit directly into your business bank accounts immediately.",
  },
  {
    question: "How does Domie AI generate course syllabi and auto-graded quizzes?",
    answer:
      "Domie AI analyzes your topic prompt, video transcripts, or uploaded lecture notes to draft structured multi-week syllabi, rubric-aligned multiple-choice questions, and coding challenges. You retain full editorial approval before anything is published to learners.",
  },
  {
    question: "Can I integrate my existing Zoom, Google Meet, or Vimeo accounts?",
    answer:
      "Yes. LMS Domain features native zero-code integrations with Zoom and Google Meet for live classrooms, Vimeo and AWS for custom video ingestion, and standard WebRTC for low-latency interactive breakout sessions.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-[#F8F9FA] font-inter">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Large Rounded Enclosure Card (Mota 00:32 Exact Style) */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/90 p-8 sm:p-14 lg:p-16 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left Column: Title & Subtitle (Mota 00:32 Style) */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
                You ask – we answer.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                All you want to know about product.
              </p>
            </div>

            {/* Right Column: Clean Divider Accordion Items */}
            <div className="lg:col-span-7 divide-y divide-slate-100">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-slate-600 transition-colors">
                        {faq.question}
                      </span>
                      {/* Subtle Right Chevron (Mota 00:32 Style) */}
                      <svg
                        className={`size-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-slate-800" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="pt-3 text-xs sm:text-sm text-slate-500 leading-relaxed animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
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

export default FaqSection;
