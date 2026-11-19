import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type StoreLinks = { playStoreUrl?: string; appStoreUrl?: string };

/* Google Play and App Store badges. Each opens its store when its link is set in Admin > Contact details. */
export function StoreBadges({ links, className }: { links?: StoreLinks; className?: string }) {
  const play = <Image src="/assets/img/badges/google-play-badge.png" alt="Get it on Google Play" width={155} height={60} className="-mx-[6px] -my-[7px] h-[54px] w-auto" />;
  const apple = <Image src="/assets/img/badges/app-store-badge.svg" alt="Download on the App Store" width={120} height={40} className="h-[40px] w-auto" />;
  const wrap = (url: string | undefined, el: React.ReactElement, label: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-[8px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]">
        {el}
      </a>
    ) : (
      el
    );
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {wrap(links?.playStoreUrl, play, "Get the LMS Domain app on Google Play")}
      {wrap(links?.appStoreUrl, apple, "Download the LMS Domain app on the App Store")}
    </div>
  );
}
