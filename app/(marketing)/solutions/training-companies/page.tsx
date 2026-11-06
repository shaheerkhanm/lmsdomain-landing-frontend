import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Training Companies | Solutions"),
  description: "Sell cohorts and team packages, deliver them live, and certify the people who finish.",
  alternates: { canonical: "/solutions/training-companies" },
};

export default function TrainingCompaniesPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Solutions · Training Companies"
        title="Sell cohorts and team packages, deliver them live, and certify the people who finish."
        subtitle="Bootcamps, cohorts, 1:1 tutor booking, team training packages, instructor payouts, and completion certificates."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2D with solution template */}
        <p className="text-sm text-[#8F94A0]">
          Corporate cohort delivery, team packages, and trainer workflows will be built here in Phase 2D.
        </p>
      </div>
    </div>
  );
}

