import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalPages, fetchSeo } from "@/lib/api/content";
import { LegalView } from "@/components/marketing/LegalView";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";

interface LegalPageProps {
  params: Promise<{
    legal: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getLegalPages();
  return slugs.map((legal) => ({ legal }));
}

export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
  const { legal } = await props.params;
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(props), await fetchSeo(legal).catch(() => null), { page: legal });
}

async function baseMetadata({
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
  const title = fullTitle(rawTitle);
  const description =
    page.seo?.metadescription || `Official ${page.title} documentation for LMS Domain.`;

  return {
    metadataBase: getMetadataBase(),
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
