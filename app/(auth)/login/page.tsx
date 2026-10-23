import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy, getAppAuthUrls, fetchSeo } from "@/lib/api/content";
import { AuthLoginForm } from "@/components/marketing/AuthLoginForm";
import { getMetadataBase, applySeo } from "@/lib/site";

// Render per request: the app links come from admin settings / server env at
// runtime, so a prerendered page would ship a disabled button until revalidation.
export const dynamic = "force-dynamic";

const BASE_METADATA: Metadata = {
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

// Title, description, share image and noindex from Admin > SEO (noindex by default)
export async function generateMetadata(): Promise<Metadata> {
  return applySeo({ ...BASE_METADATA, metadataBase: getMetadataBase() }, await fetchSeo("login").catch(() => null), { overrideText: true });
}

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
