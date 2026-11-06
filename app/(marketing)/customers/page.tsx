import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Customers"),
  description: "Academies teaching with LMS Domain",
  alternates: { canonical: "/customers" },
};

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Customers & Proof"
        title="Academies teaching with LMS Domain"
        subtitle="Forward-thinking academies and training organizations that deliver courses, live batches and assessments on LMS Domain."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2D with verified logo wall and metrics */}
        <p className="text-sm text-[#8F94A0]">
          Verified academy client logos and approved metrics will be assembled here in Phase 2D.
        </p>
      </div>
    </div>
  );
}
