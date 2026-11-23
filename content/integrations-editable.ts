// ============================================================================
// Integration pages (/integrations and /integrations/<address>): editable in
// Admin > Website > Integrations. One CMS entry (site-integration-pages) holds the
// hub text, the shared section headings, the "Also connects" list and the pages.
// The admin can edit, add, remove and reorder pages. Without an admin entry, or
// when a list is emptied, the built-in text in content/integrations.ts is used.
// ============================================================================

import { mergeSection } from "./merge";
import { INTEGRATIONS, MORE_INTEGRATIONS, type IntegrationPage } from "./integrations";

export interface IntegrationsContent {
  hubMetaTitle: string;
  hubMetaDescription: string;
  hubTitle: string;
  hubSubtitle: string;
  moreEyebrow: string;
  moreTitle: string;
  more: { name: string; text: string }[];
  /** Headings on each page; "{name}" becomes the integration's name. */
  tableEyebrow: string;
  stepsEyebrow: string;
  stepsTitle: string;
  useCasesEyebrow: string;
  useCasesTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  relatedTitle: string;
  pages: IntegrationPage[];
}

export const INTEGRATIONS_SLUG = { slug: "site-integration-pages", label: "Integration pages (hub text and each integration)" };

export const INTEGRATIONS_DEFAULTS: IntegrationsContent = {
  hubMetaTitle: "Integrations: Zoom, Google Meet, Teams, Razorpay, Stripe and WhatsApp",
  hubMetaDescription:
    "LMS Domain connects with Zoom, Google Meet and Microsoft Teams for live classes, Razorpay, Paytm, Stripe and DOKU for payments, and WhatsApp for reminders. On every plan.",
  hubTitle: "Works with the tools your academy already uses",
  hubSubtitle:
    "Teach live on Zoom, Google Meet or Teams, get paid through your own Razorpay or Stripe account, and remind learners on WhatsApp. All on every plan.",
  moreEyebrow: "Also connects",
  moreTitle: "More ways to plug in",
  more: MORE_INTEGRATIONS.map((m) => ({ ...m })),
  tableEyebrow: "How it works together",
  stepsEyebrow: "Set up",
  stepsTitle: "Get started with {name}",
  useCasesEyebrow: "Who uses it",
  useCasesTitle: "How academies use {name}",
  faqEyebrow: "FAQs",
  faqTitle: "{name} and LMS Domain: questions",
  faqSubtitle: "Common questions before connecting.",
  relatedTitle: "More integrations",
  pages: INTEGRATIONS.map((p) => JSON.parse(JSON.stringify(p)) as IntegrationPage),
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function mergeIntegrations(admin: unknown): IntegrationsContent {
  const base = INTEGRATIONS_DEFAULTS;
  const c = mergeSection(base as unknown as Record<string, unknown>, admin) as unknown as IntegrationsContent;
  const str = (v: unknown) => String(v ?? "").trim();
  const list = <T,>(v: unknown, map: (x: any) => T, keep: (x: T) => boolean): T[] => (Array.isArray(v) ? v.map(map).filter(keep) : []);
  const pair = <K extends string>(a: K, b: K) => (x: any) => ({ [a]: str(x?.[a]), [b]: str(x?.[b]) }) as Record<K, string>;
  const both = (x: Record<string, string>) => Object.values(x).every(Boolean);

  for (const k of Object.keys(base) as (keyof IntegrationsContent)[]) {
    if (typeof base[k] === "string" && !str(c[k])) (c as any)[k] = base[k];
  }
  c.more = list(c.more, pair("name", "text"), both) as IntegrationsContent["more"];
  if (!c.more.length) c.more = base.more;

  const seen = new Set<string>();
  c.pages = (Array.isArray(c.pages) ? c.pages : [])
    .map((raw: any): IntegrationPage => ({
      slug: str(raw?.slug).toLowerCase(),
      name: str(raw?.name),
      category: str(raw?.category) as IntegrationPage["category"],
      summary: str(raw?.summary),
      metaTitle: str(raw?.metaTitle),
      metaDescription: str(raw?.metaDescription),
      title: str(raw?.title),
      subtitle: str(raw?.subtitle),
      facts: list(raw?.facts, pair("label", "value"), both) as IntegrationPage["facts"],
      tableTitle: str(raw?.tableTitle),
      table: list(raw?.table, pair("feature", "how"), both) as IntegrationPage["table"],
      steps: list(raw?.steps, pair("title", "text"), both) as IntegrationPage["steps"],
      useCases: list(raw?.useCases, pair("title", "text"), both) as IntegrationPage["useCases"],
      faqs: list(raw?.faqs, pair("question", "answer"), both) as IntegrationPage["faqs"],
      related: (Array.isArray(raw?.related) ? raw.related : []).map((r: unknown) => str(r).toLowerCase()).filter(Boolean),
    }))
    .filter((p) => SLUG.test(p.slug) && p.name && p.title && !seen.has(p.slug) && !!seen.add(p.slug))
    .map((p) => {
      // Fill empty parts from the built-in page with the same address
      const d = base.pages.find((b) => b.slug === p.slug);
      const or = <K extends keyof IntegrationPage>(k: K) => (Array.isArray(p[k]) ? ((p[k] as unknown[]).length ? p[k] : d?.[k] ?? p[k]) : p[k] || d?.[k] || p[k]);
      return {
        ...p,
        category: (or("category") || "Live classes") as IntegrationPage["category"],
        summary: or("summary") as string,
        metaTitle: (or("metaTitle") || p.title) as string,
        metaDescription: (or("metaDescription") || p.subtitle) as string,
        tableTitle: (or("tableTitle") || `What LMS Domain does with ${p.name}`) as string,
        facts: or("facts") as IntegrationPage["facts"],
        table: or("table") as IntegrationPage["table"],
        steps: or("steps") as IntegrationPage["steps"],
        useCases: or("useCases") as IntegrationPage["useCases"],
        faqs: or("faqs") as IntegrationPage["faqs"],
        related: or("related") as string[],
      };
    });
  if (!c.pages.length) c.pages = base.pages;
  // Related links only to pages that exist
  const slugs = new Set(c.pages.map((p) => p.slug));
  c.pages = c.pages.map((p) => ({ ...p, related: p.related.filter((r) => r !== p.slug && slugs.has(r)) }));
  return c;
}

export const withName = (text: string, name: string) => text.replace(/\{\s*name\s*\}/gi, name);

/** Categories in the order they first appear. */
export const categoriesOf = (pages: IntegrationPage[]) => Array.from(new Set(pages.map((p) => p.category)));
