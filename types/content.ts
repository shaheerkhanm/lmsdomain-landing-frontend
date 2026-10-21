// ============================================================================
// Core Content & API Model Interfaces
// Derived from MongoDB audit and Backend routes
// ============================================================================

export interface CmsDocument {
  _id: string;
  slug: string;
  pageSlug?: string;
  cmsTitle?: string;
  title?: string;
  subTitle?: string;
  content?: string;             // Rich text HTML (e.g. footer description)
  heading?: string;
  description?: string;
  description1?: string;
  buttonText?: string;
  buttonAction?: string;        // URL or anchor link
  image?: string;               // URL: relative (/uploads/...) or absolute
  image1?: string;
  image2?: string;
  image3?: string;
  altImage?: string;
  altImage1?: string;
  altImage2?: string;
  altImage3?: string;
  logo?: string;
  tags?: string[];
  tags1?: string[];
  counts?: Array<{ title: string; count: string }>;
  
  // Settings / Contact specifics (slug: "address")
  email?: string;
  phone?: string;
  alternativeEmail?: string;
  alternativePhone?: string;
  address?: string;
  address1?: string;
  website?: string;
  fb?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtubelink?: string;
  
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PricingPlan {
  _id: string;
  slug: string;
  title: string;                // Plan name (e.g., "Starter", "Scale", "Enterprise")
  subTitle?: string;            // Short pitch
  price: number;                // Monthly price in USD/INR
  price_yearly?: number;        // Discounted annual price
  duration_days?: string;
  max_users?: number;           // Learner capacity limit
  discount?: number;            // Percentage discount
  tags: string[];               // Bullet points / feature list
  buttonText?: string;          // e.g., "Start Free Trial" or "Request Demo"
  buttonAction?: string;        // Checkout link or modal trigger
  description?: string;         // Detailed plan notes (rich text/plain)
  displayOrder?: number;
  // TODO(backend): currency field missing in DB. Defaults to USD.
  currency?: string;
  // TODO(backend): isPopular field missing in DB.
  isPopular?: boolean;
  isActive: boolean;
  isDeleted: boolean;
}

export interface FaqItem {
  _id?: string;
  slug?: string;
  question: string;
  answer: string;               // Rich text or plain string
  // TODO(backend): page association missing in DB.
  page?: string;
  displayOrder?: number;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface FeatureItem {
  _id: string;
  slug: string;
  title: string;
  subTitle?: string;
  content?: string;             // Detailed rich text description
  tags?: string[];
  image?: string;               // Illustration / preview URL
  altImage?: string;
  displayOrder?: number;
  // TODO(backend): category and isPremium missing in DB.
  category?: string;
  categoryOrder?: number;
  isPremium?: boolean;
  isActive: boolean;
  isDeleted: boolean;
}

export interface FeatureContent {
  _id: string;
  slug: string;
  title: string;
  content: string;
  displayOrder?: number;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AboutValue {
  _id: string;
  slug: string;
  title: string;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AboutLeadership {
  _id: string;
  name: string;
  profession?: string;
  image?: string;
  description?: string;
  altImage?: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface SeoMetadata {
  _id?: string;
  slug: string;
  page?: string;
  metatitle?: string;
  metadescription?: string;
  metakeyword?: string[];
  other_tag?: string;
  author?: string;
  // TODO(backend): ogImage missing in DB.
  ogImage?: string;
  isActive?: boolean;
}

export interface EnquiryPayload {
  name: string;
  organizationName: string;
  phoneNumber: string;          // Numeric string, 7-15 digits
  email: string;
  subject: string;
  type: 1 | 2;                  // 1 = General/Demo Enquiry, 2 = Newsletter/CTA
}

// Page Data Containers (passed from Server Components down to views)
export interface SiteSettings {
  address?: CmsDocument;
  footer?: CmsDocument;
}

export interface PricingPageData {
  hero?: CmsDocument;
  plans: PricingPlan[];
  faqs: FaqItem[];
  footerCard?: CmsDocument;
  seo?: SeoMetadata;
}

export interface FeatureCategory {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  isPremium?: boolean;
  order: number;
  features: Feature[];
}

export interface Feature {
  slug: string;
  title: string;
  description: string;
  isPremium?: boolean;
  audience?: string;
  icon?: string;
}

export interface FeaturesPageData {
  hero?: CmsDocument;
  categories: FeatureCategory[];
  faqs?: FaqItem[];
  closingCta?: CmsDocument;
  seo?: SeoMetadata;
  media?: Record<string, any>;
}

export interface CommandBarResult {
  kind: "page" | "setting" | "answer";
  title: string;
  subtitle?: string;
}

export interface CommandBarExample {
  query: string;
  results: CommandBarResult[];
}

export interface AiTool {
  id: string;
  slug: string;
  name: string;
  summary: string;
  bullets?: string[];
  badge: "Premium";
  demo: "tutor" | "analytics" | "generator" | "commandbar";
  audience?: string;
  icon?: string;
}

export interface AiPageData {
  seo?: SeoMetadata;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; action: "modal" | "link"; href?: string };
    secondaryCta: { label: string; href: string };
    commandBarExamples: CommandBarExample[];
  };
  tools: AiTool[];
  howItWorks?: {
    title: string;
    steps: Array<{ stepNumber?: string; title: string; description: string }>;
  };
  availability: {
    title: string;
    description: string;
    cta: { label: string; href: string };
    secondaryCta?: { label: string; action: "modal" | "link"; href?: string };
  };
  relatedTools?: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      badge: string;
      href: string;
      icon?: string;
    }>;
  };
  faq?: {
    title: string;
    subtitle?: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryCta: { label: string; action: "modal" | "link"; href?: string };
    secondaryCta?: { label: string; href: string };
  };
}

export interface AboutPageData {
  hero?: CmsDocument;
  mission?: CmsDocument;
  values: AboutValue[];
  story?: CmsDocument;
  leadership: AboutLeadership[];
  seo?: SeoMetadata;
}

export interface ContactPageData {
  hero?: CmsDocument;
  settings?: CmsDocument;
  seo?: SeoMetadata;
}

export interface LegalPageData {
  slug: string;
  title: string;
  content?: string;
  lastUpdated?: string;
  seo?: SeoMetadata;
}

// ============================================================================
// Homepage Section Content Types (Preserved from 77ca9c0)
// ============================================================================

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
  shortLabel: string;
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

export interface FaqContent {
  badge: string;
  title: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  items: FaqItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  quote?: string;
  date?: string;
  social?: "twitter" | "linkedin";
  placeholder: boolean;
}

export interface TestimonialsContent {
  sectionTitle: string;
  cards: TestimonialItem[];
}

export interface FooterContent {
  description: string;
}
