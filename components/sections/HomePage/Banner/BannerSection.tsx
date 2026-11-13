"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { DomieOrb } from "@/components/ai/DomieOrb";
import MainHeading from "./MainHeading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EnquiryForm from "@/components/layout/common/EnquiryForm";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { aiSectionContent } from "@/content/home/ai";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";
import type { ClientLogoItem } from "@/components/marketing/ui/ProofStrip";
import HeroDashboard from "@/components/marketing/mockups/HeroDashboard";

// Dynamic import with ssr: false so SSR renders server H1 directly (LCP untouched)
const ParticleWave = dynamic(
  () => import("@/components/visual/ParticleWave"),
  {
    ssr: false,
    loading: () => (
      <div
        className="hero-dot-grid absolute inset-0 -z-10 select-none opacity-30"
        aria-hidden="true"
      />
    ),
  }
);

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
    <section className="relative pt-[100px] min-[900px]:pt-[93.5px] pb-0 font-sans overflow-x-clip bg-white isolate">
      {/* 3D Particle Wave Background (V1j §1) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[860px] -z-10 select-none overflow-hidden"
        aria-hidden="true"
      >
        <ParticleWave className="w-full h-full" mode="hero" />
      </div>

      {/* Soft white radial behind text to preserve crisp readability (V1j §1c) */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[920px] h-[520px] -z-10 select-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 36%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-[clamp(20px,4vw,48px)] text-center flex flex-col items-center">
        {/* Compact Gradient Hairline Badge above H1 (§1) */}
        <div className="mb-4">
          <Link
            href="/platform/ai"
            className="group inline-flex items-center gap-2 h-[32px] pl-1 pr-3 rounded-[999px] text-[13px] font-[500] text-[#151517] shadow-[0_4px_14px_-6px_rgba(20,20,40,0.18)] hover:shadow-[0_6px_20px_-4px_rgba(20,20,40,0.24)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#7B5CFF] focus-visible:outline-offset-2 whitespace-nowrap"
            style={{
              border: "1px solid transparent",
              background:
                "linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(135deg, #E2539B 0%, #F2894A 50%, #7B5CFF 100%) border-box",
            }}
          >
            {/* Left: 24px circle with animated Domie orb */}
            <span className="w-6 h-6 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#0E0E11]">
              <DomieOrb size={24} surface="dark" />
            </span>

            {/* Phrase 1 */}
            <span className="text-[#151517] font-[500]">Meet Domie AI</span>

            {/* Hairline Divider & Phrase 2 (dropped below 400px to guarantee 1-line fit on 390px) */}
            <span className="hidden min-[400px]:inline-block w-[1px] h-3 bg-[#E8E8EC]" aria-hidden="true" />
            <span className="hidden min-[400px]:inline text-[#535361] font-normal">
              AI that works inside your academy
            </span>

            {/* Chevron Right 14px */}
            <ChevronRight
              className="w-3.5 h-3.5 text-[#535361] shrink-0 transition-transform duration-200 group-hover:translate-x-[2px]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* H1 Headline */}
        <MainHeading data={data} />

        {/* Subtitle (18px below H1) */}
        <p className="mt-[18px] text-[15px] sm:text-[16px] text-[#535361] leading-[1.5] max-w-[54ch] mx-auto text-center">
          {effectiveSubtitle}
        </p>

        {/* CTAs (24px below subtitle) */}
        <div className="mt-[24px] flex flex-wrap items-center justify-center gap-3">
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

        {/* Hand note (12px below buttons) */}
        <p className="font-hand text-[19px] leading-[1.2] text-[#55555F] mt-[12px] flex items-center justify-center gap-1.5 text-center">
          {heroContent.microcopy || "Your own domain on every plan · Set up with our team"}
        </p>
      </div>

      {/* Hero Dashboard Assembly Frame (Option F, 36px below hand note) */}
      <div className="mt-[36px]">
        <HeroDashboard />
      </div>

      {/* Marquee Section (Directly Below Dashboard) */}
      <div className="mt-6 sm:mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {hasClientLogos && (
          <p className="text-center text-[12.5px] text-[#8A8A96] mb-5 sm:mb-[22px]">
            Academies teaching with LMS Domain
          </p>
        )}
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
