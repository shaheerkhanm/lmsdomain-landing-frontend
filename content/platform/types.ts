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
  frameTitle: string;
  frameAlt: string;
  features: PlatformFeature[];
  usedFor: SolutionLink[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

