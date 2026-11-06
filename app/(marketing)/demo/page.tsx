import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/marketing/PageHero";
import DemoForm from "@/components/marketing/DemoForm";
import { fullTitle, getMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: fullTitle("Book a Demo"),
  description: "Schedule a personalized 20-minute walkthrough of LMS Domain for your academy.",
  alternates: { canonical: "/demo" },
};

function DemoPageForm() {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-3xl border border-[#EAE8E2] p-6 sm:p-10 shadow-xl font-urbanist">
      <DemoForm variant="page" submitLabel="Book a 20-minute demo" />
    </div>
  );
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-urbanist pb-24">
      <PageHero
        eyebrow="Live Walkthrough"
        title="Book a 20-minute academy demo"
        subtitle="Tell us about your organization and learners. Our team will prepare a live walkthrough tailored to your curriculum and teaching workflows."
        pattern="dots"
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 -mt-4">
        <Suspense
          fallback={
            <div className="w-full max-w-xl mx-auto h-[480px] bg-white rounded-3xl border border-[#EAE8E2] flex items-center justify-center text-sm text-[#8F94A0]">
              Loading demo form...
            </div>
          }
        >
          <DemoPageForm />
        </Suspense>
      </div>
    </div>
  );
}

