import React, { Suspense } from "react";
import { Metadata } from "next";
import { getAuthCopy } from "@/lib/api/content";
import { AuthSignupForm } from "@/components/marketing/AuthSignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Start your LMS Domain academy platform.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignupPage() {
  const authCopy = await getAuthCopy();

  return (
    <Suspense
      fallback={
        <div className="w-full h-48 animate-pulse rounded-2xl bg-slate-50" />
      }
    >
      <AuthSignupForm copy={authCopy.signup} />
    </Suspense>
  );
}
