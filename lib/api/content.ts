// ============================================================================
// Content Layer API Functions
// Interacts with backend API endpoints and returns typed content models
// Filters: isActive === true && isDeleted !== true
// ============================================================================

import { cache } from "react";
import { fetchApi } from "./client";
import { isPlaceholderPhone } from "@/lib/utils";
import { liveOr, keepLive } from "@/lib/claims";
import { DEFAULT_PRICING_V2, computePlanPricing, PricingV2Data, formatPrice } from "@/config/pricing";
import { getPricingFaqs, DEFAULT_PRICING_FAQS } from "@/content/pricing/faq";
import { defaultAboutContent, AboutContent } from "@/content/about";
import { defaultContactDetails, ContactDetails } from "@/content/contact";
import type {
  CmsDocument,
  PricingPlan,
  FaqItem,
  FeatureItem,
  FeatureContent,
  FeatureCategory,
  Feature,
  AboutValue,
  AboutLeadership,
  SeoMetadata,
  SiteSettings,
  PageVisibilitySetting,
  PricingPageData,
  PricingPageModel,
  Plan,
  PricingComparison,
  PricingAddOn,
  PricingEnterprise,
  FeaturesPageData,
  AboutPageData,
  AboutPageModel,
  AboutHero,
  AboutMission,
  AboutStory,
  AboutValues,
  AboutTimeline,
  AboutTeam,
  AboutStats,
  AboutCareers,
  ContactPageModel,
  ContactHero,
  ContactChannel,
  ContactTopic,
  ContactFormConfig,
  ContactPageData,
  LegalPageData,
  AiPageData,
  AuthCopy,
  PlanCurrency,
  HomeClients,
  CustomPlanPageData,
  SiteNavigation,
} from "@/types/content";
import { DEFAULT_CUSTOM_PLAN_PAGE_DATA } from "@/content/custom-plan/page";
import {
  DEFAULT_PRICING_CURRENCY,
  localeForCurrency,
  normalizeCurrencyCode,
  normalizeDiscount,
  yearlyFromMonthly,
} from "@/lib/pricing";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import { AUDIENCE_TABS, type AudienceTab } from "@/content/features/audiences";
import { INTEGRATIONS, type Integration } from "@/content/features/integrations";
import { SECTIONS, type SectionSlug, type SectionContent, type SectionDef } from "@/content/cms-sections";
import type { ContentSourceKind } from "@/components/content/ContentSource";
import { FEATURES_MEDIA, MediaSlot } from "@/content/features/media";
import { DEFAULT_AI_PAGE_DATA, AI_TOOLS } from "@/content/ai/page";
import {
  DEFAULT_PRICING_HERO,
  DEFAULT_PRICING_EMPTY_STATE,
} from "@/content/pricing/page";
import { UNLICENSED_ABOUT_IMAGES } from "@/content/about/page";
import {
  DEFAULT_CONTACT_HERO,
  DEFAULT_CONTACT_FORM_CONFIG,
  DEFAULT_CONTACT_TOPICS,
} from "@/content/contact/page";
import { DEFAULT_LEGAL_PAGES } from "@/content/legal";
import { DEFAULT_AUTH_COPY } from "@/content/auth/page";

function isValidDocument<T extends { isActive?: boolean; isDeleted?: boolean }>(
  doc: T | null | undefined
): boolean {
  if (!doc) return false;
  if (doc.isActive === false) return false;
  if (doc.isDeleted === true) return false;
  return true;
}

function filterActiveDocuments<T extends { isActive?: boolean; isDeleted?: boolean }>(
  docs: T[] | null | undefined
): T[] {
  if (!Array.isArray(docs)) return [];
  return docs.filter(isValidDocument);
}

// ----------------------------------------------------------------------------
// Core CMS Document Fetcher
// Endpoint: POST /api/cms { slug }
// ----------------------------------------------------------------------------
export async function fetchCms(slug: string, tags?: string[]): Promise<CmsDocument | null> {
  try {
    const res = await fetchApi<{ status?: boolean; data?: CmsDocument }>("/api/cms", {
      method: "POST",
      body: { slug },
      tags: tags || ["cms", `cms:${slug}`],
      revalidate: 300,
    });

    const doc = res?.data;
    if (isValidDocument(doc)) {
      return doc as CmsDocument;
    }
    return null;
  } catch (error: any) {
    if (error?.status !== 404 && error?.status !== 422) {
      console.warn(`[content] Failed to fetch CMS slug "${slug}":`, error);
    }
    return null;
  }
}

// ----------------------------------------------------------------------------
// Admin-editable sections (content/cms-sections.ts)
// Content = built-in defaults, overlaid by the entry's `data` (lists replace,
// objects merge, admin values win even when empty), then by its normal fields
// (title, subTitle, ...) when they are filled in.
// ----------------------------------------------------------------------------
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

function mergeContent<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(over)) return over as T;
  if (isPlainObject(base) && isPlainObject(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(over)) out[key] = mergeContent((base as any)[key], value);
    return out as T;
  }
  return (typeof over === typeof base || base === undefined ? over : base) as T;
}

function setContentPath(target: any, path: string, value: unknown) {
  const parts = path.split(".");
  let cur = target;
  parts.slice(0, -1).forEach((part) => {
    cur[part] = isPlainObject(cur[part]) ? { ...cur[part] } : {};
    cur = cur[part];
  });
  cur[parts[parts.length - 1]] = value;
}

export interface SectionResult<T> {
  content: T;
  source: ContentSourceKind;
}

export async function getSection<S extends SectionSlug>(slug: S): Promise<SectionResult<SectionContent<S>>> {
  const def = SECTIONS[slug] as SectionDef<SectionContent<S>>;
  const doc = await fetchCms(def.slug, ["cms", `cms:${def.slug}`, def.page]);
  if (!doc) return { content: def.defaults, source: "code" };

  const data = (doc as any).data;
  const content = mergeContent(def.defaults, isPlainObject(data) ? data : undefined) as any;
  const contentCopy = isPlainObject(content) ? { ...content } : content;
  for (const [field, path] of Object.entries(def.fields || {})) {
    const value = (doc as any)[field];
    if (typeof value === "string" && value.trim() !== "" && !/lorem ipsum/i.test(value)) setContentPath(contentCopy, path as string, value);
  }

  // Entry exists but its structured part is still missing (keys outside the normal fields)
  const mapped = new Set(Object.values(def.fields || {}).map((p) => String(p).split(".")[0]));
  const needsData = isPlainObject(def.defaults) && Object.keys(def.defaults).some((k) => !mapped.has(k));
  const hasData = isPlainObject(data) && Object.keys(data).length > 0;
  const loremOnly = Object.keys(def.fields || {}).some((f) => /lorem ipsum/i.test(String((doc as any)[f] || "")));
  return { content: contentCopy, source: (needsData && !hasData) || loremOnly ? "partial" : "api" };
}

// ----------------------------------------------------------------------------
// SEO Metadata Fetcher
// Endpoint: POST /api/seo { slug }
// ----------------------------------------------------------------------------
export async function fetchSeo(slug: string): Promise<SeoMetadata | null> {
  try {
    const res = await fetchApi<{ status?: boolean; data?: SeoMetadata }>("/api/seo", {
      method: "POST",
      body: { slug },
      tags: ["seo", `seo:${slug}`],
      revalidate: 300,
    });

    const data = res?.data;
    if (data && data.isActive !== false) {
      return data;
    }
    return null;
  } catch (error: any) {
    if (error?.status !== 404 && error?.status !== 422) {
      console.warn(`[content] Failed to fetch SEO slug "${slug}":`, error);
    }
    return null;
  }
}

// ----------------------------------------------------------------------------
// Site Settings (Header, Footer, Contact info)
// Slugs: "address", "site-footer" (the live site still reads "footer")
// ----------------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const [address, footer, appLinks, pagesDoc, sitePagesDoc] = await Promise.all([
    fetchCms("address", ["cms", "settings", "address"]),
    fetchCms(SECTIONS.footer.slug, ["cms", "settings", SECTIONS.footer.slug]),
    // Settings > App links (appLoginUrl, appSignupUrl, appForgotPasswordUrl,
    // centralLoginEnabled, lmsCentralUrl, recaptchaSiteKey)
    fetchCms("app-links", ["cms", "settings", "app-links"]),
    // Settings > Pages (page visibility list)
    fetchCms("pages", ["cms", "settings", "pages"]).catch(() => null),
    fetchCms("site-pages", ["cms", "settings", "site-pages", "pages"]).catch(() => null),
  ]);

  return {
    address: address || undefined,
    footer: footer || undefined,
    appLoginUrl: readSettingUrl(appLinks, "appLoginUrl") || readSettingUrl(address, "appLoginUrl"),
    appSignupUrl: readSettingUrl(appLinks, "appSignupUrl") || readSettingUrl(address, "appSignupUrl"),
    appForgotPasswordUrl: readSettingUrl(appLinks, "appForgotPasswordUrl") || readSettingUrl(address, "appForgotPasswordUrl"),
    // Checked (format + domain allow-list) by getCentralLoginConfig(), never used as is
    centralLoginEnabled: readSettingBoolean(appLinks, "centralLoginEnabled"),
    lmsCentralUrl: readSettingUrl(appLinks, "lmsCentralUrl"),
    recaptchaSiteKey: readSettingUrl(appLinks, "recaptchaSiteKey"),
    pages: extractPages(pagesDoc, sitePagesDoc, address, footer, appLinks),
  };
}

function extractPages(...docs: (CmsDocument | null | undefined)[]): PageVisibilitySetting[] | undefined {
  for (const doc of docs) {
    if (!doc) continue;
    const raw = (doc as any).pages ?? (doc as any).data?.pages ?? (Array.isArray((doc as any).data) ? (doc as any).data : undefined);
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((item: any) => ({
        slug: String(item.slug || "").trim(),
        path: String(item.path || "").trim(),
        visible: item.visible !== false,
        whenHidden: item.whenHidden === "404" ? ("404" as const) : ("home" as const),
      }));
    }
  }
  return undefined;
}

function readSettingBoolean(doc: CmsDocument | null, key: string): boolean | undefined {
  const value = (doc as Record<string, unknown> | null)?.[key];
  return typeof value === "boolean" ? value : undefined;
}

// The admin Settings document does not define these fields yet (see
// docs/multipage/backend-gaps.md); read them defensively so they start
// working as soon as the backend adds them.
function readSettingUrl(doc: CmsDocument | null, key: string): string | undefined {
  const value = (doc as Record<string, unknown> | null)?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

// ----------------------------------------------------------------------------
// App Auth URLs (server-side only — never NEXT_PUBLIC_)
// Priority: admin site settings (appLoginUrl / appSignupUrl / appForgotPasswordUrl)
//           → server env APP_LOGIN_URL / APP_SIGNUP_URL / APP_FORGOT_PASSWORD_URL
//           → undefined (the auth components render their disabled state)
// ----------------------------------------------------------------------------
export interface AppAuthUrls {
  loginUrl?: string;
  signupUrl?: string;
  forgotPasswordUrl?: string;
}

export async function getAppAuthUrls(): Promise<AppAuthUrls> {
  const settings = await getSiteSettings();

  return {
    loginUrl: settings.appLoginUrl || process.env.APP_LOGIN_URL || undefined,
    signupUrl: settings.appSignupUrl || process.env.APP_SIGNUP_URL || undefined,
    forgotPasswordUrl:
      settings.appForgotPasswordUrl || process.env.APP_FORGOT_PASSWORD_URL || undefined,
  };
}

// ----------------------------------------------------------------------------
// Pricing Page Content
// Endpoints: /api/cms (slugs: pricing-hero, site-pricing-faq, site-pricing-footer-card),
//            /api/pricing, /api/pricing/faq
// ----------------------------------------------------------------------------
// Currency for one plan: the plan's own ISO code from the backend, then the
// site-wide PRICING_CURRENCY env, then INR. A later per-region price list
// (e.g. plan.prices by currency) would pick the visitor's currency here.
function resolvePlanCurrency(plan?: Pick<PricingPlan, "currency" | "locale">): PlanCurrency {
  const code =
    normalizeCurrencyCode(plan?.currency) ||
    normalizeCurrencyCode(process.env.PRICING_CURRENCY) ||
    DEFAULT_PRICING_CURRENCY;
  return { code, locale: localeForCurrency(code, plan?.locale) };
}

export const getPricingPage = cache(async function getPricingPage(): Promise<PricingPageModel> {
  const [empty, band, faqSection, comparisonHeading, pricingV2Res, pricingV2Cms, seo, enterpriseDoc] = await Promise.all([
    getSection("pricing-empty"),
    getSection("pricing-footer-card"),
    getSection("pricing-faq"),
    getSection("pricing-comparison"),
    fetchApi<{ status?: boolean; data?: PricingV2Data }>("/api/pricing-v2", {
      method: "GET",
      tags: ["pricing", "pricing-v2"],
      revalidate: 300,
      timeoutMs: 800,
    }).catch(() => null),
    fetchCms("pricing-v2", ["cms", "pricing"]).catch(() => null),
    fetchSeo("pricing"),
    fetchCms("site-pricing-enterprise", ["cms", "pricing", "custom-plan"]),
  ]);

  // Determine active PricingV2 data:
  // 1. API endpoint /api/pricing-v2
  // 2. CMS document "pricing-v2"
  // 3. DEFAULT_PRICING_V2 fallback from config/pricing.ts (when backend is unreachable)
  let pricingV2: PricingV2Data = DEFAULT_PRICING_V2;
  let sourceMode: "api" | "code" = "code";

  if (pricingV2Res?.data && Array.isArray(pricingV2Res.data.plans) && pricingV2Res.data.plans.length > 0) {
    pricingV2 = pricingV2Res.data;
    sourceMode = "api";
  } else if (pricingV2Cms?.data && typeof pricingV2Cms.data === "object") {
    const cmsData = pricingV2Cms.data as Partial<PricingV2Data>;
    if (Array.isArray(cmsData.plans) && cmsData.plans.length > 0) {
      pricingV2 = {
        annualMode: cmsData.annualMode || DEFAULT_PRICING_V2.annualMode,
        monthsFree: typeof cmsData.monthsFree === "number" ? cmsData.monthsFree : DEFAULT_PRICING_V2.monthsFree,
        trialDays: typeof cmsData.trialDays === "number" ? cmsData.trialDays : DEFAULT_PRICING_V2.trialDays,
        currencies: cmsData.currencies || DEFAULT_PRICING_V2.currencies,
        plans: cmsData.plans,
        comparison: cmsData.comparison || DEFAULT_PRICING_V2.comparison,
      };
      sourceMode = "api";
    }
  }

  const activePlans = pricingV2.plans.filter((p) => p.active !== false).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  // Map plans to Plan structure
  const mappedPlans: Plan[] = activePlans.map((plan, idx) => {
    const isCustom = Boolean(plan.isCustom || plan.priceMonthly?.INR === null);
    const inrPricing = computePlanPricing(
      plan,
      "INR",
      pricingV2.annualMode,
      pricingV2.monthsFree,
      pricingV2.currencies?.INR?.taxLabel || "+ GST"
    );
    const limits = [
      {
        label: "Active Learners",
        value: typeof plan.limits?.activeLearners === "number"
          ? `Up to ${plan.limits.activeLearners.toLocaleString()}`
          : String(plan.limits?.activeLearners || "Custom"),
      },
      {
        label: "Admin & Teacher Seats",
        value: typeof plan.limits?.teamSeats === "number"
          ? `${plan.limits.teamSeats} seats`
          : String(plan.limits?.teamSeats || "Custom"),
      },
      {
        label: "Storage",
        value: typeof plan.limits?.storageGb === "number"
          ? `${plan.limits.storageGb} GB`
          : String(plan.limits?.storageGb || "Custom"),
      },
      {
        label: "Bandwidth",
        value: typeof plan.limits?.bandwidthGbPerMonth === "number"
          ? `${plan.limits.bandwidthGbPerMonth} GB/mo`
          : String(plan.limits?.bandwidthGbPerMonth || "Custom"),
      },
    ];

    return {
      id: plan.slug || String(idx),
      slug: plan.slug,
      name: plan.name,
      tagline: plan.tagline,
      isPopular: Boolean(plan.isPopular),
      isCustom,
      prices: {
        monthly: inrPricing.monthly,
        yearly: inrPricing.yearly,
      },
      yearlyFullPrice: inrPricing.monthly !== null ? inrPricing.monthly * 12 : null,
      discountPercent: pricingV2.annualMode === "percent" ? plan.annualDiscountPercent : Math.round(((pricingV2.monthsFree || 2) / 12) * 100),
      currency: { code: "INR", locale: "en-IN" },
      priceSuffix: inrPricing.monthly !== null ? "/month" : "",
      priceSuffixes: {
        monthly: "/month",
        yearly: "/year, billed annually",
      },
      priceNote: isCustom ? "Custom" : undefined,
      limits,
      features: plan.features || [],
      cta: {
        label: isCustom ? "Talk to us" : `Start ${pricingV2.trialDays}-day free trial`,
        action: "demo",
        href: "#",
      },
      displayOrder: plan.sortOrder || idx + 1,
    };
  });

  // Group comparison rows
  const comparisonGroups: { title: string; rows: { label: string; values: Record<string, boolean | string> }[] }[] = [];
  for (const row of pricingV2.comparison || []) {
    if (!row.group || !row.label) continue;
    let group = comparisonGroups.find((g) => g.title === row.group);
    if (!group) {
      group = { title: row.group, rows: [] };
      comparisonGroups.push(group);
    }
    group.rows.push({
      label: row.label,
      values: row.values || {},
    });
  }

  const yearlySavingsLabel = pricingV2.annualMode === "monthsFree"
    ? `${pricingV2.monthsFree} months free`
    : undefined;

  const hero = {
    eyebrow: DEFAULT_PRICING_HERO.eyebrow,
    title: "Simple pricing. 0% commission on every plan.",
    subtitle: `Your own domain, Zoom live classes and GST invoices are included from Starter. Try any plan free for ${pricingV2.trialDays} days.`,
  };

  const emptyState = {
    eyebrow: empty.content.eyebrow,
    title: empty.content.title,
    subtitle: empty.content.subtitle,
    primaryCta: { label: empty.content.primaryCta.label, action: "demo" as const },
    secondaryCta: { label: empty.content.secondaryCta.label, href: empty.content.secondaryCta.href, action: "contact" as const },
  };

  const faqItems = getPricingFaqs(pricingV2.trialDays);
  const faqHeading = faqSection.content;
  const faq = {
    ...faqHeading,
    title: faqHeading?.title || "Frequently Asked Questions",
    subtitle: faqHeading?.subtitle || "Answers to common questions about plans, seats, and billing cycles.",
    items: faqItems,
  };

  return {
    pricingV2,
    isSample: false,
    seo: seo || undefined,
    hero,
    billing: {
      periods: [
        { id: "monthly", label: "Monthly" },
        { id: "yearly", label: "Yearly", note: yearlySavingsLabel },
      ],
      defaultPeriod: "monthly",
      yearlySavingsLabel,
    },
    currency: {
      code: "INR",
      symbol: "₹",
      position: "before",
    },
    plans: mappedPlans,
    emptyState: mappedPlans.length === 0 ? emptyState : undefined,
    comparison: comparisonGroups.length > 0 ? { groups: comparisonGroups } : undefined,
    faq,
    cta: {
      title: band.content.title,
      subtitle: band.content.subtitle,
      primaryCta: { label: band.content.buttonText },
    },
    band: band.content,
    comparisonHeading: comparisonHeading.content,
    sources: {
      hero: "code",
      plans: sourceMode,
      empty: empty.source,
      comparison: sourceMode,
      faq: "code",
      band: band.source,
    },
  };
});

// ----------------------------------------------------------------------------
// Features Page Content
// Endpoints: /api/cms (slugs: site-features-hero, features-cta),
//            /api/seo (slug: features), /api/pricing/faq
// Content source: content/features/catalog.ts (9 categories, 38 features)
// ----------------------------------------------------------------------------

/**
 * Resolves the 9 feature categories and 38 features.
 * Currently sourced from content/features/catalog.ts as the production source of truth.
 * Seam for future backend migration: once /api/features supports category and isPremium,
 * this function can transform backend documents into FeatureCategory[] with fallback to the catalog.
 */
// Admin > Features (Categories + Items) via POST /api/features/catalog.
// The code catalog is the fallback when the API is empty or unreachable.
interface ApiFeatureItem {
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  audienceLabel?: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  badges?: string[];
  isPremium?: boolean;
}
interface ApiFeatureCategory {
  slug: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  isPremium?: boolean;
  order?: number;
  features?: ApiFeatureItem[];
}

export async function resolveFeatureCategories(): Promise<FeatureCategory[]> {
  return (await resolveFeatureCategoriesWithSource()).categories;
}

export async function resolveFeatureCategoriesWithSource(): Promise<{ categories: FeatureCategory[]; source: ContentSourceKind }> {
  const res = await fetchApi<{ data?: ApiFeatureCategory[] }>("/api/features/catalog", {
    method: "POST",
    tags: ["features"],
    revalidate: 300,
  }).catch(() => null);

  const categories = (res?.data || [])
    .map((c, idx) => ({
      slug: c.slug,
      title: c.title,
      eyebrow: c.eyebrow || c.title,
      intro: c.intro || "",
      isPremium: !!c.isPremium,
      order: c.order ?? idx + 1,
      features: (c.features || []).map((f) => ({
        slug: f.slug,
        title: f.title,
        description: f.description || f.summary || "",
        summary: f.summary || undefined,
        isPremium: !!f.isPremium,
        audience: f.audienceLabel || undefined,
        icon: f.icon || undefined,
        image: f.image || undefined,
        imageAlt: f.imageAlt || undefined,
        video: f.video || undefined,
        badges: f.badges?.length ? f.badges : undefined,
      })),
    }))
    .filter((c) => c.slug && c.title && c.features.length > 0);

  return categories.length > 0
    ? { categories, source: "api" }
    : { categories: FEATURE_CATEGORIES, source: "code" };
}

// Admin > Features > Audiences via POST /api/features/audiences
async function getFeatureAudiences(): Promise<{ tabs: AudienceTab[]; source: ContentSourceKind }> {
  const res = await fetchApi<{
    data?: {
      slug: string;
      label: string;
      heading?: string;
      subheading?: string;
      image?: string;
      imageAlt?: string;
      chip?: string;
      chipColor?: string;
      links?: { title: string; slug: string; tag?: string }[];
    }[];
  }>("/api/features/audiences", { method: "POST", tags: ["features"], revalidate: 300 }).catch(() => null);

  const tabs = (res?.data || [])
    .filter((a) => a.slug && a.label)
    .map((a) => ({
      id: a.slug,
      label: a.label,
      heading: a.heading || a.label,
      subheading: a.subheading || "",
      photo: a.image || "",
      photoAlt: a.imageAlt || a.label,
      photoChip: a.chip || a.label,
      photoChipColor: a.chipColor || undefined,
      features: (a.links || []).filter((l) => l.title).map((l) => ({ title: l.title, slug: l.slug, tag: l.tag || "" })),
    }));
  return tabs.length > 0 ? { tabs, source: "api" } : { tabs: AUDIENCE_TABS, source: "code" };
}

// Admin > Features > Integrations via POST /api/integrations
export async function getIntegrations(): Promise<Integration[]> {
  return (await getIntegrationsWithSource()).items;
}

async function getIntegrationsWithSource(): Promise<{ items: Integration[]; source: ContentSourceKind }> {
  const res = await fetchApi<{ data?: { name: string; logo?: string; category?: string }[] }>("/api/integrations", {
    method: "POST",
    tags: ["features"],
    revalidate: 300,
  }).catch(() => null);
  const items = (res?.data || [])
    .filter((i) => i.name && i.logo)
    .map((i) => ({ name: i.name, logo: i.logo as string, category: i.category || undefined }));
  return items.length > 0 ? { items, source: "api" } : { items: INTEGRATIONS, source: "code" };
}

export async function getFeaturesPage(): Promise<FeaturesPageData> {
  const [hero, faqsRes, seo, catalog, media, audiences, integrations] = await Promise.all([
    getSection("features-hero"),
    fetchApi<{ status?: boolean; data?: FaqItem[] }>("/api/pricing/faq", {
      method: "POST",
      tags: ["faqs"],
      revalidate: 300,
    }).catch(() => null),
    fetchSeo("features"),
    resolveFeatureCategoriesWithSource(),
    getSection("features-media"),
    getFeatureAudiences(),
    getIntegrationsWithSource(),
  ]);

  const activeFaqs = filterActiveDocuments(faqsRes?.data);

  // Photos and videos: Features > Cms > "photos and videos" (slots), built-in map as fallback
  const resolvedMedia: Record<string, MediaSlot> = { ...FEATURES_MEDIA };
  const slots = (media.content as { slots?: Record<string, { src?: string; poster?: string; alt?: string } | string> }).slots || {};
  for (const [slotId, value] of Object.entries(slots)) {
    const base = resolvedMedia[slotId] || { id: slotId, kind: "photo" as const, src: "", alt: "" };
    const slot = typeof value === "string" ? { src: value } : value || {};
    resolvedMedia[slotId] = {
      ...base,
      src: slot.src || base.src,
      ...(slot.poster ? { poster: slot.poster } : {}),
      alt: slot.alt ?? base.alt,
      kind: /\.(mp4|webm|m4v)(\?|$)/i.test(slot.src || base.src) ? "video" : base.kind,
    };
  }

  return {
    hero: hero.content,
    categories: catalog.categories,
    audiences: audiences.tabs,
    integrations: integrations.items,
    faqs: activeFaqs.length > 0 ? activeFaqs : undefined,
    seo: seo || undefined,
    media: resolvedMedia,
    sources: {
      hero: hero.source,
      catalog: catalog.source,
      audiences: audiences.source,
      integrations: integrations.source,
      media: media.source,
    },
  };
}

// ----------------------------------------------------------------------------
// About Page Content
// Endpoints: /api/cms (slugs: about-hero, about-mission, about-story, about-leadership, site-about-mission-card),
//            /api/about/values, /api/about/leadership
// ----------------------------------------------------------------------------
export async function getAboutPage(): Promise<AboutPageModel> {
  const [
    heroCms,
    missionCms,
    valuesCms,
    valuesRes,
    storyCms,
    leadershipCms,
    leadershipRes,
    band,
    seo,
  ] = await Promise.all([
    fetchCms("about-hero", ["cms", "about"]),
    fetchCms("about-mission", ["cms", "about"]),
    fetchCms("about-values", ["cms", "about"]),
    fetchApi<{ status?: boolean; data?: AboutValue[] }>("/api/about/values", {
      method: "POST",
      tags: ["about", "about-values"],
      revalidate: 300,
    }).catch(() => null),
    fetchCms("about-story", ["cms", "about"]),
    fetchCms("about-leadership", ["cms", "about"]),
    fetchApi<{ status?: boolean; data?: AboutLeadership[] }>("/api/about/leadership", {
      method: "POST",
      tags: ["about", "about-leadership"],
      revalidate: 300,
    }).catch(() => null),
    getSection("about-mission-card"),
    fetchSeo("about"),
  ]);

  // Images: anything uploaded in the admin, except the known unlicensed Unsplash+
  // previews from the old seed (content/about/page.ts)
  const aboutImage = (v?: string) => (v && v !== "/path" && isImagePath(v) && !UNLICENSED_ABOUT_IMAGES.includes(v) ? v : undefined);
  const approvedHeroImage = aboutImage(heroCms?.image);

  let hero: AboutHero = {
    eyebrow: (heroCms?.tags && heroCms.tags[0]) || "✦ ABOUT US",
    title: heroCms?.title || "Empowering Education Through Innovation",
    subtitle:
      heroCms?.subTitle ||
      heroCms?.description ||
      "We're dedicated to revolutionizing online learning by providing educators and institutions with powerful, intuitive tools to create engaging educational experiences that inspire growth and success.",
    image: approvedHeroImage,
  };

  const missionText = htmlToText(missionCms?.content);
  let mission: AboutMission | undefined = missionText
    ? {
        title: missionCms?.title,
        statement: missionText,
      }
    : undefined;

  // Story: shown once it has text; image, quote and author only when filled in
  const storyText = htmlToText(storyCms?.content);
  let story: AboutStory | undefined = storyText
    ? {
        title: storyCms?.title || "Our Story",
        body: storyText,
        image: aboutImage(storyCms?.image),
        quote: htmlToText(storyCms?.quote) || undefined,
        author: text(storyCms?.author) || undefined,
      }
    : undefined;

  const activeValues = filterActiveDocuments(valuesRes?.data);
  let values: AboutValues | undefined =
    activeValues.length > 0
      ? {
          title: valuesCms?.title || "Our Core Values",
          subtitle: valuesCms?.subTitle,
          items: activeValues
            .map((v) => ({ title: text(v.title), description: htmlToText(v.content) }))
            .filter((v) => v.title),
        }
      : undefined;

  let timeline: AboutTimeline | undefined = undefined;

  const activeLeaders = filterActiveDocuments(leadershipRes?.data);
  let team: AboutTeam | undefined =
    activeLeaders.length > 0
      ? {
          title: leadershipCms?.title || "Meet Our Leadership",
          subtitle: leadershipCms?.subTitle,
          members: activeLeaders
            .filter((l) => text(l.name))
            .map((l) => ({
              name: text(l.name),
              role: text(l.profession) || htmlToText(l.description),
              photo: aboutImage(l.image),
            })),
        }
      : undefined;

  let stats: AboutStats | undefined = undefined;
  let careers: AboutCareers | undefined = undefined;
  let isSample = false;

  // Local-only sample data: dynamic import ONLY when CMS_USE_FIXTURES === "true". Never statically imported.
  // Real CMS data always wins; sample only fills sections the CMS leaves empty.
  if (process.env.CMS_USE_FIXTURES === "true") {
    const sample = await import("@/content/about/sample");

    if (!hero.image) {
      hero = { ...hero, image: sample.SAMPLE_ABOUT_HERO_IMAGE };
      isSample = true;
    }
    if (!mission) {
      mission = sample.SAMPLE_ABOUT_MISSION;
      isSample = true;
    }
    if (!story) {
      story = sample.SAMPLE_ABOUT_STORY;
      isSample = true;
    }
    if (!values) {
      values = sample.SAMPLE_ABOUT_VALUES;
      isSample = true;
    }
    if (!timeline) {
      timeline = sample.SAMPLE_ABOUT_TIMELINE;
      isSample = true;
    }
    if (!team) {
      team = sample.SAMPLE_ABOUT_TEAM;
      isSample = true;
    }
    if (!stats) {
      stats = sample.SAMPLE_ABOUT_STATS;
      isSample = true;
    }
    if (!careers) {
      careers = sample.SAMPLE_ABOUT_CAREERS;
      isSample = true;
    }
  }

  // Closing band: About > Cms > "closing call to action (new site)" (site-about-mission-card)
  const cta = {
    title: band.content.title,
    subtitle: band.content.subtitle || "",
    primaryCta: { label: band.content.buttonText, href: "#" },
  };


  return {
    seo: seo || undefined,
    hero,
    mission,
    story,
    values,
    timeline,
    team,
    stats,
    careers,
    isSample,
    cta,
    band: band.content,
    sources: { hero: heroCms ? "api" : "code", band: band.source },
  };
}

// ----------------------------------------------------------------------------
// Contact Page Content
// Endpoints: /api/cms (slugs: contact-hero, address), /api/seo
// ----------------------------------------------------------------------------
export async function getContactPage(): Promise<ContactPageModel> {
  const [hero, channelsSection, form, siteContact, settingsCms, seo] = await Promise.all([
    getSection("contact-hero"),
    getSection("contact-channels"),
    getSection("contact-form"),
    getSiteContact(),
    fetchCms("address", ["cms", "settings"]).catch(() => null),
    fetchSeo("contact"),
  ]);
  const labels = channelsSection.content;

  const channels: ContactChannel[] = [];
  const emailVal = siteContact.email || settingsCms?.email || defaultContactDetails.email;
  if (emailVal) {
    channels.push({
      type: "email",
      title: labels?.emailLabel || "Email",
      value: emailVal,
      href: `mailto:${emailVal}`,
    });
  }

  const phoneVal = siteContact.phone || (settingsCms?.phone && !isPlaceholderPhone(settingsCms.phone) ? settingsCms.phone : "");
  if (phoneVal) {
    channels.push({
      type: "phone",
      title: labels?.phoneLabel || "Phone",
      value: phoneVal,
      href: `tel:${phoneVal.replace(/\s+/g, "")}`,
    });
  }

  const waVal = siteContact.whatsappNumber;
  if (waVal) {
    const waDigits = waVal.replace(/\D/g, "");
    channels.push({
      type: "whatsapp",
      title: "WhatsApp",
      value: waVal,
      href: `https://wa.me/${waDigits}`,
    });
  }

  const addrParts = [
    ...(siteContact.addressLines || []),
    [siteContact.city, siteContact.postalCode].filter(Boolean).join(" "),
    siteContact.country,
  ].filter(Boolean);

  if (addrParts.length > 0) {
    channels.push({
      type: "address",
      title: labels?.addressLabel || "Office",
      value: addrParts.join(", "),
      href: siteContact.mapUrl || undefined,
    });
  }

  const { topics, ...formConfig } = form.content;
  return {
    seo: seo || undefined,
    hero: {
      eyebrow: hero.content?.eyebrow || DEFAULT_CONTACT_HERO.eyebrow,
      title: (hero.content?.title && hero.content.title.trim() !== "" && !/lorem ipsum/i.test(hero.content.title)) ? hero.content.title : DEFAULT_CONTACT_HERO.title,
      subtitle: (hero.content?.subtitle && hero.content.subtitle.trim() !== "" && !/lorem ipsum/i.test(hero.content.subtitle)) ? hero.content.subtitle : DEFAULT_CONTACT_HERO.subtitle,
    },
    form: { ...formConfig, privacyNote: formConfig.privacyNote || undefined },
    topics,
    channels,
    channelsHeading: { title: labels.title, subtitle: labels.subtitle },
    faq: undefined,
    cta: undefined,
    sources: { hero: hero.source, channels: channelsSection.source, form: form.source },
  };
}

// ----------------------------------------------------------------------------
// Legal Pages Content
// Slugs: privacy-policy, terms, refund-policy, dpa
// Priority: CMS document with content wins; falls back to DEFAULT_LEGAL_PAGES (repo original text).
// ----------------------------------------------------------------------------
export async function getLegalPage(slug: string): Promise<LegalPageData | null> {
  const [cmsDoc, seo] = await Promise.all([
    fetchCms(slug, ["cms", "legal", slug]),
    fetchSeo(slug),
  ]);

  const defaultPage = DEFAULT_LEGAL_PAGES[slug];

  // Try CMS first: if CMS has published content, CMS wins
  if (cmsDoc && cmsDoc.content && cmsDoc.content.trim().length > 0) {
    const title = cmsDoc.title || cmsDoc.heading || defaultPage?.title || slug;
    const lastUpdated = cmsDoc.updatedAt || cmsDoc.createdAt || defaultPage?.lastUpdated;

    return {
      slug,
      title,
      lastUpdated,
      body: cmsDoc.content,
      content: cmsDoc.content,
      seo: seo || defaultPage?.seo,
    };
  }

  // Fallback to repo legal content
  if (defaultPage) {
    return {
      ...defaultPage,
      seo: seo || defaultPage.seo,
    };
  }

  return null;
}

export async function getLegalPages(): Promise<string[]> {
  const potentialSlugs = ["privacy-policy", "terms", "refund-policy", "dpa"];
  const pagesWithContent: string[] = [];

  for (const slug of potentialSlugs) {
    const page = await getLegalPage(slug);
    if (page && page.body) {
      pagesWithContent.push(slug);
    }
  }

  return pagesWithContent;
}

// ----------------------------------------------------------------------------
// Auth Pages Copy
// ----------------------------------------------------------------------------
export async function getAuthCopy(): Promise<AuthCopy> {
  return (await getAuthCopyWithSource()).copy;
}

// Login & signup pages: Admin > Login & signup > Cms (auth-copy)
export async function getAuthCopyWithSource(): Promise<{ copy: AuthCopy; source: ContentSourceKind }> {
  const section = await getSection("auth-copy");
  const copy = { ...(section.content as AuthCopy) };
  // Phase 2 copy is code-owned until cutover; auth-copy in CMS contains stale claims (DRM, verifiable certificates)
  copy.sidePanel = {
    ...copy.sidePanel,
    bullets: [
      "Course builder with lessons and drip release",
      "Zoom live classes",
      "Tests and question banks",
      "Branded certificates",
      "Payments with GST invoices",
    ],
  };
  return { copy, source: section.source };
}

export async function getHomePage() {
  // Stub for future CMS binding of Home
  const seo = await fetchSeo("home");
  return { seo };
}

// ----------------------------------------------------------------------------
// Domie AI Page Content
// Slugs: ai-hero, ai-availability, ai-cta, seo: ai
// Fallback: DEFAULT_AI_PAGE_DATA from content/ai/page.ts
// ----------------------------------------------------------------------------
export async function getAiPage(): Promise<AiPageData> {
  const [hero, tools, availability, related, band, howItWorksCms, seo, catalog] = await Promise.all([
    getSection("ai-hero"),
    getSection("ai-tools"),
    getSection("ai-availability"),
    getSection("ai-related-tools"),
    getSection("ai-cta"),
    fetchCms("ai-how-it-works", ["cms", "ai"]),
    fetchSeo("ai"),
    resolveFeatureCategoriesWithSource(),
  ]);
  const aiFeatures = catalog.categories.find((c) => c.slug === "ai-powered-tools")?.features || [];
  const bulletsBySlug = new Map((tools.content.tools || []).map((t) => [t.slug, t.bullets]));

  // Section appears ONLY when provided by CMS slug 'ai-how-it-works'
  const howItWorks = howItWorksCms?.title
    ? {
        title: howItWorksCms.title,
        steps: Array.isArray(howItWorksCms.counts)
          ? howItWorksCms.counts.map((c, i) => ({
              stepNumber: String(i + 1).padStart(2, "0"),
              title: c.title,
              description: c.count,
            }))
          : [],
      }
    : undefined;

  const worst = (...kinds: ContentSourceKind[]): ContentSourceKind =>
    kinds.includes("code") ? "code" : kinds.includes("partial") ? "partial" : "api";

  return {
    ...DEFAULT_AI_PAGE_DATA,
    hero: {
      ...DEFAULT_AI_PAGE_DATA.hero,
      ...hero.content,
      primaryCta: { ...DEFAULT_AI_PAGE_DATA.hero.primaryCta, ...hero.content.primaryCta },
      secondaryCta: { ...DEFAULT_AI_PAGE_DATA.hero.secondaryCta, ...hero.content.secondaryCta },
    },
    // Name, audience and summary from Features > Items; bullets from Domie AI > Cms
    tools: AI_TOOLS.map((tool) => {
      const feature = aiFeatures.find((f) => f.slug === tool.slug);
      return {
        ...tool,
        ...(feature ? { name: feature.title, audience: feature.audience || tool.audience, summary: feature.description || tool.summary } : {}),
        bullets: bulletsBySlug.get(tool.slug) || tool.bullets,
      };
    }),
    howItWorks,
    availability: {
      ...availability.content,
      secondaryCta: { action: "modal" as const, ...availability.content.secondaryCta },
    },
    relatedTools: related.content.items.length ? related.content : undefined,
    faq: undefined, // Hidden until real FAQ items exist in backend
    band: band.content,
    seo: seo || undefined,
    sources: {
      hero: hero.source,
      tools: worst(tools.source, catalog.source),
      availability: availability.source,
      relatedTools: related.source,
      band: band.source,
    },
  };
}

// ----------------------------------------------------------------------------
// Homepage Testimonials (Wall of Love + CtaSection floating cards)
// Endpoint: POST /api/home/testimonials
// ----------------------------------------------------------------------------
// Home: client logos (heading: Home > Cms > "client logos (new site)";
// logos: Home > Client logos, /api/home/clients). Returns null when unpublished
// or empty, and the section is not shown. Refresh tags: home.
// ----------------------------------------------------------------------------
const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const isImagePath = (v: string) => /^(\/uploads\/|https:\/\/|\/assets\/)/.test(v);
const isHttpUrl = (v: string) => /^https?:\/\/\S+$/i.test(v);
type Loose = Record<string, unknown>;
const list = (v: unknown): Loose[] => (Array.isArray(v) ? v.filter((x): x is Loose => !!x && typeof x === "object") : []);
// Client logo records (Home > Client logos, /api/home/clients)
interface BackendClient {
  _id?: string;
  slug?: string;
  title?: string;
  logo?: string;
  altImage?: string;
  url?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export async function getHomeClients(): Promise<HomeClients | null> {
  const [doc, res] = await Promise.all([
    fetchCms("site-home-clients", ["cms", "home", "cms:site-home-clients"]),
    fetchApi<{ status?: boolean; data?: BackendClient[] }>("/api/home/clients", {
      method: "POST",
      body: { slug: "" },
      tags: ["home", "clients"],
      revalidate: 300,
    }).catch(() => null),
  ]);
  if (!doc) return null;
  const data: Loose = doc.data || {};
  const logos = filterActiveDocuments(res?.data)
    .map((c, idx) => ({
      id: String(c._id || c.slug || idx),
      name: text(c.altImage) || text(c.title),
      logo: text(c.logo),
      url: isHttpUrl(text(c.url)) ? text(c.url) : undefined,
    }))
    .filter((c) => c.name && isImagePath(c.logo) && !/^client\s*\d*$/i.test(c.name));
  if (!logos.length) return null;
  return { eyebrow: text(data.eyebrow), title: text(data.title), subtitle: text(data.subtitle), logos };
}

// Rich text from the admin editor ("<p>..</p>") as plain paragraphs (blank line between)
export function htmlToText(value: unknown): string {
  return String(value ?? "")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|h[1-6])\s*>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ----------------------------------------------------------------------------
// Custom Plan (/custom-lms) Page Content
// Tags: ["custom-plan"]
// ----------------------------------------------------------------------------
export async function getCustomPlanPage(): Promise<CustomPlanPageData> {
  const [
    seoDoc,
    heroDoc,
    audiencesDoc,
    deliverablesDoc,
    timelineDoc,
    comparisonDoc,
    servicesDoc,
    pricingNoteDoc,
    formDoc,
    faqDoc,
    ctaDoc,
  ] = await Promise.all([
    fetchCms("site-custom-seo", ["cms", "custom-plan"]),
    fetchCms("site-custom-hero", ["cms", "custom-plan"]),
    fetchCms("site-custom-audiences", ["cms", "custom-plan"]),
    fetchCms("site-custom-deliverables", ["cms", "custom-plan"]),
    fetchCms("site-custom-timeline", ["cms", "custom-plan"]),
    fetchCms("site-custom-comparison", ["cms", "custom-plan"]),
    fetchCms("site-custom-services", ["cms", "custom-plan"]),
    fetchCms("site-custom-pricing-note", ["cms", "custom-plan"]),
    fetchCms("site-custom-form", ["cms", "custom-plan"]),
    fetchCms("site-custom-faq", ["cms", "custom-plan"]),
    fetchCms("site-custom-cta", ["cms", "custom-plan"]),
  ]);

  const fallback = DEFAULT_CUSTOM_PLAN_PAGE_DATA;
  const TIMING_PROMISE_REGEX = /within 24 hours|working days|in days\b|within a day|one working day/i;
  const cleanTiming = <T extends string | undefined | null>(val: T, def: T): T => (!val || TIMING_PROMISE_REGEX.test(val) ? def : val);

  const getData = <T>(doc: any, def: T): T => {
    if (!doc || doc.isActive === false || doc.isDeleted === true) return def;
    if (doc.data && typeof doc.data === "object") {
      return { ...def, ...doc.data };
    }
    return def;
  };

  const rawSeoTitle = seoDoc?.data?.title;
  const rawSeoDesc = seoDoc?.data?.description;
  const seo = {
    title: liveOr(cleanTiming(rawSeoTitle, fallback.seo?.title || ""), fallback.seo?.title || ""),
    description: liveOr(cleanTiming(rawSeoDesc, fallback.seo?.description || ""), fallback.seo?.description || ""),
    shareImage: seoDoc?.data?.shareImage || "",
  };

  const rawHero = getData(heroDoc, fallback.hero);
  const hero = {
    ...rawHero,
    title: liveOr(cleanTiming(rawHero.title, fallback.hero.title), fallback.hero.title),
    subtitle: liveOr(cleanTiming(rawHero.subtitle, fallback.hero.subtitle), fallback.hero.subtitle),
    proofChips: keepLive(rawHero.proofChips, (chip) => chip).filter((chip) => !TIMING_PROMISE_REGEX.test(chip)),
  };

  const rawAudiences = audiencesDoc?.isActive !== false ? getData(audiencesDoc, fallback.audiences) : undefined;
  const audiences = rawAudiences
    ? {
        ...rawAudiences,
        title: liveOr(cleanTiming(rawAudiences.title, fallback.audiences?.title || ""), fallback.audiences?.title || ""),
        items: keepLive(rawAudiences.items, (item) => [item.title, item.text])
          .filter((item) => !/schools?|colleges?|universit/i.test(item.title) && !TIMING_PROMISE_REGEX.test(item.text)),
      }
    : undefined;

  const rawDeliverables = deliverablesDoc?.isActive !== false ? getData(deliverablesDoc, fallback.deliverables) : undefined;
  const deliverables = rawDeliverables
    ? {
        ...rawDeliverables,
        title: liveOr(cleanTiming(rawDeliverables.title, fallback.deliverables?.title || ""), fallback.deliverables?.title || ""),
        subtitle: liveOr(cleanTiming(rawDeliverables.subtitle, fallback.deliverables?.subtitle || ""), fallback.deliverables?.subtitle || ""),
        items: keepLive(rawDeliverables.items, (item) => [item.title, item.text, item.tag])
          .filter((item) => !TIMING_PROMISE_REGEX.test(item.text)),
      }
    : undefined;

  const rawTimeline = timelineDoc?.isActive !== false ? getData(timelineDoc, fallback.timeline) : undefined;
  const timeline = rawTimeline
    ? {
        ...rawTimeline,
        title: liveOr(cleanTiming(rawTimeline.title, fallback.timeline?.title || "From first call to launch"), fallback.timeline?.title || "From first call to launch"),
        subtitle: liveOr(cleanTiming(rawTimeline.subtitle, fallback.timeline?.subtitle || ""), fallback.timeline?.subtitle || ""),
        footnote: liveOr(cleanTiming(rawTimeline.footnote, fallback.timeline?.footnote || "We agree the dates with you in the written plan."), fallback.timeline?.footnote || "We agree the dates with you in the written plan."),
        steps: keepLive(rawTimeline.steps, (step) => [step.title, step.text, step.when])
          .filter((step) => !TIMING_PROMISE_REGEX.test(step.text))
          .map((step, idx) => ({
            ...step,
            when: `Step ${idx + 1}`,
          })),
      }
    : undefined;

  const rawComparison = comparisonDoc?.isActive !== false ? getData(comparisonDoc, fallback.comparison) : undefined;
  const comparison = rawComparison
    ? {
        ...rawComparison,
        title: liveOr(cleanTiming(rawComparison.title, fallback.comparison?.title || ""), fallback.comparison?.title || ""),
        rows: keepLive(rawComparison.rows, (row) => [row.topic, row.left, row.right])
          .filter((row) => !TIMING_PROMISE_REGEX.test(row.left) && !TIMING_PROMISE_REGEX.test(row.right)),
      }
    : undefined;

  const rawServices = servicesDoc?.isActive !== false ? getData(servicesDoc, fallback.services) : undefined;
  const services = rawServices
    ? {
        ...rawServices,
        title: liveOr(cleanTiming(rawServices.title, fallback.services?.title || ""), fallback.services?.title || ""),
        items: keepLive(rawServices.items, (item) => [item.title, item.text])
          .filter((item) => !TIMING_PROMISE_REGEX.test(item.text))
          .map((item) => ({
            ...item,
            text: item.text.replace(/\bengagement\b/gi, "growth"),
          })),
      }
    : undefined;

  const rawPricingNote = pricingNoteDoc?.isActive !== false ? getData(pricingNoteDoc, fallback.pricingNote) : undefined;
  const pricingNote = rawPricingNote
    ? {
        ...rawPricingNote,
        title: liveOr(cleanTiming(rawPricingNote.title, fallback.pricingNote?.title || ""), fallback.pricingNote?.title || ""),
        text: liveOr(cleanTiming(rawPricingNote.text, fallback.pricingNote?.text || ""), fallback.pricingNote?.text || ""),
      }
    : undefined;

  const rawForm = getData(formDoc, fallback.form);
  const form = {
    ...rawForm,
    title: liveOr(cleanTiming(rawForm.title, fallback.form.title), fallback.form.title),
    subtitle: liveOr(cleanTiming(rawForm.subtitle, fallback.form.subtitle), fallback.form.subtitle),
    successMessage: liveOr(cleanTiming(rawForm.successMessage, fallback.form.successMessage), fallback.form.successMessage),
    needs: keepLive(rawForm.needs, (need) => need),
  };

  const rawFaq = faqDoc?.isActive !== false ? getData(faqDoc, fallback.faq) : undefined;
  const faq = rawFaq
    ? {
        ...rawFaq,
        title: liveOr(cleanTiming(rawFaq.title, fallback.faq?.title || ""), fallback.faq?.title || ""),
        items: keepLive(rawFaq.items, (item) => [item.question, item.answer])
          .filter((item) => !TIMING_PROMISE_REGEX.test(item.answer) && !TIMING_PROMISE_REGEX.test(item.question)),
      }
    : undefined;

  const rawCta = ctaDoc?.isActive !== false ? getData(ctaDoc, fallback.cta) : undefined;
  const cta = rawCta
    ? {
        ...rawCta,
        title: liveOr(cleanTiming(rawCta.title, fallback.cta?.title || ""), fallback.cta?.title || ""),
        text: liveOr(cleanTiming(rawCta.text, fallback.cta?.text || ""), fallback.cta?.text || ""),
      }
    : undefined;

  return {
    seo,
    hero,
    audiences,
    deliverables,
    timeline,
    comparison,
    services,
    pricingNote,
    form,
    faq,
    cta,
  };
}

export async function getSiteNavigation(): Promise<SiteNavigation | null> {
  try {
    const doc = await fetchCms("site-navigation", ["cms", "settings", "navigation"]);
    if (!doc || doc.isActive === false || doc.isDeleted === true) return null;
    return (doc.data as SiteNavigation) || null;
  } catch (e) {
    return null;
  }
}

export async function getSiteAbout(): Promise<AboutContent> {
  try {
    const doc = await fetchCms("site-about", ["cms", "about", "cms:site-about"]);
    if (!doc || !doc.data) return defaultAboutContent;
    const data = doc.data as Partial<AboutContent>;
    const rawTeam = Array.isArray(data.team) ? data.team : [];
    const team = rawTeam.length > 0 ? rawTeam : defaultAboutContent.team;

    return {
      heroTitle: text(data.heroTitle) || defaultAboutContent.heroTitle,
      mission: text(data.mission) || defaultAboutContent.mission,
      companyLegalName: text(data.companyLegalName) || defaultAboutContent.companyLegalName,
      productName: text(data.productName) || defaultAboutContent.productName,
      city: text(data.city) || defaultAboutContent.city,
      region: text(data.region) || defaultAboutContent.region,
      country: text(data.country) || defaultAboutContent.country,
      yearFounded: Number(data.yearFounded) || defaultAboutContent.yearFounded,
      companyBlurb: text(data.companyBlurb) || defaultAboutContent.companyBlurb,
      team,
    };
  } catch (e) {
    return defaultAboutContent;
  }
}

export async function getSiteContact(): Promise<ContactDetails> {
  try {
    const doc = await fetchCms("site-contact", ["cms", "contact", "cms:site-contact"]);
    if (!doc || !doc.data) return defaultContactDetails;
    const data = doc.data as Partial<ContactDetails>;
    const addressLines = Array.isArray(data.addressLines) && data.addressLines.length > 0
      ? data.addressLines.map((l) => text(l)).filter(Boolean)
      : defaultContactDetails.addressLines;

    return {
      email: text(data.email) || defaultContactDetails.email,
      phone: text(data.phone) || defaultContactDetails.phone,
      whatsappNumber: text(data.whatsappNumber) || defaultContactDetails.whatsappNumber,
      addressLines,
      city: text(data.city) || defaultContactDetails.city,
      postalCode: text(data.postalCode) || defaultContactDetails.postalCode,
      country: text(data.country) || defaultContactDetails.country,
      mapUrl: isHttpUrl(text(data.mapUrl)) ? text(data.mapUrl) : defaultContactDetails.mapUrl,
      hours: text(data.hours) || defaultContactDetails.hours,
    };
  } catch (e) {
    return defaultContactDetails;
  }
}
