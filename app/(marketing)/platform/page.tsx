import type { Metadata } from "next";
import { PlatformOverviewPage } from "@/components/marketing/platform";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Platform Overview"),
  description: "Everything an academy needs to teach, test and get paid.",
  alternates: { canonical: "/platform" },
};

export default function PlatformOverviewRoute() {
  return <PlatformOverviewPage />;
}
