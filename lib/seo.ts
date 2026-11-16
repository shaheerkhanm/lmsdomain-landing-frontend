// ============================================================================
// Page metadata with Admin > SEO overrides (server-side only).
// The page's built-in title/description are the default; an Admin > SEO entry
// with the same slug can replace them and set the share image or noindex.
// A page hidden in Admin > Pages gets noindex.
// ============================================================================

import type { Metadata } from "next";
import { fetchSeo } from "@/lib/api/content";
import { applySeo } from "@/lib/site";
import { guardMetadata } from "@/lib/pages";

interface PageSeoOptions {
  /** Admin > SEO slug, e.g. "platform-teach" */
  seo: string;
  /** Admin > Pages slug that controls visibility, e.g. "platform" */
  guard?: string;
  /** Share image template key (lib/og.ts OG_PAGES); defaults to `seo` */
  image?: string;
}

export async function pageMetadata(base: Metadata, { seo: slug, guard, image }: PageSeoOptions): Promise<Metadata> {
  if (guard) {
    const hidden = await guardMetadata(guard);
    if (hidden) return hidden;
  }
  const seo = await fetchSeo(slug).catch(() => null);
  const out = await applySeo(base, seo, { overrideText: true, page: image || slug });
  // Keep share titles in step with an admin override
  const title = typeof out.title === "string" ? out.title : undefined;
  const description = out.description ?? undefined;
  out.openGraph = { ...(out.openGraph || {}), ...(title && { title }), ...(description && { description }) };
  out.twitter = { ...(out.twitter || {}), ...(title && { title }), ...(description && { description }) };
  return out;
}
