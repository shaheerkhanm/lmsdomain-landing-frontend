import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { fullTitle, getMetadataBase, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { ArrowLeft, Clock, Calendar, User, AlertTriangle, List } from "lucide-react";
import { BLOG_POSTS } from "@/content/blog/posts";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) {
    return { title: "Article Not Found | LMS Domain", robots: { index: false, follow: false } };
  }

  return {
    metadataBase: getMetadataBase(),
    title: fullTitle(post.metaTitle),
    description: post.metaDescription,
    alternates: { canonical: `/resources/blog/${slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function BlogPostTemplatePage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) {
    notFound();
  }

  const siteOrigin = getSiteUrl() || PRODUCTION_ORIGIN;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "LMS Domain",
      url: siteOrigin,
    },
    datePublished: post.date,
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/resources/blog" },
    { name: post.title, path: `/resources/blog/${slug}` },
  ];

  return (
    <>
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
        {/* Draft Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-amber-900 flex items-center justify-center gap-2">
          <AlertTriangle className="size-4 text-amber-600 shrink-0" />
          <span>Draft, not public — Internal preview under editorial review. Excluded from search indexing.</span>
        </div>

        <article className="pt-[130px] sm:pt-[150px] pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5CF5] hover:text-[#6842ED] mb-8"
          >
            <ArrowLeft className="size-4" />
            <span>Back to all guides</span>
          </Link>

          <header className="mb-10 sm:mb-12">
            <Eyebrow tone="violet">PRACTICAL GUIDE</Eyebrow>
            <h1 className="type-h1 text-[#161616] tracking-tight mt-4 mb-5">
              {post.title}
            </h1>
            <p className="type-body text-[#6B6F76] text-lg sm:text-xl leading-relaxed mb-6">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B6F76] border-y border-[#EAE8E2] py-4">
              <span className="inline-flex items-center gap-1.5">
                <User className="size-4 text-[#7B5CF5]" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-[#7B5CF5]" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-[#7B5CF5]" /> {post.readingTime}
              </span>
            </div>
          </header>

          {/* Table of Contents */}
          {post.toc && post.toc.length > 0 && (
            <aside className="rounded-2xl bg-white border border-[#EAE8E2] p-6 sm:p-8 mb-12 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#161616] mb-4">
                <List className="size-4 text-[#7B5CF5]" />
                <span>Table of contents</span>
              </div>
              <nav>
                <ol className="space-y-2.5 text-sm sm:text-base">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-[#6B6F76] hover:text-[#7B5CF5] hover:underline underline-offset-2 transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          {/* Rich Content */}
          <div
            className="prose prose-lg max-w-none text-[#161616] prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[#161616] prose-p:text-[#6B6F76] prose-p:leading-relaxed prose-li:text-[#6B6F76] prose-a:text-[#7B5CF5] prose-a:underline hover:prose-a:text-[#6842ED]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div id="faqs" className="mt-16 pt-12 border-t border-[#EAE8E2]">
              <FAQ
                items={post.faqs}
                title="Frequently asked questions"
                subtitle="Key questions about this guide and platform implementation."
                eyebrow="GUIDE FAQS"
                className="py-0"
              />
            </div>
          )}
        </article>

        <CTABand
          title="See your academy running on LMS Domain."
          subtitle="Book a 20-minute demo. We'll show you how courses, batches, and checkouts operate together."
          buttonText="Book a demo"
          tone="dark"
        />
      </div>
    </>
  );
}
