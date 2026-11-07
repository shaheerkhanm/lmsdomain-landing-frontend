import type { FaqItem } from "@/types/content";

export interface SolutionFeature {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface PlatformLink {
  title: string;
  href: string;
  description: string;
}

export interface SolutionPageData {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle?: string;
  metaDescription?: string;
  sectionHeading?: string;
  features: SolutionFeature[];
  platformLinks?: PlatformLink[];
  faqs?: FaqItem[];
  customerNote?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

