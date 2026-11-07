"use client";

import React from "react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";

export function MainHeading({ data }: { data?: any }) {
  // Phase 2 copy is code-owned until cutover; site-home-hero is still used by the live site.
  const title = defaultHeroContent.title;

  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto font-urbanist">
      <h1 className="text-[32px] sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#161616] leading-[1.12]">
        {title}
      </h1>
    </div>
  );
}

export default MainHeading;
