# Motion Audit: LMS Domain Landing Page

**Specification Reference:** `LMS Domain: Motion Reconstruction Specification`  
**Target Branch:** `feature/redesign-v2`  
**Audit Date:** 2026-10-18  
**Audit Purpose:** Comprehensive mapping of every existing homepage animation against specification IDs A01–A24, ownership libraries, targeted DOM elements, and exact discrepancies before beginning code reconstruction.

---

## 1. Animation Inventory & Status Matrix

| ID | Section | Name / Description | Current File : Line | Owner Library | Target Element | Current Status | Spec Discrepancy & Root Cause |
|---|---|---|---|---|---|---|---|
| **A01** | Hero | Keyword pill wipe | `Banner/MainHeading.tsx:16-20, 31-35` | React `setInterval` (2.4s) + CSS classes | `span.rounded-full` inside `h1` | **Inaccurate** | Instant swap every 2.4s without left→right `clip-path` wipe; tinted text on pale pill instead of near-black `#161616` on pastel; 3-segment headline instead of 2-line rhythm. |
| **A02** | Hero | 4 Cards subtle idle float | None (missing) | None | 4 modular hero cards | **Missing** | Cards are static; no ±2–6px drift. |
| **A03** | Nav | Nav A links & logo fade-out | `Header.tsx:18-24, 38-40` | `window.onscroll` + React `useState` | `<header>` element | **Inaccurate** | Uses arbitrary `window.scrollY > 60` toggle instead of CTA top scroll threshold (`top 90px`); links spread to edges instead of centered 2 + logo + 2. |
| **A04** | Nav | Nav B pill morph & assembly | `Header.tsx:18-24, 114-119` | `window.onscroll` + React `useState` | `div.fixed.top-4` glass pill | **Inaccurate** | Pre-assembled pill fades/translates as a whole instead of sequential build (square button grows first, links stagger in, pill fades); wordmark is erroneously present inside pill. |
| **A05** | Hero | Card convergence into device frame | `Banner/LmsProductStage.tsx:12-53` | `window.onscroll` + React `useState` | 4 cards inside `.rounded-[24px]` | **Missing** | Cards are constrained inside inner container with minimal ±32px displacement; reference has oversized cards sitting **outside and over** black frame at progress 0 (x: -140px, y: -170px, scale: 1.18, tilt: 8°); frame does not scale from 0.85x. |
| **A06** | Features | Section entrance & background switch | `FeaturesSection/FeaturesSection.tsx:7` | Static Tailwind CSS | `<section id="features">` | **Working** | Hard edge background switch to `#F8F9FA` is present; minor update to exact token `#F3F4F6`. |
| **A07** | Features | Card 01 text & photo entrance | `FeaturesSection/FeaturesSection.tsx:23-77` | None (static) | Card 01 content | **Missing** | Content appears at static 100% opacity; photo 2 does not scale 0.6→1.0. |
| **A08** | Features | Scrubbed connector line drawing | `FeaturesSection/FeaturesSection.tsx:38-46, 100-112` | None (static 1px `div` borders) | Border divider elements | **Missing** | Static borders instead of SVG `stroke-dashoffset` path draws scrubbed with scroll. |
| **A09** | Features | Feature cards revealed from behind | `FeaturesSection/FeaturesSection.tsx:21, 23, 85, 161` | CSS `sticky top-24 sm:top-28` | Cards 01, 02, 03 | **Missing** | Cards use standard CSS sticky where Card 02 slides *over* Card 01; reference does the **exact opposite** (Card 01 is top z-index and leaves upward, revealing Card 02 sitting behind and below at offset +150px, opacity 0.2, blur 4px); cards are half the reference height. |
| **A10** | Features | Card 02 orbit tiles & photo cluster | `FeaturesSection/FeaturesSection.tsx:114-156` | None (static) | Radar rings & tiles | **Missing** | Single right photo does not fan out into 3 overlapping photos on card activation. |
| **A11** | Features | Card 03 name chips & line draws | `FeaturesSection/FeaturesSection.tsx:174-219` | None (static) | Conference tiles & chips | **Missing** | Chips do not transition from 0.3→1.0 opacity on activation. |
| **A12** | Text reveal | Editorial manifesto scroll illumination | `ManifestSection.tsx:16-33, 46-60` | `window.onscroll` + React `useState` | Paragraph word `<span>`s | **Broken** | Progress formula `(start - rect.top)/(start - end)` over 0.45vh completes before section enters viewport center; text appears 100% dark the entire time; 30 re-renders/sec on scroll. |
| **A13** | Showcase | Left column single-step slide & fade | `AiSection/AiSection.tsx:32-138` | None (static column) | Step 1, 2, 3 text containers | **Missing** | Shows all three steps stacked simultaneously; reference shows **only one step at a time** inside overflow-hidden viewport, sliding vertically on tab click. |
| **A14** | Showcase | Folder fly-in & lavender drag-over | None (missing) | None | Tab 1 upload dropzone | **Missing** | Jumps directly to progress ring; missing video file tile entering from right edge (x: +200→0, rotate: 6°→0°) and dropzone turning lavender `#EEE9FF`. |
| **A15** | Showcase | SVG ring progress count 0→100% | `AiSection/AiSection.tsx:11-25, 222-261` | React `useEffect` + `setInterval` | SVG circle & text counter | **Partially accurate** | Ring counts ~2s, but sits on beige card rather than pure white canvas; timing is interval-based rather than timeline. |
| **A16** | Showcase | Transcoding complete state | `AiSection/AiSection.tsx:263-294` | React `useState` conditional render | Complete status card | **Working** | Renders complete state; requires minor asset/layout refinement. |
| **A17** | Showcase | Live tab 3D illustration scale-up | `AiSection/AiSection.tsx:298-356` | None (static dark panel) | Tab 2 classroom card | **Missing** | Shows dark classroom panel instead of light panel with 3D illustration scaling 0.4→1.0 and CTA row. |
| **A18** | Benefits | Benefits cards entrance | `AdvantageSection/AdvantageScrollMain.tsx` | None | 3 benefits cards | **Missing** | H2 does not darken `#BDBDBD`→`#161616`; cards do not rise with 80ms stagger. |
| **A19** | Benefits | Group rotation, stack collapse & shrink | `AdvantageSection/AdvantageScrollMain.tsx:101-140` | React `useState` + `onClick` button | 4-card angled deck | **Different behavior** | Click-to-cycle button deck (4 cards); reference is a **scroll-pinned motion sequence** where 3 cards in a row enlarge (1.3x), group rotates 0°→10°→45°→70°, cards collapse into a diagonal stack, shrink to 0.1x, and fade out. No click interaction. |
| **A20** | Wall of love | Solid giant text scale-in | `CustomerSection/CustomerSection.tsx:9-13` | Static Tailwind CSS | Watermark `<span>` | **Different behavior** | Currently a 4% opacity faint background watermark; reference is **solid near-black `#161616`** scaling 0.2→1.0 on scroll. |
| **A21** | Wall of love | Scroll-pinned deck upward flight | `CustomerSection/StackedAcademyDeck.tsx:44-84` | React `useState` + `onClick` | Testimonial card stack | **Different behavior** | Currently a click-to-peel deck with "Click card to peel away" caption; reference is **scroll-pinned** where each top card translates upward (y: 0→-110vh) out of the viewport on scroll, revealing the card behind; last card ends at 0°. |
| **A22** | FAQ | Card entrance & row stagger | `FaqSection.tsx:48-60` | None (static) | FAQ enclosure card & rows | **Inaccurate** | Card does not rise 60px; rows do not stagger in on enter. |
| **A23** | FAQ | Accordion height expansion | `FaqSection.tsx:39-43, 68-98` | React `useState` | FAQ answer `div` | **Working** | Accordion expands; needs Motion `height: auto` transition and debounced `ScrollTrigger.refresh()`. |
| **A24** | Page load | Hero content fade-in | None (missing) | None | Hero H1, subtitle, CTA, Nav A | **Missing** | No initial page load stagger fade-in. |

---

## 2. Library Ownership & Multi-Library Conflict Audit

### 2.1 Current Library Usage
- **GSAP / ScrollTrigger (`gsap` 3.13.0):** Currently present in `package.json` but **completely inactive** in homepage components. No `ScrollTrigger` instances are currently created.
- **Lenis (`lenis` 1.3.8):** Implemented in `components/SmoothScroll.jsx` via `<ReactLenis root>`. However, it lacks the required single-ticker integration with GSAP:
  ```js
  // MISSING:
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- **Motion (`motion` 12.23.24):** Installed but currently underutilized on the homepage; scroll animations were mistakenly attempted via manual `window.addEventListener('scroll')` in React components (`Header.tsx`, `LmsProductStage.tsx`, `ManifestSection.tsx`).
- **Tailwind CSS (`tailwindcss` 4):** Provides utility classes and static layout.

### 2.2 Conflict Rule Enforcement (Phase 1+ Architecture)
1. **Single Property Owner Rule:**
   - **GSAP + ScrollTrigger** exclusively owns all scroll-linked, scrubbed, and pinned motion:
     - `A03`, `A04` (Nav scroll threshold triggers)
     - `A05` (Hero card convergence & frame scaling)
     - `A08`, `A09` (Feature cards rear-reveal stack & SVG path draws)
     - `A12` (Manifesto word-by-word illumination)
     - `A18`, `A19` (Benefits 3-card group rotation & stack collapse)
     - `A20`, `A21` (Wall of love solid text scaling & upward card flight)
     - `A22` (FAQ card entrance)
   - **Motion** exclusively owns discrete UI state transitions:
     - `A01` (Keyword wipe loop)
     - `A13` (Showcase left column slide)
     - `A14`–`A17` (Showcase window sequence: folder fly-in, ring count, complete state, 3D scale)
     - `A23` (FAQ accordion height expansion)
     - `A24` (Page load entrance)
2. **No Double-Driven Elements:**
   - If an element inside a GSAP-pinned/scrubbed container requires discrete UI animation (e.g. idle float A02 inside A05), GSAP animates the outer container and Motion animates an inner child node. No DOM element will receive `transform` or `opacity` from both libraries.
3. **Lenis / ScrollTrigger Single Ticker:**
   - Eliminate separate `requestAnimationFrame` loops. GSAP ticker drives Lenis RAF.
4. **React 19 Cleanups:**
   - Wrap GSAP contexts in `gsap.context()` inside `useLayoutEffect` (or `useEffect`) with `ctx.revert()` cleanup to prevent React StrictMode duplicate ScrollTriggers.

---

## 3. Implementation Roadmap

- **Phase 1 Foundations:** Single Lenis↔ScrollTrigger wiring in `SmoothScroll`, Urbanist font integration, color/radius tokens, `gsap.matchMedia` scaffolding, card size geometry (features ≈89vw × ≈68vh, benefits ≈300px).
- **Phase 2 Hero:** Implement A05 (convergence), A03/A04 (nav transformation), A01 (keyword wipe), A24 (load).
- **Phase 3 Features:** Implement A09 (rear-reveal stack) with A07, A08, A10, A11.
- **Phase 4 Text Reveal:** Implement A12 (word-by-word scrubbed illumination).
- **Phase 5 Benefits:** Implement A18, A19 (3-card row to rotating diagonal collapse; remove click-to-cycle deck).
- **Phase 6 Wall of Love:** Implement A20, A21 (solid text scaling + upward card flight; remove click-peel; placeholder testimonials).
- **Phase 7 Showcase:** Implement A13–A17 (single visible step slide, folder fly-in, ring, complete, 3D illustration).
- **Phase 8 FAQ & Polish:** Implement A22, A23 (`ScrollTrigger.refresh()` on accordion toggle), mobile/reduced-motion passes.

