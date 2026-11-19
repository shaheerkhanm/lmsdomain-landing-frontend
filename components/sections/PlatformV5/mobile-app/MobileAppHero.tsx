import React from "react";
import { StoreBadges } from "@/components/sections/mobile/StoreBadges";
import { getSiteContact } from "@/lib/api/content";
import { HeroShowcase } from "./HeroShowcase";

/* Mobile apps hero: store badges, then a tilted phone on a lavender stage with floating cards. */
export async function MobileAppHero() {
  const contact = await getSiteContact().catch(() => null);
  return (
    <div>
      <StoreBadges links={{ playStoreUrl: contact?.playStoreUrl, appStoreUrl: contact?.appStoreUrl }} className="v5-rise justify-center" />
      <div className="mt-10 sm:mt-12">
        <HeroShowcase />
      </div>
      <p className="mt-3 text-center text-[12px] text-[#A1A1AA]">Sample academy shown</p>
    </div>
  );
}
