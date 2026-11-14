"use client";

import React from "react";
import {
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  XIcon,
  FacebookIcon,
} from "@/components/logos/social";
import { socialLinks } from "@/content/site";

const SOCIAL_ICON_COMPONENTS: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  x: XIcon,
  facebook: FacebookIcon,
};

export default function SocialMediaIcons({
  className = "",
}: {
  data?: any;
  className?: string;
}) {
  // Read verified links configured in content/site.ts
  const activeLinks = socialLinks.filter((item) => Boolean(item.url && item.url.trim()));

  if (activeLinks.length === 0) return null;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {activeLinks.map((item) => {
        const IconComponent = SOCIAL_ICON_COMPONENTS[item.id] || XIcon;
        return (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className="w-9 h-9 rounded-full border border-[rgba(15,15,20,0.12)] bg-white flex items-center justify-center text-[#151517]/70 hover:text-[#151517] hover:border-[rgba(15,15,20,0.25)] hover:shadow-xs transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#7B5CF5]"
          >
            <IconComponent size={17} className="fill-current" />
          </a>
        );
      })}
    </div>
  );
}
