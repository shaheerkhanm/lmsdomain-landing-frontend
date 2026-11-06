# Phase 2 Inventory

This document details the architectural and component inventory of `lmsdomain-landing-frontend` prior to the Phase 2 redesign, per Step 0 of Prompt 2A.

---

## 1. Current Navigation Components & Breakpoints

### Primary Header Component
- **File:** [`components/layout/Header.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/layout/Header.tsx)
- **Configuration Source:** [`content/navigation.ts`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/content/navigation.ts) (`navigationConfig.marketingNav`)

### Breakpoints & Views
1. **Desktop State-B Floating Pill (`hidden lg:flex`):**
   - **Active Range:** $\ge 1024\text{px}$ (`lg:` breakpoint)
   - **Structure:** Floating, centered rounded pill (`fixed top-4 inset-x-0 z-50 justify-center`) with `bg-white/95 backdrop-blur-md`, brand logo (full wordmark $\ge 1180\text{px}$, mark only between $1024\text{px}$–$1179\text{px}$), horizontal links with active indicators, "Log in" link, and primary "Request Demo" CTA button (opens `EnquiryForm` dialog modal).
2. **Mobile / Tablet Top Bar (`flex lg:hidden`):**
   - **Active Range:** $< 1024\text{px}$
   - **Structure:** Standard static header (`w-full absolute top-0 inset-x-0 z-40 h-20 px-4 sm:px-6`), brand logo, compact "Request Demo" CTA button, and hamburger toggle button.
3. **Mobile Full-Screen Drawer:**
   - **Trigger:** Opened via hamburger button below $1024\text{px}$.
   - **Structure:** Full-screen overlay (`fixed inset-0 z-50 bg-white`), vertical stacked navigation items with arrow affordance, "Log in", and full-width "Request Demo" CTA. Controlled with body scroll lock and `Escape` key listener.

### Footer Component
- **Files:** [`components/layout/Footer.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/layout/Footer.tsx), [`components/layout/common/FooterSection.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/layout/common/FooterSection.tsx)
- **Links Source:** `DEFAULT_FOOTER_COLUMNS` in `FooterSection.tsx` with dynamic page visibility checks (`usePageVisibility`) and legal slugs from `/api/cms`.

---

## 2. Current Routes under `app/`

### Marketing Pages (`app/(marketing)/`)
- `/` — [`app/(marketing)/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/page.tsx)
- `/features` — [`app/(marketing)/features/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/features/page.tsx)
- `/ai` — [`app/(marketing)/ai/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/ai/page.tsx)
- `/pricing` — [`app/(marketing)/pricing/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/pricing/page.tsx)
- `/custom-lms` — [`app/(marketing)/custom-lms/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/custom-lms/page.tsx)
- `/about` — [`app/(marketing)/about/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/about/page.tsx)
- `/contact` — [`app/(marketing)/contact/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/contact/page.tsx)
- `/[legal]` — [`app/(marketing)/[legal]/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/[legal]/page.tsx) (handles `/privacy-policy`, `/terms`, `/refund-policy`, `/dpa`)

### Auth Pages (`app/(auth)/`)
- `/login` — [`app/(auth)/login/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(auth)/login/page.tsx)
- `/signup` — [`app/(auth)/signup/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(auth)/signup/page.tsx)
- `/forgot-password` — [`app/(auth)/forgot-password/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(auth)/forgot-password/page.tsx)

### API & Utility Routes
- `/api/enquiry` — Enquiry submission proxy with rate limiting and honeypot
- `/api/revalidate` — CMS webhook on-demand cache revalidation
- `/og/[page]` — Dynamic OpenGraph social card image generator
- `/site-icon/[name]` — Dynamic manifest and favicon icon generator
- `/sitemap.xml` — Deterministic XML sitemap
- `/robots.txt` — Environment-aware robots directives
- `/uploads/[...path]` — Local media proxy to backend static upload directory

---

## 3. Section Components and Data Sources (`/`, `/features`, `/ai`)

### Homepage (`/`)
Container: [`components/modules/HomePage.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/modules/HomePage.tsx)

| Section Component | Fallback Content File | CMS Slug / API Endpoint | Notes |
|---|---|---|---|
| `BannerSection` | `content/home/hero.ts` | `site-home-hero` (`home-hero`) | Static display headline, demo CTA |
| `FeaturesSection` | `content/home/features.ts` | `site-home-teach-smarter` (`home-teach-smarter`) | 3 capability cards + pinned preview |
| `ManifestSection` | `content/home/manifesto.ts` | `site-home-manifesto` (`home-manifesto`) | Text reveal manifesto |
| `AiSection` | `content/home/ai.ts` | `site-home-ai` (`home-ai`) | Domie AI feature highlights |
| `AdvantageSection` | `content/home/benefits.ts` | `site-home-benefits` (`home-benefits`) | Horizontal scroll / stacked cards |
| `ClientLogosSection` | None (code fallback empty) | `GET /api/home/clients` | Filtered partner logos (Client-N removed) |
| `FaqSection` | `content/home/faq.ts` | `site-home-faq` (`home-faq`) | Accordion FAQs |

### Features Page (`/features`)
Container: [`app/(marketing)/features/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/features/page.tsx)

| Section Component | Fallback Content File | CMS Slug / API Endpoint | Notes |
|---|---|---|---|
| `HeroAssembly` | `content/features/hero.ts` | `site-features-hero` | Interactive assembly illustration |
| `FeatureMarquee` | `content/features/catalog.ts` | Code-only (`FEATURE_CATEGORIES`) | 38 sliding feature badges |
| `BentoOverview` | `content/features/catalog.ts` | `site-features-overview` | 12-column live bento grid |
| `AudienceSwitcher` | `content/features/audiences.ts` | `site-features-audiences` | 3 audience tabs (Language, K-12, Training) |
| `AiDarkChapter` | `content/features/catalog.ts` | `site-features-ai-spotlight` | Full-bleed `#161616` chapter with Domie Bot |
| `HorizontalJourney` | `content/features/journey.ts` | `site-features-journey` | Student lifecycle steps |
| `StickyCategoryChapters` | `content/features/catalog.ts` | `site-features-categories` | Sticky 40/60 category breakdown |
| `BrandingPlayground` | Code-only interactive state | None | Live theme recoloring sandbox |
| `CommandPalette` | `content/features/catalog.ts` | None | Keyboard searchable ⌘K modal |
| `IntegrationsHub` | `content/features/integrations.ts` | `site-features-integrations` | Gateway & tool compatibility cards |
| `FinalCtaCard` | `content/features/cta.ts` | `features-cta` | Dark conversion card with magnetic CTA |

### AI Page (`/ai`)
Container: [`app/(marketing)/ai/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/ai/page.tsx)

| Section Component | Fallback Content File | CMS Slug / API Endpoint | Notes |
|---|---|---|---|
| `AiHero` | `content/ai/hero.ts` | `ai-hero` | Hero with command prompt mock |
| `AiShowcase` | `content/ai/tools.ts` | `ai-tools` | 4 pinned tool demonstrations |
| `AiHowItWorks` | `content/ai/how-it-works.ts` | `ai-how-it-works` | 3-step pipeline (only if in CMS) |
| `AiAvailability` | `content/ai/availability.ts` | `ai-availability` | Premium tier access details |
| `AiRelatedTools` | `content/ai/related.ts` | `ai-related-tools` | 4 peripheral capabilities |
| `MarketingFaq` | `content/ai/faq.ts` | Optional CMS items | FAQ accordion |
| `CtaSection` | `content/ai/cta.ts` | `ai-cta` | Closing CTA card |

---

## 4. Sections Rendered Twice (Mobile vs Desktop DOM Duplication)

The following components currently render dual DOM trees toggleable only via CSS (`hidden lg:block` / `lg:hidden`), violating responsive single-DOM principles:

1. **[`components/sections/HomePage/Banner/LmsProductStage.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/sections/HomePage/Banner/LmsProductStage.tsx):**
   - Desktop stage (`hidden lg:block` at line 268) renders an elaborate multi-card floating assembly.
   - Mobile stage renders a separate simplified stacked version.
2. **[`components/sections/HomePage/FeaturesSection/FeaturesSection.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/sections/HomePage/FeaturesSection/FeaturesSection.tsx):**
   - Desktop pinned scrollytelling (`hidden lg:block` at line 533) with GSAP ScrollTrigger.
   - Mobile accordion cards rendered in a parallel branch.
3. **[`components/sections/HomePage/ManifestSection.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/sections/HomePage/ManifestSection.tsx):**
   - Desktop pinned text container (`hidden lg:block` at line 112) with GSAP scrub.
   - Mobile simple text block rendered separately.
4. **[`components/sections/HomePage/AiSection/AiSection.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/sections/HomePage/AiSection/AiSection.tsx):**
   - Desktop interactive bento flow (`hidden lg:block` at line 562, `hidden lg:flex` at line 690).
   - Mobile fallback cards.
5. **[`components/sections/HomePage/AdvantageSection/AdvantageScrollMain.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/sections/HomePage/AdvantageSection/AdvantageScrollMain.tsx):**
   - Desktop horizontal slider track (`hidden lg:flex` at line 187).
   - Mobile vertical stacked list.
6. **[`components/marketing/features/AiDarkChapter.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/features/AiDarkChapter.tsx):**
   - Desktop pinned 12-column layout (`hidden lg:grid` at line 235).
   - Mobile vertical stack (`grid grid-cols-1 gap-6 lg:hidden` at line 470).
7. **[`components/marketing/features/HorizontalJourney.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/features/HorizontalJourney.tsx):**
   - Desktop horizontal scroll track (`hidden lg:block` at line 201).
   - Mobile vertical card timeline (`lg:hidden` at line 272).
8. **[`components/marketing/AiShowcase.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/AiShowcase.tsx):**
   - Desktop pinned 12-column showcase (`hidden lg:grid` at line 547).
   - Mobile vertical cards (`lg:hidden space-y-12` at line 680).

---

## 5. Where `/features` Marquee is Rendered

- **Component:** [`components/marketing/features/FeatureMarquee.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/features/FeatureMarquee.tsx)
- **Render Location:** Directly inside [`app/(marketing)/features/page.tsx`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/app/(marketing)/features/page.tsx#L101-L103) right below `<HeroAssembly />` (Section 1) and preceding `<BentoOverview />` (Section 2).
- **Implementation:** Two continuous animated CSS/framer marquee rows slicing 38 feature cards from `content/features/catalog.ts` (`FEATURE_CATEGORIES`), paused on `:hover` and disabled when `prefers-reduced-motion` is active.

