"use client";

import React from "react";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/marketing/ui";
import { Globe2, Palette, LayoutTemplate, Check } from "lucide-react";

export function YourBrandSection() {
  const points = [
    {
      icon: Globe2,
      title: "Custom domain with automated SSL",
      desc: "Point your academy to learn.yourbrand.com or yourdomain.com with free, zero-config automated SSL renewal.",
    },
    {
      icon: Palette,
      title: "Per-school logos & brand colors",
      desc: "Upload light and dark wordmarks, brand icons, and custom color accents that match your academy identity.",
    },
    {
      icon: LayoutTemplate,
      title: "Homepage builder & SEO controls",
      desc: "Customize your public storefront, course catalogs, and meta descriptions for search engines without touching code.",
    },
  ];

  return (
    <Section tone="white" spacing="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Copy & Benefits */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <Eyebrow tone="violet">WHITE-LABEL EXPERIENCE</Eyebrow>
          <h2 className="type-h2 text-[#161616] mt-3">
            Your brand, your domain
          </h2>
          <p className="type-body text-[#6B6F76] mt-3 mb-8">
            Your own domain, logo and colours, with a home page you build yourself. Students experience your academy, not ours.
          </p>

          <div className="space-y-6 w-full">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="size-10 rounded-2xl bg-[#FAF9F6] border border-[#EAE8E2] flex items-center justify-center text-[#7B5CF5] shrink-0 mt-1">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#161616] tracking-tight">
                      {pt.title}
                    </h3>
                    <p className="text-sm text-[#6B6F76] leading-relaxed mt-1">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative rounded-3xl bg-[#FAF9F6] border border-[#EAE8E2] p-6 sm:p-8 w-full max-w-md shadow-sm">
            <div className="relative aspect-4/3 w-full flex items-center justify-center overflow-hidden rounded-2xl bg-white border border-[#EAE8E2]">
              <Image
                src="/assets/img/home/benefits/benefit_your_brand.png"
                alt="Your brand and custom domain configuration"
                width={400}
                height={300}
                className="w-full h-auto object-contain p-4"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[#6B6F76] px-1">
              <span className="font-semibold text-[#161616]">academy.yourdomain.com</span>
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <Check className="size-3.5" /> SSL Secured
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default YourBrandSection;
