import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthCopy } from "@/lib/api/content";
import { ForgotPasswordForm } from "@/components/marketing/ForgotPasswordForm";
import { getCentralLoginConfig } from "@/lib/auth/central-config";
import { getMetadataBase } from "@/lib/site";
import { guardPage, guardMetadata } from "@/lib/pages";

// Render per request: the central login config comes from server env at runtime.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hiddenMeta = await guardMetadata("login");
  if (hiddenMeta) return hiddenMeta;
  return {
    metadataBase: getMetadataBase(),
    title: "Reset your password | LMS Domain",
    description: "Reset the password for your LMS Domain academy admin account.",
    robots: { index: false, follow: false },
  };
}

export default async function ForgotPasswordPage() {
  await guardPage("login");
  // Only part of the central admin login; without it /login links elsewhere.
  const central = await getCentralLoginConfig();
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
