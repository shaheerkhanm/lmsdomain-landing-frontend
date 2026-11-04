"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { DOMIE_MASCOT } from "@/content/ai/mascot";

export interface DomieOrbProps {
  /** Size in pixels (both width and height) */
  size: number;
  /** "lg" uses 360px transparent asset; "sm" uses 96px cropped transparent asset. Defaults to "sm" if size <= 64, else "lg" */
  variant?: "lg" | "sm";
  /** Optional surface prop retained for backward compatibility if any, but unused (no background box/disc) */
  surface?: "dark" | "light";
  /** Soft pulse animation while Domie is generating / answering */
  thinking?: boolean;
  /** Accessible label. If omitted, marked decorative (aria-hidden) */
  label?: string;
  /** Custom className */
  className?: string;
  /** Eager loading above the fold (e.g. /ai hero) */
  eager?: boolean;
}

export function DomieOrb({
  size,
  variant,
  surface,
  thinking = false,
  label,
  className = "",
  eager = false,
}: DomieOrbProps) {
  const motionReduced = useReducedMotion();
  const [isReduced, setIsReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const shouldReduceMotion = isReduced || Boolean(motionReduced);
  const isSmall = (variant ?? (size <= 64 ? "sm" : "lg")) === "sm";

  const stillSrc = isSmall ? DOMIE_MASCOT.smStill : DOMIE_MASCOT.lgStill;
  const animSrc = isSmall ? DOMIE_MASCOT.sm : DOMIE_MASCOT.lg;

  // Thinking pulse animation: 1 -> 1.06 -> 1, 1.2s ease-in-out, repeating
  const animatePulse =
    !shouldReduceMotion && thinking
      ? {
          scale: [1, 1.06, 1],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        }
      : { scale: 1 };

  return (
    <motion.span
      animate={animatePulse}
      className={`inline-flex items-center justify-center shrink-0 select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
    >
      <picture className="contents">
        <source srcSet={stillSrc} media="(prefers-reduced-motion: reduce)" />
        <img
          src={shouldReduceMotion ? stillSrc : animSrc}
          alt={label || ""}
          width={size}
          height={size}
          decoding="async"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="block select-none pointer-events-none object-contain"
          style={{ width: size, height: size }}
        />
      </picture>
    </motion.span>
  );
}

export default DomieOrb;
