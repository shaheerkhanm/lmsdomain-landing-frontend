import type { Metadata } from "next";
import { Suspense } from "react";
import { getAboutPage, fetchSeo } from "@/lib/api/content";
import { AboutView } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("about").catch(() => null),
    getAboutPage().catch(() => null),
  ]);

  const rawTitle =
    seo?.metatitle ||
    (pageData?.hero?.title
      ? pageData.hero.title
      : "About Us & Our Story");
  const title = rawTitle.replace(/\s*\|\s*LMS Domain$/i, "");

  const description =
    seo?.metadescription ||
    pageData?.hero?.subtitle ||
    "Empowering education through innovation. Discover our mission, instructional philosophy, and learning architecture.";

  return {
    title,
    description,
    keywords: seo?.metakeyword || [
      "About LMS Domain",
      "Learning Management Mission",
      "Education Technology",
      "Academy Architecture",
    ],
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title,
      description,
      url: "/about",
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    ...(pageData?.isSample
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}

export default async function AboutPage() {
  const data = await getAboutPage();

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AboutView data={data} />
    </Suspense>
  );
}
