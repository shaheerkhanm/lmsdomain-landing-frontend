import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Product Roadmap"),
  description: "What we're building next for LMS Domain.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Product Roadmap"
        title="What we're building next"
        subtitle="A transparent look at upcoming capabilities for LMS Domain. Dates aren't fixed; ask us if you need one of these."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2D with roadmap cards labeled 'Coming soon' */}
        <p className="text-sm text-[#8F94A0]">
          Roadmap upcoming items and feature timelines will be assembled here in Phase 2D.
        </p>
      </div>
    </div>
  );
}
