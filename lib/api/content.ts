// ============================================================================
// Content Layer API Functions
// Interacts with backend API endpoints and returns typed content models
// Filters: isActive === true && isDeleted !== true
// ============================================================================

import { fetchApi } from "./client";
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
  ContactPageData,
  LegalPageData,
  AiPageData,
} from "@/types/content";
import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import { FEATURES_MEDIA, MediaSlot } from "@/content/features/media";
import { DEFAULT_AI_PAGE_DATA, AI_TOOLS } from "@/content/ai/page";
import {
  DEFAULT_PRICING_HERO,
  DEFAULT_PRICING_EMPTY_STATE,
} from "@/content/pricing/page";

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
  } catch (error) {
    console.warn(`[content] Failed to fetch CMS slug "${slug}":`, error);
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
  } catch (error) {
    console.warn(`[content] Failed to fetch SEO slug "${slug}":`, error);
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
  };
}

// ----------------------------------------------------------------------------
// Pricing Page Content
// Endpoints: /api/cms (slugs: pricing-hero, pricing-faq, pricing-footer-card),
//            /api/pricing, /api/pricing/faq
// ----------------------------------------------------------------------------
export async function getPricingPage(): Promise<PricingPageModel> {
  const [heroCms, emptyCms, footerCard, plansRes, faqsRes, seo] = await Promise.all([
    fetchCms("pricing-hero", ["cms", "pricing"]),
    fetchCms("pricing-empty", ["cms", "pricing"]),
    fetchCms("pricing-footer-card", ["cms", "pricing"]),
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

  const activePlans = filterActiveDocuments(plansRes?.data);
  const activeFaqs = filterActiveDocuments(faqsRes?.data);

  let isSample = false;
  let currencyCode = "";
  let currencySymbol = "";
  let yearlySavingsLabel: string | undefined = undefined;
  let mappedPlans: Plan[] = [];
  let comparison: PricingComparison | undefined = undefined;
  let addOns: { title: string; items: PricingAddOn[] } | undefined = undefined;
  let enterprise: PricingEnterprise | undefined = undefined;
  let faq = activeFaqs.length > 0 ? { items: activeFaqs } : undefined;

  if (activePlans.length > 0) {
    if (activePlans[0].currency) {
      currencyCode = activePlans[0].currency;
      currencySymbol = currencyCode === "USD" ? "$" : currencyCode === "INR" ? "₹" : currencyCode;
    }

    mappedPlans = activePlans.map((doc, idx) => {
      const isPopular = Boolean(doc.isPopular || /scale|popular/i.test(doc.title));
      const monthlyPrice = typeof doc.price === "number" ? doc.price : null;
      // Do not invent discount percentage or yearly price if backend doesn't have it
      const yearlyPrice = typeof doc.price_yearly === "number" ? doc.price_yearly : null;

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
        prices: {
          monthly: monthlyPrice,
          yearly: yearlyPrice,
        },
        priceSuffix: monthlyPrice !== null ? "/month" : "",
        priceNote: monthlyPrice === null ? doc.description || "Custom" : undefined,
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
    mappedPlans = sample.SAMPLE_PLANS;
    comparison = sample.SAMPLE_COMPARISON;
    addOns = { title: "Flexible Add-Ons", items: sample.SAMPLE_ADD_ONS };
    enterprise = sample.SAMPLE_ENTERPRISE;
    faq = sample.SAMPLE_FAQ;
    currencyCode = "USD";
    currencySymbol = "$";
    yearlySavingsLabel = "Sample: 2 months free";
    isSample = true;
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
      periods: [
        { id: "monthly", label: "Monthly" },
        { id: "yearly", label: "Yearly", note: yearlySavingsLabel },
      ],
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
export async function resolveFeatureCategories(): Promise<FeatureCategory[]> {
  // Production source of truth until backend adds category and isPremium fields
  return FEATURE_CATEGORIES;
}

export async function getFeaturesPage(): Promise<FeaturesPageData> {
  const [hero, closingCta, faqsRes, seo, categories, mediaCms] = await Promise.all([
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
export async function getAboutPage(): Promise<AboutPageData> {
  const [hero, mission, valuesRes, story, leadershipRes, seo] = await Promise.all([
    fetchCms("about-hero", ["cms", "about"]),
    fetchCms("about-mission", ["cms", "about"]),
    fetchApi<{ status?: boolean; data?: AboutValue[] }>("/api/about/values", {
      method: "POST",
      tags: ["about", "about-values"],
      revalidate: 300,
    }).catch(() => null),
    fetchCms("about-story", ["cms", "about"]),
    fetchApi<{ status?: boolean; data?: AboutLeadership[] }>("/api/about/leadership", {
      method: "POST",
      tags: ["about", "about-leadership"],
      revalidate: 300,
    }).catch(() => null),
    fetchSeo("about"),
  ]);

  return {
    hero: hero || undefined,
    mission: mission || undefined,
    values: filterActiveDocuments(valuesRes?.data),
    story: story || undefined,
    leadership: filterActiveDocuments(leadershipRes?.data),
    seo: seo || undefined,
  };
}

// ----------------------------------------------------------------------------
// Contact Page Content
// Endpoints: /api/cms (slugs: contact-hero, address), /api/seo
// ----------------------------------------------------------------------------
export async function getContactPage(): Promise<ContactPageData> {
  const [hero, settings, seo] = await Promise.all([
    fetchCms("contact-hero", ["cms", "contact"]),
    fetchCms("address", ["cms", "settings"]),
    fetchSeo("contact"),
  ]);

  return {
    hero: hero || undefined,
    settings: settings || undefined,
    seo: seo || undefined,
  };
}

// ----------------------------------------------------------------------------
// Legal Pages Content & Stubs
// ----------------------------------------------------------------------------
export async function getLegalPage(slug: string): Promise<LegalPageData> {
  const seo = await fetchSeo(slug);
  const titleMap: Record<string, string> = {
    "privacy-policy": "Privacy Policy",
    terms: "Terms of Service",
    "refund-policy": "Refund & Cancellation Policy",
    dpa: "Data Processing Agreement (DPA)",
  };

  return {
    slug,
    title: titleMap[slug] || "Legal",
    seo: seo || undefined,
  };
}

export async function getLegalPages(): Promise<string[]> {
  return ["privacy-policy", "terms", "refund-policy", "dpa"];
}

// ----------------------------------------------------------------------------
// Auth Pages Copy & Home Stub
// ----------------------------------------------------------------------------
export async function getAuthCopy() {
  return {
    loginTitle: "Log in to your LMS",
    signupTitle: "Create your LMS account",
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
  const [heroCms, availabilityCms, ctaCms, howItWorksCms, seo] = await Promise.all([
    fetchCms("ai-hero", ["cms", "ai"]),
    fetchCms("ai-availability", ["cms", "ai"]),
    fetchCms("ai-cta", ["cms", "ai"]),
    fetchCms("ai-how-it-works", ["cms", "ai"]),
    fetchSeo("ai"),
  ]);

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
    tools: AI_TOOLS,
    howItWorks,
    availability,
    faq: undefined, // Hidden until real FAQ items exist in backend
    cta,
    seo: seo || undefined,
  };
}
