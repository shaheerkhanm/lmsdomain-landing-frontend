"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
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
}

export function FAQ({
  items = [],
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about setting up and running your academy on LMS Domain.",
  eyebrow = "QUESTIONS & ANSWERS",
  id = "faqSection",
  className,
  showJsonLd = true,
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

  return (
    <div id={id} className={cn("w-full py-16 sm:py-20 lg:py-28 font-urbanist", className)}>
      {showJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] border border-[#DDD6FE] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#7B5CF5] mb-4">
              <span>✦</span>
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-28 sm:text-36 font-semibold text-[#161616] tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-16 sm:text-18 text-[#6B6F76] mt-3 leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accessible Accordion */}
        <AccordionPrimitive.Root
          type="single"
          collapsible
          className="space-y-4"
        >
          {items.map((item, index) => {
            const itemId = item.id || `faq-${index}`;
            return (
              <AccordionPrimitive.Item
                key={itemId}
                value={itemId}
                className="rounded-2xl border border-[#EAE8E2] bg-white overflow-hidden transition-all duration-200 data-[state=open]:border-[#161616] data-[state=open]:shadow-sm"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger
                    className="flex flex-1 items-center justify-between gap-4 p-5 sm:p-6 text-left text-base sm:text-lg font-semibold text-[#161616] transition-all hover:text-[#7B5CF5] focus-visible:outline-2 focus-visible:outline-[#7B5CF5] [&[data-state=open]>svg]:rotate-180 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown className="size-4 shrink-0 text-[#6B6F76] transition-transform duration-200" />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content
                  className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-[#6B6F76] leading-relaxed border-t border-[#F0EFEA] pt-4"
                >
                  {item.answer.includes("<") ? (
                    <div
                      className="prose prose-sm max-w-none text-[#6B6F76]"
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
      </div>
    </div>
  );
}

export default FAQ;

