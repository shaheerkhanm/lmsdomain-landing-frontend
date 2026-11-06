import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Blog"),
  description: "Practical guides, teaching insights, and operational playbooks for scaling modern online academies.",
  alternates: { canonical: "/resources/blog" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogIndexRoute() {
  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">RESOURCES & INSIGHTS</Eyebrow>

          {/* Single H1 on page */}
          <h1 className="type-h1 text-[#161616] tracking-tight mt-4">
            Blog — coming soon
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            Practical guides, curriculum strategies, and operational playbooks for running
            profitable, high-retention academies on your own domain.
          </p>
        </div>
      </section>

      {/* 2. Empty State */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#EAE8E2] p-10 sm:p-16 text-center shadow-xs">
          <div className="size-14 rounded-2xl bg-[#F3F0FF] text-[#7B5CF5] flex items-center justify-center mx-auto mb-5">
            <BookOpen className="size-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] mb-3">
            Articles in preparation
          </h2>

          <p className="type-body text-[#6B6F76] max-w-lg mx-auto mb-8">
            {/* TODO(content): No published blog posts yet. Excluded from sitemap until posts are published. */}
            We are writing deep dives on cohort batch structures, IELTS/PTE preparation
            blueprints, and multi-currency payment setups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/platform"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#161616] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2A2A2A] transition-colors"
            >
              <span>Explore the platform</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D2CA] bg-white px-6 py-3 text-sm font-semibold text-[#161616] hover:bg-[#FAF9F6] transition-colors"
            >
              <span>Book a demo</span>
            </Link>
          </div>
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
