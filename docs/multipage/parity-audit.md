# Live vs staging parity audit

**Live:** `main` / `77ca9c0` (lmsdomain.com). `main` differs from `77ca9c0` only in `components/sections/PricingPage/PriceFAQ.tsx`.
**Staging:** `feature/multipage` (after `8ee4885`).
**Backend:** `lmsdomain-landing-backend` (`4f7c247`), read-only.
**Date:** 2026-10-23. Read-only audit: no database writes, no seeders run. Line references are `file:line`; live paths are at `77ca9c0`.

The live code contains many components that are never rendered (for example `TestimonialSlider`, `ClientsSection`, `FeaturesItems`, `EmailSection`). This audit covers only what the live site actually renders.

---

## 1. Summary of gaps (live shows it, staging does not)

| # | Area | Live | Staging | Severity |
| :--- | :--- | :--- | :--- | :--- |
| G1 | Features page content | `/features` lists the backend **Features** collection (`/api/features`: `title`, `subTitle`, `content`, `image`, `altImage`, `tags`) and the **Features content** section (`/api/features/content` + CMS `features-content`) | Features come from the code catalog `content/features/catalog.ts` (38 items, 9 categories). `/api/features`, `/api/features/content` and `features-content` are not read. Admin edits to Features / Features content do not appear on staging. | **Addressed for the new site (phase A):** the catalog is edited in Admin > Features > Categories / Items (new site); the live `Features` collection stays separate |
| G2 | Price card "+ Taxes" | `PriceCard.tsx:54` shows "+ Taxes" next to every price | **Fixed:** "+ taxes" next to every price (monthly and yearly) in `PricingCard.tsx` | Fixed |
| G3 | Pricing FAQ heading | CMS `pricing-faq` `title` is the FAQ heading (`PriceFAQ.tsx`, `FaqAccordion.tsx`) | **Fixed:** heading (and subtitle) read from CMS `pricing-faq`, current text as fallback | Fixed |
| G4 | Pricing CTA testimonials | `/pricing` renders `CtaSection` with hard-coded floating testimonial cards (Darius Salehipour, Melanie Jackson) | Removed on purpose (demo content); cards appear only when real testimonials exist | Intentional |
| G5 | Price per period wording | "(Per Month)" / "(Billed Annually)" and "-X% Discount" | "/month" / "/year, billed annually" and "Save X%" (only when discount > 0) | Intentional, same data |
| — | Yearly prices | `price × 12 − discount%` (`PriceCard.tsx:19-21`), unrounded (₹64,789.2) | **Restored in `8ee4885`**, same formula, rounded to whole rupees | Fixed |

Nothing else the live site renders from the backend was dropped. Home sections, testimonials, the home FAQ and the footer behave the same or better (details below).

---

## 2. Data source by area

### Pricing (`/pricing`)

| Source | Live (77ca9c0) | Staging (feature/multipage) |
| :--- | :--- | :--- |
| `POST /api/pricing` | `PriceSection.tsx:23` (from the browser, `NEXT_PUBLIC_BACKEND_URL`) | `lib/api/content.ts:208` `getPricingPage()` (server, cached 5 min, tag `pricing`/`plans`) |
| `price` | `PriceCard.tsx:44` | yes, `content.ts` mapping, formatted per currency |
| `discount` | `PriceCard.tsx:20`, `:61` "-X% Discount" | yes, `content.ts:248-249`; struck ×12 price + "Save X%" in `PricingCard.tsx` |
| `price_yearly` | not used | not used (same as live) |
| `title`, `subTitle` | `PriceCard.tsx:33`, `:38` | yes (`name`, `tagline`) |
| `tags` (feature list) | `PriceCard.tsx` (`plan.tags.map`) | yes (`features`) |
| `buttonText` | `PriceCard.tsx:70` (button has no link) | yes; button links to `/signup?plan=…` or opens the demo form |
| `buttonAction` | not used | `demo` / `contact` / signup |
| `max_users` | not used | shown as "Active Learners" limit |
| `isPopular`, `isCustom`, `currency` | not used | read, but **not in the backend Pricing model** (Mongoose drops them); see `backend-gaps.md` |
| "+ Taxes" | `PriceCard.tsx:54` | yes ("+ taxes", fixed) |
| CMS `pricing-hero` (`title`, `subTitle`) | `PricingPage.tsx:29` → `BannerDetails.tsx` | yes, `content.ts` hero |
| CMS `pricing-faq` (`title`) | `PricingPage.tsx:30` | yes, FAQ heading (fixed) |
| CMS `pricing-footer-card` | `PricingPage.tsx:31` → `CtaSection` (props unused there) | yes, closing CTA `title`, `subTitle`, `buttonText` |
| `POST /api/pricing/FAQ` (`question`, `answer`) | `PriceFAQ.tsx:39` | yes, `/api/pricing/faq` (Express routes are case-insensitive) |
| SEO `pricing` | `app/pricing/page.tsx:8` | yes |

### Features (`/features`)

| Source | Live | Staging |
| :--- | :--- | :--- |
| CMS `features-hero` | `FeaturesPage.tsx:30` | yes, `content.ts:380` |
| CMS `features-content` | `FeaturesPage.tsx:31` | **no (G1)** |
| `POST /api/features` | `FeaturesDetails.tsx:41` | **no (G1)**; code catalog via `resolveFeatureCategories()` (`content.ts:375`) |
| `POST /api/features/content` | `FeaturesMultipleContent.tsx:11` | **no (G1)** |
| `POST /api/pricing/faq` | not on this page | yes (FAQ section) |
| SEO `features` | `app/features/page.tsx:8` | yes |

### Home (`/`)

| Source | Live | Staging |
| :--- | :--- | :--- |
| CMS `home-hero`, `home-graph-section`, `home-teach-smarter`, `customers`, `results` | fetched (`HomePage.tsx:36-40`) and passed to sections, but **the sections read no fields** (content comes from `content/home/*.ts`) | same fetches (`components/modules/HomePage.tsx:21-25`), same behaviour |
| Wall of Love | demo cards from `content/home/testimonials.ts` | `POST /api/home/testimonials` (`content.ts:844`); hidden when empty; demo only with `CMS_USE_FIXTURES=true` |
| Home FAQ | `content/home/faq.ts` | same |
| `/api/home/smartTeach`, `/clients`, `/customers`, `/features`, `/results` | only in unrendered components | not used |
| SEO `home` | `app/page.tsx:7` | yes |

### About (`/about`)

| Source | Live | Staging |
| :--- | :--- | :--- |
| CMS `about-hero`, `about-values`, `about-story`, `about-mission-card` | `AboutPage.tsx:29-32` | yes, `content.ts:422` |
| CMS `about-mission` (`title`, `content`, `image`, `counts`) | `OurMissionSection.tsx:19-22` (browser) | yes (mission statement) |
| `POST /api/about/values` | `CoreValueSection.tsx:11` | yes |
| CMS `about-leadership`, `POST /api/about/leadership` | not used | yes (extra) |
| SEO `about` | `app/about/page.tsx:9` | yes |

### Footer, address and contact info

| Source | Live | Staging |
| :--- | :--- | :--- |
| CMS `address`: `email`, `phone` | `CopyrightSection.tsx` | yes; placeholder phone hidden |
| CMS `address`: `fb`, `instagram`, `linkedin`, `twitter`, `youtubelink` | `SocialMediaIcons.tsx` | yes |
| CMS `address`: `address` (postal) | not used | used on `/contact` if present (`content.ts:591`) |
| CMS `footer`: `content` | `FooterSection.tsx` | yes; Lorem ipsum replaced by built-in copy |

### SEO

| Live | Staging |
| :--- | :--- |
| `POST /api/seo` for `home`, `pricing`, `features`, `about` (`metatitle`, `metadescription`, `metakeyword`; `othermetatags` is passed but the model field is `othermetatag`, so it is always empty) | Same four plus `ai`, `contact`, `privacy-policy`, `terms`, `refund-policy`, `dpa`; canonical, Open Graph and Twitter tags; robots / sitemap from `SITE_URL` |

### Enquiry / demo form and "Notify" newsletter form

| Form | Live | Staging |
| :--- | :--- | :--- |
| Request Demo (type 1) | `EnquiryForm.tsx:31`, posts from the browser to `NEXT_PUBLIC_BACKEND_URL/api/enquiry` | `DemoForm.tsx:146` → same-origin `/api/enquiry` proxy (`app/api/enquiry/route.ts`) → `BACKEND_URL/api/enquiry`, same payload (`name`, `organizationName`, `phoneNumber`, `email`, `subject`, `type`) |
| Notify (type 2) | `CtaSection.tsx:114` on `/pricing` (browser, falls back to `https://cms.lmsdomain.com`) | `CtaSection.tsx:118` → `/api/enquiry` proxy, on `/features`, `/ai`, `/about`, `/pricing` |

### Settings

| Live | Staging |
| :--- | :--- |
| Only `address` and `footer` | Also reads `appLoginUrl`, `appSignupUrl`, `appForgotPasswordUrl` from `address` (`content.ts:146`, `:181`). **No backend field exists**, so the app links come from server env `APP_*_URL` until the backend adds them (section 4) |

---

## 3. Admin dashboard location

The admin dashboard is **not in this frontend repo**, on `main` or `feature/multipage`. It is the backend's Express + EJS app:

- `routes/index.ts:11` mounts `router.use('/dashboard', adminRouter)`; `routes/index.ts:15` redirects `/` to `/dashboard`.
- Views are in `views/pages/*.ejs`, controllers in `controllers/admin/*`.
- Neither frontend branch has a `/dashboard` route or a rewrite for it. `next.config.ts` differs between `main` and `feature/multipage` only by `images: { unoptimized: true }`. A `lmsdomain.com/dashboard` URL is therefore served by the server's reverse proxy pointing at the backend; that configuration is not in either repo. Deploying `feature/multipage` does not change the dashboard.

---

## 4. Admin Settings and SEO show "No data to show", with no Add button

### Why

| Page | Route | Lists | Why it is empty |
| :--- | :--- | :--- | :--- |
| Settings | `GET /dashboard/cms/settings` (`routes/admin.ts:33`, sidebar link `views/component/sidebar.ejs:482`) | `Cms.find({ pageSlug: "settings" })` (`controllers/admin/cms.ts:6-24`) | The live `cms` collection has no `pageSlug: "settings"` documents (`mail-options`, `address`, `footer` were never inserted there) |
| SEO | `GET /dashboard/seo` (`routes/admin.ts:150`) | `Seo.find({ isDeleted: false })` (`controllers/admin/seo.ts:5-10`) | No `seos` documents with `isDeleted: false` (or none at all) |

The empty state is `views/pages/cms.ejs:101` and `views/pages/seo/index.ejs:116` ("No data to show").

### No Add button: create was never built

There are **no commented-out create routes or Add buttons**. Create was never implemented:

- `routes/admin.ts:33-35`: CMS has only list (`GET /cms/:slug`), edit form (`GET /cms/edit/:slug`) and update (`POST /cms/edit/:slug`).
- `routes/admin.ts:150-152`: SEO has only list, edit form and update.
- `controllers/admin/cms.ts:121` exports `findAllCms, editCms, updateCms`; `controllers/admin/seo.ts:61` exports `findAllSeo, seoEdit, seoUpdate`. No create function.
- Updates use `findOneAndUpdate` **without upsert** (`services/dbservices.ts:91-93`). `seoUpdate` (`controllers/admin/seo.ts:34-59`) shows "Seo Updated" even when no document matched.
- Documents only come from the seed (`seeder/cms.ts`, `seeder/seo.ts`).

### Related defects found

- **YouTube field never editable:** the `address` entry lists `"youtubelink"` in `fields`, but the edit form shows the YouTube input only for `data.fields.includes("youtubeLink")` (`views/pages/cmsEdit.ejs:227`; the input itself is `name="youtubelink"`, line 236). `scripts/insert-missing-cms.js` copies the seeder's `fields` and has the same issue.
- **Postal address not editable:** `cmsEdit.ejs:246` can render an `address` input, but the `address` entry's `fields` list does not include `"address"`.
- **Secret in the repo:** `seeder/cms.ts` (`mail-options`) contains an SMTP / SendGrid API key. Rotate it.
- Both update handlers spread `req.body` straight into the document (`controllers/admin/cms.ts:76-79`, `controllers/admin/seo.ts:39-47`), so any field (including `slug`, `isDeleted`) can be overwritten by a crafted form post. This is limited to logged-in admins.

### Proposed change (not applied)

1. **Get the entries in now (no code change):** run `scripts/insert-missing-cms.js` (dry run, then `APPLY = true`). Before applying, change the `address` entry's `fields` to `["title", "email", "phone", "address", "fb", "instagram", "linkedin", "twitter", "youtubeLink", "appLoginUrl", "appSignupUrl", "appForgotPasswordUrl"]` (keep the stored key `youtubelink`).
2. **App links in Settings:** in `views/pages/cmsEdit.ejs`, add three text inputs guarded by `data.fields.includes("appLoginUrl")` etc. (`name="appLoginUrl"`, `name="appSignupUrl"`, `name="appForgotPasswordUrl"`), and add the three fields to the `Cms` schema (`models/cms.ts`) so Mongoose stores them. The frontend already reads them from `address` via `getSiteSettings()`.
3. **SEO per page:** add `GET /dashboard/seo/create` + `POST /dashboard/seo/create` (`seoController.createSeo`) with an allow-list of fields (`slug`, `page`, `metatitle`, `metadescription`, `metakeyword`, `othermetatag`) and a unique-slug check; add an "Add SEO" button to `views/pages/seo/index.ejs`. Alternatively seed one SEO document per frontend page: `home`, `features`, `ai`, `pricing`, `about`, `contact`, `privacy-policy`, `terms`, `refund-policy`, `dpa`.
4. **CMS create (optional):** the same pattern for CMS (`/dashboard/cms/create`, with `slug`, `pageSlug`, `cmsTitle`, `fields`), or keep creating entries through the seed only, adding the 14 slugs the frontend uses but the seed lacks (see `backend-gaps.md`).
5. **Safety:** make `seoUpdate` / `updateCms` report "not found" when nothing matched, and replace `...req.body` with an allow-list of the document's `fields`.
