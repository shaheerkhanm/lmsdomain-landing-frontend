import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalPages, fetchSeo } from "@/lib/api/content";
import { LegalView } from "@/components/marketing/LegalView";
import { fullTitle, getMetadataBase, applySeo } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";

interface LegalPageProps {
  params: Promise<{
    legal: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getLegalPages();
  return slugs.filter((slug) => slug !== "dpa").map((legal) => ({ legal }));
}

export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
  const { legal } = await props.params;
  if (legal === "dpa") {
    return { title: "Page Not Found | LMS Domain", robots: { index: false, follow: false } };
  }
  const hiddenMeta = await guardMetadata(legal);
  if (hiddenMeta) return hiddenMeta;
  // Share image and noindex from Admin > SEO
  return applySeo(await baseMetadata(props), await fetchSeo(legal).catch(() => null), { page: legal });
}

const LEGAL_SEO: Record<string, { title: string; description: string }> = {
  "privacy-policy": {
    title: "Privacy Policy & Data Protection Terms | LMS Domain",
    description:
      "Official privacy policy for LMS Domain. Learn how we collect, protect, and handle academy and student personal data under Indian and international privacy laws.",
  },
  terms: {
    title: "Terms of Service & Customer Agreement | LMS Domain",
    description:
      "Official Terms of Service and master customer agreement for LMS Domain. Read our software subscription terms, acceptable use policies, and billing terms.",
  },
  "refund-policy": {
    title: "Subscription Refund Policy & Guarantees | LMS Domain",
    description:
      "Official subscription refund and cancellation policy for LMS Domain. Understand trial periods, billing cycles, cancellation terms, and refund eligibility.",
  },
};

async function baseMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { legal } = await params;
  if (legal === "dpa") {
    return { title: "Page Not Found | LMS Domain", robots: { index: false, follow: false } };
  }
  const page = await getLegalPage(legal);

  if (!page || !page.body) {
    return {
      title: "Page Not Found | LMS Domain",
      robots: { index: false, follow: false },
    };
  }

  const fallback = LEGAL_SEO[legal];
  const rawTitle = (page.seo?.metatitle && page.seo.metatitle.length >= 40)
    ? page.seo.metatitle
    : fallback?.title || fullTitle(page.title);
  const title = fullTitle(rawTitle);
  const description = (page.seo?.metadescription && page.seo.metadescription.length >= 100)
    ? page.seo.metadescription
    : fallback?.description || `Official ${page.title} documentation for LMS Domain.`;

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
  if (legal === "dpa") {
    notFound();
  }
  await guardPage(legal);
  const page = await getLegalPage(legal);

  if (!page || !page.body) {
    notFound();
  }

  return <LegalView page={page} />;
}
