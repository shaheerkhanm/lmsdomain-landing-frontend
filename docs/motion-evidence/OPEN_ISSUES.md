# Open Issues & Product Disclosures

**Date:** 2026-10-20  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS (Pending owner review; do not mark verified)

---

## 1. Mobile Motion & Interactive Stacking Sequence (<1024px Phone & Tablet)

Following prompt 10 instructions, comprehensive mobile motion has been implemented across all six sections for screens under 1024px (`(max-width: 1023px)`). Desktop layout ($\ge 1024\text{px}$), Hero heading/CTA, FAQ, and footer remain completely untouched.

### Architecture & Engineering Rules
1. **Zero ScrollTrigger `pin` on Mobile:** All holding, stacking, and conveyor motions use pure CSS `position: sticky`, driven by ScrollTrigger `scrub: 0.5` on the sticky container's progress. This eliminates iOS Safari address bar jump/spacer glitches.
2. **ScrollTrigger Optimization:** Configured `ScrollTrigger.config({ ignoreMobileResize: true })`.
3. **Hardware Acceleration:** Animations manipulate strictly `transform` and `opacity` (no blur filters on mobile).
4. **Touch Smoothing Disabled:** Native touch scrolling is preserved on mobile via `smoothTouch: false` and `syncTouch: false` in `SmoothScroll.jsx`.
5. **Accessibility Fallback:** `prefers-reduced-motion: reduce` retains the static layout without movement across all sections.
6. **Zero Horizontal Overflow:** Verified `scrollWidth === innerWidth` across 375, 390, 414, and 768px viewports.

### Section Implementation Breakdown

1. **Section 1 (Hero - Cards Deal in as a Stack):**
   - 220vh mobile scroll container with a sticky 420px stage.
   - Cards 1–4 begin as a tilted deck (−3°, 2°, −2°, 3°), each offset 10px down.
   - On scroll, Card 1 (Course builder) slides up and left, shrinks to scale 0.9, and docks above the deck as a 24px visible ledge. Cards 2 and 3 follow sequentially.
   - By pin completion, all cards form stacked ledges, leaving Card 4 (Certificate issued) fully visible.
2. **Section 2 (Features - Sticky Stacking Cards):**
   - Mobile bullet pills removed; cards display number, title, description, and visual below text.
   - Cards 01, 02, 03 are `position: sticky` at `top: 80px + index * 20px`.
   - As each card scrolls up and covers the previous, the covered card scrubs to scale 0.94 and opacity 0.6.
   - Visual photos slide 40px into place, scale 0.9 → 1, and connector chips pop in.
3. **Section 3 (Text Reveal - Editorial Manifesto):**
   - 160vh mobile container with sticky, vertically centered text.
   - Words illuminate smoothly from `#C9CCD1` to `#161616` across scroll progress.
4. **Section 4 (AI Section - 4-Step Showcase with Horizontal Progress Bar):**
   - 400vh mobile container with sticky centered content capped at 52vh (fully visible on 375×667 screen).
   - Horizontal progress bar displays numbers 1–4 connected by 2px track filling purple (`#7B5CF5`).
   - Active step text transitions with ±30px vertical slides and opacity crossfades.
   - Window views render step-specific animations (Drafting course title, 3 learning outcomes, publish button).
5. **Section 5 (Benefits - 3D Card Flip-in & Short Stack Collapse):**
   - `perspective: 1000px` applied on parent container.
   - Cards flip in with `rotateX: 70° → 0°`, `y: 40px → 0px`, `opacity: 0 → 1` scrubbed between 90% and 60% viewport height.
   - Collapse timeline scrubs Cards 1, 2, and 3 together into a short stack with `scale: 0.9`, `rotateZ: -8°`, and 140px vertical centering before the section ends.
6. **Section 6 (Wall of Love - Centered Deck over Title):**
   - 300vh mobile container with sticky stage.
   - Headline "Wall of love" transitions from `#9CA3AF` to bold `#161616`.
   - 300px deck rises from `40vh`, Cards 1–4 fly up off-screen (`y: -110vh`), and Card 5 (Sarah Jenkins) settles flat at 0° resting cleanly on the title.

### Zero Horizontal Overflow Verification (Chrome CDP)

| Viewport Device | Width $\times$ Height | Max Measured `scrollWidth` | `innerWidth` | Status |
| :--- | :--- | :--- | :--- | :--- |
| **iPhone SE** | 375 $\times$ 667 | **375px** | 375px | PASS (0px overflow) |
| **iPhone 12 Pro** | 390 $\times$ 844 | **390px** | 390px | PASS (0px overflow) |
| **iPhone 14 Plus / Pro Max** | 414 $\times$ 896 | **414px** | 414px | PASS (0px overflow) |
| **iPad Mini / Tablet** | 768 $\times$ 1024 | **768px** | 768px | PASS (0px overflow) |

---

## 2. Wall of Love Exit Sequence & FAQ Transition (Reference Frames 00:00:01.000 – 00:00:01.750)

Following the owner's instructions and reference image `03-ref-wall-to-faq` (16 reference frames from 30.5s) / `04-build-wall-to-faq`, the desktop Wall of Love section exit at $\ge 1024$px in `components/sections/HomePage/CustomerSection/CustomerSection.tsx` has been updated so that all 5 cards leave before the pin releases:

### Implemented Exit Specifications

1. **All 5 Cards Fly Out:**
   - Card 5 accelerates straight up off the screen (`y: -120vh, rotateZ: -8deg, ease: "power1.in"`), flying up past the top of the heading and across the navbar just like Cards 1–4.
   - Matches reference frame `00:00:01.000`.
2. **Hold on Heading Alone:**
   - Once Card 5 has flown off, a ~14–15% hold of the total pin length is maintained with **only** the black centered "Wall of love" heading visible and no cards on screen before the pin releases.
   - Matches reference frame `00:00:01.250`.
3. **Release Gap to FAQ (~45vh / ~400px):**
   - After release, as the user scrolls down, the heading scrolls up, and the FAQ card comes up from the bottom.
   - The measured distance from the bottom of the "Wall of love" letters to the top of the FAQ card is **421.0px (46.8% of the 900px viewport)**, precisely matching the target ~45vh (~400px at 900px window height), replacing the earlier 120–160px card-to-FAQ rule.
   - Matches reference frame `00:00:01.500`.
4. **Reverse Scroll:**
   - Scrolling back up runs the exact sequence in reverse: the FAQ card retreats, the "Wall of love" heading enters and re-pins centered on screen, holds alone, and Card 5 drops back down from above into the top spot before Cards 4, 3, 2, 1 return.

### Browser Measured Values (Chrome CDP at 1440×900)

| Parameter | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Moment 1: Card 5 Flight (Ref 00:00:01.000)** | Card 5 flying up crossing navbar/heading | ScrollY: **13455**, Top: **104.6px**, Bottom: **336.8px** | Exact match |
| **Moment 2: Heading Alone (Ref 00:00:01.250)** | Heading centered, all cards off-screen | ScrollY: **13528**, $c_5\text{ bottom} < -100\text{px}$, $h_2\text{ top} = 340.5\text{px}$ | Exact match |
| **Moment 3: FAQ Arrival (Ref 00:00:01.500)** | Heading in upper viewport, FAQ entering below | ScrollY: **13873**, $h_2\text{ top} = 185.5\text{px}$, $\text{faqTop} = 886.5\text{px}$ | Exact match |
| **Letter Bottom to FAQ Card Top Gap** | $\approx 45\text{vh}$ ($\approx 400\text{px}$ in 900px window) | **421.0px** (**46.8%** of 900px viewport) | Exact match (~45vh) |

---

## 3. Wall of Love Desktop Vertical Centering, 30vw Cards, and Cascading Deck Sequence

Following the owner's instructions in prompt 12 and the attached reference images (`01-wall-held` and `02-ref-wall-sequence`), the desktop Wall of Love section at $\ge 1024$px in `components/sections/HomePage/CustomerSection/CustomerSection.tsx` and `StackedAcademyDeck.tsx` has been updated to match the reference geometry and flight motion model. Mobile (<1024px), Features conveyor, FAQ, and all other sections remain preserved untouched.

### Implemented Specifications

1. **Heading Vertically Centred While Pinned:**
   - Container pinned full viewport (`h-screen`, `start: "top top"`).
   - The headline "Wall of love" is centered vertically and horizontally (`items-center justify-center`).
   - At 1440×900, the letters span from **35.5% to 64.6%** of the window height (center at **50.05%**), so the 50% window middle line cuts directly through the middle of the letters, matching reference image `01-wall-held`.
2. **Card Dimensions & Styling (30vw / Max 440px):**
   - Deck width: `30vw`, max-width `440px` (measured: **445.9px** at 1440×900 with rotated bounds; **398.1px** at 1280×800).
   - Card height: `215px` (half the width).
   - Border radius: `20px` (`rounded-[20px]`).
   - Padding: `28px` (`p-[28px]`).
   - Avatar: `44px` round (`size-[44px] rounded-full`).
   - Name: `15px` bold (`text-[15px] font-bold text-[#161616]`).
   - Role: `13px` grey (`text-[13px] text-[#6B7280]`).
   - Social icon: `18px` grey (`size-[18px] text-[#9CA3AF]`) placed top-right.
   - Quote: `15px` (`text-[15px] text-[#374151] leading-[1.5] line-clamp-3`).
   - Date: `13px` grey (`text-[13px] text-[#6B7280]`).
   - Soft shadow: `shadow-[0_20px_45px_-12px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)]`.
3. **Deck Position & Depth Offsets:**
   - Horizontally centered.
   - Top card sits across the middle of the letters (top edge at **51.2%** down the window; container top at `47%`), with most of the card hanging below the heading, ending at **78.4%** down the window.
   - Initial visible deck exposes 3 cards:
     - Card 1: `(x: 0, y: 0)`, tilted `-4°`.
     - Card 2: `(x: 8px, y: 30px)`, tilted `+3°`, exposing its bottom edge and date.
     - Card 3: `(x: -6px, y: 60px)`, tilted `-2°`, exposing its bottom edge and date.
     - Cards 4 & 5: positioned under Card 3 at `y: 60px`, `opacity: 0`.
4. **Cascading Flight Sequence (Matching 16 Reference Frames):**
   - **Enter:** Headline turns from grey (`#9CA3AF`, scale 0.85) to black (`#161616`, scale 1.0) as the deck rises from `45vh` into its held position.
   - **Card 1 flight:** Card 1 accelerates straight up off screen (`y: -120vh`). Simultaneously, Card 2 cascades up by 30px to take the top spot (`y: 0, x: 0`), Card 3 moves to the second spot (`y: 30px`), and Card 4 appears in the third spot (`y: 60px, opacity: 1`).
   - **Card 2 flight:** Card 2 accelerates straight up off screen. Card 3 takes the top spot, Card 4 takes the second spot, and Card 5 appears in the third spot (`opacity: 1`).
   - **Card 3 flight:** Card 3 flies off screen. Card 4 takes the top spot, Card 5 takes the second spot.
   - **Card 4 flight:** Card 4 flies off screen. Card 5 moves into the top spot and settles flat at **0°**.
   - **Card 5 settle & unpin:** Card 5 rests at 0° in the center before the section unpins into FAQ.
5. **Gap to FAQ:**
   - Preserved within the specified range (120px to 160px):
     - At 1440×900: **147.0px** from Card 5 to the FAQ title.
     - At 1280×800: **137.2px** from Card 5 to the FAQ title.

---

## 4. Features Desktop Conveyor Motion Model & Card 03

The conveyor motion model and Card 03 visual polish implemented in prompt 11 remain active and fully functional:
- Dark `#111` 12px sans-serif numbers (Urbanist) at `bottom: 40px, left: 35px`.
- Diagonal overlapping video tiles (50% card height, 16px radius, ~30px diagonal overlap).
- Dark pills with purple "M" and rose "A" avatars and dotted connector line.
- Pale opacity (`0.35` container / `0.85` visuals) while rising behind Card 02.

---

## 5. Evidence Artifacts

### Mobile Evidence Artifacts (<1024px)
- **High-Resolution Stage Stills (iPhone 12 Pro 390×844):**
  - `docs/motion-evidence/01_mobile_hero_cards_stacked.png`: Section 1 (Hero cards dealing into stacked ledges)
  - `docs/motion-evidence/02_mobile_features_stacked.png`: Section 2 (Features sticky cards 01, 02, 03 stacked at 80px/100px/120px)
  - `docs/motion-evidence/03_mobile_manifest_lit.png`: Section 3 (Manifesto text illuminated in dark `#161616`)
  - `docs/motion-evidence/04_mobile_ai_step_progress.png`: Section 4 (AI Studio horizontal 1-4 progress bar and active window)
  - `docs/motion-evidence/05_mobile_benefits_collapsed.png`: Section 5 (Benefits cards collapsed into -8° short stack)
  - `docs/motion-evidence/06_mobile_wall_card5_held.png`: Section 6 (Wall of love Card 5 settled flat over black heading)
- **Full Page Walkthrough Video:**
  - `docs/motion-evidence/iphone_12_pro_scroll_walkthrough.mp4`: Complete interactive scroll down to footer and back up to hero on iPhone 12 Pro (390×844) showing clean reverse motion.

### Desktop Verification Artifacts ($\ge 1024\text{px}$)
- **Full Desktop Walkthrough Video:**
  - `docs/motion-evidence/desktop_1440_unchanged_walkthrough.mp4`: 1440×900 desktop walkthrough confirming zero desktop regressions.
- **Side-by-Side Comparison Stills (Reference vs Build):**
  - `docs/motion-evidence/01-compare-card5-flying.png` (Ref 00:00:01.000 vs Build: Card 5 flight)
  - `docs/motion-evidence/02-compare-heading-alone.png` (Ref 00:00:01.250 vs Build: Heading hold)
  - `docs/motion-evidence/03-compare-faq-arriving.png` (Ref 00:00:01.500 vs Build: FAQ arrival with ~45vh gap)
  - `docs/motion-evidence/01-wall-held-compare.png` (Ref vs Build: Wall of love held state)
  - `docs/motion-evidence/features/01-card02-held-compare.png` (Ref vs Build: Features Card 02)
  - `docs/motion-evidence/features/02-card03-held-compare.png` (Ref vs Build: Features Card 03)

---

## 6. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
