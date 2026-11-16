"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";
import { MockupCaption } from "@/components/marketing/mockups/MockupCaption";

export interface ScreenshotFrameProps {
  src?: string | null;
  screen?: React.ReactNode;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: "16/10" | "16/9" | "4/3" | "auto";
  title?: string;
  className?: string;
  animate?: boolean;
  showCaption?: boolean;
}

export function ScreenshotFrame({
  src,
  screen,
  alt = "Product screenshot",
  width = 1200,
  height = 750,
  sizes = "(min-width: 1280px) 1120px, (min-width: 1024px) 960px, 92vw",
  priority = false,
  aspectRatio = "16/10",
  title = "lmsdomain.com",
  className,
  animate = true,
  showCaption = true,
}: ScreenshotFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src && !imageFailed);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !screen && !src) {
      console.warn(
        `[ScreenshotFrame] No screen or src provided for "${title}". Rendering fallback placeholder.`
      );
    }
  }, [screen, src, title]);

  useEffect(() => {
    if (!screen) return;
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const clientW = el.clientWidth;
      if (clientW > 0) {
        setScale(clientW / 1024);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [screen]);

  const aspectClass =
    aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "";

  const frameContent = (
    <div className="w-full max-w-full min-w-0 overflow-hidden">
      <div
        className={cn(
          "relative rounded-[20px] bg-white border border-[#E8E8EC] shadow-[0_50px_100px_-40px_rgba(20,20,40,0.28),0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden font-sans w-full max-w-full min-w-0",
          className
        )}
      >
        {/* Browser Chrome Header */}
        <div className="h-10 sm:h-11 px-4 sm:px-5 bg-[#FBFBFC] border-b border-[#E8E8EC] flex items-center justify-between select-none">
          {/* Window controls (Traffic lights) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8E8EC] border border-[#DADAE0]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8E8EC] border border-[#DADAE0]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E8E8EC] border border-[#DADAE0]" />
          </div>

          {/* URL Pill */}
          <div className="px-3 sm:px-4 py-1 rounded-md bg-white border border-[#E8E8EC] text-[11px] sm:text-xs text-[#535361] font-medium tracking-tight truncate max-w-[200px] sm:max-w-[280px] text-center shadow-2xs font-mono">
            {title}
          </div>

          {/* Empty balancer */}
          <div className="w-10 sm:w-12" aria-hidden="true" />
        </div>

        {/* Frame Screen Area */}
        <div
          className={cn(
            "relative w-full max-w-full min-w-0 bg-[#FAF9F6] overflow-clip [contain:paint]",
            aspectClass
          )}
        >
          {screen ? (
            /* Render coded React Mockup with CSS transform scaling */
            <div
              ref={containerRef}
              className="w-full h-full relative overflow-clip [contain:paint] pointer-events-none"
            >
              <div
                style={{
                  width: "1024px",
                  height: "640px",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
                className="absolute top-0 left-0"
              >
                {screen}
              </div>
            </div>
          ) : showImage && src ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              priority={priority}
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            /* Neutral Placeholder (fallback only when no screen or src) */
            <div className="w-full h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[460px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#FAF9F6] to-[#F3F4F6] border-t border-[#F0EFEA]">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#EAE8E2] shadow-xs flex items-center justify-center text-[#8F94A0] mb-3">
                <Monitor className="size-6 text-[#8F94A0]" />
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#161616]">
                Screenshot coming
              </p>
              <p className="text-xs text-[#6B6F76] mt-1 max-w-[280px]">
                {/* TODO(content): replace with production screenshot */}
                Live academy product view will render here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shared caption for all mockups */}
      {showCaption && screen && <MockupCaption />}
    </div>
  );

  if (!animate) {
    return frameContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-full min-w-0"
    >
      {frameContent}
    </motion.div>
  );
}

export default ScreenshotFrame;
