"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface FeatureVideoLoopProps {
  src: string;
  poster: string;
  label?: string;
  alt: string;
  className?: string;
}

export function FeatureVideoLoop({
  src,
  poster,
  label = "Product preview",
  alt,
  className = "",
}: FeatureVideoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
        if (e.matches && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      };
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // IntersectionObserver at 50% threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isReducedMotion]);

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-[20px] overflow-hidden bg-slate-900 border border-[#ECEDEF] shadow-xl group ${className}`}
    >
      {/* Browser Bar with Three Dots */}
      <div className="bg-white/95 backdrop-blur-xs px-3.5 py-2 border-b border-[#ECEDEF] flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-[#6B6F76]">
          {label}
        </span>
      </div>

      {/* Video Content / Poster for Reduced Motion */}
      <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
        {isReducedMotion ? (
          <Image
            src={poster}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="none"
              aria-label={alt}
              className="w-full h-full object-cover"
            />
            {/* Play/Pause control for accessibility */}
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause video loop" : "Play video loop"}
              className="absolute bottom-2.5 right-2.5 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 translate-x-0.5" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FeatureVideoLoop;

