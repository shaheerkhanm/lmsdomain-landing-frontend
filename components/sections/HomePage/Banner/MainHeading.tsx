"use client";

import React from "react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";

export function MainHeading({ data }: { data?: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const title =
    heroContent.title ||
    "Run your academy's batches, live classes and tests in one place.";

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto font-urbanist">
      <h1 className="text-[32px] sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#161616] leading-[1.12]">
        {title}
      </h1>
    </div>
  );
}

export default MainHeading;
