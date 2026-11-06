import type { FaqItem } from "@/types/content";
import { homeFaqItems } from "@/content/faq";

export const DEFAULT_PRICING_FAQS: FaqItem[] = homeFaqItems.map((item) => ({
  id: item.id,
  question: item.question,
  answer: item.answer,
}));
