export interface MascotVariantSources {
  webm: string;
  mp4: string;
  poster: string;
}

export interface MascotConfig {
  name: string;
  lg: MascotVariantSources;
  sm: MascotVariantSources;
}

export const DOMIE_MASCOT: MascotConfig = {
  name: "Domie",
  lg: {
    webm: "/images/ai/domie/domie-orb-480.webm",
    mp4: "/images/ai/domie/domie-orb-480.mp4",
    poster: "/images/ai/domie/domie-orb-480-poster.jpg",
  },
  sm: {
    webm: "/images/ai/domie/domie-orb-160.webm",
    mp4: "/images/ai/domie/domie-orb-160.mp4",
    poster: "/images/ai/domie/domie-orb-160-poster.jpg",
  },
} as const;

export default DOMIE_MASCOT;

