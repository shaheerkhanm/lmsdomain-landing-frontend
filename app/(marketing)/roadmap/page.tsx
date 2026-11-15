import type { Metadata } from "next";
import { roadmapPageData } from "@/content/roadmap";
import { RoadmapV5 } from "@/components/sections/RoadmapV5/RoadmapV5";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getMetadataBase } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "LMS Domain Product Roadmap: What We're Building Next | LMS Domain",
  description:
    "See the features planned for LMS Domain: branded mobile apps, WhatsApp notifications, memberships, affiliates, sales funnels and more, plus everything available today.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapRoute() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Roadmap", path: "/roadmap" },
  ];
  return (
    <>
      <JsonLdScript data={getBreadcrumbListJsonLd(breadcrumbs)} />
      <RoadmapV5
        items={roadmapPageData.items}
        note={roadmapPageData.note}
        ctaTitle={roadmapPageData.ctaTitle}
        ctaSubtitle={roadmapPageData.ctaSubtitle}
        ctaButtonText={roadmapPageData.ctaButtonText}
      />
      <ScrollReveal />
    </>
  );
}
