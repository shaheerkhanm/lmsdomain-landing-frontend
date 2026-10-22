import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy, getAppAuthUrls } from "@/lib/api/content";
import { AuthLoginForm } from "@/components/marketing/AuthLoginForm";
import { getMetadataBase } from "@/lib/site";

// Render per request: the app links come from admin settings / server env at
// runtime, so a prerendered page would ship a disabled button until revalidation.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Log In | LMS Domain",
  description: "Log in to your LMS Domain academy platform.",
  robots: {
    index: false,
    follow: false,
  },
  // Explicit so it resolves against this page's metadataBase, like the marketing pages
  openGraph: {
    images: ["/opengraph-image"],
  },
};

export default async function LoginPage() {
  const [authCopy, authUrls] = await Promise.all([
    getAuthCopy(),
    getAppAuthUrls(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="w-full h-48 animate-pulse rounded-2xl bg-slate-50" />
      }
    >
      <AuthLoginForm
        copy={authCopy.login}
        loginUrl={authUrls.loginUrl}
        forgotUrl={authUrls.forgotPasswordUrl}
      />
    </Suspense>
  );
}
