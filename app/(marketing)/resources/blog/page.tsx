import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { BookOpen, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { BLOG_POSTS } from "@/content/blog/posts";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Blog & Guides"),
  description:
    "Practical guides, operational blueprints, and strategy playbooks for running successful online academies and coaching institutes in India.",
  alternates: { canonical: "/resources/blog" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BlogIndexRoute() {
  const posts = Object.values(BLOG_POSTS);

  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* Draft Review Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-amber-900 flex items-center justify-center gap-2">
        <AlertTriangle className="size-4 text-amber-600 shrink-0" />
        <span>Draft, not public — Internal preview under editorial review. Excluded from search indexing.</span>
      </div>

      {/* 1. Hero */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">RESOURCES & GUIDES</Eyebrow>

          <h1 className="type-h1 text-[#161616] tracking-tight mt-4">
            Academy guides &amp; operational blueprints
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            Practical strategies, curriculum design principles, and compliance guides for running profitable, high-retention coaching institutes and training businesses in India.
          </p>
        </div>
      </section>

      {/* 2. Blog Posts Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/blog/${post.slug}`}
              className="group rounded-3xl bg-white border border-[#EAE8E2] p-6 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7B5CF5] mb-3">
                  <Clock className="size-3.5" />
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-[#161616] tracking-tight group-hover:text-[#6842ED] transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[#6B6F76] leading-relaxed line-clamp-3">
                  {post.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2EFE9] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#161616] group-hover:text-[#6842ED] transition-colors">
                <span>Read guide</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CTABand */}
      <CTABand
        title="Ready to see the platform in action?"
        subtitle="Book a 20-minute demo. We'll show you how courses, batches, and checkouts work."
        buttonText="Book a demo"
        tone="dark"
      />
    </div>
  );
}
