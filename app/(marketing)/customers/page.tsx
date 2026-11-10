import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { customersPageData } from "@/content/customers";
import { getHomeClients } from "@/lib/api/content";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { Sparkles, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Customer Stories & Academy Case Studies | LMS Domain",
  description:
    "See how test prep academies, language institutes, and professional training companies across India run live batches and scale on LMS Domain platform.",
  alternates: { canonical: "/customers" },
};

export default async function CustomersRoute() {
  const clientsData = await getHomeClients().catch(() => null);
  // Same filter as homepage: exclude unapproved placeholder client names
  const validLogos = (clientsData?.logos || []).filter((l) => {
    if (!l || !l.logo) return false;
    const name = (l.name || "").toLowerCase();
    return !/^client\s*-?\s*\d+/i.test(name);
  });

  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">{customersPageData.eyebrow}</Eyebrow>

          {/* Single H1 on the page */}
          <h1 className="type-h1 text-[#161616] max-w-4xl tracking-tight mt-4">
            {customersPageData.title}
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            {customersPageData.subtitle}
          </p>

          {/* Approved Metrics Line */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EAE8E2] text-xs sm:text-sm font-semibold text-[#161616] shadow-2xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{customersPageData.metricsLine}</span>
          </div>
        </div>
      </section>

      {/* 2. Customer Logo Wall */}
      <section className="py-12 sm:py-16 border-y border-[#EAE8E2] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.1em] text-[#7B5CF5]">
              ACADEMY PARTNERS
            </p>
          </div>

          {validLogos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {validLogos.map((client, idx) => (
                <div
                  key={client.id || idx}
                  className="rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-8 flex flex-col items-center justify-center text-center shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
                >
                  <div className="relative h-12 w-full max-w-[180px] flex items-center justify-center mb-4">
                    <Image
                      src={client.logo!}
                      alt={client.name || "Academy customer"}
                      width={180}
                      height={48}
                      className="h-full w-auto object-contain max-h-12"
                    />
                  </div>
                  {client.name && (
                    <span className="text-sm font-bold text-[#161616]">
                      {client.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-[#8F94A0]">
              {/* TODO(content): client logos loaded from CMS */}
              <span>Academy partner logos will appear here as they are published.</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Case Studies Note Card */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#EAE8E2] p-8 sm:p-12 text-center shadow-xs">
          <div className="size-12 rounded-2xl bg-[#F3F0FF] text-[#7B5CF5] flex items-center justify-center mx-auto mb-4">
            <FileText className="size-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#161616] mb-2">
            In-depth case studies coming soon
          </h2>
          <p className="type-body text-[#6B6F76] max-w-xl mx-auto">
            {customersPageData.caseStudiesNote} We are documenting batch schedules,
            exam pass rates, and transition journeys with our partner academies.
          </p>
          <div className="mt-6">
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7B5CF5] hover:text-[#6842ED] transition-colors"
            >
              <span>Speak with our academy team to hear live customer stories</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CTABand */}
      <CTABand
        title={customersPageData.ctaTitle}
        subtitle={customersPageData.ctaSubtitle}
        buttonText={customersPageData.ctaButtonText}
        tone="dark"
      />
    </div>
  );
}
