import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Manage | Platform"),
  description: "Know every batch, learner and class at a glance.",
  alternates: { canonical: "/platform/manage" },
};

export default function ManagePage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Manage"
        title="Know every batch, learner and class at a glance."
        subtitle="Batches, learners, attendance, role-based access, messages, and automated notifications."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Manage module operations, attendance logs, and staff permissions will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}

