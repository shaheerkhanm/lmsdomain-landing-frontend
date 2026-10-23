"use client";

import React, { createContext, useContext } from "react";

// Admin content for client sections that import their copy deep in the tree
// (the homepage). The server page fills it from the CMS; components fall back
// to their built-in content when a slug is missing.
const PageContentContext = createContext<Record<string, unknown>>({});

export function PageContentProvider({
  value,
  children,
}: {
  value: Record<string, unknown>;
  children: React.ReactNode;
}) {
  return <PageContentContext.Provider value={value}>{children}</PageContentContext.Provider>;
}

export function useSectionContent<T>(slug: string, fallback: T): T {
  const value = useContext(PageContentContext)[slug];
  return (value === undefined ? fallback : value) as T;
}
