"use client";

import React from "react";
import { heroContent as defaultHeroContent } from "@/content/home/hero";
import { useSectionContent } from "@/components/content/PageContent";
import { liveOr } from "@/lib/claims";

export function MainHeading({ data }: { data?: any }) {
  const heroContent = useSectionContent("home-hero", defaultHeroContent);
  const title = liveOr(heroContent.title, defaultHeroContent.title);

  const defaultPhrase = "Run your academy's batches, live classes and tests in one place.";
  const effectiveTitle = title || defaultHeroContent.title || defaultPhrase;
  const isDefaultTitle =
    effectiveTitle.trim().replace(/\.$/, "").toLowerCase() ===
    defaultPhrase.replace(/\.$/, "").toLowerCase();

  return (
    <h1 className="text-[clamp(36px,4.2vw,60px)] font-bold tracking-[-0.035em] leading-[1.06] text-[#151517] text-center max-w-[1120px] mx-auto [text-wrap:unset]">
      {isDefaultTitle ? (
        <>
          Run your academy&apos;s batches, live classes
          <br className="hidden min-[1280px]:inline" /> and tests in one place.
        </>
      ) : (
        effectiveTitle
      )}
    </h1>
  );
}

export default MainHeading;
