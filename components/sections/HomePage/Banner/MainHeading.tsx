"use client";

import React from "react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";

export function MainHeading({ data }: { data?: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const title = liveOr(heroContent.title, defaultHeroContent.title);

  return (
    <h1 className="type-h1-v4 max-w-[15ch] text-[#151517]">
      {title}
    </h1>
  );
}

export default MainHeading;
