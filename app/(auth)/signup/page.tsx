import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy, getAppAuthUrls, fetchSeo } from "@/lib/api/content";
import { AuthSignupForm } from "@/components/marketing/AuthSignupForm";
import { getMetadataBase, applySeo } from "@/lib/site";

// Render per request: the app links come from admin settings / server env at
// runtime, so a prerendered page would ship a disabled button until revalidation.
export const dynamic = "force-dynamic";

const BASE_METADATA: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Sign Up | LMS Domain",
  description: "Start your LMS Domain academy platform.",
  robots: {
    index: false,
    follow: false,
  },
};

// Title, description, share image and noindex from Admin > SEO (noindex by default)
export async function generateMetadata(): Promise<Metadata> {
  return applySeo({ ...BASE_METADATA, metadataBase: getMetadataBase() }, await fetchSeo("signup").catch(() => null), { overrideText: true, page: "signup" });
}

export default async function SignupPage() {
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
      <AuthSignupForm
        copy={authCopy.signup}
        signupUrl={authUrls.signupUrl}
      />
    </Suspense>
  );
}
