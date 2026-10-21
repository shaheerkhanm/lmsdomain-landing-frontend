import React from "react";
import PageHero from "@/components/marketing/PageHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domie AI | LMS Domain",
  description: "AI-powered course drafting, instant learner answering, and automated course intelligence.",
};

export default function AiPage() {
  return (
    <div className="font-urbanist">
      <PageHero
        eyebrow="Domie AI"
        title="Domie AI"
        subtitle="AI-powered course drafting, instant learner answering, and automated course intelligence."
      />
    </div>
  );
}
