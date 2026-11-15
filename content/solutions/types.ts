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
  /** Present once the page has its v5 design. */
  v5?: SolutionV5;
}


/* ---------- v5 solution pages ---------- */
export type MiniTone = "ok" | "warn" | "bad" | "brand" | "muted";

/** A small product card drawn from data (used in the "week" timeline). */
export interface MiniCard {
  title: string;
  meta?: string;
  rows?: { label: string; value?: string; tone?: MiniTone }[];
  progress?: { label: string; value: number };
  chip?: { label: string; tone?: MiniTone };
}

export interface SolutionV5 {
  heroAccent?: string;
  pains: { before: string; after: string }[];
  weekTitle: string;
  weekSubtitle?: string;
  week: { day: string; title: string; body: string; card: MiniCard }[];
}
