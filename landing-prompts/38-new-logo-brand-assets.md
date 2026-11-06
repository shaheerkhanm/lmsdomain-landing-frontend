# Prompt 38: New logo everywhere, and brand assets editable in the admin

The new "lmsdomain" wordmark (gradient "o" ring with the AI spark) replaces the old logo on the new site. It isn't final yet, so after this you can change it two ways, without code:

- **From the admin:** Settings > Site identity gets Brand logo fields (light logo, dark logo, small mark, favicon/app icon, share image, theme colours). Upload, Save, and staging shows it within seconds. "Use default" puts the built-in file back.
- **In the repo:** drop a new file with the same name into `public/brand/` and redeploy.

**Files are already in your frontend repo** at `assets-src/brand-v2/` (also in [../assets/brand-v2/](../assets/brand-v2/)):

| File | What it is |
|---|---|
| `logo-source-1600.png` | The file you sent (1600 x 316) |
| `logo-wordmark.png` | Trimmed wordmark, dark letters, for light backgrounds (1534 x 250) |
| `logo-wordmark-dark.png` | Same with white letters, for dark backgrounds |
| `logo-mark.png` | The ring + spark alone, 512 x 512 transparent (nav mark, favicon source) |
| `icon-192.png`, `icon-512.png` | App icons, transparent |
| `icon-maskable-512.png`, `apple-touch-icon.png` | On white, with safe-zone padding |
| `favicon.ico` | 16, 32, 48 |
| `preview.png` | How they look |

They're PNGs because that's what we have. When the final logo comes, ask for an **SVG** of the wordmark and of the mark: the icons will be sharper (the mark is only 160 px in this file, so the 512 icons are upscaled).

Order: Part A (backend) first, then Part B (frontend) with A's "API shape" pasted under it.

---

## Part A: BACKEND (paste into Claude Code in lmsdomain-landing-backend)

```
Backend repo lmsdomain-landing-backend, branch release/live-admin (git pull first). This backend also serves lmsdomain.com, so only ADD: never rename or change existing fields or entries the old live frontend reads. Don't touch the live database, don't deploy. Use the redesigned admin components (cards, image fields with preview, "Where this appears", refresh on save).

New logo files are in the sibling frontend repo at ../lmsdomain-landing-frontend/assets-src/brand-v2/ (logo-wordmark.png, logo-wordmark-dark.png, logo-mark.png, favicon.ico, icon-*.png, apple-touch-icon.png).

1. FIRST REPORT (before changing anything): where Admin > Settings > Site identity (CMS entry "site-identity", fields iconImage, shareImage, themeColor from prompt 15b) is defined, saved and validated (file:line); confirm with a grep of the old live frontend at 77ca9c0 or its known slugs that lmsdomain.com does NOT read "site-identity". Also list where the admin itself shows a logo or favicon (login page, sidebar, collapsed rail, topbar, emails: email-logo.png, email-header.gif, Mail options "header image").

2. SITE IDENTITY: add a "Brand logo" card above the existing icon fields. New fields in the same "site-identity" entry (all optional; empty = the site's built-in default):
   - logoLight: main wordmark for light backgrounds (nav pill, footer, auth pages, emails).
   - logoDark: wordmark for dark backgrounds (dark sections, dark email clients).
   - logoMark: small square mark (collapsed/mobile places, admin rail).
   - logoAlt: text alternative, default "LMS Domain".
   - logoHeight: number, header logo height in px on desktop (default 26, allowed 18–40), so a different logo shape can be tuned without code.
   - themeColorDark: #RRGGBB, like themeColor (default #161616).
   Keep iconImage (favicon/app icon source), shareImage and themeColor as they are; relabel iconImage "Favicon and app icon (square PNG or SVG, at least 512 px)".
   Rules: PNG, SVG or WebP only; max 1 MB per file; SVG uploads sanitised (strip scripts, event handlers, external refs, foreignObject) or rejected if they can't be; store /uploads/... paths the same way other image fields do. Each image field: preview on a light AND a dark checkerboard background, the default file shown when empty, a "Use default" button that clears the field. Save allow-lists only these fields (no ...req.body). On save, call the frontend revalidate with tags cms and site-identity (existing helper).

3. PUBLIC API: the existing CMS read for "site-identity" returns the new fields. Paste the exact request and an example JSON response (all fields set, and all empty) as "API shape" for Part B.

4. ADMIN ITSELF uses the new brand:
   - Copy logo-wordmark.png, logo-mark.png and favicon.ico from the frontend folder into the admin's public assets (replace the old logo/favicon files the admin uses, keep the same paths or update the references; old files go to an _old/ folder, not deleted).
   - Login page, sidebar (expanded = wordmark, collapsed rail = mark) and the admin favicon use Site identity logoLight / logoMark / iconImage when set, else these defaults. Read it once per request with a short cache, not a DB call per image.
   - Check the expanded sidebar still fits at the current width with the wider wordmark (set a max height of about 28 px, width auto).

5. EMAILS (prompts 15b/19 templates): the logo in both enquiry emails becomes the new wordmark: Site identity logoLight when set (absolute URL through EMAIL_ASSET_BASE_URL), else a new uploads/email-logo-v2.png made from logo-wordmark.png at 2x of its display size. Dark-mode email clients: use logoDark where the template already has a dark-mode block, otherwise keep the logo on its light card. If the animated header GIF contains the old mark, regenerate it with scripts/email-assets from logo-mark.png (first frame = finished state, under 60 KB) and write it as a NEW file name (email-header-v2.gif) so nothing the live site sends changes until deploy. Report the before/after email HTML size.

6. DATA: no database change is needed (empty fields mean "use the default"). If you add anything to the entry, use an insert-only script with const APPLY = false; like scripts/insert-site-identity.js, never overwriting a value.

7. VERIFY on a local test DB only: screenshots of the Site identity screen (empty with defaults shown, then with a logo uploaded on light and dark previews), the admin login, sidebar expanded and collapsed, and both emails in MailHog. Upload an SVG containing <script> and show it's sanitised or refused. npx tsc --noEmit, npm run build and scripts/check-admin-restyle.mjs pass.

Commit `feat(brand): new logo in admin and emails, brand logo fields in Site identity`. Report: the step 1 findings, commits, the API shape, any new file names in uploads, and deploy steps (push, /opt/lmsdomain/deploy.sh backend, docker cp of the new email images into uploads like 15b step D).
```

---

## Part B: FRONTEND (paste into Claude Code or Antigravity in lmsdomain-landing-frontend, after Part A)

```
RULES: Frontend repo lmsdomain-landing-frontend, branch feature/multipage (git pull first). Don't push or deploy, don't edit .env files or the old live frontend. Run against the local backend from Part A. No new npm packages (sharp is already used). Commit only when npm run build and npx tsc --noEmit pass.

GOAL: the new wordmark replaces the old logo everywhere on the new site, from ONE place, with the admin's Site identity fields overriding the built-in files.

1. FIRST: grep and list every place a logo or brand mark is used (file:line): /assets/img/logo/logo.svg, logo1.svg, mark-square.svg, LogoMark, the Header (desktop pill, mobile header, mobile drawer), FooterSection, auth pages (AuthVisualPanel and the login/signup/forgot-password forms), 404, the OG route app/og/[page]/route.tsx (it reads the old D path from public/icons/icon.svg), scripts/generate-icons.mjs, assets-src/brand-mark.svg, app/manifest.ts, app/layout.tsx, public/favicon.ico, public/icons/*. Don't change Domie AI artwork.

2. FILES: copy assets-src/brand-v2/logo-wordmark.png, logo-wordmark-dark.png and logo-mark.png to public/brand/ (same names). Replace public/favicon.ico and public/icons/{icon-192,icon-512,icon-maskable-512,apple-touch-icon}.png with the brand-v2 versions. There is no SVG of the new mark yet: remove the old D icon.svg from the static icon set (STATIC_ICONS / hasSvg false) so browsers don't show the old D; keep the code path so an SVG added later (public/icons/icon.svg, or an SVG uploaded in the admin) is used again. Move the old logo files to public/assets/img/logo/_old/ only if nothing references them any more. Update scripts/generate-icons.mjs to build all icons from assets-src/brand-v2/logo-mark.png (or logo-mark.svg when present, preferred), apple-touch and maskable on white #FFFFFF with safe-zone padding, so a future logo swap is: replace the source file, run the script.

3. ONE BRAND SOURCE: extend lib/siteIdentity.ts with logoLight, logoDark, logoMark, logoAlt, logoHeight, themeColorDark (Part A's API shape; same validation style: /uploads/... or https:// only, hex colours, logoHeight clamped 18–40). Add getBrand() returning resolved URLs with defaults /brand/logo-wordmark.png, /brand/logo-wordmark-dark.png, /brand/logo-mark.png, alt "LMS Domain", height 26, plus a ?v= cache key like iconUrls. Backend /uploads paths go through the existing image proxy the site already uses for CMS images.
   Add components/brand/BrandLogo.tsx: <BrandLogo variant="wordmark" | "mark" tone="light" | "dark" height?> rendering a plain <img> (or next/image if the other CMS images use it) with explicit width and height computed from the image's aspect ratio so there's no layout shift (store the defaults' ratio, 1534/250 for the wordmark; for admin uploads read it once on the server with sharp metadata, cached with the site-identity tag, falling back to the default ratio). Fetch the brand once in app/layout.tsx and pass it down (or a small context), not a fetch per logo.

4. REPLACE every logo from step 1 with BrandLogo:
   - Desktop pill nav: wordmark at logoHeight (default 26 px), vertically centred; the pill must not get taller or wrap at 1024–1440 px. If it's too wide at 1024 px, use the mark below 1180 px.
   - Mobile header and drawer: wordmark at about 24 px (44 px tap target kept); mark only if under 360 px wide it doesn't fit.
   - Footer: wordmark at 30–34 px. Auth pages and 404: wordmark. Any dark surface: tone="dark".
   - LogoMark keeps its API but uses the mark (no rounded dark square behind it any more).
   - aria-label "LMS Domain home" on the links, alt from logoAlt.

5. ICONS, MANIFEST, THEME: keep the 15b flow (/site-icon/* resized from iconImage when the admin sets one). When iconImage is empty, the new static files from step 2 are used. Apple and maskable backgrounds: white, not themeColor, when there's no admin icon. generateViewport's dark theme colour comes from themeColorDark.

6. SHARE IMAGE: app/og/[page]/route.tsx shows the new wordmark (read public/brand/logo-wordmark.png as a data URL, or the admin's logoLight when set) instead of the D path and the "LMS Domain" text, same 1200 x 630 layout, title below, no claims. Admin shareImage still wins when set.

7. VERIFY: Playwright screenshots at 1440, 1024 and 390 of home (header pill + footer), /pricing, /login, a dark section with the dark logo, the mobile drawer, and /og/home. Then set logoLight to a test upload in the local admin, save, and show the header, footer and /og/home change without a rebuild; press "Use default" and show they're back. Check /favicon.ico, /icons/*, /site-icon/*, /manifest.webmanifest return 200 with the right type and size, and the browser tab shows the new icon. CLS on home under 0.05 (unchanged), no horizontal scroll at 375–1920 px.

Commit `feat(brand): new logo from one source, admin-overridable`. Report: the step 1 list, commits, screenshots folder, and deploy steps (push, /opt/lmsdomain/deploy.sh staging with site-identity in REVALIDATE_TAGS if it isn't there yet).

API shape from Part A:
<paste here>
```

---

## Changing the logo later

- **Admin:** Settings > Site identity > Brand logo: upload the light logo, dark logo and mark, plus the favicon/app icon. Save. Use a square PNG of at least 512 px, or an SVG, for the icon.
- **Repo (new built-in default):** replace the files in `assets-src/brand-v2/`, run `node scripts/generate-icons.mjs`, copy the three logo files to `public/brand/`, commit and deploy staging.
