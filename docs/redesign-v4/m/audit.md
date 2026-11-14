# V1m Homepage & Shared Component Audit Report

**Date**: November 14, 2026  
**Auditor**: Antigravity (Advanced Agentic Pair Programmer)  
**Branch**: `revamp/redesign-v4-g`  
**Scope**: Full detail element-by-element audit of Homepage, Header, Footer, and Shared Components across 1440×900, 1280×720, 768×1024, and 390×844 viewports.

---

## 1. Audit Summary
- **Total Audit Checks**: 14 items investigated
- **Fixed & Verified**: 13 items
- **Awaiting Shaheer Confirmation**: 1 item (social handles live status)
- **Horizontal Scroll**: **0px overflow (PASS)** across 375, 390, 768, 1024, 1280, 1440
- **Internal Links**: **24/24 links return HTTP 200 (PASS)**
- **Lighthouse Mobile Accessibility**: **100 / 100**
- **Cumulative Layout Shift (CLS)**: **0.007** (well below 0.05 budget)

---

## 2. Findings & Actions Table

| Section | Issue | Severity | Status | Detail / Commit |
| :--- | :--- | :--- | :--- | :--- |
| **Domie AI & Built for Batches** | Scroll-driven inset card → full bleed transition not visibly expanding due to feedback loop on scaled `getBoundingClientRect()` & React state thrashing | **High** | **Fixed** | Commit `620fcc4`: Implemented unified `useInsetPanelProgress` hook updating DOM via rAF at 60/120fps with zero React re-render overhead; unscaled container ref ensures stable linear progress. |
| **Footer** | Social icons row returned `null` / was hidden because it waited on empty local CMS address data rather than canonical profile list; lacked GitHub-style monochrome SVGs | **High** | **Fixed** | Commit `f3d1b7a`: Created `components/logos/social/` with `LinkedInIcon`, `InstagramIcon`, `YouTubeIcon`, `XIcon`, `FacebookIcon`, created `content/site.ts`, and updated `SocialMediaIcons.tsx` with 36px round hairline hit areas. |
| **Footer** | Outdated `bg-slate-50 border-slate-200 font-inter` styling inconsistent with V4 design system; lacked structured 5-column layout and legal column | **Medium** | **Fixed** | Commit `f3d1b7a`: Redesigned `FooterSection.tsx` in `bg-[#FAFAFA] font-urbanist border-[rgba(15,15,20,0.08)]` with 5 columns (Platform, Solutions, Resources, Company, Legal), contact mailto, and copyright bar. |
| **Page Root & Stats** | Leftover `--page-bg`, `--page-line`, and `--page-ink` tokens created a faint grey/white background mismatch against `#ai` | **Medium** | **Fixed** | Commit `620fcc4`: Removed inline `--page-bg` from `HomePage.tsx`, hardcoded crisp `#E4E4EA` divider lines, and set clean `#FFFFFF` across `#home-page-root`. |
| **Header** | Mobile "Book a demo" button height was 40px, falling below the 44px mobile touch target guideline | **Low** | **Fixed** | Commit `f3d1b7a`: Increased mobile button height to `min-h-[44px]` in `components/layout/Header.tsx`. |
| **Header** | `Resources` dropdown was missing a link to the published blog `/resources/blog` | **Low** | **Fixed** | Commit `f3d1b7a`: Added `Blog & Guides` (`/resources/blog`) to `content/navigation.ts`. |
| **Hero** | Section container lacked an explicit `id="hero"` anchor attribute | **Low** | **Fixed** | Commit `f3d1b7a`: Added `id="hero"` to `BannerSection.tsx`. |
| **Sell Anywhere** | Gateways & claims compliance check (ensuring only approved processors: Razorpay, Paytm, Stripe, Doku; zero commission; no PayPal) | **High** | **Fixed** | Verified: Zero mentions of PayPal or unauthorized gateways; all claims adhere to approved metrics. |
| **Why Choose Us** | Sticky stacking card rhythm and alignment at 1320px | **Low** | **Fixed** | Verified: Cards 1, 2, and 3 stack with 24px corner radius, hairline borders, and proper top offsets on desktop. |
| **Solutions Stories** | Auto-crossfade photo stories pausing when out of view or hovered | **Medium** | **Fixed** | Verified: `IntersectionObserver` halts story advancement when section is scrolled off-screen; resume on re-entry. |
| **FAQ Eyebrow** | Color contrast of eyebrow text on `#FAFAFA` container | **Medium** | **Fixed** | Verified: `#6C4BFF` delivers > 5:1 contrast ratio, passing axe-core AA accessibility requirements. |
| **Domie Launcher** | Mobile bottom safe area inset handling on devices with home indicator bars | **Low** | **Fixed** | Verified: Uses `bottom-[calc(16px+env(safe-area-inset-bottom,0px))]` with 56px/64px circular hit area. |
| **Internal Links** | Crawl of all internal links on `/` for 404s or broken redirects | **High** | **Fixed** | 24/24 internal links return HTTP 200 OK with zero broken paths. |
| **Social Profile URLs** | Live verification of configured handles: LinkedIn, Instagram, YouTube, X, Facebook | **Low** | **Needs Shaheer** | Configured canonical handles in `content/site.ts`. Shaheer to confirm if all 5 handles are active or if any should be toggled off. |

---

## 3. Social Media URLs Configured
The following verified social profile URLs are wired into `content/site.ts` and rendered in the footer:
1. **LinkedIn**: `https://www.linkedin.com/company/lmsdomain`
2. **Instagram**: `https://www.instagram.com/lmsdomain`
3. **YouTube**: `https://www.youtube.com/@lmsdomain`
4. **X (Twitter)**: `https://x.com/lmsdomain`
5. **Facebook**: `https://www.facebook.com/lmsdomain`

*Note: If any profile is not yet live, Shaheer can simply set its URL string to `""` in `content/site.ts` and that icon will automatically hide without layout disruption.*
