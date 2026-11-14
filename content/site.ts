/**
 * content/site.ts
 *
 * Site configuration, social profile links, and canonical branding metadata.
 */

import { entity, officialSocialProfiles } from "./entity";

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  ariaLabel: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/lmsdomain",
    ariaLabel: "LMS Domain on LinkedIn",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/lmsdomain",
    ariaLabel: "LMS Domain on Instagram",
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com/@lmsdomain",
    ariaLabel: "LMS Domain on YouTube",
  },
  {
    id: "x",
    name: "X",
    url: "https://x.com/lmsdomain",
    ariaLabel: "LMS Domain on X",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/lmsdomain",
    ariaLabel: "LMS Domain on Facebook",
  },
];

export const siteConfig = {
  name: "LMS Domain",
  description: entity.oneLine,
  supportEmail: entity.facts.supportEmail,
  phone: entity.facts.telephone,
  address: entity.facts.address,
  copyrightYear: new Date().getFullYear(),
  tagline: "Made for academies in India and beyond",
};
