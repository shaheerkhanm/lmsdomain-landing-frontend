# Features Page (v3) Redesign: Section Inventory & Transformation Plan

**Date:** 2026-11-04  
**Target:** `/features` redesign (`lmsdomain-landing-frontend`, branch `feature/multipage`)  
**Design Reference:** Premium SaaS scrollytelling (Linear, Stripe, Vercel, Apple, Framer) adhering to LMS Domain brand guidelines (§5.0 motion ownership, Urbanist font, white / `#F3F4F6` / `#161616`, accent `#7B5CF5`, pill pastels).

---

## 1. Current Page Inventory (Top to Bottom)

| # | Section ID | Current Component | Current Content & Function | Data Sources | Disposition in v3 |
|---|---|---|---|---|---|
| 1 | `features-hero` | `components/marketing/FeaturesHero.tsx` | Eyebrow, H1, subtitle, CTA buttons ("Book a Demo", "See pricing"), static stat pills and mock UI cards. | CMS slug `features-hero` (`hero.eyebrow`, `hero.title`, `hero.subtitle`, `hero.ctaText`, `hero.secondaryCtaText`), fallback in `content/features/catalog.ts`. | **REPLACE** with **Section A (Hero Assemble)**: masked word-by-word H1 entrance (LCP-safe), dynamic computed metric line ("38 features · 9 categories · Domie AI built in"), and 6 product UI fragments scattering and assembling into an "academy.yourdomain.com" browser window (pinned scrub on desktop ≥1024px, instant play on mobile). |
| — | *New Section* | *(None)* | *(New Marquee)* | `content/features/catalog.ts` (38 features, category tags, premium flags). | **NEW** as **Section B (Feature Marquee)**: Two continuous, slow-scrolling chip rows moving in opposite directions with gradient edge masks, pause-on-hover, accessible hidden list, and `data-marquee` attribute to avoid counting conflicts in content audits. |
| 2 | `features-overview` | `components/marketing/CategoryOverviewNav.tsx` | Plain 3×3 category grid, quick stats, desktop sticky category pill bar, and basic inline feature search. | CMS slug `features-overview`, `content/features/catalog.ts`. | **REPLACE & SPLIT**: Category grid replaced with **Section C (Bento Overview)** featuring 9 interactive tiles with live CSS/SVG looping product moments and pointer-following spotlight glow. The search is extracted and upgraded to **Section I (⌘K Command Palette)**. |
| 3 | `features-audiences` | `components/marketing/AudienceSwitcher.tsx` | Tabbed audience switcher (Professional Academies, Independent Educators, Enterprise, etc.) with tab-swapping photo and chip list. | CMS slug `features-audiences`, `content/features/audiences.ts`, `content/features/media.ts` (or CMS `features-media`). | **RESTYLE** as **Section D (Built for How You Teach)**: Retain all data and accessibility; modernize tab transitions using Motion `layoutId` pill slide, soft clip-path photo reveal, and staggered feature chip entrances. |
| 4 | `features-ai-spotlight` | `components/marketing/AiSpotlightSection.tsx` | Static light-themed 4-card AI feature presentation with screenshots. | CMS slug `features-ai-spotlight`, `ai-powered-tools` in `catalog.ts`, `media.ts`. | **REPLACE** with **Section E (AI Chapter: Meet Domie)**: Full-bleed dark (`#161616`) scrollytelling chapter with smooth clip-path expand/shrink transitions, transparent animated Domie bot WebP (`domie-bot.webp`), and a pinned 4-stage morphing interactive window on desktop (stacked cards on mobile). |
| 5 | `features-mid-cta` | `components/marketing/AiMidPageCta.tsx` | Mid-page banner prompting visitors to explore AI. | CMS slug `features-mid-cta`. | **MERGE** into the footer of **Section E (AI Chapter)** with a prominent "Explore Domie AI → /ai" action link. |
| 6 | `features-journey` | `components/marketing/JourneyStrip.tsx` | 6-step static horizontal ribbon (Create, Teach, Assess, Engage, Sell, Grow) with feature links. | CMS slug `features-journey`, `content/features/catalog.ts`. | **REPLACE** with **Section F (Horizontal Journey)**: Pinned horizontal scroll track on desktop (translates `-(trackWidth - viewport)` with active step indicators and containerAnimation), and a vertical connected timeline with animated draw-line on mobile. |
| 7 | `features-categories` | `components/marketing/CategorySections.tsx` | Repetitive vertical sections for each category with card grids, photos/videos, and interactive simulations. | `content/features/catalog.ts` (all categories), `content/features/media.ts` (photo/video slots), `InteractiveIllustrations.tsx`. | **REPLACE** with **Section G (Sticky Category Chapters)**: 40/60 sticky split layout on desktop (left sticky column with dynamic category scene reflecting active feature + progress counter; right scrolling column with stroke-drawing icon cards). Retains all media slots, simulations (quiz & watch slider), and gateway chips. Stacked on mobile. |
| — | *New Section* | *(None)* | *(New Interactive Playground)* | Interactive state (custom palette & branding controls). | **NEW** as **Section H (Branding Playground: Make It Yours)**: Live interactive academy customizer with 5 color swatches, editable name input, light/dark toggle, and immediate browser preview recoloring. |
| — | `feature-finder` (extracted) | (Formerly part of `CategoryOverviewNav.tsx`) | Basic input filter filtering feature cards. | `content/features/catalog.ts`. | **UPGRADE** to **Section I (Command Palette / ⌘K)**: Quick-search filter bar plus global `⌘K` modal dialog with grouped keyboard navigation (up/down/enter), smooth scroll jump, and pulse border highlight on the target card. |
| 8 | `features-integrations` | `components/marketing/IntegrationsHub.tsx` | Interactive animated canvas of 3rd-party integrations (Zoom, Stripe, PayPal, Razorpay, etc.). | CMS slug `features-integrations`, `content/features/integrations.ts`. | **KEEP & POLISH** as **Section J (Integrations Hub)**: Preserve existing rich SVG node animation; align margins, padding, and background transitions to fit the new page rhythm. |
| 9 | `features-cta` | `components/sections/HomePage/CtaSection/CtaSection.tsx` | Default global closing CTA band. | CMS slug `features-cta`. | **RESTYLE** as **Section K (Final CTA on Dark Card)**: Dark `#161616` rounded container (radius 40px) with animated SVG accent light beam, CMS content fallbacks, Request Demo modal trigger, and magnetic hover primary button. |

---

## 2. Integrity & Preservation Guarantees

1. **Content & Copy Fidelity:**
   - All **38 feature titles**, descriptions, tags, and category taxonomies defined in `content/features/catalog.ts` are preserved exactly.
   - All CMS fields retrieved via `lib/api/content.ts` (`features-hero`, `features-overview`, `features-audiences`, `features-ai-spotlight`, `features-mid-cta`, `features-journey`, `features-integrations`, `features-cta`) remain the live sources with zero hardcoding.
2. **Media Preservation:**
   - Every photo and video slot mapped in `content/features/media.ts` (prompts 01c and 11) is retained inside the category chapters and journey panels.
   - Both interactive simulations ([`CheckpointQuizSimulation`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/InteractiveIllustrations.tsx) and [`WatchPercentageSlider`](file:///Users/shaheerkhan/Documents/Docker/lms-frontend/lmsdomain-landing-frontend/components/marketing/InteractiveIllustrations.tsx)) remain active in their respective categories (`assessment-and-evaluation` and `course-learning`).
3. **Motion Architecture (§5.0 Ownership):**
   - **GSAP + ScrollTrigger:** Controls scroll-pinned assemblies (Hero Assembly, AI Section Scrollytelling, Horizontal Journey, Sticky Chapter Left Column, Dark Section Inset Expand/Shrink).
   - **Motion (framer-motion):** Controls discrete UI state changes (tab indicators, ⌘K dialog transitions, bento hover springs, playground recoloring, layout swaps).
   - Strict DOM separation ensures GSAP and Motion never animate the same DOM properties on the same node.
4. **Accessibility & Reduced Motion:**
   - Full keyboard navigation (`⌘K` dialog with trap focus, radio groups for colors, tab keys).
   - `prefers-reduced-motion: reduce`: Eliminates pinned scrubbing, parallax, marquee loops, and animated beams, rendering stable, accessible final visual states.
