import { HomePage } from "@/components/modules/HomePage";
import { fetchSeo } from "@/lib/api/content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeo("home").catch(() => null);

  const title =
    seo?.metatitle || "LMS Domain | Modern AI-Powered Learning Platform";
  const description =
    seo?.metadescription ||
    "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: seo?.metakeyword || [
      "LMS Domain",
      "AI LMS",
      "Online Academy Platform",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
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

export default function Home() {
  return (
    <HomePage />
  );
}
