import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { FAQ } from "@/components/marketing/ui/FAQ";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { ArrowLeft, Check, AlertTriangle, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { COMPARE_PAGES } from "@/content/compare/data";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPARE_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = COMPARE_PAGES[slug];
  if (!page) {
    return { title: "Comparison Not Found | LMS Domain", robots: { index: false, follow: false } };
  }

  return {
    metadataBase: getMetadataBase(),
    title: fullTitle(page.metaTitle),
    description: page.metaDescription,
    alternates: { canonical: `/compare/${slug}` },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ComparePageRoute({ params }: ComparePageProps) {
  const { slug } = await params;
  const page = COMPARE_PAGES[slug];
  if (!page) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Compare", path: `/compare/${slug}` },
    { name: page.competitorName, path: `/compare/${slug}` },
  ];

  return (
    <>
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />

      <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
        {/* Draft Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs sm:text-sm font-semibold text-amber-900 flex items-center justify-center gap-2">
          <AlertTriangle className="size-4 text-amber-600 shrink-0" />
          <span>Draft, not public — Internal comparison preview under editorial review. Excluded from search indexing.</span>
        </div>

        {/* 1. Hero */}
        <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
            <Eyebrow tone="violet">PLATFORM COMPARISON</Eyebrow>

            <h1 className="type-h1 text-[#161616] tracking-tight mt-4 max-w-3xl">
              {page.title}
            </h1>

            <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed text-base sm:text-lg">
              {page.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full bg-[#161616] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:bg-[#2A2A2A] transition-colors"
              >
                Book a live demo
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-[#D5D2CA] bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-[#161616] hover:bg-[#FAF9F6] transition-colors"
              >
                View plans &amp; pricing
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Who LMS Domain Suits Best */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white border border-[#EAE8E2] p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7B5CF5]">
                Target Use Case
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#161616] tracking-tight mt-1 mb-3">
                {page.whoSuitsBetter.heading}
              </h2>
              <p className="type-body text-[#6B6F76]">
                {page.whoSuitsBetter.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.whoSuitsBetter.points.map((point, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#FAF9F6] border border-[#EAE8E2] p-5 flex items-start gap-3.5"
                >
                  <div className="size-6 rounded-full bg-[#EEE9FF] text-[#7B5CF5] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm sm:text-base text-[#161616] font-medium leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Core LMS Domain Strengths */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-[#EAE8E2]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Eyebrow tone="emerald">CORE CAPABILITIES</Eyebrow>
            <h2 className="type-h2 text-[#161616] mt-3">
              Why education businesses choose LMS Domain
            </h2>
            <p className="type-body text-[#6B6F76] mt-3">
              Built specifically for the day-to-day operational realities of Indian coaching academies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {page.lmsDomainStrengths.map((strength, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#161616] tracking-tight mb-2">
                    {strength.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6B6F76] leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FAQs */}
        {page.faqs && page.faqs.length > 0 && (
          <section className="bg-white border-t border-[#EAE8E2]">
            <FAQ
              items={page.faqs}
              title="Frequently asked questions"
              subtitle={`Common questions when evaluating ${page.competitorName} and LMS Domain.`}
              eyebrow="COMPARISON FAQS"
              className="py-16 sm:py-20"
            />
          </section>
        )}

        {/* 5. CTABand */}
        <CTABand
          title="See your academy running on LMS Domain."
          subtitle="Book a 20-minute demo. We'll show you how batch rosters, Zoom classes, and timed mock tests operate on your custom domain."
          buttonText="Book a demo"
          tone="dark"
        />
      </div>
    </>
  );
}
