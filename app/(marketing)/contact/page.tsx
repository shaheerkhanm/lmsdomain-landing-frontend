import type { Metadata } from "next";
import { Suspense } from "react";
import { getContactPage, getSiteContact, fetchSeo } from "@/lib/api/content";
import { ContactView } from "@/components/marketing";
import { fullTitle, getMetadataBase, applySeo, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("contact");
  if (hiddenMeta) return hiddenMeta;
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("contact").catch(() => null), { page: "contact" });
}

async function baseMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("contact").catch(() => null),
    getContactPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    (pageData?.hero?.title
      ? pageData.hero.title
      : "Contact & Platform Demonstration");
  const title = fullTitle(rawTitle);

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Schedule a live platform walkthrough, discuss custom enterprise deployments, or evaluate pedagogy workflows tailored to your academy.";

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    keywords: seo?.metakeyword || [
      "Contact LMS Domain",
      "Request LMS Demo",
      "Learning Management Walkthrough",
      "Enterprise Academy Consultation",
    ],
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title,
      description,
      url: "/contact",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  await guardPage("contact");
  const [data, siteContact] = await Promise.all([
    getContactPage(),
    getSiteContact(),
  ]);
  const siteOrigin = getSiteUrl() || PRODUCTION_ORIGIN;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LMS Domain",
    url: siteOrigin,
    telephone: siteContact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContact.addressLines.join(", "),
      addressLocality: siteContact.city,
      postalCode: siteContact.postalCode,
      addressCountry: siteContact.country,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <ContactView data={data} />
      </Suspense>
    </>
  );
}
