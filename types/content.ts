export interface HeroCourseBuilderCard {
  type: "course_builder";
  title: string;
  subtitle: string;
  lessons: { title: string; type: "video" | "pdf" | "quiz" }[];
  dripChip: string;
}

export interface HeroTutorCard {
  type: "ai_tutor";
  badge: string;
  title: string;
  subtitle: string;
  question: string;
  answer: string;
  sourceChip: string;
}

export interface HeroCheckoutCard {
  type: "checkout";
  title: string;
  subtitle: string;
  courseName: string;
  priceUsd: string;
  priceInr: string;
  couponText: string;
  gateways: string[];
}

export interface HeroCertificateCard {
  type: "certificate";
  title: string;
  subtitle: string;
  learnerName: string;
  courseName: string;
  buttonText: string;
}

export type HeroProductCard =
  | HeroCourseBuilderCard
  | HeroTutorCard
  | HeroCheckoutCard
  | HeroCertificateCard;

export interface HeroContent {
  titlePrefix: string;
  rotatingWords: { text: string; bg: string }[];
  subtitle: string;
  ctaText: string;
  cards: HeroProductCard[];
}

export interface FeatureCardItem {
  id: string;
  stepNumber: string;
  title: string;
  summary: string;
  details: string[];
}

export interface FeaturesContent {
  sectionTitle: string;
  cards: FeatureCardItem[];
}

export interface ManifestoContent {
  text: string;
}

export interface AiToolTab {
  id: string;
  tabNumber: number;
  tag: string;
  title: string;
  description: string;
}

export interface AiSectionContent {
  badge: string;
  title: string;
  subtitle: string;
  tabs: AiToolTab[];
}

export interface BenefitCardItem {
  id: string;
  title: string;
  summary: string;
  details: string[];
}

export interface BenefitsContent {
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  cards: BenefitCardItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  items: FaqItem[];
}

export interface FooterContent {
  description: string;
}

