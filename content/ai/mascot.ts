export interface MascotConfig {
  name: string;
  lg: string;
  sm: string;
  lgStill: string;
  smStill: string;
}

export const DOMIE_MASCOT: MascotConfig = {
  name: "Domie",
  lg: "/images/ai/domie/domie-bot.webp",
  sm: "/images/ai/domie/domie-bot-sm.webp",
  lgStill: "/images/ai/domie/domie-bot-still.webp",
  smStill: "/images/ai/domie/domie-bot-sm-still.webp",
} as const;

export default DOMIE_MASCOT;
