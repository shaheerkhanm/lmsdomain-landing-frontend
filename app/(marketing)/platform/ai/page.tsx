import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Domie AI | Platform"),
  description: "Domie AI: a teaching assistant grounded in your own courses.",
  alternates: { canonical: "/platform/ai" },
};

export default function PlatformAiPage() {
  return (
    <div className="min-h-screen bg-white font-urbanist">
      <PageHero
        eyebrow="Domie AI · Premium"
        title="Domie AI: a teaching assistant grounded in your own courses."
        subtitle="HelpDesk AI tutor, structured content drafting, prescriptive analytics, and command bar."
        pattern="dots"
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 text-center">
        {/* TODO(content): Build in Phase 2C with PlatformPage template */}
        <p className="text-sm text-[#8F94A0]">
          Domie AI grounded assistant capabilities, analytics, and tool showcases will be built here in Phase 2C.
        </p>
      </div>
    </div>
  );
}

