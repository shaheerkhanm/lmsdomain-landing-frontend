import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthCopy } from "@/lib/api/content";
import { ForgotPasswordForm } from "@/components/marketing/ForgotPasswordForm";
import { getCentralLoginConfig } from "@/lib/auth/central-config";
import { getMetadataBase } from "@/lib/site";

// Render per request: the central login config comes from server env at runtime.
export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return {
    metadataBase: getMetadataBase(),
    title: "Reset your password | LMS Domain",
    description: "Reset the password for your LMS Domain academy admin account.",
    robots: { index: false, follow: false },
  };
}

export default async function ForgotPasswordPage() {
  // Only part of the central admin login; without it /login links elsewhere.
  const central = getCentralLoginConfig();
  if (!central) redirect("/login");

  const authCopy = await getAuthCopy();

  return (
    <ForgotPasswordForm
      copy={authCopy.forgot}
      centralUrl={central.centralUrl}
      recaptchaSiteKey={central.recaptchaSiteKey}
    />
  );
}
