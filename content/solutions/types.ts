export interface SolutionFeature {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface SolutionPageData {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  features: SolutionFeature[];
  customerNote?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
}

