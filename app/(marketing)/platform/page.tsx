import type { Metadata } from "next";
import { PlatformOverviewPage } from "@/components/marketing/platform";
import { platformOverviewSeo } from "@/content/platform/overview";
import { getMetadataBase } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { getPlatformOverview, getCustomersPage } from "@/lib/api/content";

const baseMetadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: platformOverviewSeo.title,
  description: platformOverviewSeo.description,
  alternates: { canonical: "/platform" },
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(baseMetadata, { seo: "platform", guard: "platform" });
}

export default async function PlatformOverviewRoute() {
  const [content, customers] = await Promise.all([getPlatformOverview(), getCustomersPage()]);
  return <PlatformOverviewPage content={content} stats={customers.numbers.items} />;
}
