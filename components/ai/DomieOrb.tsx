"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DOMIE_MASCOT } from "@/content/ai/mascot";

export interface DomieOrbProps {
  /** Size in pixels (both width and height) */
  size: number;
  /** "lg" uses 480px asset with full glow; "sm" uses 160px cropped asset. Defaults to "sm" if size <= 64, else "lg" */
  variant?: "lg" | "sm";
  /** "dark" uses mix-blend-mode: screen on dark background; "light" wraps in a round #161616 disc */
  surface: "dark" | "light";
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
  const chosenVariant = variant ?? (size <= 64 ? "sm" : "lg");
  const sources = DOMIE_MASCOT[chosenVariant];

  const shouldReduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [inViewportRange, setInViewportRange] = useState(eager);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playFailed, setPlayFailed] = useState(false);

  // IntersectionObserver for preloading (within 200px) and playback (in viewport)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = wrapperRef.current;
    if (!el) return;

    // 1. Preload observer (rootMargin 200px)
    let preloadObserver: IntersectionObserver | null = null;
    if (!eager) {
      preloadObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setInViewportRange(true);
            preloadObserver?.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      preloadObserver.observe(el);
    }

    // Trigger video load if inViewportRange changes
    if (inViewportRange && videoRef.current) {
      videoRef.current.preload = "auto";
    }

    // 2. Playback observer
    const playbackObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;

        if (entry?.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setPlayFailed(false);
              })
              .catch(() => {
                // Autoplay rejection (e.g. Safari strict policy before user gesture)
                setPlayFailed(true);
              });
          }
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );
    playbackObserver.observe(el);

    return () => {
      preloadObserver?.disconnect();
      playbackObserver.disconnect();
    };
  }, [eager, shouldReduceMotion]);

  // Accessibility props
  const accessibilityProps = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const };

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

  // Light surface container styles (round #161616 disc; large discs get purple glow shadow)
  const isLight = surface === "light";
  const lightShadow =
    isLight && chosenVariant === "lg"
      ? "shadow-[0_20px_60px_rgba(123,92,245,0.30)]"
      : "";

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    ...(isLight
      ? {
          borderRadius: "50%",
          backgroundColor: "#161616",
          overflow: "hidden",
        }
      : {}),
  };

  const mediaStyle: React.CSSProperties = {
    width: size,
    height: size,
    objectFit: "cover",
    display: "block",
    ...(surface === "dark" ? { mixBlendMode: "screen" } : {}),
    ...(isLight ? { borderRadius: "50%" } : {}),
  };

  // If reduced motion is preferred or video play failed completely, render the poster image
  if (shouldReduceMotion || playFailed) {
    return (
      <motion.div
        ref={wrapperRef}
        {...accessibilityProps}
        animate={animatePulse}
        className={`inline-flex items-center justify-center shrink-0 ${lightShadow} ${className}`}
        style={containerStyle}
      >
        <img
          src={sources.poster}
          alt={label || ""}
          width={size}
          height={size}
          fetchPriority={eager ? "high" : "auto"}
          loading={eager ? "eager" : "lazy"}
          style={mediaStyle}
          className="select-none pointer-events-none"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={wrapperRef}
      {...accessibilityProps}
      animate={animatePulse}
      className={`inline-flex items-center justify-center shrink-0 ${lightShadow} ${className}`}
      style={containerStyle}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "auto" : inViewportRange ? "auto" : "none"}
        poster={sources.poster}
        width={size}
        height={size}
        disablePictureInPicture
        style={mediaStyle}
        className="select-none pointer-events-none"
      >
        <source src={sources.webm} type="video/webm" />
        <source src={sources.mp4} type="video/mp4" />
      </video>
    </motion.div>
  );
}

export default DomieOrb;
