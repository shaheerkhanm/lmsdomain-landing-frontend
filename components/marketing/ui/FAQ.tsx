"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
}

export function FAQ({
  items = [],
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about setting up and running your academy on LMS Domain.",
  eyebrow = "FAQs",
  id = "faq",
  className,
  showJsonLd = true,
  variant = "default",
  contactHref = "/contact",
}: FAQProps) {
  if (!items || items.length === 0) return null;

  // Generate FAQPage JSON-LD for rich snippets
  const faqJsonLd = {
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

  const defaultOpenId = items[1]?.id || `faq-1`;

  return (
    <section id={id} className={cn("faqband font-sans", className)}>
      {showJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        <div className="rv-v4 faqpanel">
          {/* Top Header */}
          <div className="grid justify-items-center gap-1.5 mb-10 text-center">
            {eyebrow && (
              <span className="eyebrow inline-block font-sans font-semibold text-[11.5px] uppercase tracking-[0.12em] text-grad-v4 select-none m-0">
                {eyebrow}
              </span>
            )}
            <h2 className="text-[clamp(32px,4.4vw,48px)] font-bold text-[#151517] tracking-[-0.03em] leading-[1.08]">
              {title}
            </h2>
          </div>

          {/* Accordion List */}
          <AccordionPrimitive.Root
            type="single"
            collapsible
            defaultValue={defaultOpenId}
            className="grid gap-2"
          >
            {items.map((item, index) => {
              const itemId = item.id || `faq-${index}`;
              return (
                <AccordionPrimitive.Item
                  key={itemId}
                  value={itemId}
                  className="fq-item group"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className="grid grid-cols-[24px_1fr_38px] gap-3.5 items-center p-4 sm:p-[16px_18px] w-full text-left font-medium text-[15px] sm:text-[16px] text-[#151517] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C4BFF]"
                    >
                      <span className="w-6 h-6 rounded-[7px] bg-white border border-[#E8E8EC] grid place-items-center font-mono-code text-[11px] text-[#535361] shrink-0">
                        {index + 1}
                      </span>
                      <span className="flex-1 font-medium leading-snug">
                        {item.question}
                      </span>
                      <span className="w-[38px] h-[38px] rounded-full text-white grid place-items-center text-[20px] font-light shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)] ml-auto bg-[radial-gradient(circle_at_35%_30%,#444,#000_70%)] group-data-[state=open]:bg-white group-data-[state=open]:text-[#151517] group-data-[state=open]:shadow-[inset_0_0_0_1px_#E8E8EC,0_0_0_3px_rgba(201,184,255,0.35)] transition-all">
                        <span className="group-data-[state=open]:hidden leading-none mb-0.5">+</span>
                        <span className="hidden group-data-[state=open]:inline leading-none mb-0.5">×</span>
                      </span>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content
                    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-[18px] pb-5 pl-14 text-[14.5px] text-[#535361] leading-relaxed max-w-[70ch]"
                  >
                    {item.answer.includes("<") ? (
                      <div
                        className="prose prose-sm max-w-none text-[#535361]"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              );
            })}
          </AccordionPrimitive.Root>

          {/* More Footer */}
          <div className="text-center mt-7.5 text-[14px] text-[#4E4E4E]">
            <p>
              Have any other questions?<br />
              <Link href={contactHref} className="text-[#151517] font-semibold hover:underline">
                Contact us →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
