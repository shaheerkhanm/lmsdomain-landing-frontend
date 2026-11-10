import type { Metadata } from "next";
import { getContactPage, getSiteContact, fetchSeo } from "@/lib/api/content";
import { ContactView } from "@/components/marketing";
import { fullTitle, getMetadataBase, applySeo, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";

const DEFAULT_TITLE = "Contact Us: Sales, Onboarding & Support | LMS Domain";
const DEFAULT_DESCRIPTION =
  "Speak with the LMS Domain team in India for sales inquiries, academy onboarding, technical support, migration assistance, or platform walkthroughs.";

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
    (seo?.metatitle && seo.metatitle.length >= 40)
      ? seo.metatitle
      : DEFAULT_TITLE;
  const title = fullTitle(rawTitle);

  const description =
    (seo?.metadescription && seo.metadescription.length >= 100)
      ? seo.metadescription
      : DEFAULT_DESCRIPTION;

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
      <ContactView data={data} />
    </>
  );
}
