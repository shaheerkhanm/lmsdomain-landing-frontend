// ============================================================================
// Home page sections below the hero, and the closing call to action shown on
// every page (built-in defaults). Editable in Admin > Website > Home > Sections:
// one CMS entry per section (slugs in HOME_SLUGS), the section object in `data`.
// The admin's values win; missing, hidden or empty entries use the text below.
// Pictures, product scenes and animations stay in the code (by position).
// ============================================================================

import { mergeSection } from "./merge";
import { homeFaqItems } from "./faq";
import { HOME_MOBILE_APP, type HomeMobileAppContent } from "./home/mobile-app";
import { HOME_SELL_GROW, type HomeSellGrowContent } from "./home/sell-grow";

export interface HomeSections {
  features: { eyebrow: string; title: string; cards: { title: string; text: string }[] };
  setup: { eyebrow: string; title: string; subtitle: string; steps: { title: string; text: string }[] };
  ai: { badge: string; titleBefore: string; titleHighlight: string; subtitle: string; tools: { label: string; text: string }[] };
  audiences: { eyebrow: string; title: string; subtitle: string; items: { title: string; text: string }[] };
  pricing: {
    eyebrow: string;
    title: string;
    points: string[];
    fromLabel: string;
    perMonth: string;
    primaryButton: string;
    secondaryButton: string;
  };
  faq: { title: string; items: { question: string; answer: string }[] };
  mobile: HomeMobileAppContent;
  sell: HomeSellGrowContent;
  finalCta: { title: string; text: string; primaryButton: string; secondaryButton: string };
}

export type HomeSection = keyof HomeSections;

/** CMS entry per section. The closing call to action is shared by every page. */
export const HOME_SLUGS: Record<HomeSection, { slug: string; label: string }> = {
  features: { slug: "site-home-features", label: "Home: Features" },
  setup: { slug: "site-home-setup", label: "Home: How it works" },
  ai: { slug: "site-home-ai-v5", label: "Home: Domie AI (Pro)" },
  audiences: { slug: "site-home-audiences", label: "Home: Who it's for" },
  pricing: { slug: "site-home-pricing", label: "Home: Pricing" },
  faq: { slug: "site-home-faq", label: "Home: FAQ" },
  mobile: { slug: "site-home-mobile-v5", label: "Home: Mobile apps" },
  sell: { slug: "site-home-sell", label: "Home: Sell and grow" },
  finalCta: { slug: "site-final-cta", label: "All pages: Closing call to action" },
};

export const HOME_DEFAULTS: HomeSections = {
  features: {
    eyebrow: "Features",
    title: "Everything you need to run your academy",
    cards: [
      { title: "Build courses your way", text: "Video, PDF and quiz lessons in modules. Release them weekly or all at once." },
      { title: "Teach live on Zoom, Meet or Teams", text: "Schedule classes by batch. Reminders go out and recordings are saved to the course." },
      { title: "Connects with your tools", text: "Zoom, Google Meet, Teams, Stripe, Razorpay, Zapier, plus an API and webhooks." },
      { title: "Tests and certificates", text: "Timed mock tests, instant grading, rankings and certificates." },
      { title: "Get paid in any currency", text: "Sell worldwide with Stripe or Razorpay. You keep 100% of every sale." },
      { title: "Your brand, your domain", text: "Your logo, colours and web address. Learners never see our name." },
    ],
  },
  setup: {
    eyebrow: "How it works",
    title: "Live in days, not months",
    subtitle: "No developers or IT team needed. We do the setup with you.",
    steps: [
      {
        title: "Tell us how you teach",
        text: "A 20-minute call about your courses, batches and payments. We show you LMS Domain with your own structure.",
      },
      {
        title: "We set it up with you",
        text: "Our team moves your courses and learners, connects your domain and payment gateway, and trains your staff.",
      },
      { title: "Launch and start selling", text: "Open enrolments on your own website. Teach live, run tests and get paid from day one." },
    ],
  },
  ai: {
    badge: "Domie AI · included in Pro",
    titleBefore: "Meet Domie, the assistant",
    titleHighlight: "inside your academy",
    subtitle: "Built into LMS Domain and trained on nothing but your own courses.",
    tools: [
      { label: "Answers learners", text: "Learners get answers from your own lessons, day or night." },
      { label: "Drafts course material", text: "First drafts of outlines, notes and quizzes, ready for your review." },
      { label: "Daily summary", text: "A short morning note on what needs your attention today." },
    ],
  },
  audiences: {
    eyebrow: "Who it's for",
    title: "Built for every kind of educator",
    subtitle: "Any subject, any format: live batches, self-paced courses or a mix of both.",
    items: [
      { title: "Coaching institutes", text: "Morning and evening batches, timed mock tests and fee receipts." },
      { title: "Language & test prep", text: "Speaking practice, band-score tracking and live doubt sessions." },
      { title: "Solo educators", text: "Sell your expertise on your own site, without the tech headaches." },
      { title: "Training companies", text: "Cohort programs, certificates and invoicing for corporate clients." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple plans that grow with your academy",
    points: ["0% commission on every sale", "Your own branding on every plan", "{trialDays}-day free trial on every plan", "Setup help from our team"],
    fromLabel: "Plans start from",
    perMonth: "/ month",
    primaryButton: "Compare plans",
    secondaryButton: "Book a demo",
  },
  faq: {
    title: "Frequently asked questions",
    // HTML links in the built-in answers become [text](/path), the format the admin uses
    items: homeFaqItems.map((f) => ({
      question: f.question,
      answer: f.answer.replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)").replace(/<[^>]+>/g, ""),
    })),
  },
  finalCta: {
    title: "See your academy running on LMS Domain",
    text: "Book a 20-minute demo. We'll walk you through it using your own courses.",
    primaryButton: "Book a demo",
    secondaryButton: "See pricing",
  },
  mobile: HOME_MOBILE_APP,
  sell: HOME_SELL_GROW,
};

/** The admin's section over the built-in one, with empty list rows dropped. */
export function mergeHomeSection<K extends HomeSection>(key: K, admin: unknown): HomeSections[K] {
  const base = HOME_DEFAULTS[key];
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as Record<string, unknown>;
  const str = (v: unknown) => String(v ?? "").trim();
  for (const [field, def] of Object.entries(base)) {
    const list = c[field];
    if (!Array.isArray(def) || !Array.isArray(list)) continue;
    const cleaned = list
      .map((row) =>
        typeof row === "string" ? str(row) : Object.fromEntries(Object.entries((row || {}) as Record<string, unknown>).map(([k, v]) => [k, str(v)]))
      )
      .filter((row) => (typeof row === "string" ? !!row : Object.values(row).some(Boolean) && !!Object.values(row)[0]));
    c[field] = cleaned.length ? cleaned : def;
  }
  return c as unknown as HomeSections[K];
}
