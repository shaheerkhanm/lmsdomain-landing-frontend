import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Blog"),
  description: "Insights, guides and playbooks for scaling modern online academies.",
  alternates: { canonical: "/resources/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Resources & Insights"
        title="Blog — coming soon"
        subtitle="Practical guides, teaching insights and playbooks for running profitable, high-impact academies."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2D with blog post index */}
        <p className="text-sm text-[#8F94A0]">
          Articles and academy resources are in preparation and will be published here in Phase 2D.
        </p>
      </div>
    </div>
  );
}
