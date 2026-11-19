// ============================================================================
// Solutions pages: the text people can edit in Admin > Website > Solutions.
// One CMS entry per page (SOLUTION_PAGES, admin page "solutions"), the whole
// page's text in `data`. The admin's values win; missing, hidden or empty entries
// use the built-in text from content/solutions/<page>.ts. The animated hero and
// the product cards in "A week at…" stay in the code (cards by position).
// ============================================================================

import { mergeSection } from "../merge";
import type { SolutionPageData } from "./types";
import { coachingInstitutesData } from "./coaching-institutes";
import { languageTestPrepData } from "./language-test-prep";
import { trainingCompaniesData } from "./training-companies";
import { soloEducatorsData } from "./solo-educators";
import { APP_BANDS } from "./app-band";

export interface SolutionContent {
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  changesEyebrow: string;
  changesTitle: string;
  changes: { before: string; after: string }[];
  weekEyebrow: string;
  weekTitle: string;
  weekSubtitle: string;
  week: { day: string; title: string; text: string }[];
  partsEyebrow: string;
  partsTitle: string;
  parts: { title: string; text: string; link: string }[];
  /** Mobile app band (before the FAQ) */
  appTitle: string;
  appText: string;
  appPoints: string[];
  appAlertTitle: string;
  appAlertBody: string;
  faqTitle: string;
  faqSubtitle: string;
  faqs: { question: string; answer: string }[];
}

export type SolutionKey = "coaching-institutes" | "language-test-prep-academies" | "training-companies" | "solo-educators";

/** The four pages, their CMS entry and built-in data. */
export const SOLUTION_PAGES: Record<SolutionKey, { slug: string; label: string; pageName: string; data: SolutionPageData }> = {
  "coaching-institutes": { slug: "site-solution-coaching-institutes", label: "Solutions: Coaching institutes", pageName: "Coaching institutes", data: coachingInstitutesData },
  "language-test-prep-academies": {
    slug: "site-solution-language-test-prep",
    label: "Solutions: Language & test-prep academies",
    pageName: "Language & test-prep academies",
    data: languageTestPrepData,
  },
  "training-companies": { slug: "site-solution-training-companies", label: "Solutions: Training companies", pageName: "Training companies", data: trainingCompaniesData },
  "solo-educators": { slug: "site-solution-solo-educators", label: "Solutions: Solo educators", pageName: "Solo educators", data: soloEducatorsData },
};

/** Built-in text of a Solutions page, in the editable shape. */
export function solutionDefaults(key: SolutionKey): SolutionContent {
  const { data, pageName } = SOLUTION_PAGES[key];
  const v5 = data.v5!;
  return {
    title: data.title,
    titleHighlight: v5.heroAccent || "",
    subtitle: data.subtitle,
    primaryButton: "Book a demo",
    secondaryButton: "See pricing",
    changesEyebrow: "What changes",
    changesTitle: "From busy work to a simple routine",
    changes: v5.pains.map((p) => ({ before: p.before, after: p.after })),
    weekEyebrow: "How it runs",
    weekTitle: v5.weekTitle,
    weekSubtitle: v5.weekSubtitle || "",
    week: v5.week.map((w) => ({ day: w.day, title: w.title, text: w.body })),
    partsEyebrow: "Under the hood",
    partsTitle: "Built from these parts of the platform",
    parts: (data.platformLinks || []).map((l) => ({ title: l.title, text: l.description, link: l.href })),
    appTitle: APP_BANDS[key].title,
    appText: APP_BANDS[key].text,
    appPoints: [...APP_BANDS[key].points],
    appAlertTitle: APP_BANDS[key].alert.title,
    appAlertBody: APP_BANDS[key].alert.body,
    faqTitle: `Questions from ${pageName.toLowerCase()}`,
    faqSubtitle: "Short answers to what academies like yours ask us most.",
    faqs: (data.faqs || []).map((f) => ({ question: f.question, answer: f.answer })),
  };
}

/** The admin's text over the built-in text, with empty list rows dropped. */
export function mergeSolution(key: SolutionKey, admin: unknown): SolutionContent {
  const base = solutionDefaults(key);
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as unknown as SolutionContent;
  const str = (v: unknown) => String(v ?? "").trim();
  const keep = <T,>(list: T[], ok: (x: T) => boolean, fallback: T[]) => {
    const kept = list.filter(ok);
    return kept.length ? kept : fallback;
  };
  c.changes = keep(c.changes.map((p) => ({ before: str(p?.before), after: str(p?.after) })), (p) => !!p.before && !!p.after, base.changes);
  c.week = keep(c.week.map((w) => ({ day: str(w?.day), title: str(w?.title), text: str(w?.text) })), (w) => !!w.title, base.week);
  c.parts = keep(
    c.parts.map((p) => ({ title: str(p?.title), text: str(p?.text), link: /^\/[a-z0-9/_-]*$/i.test(str(p?.link)) ? str(p?.link) : "" })),
    (p) => !!p.title && !!p.link,
    base.parts
  );
  c.faqs = keep(c.faqs.map((q) => ({ question: str(q?.question), answer: str(q?.answer) })), (q) => !!q.question && !!q.answer, base.faqs);
  c.appPoints = keep(c.appPoints.map(str), (p) => !!p, base.appPoints);
  return c;
}
