"use client";

import React from "react";
import { useBrand, type Brand } from "@/lib/brand-context";

export interface BrandLogoProps {
  variant?: "wordmark" | "mark";
  tone?: "light" | "dark";
  height?: number;
  className?: string;
  alt?: string;
  brand?: Brand;
}

export function BrandLogo({
  variant = "wordmark",
  tone = "light",
  height,
  className = "",
  alt,
  brand: brandProp,
}: BrandLogoProps) {
  const contextBrand = useBrand();
  const brand = brandProp || contextBrand;

  const h = height ?? brand.logoHeight;
  const ratio = variant === "wordmark" ? brand.wordmarkRatio : brand.markRatio;
  const w = Math.round(h * ratio);

  const src =
    variant === "mark"
      ? brand.logoMark
      : tone === "dark"
      ? brand.logoDark
      : brand.logoLight;

  const altText = alt ?? brand.logoAlt;

  return (
    <img
      src={src}
      alt={altText}
      width={w}
      height={h}
      className={`object-contain shrink-0 ${className}`.trim()}
      style={{ height: `${h}px`, width: "auto" }}
    />
  );
}

export default BrandLogo;

