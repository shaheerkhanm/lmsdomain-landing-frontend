import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Brand | Platform"),
  description: "Your academy, on your own domain.",
  alternates: { canonical: "/platform/brand" },
};

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Brand"
        title="Your academy, on your own domain."
        subtitle="Custom domain with SSL, homepage builder, theme branding, SEO controls, blogs and ebooks."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Brand module custom domain setup, theme customization, and white-labeling will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}
