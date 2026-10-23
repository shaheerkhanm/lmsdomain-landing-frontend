import { HomePage } from "@/components/modules/HomePage";
import { fetchSeo } from "@/lib/api/content";
import { Metadata } from "next";
import { SITE_NAME, getMetadataBase, applySeo } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(), await fetchSeo("home").catch(() => null));
}

async function baseMetadata(): Promise<Metadata> {
  const seo = await fetchSeo("home").catch(() => null);

  // Same title as before the multipage work: CMS metatitle, else "LMS Domain"
  const title = seo?.metatitle || SITE_NAME;
  const description =
    seo?.metadescription ||
    "Scale your academy with courses, live classes, assessments, payments, and Domie AI tutor in one flexible learning platform.";

  return {
    metadataBase: getMetadataBase(),
    title,
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
