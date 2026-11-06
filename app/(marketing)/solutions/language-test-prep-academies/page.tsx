import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Language & Test-Prep Academies | Solutions"),
  description: "Built for IELTS, PTE and language academies that teach in batches.",
  alternates: { canonical: "/solutions/language-test-prep-academies" },
};

export default function LanguageAcademiesPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Solutions · Language & Test-Prep"
        title="Built for IELTS, PTE and language academies that teach in batches."
        subtitle="Run morning and evening batches, take attendance automatically, set timed practice tests, and let students pay in their own currency, all on your academy's own website."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2D with solution template */}
        <p className="text-sm text-[#8F94A0]">
          Language academy batch flows, IELTS/PTE practice workflows, and verified client proof will be built here in Phase 2D.
        </p>
      </div>
    </div>
  );
}
