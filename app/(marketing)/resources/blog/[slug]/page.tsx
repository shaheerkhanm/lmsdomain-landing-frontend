import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { fullTitle, getMetadataBase, getSiteUrl, PRODUCTION_ORIGIN } from "@/lib/site";
import { ArrowLeft, ArrowRight, Clock, Calendar, List } from "lucide-react";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { BlogCard, BlogCover, DraftNotice, fmtDate, metaFor } from "@/components/sections/BlogV5/BlogParts";
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

  const m = metaFor(post.slug);
  const more = Object.values(BLOG_POSTS).filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLdScript data={articleJsonLd} />
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
        {/* Header */}
        <header className="bg-white pt-[120px] min-[900px]:pt-[150px]">
          <div className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)]">
            <div className="v5-rise flex flex-wrap items-center gap-3">
              <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#52525B] hover:text-[#0A0A0B]">
                <ArrowLeft className="h-4 w-4" /> All guides
              </Link>
              <span className="text-[#D4D4D8]">/</span>
              <span className="rounded-full px-3 py-1 text-[12.5px] font-semibold" style={{ background: m.tone, color: m.ink }}>
                {m.category}
              </span>
              <DraftNotice />
            </div>
            <h1
              style={{ "--d": "80ms" } as React.CSSProperties}
              className="v5-rise mt-7 font-urbanist text-[clamp(36px,5.4vw,64px)] font-semibold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]"
            >
              {post.title}
            </h1>
            <p style={{ "--d": "160ms" } as React.CSSProperties} className="v5-rise mt-5 text-[19px] leading-[1.6] text-[#52525B] [text-wrap:pretty]">
              {post.subtitle}
            </p>
            <div style={{ "--d": "220ms" } as React.CSSProperties} className="v5-rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[#ECECF1] py-4 text-[14px] text-[#52525B]">
              <span className="inline-flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0A0A0B] text-[11px] font-bold text-white">LD</span>
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {fmtDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readingTime}
              </span>
            </div>
          </div>
          <div style={{ "--d": "300ms" } as React.CSSProperties} className="v5-rise mx-auto mt-10 max-w-[1200px] px-[clamp(16px,4vw,40px)]">
            <div className="overflow-hidden rounded-[32px]">
              <BlogCover slug={post.slug} big />
            </div>
          </div>
        </header>

        {/* Body with sticky contents */}
        <div className="mx-auto grid max-w-[1200px] gap-12 px-[clamp(16px,4vw,40px)] pt-14 lg:grid-cols-[240px_1fr] lg:gap-16 lg:pt-20">
          {post.toc && post.toc.length > 0 && (
            <aside className="lg:sticky lg:top-[110px] lg:self-start">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-[#0A0A0B]">
                <List className="h-4 w-4" /> On this page
              </p>
              <nav className="mt-4 border-l border-[#ECECF1]">
                <ol className="space-y-1">
                  {post.toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-[1.4] text-[#71717A] transition-colors hover:border-[#0A0A0B] hover:text-[#0A0A0B]">
                        {item.title.replace(/^\d+\.\s*/, "")}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="mt-8 hidden rounded-[20px] bg-[#F4F5F8] p-5 lg:block">
                <p className="font-urbanist text-[17px] font-semibold leading-[1.25]">See it running with your courses</p>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-[#71717A]">A free 20-minute demo.</p>
                <Link href="/demo" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#27272A]">
                  Book a demo <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          )}

          <article className="min-w-0 max-w-[720px]">
            <div className="v5-article" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <div id="faqs" className="scroll-mt-28 pt-12">
            <FAQ items={post.faqs} minimal eyebrow="FAQs" title="Questions about this guide" subtitle="Quick answers to what readers ask most." />
          </div>
        )}

        {more.length > 0 && (
          <section className="bg-white pt-[clamp(48px,6vw,80px)]">
            <div className="mx-auto max-w-[1200px] px-[clamp(16px,4vw,40px)]">
              <p className="font-urbanist text-[clamp(30px,3.6vw,44px)] font-semibold tracking-[-0.04em]">Keep reading</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {more.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="pt-[clamp(72px,9vw,120px)]">
          <FinalCta />
        </div>
        <ScrollReveal />
      </div>
    </>
  );
}
