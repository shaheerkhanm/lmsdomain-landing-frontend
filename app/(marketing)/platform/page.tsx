import type { Metadata } from "next";
import { PlatformOverviewPage } from "@/components/marketing/platform";
import { platformOverviewSeo } from "@/content/platform/overview";
import { getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: platformOverviewSeo.title,
  description: platformOverviewSeo.description,
  alternates: { canonical: "/platform" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform", guard: "platform" });
}

export default function PlatformOverviewRoute() {
  return <PlatformOverviewPage />;
}
