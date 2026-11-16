import React from "react";
import RouteChangeWatcher from "@/components/marketing/RouteChangeWatcher";
import { getOrganizationJsonLd, JsonLdScript } from "@/components/seo/JsonLd";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdScript data={getOrganizationJsonLd()} />
      <RouteChangeWatcher />
      <main className="flex-1 w-full">{children}</main>
    </>
  );
}
