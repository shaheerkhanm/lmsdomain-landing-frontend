import type { FaqItem } from "@/types/content";

export interface PlatformFeature {
  title: string;
  description: string;
  icon?: string;
  /** Lowest plan that includes it, when not every plan does (e.g. "Growth", "Pro"). */
  plan?: string;
}

export interface SolutionLink {
  title: string;
  href: string;
  description: string;
}

export interface PlatformPageData {
  slug: string;
  eyebrow: string;
  /** Phrase inside the title to highlight with the brand gradient. */
  heroAccent?: string;
  /** One small Domie AI line (always plan-labelled). Only on Teach, Assess and Manage. */
  aiNote?: string;
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

