export interface AiCardChat {
  type: "chat";
  badge: string;
  title: string;
  question: string;
  answer: string;
  sourceLabel: string;
}

export interface AiCardAnalytics {
  type: "analytics";
  badge: string;
  title: string;
  flaggedRows: string[];
  summary: string;
}

export interface AiCardGenerator {
  type: "generator";
  badge: string;
  title: string;
  draftedTitle: string;
  draftedDescription: string;
  learningOutcomes: string[];
  buttonText: string;
}

export interface AiCardCommandBar {
  type: "command_bar";
  badge: string;
  title: string;
  searchPlaceholder: string;
  resultRows: { label: string; category: string }[];
}

export type HeroAiCard = AiCardChat | AiCardAnalytics | AiCardGenerator | AiCardCommandBar;

export interface HeroContent {
  titlePrefix: string;
  rotatingWords: { text: string; bg: string }[];
  subtitle: string;
  ctaText: string;
  cards: HeroAiCard[];
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

