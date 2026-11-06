import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Platform Overview"),
  description: "Everything an academy needs to teach, test and get paid.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Platform Overview"
        title="Everything an academy needs to teach, test and get paid."
        subtitle="Explore the complete operating system for modern training academies: courses, live batches, assessments, multi-currency checkout, and grounded AI."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Rebuild in Phase 2C with 7 feature category cards */}
        <p className="text-sm text-[#8F94A0]">
          Platform overview cards and feature summaries will be assembled here in Phase 2C.
        </p>
      </div>
    </div>
  );
}
