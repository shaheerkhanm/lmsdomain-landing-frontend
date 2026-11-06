import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Assess | Platform"),
  description: "Test learners and certify the ones who finish.",
  alternates: { canonical: "/platform/assess" },
};

export default function AssessPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Assess"
        title="Test learners and certify the ones who finish."
        subtitle="Quizzes, assignments with review, in-video checkpoints, and verifiable certificates."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Assess module features, review flows, and certificates will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}
