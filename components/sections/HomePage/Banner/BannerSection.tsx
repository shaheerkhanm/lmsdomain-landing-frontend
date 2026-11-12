"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MainHeading from "./MainHeading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { aiSectionContent } from "@/content/home/ai";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";
import type { ClientLogoItem } from "@/components/marketing/ui/ProofStrip";

// Integration logos (NEVER integration-10 / PayPal)
const INTEGRATION_LOGOS = [
  { name: "Razorpay", src: "/assets/img/integration/integration-1.png" },
  { name: "Pabbly", src: "/assets/img/integration/integration-2.png" },
  { name: "Mailchimp", src: "/assets/img/integration/integration-3.png" },
  { name: "Zapier", src: "/assets/img/integration/integration-4.png" },
  { name: "API", src: "/assets/img/integration/integration-5.png" },
  { name: "Zoom", src: "/assets/img/integration/integration-6.png" },
  { name: "Microsoft Teams", src: "/assets/img/integration/integration-7.png" },
  { name: "Stripe", src: "/assets/img/integration/integration-8.png" },
  { name: "Google Meet", src: "/assets/img/integration/integration-9.png" },
  { name: "Slack", src: "/assets/img/integration/integration-11.png" },
  { name: "Google Analytics", src: "/assets/img/integration/integration-12.png" },
];

export function BannerSection({
  data,
  graphData,
  clientLogos = [],
}: {
  data?: any;
  graphData?: any;
  clientLogos?: ClientLogoItem[];
}) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const effectiveSubtitle = liveOr(heroContent.subtitle, defaultHeroContent.subtitle);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Filter out placeholder names from client logos if present
  const validClientLogos = (clientLogos || []).filter((l) => {
    if (!l || !l.logo) return false;
    const name = (l.name || "").toLowerCase();
    return !/^client\s*-?\s*\d+/i.test(name);
  });

  const hasClientLogos = validClientLogos.length > 0;

  return (
    <section className="pt-[clamp(56px,8vw,104px)] pb-0 font-sans">
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6">
        {/* Badge above H1 */}
        <div className="mb-5 sm:mb-[22px]">
          <Link
            href="/ai"
            className="inline-flex items-center gap-2 text-[12.5px] text-[#535361] hover:text-[#151517] transition-colors flex-wrap"
          >
            <span className="inline-flex items-center gap-1.5 bg-[#151517] text-white rounded-[7px] px-2.5 py-1 font-semibold text-[11.5px]">
              New <span className="bg-gradient-to-r from-[#E2539B] via-[#F2894A] to-[#7B5CFF] bg-clip-text text-transparent not-italic font-bold">Domie AI</span> ›
            </span>
            <span>{aiSectionContent.title}</span>
          </Link>
        </div>

        {/* H1 Headline */}
        <MainHeading data={data} />

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] text-[#535361] leading-[1.55] max-w-[62ch]">
          {effectiveSubtitle}
        </p>

        {/* CTAs */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDemoModal(true)}
            className="btn-v4-dark cursor-pointer"
          >
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M5 11 11 5M6 5h5v5" />
            </svg>
            <span>{heroContent.ctaText || "Book a 20-minute demo"}</span>
          </button>
          <Link href="/pricing" className="btn-v4-light">
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M5 11 11 5M6 5h5v5" />
            </svg>
            <span>{heroContent.secondaryCtaText || "See pricing"}</span>
          </Link>
        </div>

        {/* Hand note */}
        <p className="font-hand text-[19px] leading-[1.2] text-[#55555F] mt-3 sm:mt-3.5 flex items-center gap-1.5">
          {heroContent.microcopy || "Your own domain on every plan · Set up with our team"}
        </p>
      </div>

      {/* Marquee Section */}
      <div className="rv-v4 mt-[clamp(56px,7vw,84px)] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <p className="text-center text-[12.5px] text-[#8A8A96] mb-5 sm:mb-[22px]">
          Academies teaching with LMS Domain
        </p>
        <div className="animate-marquee-v4 flex gap-16 items-center shrink-0" aria-hidden="true">
          {hasClientLogos ? (
            <>
              {validClientLogos.map((client, idx) => (
                <div key={`client-1-${idx}`} className="shrink-0 flex items-center justify-center">
                  <Image
                    src={client.logo!}
                    alt={client.name || "Client academy"}
                    width={140}
                    height={34}
                    className="h-[34px] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  />
                </div>
              ))}
              {validClientLogos.map((client, idx) => (
                <div key={`client-2-${idx}`} className="shrink-0 flex items-center justify-center">
                  <Image
                    src={client.logo!}
                    alt={client.name || "Client academy"}
                    width={140}
                    height={34}
                    className="h-[34px] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {INTEGRATION_LOGOS.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className="shrink-0 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={34}
                    className="h-[34px] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  />
                </div>
              ))}
              {INTEGRATION_LOGOS.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className="shrink-0 flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={34}
                    className="h-[34px] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Demo Enquiry Modal Dialog */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xl">
          <EnquiryForm onClose={() => setShowDemoModal(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default BannerSection;
