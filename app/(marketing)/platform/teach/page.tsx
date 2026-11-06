import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Teach | Platform"),
  description: "Teach recorded courses and live batches from one place.",
  alternates: { canonical: "/platform/teach" },
};

export default function TeachPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Teach"
        title="Teach recorded courses and live batches from one place."
        subtitle="Courses, drip release, Zoom live classes, bootcamps and 1:1 tutor booking."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Teach module features, screenshot frame, and benefits will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}

