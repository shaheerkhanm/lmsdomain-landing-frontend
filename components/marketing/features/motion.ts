/**
 * Features Redesign (v3) Shared Motion System
 * Adheres to §5.0 Motion Ownership Rules:
 * - GSAP owns scroll-linked and pinned motion (Hero assembly, AI scrollytelling, horizontal journey, sticky chapters, dark reveal).
 * - Motion (framer-motion) owns UI state transitions (tabs, palette, layout swaps, hover springs).
 */

export const FEATURES_EASE = [0.22, 1, 0.36, 1] as const;
export const FEATURES_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

export const FEATURES_DURATIONS = {
  fast: 0.5,
  medium: 0.8,
  slow: 1.2,
} as const;

export const FEATURES_STAGGER = 0.06;
export const FEATURES_RISE_PX = 24;

export const FEATURES_COLORS = {
  ink: "#161616",
  accent: "#7B5CF5",
  grayBg: "#F3F4F6",
  bodyText: "#6B6F76",
  unlitText: "#C9CCD1",
  pills: {
    yellow: "#F3CF74",
    purple: "#8E7CF8",
    mint: "#A6E3D3",
  },
} as const;
