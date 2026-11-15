"use client";

import React from "react";
import { FAQ, type FaqItem as UiFaqItem } from "@/components/marketing/ui/FAQ";
import type { FaqItem } from "@/types/content";

interface MarketingFaqProps {
  id?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  eyebrow?: string;
  ctaText?: string;
}

export function MarketingFaq({
  id = "faqSection",
  eyebrow = "FAQS",
  ctaText = "Book a demo",
  title = "You ask – we answer.",
  subtitle = "Everything you need to know about course grounding, privacy, and add-on availability.",
  items = [],
}: MarketingFaqProps) {
  if (!items || items.length === 0) return null;

  const normalizedItems: UiFaqItem[] = items.map((item, idx) => ({
    id: `pricing-faq-${idx}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <FAQ
      id={id}
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      items={normalizedItems}
      contactHref="/contact"
    />
  );
}

export default MarketingFaq;
