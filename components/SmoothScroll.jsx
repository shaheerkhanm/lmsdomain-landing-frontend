"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // 2. Check for motion test query param (?motiontest=1)
    const isTestMode = typeof window !== "undefined" && window.location.search.includes("motiontest=1");

    // 3. Initialize Lenis with autoRaf: false (single ticker control)
    const lenis = new Lenis({
      lerp: isTestMode ? 1 : 0.08,
      duration: isTestMode ? 0 : 1.1,
      smoothWheel: !isTestMode,
      smoothTouch: false,
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    // Expose for testing per spec §8.2
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
      window.__st = ScrollTrigger;
    }

    // 4. Wire single ticker per spec §5.0:
    lenis.on("scroll", ScrollTrigger.update);

    const tickerHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
