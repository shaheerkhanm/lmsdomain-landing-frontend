import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy, getAppAuthUrls } from "@/lib/api/content";
import { AuthLoginForm } from "@/components/marketing/AuthLoginForm";

export const metadata: Metadata = {
  title: "Log In | LMS Domain",
  description: "Log in to your LMS Domain academy platform.",
  robots: {
    index: false,
    follow: false,
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
