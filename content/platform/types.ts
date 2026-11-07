import type { FaqItem } from "@/types/content";

export interface PlatformFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface SolutionLink {
  title: string;
  href: string;
  description: string;
}

export interface PlatformPageData {
  slug: string;
  eyebrow: string;
  badge?: string;
  title: string;
  subtitle: string;
  metaTitle?: string;
  metaDescription?: string;
  sectionHeading?: string;
  frameTitle: string;
  frameAlt: string;
  features: PlatformFeature[];
  usedFor: SolutionLink[];
  faqs?: FaqItem[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

