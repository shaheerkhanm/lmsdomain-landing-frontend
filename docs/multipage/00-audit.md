# Multi-Page Foundation Audit: Backend, Content Models, Design System & Routes

**Date:** 2026-10-21  
**Branch:** `feature/multipage` (created from `77ca9c0`)  
**Scope:** Step 1 Audit for Multi-page marketing site expansion

---

## 1. Landing Page Content Flow & Backend Mapping

### 1.1 Backend Communication Architecture
- **Base URLs & Environment Variables:**
  - `process.env.BACKEND_URL`: Primary server-side URL used during SSR in Next.js Server Components.
  - `process.env.BACKEND_INTERNAL_URL`: Internal Docker network fallback (e.g. `http://lms-landing-backend:3000`).
  - `process.env.NEXT_PUBLIC_BACKEND_URL`: Baked into client bundles at build time (previously defaulted to `http://localhost:5201` or `https://cms.lmsdomain.com`).
- **Fetch Helpers (`utils/api/index.ts`):**
  - [`fetchData({ url, body })`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/utils/api/index.ts#L69-L93): Generic `POST` request with JSON payload. Default options: `method: "POST"`, `headers: { "Content-Type": "application/json" }`, `cache: "no-cache"`. No custom authentication headers (public endpoints).
  - [`fetchSeo({ slug })`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/utils/api/index.ts#L15-L42): Calls `${process.env.BACKEND_URL}/api/seo` with `slug` in request body.
- **Caching & Revalidation:**
  - Currently set to `cache: "no-cache"` on every fetch call.
  - No ISR (`revalidate`) tags or automated webhook triggers currently exist.
- **Endpoints Defined (`utils/api/apiRoutes.ts`):**
  - `/api/cms` (All CMS single documents by `slug`)
  - `/api/home/smartTeach`, `/api/home/customers`, `/api/home/features`, `/api/home/clients`, `/api/home/results`, `/api/home/testimonials`
  - `/api/pricing`, `/api/pricing/faq`
  - `/api/features`, `/api/features/content`
  - `/api/about/values`, `/api/about/leadership`
  - `/api/seo`, `/api/enquiry`

---

### 1.2 Homepage Section-by-Section Data Source Audit

| Section | Frontend File & Line | Backend Call Made in `HomePage.tsx` | Data Consumed by Component | Status |
| :--- | :--- | :--- | :--- | :--- |
| **SEO Metadata** | `app/page.tsx:7` | `fetchSeo({ slug: "home" })` | `metatitle`, `metadescription`, `metakeyword` from `seos` collection | **Connected to Backend** |
| **Hero Stage** | `BannerSection.tsx:36`<br>`MainHeading.tsx:7`<br>`LmsProductStage.tsx:17` | `getData("home-hero")`<br>`getData("home-graph-section")` | Ignored by redesign components; reads from `content/home/hero.ts` | **Hard-coded local content** |
| **Features Cards** | `FeaturesSection.tsx:502` | `getData("home-teach-smarter")` | Ignored; reads from `content/home/features.ts` | **Hard-coded local content** |
| **Manifesto Reveal** | `ManifestSection.tsx:8` | None | Reads from `content/home/manifesto.ts` | **Hard-coded local content** |
| **AI Studio (3-step)** | `AiSection.tsx:28` | None | Reads from `content/home/ai.ts` | **Hard-coded local content** |
| **Benefits Cards** | `AdvantageSection.tsx:39`<br>`AdvantageScrollMain.tsx:300` | `getData("results")` | Ignored; reads from `content/home/benefits.ts` | **Hard-coded local content** |
| **Wall of Love** | `CustomerSection.tsx:561` | `getData("customers")` | Ignored; reads from `content/home/testimonials.ts` | **Hard-coded local content** |
| **FAQ Accordion** | `FaqSection.tsx:15` | None | Reads from `content/home/faq.ts` | **Hard-coded local content** |
| **Footer Contact Info** | `Footer.tsx:26` | `getData("address")` | Consumed: `email`, `phone`, `twitter`, `instagram`, `fb`, `youtubelink`, `linkedin` | **Connected to Backend** |
| **Footer Description** | `Footer.tsx:27` | `getData("footer")` | Consumed: `contentData.content` (with HTML sanitization) | **Connected to Backend** |

---

### 1.3 Correction & Confirmation of `backend-map.md`

Based on direct database audit of MongoDB (`lmsdomain` database) and Express backend controllers:

| Admin Section | Admin Collection / Slug | Real Backend Schema Fields | Planned Marketing Use | Confirmation / Corrections |
| :--- | :--- | :--- | :--- | :--- |
| **Enquiry** | Collection: `enquiries`<br>Model: `Enquiry` | `name`, `organizationName`, `phoneNumber`, `email`, `subject`, `type` (`1`=enquiry, `2`=cta), `createdAt` | Contact form & Request Demo Modal | **Confirmed.** Admin shows empty name/phone for CTA entries because type `2` only collects email. Type `1` saves all fields. |
| **Home > Cms** | Collection: `cms`<br>Slug: `home-hero` | `title`, `subTitle`, `description`, `buttonText`, `buttonAction`, `tags`, `tags1`, `image`, `image1`, `image3` | Homepage Hero fallback | **Confirmed.** Title: *"Your Branded Learning Hub Starts Here."* |
| **Home > Cms** | Collection: `cms`<br>Slug: `home-graph-section` | `title`, `buttonText`, `content`, `image` | Homepage metrics | **Confirmed.** Title: *"10+"*, ButtonText: *"25+ countries served"*. |
| **Home > Cms** | Collection: `cms`<br>Slug: `home-teach-smarter` | `title`, `cmsTitle`, `image` | Features intro | **Confirmed.** Title: *"Everything You Need to Teach Smarter"*. |
| **Home > Cms** | Collection: `cms`<br>Slug: `customers` | `title`, `cmsTitle` | Customer proof strip | **Confirmed.** Title: *"Built for Trainers, Institutes & Businesses"*. |
| **Home > Cms** | Collection: `cms`<br>Slug: `features` | `title`, `cmsTitle` | Features section header | **Confirmed.** Title: *"A Complete Package Ready to Deploy"*. |
| **Home > Cms** | Collection: `cms`<br>Slug: `results` | `title`, `cmsTitle` | Results/Benefits intro | **Confirmed.** Title: *"Real Results"*. |
| **Home > Cms** | Collection: `cms`<br>Slug: `testimonials` | `title`, `cmsTitle` | Wall of Love heading | **Confirmed.** Title: *"We don’t just have customers. We have believers."* |
| **Home > Cms** | Collection: `cms`<br>Slug: `cta` | `title`, `subTitle`, `buttonText`, `buttonAction`, `image` | Bottom CTA band | **Confirmed.** Title: *"Ready To Build Your Learning Empire?"*. |
| **Home Sub-items** | `smartteaches` | `slug`, `title`, `subTitle`, `image`, `altImage` | AI / Smart Teach items | **Confirmed.** 2 documents exist (`SmartTechTest`, `Smart Automation`). |
| **Home Sub-items** | `results` | `slug`, `title`, `subTitle` | Metric statistics | **Confirmed.** 1 document exists (`Result1`). |
| **Home Sub-items** | `customers`, `homefeatures`, `clients`, `testimonials` | Models exist in backend | Dynamic lists for homepage | Currently 0 documents in DB. |
| **Pricing** | Collection: `cms`<br>Slug: `pricing-hero`<br>Slug: `pricing-faq`<br>Slug: `pricing-footer-card`<br>Collection: `pricings`<br>Collection: `faqs` | `Pricing`: `slug`, `title`, `subTitle`, `price`, `price_yearly`, `duration_days`, `max_users`, `discount`, `tags`, `buttonText`, `buttonAction`, `description`, `displayOrder`<br>`Faq`: `slug`, `question`, `answer` | `/pricing` page | **Confirmed.** CMS entry `pricing-hero` exists. Model `Pricing` and `Faq` exist in backend (currently 0 documents in `pricings`, populated via CMS and fixtures). |
| **Features** | Collection: `cms`<br>Slug: `features-hero`<br>Slug: `features-content`<br>Collection: `features`<br>Collection: `contents` | `Features`: `slug`, `title`, `subTitle`, `displayOrder`, `tags`, `image`, `content`, `altImage`<br>`Content`: `slug`, `title`, `content` | `/features` page | **Confirmed.** `features-hero` and `features-content` CMS documents exist. |
| **About** | Collection: `cms`<br>Slug: `about-hero`<br>Slug: `about-mission`<br>Slug: `about-values`<br>Slug: `about-story`<br>Slug: `about-leadership`<br>Slug: `about-mission-card`<br>Collections: `values`, `leaderships` | `Values`: `slug`, `title`, `content`<br>`Leadership`: `name`, `profession`, `image`, `description`, `altImage` | `/about` page | **Confirmed.** All 6 CMS entries exist in database. |
| **Seo** | Collection: `seos` | `slug`, `page`, `metatitle`, `metadescription`, `metakeyword`, `other_tag`, `author` | `generateMetadata()` on all pages | **Confirmed.** 4 documents exist (`home`, `pricing`, `features`, `about`). |
| **Settings** | Collection: `cms`<br>Slug: `address`<br>Slug: `footer`<br>Slug: `mail-options` | `email`, `phone`, `twitter`, `instagram`, `fb`, `youtubelink`, `linkedin`, `content` | Global Header, Footer, and Contact details | **Confirmed.** Serves site-wide settings. |

---

## 2. Backend Content Model (TypeScript Interfaces)

```typescript
// ============================================================================
// Core CMS Document (Shared across page sections)
// Collection: cms | Endpoint: POST /api/cms { slug: string }
// ============================================================================
export interface CmsDocument {
  _id: string;
  slug: string;
  pageSlug?: string;
  cmsTitle?: string;
  title?: string;
  subTitle?: string;
  content?: string;             // Rich text HTML (e.g. footer description)
  heading?: string;
  description?: string;
  description1?: string;
  buttonText?: string;
  buttonAction?: string;        // URL or anchor link
  image?: string;               // URL: relative (/uploads/...) or absolute
  image1?: string;
  image2?: string;
  image3?: string;
  altImage?: string;
  altImage1?: string;
  altImage2?: string;
  altImage3?: string;
  logo?: string;
  tags?: string[];
  tags1?: string[];
  counts?: Array<{ title: string; count: string }>;
  
  // Settings / Contact specifics (slug: "address")
  email?: string;
  phone?: string;
  alternativeEmail?: string;
  alternativePhone?: string;
  address?: string;
  address1?: string;
  website?: string;
  fb?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtubelink?: string;
  
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Pricing Plan Model
// Collection: pricings | Endpoint: POST /api/pricing
// ============================================================================
export interface PricingPlan {
  _id: string;
  slug: string;
  title: string;                // Plan name (e.g., "Starter", "Scale", "Enterprise")
  subTitle?: string;            // Short pitch
  price: number;                // Monthly price in USD/INR
  price_yearly?: number;        // Discounted annual price
  duration_days?: string;
  max_users?: number;           // Learner capacity limit
  discount?: number;            // Percentage discount
  tags: string[];               // Bullet points / feature list
  buttonText?: string;          // e.g., "Start Free Trial" or "Request Demo"
  buttonAction?: string;        // Checkout link or modal trigger
  description?: string;         // Detailed plan notes (rich text/plain)
  displayOrder?: number;
  isActive: boolean;
  isDeleted: boolean;
}

// ============================================================================
// FAQ Item Model
// Collection: faqs | Endpoint: POST /api/pricing/faq
// ============================================================================
export interface FaqItem {
  _id: string;
  slug: string;
  question: string;
  answer: string;               // Rich text or plain string
  isActive: boolean;
  isDeleted: boolean;
}

// ============================================================================
// Features Model
// Collection: features | Endpoint: POST /api/features
// ============================================================================
export interface FeatureItem {
  _id: string;
  slug: string;
  title: string;
  subTitle?: string;
  content?: string;             // Detailed rich text description
  tags?: string[];
  image?: string;               // Illustration / preview URL
  altImage?: string;
  displayOrder?: number;
  isActive: boolean;
  isDeleted: boolean;
}

// ============================================================================
// About Page Models
// Collections: values, leaderships | Endpoints: /api/about/values, /api/about/leadership
// ============================================================================
export interface AboutValue {
  _id: string;
  slug: string;
  title: string;
  content: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface AboutLeadership {
  _id: string;
  name: string;
  profession?: string;
  image?: string;
  description?: string;
  altImage?: string;
  isActive: boolean;
  isDeleted: boolean;
}

// ============================================================================
// SEO Metadata Model
// Collection: seos | Endpoint: POST /api/seo { slug: string }
// ============================================================================
export interface SeoMetadata {
  _id: string;
  slug: string;
  page?: string;
  metatitle?: string;
  metadescription?: string;
  metakeyword?: string[];
  other_tag?: string;
  author?: string;
  isActive: boolean;
}

// ============================================================================
// Enquiry Submission Model
// Collection: enquiries | Endpoint: POST /api/enquiry
// ============================================================================
export interface EnquiryPayload {
  name: string;
  organizationName: string;
  phoneNumber: string;          // Numeric string, 7-15 digits
  email: string;
  subject: string;
  type: 1 | 2;                  // 1 = General/Demo Enquiry, 2 = Newsletter/CTA
}
```

### Image URL Resolution Rules
Backend images come in two formats:
1. Relative backend upload path: `/uploads/...` (e.g. `/uploads/upload1791284707770.svg`).
   - Served by the backend at `http://lms-landing-backend:3000/uploads/...` or through the public URL `http://127.0.0.1:5201/uploads/...`.
2. Local static frontend asset: `/assets/img/...`.
   - Served directly by Next.js static asset handler from the `public/` folder.

---

## 3. Existing Design System & Tokens

### 3.1 Colors & Theme Variables (`app/globals.css`)
- **Page Background:** `--color-page: #FFFFFF;`
- **Section Alternate:** `--color-alternate: #F3F4F6;`
- **Ink Primary:** `--color-ink: #161616;`
- **Body Muted:** `--color-body-gray: #6B6F76;`
- **Unlit/Disabled:** `--color-unlit: #C9CCD1;`
- **Border Neutral:** `#ECEDEF` and `#E2E8F0`
- **Brand Accent:** `--color-mota-accent: #7B5CF5;` (Royal Purple)
- **Pastel Pill Highlights:**
  - Yellow: `#F3CF74`
  - Purple: `#8E7CF8`
  - Mint: `#A6E3D3`

### 3.2 Typography & Fonts
- **Primary Display & Headings:** `font-urbanist` (`var(--font-urbanist)`, weights 500, 600, 700).
- **Body & Data Text:** `font-inter` (`var(--font-inter)`).
- **Secondary Legacy:** `font-manrope` (`var(--font-manrope)`).
- **Type Scale Rules:**
  - Page Hero H1: 56px desktop (`text-[56px] font-semibold leading-[1.1] tracking-tight`), 36px mobile (`text-[32px]` or `text-4xl`).
  - Section H2: 44px desktop (`text-[44px] font-semibold tracking-tight`), 30px mobile (`text-[30px]`).
  - Card Titles: 20px (`text-[20px] font-semibold tracking-tight`).
  - Subtitles / Lead: 19px desktop (`text-[19px]`), 17px mobile (`text-[17px]`).
  - Body: 15px desktop, 14px mobile.
  - Eyebrows: 12px uppercase (`text-xs font-semibold uppercase tracking-wider`).

### 3.3 Border Radii & Elevation
- **Large Cards (Features, FAQ enclosure):** `rounded-[32px]` or `rounded-[40px]`.
- **UI / Product Cards:** `rounded-[20px]` (`--radius-card-ui`).
- **Benefit Cards:** `rounded-[28px]` (`--radius-card-benefit`).
- **Pill Nav:** `rounded-full` / `rounded-[18px]`.
- **Primary Buttons:** `rounded-full` (Mota style) or `rounded-xl` (12px).
- **Shadows:**
  - Card elevation: `0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)`
  - Nav B Floating Pill: `0 10px 30px -5px rgba(0,0,0,0.08)`

### 3.4 Existing Reusable UI Pieces
- **Pill Navigation (`Header.tsx`):** State A (hero symmetrical) $\rightarrow$ State B (sticky glass pill with active route indicator).
- **Enquiry Modal (`EnquiryForm.tsx`):** Radix Dialog form with full validation (Name, Email, Phone, Organization, Subject).
- **FAQ Accordion (`FaqSection.tsx`):** Large white card with expandable rows and chevron indicator.
- **CTA Band (`AiSection.tsx` / `HomePage.tsx`):** Rounded enclosure card with dark backdrop.
- **Brand Mark:** Black rounded square with white "D" glyph (`/assets/img/logo/mark-square.svg`).

---

## 4. Current Routes & Navigation Audit

### 4.1 Routes Currently in `app/`

| Route Path | Exists in Repo? | Quality / Implementation Status | Target Disposition for Multipage Foundation |
| :--- | :--- | :--- | :--- |
| `/` | **YES** | Redesigned signed-off homepage (`77ca9c0`) | Keep 100% unchanged inside `app/(marketing)/page.tsx` |
| `/features` | **YES** | Legacy design (`font-manrope`, old banners) | Redesign to Mota foundation in `app/(marketing)/features/` |
| `/pricing` | **YES** | Legacy design (`font-manrope`, old tables) | Redesign to Mota foundation in `app/(marketing)/pricing/` |
| `/about` | **YES** | Legacy design (`font-manrope`, old sliders) | Redesign to Mota foundation in `app/(marketing)/about/` |
| `/ai` | **NO** | Missing | New page in `app/(marketing)/ai/page.tsx` (Domie AI) |
| `/contact` | **NO** | Missing (currently opens modal or anchor `#cta-enquiry`) | New page in `app/(marketing)/contact/page.tsx` |
| `/privacy-policy` | **YES** | Full legal text (`PrivacyPolicy.tsx`) | Move to `app/(marketing)/[legal]/page.tsx` |
| `/terms` | **YES** | Full legal text (`TermsOfService.tsx`) | Move to `app/(marketing)/[legal]/page.tsx` |
| `/refund-policy` | **YES** | Full legal text (`RefundPolicy.tsx`) | Move to `app/(marketing)/[legal]/page.tsx` |
| `/dpa` | **YES** | Full legal text (`Dpa.tsx`) | Move to `app/(marketing)/[legal]/page.tsx` |
| `/login` | **NO** | Missing | New auth redirect in `app/(auth)/login/page.tsx` |
| `/signup` | **NO** | Missing | New auth redirect in `app/(auth)/signup/page.tsx` |
| `not-found` | **YES** | Minimal text | Replace with branded Urbanist 404 in `app/not-found.tsx` |

### 4.2 Header & Footer Navigation Links

- **Header Nav Links:**
  - Currently hardcoded in `Header.tsx`: `Features (#features)`, `AI Studio (#extension)`, `Benefits (#benefits)`, `FAQ (#faq)`, `Contact us` (modal trigger).
  - Multi-page requirement: On subpages, links must point to `/features`, `/ai`, `/pricing`, `/about`, `/contact`. On Home, they jump to section anchors (`/#features`, `/#faq`, etc.).
- **Footer Links (`FooterSection.tsx`):**
  - Platform: `/features`, `/pricing`, `/pricing#faqSection`, `/#cta-enquiry`.
  - Company: `/`, `/about`, `/features`.
  - Legal: `/privacy-policy`, `/terms`, `/refund-policy`, `/dpa`.

---

## 5. Environment Variables Analysis

See dedicated document: [`docs/multipage/env.md`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/docs/multipage/env.md).
