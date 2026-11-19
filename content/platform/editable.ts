// ============================================================================
// Platform pages (Teach, Assess, Manage, Sell, Brand, Domie AI, Security, Mobile apps): the
// text people can edit in Admin > Website > Platform. One CMS entry per page
// (PLATFORM_PAGES, admin page "platform"), the page's text in `data`. The
// admin's values win; missing, hidden or empty entries use the built-in text
// (content/platform/<page>.ts and cards.ts). Animated heroes and the pictures in
// the six feature cards stay in the code (cards by position).
// ============================================================================

import { mergeSection } from "../merge";
import type { PlatformPageData } from "./types";
import { PLATFORM_CARDS, type PlatformCard } from "./cards";
import { teachPlatformData } from "./teach";
import { assessPlatformData } from "./assess";
import { managePlatformData } from "./manage";
import { sellPlatformData } from "./sell";
import { brandPlatformData } from "./brand";
import { aiPlatformData } from "./ai";
import { securityPlatformData } from "./security";
import { mobileAppPlatformData, MOBILE_APP_EXTRAS } from "./mobile-app";

export interface PlatformContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  featuresEyebrow: string;
  featuresTitle: string;
  cards: PlatformCard[];
  aiNote: string;
  usedForEyebrow: string;
  usedForTitle: string;
  usedFor: { title: string; text: string; link: string }[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
  /** Mobile apps page only: "Also in the app" row and "How you get your branded app" steps */
  alsoTitle?: string;
  also?: { title: string; text: string }[];
  stepsEyebrow?: string;
  stepsTitle?: string;
  stepsSubtitle?: string;
  steps?: { title: string; text: string }[];
}

export type PlatformKey = keyof typeof PLATFORM_CARDS;

/** The eight pages, their CMS entry, page name and built-in data. */
export const PLATFORM_PAGES: Record<PlatformKey, { slug: string; label: string; pageName: string; data: PlatformPageData }> = {
  teach: { slug: "site-platform-teach", label: "Platform: Teach", pageName: "Teach", data: teachPlatformData },
  assess: { slug: "site-platform-assess", label: "Platform: Assess", pageName: "Assess", data: assessPlatformData },
  manage: { slug: "site-platform-manage", label: "Platform: Manage", pageName: "Manage", data: managePlatformData },
  sell: { slug: "site-platform-sell", label: "Platform: Sell", pageName: "Sell", data: sellPlatformData },
  brand: { slug: "site-platform-brand", label: "Platform: Brand", pageName: "Brand", data: brandPlatformData },
  ai: { slug: "site-platform-ai", label: "Platform: Domie AI (Pro)", pageName: "Domie AI", data: aiPlatformData },
  security: { slug: "site-platform-security", label: "Platform: Security", pageName: "Security", data: securityPlatformData },
  "mobile-app": { slug: "site-platform-mobile-app", label: "Platform: Mobile apps", pageName: "the mobile apps", data: mobileAppPlatformData },
};

/** Built-in text of a Platform page, in the editable shape. */
export function platformDefaults(key: PlatformKey): PlatformContent {
  const { data, pageName } = PLATFORM_PAGES[key];
  const isAi = key === "ai";
  return {
    title: data.title,
    titleHighlight: data.heroAccent || "",
    subtitle: data.subtitle,
    primaryButton: "Book a demo",
    secondaryButton: "See pricing",
    featuresEyebrow: isAi ? "For your team" : "Features",
    featuresTitle: data.sectionHeading || (isAi ? "What Domie AI does for your team" : `Everything in ${pageName}`),
    cards: PLATFORM_CARDS[key].map((c) => ({ ...c })),
    aiNote: data.aiNote || "",
    usedForEyebrow: "Who it's for",
    usedForTitle: `How academies use ${pageName}`,
    usedFor: (data.usedFor || []).map((u) => ({ title: u.title, text: u.description, link: u.href })),
    faqTitle: `Questions about ${pageName}`,
    faqSubtitle: "Short answers to what academies ask us most.",
    faqs: (data.faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
    ...(key === "mobile-app" ? JSON.parse(JSON.stringify(MOBILE_APP_EXTRAS)) : {}),
  };
}

/** The admin's text over the built-in text, with empty list rows dropped. */
export function mergePlatform(key: PlatformKey, admin: unknown): PlatformContent {
  const base = platformDefaults(key);
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as unknown as PlatformContent;
  const str = (v: unknown) => String(v ?? "").trim();
  const keep = <T,>(list: T[], ok: (x: T) => boolean, fallback: T[]) => {
    const kept = list.filter(ok);
    return kept.length ? kept : fallback;
  };
  c.cards = keep(c.cards.map((x) => ({ title: str(x?.title), text: str(x?.text) })), (x) => !!x.title, base.cards);
  c.usedFor = keep(
    c.usedFor.map((u) => ({ title: str(u?.title), text: str(u?.text), link: /^\/[a-z0-9/_#-]*$/i.test(str(u?.link)) ? str(u?.link) : "" })),
    (u) => !!u.title && !!u.link,
    base.usedFor
  );
  c.faqs = keep(c.faqs.map((q) => ({ question: str(q?.question), answer: str(q?.answer) })), (q) => !!q.question && !!q.answer, base.faqs);
  const rows = (list: { title: string; text: string }[] | undefined, fallback: { title: string; text: string }[] | undefined) =>
    list && fallback ? keep(list.map((x) => ({ title: str(x?.title), text: str(x?.text) })), (x) => !!x.title, fallback) : list;
  c.also = rows(c.also, base.also);
  c.steps = rows(c.steps, base.steps);
  // The Domie AI line only exists where the built-in page has one (plan-labelled, Pro)
  if (!base.aiNote) c.aiNote = "";
  return c;
}
