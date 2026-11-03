import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/api/content";
import type { PageVisibilitySetting } from "@/types/content";

export interface PageDefinition {
  slug: string;
  path: string;
  locked?: boolean;
}

export const SITE_PAGES: readonly PageDefinition[] = [
  { slug: "home", path: "/", locked: true },
  { slug: "privacy-policy", path: "/privacy-policy", locked: true },
  { slug: "terms", path: "/terms", locked: true },
  { slug: "features", path: "/features" },
  { slug: "ai", path: "/ai" },
  { slug: "pricing", path: "/pricing" },
  { slug: "custom-lms", path: "/custom-lms" },
  { slug: "about", path: "/about" },
  { slug: "contact", path: "/contact" },
  { slug: "login", path: "/login" },
  { slug: "signup", path: "/signup" },
  { slug: "refund-policy", path: "/refund-policy" },
  { slug: "dpa", path: "/dpa" },
] as const;

export interface PageVisibilityState {
  slug: string;
  path: string;
  visible: boolean;
  whenHidden: "home" | "404";
  locked: boolean;
}

export type PageVisibilityMap = Record<string, PageVisibilityState>;

export function getDefaultVisibilityMap(): PageVisibilityMap {
  const map: PageVisibilityMap = {};
  for (const page of SITE_PAGES) {
    map[page.slug] = {
      slug: page.slug,
      path: page.path,
      visible: true,
      whenHidden: "home",
      locked: Boolean(page.locked),
    };
  }
  return map;
}

export function buildVisibilityMap(
  apiPages?: PageVisibilitySetting[] | null
): PageVisibilityMap {
  const map = getDefaultVisibilityMap();

  // 1. Merge API pages if provided
  if (Array.isArray(apiPages)) {
    for (const p of apiPages) {
      const slug = p.slug?.toLowerCase().trim();
      if (!slug || !map[slug]) continue;
      // Locked pages can never be hidden
      if (map[slug].locked) continue;

      if (typeof p.visible === "boolean") {
        map[slug].visible = p.visible;
      }
      if (p.whenHidden === "404" || p.whenHidden === "home") {
        map[slug].whenHidden = p.whenHidden;
      }
    }
  }

  // 2. Local fixture override: PAGES_HIDDEN=pricing,about in .env.local
  const hiddenOverride = process.env.PAGES_HIDDEN;
  if (hiddenOverride) {
    const hiddenSlugs = new Set(
      hiddenOverride
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    );

    for (const [slug, state] of Object.entries(map)) {
      if (state.locked) continue;
      if (hiddenSlugs.has(slug)) {
        state.visible = false;
        const envWhenHidden =
          process.env[`PAGES_WHEN_HIDDEN_${slug.toUpperCase().replace(/-/g, "_")}`] ||
          process.env.PAGES_WHEN_HIDDEN;
        if (envWhenHidden === "404" || envWhenHidden === "home") {
          state.whenHidden = envWhenHidden;
        }
      }
    }
  }

  return map;
}

export async function getPageVisibility(): Promise<PageVisibilityMap> {
  try {
    const settings = await getSiteSettings().catch(() => null);
    return buildVisibilityMap(settings?.pages);
  } catch {
    // Fail open: all pages visible
    return buildVisibilityMap(null);
  }
}

export function matchPathToSlug(href: string): string | null {
  if (!href) return null;
  const trimmed = href.trim();
  if (
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("javascript:")
  ) {
    return null;
  }

  let pathname = "";
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      const host = url.hostname.toLowerCase();
      const internalHosts = [
        "lmsdomain.com",
        "www.lmsdomain.com",
        "staging.lmsdomain.online",
        "localhost",
        "127.0.0.1",
      ];
      if (process.env.SITE_URL) {
        try {
          internalHosts.push(new URL(process.env.SITE_URL).hostname.toLowerCase());
        } catch {}
      }
      const isInternal = internalHosts.some(
        (h) => host === h || host.endsWith(`.${h}`)
      );
      if (!isInternal) return null; // External link
      pathname = url.pathname;
    } catch {
      return null;
    }
  } else {
    // Relative link or hash
    const withoutHash = trimmed.split("#")[0];
    const withoutQuery = withoutHash.split("?")[0];
    pathname = withoutQuery;
  }

  if (!pathname) {
    return null; // Pure hash like "#faq"
  }

  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (normalized === "/") {
    return "home";
  }

  // Exact match
  for (const page of SITE_PAGES) {
    if (page.path !== "/" && page.path === normalized) {
      return page.slug;
    }
  }

  // Child route match
  for (const page of SITE_PAGES) {
    if (page.path !== "/" && normalized.startsWith(page.path + "/")) {
      return page.slug;
    }
  }

  return null;
}

export function isPageVisibleWithMap(
  slug: string,
  map: PageVisibilityMap
): boolean {
  const page = map[slug];
  if (!page) return true; // Unknown slug: fail open
  return page.locked || page.visible;
}

export function isPathVisibleWithMap(
  href: string,
  map: PageVisibilityMap
): boolean {
  const slug = matchPathToSlug(href);
  if (!slug) return true; // Unlisted link (anchor, external, dashboard): return true
  return isPageVisibleWithMap(slug, map);
}

export async function isPageVisible(slug: string): Promise<boolean> {
  const map = await getPageVisibility();
  return isPageVisibleWithMap(slug, map);
}

export async function isPathVisible(href: string): Promise<boolean> {
  const map = await getPageVisibility();
  return isPathVisibleWithMap(href, map);
}

export async function getWhenHidden(slug: string): Promise<"home" | "404"> {
  const map = await getPageVisibility();
  return map[slug]?.whenHidden ?? "home";
}

export async function guardPage(slug: string): Promise<void> {
  const map = await getPageVisibility();
  const page = map[slug];
  if (!page || page.locked || page.visible) {
    return;
  }

  if (page.whenHidden === "404") {
    notFound();
  } else {
    redirect("/");
  }
}

export async function guardMetadata(slug: string): Promise<Metadata | null> {
  const map = await getPageVisibility();
  const page = map[slug];
  if (page && !page.locked && !page.visible) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  return null;
}
