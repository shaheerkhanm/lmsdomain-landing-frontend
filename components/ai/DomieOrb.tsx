"use client";

import React, { useEffect, useRef, useState } from "react";

export interface DomieOrbProps {
  /** Size in pixels (both width and height) */
  size: number;
  /** Surface: "light" places a dark #0E0E11 circle behind the orb so the navy glow reads against white backgrounds */
  surface?: "dark" | "light";
  /** Explicit override for the dark disc */
  darkDisc?: boolean;
  /** Optional accessible label. If omitted, marked aria-hidden */
  label?: string;
  /** Custom className */
  className?: string;
  /** Optional priority/eager hint */
  eager?: boolean;
}

export function DomieOrb({
  size,
  surface = "dark",
  darkDisc,
  label,
  className = "",
}: DomieOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReduced, setIsReduced] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const showDarkDisc = darkDisc !== undefined ? darkDisc : surface === "light";
  const isSmall = size <= 160;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setIsReduced(true);
      return;
    }
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);

    // Ensure video does not start before hero H1 is painted
    let isCancelled = false;
    let obs: IntersectionObserver | undefined;

    const startObserver = () => {
      if (isCancelled || !containerRef.current) return;

      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoadVideo(true);
              videoRef.current?.play().catch(() => {});
            } else {
              videoRef.current?.pause();
            }
          });
        },
        { threshold: 0.05 }
      );

      obs.observe(containerRef.current);
    };

    if ("requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        startObserver();
      });
      return () => {
        isCancelled = true;
        obs?.disconnect();
        mq.removeEventListener("change", handler);
      };
    } else {
      const timer = setTimeout(() => {
        startObserver();
      }, 100);
      return () => {
        isCancelled = true;
        clearTimeout(timer);
        obs?.disconnect();
        mq.removeEventListener("change", handler);
      };
    }
  }, []);

  const videoWebm = isSmall
    ? "/images/domie/domie-orb-sm.webm"
    : "/images/domie/domie-orb.webm";
  const videoMp4 = isSmall
    ? "/images/domie/domie-orb-sm.mp4"
    : "/images/domie/domie-orb.mp4";
  const poster = "/images/domie/domie-orb-poster.webp";

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "radial-gradient(circle, #000 52%, transparent 70%)",
    maskImage: "radial-gradient(circle, #000 52%, transparent 70%)",
  };

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center shrink-0 select-none pointer-events-none relative rounded-full ${
        showDarkDisc ? "bg-[#0E0E11]" : ""
      } ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
    >
      {isReduced ? (
        <img
          src={poster}
          alt={label || ""}
          width={size}
          height={size}
          className="w-full h-full object-cover rounded-full"
          style={maskStyle}
          loading="lazy"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload={shouldLoadVideo ? "auto" : "none"}
          poster={poster}
          className="w-full h-full object-cover rounded-full block"
          style={maskStyle}
        >
          {shouldLoadVideo && (
            <>
              <source src={videoWebm} type="video/webm" />
              <source src={videoMp4} type="video/mp4" />
            </>
          )}
        </video>
      )}
    </div>
  );
}

export default DomieOrb;
