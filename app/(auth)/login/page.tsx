import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy, getAppAuthUrls, fetchSeo } from "@/lib/api/content";
import { AuthLoginForm } from "@/components/marketing/AuthLoginForm";
import { CentralLoginForm } from "@/components/marketing/CentralLoginForm";
import { getCentralLoginConfig } from "@/lib/auth/central-config";
import { getMetadataBase, applySeo } from "@/lib/site";

// Render per request: the app links and the central login config come from
// admin settings / server env at runtime, so a prerendered page would ship
// stale values until revalidation.
export const dynamic = "force-dynamic";

const BASE_METADATA: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Log In | LMS Domain",
  description: "Log in to your LMS Domain academy platform.",
  robots: {
    index: false,
    follow: false,
  },
};

// Title, description, share image and noindex from Admin > SEO (noindex by default)
export async function generateMetadata(): Promise<Metadata> {
  return applySeo({ ...BASE_METADATA, metadataBase: getMetadataBase() }, await fetchSeo("login").catch(() => null), { overrideText: true, page: "login" });
}

export default async function LoginPage() {
  // central: null = central login off, keep the button to the app login URL
  const [authCopy, authUrls, central] = await Promise.all([
    getAuthCopy(),
    getAppAuthUrls(),
    getCentralLoginConfig(),
  ]);

  return (
    <Suspense
      fallback={
        <div className="w-full h-48 animate-pulse rounded-2xl bg-slate-50" />
      }
    >
      {central ? (
        <CentralLoginForm
          copy={authCopy.login}
          centralUrl={central.centralUrl}
          recaptchaSiteKey={central.recaptchaSiteKey}
        />
      ) : (
        <AuthLoginForm
          copy={authCopy.login}
          loginUrl={authUrls.loginUrl}
          forgotUrl={authUrls.forgotPasswordUrl}
        />
      )}
    </Suspense>
  );
}
