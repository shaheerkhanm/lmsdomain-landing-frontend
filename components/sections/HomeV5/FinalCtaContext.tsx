"use client";

import React, { createContext, useContext } from "react";
import { HOME_DEFAULTS, type HomeSections } from "@/content/home-sections";

// The closing call to action shown on every page. Loaded once in the root layout
// (Admin > Website > Home > Sections > "All pages: Closing call to action").
const FinalCtaContext = createContext<HomeSections["finalCta"]>(HOME_DEFAULTS.finalCta);

export function FinalCtaProvider({ value, children }: { value: HomeSections["finalCta"]; children: React.ReactNode }) {
  return <FinalCtaContext.Provider value={value}>{children}</FinalCtaContext.Provider>;
}

export const useFinalCta = () => useContext(FinalCtaContext);
