"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, Plus } from "lucide-react";
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
  /** Kept for compatibility; the v5 design is the same either way. */
  minimal?: boolean;
}

const FACES = ["/assets/img/home/participant_mia.jpg", "/assets/img/home/participant_alex.jpg", "/assets/img/home/testimonials/author-1.jpg"];

/** Shared v5 FAQ: sticky heading with a help card, card accordion (open card turns dark), FAQPage JSON-LD. */
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
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(typeof defaultOpenIndex === "number" ? defaultOpenIndex : 0);
  const [showDemoModal, setShowDemoModal] = useState(false);

  if (!items || items.length === 0) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer.replace(/<[^>]*>/g, "") },
    })),
  };

  return (
    <section id={id} className={cn("bg-white py-[clamp(72px,9vw,128px)] font-sans text-[#0A0A0B]", className)}>
      {showJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="mx-auto w-full max-w-[1200px] px-[clamp(16px,4vw,40px)]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left: heading + help card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#F4F5F8] px-3 py-1 text-[13px] font-medium text-[#3F3F46]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6C4BFF]" /> {eyebrow}
            </p>
            <h2 className="mt-5 font-urbanist text-[clamp(38px,4.6vw,60px)] font-semibold leading-[1] tracking-[-0.045em] [text-wrap:balance]">{title}</h2>
            {subtitle && <p className="mt-5 max-w-[420px] text-[17px] leading-[1.6] text-[#52525B]">{subtitle}</p>}

            <div className="mt-9 rounded-[24px] bg-[#F4F5F8] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {FACES.map((f, i) => (
                    <Image key={f} src={f} alt="" width={72} height={72} className={cn("h-10 w-10 rounded-full object-cover object-top ring-[3px] ring-[#F4F5F8]", i > 0 && "-ml-3")} />
                  ))}
                </div>
                <p className="text-[13px] leading-[1.4] text-[#71717A]">
                  Real people from our team
                  <br />
                  read every message
                </p>
              </div>
              <p className="mt-5 font-urbanist text-[24px] font-semibold leading-[1.15] tracking-[-0.02em]">Still have questions?</p>
              <p className="mt-1.5 text-[14.5px] leading-[1.55] text-[#52525B]">See LMS Domain with your own courses, or send us a message.</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#0A0A0B] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#27272A]"
                >
                  {ctaText} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <Link href={contactHref} className="text-[14px] font-semibold text-[#0A0A0B] underline-offset-4 hover:underline">
                  Contact us
                </Link>
              </div>
            </div>
          </div>

          {/* Right: card accordion; the open card turns dark */}
          <ul className="flex flex-col gap-3">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              const panelId = `${id}-answer-${idx}`;
              const triggerId = `${id}-trigger-${idx}`;
              return (
                <li
                  key={item.id ?? idx}
                  className={cn(
                    "relative isolate overflow-hidden rounded-[22px] border transition-[background-color,border-color,box-shadow] duration-300",
                    isOpen
                      ? "border-transparent bg-[#0B0A12] text-white shadow-[0_30px_60px_-30px_rgba(11,10,18,0.6)]"
                      : "border-[#ECECF0] bg-white hover:border-[#D4D4D8] hover:shadow-[0_10px_30px_-18px_rgba(16,16,24,0.25)]"
                  )}
                >
                  <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0")}>
                    <span className="absolute -left-16 -top-24 h-[240px] w-[320px] rounded-full bg-[#6C4BFF] opacity-40 blur-3xl" />
                    <span className="absolute -bottom-24 -right-10 h-[220px] w-[300px] rounded-full bg-[#2F5BFF] opacity-25 blur-3xl" />
                  </span>
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="group flex w-full cursor-pointer items-center gap-4 rounded-[22px] px-5 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6C4BFF] sm:px-7 sm:py-6"
                    >
                      <span className="flex-1 font-urbanist text-[clamp(17px,1.5vw,20px)] font-semibold leading-[1.3] tracking-[-0.015em]">{item.question}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                          isOpen ? "bg-white text-[#0A0A0B]" : "bg-[#F4F5F8] text-[#0A0A0B] group-hover:bg-[#0A0A0B] group-hover:text-white"
                        )}
                      >
                        {isOpen ? <Minus className="h-4 w-4" strokeWidth={2} /> : <Plus className="h-4 w-4" strokeWidth={2} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          "max-w-[62ch] px-5 pb-6 text-[15.5px] leading-[1.7] text-white/70 transition-opacity duration-300 sm:px-7 sm:pb-7",
                          "[&_a]:font-medium [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5",
                          isOpen ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {item.answer.includes("<") ? <div dangerouslySetInnerHTML={{ __html: item.answer }} /> : <p>{item.answer}</p>}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className={DEMO_DIALOG_CLASS}>
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default FAQ;
