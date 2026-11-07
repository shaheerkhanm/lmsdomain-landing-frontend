import type { Metadata } from "next";
import { PlatformOverviewPage } from "@/components/marketing/platform";
import { platformOverviewSeo } from "@/content/platform/overview";
import { getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: platformOverviewSeo.title,
  description: platformOverviewSeo.description,
  alternates: { canonical: "/platform" },
};

export default function PlatformOverviewRoute() {
  return <PlatformOverviewPage />;
}
