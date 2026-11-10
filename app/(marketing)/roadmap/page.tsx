import type { Metadata } from "next";
import { Eyebrow, CTABand } from "@/components/marketing/ui";
import { roadmapPageData, RoadmapItem } from "@/content/roadmap";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { Sparkles, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Product Roadmap & Confirmed LMS Features | LMS Domain",
  description:
    "Track LMS Domain upcoming features, live batch management enhancements, assessment engine releases, and newly confirmed learning platform capabilities.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapRoute() {
  return (
    <div className="relative font-urbanist bg-[#FAF9F6] selection:bg-[#161616] selection:text-white">
      {/* 1. Hero & Outcome H1 */}
      <section className="relative pt-[130px] sm:pt-[150px] pb-12 sm:pb-16 overflow-x-clip bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <Eyebrow tone="violet">{roadmapPageData.eyebrow}</Eyebrow>

          {/* Single H1 on the page */}
          <h1 className="type-h1 text-[#161616] max-w-4xl tracking-tight mt-4">
            {roadmapPageData.title}
          </h1>

          <p className="type-body text-[#6B6F76] mt-4 max-w-2xl leading-relaxed">
            {roadmapPageData.subtitle}
          </p>

          {/* Note Callout */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F0FF] border border-violet-500/20 text-xs sm:text-sm font-semibold text-[#7B5CF5]">
            <Clock className="size-4" />
            <span>{roadmapPageData.note}</span>
          </div>
        </div>
      </section>

      {/* 2. Roadmap Items Grid */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {roadmapPageData.items.map((item: RoadmapItem, idx: number) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-[#EAE8E2] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[#161616] hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6F76]">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 text-[#7B5CF5] border border-violet-500/20 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="size-3" />
                    {item.badge}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#161616] tracking-tight mb-2">
                  {item.title}
                </h2>

                <p className="type-body text-[#6B6F76] text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#8F94A0]">
                <span>Status: In planning & research</span>
                <span className="text-[#161616] font-medium">No fixed date</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTABand */}
      <CTABand
        title={roadmapPageData.ctaTitle}
        subtitle={roadmapPageData.ctaSubtitle}
        buttonText={roadmapPageData.ctaButtonText}
        tone="dark"
      />
    </div>
  );
}
