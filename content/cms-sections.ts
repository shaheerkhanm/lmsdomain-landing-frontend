// ============================================================================
// Admin-editable page sections (CMS entries)
//
// One definition per section: its CMS slug, the admin page it is listed under
// (Admin > <page> > Cms), today's content (the code fallback, and the text the
// insert script copies into the database), and which content keys live in the
// entry's normal fields (title, subTitle, buttonText, ...). Everything else is
// stored in the entry's `data` and edited as a form in the admin.
//
// Used by lib/api/content.ts (getSection) and by the backend insert scripts,
// which are generated from this file.
// ============================================================================

import { heroContent } from "@/content/home/hero";
import { featuresContent } from "@/content/home/features";
import { manifestoContent } from "@/content/home/manifesto";
import { aiSectionContent } from "@/content/home/ai";
import { benefitsContent } from "@/content/home/benefits";
import { faqContent } from "@/content/home/faq";
import { testimonialsContent } from "@/content/home/testimonials";
import { footerContent } from "@/content/home/footer";
import { DEFAULT_AI_PAGE_DATA, AI_TOOLS } from "@/content/ai/page";
import { DEFAULT_CONTACT_HERO, DEFAULT_CONTACT_FORM_CONFIG, DEFAULT_CONTACT_TOPICS } from "@/content/contact/page";
import { DEFAULT_PRICING_EMPTY_STATE } from "@/content/pricing/page";
import { DEFAULT_AUTH_COPY } from "@/content/auth/page";
import { FEATURES_MEDIA } from "@/content/features/media";
import { INTEGRATIONS_HEADING, INTEGRATIONS_SUBTITLE } from "@/content/features/integrations";

export type CmsField = "title" | "subTitle" | "buttonText" | "buttonAction" | "description" | "content" | "heading";

export interface SectionDef<T = any> {
  slug: string;
  page: "home" | "features" | "ai" | "contact" | "pricing" | "about" | "settings" | "auth";
  label: string; // admin list title (cmsTitle)
  defaults: T;
  // CMS field -> content path (dot notation). Not listed => stored in `data`.
  fields?: Partial<Record<CmsField, string>>;
}

// Closing band with the "Notify" email form (features, ai, pricing, about)
export const CLOSING_BAND_DEFAULTS = {
  title: "Join forward-thinking\nAI leaders", // a new line starts the second line
  subtitle: "",
  buttonText: "Notify",
  placeholder: "Your email address",
  sendingText: "Sending...",
  successMessage: "✓ You are on the priority access list. We will notify you shortly.",
};
const BAND_FIELDS = { title: "title", subTitle: "subtitle", buttonText: "buttonText" } as const;

export const FEATURES_HERO_DEFAULTS = {
  eyebrow: "FEATURES",
  title: "Everything You Need to Build, Manage, and Grow Your Online Academy",
  subtitle:
    "Bring courses, assessments, live learning, AI-powered tools, payments, and academy management together in one flexible learning platform.",
  ctaText: "Request a Demo",
  secondaryCtaText: "See pricing",
};

export const JOURNEY_DEFAULTS = {
  eyebrow: "ACADEMY LIFECYCLE",
  title: "Your Academy, Start to Finish",
  subtitle: "See how all nine capabilities connect into a unified learning journey.",
  exploreLabel: "Explore Step →",
  stepLabel: "STEP",
  steps: [
    { step: "01", name: "Create Content", categorySlug: "course-learning", icon: "FileCode", color: "#7B5CF5" },
    { step: "02", name: "Teach Live", categorySlug: "live-and-cohort-learning", icon: "Video", color: "#2563EB" },
    { step: "03", name: "Assess Mastery", categorySlug: "assessment-and-evaluation", icon: "CheckCircle", color: "#0D9488" },
    { step: "04", name: "Engage Learners", categorySlug: "learner-engagement", icon: "Trophy", color: "#F59E0B" },
    { step: "05", name: "Sell Globally", categorySlug: "course-sales-and-payments", icon: "CreditCard", color: "#10B981" },
    { step: "06", name: "Grow Brand", categorySlug: "branding-website-and-reach", icon: "TrendingUp", color: "#EC4899" },
  ],
};

// Card images of the home benefits section (AdvantageScrollMain)
const BENEFIT_IMAGES = [
  "/assets/img/home/benefits/benefit_sell_anywhere.png",
  "/assets/img/home/benefits/benefit_your_brand.png",
  "/assets/img/home/benefits/benefit_keep_learners.png",
];

const { hero: AI_HERO, availability: AI_AVAILABILITY, relatedTools: AI_RELATED } = DEFAULT_AI_PAGE_DATA;

export const SECTIONS = {
  // ---------------------------------------------------------------- Home
  "home-hero": {
    slug: "home-hero",
    page: "home",
    label: "Home: hero",
    defaults: { ...heroContent, connector: "to" },
    fields: { title: "titlePrefix", subTitle: "subtitle", buttonText: "ctaText" },
  },
  "home-teach-smarter": {
    slug: "home-teach-smarter",
    page: "home",
    label: "Home: everything you need to teach online",
    defaults: { eyebrow: "CORE CAPABILITIES", ...featuresContent },
    fields: { title: "sectionTitle" },
  },
  "home-manifesto": {
    slug: "home-manifesto",
    page: "home",
    label: "Home: manifesto",
    defaults: manifestoContent,
    fields: { description: "text" },
  },
  "home-ai": {
    slug: "home-ai",
    page: "home",
    label: "Home: AI tools",
    defaults: aiSectionContent,
    fields: { title: "title", subTitle: "subtitle" },
  },
  "home-benefits": {
    slug: "home-benefits",
    page: "home",
    label: "Home: benefits",
    defaults: {
      ...benefitsContent,
      cards: benefitsContent.cards.map((card, i) => ({ ...card, image: BENEFIT_IMAGES[i] })),
    },
  },
  testimonials: {
    slug: "testimonials",
    page: "home",
    label: "Home: wall of love heading",
    defaults: { sectionTitle: testimonialsContent.sectionTitle },
    fields: { title: "sectionTitle" },
  },
  "home-faq": {
    slug: "home-faq",
    page: "home",
    label: "Home: FAQ",
    defaults: { ...faqContent, kicker: "You ask – we answer.", ctaText: "Request a Demo" },
    fields: { subTitle: "subtitle", buttonText: "ctaText" },
  },

  // ---------------------------------------------------------------- Features
  "features-hero": {
    slug: "features-hero",
    page: "features",
    label: "Features: hero",
    defaults: FEATURES_HERO_DEFAULTS,
    fields: { title: "title", subTitle: "subtitle", buttonText: "ctaText" },
  },
  "features-overview": {
    slug: "features-overview",
    page: "features",
    label: "Features: category overview and search",
    defaults: {
      premiumLabel: "Premium",
      featuresLabel: "features",
      exploreLabel: "Explore ↓",
      searchPlaceholder: "Find a feature across all 9 categories...",
      premiumOnlyLabel: "Premium Only",
      jumpLabel: "Jump to section",
      emptyMessage: "No features match your query. Try another keyword or ask us during a live demo.",
      emptyCtaText: "Book a Live Demo",
    },
  },
  "features-audiences": {
    slug: "features-audiences",
    page: "features",
    label: "Features: built for how you teach (heading)",
    defaults: { eyebrow: "TAILORED SOLUTIONS", title: "Built for How You Teach", listTitle: "Essential Features for this Role" },
    fields: { title: "title" },
  },
  "features-ai-spotlight": {
    slug: "features-ai-spotlight",
    page: "features",
    label: "Features: AI-powered tools (heading)",
    defaults: {
      eyebrow: "DOMIE AI",
      badge: "Premium",
      title: "AI-Powered Tools That Work Inside Your Academy",
      subtitle:
        "Built directly into the learning workflow to tutor students, assist course creators, and surface actionable insights for academy admins.",
      linkText: "Explore Domie AI",
    },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "features-mid-cta": {
    slug: "features-mid-cta",
    page: "features",
    label: "Features: see Domie AI in action",
    defaults: {
      eyebrow: "See Domie AI in Action",
      title: "Accelerate Learning and Content Creation with Built-in AI",
      subtitle:
        "Test Domie AI tutors grounded in your curriculum or request a guided walkthrough of our administrative analytics.",
      primaryCtaText: "Request a Demo",
      secondaryCtaText: "Explore Domie AI",
    },
    fields: { title: "title", subTitle: "subtitle", buttonText: "primaryCtaText" },
  },
  "features-journey": {
    slug: "features-journey",
    page: "features",
    label: "Features: academy lifecycle",
    defaults: JOURNEY_DEFAULTS,
    fields: { title: "title", subTitle: "subtitle" },
  },
  "features-integrations": {
    slug: "features-integrations",
    page: "features",
    label: "Features: seamless integrations (heading)",
    defaults: { eyebrow: "Integrations", title: INTEGRATIONS_HEADING, subtitle: INTEGRATIONS_SUBTITLE },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "features-media": {
    slug: "features-media",
    page: "features",
    label: "Features: photos and videos",
    defaults: {
      slots: Object.fromEntries(
        Object.values(FEATURES_MEDIA).map((m) => [m.id, { src: m.src, ...(m.poster ? { poster: m.poster } : {}), alt: m.alt }])
      ),
    },
  },
  "features-cta": {
    slug: "features-cta",
    page: "features",
    label: "Features: closing call to action",
    defaults: CLOSING_BAND_DEFAULTS,
    fields: BAND_FIELDS,
  },

  // ---------------------------------------------------------------- Domie AI
  "ai-hero": {
    slug: "ai-hero",
    page: "ai",
    label: "Domie AI: hero and command bar",
    defaults: {
      eyebrow: AI_HERO.eyebrow,
      title: AI_HERO.title,
      subtitle: AI_HERO.subtitle,
      badge: "Premium",
      primaryCta: { label: AI_HERO.primaryCta.label },
      secondaryCta: { label: AI_HERO.secondaryCta.label, href: AI_HERO.secondaryCta.href },
      suggestionsLabel: "Suggestions",
      keyboardLabel: "Keyboard Nav Available",
      commandBarExamples: AI_HERO.commandBarExamples,
    },
    fields: { title: "title", subTitle: "subtitle", buttonText: "primaryCta.label" },
  },
  "ai-tools": {
    slug: "ai-tools",
    page: "ai",
    label: "Domie AI: tool showcase bullets",
    // Tool names, audiences and summaries come from Features > Items (new site)
    defaults: { tools: AI_TOOLS.map((tool) => ({ slug: tool.slug, bullets: tool.bullets || [] })) },
  },
  "ai-availability": {
    slug: "ai-availability",
    page: "ai",
    label: "Domie AI: availability and plans",
    defaults: {
      eyebrow: "Availability & Plans",
      title: AI_AVAILABILITY.title,
      description: AI_AVAILABILITY.description,
      cta: { label: AI_AVAILABILITY.cta.label, href: AI_AVAILABILITY.cta.href },
      secondaryCta: { label: AI_AVAILABILITY.secondaryCta?.label || "Request Demo" },
    },
    fields: { title: "title", description: "description", buttonText: "cta.label", buttonAction: "cta.href" },
  },
  "ai-related-tools": {
    slug: "ai-related-tools",
    page: "ai",
    label: "Domie AI: related premium capabilities",
    defaults: {
      eyebrow: "COMPLEMENTARY ADD-ONS",
      linkText: "Explore in catalog",
      title: AI_RELATED?.title || "",
      subtitle: AI_RELATED?.subtitle || "",
      items: AI_RELATED?.items || [],
    },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "ai-cta": {
    slug: "ai-cta",
    page: "ai",
    label: "Domie AI: closing call to action",
    defaults: CLOSING_BAND_DEFAULTS,
    fields: BAND_FIELDS,
  },

  // ---------------------------------------------------------------- Contact
  "contact-hero": {
    slug: "contact-hero",
    page: "contact",
    label: "Contact: hero",
    defaults: DEFAULT_CONTACT_HERO,
    fields: { title: "title", subTitle: "subtitle" },
  },
  "contact-channels": {
    slug: "contact-channels",
    page: "contact",
    label: "Contact: get in touch",
    // The email, phone and address themselves come from Settings > Address
    defaults: {
      title: "Get in touch",
      subtitle: "Have questions about LMS Domain or need help getting started? We're here to help.",
      emailLabel: "Email",
      phoneLabel: "Direct Line",
      addressLabel: "Headquarters",
    },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "contact-form": {
    slug: "contact-form",
    page: "contact",
    label: "Contact: enquiry form",
    defaults: { ...DEFAULT_CONTACT_FORM_CONFIG, privacyNote: DEFAULT_CONTACT_FORM_CONFIG.privacyNote || "", topics: DEFAULT_CONTACT_TOPICS },
    fields: { buttonText: "submitLabel", title: "successTitle", subTitle: "successMessage" },
  },

  // ---------------------------------------------------------------- Pricing
  "pricing-empty": {
    slug: "pricing-empty",
    page: "pricing",
    label: "Pricing: no plans yet",
    defaults: {
      eyebrow: "Plans In Finalization",
      title: DEFAULT_PRICING_EMPTY_STATE.title,
      subtitle: DEFAULT_PRICING_EMPTY_STATE.subtitle,
      primaryCta: { label: DEFAULT_PRICING_EMPTY_STATE.primaryCta.label },
      secondaryCta: { label: DEFAULT_PRICING_EMPTY_STATE.secondaryCta.label, href: DEFAULT_PRICING_EMPTY_STATE.secondaryCta.href },
    },
    fields: { title: "title", subTitle: "subtitle", buttonText: "primaryCta.label", buttonAction: "secondaryCta.href" },
  },
  "pricing-comparison": {
    slug: "pricing-comparison",
    page: "pricing",
    label: "Pricing: comparison table (heading)",
    defaults: {
      eyebrow: "DETAILED COMPARISON",
      title: "Compare Plans & Capabilities",
      subtitle: "See exactly what features, quotas, and premium add-ons are included in each academy tier.",
      cornerLabel: "Compare plans",
    },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "pricing-faq": {
    slug: "pricing-faq",
    page: "pricing",
    label: "Pricing: FAQ heading",
    defaults: {
      eyebrow: "FAQS",
      title: "Frequently Asked Questions",
      subtitle: "Answers to common questions about plans, seats, and billing cycles.",
      ctaText: "Request a Demo",
    },
    fields: { title: "title", subTitle: "subtitle" },
  },
  "pricing-footer-card": {
    slug: "pricing-footer-card",
    page: "pricing",
    label: "Pricing: closing call to action",
    defaults: CLOSING_BAND_DEFAULTS,
    fields: BAND_FIELDS,
  },

  // ---------------------------------------------------------------- About
  "about-mission-card": {
    slug: "about-mission-card",
    page: "about",
    label: "About: closing call to action",
    defaults: CLOSING_BAND_DEFAULTS,
    fields: BAND_FIELDS,
  },

  // ---------------------------------------------------------------- Settings / auth
  footer: {
    slug: "footer",
    page: "settings",
    label: "Footer content",
    defaults: { description: footerContent.description },
    fields: { content: "description" },
  },
  "auth-copy": {
    slug: "auth-copy",
    page: "auth",
    label: "Login & signup pages",
    defaults: DEFAULT_AUTH_COPY,
  },
} satisfies Record<string, SectionDef>;

export type SectionSlug = keyof typeof SECTIONS;
export type SectionContent<S extends SectionSlug> = (typeof SECTIONS)[S]["defaults"];
