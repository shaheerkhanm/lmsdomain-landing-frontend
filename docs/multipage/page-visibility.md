# Page Visibility System (Admin > Settings > Pages)

## 1. Overview
Implements dynamic page visibility management configured in **Admin > Settings > Pages** (backed by `getSiteSettings().pages: [{ slug, path, visible, whenHidden }]`).

When a page is toggled off:
- It disappears from desktop and mobile navigation menus (`Header.tsx`).
- It is filtered out from footer navigation links (`FooterSection.tsx`). If all links in a column are hidden, the column drops and the remaining columns rebalance.
- It is excluded from `sitemap.xml` (`sitemap.ts`).
- Direct navigation to the route triggers either a redirect to `/` (`whenHidden: "home"`) or a `notFound()` 404 (`whenHidden: "404"`).
- Internal links across all pages adapt:
  - Links to hidden pages disappear or are suppressed.
  - Buttons pointing to `/contact` (e.g. Careers CTA, Pricing enterprise CTA, 404 action button) safely fall back to opening the interactive Request Demo modal rather than breaking or redirecting.
  - Auth page links between `/login` and `/signup` hide cleanly when either route is toggled off.

### Permanent Safeguards (Locked Pages)
Per prompt specification, core pages essential for legal and site operations are **locked** and remain permanently visible regardless of CMS API settings or environment overrides:
- `home` (`/`)
- `privacy-policy` (`/privacy-policy`)
- `terms` (`/terms`)

Fail-open behavior is preserved: if the CMS returns no pages array or the backend is unreachable, all pages remain visible.

---

## 2. Fixture Override (Local Development & QA)
For testing without a backend, `.env.local` / process env overrides can simulate any CMS page state:
- `PAGES_HIDDEN=pricing,about` (comma-separated slugs of pages to hide)
- `PAGES_WHEN_HIDDEN_PRICING=404` (sets `whenHidden` behavior for specific slug; default is `"home"`)
- `PAGES_WHEN_HIDDEN=404` (sets default `whenHidden` behavior for all hidden slugs)

Locked pages (`home`, `privacy-policy`, `terms`) ignore `PAGES_HIDDEN`.

---

## 3. Files Modified and Created

### Core Architecture & Types
- `types/content.ts`: Added `PageVisibilitySetting` and `pages?: PageVisibilitySetting[]` to `SiteSettings`.
- `lib/api/content.ts`: Updated `getSiteSettings()` to fetch `"pages"` and `"site-pages"` CMS slugs and extract typed page settings.
- `lib/pages.ts`: Single source of truth for site pages, locked pages, path matching (supporting query params, hash anchors, absolute own-domain URLs, child routes), `guardPage(slug)` and `guardMetadata(slug)`.
- `lib/pages-context.tsx`: Client-side context `PageVisibilityProvider` and `usePageVisibility()` hook initialized server-side in `app/layout.tsx` to prevent hydration mismatches and layout flashes.
- `components/common/SiteLink.tsx`: Reusable `<SiteLink>` component that renders `<Link>` only when target path is visible.
- `app/layout.tsx`: Root layout made `async`, fetches page visibility server-side, and wraps tree in `<PageVisibilityProvider>`.

### Page Route Guards
Added `await guardPage("<slug>")` and `await guardMetadata("<slug>")` to each hideable route:
- `app/(marketing)/features/page.tsx` (`features`)
- `app/(marketing)/ai/page.tsx` (`ai`)
- `app/(marketing)/pricing/page.tsx` (`pricing`)
- `app/(marketing)/about/page.tsx` (`about`)
- `app/(marketing)/contact/page.tsx` (`contact`)
- `app/(auth)/login/page.tsx` (`login`)
- `app/(auth)/signup/page.tsx` (`signup`)
- `app/(auth)/forgot-password/page.tsx` (`login` — hidden when login is hidden)
- `app/(marketing)/[legal]/page.tsx` (`refund-policy`, `dpa`; terms/privacy are locked)

### Navigation & Sitemaps
- `components/layout/Header.tsx`: Filters `navigationConfig.marketingNav` with `isPathVisible(item.href)` on desktop and mobile drawer; hides Log in link when login is hidden.
- `components/layout/common/FooterSection.tsx`: Filters `DEFAULT_FOOTER_COLUMNS` with `isPathVisible(link.href)`. Drops empty columns and rebalances grid (`grid-cols-1 sm:grid-cols-3` -> `sm:grid-cols-2` -> `grid-cols-1`).
- `app/sitemap.ts`: Filters `staticMarketingRoutes` and `legalRoutes` using `isPathVisibleWithMap`.

### Cross-Page Links & Modal Fallbacks
- `components/marketing/FeaturesHero.tsx`: Hides `/pricing` comparison button when pricing is hidden.
- `components/marketing/AiHero.tsx`: Hides `/pricing` secondary CTA when pricing is hidden.
- `components/marketing/AiAvailability.tsx`: Hides `/pricing` CTA when pricing is hidden.
- `components/marketing/AiMidPageCta.tsx`: Hides `/ai` link when AI page is hidden.
- `components/marketing/AiSpotlightSection.tsx`: Uses `<SiteLink>` for `/ai` link.
- `components/marketing/AiRelatedTools.tsx`: Filters items by `isPathVisible(item.href)`. Entire section disappears when all tools point to hidden pages.
- `components/sections/HomePage/Banner/BannerGridSection.tsx`: Hides `/features` button when features is hidden.
- `components/sections/HomePage/TestimonialSection/TestimonialSection.tsx`: Hides `/features` integration link when features is hidden.
- `components/sections/HomePage/CustomerSection/CustomerCard.tsx`: Hides `/pricing` link when pricing is hidden.
- `components/marketing/AboutCareers.tsx`: When `/contact` is hidden, CTA button opens the Request Demo modal.
- `components/marketing/PricingEmptyState.tsx`: When `/contact` is hidden, secondary CTA opens the Request Demo modal.
- `components/marketing/PricingEnterprise.tsx`: When `/contact` is hidden, secondary CTA opens the Request Demo modal.
- `components/marketing/PricingCard.tsx`: When `/contact` or `/signup` is hidden, CTA triggers demo modal.
- `components/marketing/PricingComparisonTable.tsx`: When `/signup` is hidden, table CTA triggers demo modal.
- `components/marketing/NotFoundActions.tsx` & `app/not-found.tsx`: When `/contact` is hidden, "Contact us" opens the Request Demo modal.
- `components/marketing/CentralLoginForm.tsx`: Hides link to `/signup` when signup is hidden.
- `components/marketing/AuthLoginForm.tsx`: Hides link to `/signup` when signup is hidden.
- `components/marketing/AuthSignupForm.tsx`: Hides link to `/login` when login is hidden.
- `components/marketing/ForgotPasswordForm.tsx`: Hides link to `/login` when login is hidden.

---

## 4. Verification Test Results

An automated end-to-end verification script (`scripts/verify-page-visibility.mjs`) tested all scenarios via Playwright against the local Next.js server:

| # | Test Scenario | Verified Behavior | Status |
|---|---|---|---|
| 1 | **Baseline (All visible)** | Header nav contains `[ '/features', '/ai', '/pricing', '/about', '/contact', '/login' ]`. Footer renders 3 columns. All pages respond 200 OK. | **PASS** |
| 2 | **PAGES_HIDDEN=pricing (`whenHidden: "home"`)** | Direct visit to `/pricing` redirects (307) to `/`. Header pill & drawer contain no pricing link. Footer contains no pricing or FAQ links. `/features` hero and `/ai` hero/availability drop pricing CTAs. `sitemap.xml` contains zero references to `/pricing`. | **PASS** |
| 3 | **PAGES_HIDDEN=pricing (`PAGES_WHEN_HIDDEN_PRICING=404`)** | Direct visit to `/pricing` returns HTTP 404 status and renders 404 error page. | **PASS** |
| 4 | **PAGES_HIDDEN=about,pricing,features** | Header nav clean with only `[ '/ai', '/contact', '/login' ]`. Footer drops empty columns cleanly; no broken grid. | **PASS** |
| 5 | **PAGES_HIDDEN=contact** | Subpage "Contact us" and Careers buttons open the interactive Request Demo modal (`role="dialog"`). 404 page "Contact us" button triggers the Request Demo modal. | **PASS** |
| 6 | **Locked pages (`PAGES_HIDDEN=terms,privacy-policy,home`)** | `home` (`/`), `/terms`, and `/privacy-policy` remain 200 OK and fully accessible despite being present in `PAGES_HIDDEN`. | **PASS** |

### Evidence Screenshots
Screenshots saved to `docs/multipage/evidence/page-visibility/`:
- `01-all-visible-header.png`: Full header with all nav items present
- `02-pricing-hidden-header.png`: Header with pricing item removed
- `03-three-hidden-header.png`: Header with about, pricing, features removed
- `04-pricing-hidden-footer.png`: Footer with pricing and FAQ links removed
- `05-three-hidden-footer.png`: Footer with 3 pages hidden, columns cleanly collapsed
- `06-pricing-hidden-ai-hero.png`: Domie AI hero with pricing CTA suppressed
- `07-pricing-hidden-features-hero.png`: Features hero with "See pricing" CTA suppressed
- `08-contact-hidden-empty-state.png`: Request Demo modal open after clicking contact action when contact is hidden
