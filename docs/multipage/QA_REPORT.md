# Multipage Marketing Site — QA Report

**Branch:** `feature/multipage`
**Date:** 2026-10-22
**Sources:** production build, Playwright run against a local production server, HTML inspection of server responses, internal link check, code inspection.

> [!IMPORTANT]
> The first version of this report (prompt 08) marked every route × width cell **PASS** although no browser had run. This version keeps **PASS** only for checks that actually ran, and says how each one was checked. Anything checked by reading code only is labelled **Code inspection only**. Anything not checked at all is labelled **Not run**.

---

## How to reproduce

```bash
npm run build
npm run qa:screens        # scripts/qa-screens.mjs
```

`qa:screens` uses the production server at `http://localhost:3001`. If nothing answers there, it runs `next build`, copies `public/` and `.next/static/` into `.next/standalone/` and starts `node server.js` on port 3001 with `BACKEND_URL=http://127.0.0.1:5201`, the way the Dockerfile does (`next start` does not work with `output: "standalone"`), and stops it afterwards. It opens 13 routes at 375, 414, 768, 1024, 1280, 1440 and 1920 px, plus 390 and 1440 px with `reducedMotion: "reduce"` (117 captures), and writes:

- `docs/multipage/evidence/qa/<route>/<width>.png` and `<width>-reduced.png`: full-page screenshots (`home` = `/`)
- `docs/multipage/evidence/qa/results.json`: per capture: HTTP status, `scrollWidth` vs `innerWidth` as shipped **and** with the `html, body { overflow-x: clip }` rule lifted, the elements that extend past the viewport, console errors, failed same-origin requests; plus homepage scroll/pin checks

Robots / sitemap / metadata checks (section 6) were run against `next start` with different `SITE_URL` values:

```bash
SITE_URL=https://lmsdomain.com npm run build
SITE_URL=https://lmsdomain.com APP_LOGIN_URL=https://app.lmsdomain.test/login \
  BACKEND_URL=http://127.0.0.1:5201 npx next start -p 3005
curl -s localhost:3005/robots.txt
```

---

## 1. Route × width (Playwright, measured)

A cell is **PASS** when the page loaded with the expected status, nothing extends past the right edge of the viewport even with the global overflow clip lifted, there are no unexpected console errors, and no same-origin request failed.

| Route | Status | 375 | 414 | 768 | 1024 | 1280 | 1440 | 1920 | 390 reduced | 1440 reduced |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/features` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/ai` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/pricing` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/about` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/contact` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/login` | 200 | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ |
| `/signup` | 200 | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ |
| `/privacy-policy` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/terms` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/refund-policy` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/dpa` | 200 | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| `/does-not-exist` | 404 | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ | PASS¹ |

¹ One expected console error, by design:
- `/login`, `/signup`: `No login URL configured…` / `No signup URL configured…`. `APP_LOGIN_URL` / `APP_SIGNUP_URL` were not set for the run, so the button shows its disabled state. With `APP_LOGIN_URL` set, `/login` renders the real link (section 6).
- `/does-not-exist`: `Failed to load resource: 404` for the page itself.

There were no other console errors and no failed same-origin requests on any page, at any width.

**Visual check:** I looked at contact sheets of the top of every route at 375 px, 1440 px, 390 px reduced and 1440 px reduced. Nothing was broken or misaligned. Two problems were visible in the content, not the layout (section 8). I did not inspect the full length of all 117 screenshots one by one.

### First run, before fixes

| Page | Width | Overflow with clip lifted | Element | Verdict |
| :--- | :---: | :---: | :--- | :--- |
| `/` | 375 / 414 / 768 | 417 / 463 / 853 px | `section#benefits` mobile cards (`AdvantageScrollMain`): the flip-in (`rotateX: 60`, perspective) projects the card wider than the viewport while it animates in | **Fixed**: `max-lg:overflow-x-clip` on `section#benefits` |
| `/features` | 375 | 381 px | Browser-bar illustration in `CategorySections` ("https://academy.yourdomain.com" + "SSL Valid"): `flex-1` child without `min-w-0` | **Fixed**: `min-w-0` + `truncate` on the URL |
| `/` | 375 / 414 / 390 reduced | none (left edge) | `#ai-studio` decorative blur glow extends past the *left* edge | Not a defect: left overflow cannot be scrolled to and does not widen the page |

After the fixes, `overflowWithoutClip` = 0 and `rightEdgeOffenders` = 0 across all 117 captures.

### `overflow-x: clip` on html/body: kept

After the fixes above, the rule no longer hides any overflow (the counts are 0 with it lifted). It stays as a safety net, because the homepage scroll behaviour is identical with and without it:

| Width | Global clip | Lenis active | Wheel scroll (1200 px) | Pinned sections held (position at 10% = 90% of range) |
| :---: | :---: | :---: | :---: | :--- |
| 1440 | on | yes | 1200 | 4 / 4: hero stage (top 0), manifesto (258), AI studio (222), benefits (120) |
| 1440 | lifted | yes | 1200 | 4 / 4, same positions |
| 390 | on | yes | 1200 | no pins below 1024 px (by design) |
| 390 | lifted | yes | 1200 | no pins below 1024 px (by design) |

The Wall of Love pin is not in this list because the backend has no testimonials, so the section is not rendered. Its scroll sequence with 2 cards was checked in a browser separately (dev server, `CMS_USE_FIXTURES=true`, sample cut to 2 cards): both cards showed with no repeats, and there were no console errors or warnings at 1440 or 390.

---

## 2. Interaction & accessibility

| Check | Status |
| :--- | :--- |
| Tap targets ≥ 44 px (hamburger, drawer close, Request Demo, segmented controls) | **Code inspection only**: classes such as `min-w-[44px] min-h-[44px]` are present; sizes not measured in a browser |
| Mobile drawer: opens, links navigate and auto-close, Escape and X close | **Not run** (no interaction test) |
| Pricing comparison at 375 px: segmented plan picker | **Not run** for interaction. The `/pricing` screenshots show the empty-plans state, because the backend has 0 plans |
| Images not distorted | **PASS (screenshots)** at the widths reviewed |

---

## 3. Links

- **PASS (ran):** every same-origin `href` in the server HTML of all 13 routes was requested. There are 14 distinct internal links (`/`, `/features`, `/ai`, `/pricing`, `/about`, `/contact`, `/login`, `/signup`, the 4 legal pages, 2 image assets); none returned an error. The earlier figure of "456 links" was not reproducible and has been removed.
- ScrollTrigger lifecycle across client navigation (Home → Features → Pricing → Home, trigger count unchanged): **Not run**. **Code inspection only**: every timeline lives in `gsap.context(…)` with `ctx.revert()` on unmount.

---

## 4. Reduced motion

- **PASS (ran):** all 13 routes captured at 390 and 1440 px with `reducedMotion: "reduce"`, with no console errors and no overflow.
- **Defect found and fixed:** with reduced motion on, the manifesto / About mission statement (`ManifestSection`) stayed light grey below 1024 px. The reduced-motion branch set only the desktop words, then returned before the mobile branch could run. It now sets both. Confirmed in the 390 px reduced screenshot of `/about`.
- The global `prefers-reduced-motion` CSS rule in `app/globals.css` and the instant header transitions: **Code inspection only**.

---

## 5. Empty content & backend down

- Empty sections hide (Features FAQ, AI how-it-works, About values/team, placeholder phone filtered on Contact): **Code inspection only**.
- `/pricing` with 0 plans shows the branded empty state: **PASS (screenshots)**.
- Homepage Wall of Love with 0 testimonials: **PASS (HTML)**. There is no `#testimonials` section in the built homepage.
- Backend unreachable → `app/(marketing)/error.tsx` / `app/global-error.tsx`: **Not run**.

---

## 6. SEO, robots, sitemap, Open Graph

### Metadata (server HTML; build and server with `SITE_URL=https://lmsdomain.com`)

| Route | Status | `<title>` | Canonical | `og:image` | robots meta |
| :--- | :---: | :--- | :--- | :--- | :--- |
| `/` | 200 | `lms-domain` | `https://lmsdomain.com` | `https://lmsdomain.com/opengraph-image` | — |
| `/features` | 200 | `lms-domain-features \| LMS Domain` | `https://lmsdomain.com/features` | `…/opengraph-image` | — |
| `/ai` | 200 | `AI Grounded in Your Courses, Built for Your Entire Academy \| LMS Domain` | `https://lmsdomain.com/ai` | `…/opengraph-image` | — |
| `/pricing` | 200 | `lms-domain-pricing \| LMS Domain` | `https://lmsdomain.com/pricing` | `…/opengraph-image` | — |
| `/about` | 200 | `lms-domain-about \| LMS Domain` | `https://lmsdomain.com/about` | `…/opengraph-image` | — |
| `/contact` | 200 | `Talk to the LMS Domain team \| LMS Domain` | `https://lmsdomain.com/contact` | `…/opengraph-image` | — |
| `/privacy-policy` | 200 | `Privacy Policy \| LMS Domain` | `https://lmsdomain.com/privacy-policy` | `…/opengraph-image` | — |
| `/terms` | 200 | `Terms of Service \| LMS Domain` | `https://lmsdomain.com/terms` | `…/opengraph-image` | — |
| `/refund-policy` | 200 | `Refund & Cancellation Policy \| LMS Domain` | `https://lmsdomain.com/refund-policy` | `…/opengraph-image` | — |
| `/dpa` | 200 | `Data Processing Agreement (DPA) \| LMS Domain` | `https://lmsdomain.com/dpa` | `…/opengraph-image` | — |
| `/login` | 200 | `Log In \| LMS Domain` | — | `…/opengraph-image` | `noindex, nofollow` |
| `/signup` | 200 | `Sign Up \| LMS Domain` | — | `…/opengraph-image` | `noindex, nofollow` |
| `/does-not-exist` | 404 | `Page Not Found \| LMS Domain` | — | `…/opengraph-image` | `noindex` |

- **Homepage title is unchanged from `77ca9c0`:** CMS `metatitle` (currently `lms-domain`), falling back to `LMS Domain`, exactly as before. `app/layout.tsx` is byte-identical to `77ca9c0`. The 08 title template and global OG defaults were reverted, and each page now sets its full title and `metadataBase` itself (`lib/site.ts`).
- The `lms-domain-*` titles come from placeholder SEO entries in the CMS (listed in `backend-gaps.md`).
- `/login`, `/signup` and the 404 first had `og:image` on `http://localhost:3005` (they lost `metadataBase` with the layout revert). Fixed and re-measured: all three now give `https://lmsdomain.com/opengraph-image`. The build still prints one `metadataBase` warning from root-layout-level resolution (`app/layout.tsx` may not change); every page measured above has absolute URLs.

### robots.txt (server output)

`SITE_URL` unset:
```
User-Agent: *
Disallow: /
```
`SITE_URL=https://staging.lmsdomain.online`:
```
User-Agent: *
Disallow: /
```
`SITE_URL=https://lmsdomain.com`:
```
User-Agent: *
Allow: /
Disallow: /login
Disallow: /signup
Disallow: /api/

Sitemap: https://lmsdomain.com/sitemap.xml
```
robots.txt and sitemap.xml are rendered per request, so they follow the container's runtime `SITE_URL`. The sitemap lists 10 URLs on that origin (0 when `SITE_URL` is unset). Canonical/OG URLs on prerendered pages need `SITE_URL` at build time too (`docs/multipage/env.md`).

### Open Graph image text (`app/opengraph-image.tsx`)

> LMS DOMAIN
> The Modern AI-Powered Learning Platform
> Courses, assessments, live learning, payments, and Domie AI tutor in one unified system.
> Domie AI · 9 Core LMS Categories · lmsdomain.com

Checked against `content/features/catalog.ts`: "9 Core LMS Categories" matches the catalog's 9 categories. Courses, assessments, live learning, payments and Domie AI are each catalog categories. There are no other numbers or claims. The `✦` glyphs made the build fail to fetch a font ("Failed to load dynamic font for ✦"); they are now inline SVG and the warning is gone.

---

## 7. Fixes

### This pass

| File | Fix |
| :--- | :--- |
| `components/sections/HomePage/CustomerSection/CustomerSection.tsx` | Wall of Love renders only the real testimonials (no repeats); animation steps skip empty slots; section hidden when there are none |
| `app/layout.tsx` | Reverted to `77ca9c0` (foundation rule) |
| `lib/site.ts` (new), all `page.tsx`, `app/not-found.tsx` | Full titles (`… \| LMS Domain`) and `metadataBase` from `SITE_URL` per page |
| `app/robots.ts`, `app/sitemap.ts` | Site URL from server env `SITE_URL`, never hard-coded; `Disallow: /` unless `SITE_URL` is the production domain; rendered per request |
| `Dockerfile` | Optional `ARG SITE_URL` in the builder stage, so prerendered canonical/OG URLs are absolute |
| `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx` | Rendered per request, so runtime `APP_*_URL` / admin settings apply immediately (they were prerendered with the button disabled) |
| `app/opengraph-image.tsx` | `✦` glyph replaced with inline SVG (failed font fetch at build) |
| `components/sections/HomePage/AdvantageSection/AdvantageSection.tsx` | `max-lg:overflow-x-clip`: contains the mobile card flip-in overflow |
| `components/marketing/CategorySections.tsx` | Browser-bar illustration truncates instead of overflowing at 375 px |
| `components/sections/HomePage/ManifestSection.tsx` | Reduced motion: mobile words now end in their final colour |
| `scripts/qa-screens.mjs`, `package.json` (`qa:screens`, `playwright` dev dependency) | Repeatable screenshot / overflow / console / pin audit |

### From the 08 pass (still in place)

`app/robots.ts` and `app/sitemap.ts` (since reworked, above), `app/opengraph-image.tsx`, `app/(marketing)/error.tsx`, `app/global-error.tsx`, canonical / OG tags on every route, the global `overflow-x: clip` (kept, section 1), and a 44 × 44 px drawer close button in `components/layout/Header.tsx`.

---

## 8. Still to check by hand

1. **Content to fix in the admin (seen in screenshots / HTML):** `/pricing` hero subtitle is Lorem ipsum. SEO titles are placeholders (`lms-domain-*`). The About mission statement claims "over 10,000 educators" / "10K+". All are listed in `backend-gaps.md`.
2. **Mobile drawer** at 375–414 px: open, follow each link, check it auto-closes, close with X and with Escape.
3. **Pricing segmented picker** at 375 px, once real plans exist.
4. **ScrollTrigger count** after Home → Features → Pricing → Home (`ScrollTrigger.getAll().length` in the console, before and after).
5. **Backend offline:** stop the backend and load a subpage; the branded error screen should appear.
6. **Real devices:** iOS Safari and Android Chrome (Playwright ran desktop Chromium at mobile widths only).
7. **Lighthouse** (mobile) on `/`, `/features`, `/pricing`: not run.
