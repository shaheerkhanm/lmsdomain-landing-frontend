import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalPages } from "@/lib/api/content";
import { LegalView } from "@/components/marketing/LegalView";

interface LegalPageProps {
  params: Promise<{
    legal: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getLegalPages();
  return slugs.map((legal) => ({ legal }));
}

export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { legal } = await params;
  const page = await getLegalPage(legal);

  if (!page || !page.body) {
    return {
      title: "Page Not Found | LMS Domain",
      robots: { index: false, follow: false },
    };
  }

  const rawTitle = page.seo?.metatitle || page.title;
  const title = rawTitle.replace(/\s*\|\s*LMS Domain$/i, "");
  const description =
    page.seo?.metadescription || `Official ${page.title} documentation for LMS Domain.`;

  return {
    title,
    description,
    keywords: page.seo?.metakeyword?.join(", "),
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/${page.slug}`,
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

export default async function LegalPage({ params }: LegalPageProps) {
  const { legal } = await params;
  const page = await getLegalPage(legal);

  if (!page || !page.body) {
    notFound();
  }

  return <LegalView page={page} />;
}
