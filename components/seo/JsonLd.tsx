import React from "react";
import { entity } from "@/content/entity";
import { DEFAULT_PRICING_V2, type PricingV2Data } from "@/config/pricing";

const CANONICAL_ORIGIN = entity.facts.website || "https://lmsdomain.com";

function getOrigin(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (!envUrl) return CANONICAL_ORIGIN;
  try {
    return new URL(envUrl).origin;
  } catch {
    return CANONICAL_ORIGIN;
  }
}

export function getOrganizationJsonLd() {
  const origin = getOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: entity.facts.product,
    legalName: entity.facts.legalName,
    url: origin,
    logo: `${origin}/brand/logo-wordmark.png`,
    foundingDate: entity.facts.foundingDate,
    founders: entity.facts.founders.map((name) => ({
      "@type": "Person",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: entity.facts.address.streetAddress,
      addressLocality: entity.facts.address.addressLocality,
      addressRegion: entity.facts.address.addressRegion,
      postalCode: entity.facts.address.postalCode,
      addressCountry: entity.facts.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: entity.facts.supportEmail,
      contactType: "customer support",
    },
    // TODO: Shaheer to supply social profile URLs (LinkedIn, YouTube, Instagram, X)
    sameAs: [],
  };
}

export function getWebSiteJsonLd() {
  const origin = getOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: origin,
    name: entity.facts.product,
    description: entity.oneLine,
  };
}

export function getPricingAggregateOffers(
  pricingV2?: PricingV2Data,
  urlPath: string = "/pricing"
) {
  const data = pricingV2 || DEFAULT_PRICING_V2;
  const origin = getOrigin();
  const starter = data.plans.find((p) => p.slug === "starter");
  const pro = data.plans.find((p) => p.slug === "pro");

  const lowInr = starter?.priceMonthly?.INR ?? 3999;
  const highInr = pro?.priceMonthly?.INR ?? 14999;
  const lowUsd = starter?.priceMonthly?.USD ?? 49;
  const highUsd = pro?.priceMonthly?.USD ?? 199;

  return [
    {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: lowInr,
      highPrice: highInr,
      offerCount: data.plans.filter((p) => p.priceMonthly?.INR !== null).length,
      url: `${origin}${urlPath}`,
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: lowUsd,
      highPrice: highUsd,
      offerCount: data.plans.filter((p) => p.priceMonthly?.USD !== null).length,
      url: `${origin}${urlPath}`,
      availability: "https://schema.org/InStock",
    },
  ];
}

export function getSoftwareApplicationJsonLd(
  pricingV2?: PricingV2Data,
  urlPath: string = ""
) {
  const origin = getOrigin();
  const offers = getPricingAggregateOffers(pricingV2, urlPath || "/pricing");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: entity.facts.product,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: urlPath ? `${origin}${urlPath}` : origin,
    offers,
  };
}

export function getBreadcrumbListJsonLd(
  items: { name: string; path: string }[]
) {
  const origin = getOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export function JsonLdScript({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

