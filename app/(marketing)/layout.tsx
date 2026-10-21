import React from "react";
import RouteChangeWatcher from "@/components/marketing/RouteChangeWatcher";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteChangeWatcher />
      <main className="flex-1 w-full">{children}</main>
    </>
  );
}
