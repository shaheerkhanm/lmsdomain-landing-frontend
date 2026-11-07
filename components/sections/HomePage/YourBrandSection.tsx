"use client";

import React from "react";
import { Section, Eyebrow, ScreenshotFrame } from "@/components/marketing/ui";
import { MockupCaption } from "@/components/marketing/mockups/MockupCaption";
import {
  BrandedSiteScreen,
  StudentViewScreen,
} from "@/components/marketing/mockups/screens";
import { Globe2, Palette, LayoutTemplate } from "lucide-react";

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

        {/* Right Column: Layered Storefront + Mobile Student View */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full min-w-0">
          <div className="relative w-full max-w-md sm:max-w-lg">
            {/* Desktop Branded Storefront */}
            <ScreenshotFrame
              screen={<BrandedSiteScreen />}
              title="learn.northstaracademy.in"
              alt="Northstar Academy branded custom domain storefront"
              className="shadow-xl ring-1 ring-black/5"
              showCaption={false}
            />

            {/* Overlapping Student View on Mobile Phone (hidden on smallest viewports, shown on sm+) */}
            <div className="hidden sm:block absolute -bottom-5 -right-3 w-[190px] md:w-[210px] rounded-2xl border-2 border-white shadow-2xl overflow-hidden bg-white z-10 aspect-9/16 ring-1 ring-black/10">
              <div className="w-full h-full transform scale-90 origin-top">
                <StudentViewScreen />
              </div>
            </div>
          </div>
          <MockupCaption className="mt-7 sm:mt-9" />
        </div>
      </div>
    </Section>
  );
}

export default YourBrandSection;
