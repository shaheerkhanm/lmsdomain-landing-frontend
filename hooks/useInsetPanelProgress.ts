"use client";

import { useEffect, useRef, useState } from "react";

export function useInsetPanelProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) {
      if (panelRef.current) {
        panelRef.current.style.transform = "none";
        panelRef.current.style.clipPath = "none";
        (panelRef.current.style as any).WebkitClipPath = "none";
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "none";
      }
      return;
    }

    let ticking = false;

    const applyProgress = () => {
      if (!containerRef.current || !panelRef.current) {
        ticking = false;
        return;
      }

      // Container bounding rect (container does NOT have transform applied)
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Entry: rect.top travels from 1.0 * vh to 0.20 * vh
      // rect.top >= vh -> entryP = 0
      // rect.top <= 0.20 * vh -> entryP = 1
      const entryP = Math.max(0, Math.min(1, (vh - rect.top) / (0.80 * vh)));

      // Exit: rect.bottom travels from 0.80 * vh to 0.0 * vh
      // rect.bottom >= 0.80 * vh -> exitP = 1
      // rect.bottom <= 0 -> exitP = 0
      const exitP = Math.max(0, Math.min(1, rect.bottom / (0.80 * vh)));

      const p = Math.min(entryP, exitP);

      // Smooth ease-out quad curve
      const eased = p * (2 - p);

      const scale = 0.94 + 0.06 * eased;
      const maxMargin = Math.max(16, Math.min(40, window.innerWidth * 0.03));
      const sideMargin = maxMargin * (1 - eased);
      const radius = 40 * (1 - eased);

      // Panel transform and clipPath
      const panel = panelRef.current;
      panel.style.transform = `scale(${scale.toFixed(4)})`;

      if (p >= 0.999) {
        panel.style.clipPath = "none";
        (panel.style as any).WebkitClipPath = "none";
      } else {
        const clipVal = `inset(0px ${sideMargin.toFixed(1)}px 0px ${sideMargin.toFixed(1)}px round ${radius.toFixed(1)}px)`;
        panel.style.clipPath = clipVal;
        (panel.style as any).WebkitClipPath = clipVal;
      }

      // Inner content fades and rises in second half of entry (p in [0.5, 1.0])
      if (contentRef.current) {
        // When offscreen below viewport on initial load, keep opacity: 1 for axe-core accessibility
        if (rect.top >= vh) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "none";
        } else {
          const contentP = Math.max(0, Math.min(1, (p - 0.5) / 0.5));
          const contentOpacity = 0.2 + 0.8 * contentP;
          const contentTranslateY = 24 * (1 - contentP);
          contentRef.current.style.opacity = contentOpacity.toFixed(3);
          contentRef.current.style.transform = `translateY(${contentTranslateY.toFixed(1)}px)`;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyProgress);
      }
    };

    // Initial calculation
    applyProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { containerRef, panelRef, contentRef, isReducedMotion };
}
