"use client";

import React from "react";
import KeywordPill from "./KeywordPill";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";

export function MainHeading({ data }: { data?: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto font-urbanist">
      <h1 className="text-[32px] sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-[#161616] leading-[1.12]">
        <span className="block">{heroContent.titlePrefix}</span>
        <span className="block mt-1 sm:mt-1.5">
          {(heroContent as { connector?: string }).connector ?? "to"} <KeywordPill />
        </span>
      </h1>
    </div>
  );
}

export default MainHeading;