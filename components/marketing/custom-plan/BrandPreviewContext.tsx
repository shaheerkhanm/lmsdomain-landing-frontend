"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface BrandPreviewContextType {
  brandName: string;
  brandColor: string;
  setBrandName: (name: string) => void;
  setBrandColor: (color: string) => void;
}

const BrandPreviewContext = createContext<BrandPreviewContextType | undefined>(undefined);

export function BrandPreviewProvider({
  children,
  defaultName = "Your Academy",
  defaultColor = "#7B5CF5",
}: {
  children: React.ReactNode;
  defaultName?: string;
  defaultColor?: string;
}) {
  const [brandName, setBrandName] = useState(defaultName);
  const [brandColor, setBrandColor] = useState(defaultColor);

  const value = useMemo(
    () => ({
      brandName,
      brandColor,
      setBrandName,
      setBrandColor,
    }),
    [brandName, brandColor]
  );

  return (
    <BrandPreviewContext.Provider value={value}>
      {children}
    </BrandPreviewContext.Provider>
  );
}

export function useBrandPreview() {
  const context = useContext(BrandPreviewContext);
  if (!context) {
    return {
      brandName: "Your Academy",
      brandColor: "#7B5CF5",
      setBrandName: () => {},
      setBrandColor: () => {},
    };
  }
  return context;
}

