// ============================================================================
// Site navigation (Admin > Settings > "Site navigation: Menu and footer"):
// the top menu and the footer link columns, in one CMS entry (slug site-navigation).
// The admin's lists win once they pass the checks below; anything broken falls back
// to the built-in menu (content/navigation.ts), so a bad edit can't empty the header.
//   marketingNav: top items. An item with sub-items is a dropdown group; one without is a link.
//                 Groups named Platform, Solutions and Resources keep their special panels.
//   footerColumns: { title, links: [{ title, href }] }
// Links must be a page on this site ("/pricing", "/platform#x") or a full https:// address.
// ============================================================================

import { navigationConfig, DEFAULT_FOOTER_COLUMNS, type FooterColumn, type NavItem } from "./navigation";

export const SITE_NAV_SLUG = { slug: "site-navigation", label: "Site navigation: Menu and footer" };

export interface SiteNavContent {
  marketingNav: NavItem[];
  footerColumns: FooterColumn[];
}

const str = (v: unknown) => String(v ?? "").trim();
const okHref = (h: string) => /^\/[^\s]*$/.test(h) || /^https:\/\/\S+$/i.test(h);

/** Built-in menu and footer in the shape the admin edits: every item has the same fields. */
export function navDefaults(): SiteNavContent {
  return {
    marketingNav: navigationConfig.marketingNav.map((item) => ({
      label: item.label,
      href: item.href || "",
      badge: item.badge || "",
      children: (item.children || []).map((c) => ({ label: c.label, href: c.href, description: c.description || "", badge: c.badge || "" })),
    })),
    footerColumns: JSON.parse(JSON.stringify(DEFAULT_FOOTER_COLUMNS)),
  };
}

function cleanNav(list: unknown): NavItem[] | null {
  if (!Array.isArray(list)) return null;
  const items: NavItem[] = [];
  for (const raw of list as Record<string, unknown>[]) {
    const label = str(raw?.label);
    if (!label) continue;
    const children = (Array.isArray(raw?.children) ? (raw.children as Record<string, unknown>[]) : [])
      .map((c) => ({ label: str(c?.label), href: str(c?.href), description: str(c?.description) || undefined, badge: str(c?.badge) || undefined }))
      .filter((c) => c.label && okHref(c.href));
    if (children.length) {
      items.push({ label, badge: str(raw?.badge) || undefined, children });
    } else {
      const href = str(raw?.href);
      if (okHref(href)) items.push({ label, href, badge: str(raw?.badge) || undefined });
    }
  }
  // The old site's flat menu (no dropdowns) doesn't fit the v5 header: use the built-in menu
  return items.some((i) => i.children && i.children.length) ? items : null;
}

function cleanFooter(list: unknown): FooterColumn[] | null {
  if (!Array.isArray(list)) return null;
  const cols = (list as Record<string, unknown>[])
    .map((c) => ({
      title: str(c?.title),
      links: (Array.isArray(c?.links) ? (c.links as Record<string, unknown>[]) : [])
        .map((l) => ({ title: str(l?.title), href: str(l?.href) }))
        .filter((l) => l.title && okHref(l.href)),
    }))
    .filter((c) => c.title && c.links.length);
  return cols.length ? cols : null;
}

/** The admin's menu and footer over the built-in ones, each checked separately. */
export function mergeNavigation(admin: unknown): SiteNavContent {
  const base = navDefaults();
  const a = (admin && typeof admin === "object" ? admin : {}) as Record<string, unknown>;
  return {
    marketingNav: cleanNav(a.marketingNav) || navigationConfig.marketingNav,
    footerColumns: cleanFooter(a.footerColumns) || base.footerColumns,
  };
}
