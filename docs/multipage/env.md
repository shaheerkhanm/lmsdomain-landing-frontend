# Environment Variables Specification & Staging Configuration Guide

**Document:** `docs/multipage/env.md`  
**Date:** 2026-10-21  
**Scope:** Multi-page Marketing Foundation Architecture & Deployment Environment

---

## 1. Environment Variables Inventory

The Next.js 15 App Router application reads and utilizes the following environment variables:

| Variable | Scope & Lifecycle | Default / Fallback in Code | Usage Location | Criticality |
| :--- | :--- | :--- | :--- | :--- |
| `BACKEND_URL` | **Server-side (Runtime)**<br>Read by Node.js server during SSR / RSC data fetching. | `http://backend:3000` (Dockerfile ARG)<br>`http://lms-landing-backend:3000` (in `Footer.tsx`)<br>`BACKEND_URL` constant (`https://cms.lmsdomain.com`) in `HomePage.tsx` | `components/layout/Footer.tsx:10`<br>`components/modules/HomePage.tsx:16`<br>`utils/api/index.ts:30`<br>`components/sections/FeaturesPage/FeaturesDetails.tsx:41`<br>`components/sections/PricingPage/PriceFAQ.tsx:39`<br>`components/sections/AboutPage/CoreValueSection.tsx:11` | **CRITICAL for SSR**<br>Feeds SEO metadata, footer contact info, and dynamic CMS pages. |
| `BACKEND_INTERNAL_URL` | **Server-side (Runtime)**<br>Optional internal container DNS override. | `undefined` | `components/layout/Footer.tsx:10` | **Useful fallback** in containerized environments where internal service name differs from external. |
| `NEXT_PUBLIC_BACKEND_URL` | **Client-side (Build-time baked)**<br>Inlined into JavaScript bundles sent to browsers. | `"https://cms.lmsdomain.com"` in `utils/constants/constant.tsx`<br>`undefined` in Dockerfile ARG | `utils/constants/constant.tsx:1`<br>`components/layout/common/EnquiryForm.tsx:31`<br>`components/sections/HomePage/FeaturesSection/FeaturesItems.tsx:38`<br>`components/sections/PricingPage/PriceSection.tsx:23`<br>`components/sections/AboutPage/OurMissionSection.tsx:19` | **HIGH RISK in Client Components**.<br>If baked as `localhost:5201`, client browsers cannot connect. |
| `PORT` | **Container Runtime** | `8080` (defined in `Dockerfile` runner stage) | Next.js server entrypoint (`server.js`) | Defines port on which standalone Node process listens. |
| `HOSTNAME` | **Container Runtime** | `0.0.0.0` (defined in `Dockerfile` runner stage) | Next.js server entrypoint (`server.js`) | Binds to all network interfaces inside container. |
| `NODE_ENV` | **Build & Runtime** | `production` | Dockerfile & Next.js runtime | Enables production optimizations, caching, and tree shaking. |
| `SITE_URL` | **Server-side (Build + Runtime)** | `undefined` | `lib/site.ts` → `app/robots.ts`, `app/sitemap.ts`, every page's `metadataBase` (canonical, `og:url`, `og:image`) | `https://lmsdomain.com` in production, `https://staging.lmsdomain.online` on staging. robots.txt allows crawling **only** when it is exactly `https://lmsdomain.com`; any other value, or unset, serves `Disallow: /`. sitemap.xml is empty when unset. |
| `APP_LOGIN_URL` | **Server-side (Runtime)** | `undefined` | `lib/api/content.ts` (`getAppAuthUrls`) → `/login` → `AuthLoginForm` prop | Fallback for the LMS app login link. Admin Settings `appLoginUrl` wins when the backend has it. Unset everywhere → disabled button. |
| `APP_SIGNUP_URL` | **Server-side (Runtime)** | `undefined` | `lib/api/content.ts` (`getAppAuthUrls`) → `/signup` → `AuthSignupForm` prop | Fallback for the LMS app signup link. Admin Settings `appSignupUrl` wins when the backend has it. |
| `APP_FORGOT_PASSWORD_URL` | **Server-side (Runtime)** | `undefined` | `lib/api/content.ts` (`getAppAuthUrls`) → `/login` → `AuthLoginForm` prop | Fallback for the password reset link. Admin Settings `appForgotPasswordUrl` wins when the backend has it. Unset → link hidden. |
| `PRICING_CURRENCY` | **Server-side (Runtime)** | `INR` | `lib/api/content.ts` (`resolvePlanCurrency`) | Site-wide default currency (ISO 4217, e.g. `INR`, `USD`) for pricing plans that have no `currency` of their own in the backend. Invalid codes are ignored. INR is formatted `en-IN` (₹3,699), others `en-US`. `/pricing` is prerendered, so set it at build time too, or refresh with the `pricing` tag. |
| `PRICING_POPULAR_PLAN` | **Server-side (Build + Runtime)** | `undefined` | `lib/api/content.ts` (`getPricingPage`) | Plan to highlight as "Most popular" (its title or slug, any case, e.g. `Standard Plan`) **only while no plan has `isPopular` in the backend**; the backend flag always wins. `/pricing` is prerendered, so set it at build time too, or refresh with the `pricing` tag. Remove it once the admin "Most popular" checkbox is live. |
| `CMS_REVALIDATE_SECRET` | **Server-side (Runtime)** | none (required) | `app/api/revalidate/route.ts` | Shared secret for `POST /api/revalidate` (`docs/multipage/cms-webhook.md`). Unset → the endpoint returns `503` and revalidates nothing. Use a different long random value on staging and production. |
| `OG_IMAGE_SECRET` | **Server-side (Runtime)** | `CMS_REVALIDATE_SECRET` | `lib/og.ts` | Signs the page title in default share-image URLs (`/og/<page>?t=…&s=…`) so the image route only draws titles the site produced. Optional: falls back to `CMS_REVALIDATE_SECRET`; with neither, share images show the page name. |
| `LMS_CENTRAL_URL` | **Server-side (Runtime)** | `undefined` (feature off) | `lib/auth/central-config.ts` (`getCentralLoginConfig`) | Central domain for the admin login API (`docs/central-login-api.md`), e.g. `https://app.lmsdomain.com`. Must be `https:` (`http:` only for `localhost` / `127.0.0.1`), origin only; trailing slashes are stripped. The only path accepted is `/api/dev/central-mock` on a local host (the fake API below). Anything else, or unset → central login off and `/login` keeps the plain button to the app login URL. Not `NEXT_PUBLIC_`: set it with `docker run -e LMS_CENTRAL_URL=...`, no rebuild needed. |
| `RECAPTCHA_SITE_KEY` | **Server-side (Runtime)** | `undefined` (feature off) | `lib/auth/central-config.ts` (`getCentralLoginConfig`) | Public reCAPTCHA v2 checkbox site key for the central login (from the Laravel team, separate from academies' own keys). Passed to the browser as a prop. Missing → central login off, since the API rejects every request without a token. Set with `docker run -e RECAPTCHA_SITE_KEY=...`, no rebuild needed. |
| `CENTRAL_LOGIN_MOCK` | **Server-side (Runtime), dev only** | `undefined` | `app/api/dev/central-mock/_lib/mock.ts` | `true` turns on the local fake central login API under `/api/dev/central-mock`, **only** under `next dev`. In a production build (`npm start`, Docker) the fake routes always return `404`, whatever this is set to. Never set it on staging or production. |

### 1.1 Local testing: central admin login

The fake API copies `docs/central-login-api.md` so the `/login` form can be built and screenshotted without the Laravel backend. Put these in `.env.local` (gitignored) and run `npm run dev -- -p 3001`:

```env
LMS_CENTRAL_URL=http://127.0.0.1:3001/api/dev/central-mock
# Google's published reCAPTCHA v2 test site key (always passes; reCAPTCHA FAQ)
RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
CENTRAL_LOGIN_MOCK=true
```

Endpoints (each answers after 400 ms, with CORS for `http://localhost:3001` and `http://127.0.0.1:3001`, including `OPTIONS`):

- `POST /api/dev/central-mock/api/central-login`
- `POST /api/dev/central-mock/api/central-login/select`
- `POST /api/dev/central-mock/api/central-login/forgot-password`
- `POST /api/dev/central-mock/handoff`: fake academy; shows "Fake academy: handoff received" and the token's length (never the token)

Fake accounts (any password works, except `wrong`):

| Input | Result |
|---|---|
| `one@test.dev` | `200 redirect` to the fake handoff |
| `two@test.dev` | `200 choose` with Acme Academy (logo) and Globex IELTS (`logo_url: null`) |
| `suspended@test.dev` | `403 academy_suspended` |
| `locked@test.dev` | `429 too_many_attempts`, `retry_after: 900` |
| `down@test.dev` | `503 service_unavailable` (login and forgot password) |
| `locked@test.dev` on forgot password | `429 too_many_attempts`, `retry_after: 900` (not in the contract, which answers `sent` over its limits; only here so the form's rate-limit message can be tested) |
| password `wrong` | `422 invalid_credentials` |
| any other email | `422 invalid_credentials` |
| empty `recaptcha_token` | `422 recaptcha_failed` |
| missing / invalid email or password | `422 validation_failed` with `errors` |
| selection older than **20 seconds** (short on purpose), or reused | `422 selection_expired` |
| `academy_id` not in the list | `422 invalid_selection` |

### 1.2 Local Host Development (`.env.development.local`)
When running Next.js directly on a host machine outside Docker (e.g. `npm run dev -- -p 3002` on macOS), the default `.env` specifies `BACKEND_URL=http://backend:3000`, which is unresolvable outside Docker's network bridge.
Developers running on the host create `.env.development.local` (gitignored, never committed):
```env
BACKEND_URL=http://127.0.0.1:5201
```
Next.js automatically gives `.env.development.local` highest precedence during `next dev`, pointing server-side fetches directly to the local backend container exposed at port 5201, while production and staging containers continue reading `http://backend:3000` from their runtime environments. Real production code does not rewrite URLs at runtime.

---

## 2. Server-Side vs. Client-Side Mechanics

### 2.1 Server Components (SSR / Server Actions / Route Handlers)
- Environment variables starting without `NEXT_PUBLIC_` (such as `BACKEND_URL`) are evaluated **at runtime** on the Node.js server.
- They are resolved inside the container when a request arrives (or during build if pages are statically pre-rendered).
- In Docker, these must be passed via `docker run -e BACKEND_URL=...` or via `environment:` in `docker-compose.yml`.

### 2.2 Client Components (`'use client'`)
- Variables prefixed with `NEXT_PUBLIC_` are **baked into the JavaScript bundle at build time** (`npm run build`).
- They cannot be changed at container startup time unless the application is recompiled.
- **App auth links are not `NEXT_PUBLIC_`:** The login, signup and forgot-password links are resolved on the server by `getAppAuthUrls()` (admin Settings first, then `APP_LOGIN_URL` / `APP_SIGNUP_URL` / `APP_FORGOT_PASSWORD_URL`) and passed to the client components as props. `/login` and `/signup` render per request, so a runtime env value (`docker run -e APP_LOGIN_URL=...`) or a changed admin setting applies immediately; no build arg is needed. If nothing is set, the buttons render in an explicit disabled state (with a red dev-only hint).
- **`SITE_URL` at build time and at runtime:** robots.txt and sitemap.xml read `SITE_URL` per request. The marketing pages, however, are prerendered during `npm run build` and refreshed every 5 minutes (ISR), so their canonical / Open Graph URLs come from the `SITE_URL` present **at build time** until the first refresh. Pass it to the Docker build as well (`docker build --build-arg SITE_URL=https://lmsdomain.com ...`; the builder stage declares `ARG SITE_URL`) and to the container (`-e SITE_URL=...`). Building one image with the production URL and running it on staging is safe: staging still serves `Disallow: /` because robots.txt checks the runtime value.
- **The Localhost Trap:** If `npm run build` is executed inside a container or developer machine where `NEXT_PUBLIC_BACKEND_URL=http://localhost:5201`, any user visiting the site on the internet will have their browser attempt to query their *own* local machine (`127.0.0.1:5201`), triggering immediate `ERR_CONNECTION_REFUSED`.

---

## 3. Section-by-Section Behavior When `BACKEND_URL` is Missing or Unreachable

| Section / Component | Source File | Backend Call & Endpoint | Behavior When Backend Fails / `BACKEND_URL` Missing |
| :--- | :--- | :--- | :--- |
| **SEO Metadata** | `app/page.tsx:7` | `fetchSeo({ slug: "home" })`<br>`POST /api/seo` | Returns empty object `{}`. Next.js falls back to root metadata title/description (`"LMS Domain"`). |
| **Footer Contact Info** | `Footer.tsx:23`<br>`FooterSection.tsx:68`<br>`CopyrightSection.tsx:7` | `getData("address")`<br>`POST /api/cms` | `addressData` becomes `{}`.<br>- **Social Media Icons:** `validLinks.length === 0` $\rightarrow$ Component returns `null` (icons completely disappear).<br>- **Email Link:** `data?.email` is undefined $\rightarrow$ mailto link omitted.<br>- **Phone Link:** `data?.phone` is undefined $\rightarrow$ tel link omitted. |
| **Footer Description** | `Footer.tsx:24`<br>`FooterSection.tsx:40` | `getData("footer")`<br>`POST /api/cms` | `contentData` becomes `{}`. Fallback kicks in: displays static hard-coded copy from `content/home/footer.ts` (`footerContent.description`). |
| **Homepage Hero, Features, Manifesto, AI, Benefits, FAQ** | `HomePage.tsx`<br>`BannerSection.tsx`<br>`FeaturesSection.tsx`<br>`AiSection.tsx` | Legacy calls ignored; reads from `content/home/*.ts` | **Completely unaffected** on homepage because content is loaded from local TypeScript fixtures. |
| **Enquiry Modal Form** | `EnquiryForm.tsx:31` | `POST /api/enquiry` | Submits directly from browser using `NEXT_PUBLIC_BACKEND_URL`. If missing or set to `localhost:5201`, client request fails with network error toast: *"Failed to submit enquiry"*. |
| **Legacy Subpages** (`/features`, `/pricing`, `/about`) | `FeaturesDetails.tsx`<br>`PriceFAQ.tsx`<br>`CoreValueSection.tsx` | `POST /api/features`, `/api/pricing/faq`, `/api/about/values` | Displays blank lists or throws SSR render errors if responses are empty. |

---

## 4. Staging Diagnosis: Why the Footer Broke on `staging.lmsdomain.online`

### 4.1 Root Cause Analysis
On `staging.lmsdomain.online`:
1. The frontend container was launched either without `BACKEND_URL` set, or pointing to an address that the frontend container cannot reach over Docker's bridge network.
2. In `components/layout/Footer.tsx`:
   ```typescript
   const baseUrl = (process.env.BACKEND_URL || process.env.BACKEND_INTERNAL_URL || "http://lms-landing-backend:3000").replace(/\/$/, "");
   const location = baseUrl + apiRoutes?.getAllCms;
   const addressData = await getData("address");
   ```
3. When `process.env.BACKEND_URL` is undefined, it fell back to `"http://lms-landing-backend:3000"`.
4. On the staging host, the backend container was likely named differently (e.g. `lms-backend`, `backend`, or running on a different Docker network, or exposed via host port).
5. The fetch call timed out or failed with `ENOTFOUND lms-landing-backend`.
6. The `try/catch` in `Footer.tsx` caught the error silently and returned `{}`:
   ```typescript
   } catch (error) {
     return {};
   }
   ```
7. Consequently:
   - `addressData` was `{}`.
   - `SocialMediaIcons` checks `if (validLinks.length === 0) return null;` $\rightarrow$ **Zero social icons rendered**.
   - `CopyrightSection` checks `{data?.email && ...}` and `{data?.phone && ...}` $\rightarrow$ **Email and phone disappeared**.
   - The footer looked stripped and incomplete.

### 4.2 Exact Container Configuration Required for Staging

To fix the staging container and ensure all SSR data loads reliably:

#### Option A: Docker Compose (Recommended)
Both frontend and backend must be on the same Docker network, with service discovery names:
```yaml
services:
  backend:
    image: lmsdomain-backend:latest
    container_name: lms-landing-backend
    networks:
      - lms-network
    environment:
      - PORT=3000
      - MONGO_URI=mongodb://mongo:27017/lmsdomain

  frontend:
    image: lmsdomain-frontend:latest
    container_name: lms-landing-frontend
    networks:
      - lms-network
    environment:
      - PORT=8080
      - BACKEND_URL=http://lms-landing-backend:3000
      - BACKEND_INTERNAL_URL=http://lms-landing-backend:3000
    ports:
      - "8080:8080"

networks:
  lms-network:
    name: lmsdomain-landing-backend_lms-network
    external: true
```

#### Option B: Standalone Docker Run Command
```bash
docker run -d \
  --name lmsdomain-frontend-staging \
  --network lmsdomain-landing-backend_lms-network \
  -e BACKEND_URL=http://lms-landing-backend:3000 \
  -e BACKEND_INTERNAL_URL=http://lms-landing-backend:3000 \
  -p 8080:8080 \
  lmsdomain-landing-frontend:latest
```

---

## 5. Architectural Fix for Step 3: Eliminate Browser-to-Backend Calls

### 5.1 The Problem with Browser-Direct Calls
Currently, `EnquiryForm.tsx` (the Request Demo modal) executes:
```typescript
const url = (process.env.NEXT_PUBLIC_BACKEND_URL || BACKEND_URL) + apiRoutes.getEnquiry;
const response = await fetch(url, { method: "POST", body: JSON.stringify(payload) });
```
This introduces significant fragility:
1. Requires exposing the backend port or domain directly to the public internet with CORS configured.
2. Bakes the URL at build time into client JS bundles.
3. Leaks internal topology.

### 5.2 The Robust Solution: Next.js API Route Proxy
In Step 3, all browser submissions will route to a Next.js App Router Route Handler:
- Client browser posts to `/api/enquiry` (relative path on same origin).
- Next.js server route handler (`app/api/enquiry/route.ts`) receives the request.
- Route handler forwards the payload to `${process.env.BACKEND_URL}/api/enquiry` using the reliable internal Docker network (`http://lms-landing-backend:3000`).
- Response returns to the browser.

**Benefits:**
- **Zero client-side environment variable dependencies:** No `NEXT_PUBLIC_BACKEND_URL` needed in browser bundles.
- **Zero CORS issues:** All browser requests are strictly same-origin (`/api/enquiry`).
- **Resilient across environments:** Works identically on local dev (`localhost:8080`), staging (`staging.lmsdomain.online`), and production without rebuilding Docker images.

---

## 6. Central admin login

The `/login` form signs academy admins in through the central domain's API (`docs/central-login-api.md`) and `/forgot-password` sends reset links. Both are off until these two **server** settings are present; they are read per request (not `NEXT_PUBLIC_`), so set them on the container with `docker run -e ...` and restart, no rebuild:

| Setting | Value |
|---|---|
| `LMS_CENTRAL_URL` | The central domain, `https://` and no path, e.g. `https://app.lmsdomain.com` (production). Staging: from the Laravel team. |
| `RECAPTCHA_SITE_KEY` | The central reCAPTCHA v2 checkbox **site** key from the Laravel team (public; the secret key stays on the Laravel side). |

Either missing or invalid → `/login` shows the old button to the app login URL and `/forgot-password` redirects to `/login`.

Origins sent to the Laravel team for `CENTRAL_LOGIN_ALLOWED_ORIGINS` (CORS):

| Environment | Origins |
|---|---|
| Production | `https://lmsdomain.com`, `https://www.lmsdomain.com` |
| Staging | `https://staging.lmsdomain.online` |
| Local only (never on production) | `http://localhost:3001`, `http://127.0.0.1:3001` |

Local testing without the Laravel API: see section 1.1 (fake API, `CENTRAL_LOGIN_MOCK=true`, dev server only).

Staging test accounts (from `docs/central-login-api.md`; the Laravel team provides one for each case):

| Account | Expect |
|---|---|
| Admin of one academy | `redirect`, then that academy's dashboard (or its login-code page) |
| Admin of two academies, same password | `choose` with both |
| Admin of two academies, different passwords | `redirect` to the one whose password was typed |
| Instructor or student | `invalid_credentials` |
| Admin of a suspended academy | `academy_suspended` |
| Admin of an academy with a custom domain | `redirect.url` on the custom domain |
| Wrong password 6 times | `too_many_attempts` |
| Wait 61 seconds before submitting the form | The academy's login page with "link expired" |
