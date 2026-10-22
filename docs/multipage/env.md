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
| `NEXT_PUBLIC_APP_LOGIN_URL` | **Client-side (Build-time baked)** | `undefined` | `components/marketing/AuthLoginForm.tsx` | Mode A redirect URL for LMS application login. |
| `NEXT_PUBLIC_APP_SIGNUP_URL` | **Client-side (Build-time baked)** | `undefined` | `components/marketing/AuthSignupForm.tsx` | Mode A redirect URL for LMS application signup. |
| `NEXT_PUBLIC_APP_FORGOT_PASSWORD_URL` | **Client-side (Build-time baked)** | `undefined` | `components/marketing/AuthLoginForm.tsx` | Mode A password reset URL. |

### 1.1 Local Host Development (`.env.development.local`)
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
- **Docker Build Args Required:** Because `NEXT_PUBLIC_APP_LOGIN_URL`, `NEXT_PUBLIC_APP_SIGNUP_URL`, and `NEXT_PUBLIC_APP_FORGOT_PASSWORD_URL` are client-side variables, they must be supplied during image creation (e.g. `docker build --build-arg NEXT_PUBLIC_APP_LOGIN_URL=...`) for staging and production deployments. In development, they can be set in `.env.local` or `.env.development.local`. If left unset in dev, the buttons render in an explicit disabled state with a red dashed indicator.
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

