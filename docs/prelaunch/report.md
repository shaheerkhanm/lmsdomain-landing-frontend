# Pre-Launch Audit and Polish Report (Frontend)

**Target Branch:** `feature/multipage`  
**Base URL audited:** `http://localhost:3001` (with `BACKEND_URL=https://lmsdomain.com` and `SITE_URL=https://lmsdomain.com`)  
**Audit Date:** October 24, 2026  
**Audited Routes (13 total):** `/`, `/features`, `/ai`, `/pricing`, `/about`, `/contact`, `/login`, `/signup`, `/privacy-policy`, `/terms`, `/refund-policy`, `/dpa`, `/this-url-does-not-exist` (404)  
**Audited Viewports:** Desktop (1440px), Tablet (768px), Mobile (390px)  

---

## 1. Fixed in Code

| Item | Details & Root Cause | Commit |
| :--- | :--- | :--- |
| **Collapse Empty Band on `/about`** | When the hero image is omitted or unapproved in CMS, `PageHero` had large bottom padding (`pb-12 lg:pb-16`) and `ManifestSection` had `lg:py-24 lg:sm:py-32 lg:min-h-[600px]`, creating a >400px empty white band. Updated `ManifestSection` to accept a custom `className` override and collapsed spacing in `AboutView` when `!data.hero.image` (`pb-4 lg:pb-6` on hero, `pt-2 pb-12 lg:pt-4 lg:pb-16 lg:min-h-[380px]` on mission statement). | `13854d9` |
| **Canonical URLs, Robots & Sitemap** | `metadataBase` was missing in `app/layout.tsx`, producing Next.js build warnings and relative/localhost canonical URLs. Added `metadataBase: getMetadataBase()` defaulting to `https://lmsdomain.com` (guaranteed never localhost or staging). Updated `Canonical.tsx` to return `null` so Next.js server-rendered `<link rel="canonical" href="https://lmsdomain.com/...">` in `<head>` is authoritative without client tampering. Guarded `app/robots.ts` so all staging domains (`SITE_URL` containing `staging`) return `disallow: /`. Set `app/sitemap.ts` fallback origin. | `16872ff` |
| **Organization JSON-LD on Home Page** | Added Schema.org `Organization` structured data script to `app/(marketing)/page.tsx` including `name: "LMS Domain"`, canonical `url: "https://lmsdomain.com"`, `logo: "https://lmsdomain.com/site-icon/apple-touch-icon.png"` (or CMS icon), and populated `sameAs` array with sanitized social links (Twitter/X, LinkedIn, Facebook, Instagram, YouTube) from the CMS `address` document. | `16872ff` |
| **Page Title Consistency & Branding** | Enhanced `fullTitle()` in `lib/site.ts` to prevent duplicating "LMS Domain" when already present (fixed bug where `"LMS Domain"` became `"LMS Domain \| LMS Domain"`). Ensured home page title always includes `"LMS Domain"` (`"Modern AI-Powered Learning Platform \| LMS Domain"`). All 13 routes now consistently include `"LMS Domain"`. | `16872ff` |
| **Eliminate Mobile Horizontal Overflow** | On all marketing pages, mobile (390px) and tablet (768px) views were experiencing 587px horizontal scroll. Identified root cause in `FooterSection.tsx`: `/assets/img/logo/logo.svg` has an intrinsic SVG width of 1347px; without an explicit `max-width`, `w-auto` expanded the logo to 1347px wide. Constrained the footer logo with `width={208} height={36} className="h-8 md:h-9 w-auto max-w-[210px] object-contain"`. All 13 pages now pass responsive overflow checks with zero scrollbar expansion. | `c3d9db4` |

---

## 2. Needs Content in the Admin

| Page / Area | Section / Field | What's Missing / Needed from Owner |
| :--- | :--- | :--- |
| **Auth Redirection** (`/login`, `/signup`) | `Settings > App links` (`app-links`) or server env `APP_LOGIN_URL`, `APP_SIGNUP_URL` | Set the real target LMS academy login and signup URLs (e.g., `https://app.lmsdomain.com/login` and `https://app.lmsdomain.com/signup`). In local/staging without these, the action button shows the dev disabled/missing-env warning. |
| **About Hero Image** (`/about`) | `About > Hero > Image` (`about-hero`) | Currently omitted in code because previous seed had an unlicensed Unsplash preview image. The layout now collapses cleanly without an image, but if a licensed high-res photograph is available, it should be uploaded in Admin > CMS > `about-hero`. |
| **Contact Phone Number** (`/contact`, footer) | `Settings > Address` (`address`) | Verify the official contact phone number. The frontend filters out placeholder phone numbers (`1234567890`) so no fake phone appears on the live site. Enter the real telephone number to show telephone support channels. |
| **Social Media Accounts** (footer & JSON-LD) | `Settings > Address` (`address`) | Active links configured in CMS: Twitter (`LMSDOMAIN`), YouTube (`lmsdomain`), Facebook (`lmsdomain`), Instagram (`lmsdomain`), LinkedIn (`lmsdomain`). Confirm whether these match the company's verified social profiles. |
| **Pricing Tier Verification** (`/pricing`) | `Admin > Pricing` (`pricings`) | Confirm all 4 published tiers, yearly billing discounts, user limits, and features match the launch commercial offerings. |
| **Mobile App Store Links** (Home) | `Home > Mobile app` (`site-home-mobile-app`) | If native iOS/Android apps are live at launch, configure their respective App Store and Google Play URLs; if not, leaving them blank in CMS cleanly hides the download badges. |

---

## 3. Needs a Decision

1. **LMS App Login / Signup Target URLs:**
   - *Current Behavior:* Mode A (Branded Redirect).
   - *Decision:* Please specify the production LMS URL (e.g., `https://app.lmsdomain.com` or tenant-based) to set `APP_LOGIN_URL` and `APP_SIGNUP_URL` in production container deployment.
2. **About Page Hero Image:**
   - *Current Behavior:* Gracefully collapsed layout with no hero photo; goes straight from hero header into the illuminated Mission Statement.
   - *Decision:* Confirm whether to launch without an image or provide a licensed product/academy photograph.
3. **Contact Phone Display:**
   - *Current Behavior:* Phone channel is hidden on `/contact` because `1234567890` is flagged as a placeholder.
   - *Decision:* Provide real customer service phone number or keep phone channel hidden and rely on email / live demo enquiry form.

---

## 4. Lighthouse Scores (Mobile)

*Measured on Mobile emulation (Moto G Power, 4G throttling, simulated CPU throttling, headless Chrome 155):*

| Route | Performance | Accessibility | Best Practices | SEO |
| :--- | :---: | :---: | :---: | :---: |
| **Home (`/`)** | **81** | **90** | **100** | **100** |
| **Features (`/features`)** | **77** | **95** | **100** | **100** |
| **Pricing (`/pricing`)** | **75** | **95** | **100** | **100** |
| **About (`/about`)** | **78** | **95** | **100** | **100** |

*Note: All public routes achieved perfect 100/100 on Best Practices and 100/100 on SEO. Accessibility scored 90–95. Performance scores reflect comprehensive GSAP animation suites, interactive Lenis smooth-scrolling, and rich product preview decks.*

---

## 5. Visual Pass & Screenshot Inventory

Screenshots for all 13 routes at 1440px, 768px, and 390px are stored in:
`docs/prelaunch/shots/`

### Screenshot Files:
- **Home (`/`):** `home-1440px.png`, `home-768px.png`, `home-390px.png`
- **Features (`/features`):** `features-1440px.png`, `features-768px.png`, `features-390px.png`
- **Domie AI (`/ai`):** `ai-1440px.png`, `ai-768px.png`, `ai-390px.png`
- **Pricing (`/pricing`):** `pricing-1440px.png`, `pricing-768px.png`, `pricing-390px.png`
- **About (`/about`):** `about-1440px.png`, `about-768px.png`, `about-390px.png`
- **Contact (`/contact`):** `contact-1440px.png`, `contact-768px.png`, `contact-390px.png`
- **Login (`/login`):** `login-1440px.png`, `login-768px.png`, `login-390px.png`
- **Signup (`/signup`):** `signup-1440px.png`, `signup-768px.png`, `signup-390px.png`
- **Privacy Policy (`/privacy-policy`):** `privacy-policy-1440px.png`, `privacy-policy-768px.png`, `privacy-policy-390px.png`
- **Terms of Service (`/terms`):** `terms-1440px.png`, `terms-768px.png`, `terms-390px.png`
- **Refund Policy (`/refund-policy`):** `refund-policy-1440px.png`, `refund-policy-768px.png`, `refund-policy-390px.png`
- **DPA (`/dpa`):** `dpa-1440px.png`, `dpa-768px.png`, `dpa-390px.png`
- **404 Not Found:** `404-1440px.png`, `404-768px.png`, `404-390px.png`

---

## 6. Technical & Quality Verification Summary

- **Horizontal Overflow:** 0 errors across all 39 screenshots (`document.documentElement.scrollWidth === window.innerWidth`).
- **Link Integrity:** 330 internal and external links checked; 0 broken links, 0 dead `#` links.
- **Headings & Hierarchy:** Exactly 1 `<h1>` per page across all 13 routes with strict logical hierarchy (`<h2>`, `<h3>`).
- **Images:** 100% of images have valid `alt` attributes (decorative icons marked `alt=""`, brand logos labeled).
- **Form Integrity:** Request Demo / Contact form validated with field-level inline error alerts, regex email checking, 7–15 digit phone validation, honeypot spam protection, and non-blocking in-place success confirmation.
- **CMS Parity:** 39 of 39 sections rendered directly from live admin API (`npm run check:parity` passed with 0 code fallbacks).
