import React from "react";
import PageHero from "@/components/marketing/PageHero";
import { EnquiryForm } from "@/components/layout/common/EnquiryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | LMS Domain",
  description: "Get in touch with our learning technology specialists.",
};

export default function ContactPage() {
  return (
    <div className="font-urbanist pb-24">
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Speak with our team about deploying your custom branded learning platform."
      />
      <div className="max-w-[560px] mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
