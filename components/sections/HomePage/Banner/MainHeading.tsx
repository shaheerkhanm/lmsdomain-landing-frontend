"use client";

import React from "react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";

export function MainHeading({ data }: { data?: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const title = liveOr(heroContent.title, defaultHeroContent.title);

  const defaultPhrase = "Run your academy’s batches, live classes and tests in one place.";
  const effectiveTitle = title || defaultHeroContent.title || defaultPhrase;
  const isDefaultTitle =
    effectiveTitle.trim().replace(/\.$/, "").replace(/'/g, "’").toLowerCase() ===
    defaultPhrase.replace(/\.$/, "").replace(/'/g, "’").toLowerCase();

  return (
    <h1 className="text-[clamp(34px,8.5vw,38px)] min-[640px]:text-[clamp(38px,4.4vw,64px)] font-semibold font-urbanist tracking-[-0.025em] leading-[1.06] text-[#151517] text-center max-w-[840px] mx-auto [text-wrap:balance]">
      {isDefaultTitle ? (
        <>
          Run your academy’s batches,
          <br className="hidden min-[1024px]:inline" /> live classes and tests in one place.
        </>
      ) : (
        effectiveTitle
      )}
    </h1>
  );
}

export default MainHeading;
