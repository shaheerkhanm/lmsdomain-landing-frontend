import type { Metadata } from "next";
import { Suspense } from "react";
import { getContactPage, fetchSeo } from "@/lib/api/content";
import { ContactView } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("contact").catch(() => null),
    getContactPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    (pageData?.hero?.title
      ? pageData.hero.title
      : "Contact & Platform Demonstration");
  const title = rawTitle.replace(/\s*\|\s*LMS Domain$/i, "");

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Schedule a live platform walkthrough, discuss custom enterprise deployments, or evaluate pedagogy workflows tailored to your academy.";

  return {
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
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ContactPage() {
  const data = await getContactPage();

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ContactView data={data} />
    </Suspense>
  );
}
