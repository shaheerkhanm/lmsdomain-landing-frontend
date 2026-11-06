"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";

export interface ScreenshotFrameProps {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: "16/10" | "16/9" | "4/3" | "auto";
  title?: string;
  className?: string;
  animate?: boolean;
}

export function ScreenshotFrame({
  src,
  alt = "Product screenshot",
  width = 1200,
  height = 750,
  sizes = "(min-width: 1280px) 1120px, (min-width: 1024px) 960px, 92vw",
  priority = false,
  aspectRatio = "16/10",
  title = "lmsdomain.com",
  className,
  animate = true,
}: ScreenshotFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src && !imageFailed);

  const aspectClass =
    aspectRatio === "16/10"
      ? "aspect-[16/10]"
      : aspectRatio === "16/9"
      ? "aspect-video"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "";

  const frameContent = (
    <div
      className={cn(
        "relative rounded-2xl sm:rounded-3xl bg-white border border-[#EAE8E2] shadow-[0_20px_50px_-15px_rgba(22,22,22,0.08)] overflow-hidden font-urbanist w-full",
        className
      )}
    >
      {/* Browser Chrome Header */}
      <div className="h-10 sm:h-11 px-4 sm:px-5 bg-[#F9F9F7] border-b border-[#EAE8E2] flex items-center justify-between select-none">
        {/* Window controls (Traffic lights) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E5E5E0] border border-[#D5D5D0]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E5E5E0] border border-[#D5D5D0]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E5E5E0] border border-[#D5D5D0]" />
        </div>

        {/* URL Pill */}
        <div className="px-3 sm:px-4 py-1 rounded-md bg-white border border-[#EAE8E2] text-[11px] sm:text-xs text-[#6B6F76] font-medium tracking-tight truncate max-w-[200px] sm:max-w-[280px] text-center shadow-2xs">
          {title}
        </div>

        {/* Empty balancer */}
        <div className="w-10 sm:w-12" aria-hidden="true" />
      </div>

      {/* Frame Screen Area */}
      <div className={cn("relative w-full bg-[#FAF9F6] overflow-hidden", aspectClass)}>
        {showImage && src ? (
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
          /* Neutral Placeholder (logs nothing, renders clearly) */
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
      className="w-full"
    >
      {frameContent}
    </motion.div>
  );
}

export default ScreenshotFrame;
