import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { fullTitle, getMetadataBase, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = fullTitle(slug.replace(/[-_]+/g, " ").replace(/^./, (c) => c.toUpperCase()) + " | Blog");
  return {
    metadataBase: getMetadataBase(),
    title,
    description: "Insights and strategies for running modern academies on your own domain.",
    alternates: { canonical: `/resources/blog/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPostTemplatePage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const siteOrigin = getSiteUrl() || PRODUCTION_ORIGIN;

  // TODO(content): Wire to MDX / CMS blog post store when posts are written
  const title = slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: "Academy strategies, curriculum design, and operational workflows.",
    author: {
      "@type": "Organization",
      name: "LMS Domain Team",
    },
    publisher: {
      "@type": "Organization",
      name: "LMS Domain",
      url: siteOrigin,
    },
    datePublished: "2026-11-06",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
        <article className="pt-[130px] sm:pt-[150px] pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] hover:text-[#6842ED] mb-8"
          >
            <ArrowLeft className="size-4" />
            <span>Back to blog index</span>
          </Link>

          <header className="mb-10">
            <Eyebrow tone="violet">ACADEMY PLAYBOOK</Eyebrow>
            <h1 className="type-h1 text-[#161616] mt-4 mb-4 tracking-tight">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B6F76] border-y border-[#EAE8E2] py-3 mt-6">
              <span className="flex items-center gap-1.5">
                <User className="size-4 text-[#7B5CF5]" />
                <span>LMS Domain Team</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-[#7B5CF5]" />
                <span>November 2026</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4 text-[#7B5CF5]" />
                <span>5 min read</span>
              </span>
            </div>
          </header>

          <div className="prose prose-slate max-w-none text-[#6B6F76] leading-relaxed">
            {/* TODO(content): Blog article template ready for published MDX/CMS posts */}
            <p className="text-lg leading-relaxed text-[#161616] font-medium">
              This post is currently in preparation. Our editorial team is finalizing benchmarks
              and practical steps.
            </p>
            <p>
              Check back soon or explore our platform documentation to learn how academies run
              morning and evening batches, configure automated attendance, and accept payments.
            </p>
          </div>
        </article>

        <CTABand
          title="See LMS Domain in action"
          subtitle="Book a 20-minute live demo. We'll show you how academies organize courses and batches."
          buttonText="Book a demo"
          tone="dark"
        />
      </div>
    </>
  );
}

