// ============================================================================
// export-v5-cms.ts: write the backend's load-v5-content.js from this repo's content
//
// The admin's text wins over the site's built-in text, so the admin database must
// hold the v5 text. This script reads the v5 defaults straight from the code
// (content/*, content/cms-sections.ts) plus each page's built-in title and
// description (a JSON file made from the running site, see --seo) and writes a
// self-contained mongosh script into the backend repo.
//
// Usage (seo-v5.json: each page's built-in <title> and description, collected from a
// dev server started without a backend; refresh it when page titles change):
//   node scripts/export-v5-cms.cjs --seo scripts/seo-v5.json \
//     --out ../../lms-backend/lmsdomain-landing-backend/scripts/load-v5-content.js
// ============================================================================

import fs from "node:fs";
import path from "node:path";
import { SECTIONS } from "@/content/cms-sections";
import { DEFAULT_PRICING_HERO } from "@/content/pricing/page";
import { DEFAULT_CUSTOM_PLAN_PAGE_DATA } from "@/content/custom-plan/page";
import { defaultAboutContent } from "@/content/about";
import { defaultContactDetails } from "@/content/contact";
import { DEFAULT_LEGAL_PAGES } from "@/content/legal";
import { ROADMAP_DEFAULTS, ROADMAP_SLUGS, type RoadmapSection } from "@/content/roadmap";
import { BLOG_POSTS, BLOG_META } from "@/content/blog/posts";
import { CUSTOMERS_DEFAULTS, CUSTOMERS_SLUGS, type CustomersSection } from "@/content/customers";
import { DEMO_DEFAULTS, DEMO_SLUGS, type DemoSection } from "@/content/demo";
import { SOLUTION_PAGES, solutionDefaults, type SolutionKey } from "@/content/solutions/editable";

const arg = (name: string) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const seoFile = arg("--seo");
const outFile = arg("--out");
if (!seoFile || !outFile) throw new Error("--seo and --out are required");

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
const get = (obj: any, p: string) => p.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

// 1. v5 page text --------------------------------------------------------------
type Entry = { slug: string; pageSlug: string; cmsTitle: string; fields?: string[]; [k: string]: unknown };

// Inputs the admin shows for an entry (Admin > ... > edit). Without "fields" an
// entry opens with nothing to edit, so every entry lists the texts it holds plus
// "data" for its structured content.
const TOP_LEVEL_EDITABLE = ["title", "subTitle", "heading", "description", "content", "buttonText", "tags"];
const withFields = (e: Entry, dataOnly = false): Entry => {
  const top = dataOnly ? [] : TOP_LEVEL_EDITABLE.filter((k) => e[k] !== undefined);
  const hasData = !!e.data && typeof e.data === "object" && Object.keys(e.data as object).length > 0;
  return { ...e, fields: [...top, ...(hasData ? ["data"] : [])] };
};
const text: Entry[] = [];

// Sections read through getSection() by v5 pages
const SECTION_KEYS = [
  "home-hero",
  "contact-hero",
  "contact-channels",
  "contact-form",
  "pricing-empty",
  "pricing-comparison",
  "pricing-faq",
  "auth-copy",
] as const;
for (const key of SECTION_KEYS) {
  const def: any = (SECTIONS as any)[key];
  const entry: Entry = { slug: def.slug, pageSlug: def.page, cmsTitle: def.label };
  const data = clone(def.defaults);
  for (const [field, p] of Object.entries<string>(def.fields || {})) {
    const value = get(def.defaults, p);
    if (typeof value === "string") entry[field] = value;
    if (!p.includes(".") && data && typeof data === "object") delete data[p];
  }
  entry.data = data;
  text.push(withFields(entry));
}

// Pricing hero (read field by field in getPricingPage)
text.push(withFields({
  slug: "pricing-hero",
  pageSlug: "pricing",
  cmsTitle: "Pricing: hero",
  title: DEFAULT_PRICING_HERO.title,
  subTitle: DEFAULT_PRICING_HERO.subtitle,
  tags: [DEFAULT_PRICING_HERO.eyebrow],
}));

// Custom LMS page: one entry per section, the section object in `data`
const CUSTOM: [keyof typeof DEFAULT_CUSTOM_PLAN_PAGE_DATA, string, string][] = [
  ["seo", "site-custom-seo", "Custom Plan: SEO & metadata"],
  ["hero", "site-custom-hero", "Custom Plan: Hero"],
  ["audiences", "site-custom-audiences", "Custom Plan: Who it's for"],
  ["deliverables", "site-custom-deliverables", "Custom Plan: Deliverables (what you get)"],
  ["timeline", "site-custom-timeline", "Custom Plan: Launch timeline"],
  ["comparison", "site-custom-comparison", "Custom Plan: Comparison"],
  ["services", "site-custom-services", "Custom Plan: Services after launch"],
  ["pricingNote", "site-custom-pricing-note", "Custom Plan: How pricing works"],
  ["form", "site-custom-form", "Custom Plan: Enquiry form configuration"],
  ["faq", "site-custom-faq", "Custom Plan: FAQ"],
  ["cta", "site-custom-cta", "Custom Plan: Closing call to action"],
];
for (const [key, slug, cmsTitle] of CUSTOM) {
  const data: any = clone(DEFAULT_CUSTOM_PLAN_PAGE_DATA[key]);
  if (!data) continue;
  text.push(withFields({ slug, pageSlug: "custom", cmsTitle, title: typeof data.title === "string" ? data.title : cmsTitle, data }, true));
}

// Roadmap page: one entry per section, the section object in `data`
for (const key of Object.keys(ROADMAP_SLUGS) as RoadmapSection[]) {
  const { slug, label } = ROADMAP_SLUGS[key];
  text.push(withFields({ slug, pageSlug: "roadmap", cmsTitle: label, title: label.replace(/^Roadmap: /, ""), data: clone(ROADMAP_DEFAULTS[key]) }, true));
}

// Customers page: one entry per section (admin page "customers-page")
for (const key of Object.keys(CUSTOMERS_SLUGS) as CustomersSection[]) {
  const { slug, label } = CUSTOMERS_SLUGS[key];
  text.push(withFields({ slug, pageSlug: "customers-page", cmsTitle: label, title: label.replace(/^Customers: /, ""), data: clone(CUSTOMERS_DEFAULTS[key]) }, true));
}

// Demo page: one entry per section (admin page "demo")
for (const key of Object.keys(DEMO_SLUGS) as DemoSection[]) {
  const { slug, label } = DEMO_SLUGS[key];
  text.push(withFields({ slug, pageSlug: "demo", cmsTitle: label, title: label.replace(/^Demo: /, ""), data: clone(DEMO_DEFAULTS[key]) }, true));
}

// Solutions pages: one entry per page (admin page "solutions")
for (const key of Object.keys(SOLUTION_PAGES) as SolutionKey[]) {
  const { slug, label, pageName } = SOLUTION_PAGES[key];
  text.push(withFields({ slug, pageSlug: "solutions", cmsTitle: label, title: pageName, data: clone(solutionDefaults(key)) }, true));
}

// 2. Company facts: never replace what is filled in --------------------------------
const facts: Entry[] = [
  { slug: "site-about", pageSlug: "about", cmsTitle: "About page (company facts, mission, founders and team)", title: "About page", data: clone(defaultAboutContent) },
  { slug: "site-contact", pageSlug: "contact", cmsTitle: "Contact details", title: "Contact details", data: clone(defaultContactDetails) },
].map((e) => withFields(e, true));

// 3. Legal pages: only updated where the database already has a copy -----------------
const legal = ["privacy-policy", "terms", "refund-policy"].map((slug) => ({
  slug,
  title: DEFAULT_LEGAL_PAGES[slug].title,
  content: DEFAULT_LEGAL_PAGES[slug].body,
}));

// 4. SEO per page --------------------------------------------------------------------
const seoRaw = JSON.parse(fs.readFileSync(seoFile, "utf8")) as Record<string, { metatitle: string; metadescription: string; error?: string }>;
const seo = Object.entries(seoRaw).map(([slug, v]) => {
  if (v.error || !v.metatitle) throw new Error(`No title for ${slug}`);
  return {
    slug,
    page: slug,
    metatitle: v.metatitle.replace(/\s*\|\s*LMS Domain\s*$/i, "").trim(),
    metadescription: v.metadescription,
  };
});

// 5. Blog posts (Admin > Website > Blog) ------------------------------------------------
const blog = Object.values(BLOG_POSTS).map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  metaTitle: p.metaTitle.replace(/\s*\|\s*LMS Domain\s*$/i, "").trim(),
  metaDescription: p.metaDescription,
  date: p.date,
  author: p.author,
  readingTime: p.readingTime,
  category: BLOG_META[p.slug]?.category || "",
  cover: BLOG_META[p.slug]?.art || "lms",
  content: p.content.trim(),
  faqs: p.faqs,
}));

// Write the mongosh script ------------------------------------------------------------
const template = fs.readFileSync(path.join(process.cwd(), "scripts", "load-v5-content.template.js"), "utf8");
const json = (v: unknown) => JSON.stringify(v, null, 2);
const out = template
  .replace("/*__TEXT__*/[]", json(text))
  .replace("/*__FACTS__*/[]", json(facts))
  .replace("/*__LEGAL__*/[]", json(legal))
  .replace("/*__SEO__*/[]", json(seo))
  .replace("/*__BLOG__*/[]", json(blog));
fs.writeFileSync(outFile, out);
console.log(`Wrote ${outFile}: ${text.length} text entries, ${facts.length} facts, ${legal.length} legal pages, ${seo.length} SEO pages, ${blog.length} blog posts`);
