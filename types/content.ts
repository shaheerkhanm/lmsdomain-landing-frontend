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
  priceSuffix?: string;         // Optional custom monthly suffix
  priceSuffixYearly?: string;   // Optional custom annual suffix
  duration_days?: string;
  max_users?: number;           // Learner capacity limit
  discount?: number;            // Yearly discount %: yearly = price × 12 × (1 − discount/100), as on the live site
  tags: string[];               // Bullet points / feature list
  buttonText?: string;          // e.g., "Start Free Trial" or "Request Demo"
  buttonAction?: string;        // Checkout link or modal trigger
  description?: string;         // Detailed plan notes (rich text/plain)
  displayOrder?: number;
  // TODO(backend): not in the DB yet. ISO 4217 code (e.g. "INR", "USD").
  currency?: string;
  // TODO(backend): optional display locale (e.g. "en-IN"); defaults per currency.
  locale?: string;
  // TODO(backend): isPopular field missing in DB.
  isPopular?: boolean;
  // TODO(backend): not in the DB yet. Marks a "Custom" / contact-sales plan.
  isCustom?: boolean;
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
  /** App auth links from admin Settings (not yet in the backend model) */
  appLoginUrl?: string;
  appSignupUrl?: string;
  appForgotPasswordUrl?: string;
}

export interface PricingPageData {
  hero?: CmsDocument;
  plans: PricingPlan[];
  faqs: FaqItem[];
  footerCard?: CmsDocument;
  seo?: SeoMetadata;
}

export type BillingPeriodId = "monthly" | "yearly";

export interface BillingPeriod {
  id: BillingPeriodId;
  label: string;
  note?: string;
}

// Resolved per plan on the server: plan.currency → PRICING_CURRENCY → "INR"
export interface PlanCurrency {
  code: string;   // ISO 4217
  locale: string; // Intl locale used for grouping, e.g. "en-IN"
}

export interface CurrencyConfig {
  code?: string;
  symbol?: string;
  position?: "before" | "after";
}

export interface PlanLimit {
  label: string;
  value: string;
}

export interface PlanCta {
  label: string;
  href?: string;
  action?: "signup" | "demo" | "contact";
}

export interface Plan {
  id: string;
  slug?: string;
  name: string;
  tagline?: string;
  isPopular?: boolean;
  // Shows "Custom" instead of a price; set only when the backend marks the plan
  isCustom?: boolean;
  prices: Record<BillingPeriodId, number | null>;
  // Yearly price before the plan discount (monthly × 12) and the discount %;
  // shown as a struck-through price and "Save X%" when the discount is > 0
  yearlyFullPrice?: number | null;
  discountPercent?: number;
  currency: PlanCurrency;
  priceSuffix?: string; // e.g. "/month"
  priceSuffixes?: Record<BillingPeriodId, string>; // e.g. { monthly: "/month", yearly: "/year" }
  priceNote?: string;   // e.g. "Custom"
  limits?: PlanLimit[];
  features: string[];
  cta: PlanCta;
  displayOrder?: number;
}

export interface ComparisonRow {
  label: string;
  tooltip?: string;
  values: Record<string, boolean | string>;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

export interface PricingComparison {
  groups: ComparisonGroup[];
}

export interface PricingAddOn {
  name: string;
  description: string;
  price: string;
  unit?: string;
}

export interface PricingEnterprise {
  title: string;
  description: string;
  cta: {
    label: string;
    href?: string;
    action?: "contact" | "demo";
  };
}

export interface PricingEmptyState {
  title: string;
  subtitle: string;
  primaryCta: { label: string; action: "demo" | "modal" };
  secondaryCta: { label: string; href: string; action: "contact" };
}

export interface PricingPageModel {
  isSample?: boolean;
  seo?: SeoMetadata;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  billing: {
    periods: BillingPeriod[];
    defaultPeriod: BillingPeriodId;
    yearlySavingsLabel?: string;
  };
  currency: CurrencyConfig;
  plans: Plan[];
  emptyState?: PricingEmptyState;
  comparison?: PricingComparison;
  addOns?: {
    title: string;
    items: PricingAddOn[];
  };
  enterprise?: PricingEnterprise;
  faq?: {
    title?: string;
    subtitle?: string;
    items: FaqItem[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    primaryCta?: { label: string };
  };
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

export interface AboutHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: string;
}

export interface AboutMission {
  title?: string;
  statement: string;
}

export interface AboutStory {
  title: string;
  body: string;
  image?: string;
}

export interface AboutValueItem {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutValues {
  title: string;
  subtitle?: string;
  items: AboutValueItem[];
}

export interface AboutTimelineItem {
  date: string;
  title: string;
  description: string;
}

export interface AboutTimeline {
  title: string;
  subtitle?: string;
  items: AboutTimelineItem[];
}

export interface AboutTeamMember {
  name: string;
  role: string;
  photo: string;
  linkedinUrl?: string;
}

export interface AboutTeam {
  title: string;
  subtitle?: string;
  members: AboutTeamMember[];
}

export interface AboutStatItem {
  value: string;
  label: string;
  source?: string;
}

export interface AboutStats {
  title?: string;
  items: AboutStatItem[];
}

export interface AboutCareers {
  title: string;
  description: string;
  cta: {
    label: string;
    href?: string;
  };
}

export interface AboutPageModel {
  seo?: SeoMetadata;
  hero: AboutHero;
  mission?: AboutMission;
  story?: AboutStory;
  values?: AboutValues;
  timeline?: AboutTimeline;
  team?: AboutTeam;
  stats?: AboutStats;
  careers?: AboutCareers;
  isSample?: boolean;
  cta?: {
    title?: string;
    subtitle?: string;
    primaryCta?: { label: string; href?: string };
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

export interface ContactChannel {
  type: "email" | "phone" | "whatsapp" | "address";
  title: string;
  description?: string;
  value: string;
  href?: string;
}

export interface ContactTopic {
  id: string;
  label: string;
}

export interface ContactFormConfig {
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  privacyNote?: string;
}

export interface ContactHero {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface ContactPageModel {
  seo?: SeoMetadata;
  hero: ContactHero;
  form: ContactFormConfig;
  topics: ContactTopic[];
  channels: ContactChannel[];
  faq?: {
    title?: string;
    subtitle?: string;
    items: FaqItem[];
  };
  cta?: {
    title?: string;
    subtitle?: string;
    primaryCta?: { label: string; href?: string };
  };
}

export interface ContactPageData {
  hero?: CmsDocument;
  settings?: CmsDocument;
  seo?: SeoMetadata;
}

export interface LegalPageData {
  slug: string;
  title: string;
  lastUpdated?: string;
  body?: string;
  content?: string;
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

// Floating testimonial around the CtaSection sphere
export interface CtaTestimonial {
  id: string;
  avatar?: string;
  text: string;
  author?: string;
  role?: string;
  highlight?: string; // extra line on the mobile pill
}

export interface HomeTestimonials {
  cards: TestimonialItem[];
  cta: CtaTestimonial[];
  isSample: boolean;
}

export interface FooterContent {
  description: string;
}

// ----------------------------------------------------------------------------
// Auth Pages Copy Model
// ----------------------------------------------------------------------------
export interface AuthLoginCopy {
  title: string;
  subtitle: string;
  submitLabel: string;
  signupPrompt: string;
  signupLinkLabel: string;
  forgotLabel?: string;
}

export interface AuthSignupCopy {
  title: string;
  subtitle: string;
  submitLabel: string;
  loginPrompt: string;
  loginLinkLabel: string;
  termsNote?: string;
}

export interface AuthSidePanelCopy {
  title: string;
  subtitle: string;
  bullets?: string[];
}

export interface AuthCopy {
  login: AuthLoginCopy;
  signup: AuthSignupCopy;
  sidePanel: AuthSidePanelCopy;
}
