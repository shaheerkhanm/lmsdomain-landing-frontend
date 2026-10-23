// ============================================================================
// Content Layer API Functions
// Interacts with backend API endpoints and returns typed content models
// Filters: isActive === true && isDeleted !== true
// ============================================================================

import { fetchApi } from "./client";
import { isPlaceholderPhone } from "@/lib/utils";
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
  HomeTestimonials,
  TestimonialItem,
  PlanCurrency,
} from "@/types/content";
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
import { FEATURES_MEDIA, MediaSlot } from "@/content/features/media";
import { DEFAULT_AI_PAGE_DATA, AI_TOOLS } from "@/content/ai/page";
import {
  DEFAULT_PRICING_HERO,
  DEFAULT_PRICING_EMPTY_STATE,
} from "@/content/pricing/page";
import { ABOUT_HERO_IMAGE_APPROVED } from "@/content/about/page";
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
// Slugs: "address", "footer"
// ----------------------------------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  const [address, footer] = await Promise.all([
    fetchCms("address", ["cms", "settings", "address"]),
    fetchCms("footer", ["cms", "settings", "footer"]),
  ]);

  return {
    address: address || undefined,
    footer: footer || undefined,
    appLoginUrl: readSettingUrl(address, "appLoginUrl"),
    appSignupUrl: readSettingUrl(address, "appSignupUrl"),
    appForgotPasswordUrl: readSettingUrl(address, "appForgotPasswordUrl"),
  };
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
// Endpoints: /api/cms (slugs: pricing-hero, pricing-faq, pricing-footer-card),
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

export async function getPricingPage(): Promise<PricingPageModel> {
  const [heroCms, emptyCms, footerCard, faqCms, plansRes, faqsRes, seo] = await Promise.all([
    fetchCms("pricing-hero", ["cms", "pricing"]),
    fetchCms("pricing-empty", ["cms", "pricing"]),
    fetchCms("pricing-footer-card", ["cms", "pricing"]),
    // FAQ heading (title / subTitle), as on the live site
    fetchCms("pricing-faq", ["cms", "pricing"]),
    fetchApi<{ status?: boolean; data?: PricingPlan[] }>("/api/pricing", {
      method: "POST",
      tags: ["pricing", "plans"],
      revalidate: 300,
    }).catch(() => null),
    fetchApi<{ status?: boolean; data?: FaqItem[] }>("/api/pricing/faq", {
      method: "POST",
      tags: ["pricing", "faqs"],
      revalidate: 300,
    }).catch(() => null),
    fetchSeo("pricing"),
  ]);
  // Admin > Pricing > Comparison (rows with one value per plan)
  const comparisonRes = await fetchApi<{
    data?: { group: string; label: string; tooltip?: string; values?: { plan: string; value?: string }[] }[];
  }>("/api/pricing/comparison", { method: "POST", tags: ["pricing"], revalidate: 300 }).catch(() => null);

  const activePlans = filterActiveDocuments(plansRes?.data);
  const activeFaqs = filterActiveDocuments(faqsRes?.data);

  let isSample = false;
  let currencyCode = "";
  const currencySymbol = "";
  let yearlySavingsLabel: string | undefined = undefined;
  let mappedPlans: Plan[] = [];
  let comparison: PricingComparison | undefined = undefined;
  let addOns: { title: string; items: PricingAddOn[] } | undefined = undefined;
  let enterprise: PricingEnterprise | undefined = undefined;
  const faqHeading = {
    title: faqCms?.title || undefined,
    subtitle: faqCms?.subTitle || faqCms?.description || undefined,
  };
  let faq = activeFaqs.length > 0 ? { ...faqHeading, items: activeFaqs } : undefined;

  if (activePlans.length > 0) {
    // "Most popular": the backend isPopular flag wins. Until the backend has it,
    // server env PRICING_POPULAR_PLAN names the plan (title or slug, any case).
    const backendHasPopular = activePlans.some((doc) => doc.isPopular === true);
    const envPopular = process.env.PRICING_POPULAR_PLAN?.trim().toLowerCase();
    const isEnvPopular = (doc: PricingPlan) =>
      !backendHasPopular &&
      !!envPopular &&
      (doc.title?.trim().toLowerCase() === envPopular || doc.slug?.trim().toLowerCase() === envPopular);

    mappedPlans = activePlans.map((doc, idx) => {
      // Highlight only when the backend (or the env fallback) says so; no guessing from the title
      const isPopular = doc.isPopular === true || isEnvPopular(doc);
      // "Custom" only when the backend marks the plan, never because a price is missing
      const isCustom = doc.isCustom === true || doc.buttonAction === "contact";
      const monthlyPrice = typeof doc.price === "number" ? doc.price : null;
      // Yearly is derived exactly like the live site: monthly × 12 less the plan's
      // `discount` %. (`price_yearly` exists in the model but the live site ignores it.)
      const discountPercent = normalizeDiscount(doc.discount);
      const yearly = monthlyPrice !== null ? yearlyFromMonthly(monthlyPrice, discountPercent) : null;

      const limits = [];
      if (doc.max_users) {
        limits.push({
          label: "Active Learners",
          value: `Up to ${doc.max_users.toLocaleString()}`,
        });
      }

      return {
        id: doc._id || doc.slug || String(idx),
        slug: doc.slug,
        name: doc.title,
        tagline: doc.subTitle,
        isPopular,
        isCustom,
        prices: {
          monthly: monthlyPrice,
          yearly: yearly ? yearly.discounted : null,
        },
        yearlyFullPrice: yearly ? yearly.full : null,
        discountPercent,
        currency: resolvePlanCurrency(doc),
        priceSuffix: monthlyPrice !== null ? "/month" : "",
        priceSuffixes: {
          monthly: doc.priceSuffix || "/month",
          yearly: doc.priceSuffixYearly || "/year, billed annually",
        },
        priceNote: isCustom ? "Custom" : undefined,
        limits: limits.length > 0 ? limits : undefined,
        features: Array.isArray(doc.tags) ? doc.tags : [],
        cta: {
          label: doc.buttonText || (isPopular ? "Get Started" : "Start Free Trial"),
          action: doc.buttonAction === "demo" ? "demo" : doc.buttonAction === "contact" ? "contact" : "signup",
          href: doc.buttonAction?.startsWith("/") ? doc.buttonAction : `/signup?plan=${doc.slug || doc._id}`,
        },
        displayOrder: doc.displayOrder || idx + 1,
      };
    });
  } else if (process.env.CMS_USE_FIXTURES === "true") {
    // Dynamic import ONLY when CMS_USE_FIXTURES === "true". Never statically imported.
    const sample = await import("@/content/pricing/sample");
    mappedPlans = sample.SAMPLE_PLANS.map((plan) => ({ ...plan, currency: resolvePlanCurrency() }));
    comparison = sample.SAMPLE_COMPARISON;
    addOns = { title: "Flexible Add-Ons", items: sample.SAMPLE_ADD_ONS };
    enterprise = sample.SAMPLE_ENTERPRISE;
    faq = { ...sample.SAMPLE_FAQ, ...(faqHeading.title ? faqHeading : {}) };
    yearlySavingsLabel = "Sample: 2 months free";
    isSample = true;
  }

  // Comparison table from the admin: "yes" is a check, "no" or empty a dash, anything else text
  const comparisonRows = comparisonRes?.data || [];
  if (activePlans.length > 0 && comparisonRows.length > 0) {
    const groups: PricingComparison["groups"] = [];
    for (const row of comparisonRows) {
      if (!row.group || !row.label) continue;
      let group = groups.find((g) => g.title === row.group);
      if (!group) {
        group = { title: row.group, rows: [] };
        groups.push(group);
      }
      const values: Record<string, boolean | string> = {};
      for (const cell of row.values || []) {
        const v = (cell.value || "").trim();
        values[String(cell.plan)] = /^yes$/i.test(v) ? true : /^no$/i.test(v) || v === "" ? false : v;
      }
      group.rows.push({ label: row.label, tooltip: row.tooltip || undefined, values });
    }
    comparison = groups.length > 0 ? { groups } : undefined;
  }

  const hasYearlyPrices = mappedPlans.some((plan) => !plan.isCustom && plan.prices.yearly !== null);

  // Page-level currency mirrors the first plan (plans carry their own currency).
  if (mappedPlans.length > 0) {
    currencyCode = mappedPlans[0].currency.code;
  }

  const hero = {
    eyebrow: (heroCms?.tags && heroCms.tags[0]) || DEFAULT_PRICING_HERO.eyebrow,
    title: heroCms?.title || DEFAULT_PRICING_HERO.title,
    subtitle: heroCms?.subTitle || heroCms?.description || DEFAULT_PRICING_HERO.subtitle,
  };

  const emptyState = {
    title: emptyCms?.title || DEFAULT_PRICING_EMPTY_STATE.title,
    subtitle: emptyCms?.subTitle || emptyCms?.description || DEFAULT_PRICING_EMPTY_STATE.subtitle,
    primaryCta: {
      label: emptyCms?.buttonText || DEFAULT_PRICING_EMPTY_STATE.primaryCta.label,
      action: "demo" as const,
    },
    secondaryCta: {
      label: "Contact sales",
      href: emptyCms?.buttonAction || DEFAULT_PRICING_EMPTY_STATE.secondaryCta.href,
      action: "contact" as const,
    },
  };

  return {
    isSample,
    seo: seo || undefined,
    hero,
    billing: {
      // Yearly is offered when a priced plan has a yearly price (derived from its monthly price)
      periods: hasYearlyPrices
        ? [
            { id: "monthly", label: "Monthly" },
            { id: "yearly", label: "Yearly", note: yearlySavingsLabel },
          ]
        : [{ id: "monthly", label: "Monthly" }],
      defaultPeriod: "monthly",
      yearlySavingsLabel,
    },
    currency: {
      code: currencyCode,
      symbol: currencySymbol,
      position: "before",
    },
    plans: mappedPlans,
    emptyState: mappedPlans.length === 0 ? emptyState : undefined,
    comparison,
    addOns,
    enterprise,
    faq,
    cta: {
      title: footerCard?.title || "Ready to Launch Your Branded Academy?",
      subtitle: footerCard?.subTitle || "Speak with our team to find the exact configuration for your team.",
      primaryCta: { label: footerCard?.buttonText || "Request a Demo" },
    },
  };
}

// ----------------------------------------------------------------------------
// Features Page Content
// Endpoints: /api/cms (slugs: features-hero, features-cta),
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

  return categories.length > 0 ? categories : FEATURE_CATEGORIES;
}

// Admin > Features > Audiences via POST /api/features/audiences
async function getFeatureAudiences(): Promise<AudienceTab[]> {
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
  return tabs.length > 0 ? tabs : AUDIENCE_TABS;
}

// Admin > Features > Integrations via POST /api/integrations
export async function getIntegrations(): Promise<Integration[]> {
  const res = await fetchApi<{ data?: { name: string; logo?: string; category?: string }[] }>("/api/integrations", {
    method: "POST",
    tags: ["features"],
    revalidate: 300,
  }).catch(() => null);
  const items = (res?.data || [])
    .filter((i) => i.name && i.logo)
    .map((i) => ({ name: i.name, logo: i.logo as string, category: i.category || undefined }));
  return items.length > 0 ? items : INTEGRATIONS;
}

export async function getFeaturesPage(): Promise<FeaturesPageData> {
  const [hero, closingCta, faqsRes, seo, categories, mediaCms, audiences, integrations] = await Promise.all([
    fetchCms("features-hero", ["cms", "features"]),
    fetchCms("features-cta", ["cms", "features"]),
    fetchApi<{ status?: boolean; data?: FaqItem[] }>("/api/pricing/faq", {
      method: "POST",
      tags: ["faqs"],
      revalidate: 300,
    }).catch(() => null),
    fetchSeo("features"),
    resolveFeatureCategories(),
    fetchCms("features-media", ["cms", "features"]),
    getFeatureAudiences(),
    getIntegrations(),
  ]);

  const activeFaqs = filterActiveDocuments(faqsRes?.data);

  // Swappable media: start from FEATURES_MEDIA, overlay any CMS slot overrides
  const resolvedMedia: Record<string, MediaSlot> = { ...FEATURES_MEDIA };
  const cmsSlots = (mediaCms as any)?.slots || (mediaCms as any)?.data;
  if (cmsSlots && typeof cmsSlots === "object") {
    for (const [slotId, value] of Object.entries(cmsSlots)) {
      if (typeof value === "string" && resolvedMedia[slotId]) {
        resolvedMedia[slotId] = { ...resolvedMedia[slotId], src: value };
      }
    }
  }

  return {
    hero: hero || undefined,
    closingCta: closingCta || undefined,
    categories,
    audiences,
    integrations,
    faqs: activeFaqs.length > 0 ? activeFaqs : undefined,
    seo: seo || undefined,
    media: resolvedMedia,
  };
}

// ----------------------------------------------------------------------------
// About Page Content
// Endpoints: /api/cms (slugs: about-hero, about-mission, about-story, about-leadership, about-mission-card),
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
    missionCardCms,
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
    fetchCms("about-mission-card", ["cms", "about"]),
    fetchSeo("about"),
  ]);

  // Guard hero image: current CMS entry contains an unlicensed Unsplash+ preview (/uploads/upload1759252684970.jpeg)
  const approvedHeroImage =
    ABOUT_HERO_IMAGE_APPROVED && heroCms?.image && heroCms.image !== "/path"
      ? heroCms.image
      : undefined;

  let hero: AboutHero = {
    eyebrow: (heroCms?.tags && heroCms.tags[0]) || "✦ ABOUT US",
    title: heroCms?.title || "Empowering Education Through Innovation",
    subtitle:
      heroCms?.subTitle ||
      heroCms?.description ||
      "We're dedicated to revolutionizing online learning by providing educators and institutions with powerful, intuitive tools to create engaging educational experiences that inspire growth and success.",
    image: approvedHeroImage,
  };

  let mission: AboutMission | undefined = missionCms?.content
    ? {
        title: missionCms.title,
        statement: missionCms.content,
      }
    : undefined;

  const storyImage =
    storyCms?.image && storyCms.image !== "/path"
      ? storyCms.image
      : "/assets/img/our-story-img.jpg";

  let story: AboutStory | undefined = storyCms?.content
    ? {
        title: storyCms.title || "Our Story",
        body: storyCms.content,
        image: storyImage,
      }
    : undefined;

  const activeValues = filterActiveDocuments(valuesRes?.data);
  let values: AboutValues | undefined =
    activeValues.length > 0
      ? {
          title: valuesCms?.title || "Our Core Values",
          subtitle: valuesCms?.subTitle,
          items: activeValues.map((v) => ({
            title: v.title,
            description: v.content,
          })),
        }
      : undefined;

  let timeline: AboutTimeline | undefined = undefined;

  const activeLeaders = filterActiveDocuments(leadershipRes?.data);
  let team: AboutTeam | undefined =
    activeLeaders.length > 0
      ? {
          title: leadershipCms?.title || "Meet Our Leadership",
          subtitle: leadershipCms?.subTitle,
          members: activeLeaders.map((l) => ({
            name: l.name,
            role: l.profession || l.description || "Leadership",
            photo: l.image || "/assets/img/reference/avatar-1.png",
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

  const cta = {
    title: missionCardCms?.title || "Ready to Transform Your Learning Architecture?",
    subtitle:
      missionCardCms?.subTitle ||
      "Partner with LMS Domain to deliver structured, verifiable, and engaging academy experiences.",
    primaryCta: {
      label: missionCardCms?.buttonText || "Request a Demo",
      href: missionCardCms?.buttonAction || "#",
    },
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
  };
}

// ----------------------------------------------------------------------------
// Contact Page Content
// Endpoints: /api/cms (slugs: contact-hero, address), /api/seo
// ----------------------------------------------------------------------------
export async function getContactPage(): Promise<ContactPageModel> {
  const [heroCms, formCms, settingsCms, seo] = await Promise.all([
    fetchCms("contact-hero", ["cms", "contact"]),
    fetchCms("contact-form", ["cms", "contact"]),
    fetchCms("address", ["cms", "settings"]),
    fetchSeo("contact"),
  ]);

  const hero: ContactHero = {
    eyebrow: (heroCms?.tags && heroCms.tags[0]) || DEFAULT_CONTACT_HERO.eyebrow,
    title: heroCms?.title || DEFAULT_CONTACT_HERO.title,
    subtitle:
      heroCms?.subTitle ||
      heroCms?.description ||
      DEFAULT_CONTACT_HERO.subtitle,
  };

  const form: ContactFormConfig = {
    submitLabel: formCms?.buttonText || DEFAULT_CONTACT_FORM_CONFIG.submitLabel,
    successTitle: formCms?.title || DEFAULT_CONTACT_FORM_CONFIG.successTitle,
    successMessage:
      formCms?.content ||
      formCms?.subTitle ||
      DEFAULT_CONTACT_FORM_CONFIG.successMessage,
    privacyNote: DEFAULT_CONTACT_FORM_CONFIG.privacyNote,
  };

  const channels: ContactChannel[] = [];
  if (settingsCms?.email) {
    channels.push({
      type: "email",
      title: "Email",
      value: settingsCms.email,
      href: `mailto:${settingsCms.email}`,
    });
  }
  if (settingsCms?.phone && !isPlaceholderPhone(settingsCms.phone)) {
    channels.push({
      type: "phone",
      title: "Direct Line",
      value: settingsCms.phone,
      href: `tel:${settingsCms.phone}`,
    });
  }
  if (settingsCms?.address) {
    channels.push({
      type: "address",
      title: "Headquarters",
      value: settingsCms.address,
    });
  }

  return {
    seo: seo || undefined,
    hero,
    form,
    topics: DEFAULT_CONTACT_TOPICS,
    channels,
    faq: undefined,
    cta: undefined,
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
  const authCms = await fetchCms("auth-copy", ["cms", "auth"]);

  if (!authCms) {
    return DEFAULT_AUTH_COPY;
  }

  return {
    login: {
      title: authCms.title || DEFAULT_AUTH_COPY.login.title,
      subtitle: authCms.subTitle || DEFAULT_AUTH_COPY.login.subtitle,
      submitLabel: authCms.buttonText || DEFAULT_AUTH_COPY.login.submitLabel,
      signupPrompt: DEFAULT_AUTH_COPY.login.signupPrompt,
      signupLinkLabel: DEFAULT_AUTH_COPY.login.signupLinkLabel,
      forgotLabel: DEFAULT_AUTH_COPY.login.forgotLabel,
    },
    signup: {
      title: authCms.heading || DEFAULT_AUTH_COPY.signup.title,
      subtitle: authCms.description || DEFAULT_AUTH_COPY.signup.subtitle,
      submitLabel: authCms.buttonAction || DEFAULT_AUTH_COPY.signup.submitLabel,
      loginPrompt: DEFAULT_AUTH_COPY.signup.loginPrompt,
      loginLinkLabel: DEFAULT_AUTH_COPY.signup.loginLinkLabel,
      termsNote: DEFAULT_AUTH_COPY.signup.termsNote,
    },
    sidePanel: {
      title: authCms.description1 || DEFAULT_AUTH_COPY.sidePanel.title,
      subtitle: DEFAULT_AUTH_COPY.sidePanel.subtitle,
      bullets:
        authCms.tags && authCms.tags.length > 0
          ? authCms.tags
          : DEFAULT_AUTH_COPY.sidePanel.bullets,
    },
  };
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
  const [heroCms, availabilityCms, ctaCms, howItWorksCms, seo, categories] = await Promise.all([
    fetchCms("ai-hero", ["cms", "ai"]),
    fetchCms("ai-availability", ["cms", "ai"]),
    fetchCms("ai-cta", ["cms", "ai"]),
    fetchCms("ai-how-it-works", ["cms", "ai"]),
    fetchSeo("ai"),
    resolveFeatureCategories(),
  ]);
  const aiFeatures = categories.find((c) => c.slug === "ai-powered-tools")?.features || [];

  const base = { ...DEFAULT_AI_PAGE_DATA };

  const hero = {
    ...base.hero,
    title: heroCms?.title || base.hero.title,
    subtitle: heroCms?.subTitle || heroCms?.description || base.hero.subtitle,
    primaryCta: {
      ...base.hero.primaryCta,
      label: heroCms?.buttonText || base.hero.primaryCta.label,
    },
  };

  const availability = {
    ...base.availability,
    title: availabilityCms?.title || base.availability.title,
    description:
      availabilityCms?.description ||
      availabilityCms?.subTitle ||
      base.availability.description,
    cta: {
      ...base.availability.cta,
      label: availabilityCms?.buttonText || base.availability.cta.label,
      href: availabilityCms?.buttonAction || base.availability.cta.href,
    },
  };

  const cta = {
    ...base.cta,
    title: ctaCms?.title || base.cta.title,
    subtitle: ctaCms?.subTitle || ctaCms?.description || base.cta.subtitle,
    primaryCta: {
      ...base.cta.primaryCta,
      label: ctaCms?.buttonText || base.cta.primaryCta.label,
    },
  };

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

  return {
    ...base,
    hero,
    // Name, audience and summary of each tool from the admin catalog (by slug)
    tools: AI_TOOLS.map((tool) => {
      const feature = aiFeatures.find((f) => f.slug === tool.slug);
      return feature
        ? { ...tool, name: feature.title, audience: feature.audience || tool.audience, summary: feature.description || tool.summary }
        : tool;
    }),
    howItWorks,
    availability,
    faq: undefined, // Hidden until real FAQ items exist in backend
    cta,
    seo: seo || undefined,
  };
}

// ----------------------------------------------------------------------------
// Homepage Testimonials (Wall of Love + CtaSection floating cards)
// Endpoint: POST /api/home/testimonials
// Published backend testimonials win. Otherwise the local sample, loaded with a
// dynamic import ONLY when CMS_USE_FIXTURES === "true". Otherwise empty, and the
// sections hide.
// ----------------------------------------------------------------------------
interface BackendTestimonial {
  _id?: string;
  customerName?: string;
  customerProfession?: string;
  comment?: string;
  image?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export async function getHomeTestimonials(): Promise<HomeTestimonials> {
  const res = await fetchApi<{ status?: boolean; data?: BackendTestimonial[] }>(
    "/api/home/testimonials",
    {
      method: "POST",
      body: { slug: "" },
      tags: ["home", "testimonials"],
      revalidate: 300,
    }
  ).catch(() => null);

  const published = filterActiveDocuments(res?.data).filter(
    (t) => t.customerName?.trim() && t.comment?.trim()
  );

  if (published.length > 0) {
    const cards: TestimonialItem[] = published.map((t, idx) => ({
      id: t._id || `testimonial-${idx + 1}`,
      name: t.customerName!.trim(),
      role: t.customerProfession?.trim() || "",
      avatar: t.image || undefined,
      quote: t.comment!.trim(),
      placeholder: false,
    }));

    return {
      cards,
      cta: cards.map((c) => ({
        id: c.id,
        avatar: c.avatar,
        text: c.quote!,
        author: c.name,
        role: c.role || undefined,
      })),
      isSample: false,
    };
  }

  if (process.env.CMS_USE_FIXTURES === "true") {
    const sample = await import("@/content/home/sample-testimonials");
    return {
      cards: sample.SAMPLE_TESTIMONIAL_CARDS,
      cta: sample.SAMPLE_CTA_TESTIMONIALS,
      isSample: true,
    };
  }

  return { cards: [], cta: [], isSample: false };
}
