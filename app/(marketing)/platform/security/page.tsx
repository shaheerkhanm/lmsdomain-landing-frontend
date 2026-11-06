import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Security | Platform"),
  description: "Protect your courses and your learners' data.",
  alternates: { canonical: "/platform/security" },
};

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Security & Trust"
        title="Protect your courses and your learners' data."
        subtitle="Secure hosting, dynamic video watermarking, learner device limits, RBAC, and data privacy compliance."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Security safeguards, privacy architecture, and compliance specs will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}
