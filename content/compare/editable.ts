// ============================================================================
// Compare pages (/compare/<address>): editable in Admin > Website > Compare.
// One CMS entry (site-compare-pages) holds the shared headings and the list of
// pages; the admin can add, edit, remove and reorder pages there. Each page has a
// "published" switch: drafts show a banner and are hidden from search engines
// (reachable by direct link for review); published pages are listed on /compare
// and in the sitemap. Without an admin entry the built-in pages (data.ts) are
// shown, all as drafts.
// ============================================================================

import { mergeSection } from "../merge";
import { COMPARE_PAGES } from "./data";

export interface ComparePage {
  slug: string;
  competitorName: string;
  published: boolean;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  suitsHeading: string;
  suitsText: string;
  suitsPoints: string[];
  strengths: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  /** Optional fact about the competitor, shown with its source and the date it was checked. */
  competitorNote: string;
  competitorNoteSource: string;
  competitorNoteChecked: string;
}

export interface CompareContent {
  listEyebrow: string;
  listTitle: string;
  listSubtitle: string;
  suitsEyebrow: string;
  strengthsEyebrow: string;
  strengthsTitle: string;
  strengthsSubtitle: string;
  faqTitle: string;
  /** "{competitor}" becomes the page's competitor name. */
  faqSubtitle: string;
  primaryButton: string;
  secondaryButton: string;
  pages: ComparePage[];
}

export const COMPARE_SLUG = { slug: "site-compare-pages", label: "Compare pages (list, text and Published switch)" };

export const COMPARE_DEFAULTS: CompareContent = {
  listEyebrow: "Compare",
  listTitle: "How LMS Domain compares",
  listSubtitle: "Honest comparisons with other course platforms, to help you choose the right one for your academy.",
  suitsEyebrow: "Who it suits",
  strengthsEyebrow: "Why LMS Domain",
  strengthsTitle: "Why education businesses choose LMS Domain",
  strengthsSubtitle: "Built for the day-to-day work of academies that teach in batches and sell courses online.",
  faqTitle: "Frequently asked questions",
  faqSubtitle: "Common questions when comparing {competitor} and LMS Domain.",
  primaryButton: "Book a demo",
  secondaryButton: "See pricing",
  pages: Object.values(COMPARE_PAGES).map((p) => ({
    slug: p.slug,
    competitorName: p.competitorName,
    published: false,
    title: p.title,
    subtitle: p.subtitle,
    metaTitle: p.metaTitle.replace(/\s*\|\s*LMS Domain\s*$/i, "").trim(),
    metaDescription: p.metaDescription,
    suitsHeading: p.whoSuitsBetter.heading,
    suitsText: p.whoSuitsBetter.description,
    suitsPoints: [...p.whoSuitsBetter.points],
    strengths: p.lmsDomainStrengths.map((s) => ({ title: s.title, text: s.description })),
    faqs: p.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    competitorNote: p.competitorPublicInfo?.statement || "",
    competitorNoteSource: p.competitorPublicInfo?.sourceUrl || "",
    competitorNoteChecked: p.competitorPublicInfo?.checkedOn || "",
  })),
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The admin's entry over the built-in one. The admin's page list, when filled, is the whole list. */
export function mergeCompare(admin: unknown): CompareContent {
  const base = COMPARE_DEFAULTS;
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as unknown as CompareContent;
  const str = (v: unknown) => String(v ?? "").trim();
  const strings = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
  const seen = new Set<string>();
  c.pages = (Array.isArray(c.pages) ? c.pages : [])
    .map((raw) => {
      const p = (raw || {}) as Partial<ComparePage>;
      return {
        slug: str(p.slug).toLowerCase(),
        competitorName: str(p.competitorName),
        published: p.published === true || (p.published as unknown) === "true",
        title: str(p.title),
        subtitle: str(p.subtitle),
        metaTitle: str(p.metaTitle),
        metaDescription: str(p.metaDescription),
        suitsHeading: str(p.suitsHeading),
        suitsText: str(p.suitsText),
        suitsPoints: strings(p.suitsPoints),
        strengths: (Array.isArray(p.strengths) ? p.strengths : [])
          .map((s) => ({ title: str(s?.title), text: str(s?.text) }))
          .filter((s) => s.title),
        faqs: (Array.isArray(p.faqs) ? p.faqs : [])
          .map((q) => ({ question: str(q?.question), answer: str(q?.answer) }))
          .filter((q) => q.question && q.answer),
        competitorNote: str(p.competitorNote),
        competitorNoteSource: /^https:\/\//i.test(str(p.competitorNoteSource)) ? str(p.competitorNoteSource) : "",
        competitorNoteChecked: str(p.competitorNoteChecked),
      };
    })
    // A page needs an address, a competitor and a heading; addresses must be unique
    .filter((p) => SLUG.test(p.slug) && p.competitorName && p.title && !seen.has(p.slug) && !!seen.add(p.slug));
  if (!c.pages.length) c.pages = base.pages;
  return c;
}

/** "{competitor}" in shared text becomes the page's competitor name. */
export const withCompetitor = (text: string, name: string) => text.replace(/\{\s*competitor\s*\}/gi, name);
