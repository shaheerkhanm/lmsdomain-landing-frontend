import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };

/**
 * Returns true if the client environment prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Standard matchMedia contexts per spec §5.0:
 * - desktop: (min-width: 1024px)
 * - mobile: (max-width: 1023px)
 * - reduce: (prefers-reduced-motion: reduce)
 */
export const GSAP_BREAKPOINTS = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  reduce: "(prefers-reduced-motion: reduce)",
};
