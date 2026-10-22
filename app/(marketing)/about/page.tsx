import type { Metadata } from "next";
import { Suspense } from "react";
import { getAboutPage, fetchSeo } from "@/lib/api/content";
import { AboutView } from "@/components/marketing";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, pageData] = await Promise.all([
    fetchSeo("about").catch(() => null),
    getAboutPage().catch(() => null),
  ]);

  const title =
    seo?.metatitle ||
    (pageData?.hero?.title
      ? `${pageData.hero.title} | LMS Domain`
      : "About Us | LMS Domain");

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
