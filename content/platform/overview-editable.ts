// ============================================================================
// Platform overview (/platform): the text people can edit in Admin > Website >
// Platform > "Platform: Overview" (CMS entry site-platform-overview). The admin's
// values win; missing, hidden or empty entries use the built-in text from
// overview.ts. Scenes and links of the six areas stay in the code (by position);
// the numbers under the hero are the Customers page numbers.
// ============================================================================

import { mergeSection } from "../merge";
import { platformOverviewSeo, platformSectionsV5, platformAiSectionV5, platformFaqsV5 } from "./overview";

export interface PlatformOverviewContent {
  titleBefore: string;
  titleHighlight: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  areas: { name: string; title: string; text: string; points: string[] }[];
  aiTitle: string;
  aiText: string;
  aiPoints: string[];
  aiNote: string;
  planNote: string;
  whyEyebrow: string;
  whyTitle: string;
  whySubtitle: string;
  withoutLabel: string;
  withoutTitle: string;
  withoutItems: string[];
  withLabel: string;
  withTitle: string;
  withItems: string[];
  withNote: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
}

export const PLATFORM_OVERVIEW_SLUG = { slug: "site-platform-overview", label: "Platform: Overview" };

export const PLATFORM_OVERVIEW_DEFAULTS: PlatformOverviewContent = {
  titleBefore: "Everything your academy needs to",
  titleHighlight: "teach, test and get paid",
  subtitle: platformOverviewSeo.heroAnswer,
  primaryButton: "Book a demo",
  secondaryButton: "See pricing",
  areas: platformSectionsV5.map((s) => ({ name: s.name, title: s.title, text: s.body, points: [...s.points] })),
  aiTitle: platformAiSectionV5.title,
  aiText: platformAiSectionV5.body,
  aiPoints: [...platformAiSectionV5.points],
  aiNote: platformAiSectionV5.note,
  planNote: "Some features depend on your plan.",
  whyEyebrow: "Why one platform",
  whyTitle: "Replace a stack of tools with one platform",
  whySubtitle: "Most academies run on five or six separate tools. LMS Domain puts teaching, testing, payments and your website in one place.",
  withoutLabel: "Without LMS Domain",
  withoutTitle: "Six tools, six logins",
  withoutItems: ["Website builder", "Video hosting", "Form tool for tests", "Spreadsheet for batches", "Payment links", "Class links shared in chat"],
  withLabel: "With LMS Domain",
  withTitle: "One platform, one login",
  withItems: [
    "Courses and live classes",
    "Tests and certificates",
    "Batches and attendance",
    "Checkout and invoices",
    "Your branded website",
    "One login for your team and learners",
  ],
  withNote: "Your live class tool and payment gateway connect inside LMS Domain, so learners never leave your academy.",
  faqTitle: "Questions about the platform",
  faqSubtitle: "Quick answers about what LMS Domain does and who it is for.",
  faqs: platformFaqsV5.map((f) => ({ question: f.question, answer: f.answer })),
};

/** The admin's text over the built-in text, with empty list rows dropped. */
export function mergePlatformOverview(admin: unknown): PlatformOverviewContent {
  const base = PLATFORM_OVERVIEW_DEFAULTS;
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as unknown as PlatformOverviewContent;
  const str = (v: unknown) => String(v ?? "").trim();
  const strings = (list: unknown[], fallback: string[]) => {
    const kept = list.map(str).filter(Boolean);
    return kept.length ? kept : fallback;
  };
  // Six areas in a fixed order (each keeps its scene and link); a missing one uses the built-in text
  c.areas = base.areas.map((def, i) => {
    const a = (c.areas[i] || {}) as Partial<PlatformOverviewContent["areas"][number]>;
    return {
      name: str(a.name) || def.name,
      title: str(a.title) || def.title,
      text: str(a.text) || def.text,
      points: strings(Array.isArray(a.points) ? a.points : [], def.points),
    };
  });
  c.aiPoints = strings(c.aiPoints, base.aiPoints);
  c.withoutItems = strings(c.withoutItems, base.withoutItems);
  c.withItems = strings(c.withItems, base.withItems);
  const faqs = c.faqs.map((q) => ({ question: str(q?.question), answer: str(q?.answer) })).filter((q) => q.question && q.answer);
  c.faqs = faqs.length ? faqs : base.faqs;
  return c;
}
