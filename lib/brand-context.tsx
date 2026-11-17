"use client";

import React, { createContext, useContext } from "react";

export interface Brand {
  logoLight: string;
  logoDark: string;
  logoMark: string;
  logoAlt: string;
  logoHeight: number;
  wordmarkRatio: number;
  markRatio: number;
  themeColor: string;
  themeColorDark: string;
}

export const DEFAULT_BRAND: Brand = {
  logoLight: "/brand/logo-wordmark-96.webp",
  logoDark: "/brand/logo-wordmark-dark-96.webp",
  logoMark: "/brand/logo-mark-128.webp",
  logoAlt: "LMS Domain",
  logoHeight: 26,
  wordmarkRatio: 1534 / 250, // 6.136
  markRatio: 1, // 512 / 512 = 1.0
  themeColor: "#FFFFFF",
  themeColorDark: "#161616",
};

const BrandContext = createContext<Brand>(DEFAULT_BRAND);

export function BrandProvider({
  brand,
  children,
}: {
  brand?: Brand;
  children: React.ReactNode;
}) {
  return (
    <BrandContext.Provider value={brand || DEFAULT_BRAND}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand(): Brand {
  return useContext(BrandContext);
}

