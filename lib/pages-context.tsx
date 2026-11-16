"use client";

import React, { createContext, useContext, useMemo } from "react";
import {
  PageVisibilityMap,
  getDefaultVisibilityMap,
  isPageVisibleWithMap,
  isPathVisibleWithMap,
} from "./pages";

interface PageVisibilityContextValue {
  visibility: PageVisibilityMap;
  isPageVisible: (slug: string) => boolean;
  isPathVisible: (href: string) => boolean;
}

const PageVisibilityContext = createContext<PageVisibilityContextValue>({
  visibility: getDefaultVisibilityMap(),
  isPageVisible: () => true,
  isPathVisible: () => true,
});

export function PageVisibilityProvider({
  visibility,
  children,
}: {
  visibility?: PageVisibilityMap;
  children: React.ReactNode;
}) {
  const map = visibility || getDefaultVisibilityMap();

  const value = useMemo(
    () => ({
      visibility: map,
      isPageVisible: (slug: string) => isPageVisibleWithMap(slug, map),
      isPathVisible: (href: string) => isPathVisibleWithMap(href, map),
    }),
    [map]
  );

  return (
    <PageVisibilityContext.Provider value={value}>
      {children}
    </PageVisibilityContext.Provider>
  );
}

export function usePageVisibility() {
  return useContext(PageVisibilityContext);
}
