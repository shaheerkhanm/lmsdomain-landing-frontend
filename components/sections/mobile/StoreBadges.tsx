import React from "react";
import { cn } from "@/lib/utils";
import { AppleIcon, GooglePlayIcon } from "./StoreIcons";

export type StoreLinks = { playStoreUrl?: string; appStoreUrl?: string };

/*
 * Google Play and App Store buttons, drawn as one matching pair (same height, width and type),
 * so they line up anywhere. Each opens its store when its link is set in Admin > Contact details.
 */
function Badge({ icon, small, big }: { icon: React.ReactNode; small: string; big: string }) {
  return (
    <span className="inline-flex h-12 w-[168px] items-center gap-2.5 rounded-[12px] bg-[#0A0A0B] px-3.5 text-left text-white ring-1 ring-black/10">
      <span className="grid h-6 w-6 shrink-0 place-items-center">{icon}</span>
      <span className="whitespace-nowrap leading-none">
        <span className="block text-[10.5px] font-medium text-white/75">{small}</span>
        <span className="mt-1 block text-[16.5px] font-semibold tracking-[-0.01em]">{big}</span>
      </span>
    </span>
  );
}

export function StoreBadges({ links, className }: { links?: StoreLinks; className?: string }) {
  const play = <Badge icon={<GooglePlayIcon size={22} />} small="Get it on" big="Google Play" />;
  const apple = <Badge icon={<AppleIcon size={22} color="#FFFFFF" />} small="Download on the" big="App Store" />;
  const wrap = (url: string | undefined, el: React.ReactElement, label: string) =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-[12px] transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C4BFF]">
        {el}
      </a>
    ) : (
      <span role="img" aria-label={label}>{el}</span>
    );
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {wrap(links?.playStoreUrl, play, "Get it on Google Play")}
      {wrap(links?.appStoreUrl, apple, "Download on the App Store")}
    </div>
  );
}
