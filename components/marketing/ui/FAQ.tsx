"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { Plus, Minus } from "lucide-react";

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
  id = "faqSection",
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

  if (variant === "dark-panel") {
    return (
      <section id={id} className={cn("w-full bg-[#151517] py-16 sm:py-24 font-sans", className)}>
        {showJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
          <div className="rv-v4 rounded-[28px] border border-white/10 bg-gradient-to-b from-[#24242A] to-[#18181C] p-6 sm:p-12 text-white">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
              <div>
                {eyebrow && (
                  <span className="eyebrow inline-block font-sans font-semibold text-[11.5px] uppercase tracking-[0.12em] text-grad-v4 mb-2 select-none">
                    {eyebrow}
                  </span>
                )}
                <h2 className="type-h2-v4 text-white">
                  {title}
                </h2>
              </div>
            </div>

            <AccordionPrimitive.Root
              type="single"
              collapsible
              className="space-y-2.5"
            >
              {items.map((item, index) => {
                const itemId = item.id || `faq-${index}`;
                return (
                  <AccordionPrimitive.Item
                    key={itemId}
                    value={itemId}
                    className="group rounded-[14px] border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-200 data-[state=open]:bg-white data-[state=open]:text-[#151517] data-[state=open]:border-transparent data-[state=open]:shadow-[0_0_0_1px_#fff,0_20px_40px_-15px_rgba(0,0,0,0.6)]"
                  >
                    <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger
                        className="flex flex-1 items-center gap-4.5 p-4.5 sm:p-5.5 text-left text-[15px] sm:text-[16px] font-semibold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#6C4BFF]"
                      >
                        <span className="font-mono-code text-xs text-[#8A8A96] group-data-[state=open]:text-[#535361] w-5 shrink-0">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-white group-data-[state=open]:text-[#151517]">
                          {item.question}
                        </span>
                        <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white ml-auto">
                          <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                          <Minus className="absolute h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-data-[state=open]:opacity-100" />
                        </span>
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content
                      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-white/70 group-data-[state=open]:text-[#535361] leading-relaxed pl-[42px] sm:pl-[58px]"
                    >
                      {item.answer.includes("<") ? (
                        <div
                          className="prose prose-sm max-w-none group-data-[state=open]:text-[#535361] text-white/80"
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

            <div className="mt-9 text-center text-sm text-[#8A8A96]">
              <p>
                Have any other questions?{" "}
                <Link href={contactHref} className="text-white font-semibold hover:underline">
                  Contact us →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] border border-[#DDD6FE] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-[#5925DC] mb-4">
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

