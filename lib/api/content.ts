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
  AboutValue,
  AboutLeadership,
  SeoMetadata,
  SiteSettings,
  PricingPageData,
  FeaturesPageData,
  AboutPageData,
  ContactPageData,
  LegalPageData,
} from "@/types/content";

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
export async function getPricingPage(): Promise<PricingPageData> {
  const [hero, footerCard, plansRes, faqsRes, seo] = await Promise.all([
    fetchCms("pricing-hero", ["cms", "pricing"]),
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

  return {
    hero: hero || undefined,
    plans: filterActiveDocuments(plansRes?.data),
    faqs: filterActiveDocuments(faqsRes?.data),
    footerCard: footerCard || undefined,
    seo: seo || undefined,
  };
}

// ----------------------------------------------------------------------------
// Features Page Content
// Endpoints: /api/cms (slugs: features-hero, features-content),
//            /api/features, /api/features/content
// ----------------------------------------------------------------------------
export async function getFeaturesPage(): Promise<FeaturesPageData> {
  const [hero, featuresRes, contentsRes, seo] = await Promise.all([
    fetchCms("features-hero", ["cms", "features"]),
    fetchApi<{ status?: boolean; data?: FeatureItem[] }>("/api/features", {
      method: "POST",
      tags: ["features"],
      revalidate: 300,
    }).catch(() => null),
    fetchApi<{ status?: boolean; data?: FeatureContent[] }>("/api/features/content", {
      method: "POST",
      tags: ["features", "features-content"],
      revalidate: 300,
    }).catch(() => null),
    fetchSeo("features"),
  ]);

  return {
    hero: hero || undefined,
    features: filterActiveDocuments(featuresRes?.data),
    contents: filterActiveDocuments(contentsRes?.data),
    seo: seo || undefined,
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
