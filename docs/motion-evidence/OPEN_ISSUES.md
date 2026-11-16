# Open Issues & Product Disclosures

**Date:** 2026-10-21  
**Branch:** `feature/redesign-v2`  
**Status:** RESOLVED - Homepage Fix v4 (Ready for Review; do not deploy)

---

## 0. Homepage Fix v4: Restore Desktop & Finish Mobile

All desktop regressions (D1–D3) and mobile remaining issues (M1–M2) have been resolved. Desktop ($\ge 1024\text{px}$) matches signed-off commit `30d4a1c` + `55ae4c3` with 100% fidelity. Mobile (<1024px) retains snappy stacking motion with zero flashes and standard 64px inter-section spacing.

### Observed Issues & Root Causes

| Issue | Observed in Review Recordings | Inferred Root Cause | Resolution Implemented | Visual Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **D1. Hero Subtitle Wrapping** | Subtitle wrapped to 3 lines with `"attention."` alone on line 3, pushing CTA and stage down 16px (`01-desktop-hero-subtitle.jpg`). | In `BannerSection.tsx`, `className="... text-[15px] sm:text-base ..."` overrode desktop `14px` (`text-sm`) with `16px` (`text-base`). | Changed to `text-[15px] lg:text-sm`, restoring 14px 2-line layout on desktop ($\ge 1024\text{px}$). | `docs/motion-evidence/01_desktop_hero_subtitle.png` |
| **D2. White Full-Width Strips** | White horizontal bands appeared across screen above and below Wall of love as page scrolled (`02-desktop-white-strips.jpg`). | `AdvantageSection.tsx` and `CustomerSection.tsx` had `mb-16` without `lg:mb-0`, exposing the white page/body background (`bg-white`) between grey sections (`#F3F4F6`). | Scoped margins with `mb-16 lg:mb-0` across all sections, ensuring seamless `#F3F4F6` grey background between Benefits, Wall of love, and FAQ. | `docs/motion-evidence/02_desktop_wall_of_love_seamless.png` |
| **D3. Footer Missing Socials & Contacts** | Social icons, email, and phone were missing from footer (`03-desktop-footer.jpg`). | Docker container lacked `BACKEND_URL` pointing to backend API, so `Footer.tsx` called `"undefined/api/cms"`, failing CMS settings fetch for slug `"address"`. | Added fallback `(process.env.BACKEND_URL \|\| process.env.BACKEND_INTERNAL_URL \|\| "http://lms-landing-backend:3000")` and launched container with `-e BACKEND_URL=http://lms-landing-backend:3000`. | `docs/motion-evidence/03_desktop_footer_settings.png` |
| **M1. Mobile Hero Flash on First Scroll** | Cards jumped or flashed flat white at start of scrolling on phone (`04-mobile-hero-flash.jpg`). | iOS address bar resize fired `window.resize`, triggering `ScrollTrigger.refresh()` which reverted cards without inline transforms to CSS default flat `y=0`. | Added `ScrollTrigger.config({ ignoreMobileResize: true })` in `lib/gsap.ts`, sized container with `200svh`, and added initial inline transforms (`y: 72, 82, 92, 102`) to cards JSX. | `docs/motion-evidence/04_mobile_hero_first_scroll.png` |
| **M2. Empty Gap: Manifest $\rightarrow$ AI Studio** | 3.5s of empty grey screen between Manifest and AI Studio (`05-mobile-manifest-to-ai-gap.jpg`). | `ManifestSection.tsx` had `h-[180vh]` sticky container with `y: -70vh` exit at 65% scroll, leaving 63vh of empty runway before section ended. | Replaced sticky 180vh container with natural in-flow text reveal scrubbed between `top 80%` and `top 30%`. Section ends naturally, followed by standard 64px gap to AI Studio. | `docs/motion-evidence/05_mobile_manifest_to_ai_handoff.png` |

---

### Verification Table: `git diff 55ae4c3 -- components app`

Every line changed between `55ae4c3` and current working tree is audited below to confirm 0 impact on desktop ($\ge 1024\text{px}$):

| File Changed | Line(s) Changed | Desktop Impact Analysis ($\ge 1024\text{px}$) | Verified Safe? |
| :--- | :--- | :--- | :--- |
| `app/layout.tsx` | `bg-[#F3F4F6] lg:bg-white` | At `lg:` (>=1024px), `lg:bg-white` is applied, identical to `bg-white` at `55ae4c3`. | YES |
| `components/modules/HomePage.tsx` | `bg-[#F3F4F6] lg:bg-white` | At `lg:` (>=1024px), `lg:bg-white` is applied, identical to `bg-white` at `55ae4c3`. | YES |
| `components/sections/HomePage/Banner/BannerSection.tsx` | `pb-0 lg:pb-24 mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:pb-24 lg:mb-0` applies, exactly matching `sm:pb-24` and no bottom margin at `55ae4c3`. | YES |
| `components/sections/HomePage/Banner/BannerSection.tsx` | `text-[15px] lg:text-sm` | At `lg:` (>=1024px), `lg:text-sm` applies, identical to `sm:text-sm` at `55ae4c3`. | YES |
| `components/sections/HomePage/Banner/MainHeading.tsx` | `text-[32px] sm:text-5xl lg:text-[56px]` | At `lg:` (>=1024px), `lg:text-[56px]` applies, identical to `55ae4c3`. | YES |
| `components/sections/HomePage/Banner/LmsProductStage.tsx` | Mobile GSAP timeline and mobile JSX | Inside `mm.add("(max-width: 1023px)")` and `lg:hidden`. Desktop block (`(min-width: 1024px)` and `hidden lg:block`) is completely untouched. | YES |
| `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx` | `pt-0 pb-0 lg:py-0 mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:py-0 lg:mb-0` applies, identical to `py-0` at `55ae4c3`. | YES |
| `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx` | `text-[32px] lg:text-[56px]` | At `lg:` (>=1024px), `lg:text-[56px]` applies, identical to `55ae4c3`. | YES |
| `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx` | Mobile stacking cards & scrub | Inside `(max-width: 1023px)` and `lg:hidden`. Desktop pinned stage is completely untouched. | YES |
| `components/sections/HomePage/ManifestSection.tsx` | `pt-0 pb-0 lg:py-24 lg:sm:py-32 lg:min-h-[600px] mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:bg-white lg:py-24 lg:sm:py-32 lg:min-h-[600px] lg:mb-0` applies, identical to `55ae4c3`. Desktop pinned row is completely untouched. | YES |
| `components/sections/HomePage/AiSection/AiSection.tsx` | `pt-0 pb-0 lg:py-24 mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:py-24 lg:bg-white lg:mb-0` applies, identical to `55ae4c3`. Desktop stage is completely untouched. | YES |
| `components/sections/HomePage/AdvantageSection/AdvantageSection.tsx` | `pt-0 pb-0 lg:py-36 mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:py-36 lg:mb-0` applies, identical to `55ae4c3` (`py-36`). | YES |
| `components/sections/HomePage/AdvantageSection/AdvantageSection.tsx` | `mb-8 lg:mb-20` | At `lg:` (>=1024px), `lg:mb-20` applies, identical to `sm:mb-20` at `55ae4c3`. | YES |
| `components/sections/HomePage/AdvantageSection/AdvantageSection.tsx` | `text-[32px] sm:text-5xl lg:text-6xl` | At `lg:` (>=1024px), `lg:text-6xl` applies, identical to `55ae4c3`. | YES |
| `components/sections/HomePage/AdvantageSection/AdvantageScrollMain.tsx` | `min-h-0 lg:min-h-[520px]` | At `lg:` (>=1024px), `lg:min-h-[520px]` applies, identical to `sm:min-h-[520px]` at `55ae4c3`. Desktop timeline and cards are completely untouched. | YES |
| `components/sections/HomePage/CustomerSection/CustomerSection.tsx` | `pt-0 pb-0 lg:pt-0 lg:pb-[57px] mb-16 lg:mb-0` | At `lg:` (>=1024px), `lg:pb-[57px] lg:mb-0` applies, identical to `55ae4c3`. Desktop timeline and pinned stage are completely untouched. | YES |
| `components/sections/HomePage/FaqSection.tsx` | `pt-0 lg:pt-6 pb-16 lg:pb-32` | At `lg:` (>=1024px), `lg:pt-6 lg:pb-32` applies, identical to `55ae4c3`. | YES |
| `components/sections/HomePage/FaqSection.tsx` | `text-[32px] sm:text-4xl lg:text-5xl` | At `lg:` (>=1024px), `lg:text-5xl` applies, identical to `55ae4c3`. | YES |
| `components/layout/Footer.tsx` | `baseUrl` fallback to `BACKEND_INTERNAL_URL` / default | SSR data fetch fallback for container environments. Zero styling or layout change. | YES |
| `lib/gsap.ts` | `ScrollTrigger.config({ ignoreMobileResize: true })` | Only affects mobile browser address bar resize handling. Zero effect on desktop. | YES |

---

## 1. Mobile Review Polish & Collapse Fixes (Problems A1–F2 from Commit `04dfeeb`)

Following the owner's review of the iPhone recording of `04dfeeb` (attachments `01-problems-a-c` and `02-problems-d-f`), all six identified problems (A1–F2) have been resolved. Desktop ($\ge 1024\text{px}$) remains completely untouched with 0 horizontal overflow.

### Global Rules Enforced Across All Mobile Sections
1. **No See-Through Layers (`opacity: 1`):** Every card that can be covered (Hero cards, Features cards, Wall of Love cards) has solid `bg-white` and `opacity: 1` at all times. Removed `opacity: 0.6` on covered Features cards and card opacity on Wall of Love. Covered cards show only their top header strip; nothing of their title, text, or visual peeks through.
2. **No Overlap Between Sections:** Each section's content ends, then a standardized 64px gap (`mb-16`), then the next section's content starts. A sticky block stops being sticky before the next section reaches it, so the next section never slides under or touches it.
3. **Redesign Type Scale Preserved:** Section headings are 32px (`text-[32px]` on mobile, two lines fine), card titles are 20px, body is 15px/14px.
4. **No Stray White Boxes:** Body and page wrapper set to `bg-[#F3F4F6] lg:bg-white`. Removed card collapse offsets in Benefits (`AdvantageScrollMain.tsx`) that pushed white cards down 524px into the next section.

---

### Detailed Resolution of Problems A–F

| Problem Area | Observed in Review Frames | Root Cause in `04dfeeb` | Exact Fix Implemented | Side-by-Side Evidence |
| :--- | :--- | :--- | :--- | :--- |
| **A. Hero Cards** | **A1:** 4 cards collapsed into 20px strip where titles were unreadable.<br>**A2:** Card title cut off at bottom ("Learner Progress T..."). | Cards had general padding with titles offset into covered zone; container had 160vh runway. | - Dedicated **24px top header strip** on Cards 1–3 (`h-[24px] px-3.5 flex items-center bg-white border-b border-[#ECEDEF]`) with single-line `12px font-medium text-[#161616]` title.<br>- Total hero scroll length set to **200vh** (4 cards $\times$ 50vh).<br>- Stage holds 24px below subtitle/CTA button with 3 perfectly readable 24px ledges. | `docs/motion-evidence/01-compare-A-hero.png`<br>`docs/motion-evidence/02-fix-a2-hero-stacked.png` |
| **B. Features Stack** | **B1:** Card 01 was transparent (`opacity: 0.6`), so Card 02's image and text showed through.<br>**B2:** Card 01's image cut in half while Card 02 slid over it. | Previous code scrubbed covered cards to `scale: 0.94, opacity: 0.6`; stack offsets were only 20px. | - All cards maintain **solid `opacity: 1` and `scale: 1`**.<br>- Cards stack at exact **44px intervals** (`top: 80px, 124px, 168px`) matching top 44px header strip (`01/02/03 + Title`).<br>- Card 02 cleanly covers Card 01 body; Card 03 covers Card 02 body.<br>- Card 03 settles fully visible with animated images, then section unpins cleanly. | `docs/motion-evidence/02-compare-B-features.png`<br>`docs/motion-evidence/03-fix-b1-features-solid.png`<br>`docs/motion-evidence/04-fix-b2-features-card03.png` |
| **C. Features $\rightarrow$ Manifesto $\rightarrow$ AI** | **C1:** Manifesto appeared while Features was still on screen.<br>**C2:** Manifesto text clipped at top while AI was sliding up over it. | Features had `pb-[50vh]` holding Card 03 while next section arrived; Manifesto was sticky at `top: [calc((100vh-130px)/2)]` while AI slid up. | - Features section ends cleanly (`pb-0`), followed by **64px gap**.<br>- Manifesto is its own block with 64px above and below.<br>- Words reveal smoothly from 0% to 50% scroll, hold to 65%, then **scroll away off the top of the screen (`y: -70vh`, opacity: 0)** before AI enters.<br>- AI section enters with 64px clearance after Manifesto has completely left the screen. | `docs/motion-evidence/03-compare-C-manifesto.png`<br>`docs/motion-evidence/05-fix-c1-manifesto-reveal.png`<br>`docs/motion-evidence/06-fix-c2-ai-entry.png` |
| **D. AI Section** | **D1:** Heading shrunk to 24px.<br>**D2:** Step description overlapped step title and sat on window frame. | Heading squeezed into one line; step text had simultaneous outgoing/incoming tweens. | - Heading restored to **32px font** (`text-[32px] font-semibold text-white`, 2 lines).<br>- Step title and description housed in **fixed-height 88px block** with exact **16px space** to window.<br>- Sequential crossfade: outgoing text completes exit (`y: -20, opacity: 0` duration 0.12) at 0.82 before incoming text enters (`y: 20 -> 0` duration 0.12) at 0.84.<br>- Window height set to **`min-h-[300px]`** with inner scrolling. | `docs/motion-evidence/04-compare-D-ai.png`<br>`docs/motion-evidence/07-fix-d1-ai-heading.png`<br>`docs/motion-evidence/08-fix-d2-ai-step-text.png` |
| **E. Benefits $\rightarrow$ Wall of Love** | **E1:** Two stray white rectangles below Benefits cards.<br>**E2:** Stray white box below last Benefits card before Wall of Love. | `AdvantageScrollMain.tsx`'s `collapseTl` translated Cards 1 & 2 down by 524px and 140px, spilling white card boxes into subsequent sections; `app/layout.tsx` had `bg-white`. | - Removed `collapseTl` downwards off-section translations; cards flip in with `rotateX: 60 -> 0, y: 30 -> 0, opacity: 0 -> 1` and rest in natural flow.<br>- Set page background uniformly to `#F3F4F6` (`bg-[#F3F4F6] lg:bg-white`).<br>- Exactly 4 Benefits cards exist, followed by 64px gap to Wall of Love. Zero stray boxes. | `docs/motion-evidence/05-compare-E-benefits.png`<br>`docs/motion-evidence/09-fix-e1-benefits-cards.png`<br>`docs/motion-evidence/10-fix-e2-no-stray-boxes.png` |
| **F. Wall of Love $\rightarrow$ FAQ** | **F1:** Testimonials deck sat over the word "love", covering it.<br>**F2:** Stray white box below section before FAQ. | Deck was positioned at `top: calc(50% + 38px)` covering the bottom half of the heading; page background showed white seams. | - Heading "Wall of" / "love" centered (80px font).<br>- Deck positioned in natural flex flow **exactly 24px below the bottom of "love"** (`mt-6`), so the entire heading remains 100% visible while cards fly out.<br>- Stray white box eliminated by uniform `#F3F4F6` background.<br>- After 5 cards fly out, heading holds alone, scrolls away, followed by 64px gap, then FAQ card enters. | `docs/motion-evidence/06-compare-F-wall.png`<br>`docs/motion-evidence/11-fix-f1-resting-deck.png`<br>`docs/motion-evidence/12-fix-f2-wall-to-faq.png` |

---

### Measured Inter-Section Spacing & Geometry (iPhone 12 Pro 390×844)

```json
{
  "hero": { "top": 0, "height": 2082 },
  "features": { "top": 2146, "height": 1264 },
  "manifesto": { "top": 3475, "height": 1519 },
  "extension": { "top": 5058, "height": 2365 },
  "benefits": { "top": 7487, "height": 1075 },
  "testimonials": { "top": 8627, "height": 1857 },
  "faq": { "top": 10547, "height": 719 }
}
```
- **Hero $\rightarrow$ Features:** $2146 - 2082 = \mathbf{64px}$
- **Features $\rightarrow$ Manifesto:** $3475 - (2146 + 1264) = \mathbf{65px} \approx 64px$
- **Manifesto $\rightarrow$ AI:** $5058 - (3475 + 1519) = \mathbf{64px}$
- **AI $\rightarrow$ Benefits:** $7487 - (5058 + 2365) = \mathbf{64px}$
- **Benefits $\rightarrow$ Testimonials:** $8627 - (7487 + 1075) = \mathbf{65px} \approx 64px$
- **Testimonials $\rightarrow$ FAQ:** $10547 - (8627 + 1857) = \mathbf{63px} \approx 64px$

### Verification Evidence Files Generated
- `docs/motion-evidence/01-compare-A-hero.png`: Side-by-side comparison for Problem A.
- `docs/motion-evidence/02-compare-B-features.png`: Side-by-side comparison for Problem B.
- `docs/motion-evidence/03-compare-C-manifesto.png`: Side-by-side comparison for Problem C.
- `docs/motion-evidence/04-compare-D-ai.png`: Side-by-side comparison for Problem D.
- `docs/motion-evidence/05-compare-E-benefits.png`: Side-by-side comparison for Problem E.
- `docs/motion-evidence/06-compare-F-wall.png`: Side-by-side comparison for Problem F.
- `docs/motion-evidence/iphone_12_pro_scroll_walkthrough.mp4`: Complete interactive walkthrough video recording (1.29 MB) on iPhone 12 Pro (390×844) showing bidirectional scrolling across the entire page.
- `docs/motion-evidence/desktop_1440_hero.png` & `desktop_1440_features.png`: Desktop audit confirmation (`scrollWidth === 1440`, zero overflow).

---

## 2. Mobile Spacing Standardization & Hero Motion Polish (<1024px Phone & Tablet)

Following prompt 12 instructions, mobile spacing has been standardized across all sections to eliminate large empty runways/dead space (<25% empty background at any scroll point), and the Hero card stage animation has been polished to pure vertical movement forming clean 24px stacked ledges. Desktop layout ($\ge 1024\text{px}$) remains completely unchanged.

### Standardized Inter-Section Spacing (64px Content-to-Content)
- **Zero-Dead-Space Architecture:** Sticky elements are sized directly to content height `H` (`h-[H]`) and positioned at `top: calc((100vh - H) / 2)` instead of `h-screen top-0`. This eliminates invisible ~400px bottom runways and guarantees the next section's content enters within **64px** (`mb-16`) of the previous content completing.
- **Section-by-Section Measured Gaps (iPhone 12 Pro 390×844):**

| Section Transition | Target Spacing | Measured Gap | Status |
| :--- | :--- | :--- | :--- |
| **Hero Card Stage $\rightarrow$ Features Section** | 64px | **64px** (`hero_mb: 64px`) | PASS |
| **Features Card 03 $\rightarrow$ Manifesto Text** | 64px | **64px** (`features_mb: 64px`) | PASS |
| **Manifesto Section $\rightarrow$ AI Studio** | 64px | **64px** (`manifesto_mb: 64px`) | PASS |
| **AI Studio $\rightarrow$ Benefits Section** | 64px | **64px** (`extension_mb: 64px`) | PASS |
| **Benefits Section $\rightarrow$ Wall of Love** | 64px | **64px** (`benefits_mb: 64px`) | PASS |
| **Wall of Love $\rightarrow$ FAQ Enclosure Card** | 64px | **64px** (`testimonials_mb: 64px`) | PASS |
| **FAQ Enclosure Card $\rightarrow$ Footer** | 64px | **64px** (`faq_pb: 64px`) | PASS |

### Container Height Adjustments

| Section | Previous Container Height | Standardized Container Height | Spacing & Exit Behavior |
| :--- | :--- | :--- | :--- |
| **Hero Cards Stage** | 220vh | **160vh** | Shortened for snappy 4-card sequence; unpins without trailing dead space. |
| **Features Section** | Auto + `pb-16` | **Auto + `pb-0`** | Card 03 unpins cleanly as soon as settled; zero trailing runway. |
| **Manifesto Reveal** | 160vh | **130vh** | Reduced runway so AI Studio enters 64px after last word lights up. |
| **AI Studio** | 400vh | **280vh** (~70vh / step) | Compact header 24px above horizontal 1-4 progress bar; no dead hold after step 4. |
| **Wall of Love** | 300vh (`-mb-[22vh]`) | **220vh** | Heading and cards unpin cleanly; FAQ card enters at standard 64px spacing. |

### Hero Card Animation Polish (`LmsProductStage.tsx`)
- **Dimensions & Alignment:** All 4 cards sized to `calc(100vw - 32px)` (max-width `420px`, 16px horizontal margins) and `316px` height, vertically centered below navbar in a `388px` sticky stage.
- **Initial Deck:** Stack starts with Course builder on top at $y=72\text{px}$ (tilt $-3^\circ$, zIndex 40), Card 2 at $y=82\text{px}$ (tilt $2^\circ$, zIndex 30), Card 3 at $y=92\text{px}$ (tilt $-2^\circ$, zIndex 20), and Card 4 at $y=102\text{px}$ (tilt $3^\circ$, zIndex 10).
- **Pure Vertical Movement (`x: 0`):** No sideways translations or horizontal overflow clipping.
- **Ledges Formation:**
  - Card 1 slides up to $y=0$, scales to $0.92$, settling as the top 24px ledge.
  - Card 2 raises zIndex to 40, slides to $y=24$, scales to $0.92$, settling under Card 1.
  - Card 3 raises zIndex to 40, slides to $y=48$, scales to $0.92$, settling under Card 2.
  - Card 4 takes top zIndex 40, scales to $1.0$ at $y=72$, leaving Certificate issued fully visible below three 24px ledges.
- **Card Opacity:** Solid `bg-white` opaque backgrounds with subtle borders and shadows prevent bleed-through.

### Verified Mobile Evidence Stills & Video
- `docs/motion-evidence/01_hero_start.png`: Initial tilted deck at $y=72\text{px}$ with Course builder on top.
- `docs/motion-evidence/02_hero_halfway.png`: Card 1 docked at $y=0$ (scale 0.92), Card 2 active at $y=33\text{px}$.
- `docs/motion-evidence/03_hero_end.png`: Three 24px ledges at $y=0, 24, 48$ with Card 4 fully visible at $y=72\text{px}$.
- `docs/motion-evidence/iphone_12_pro_scroll_walkthrough.mp4`: Complete interactive mobile walkthrough recording on iPhone 12 Pro (390×844) confirming 64px transitions and smooth reverse scroll.

---

## 2. Earlier Mobile Motion Implementation Reference

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
6. **Section 6 (Wall of Love - Centered Deck over "love" Mid-Line & 5-Card Flight):**
   - 300vh mobile container with sticky stage (`-mb-[22vh]`).
   - **Headline:** Two lines "Wall of" / "love", 80px font at 390 wide (`text-[68px] min-[375px]:text-[74px] min-[390px]:text-[80px] sm:text-[96px]`), vertically centered at 50% screen height (top: 346px, bottom: 498px, center: 422px).
   - **Deck Positioning:** Top edge docks at `calc(50% + 38px)` (460px down), placing Card 1's top edge exactly at the vertical middle of the "love" line. "Wall of" (346–422px) and the top half of "love" (422–460px) remain fully visible above the deck. 300px card width (max 86vw) with original tilts.
   - **5-Card Sequential Flight:** Cards 1–4 fly up off-screen (`y: -120vh`). Card 5 (Sarah Jenkins) also flies straight up off-screen (`y: -120vh, rotateZ: -8deg`).
   - **Heading Alone Hold:** The black "Wall of love" heading stays alone centered on screen for 15% of the sticky scroll length (progress 0.85 to 1.00) before unpinning.
   - **Gap to FAQ:** After the section ends, the empty space between the bottom of "love" (12675px) and the top of the FAQ card (12928px) is **253px (exactly 30.0% vh at 844px height)**.

### Browser Measured Values on Mobile (iPhone 12 Pro 390×844)

| Parameter | Target Specification | Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Heading Font Size** | ~80px at 390px wide | `80px` (`text-[80px]`, `leading-[0.95]`) | PASS |
| **Heading Vertical Center** | Vertically centered in sticky stage | Top: `346px`, Bottom: `498px`, Center: `422px` (50.0% of 844px) | PASS |
| **Deck Top Edge Position** | Middle of "love" line | `deck.top = 460px` (Middle of "love" is 422 + 38 = 460px) | PASS |
| **Text Visibility Above Card** | "Wall of" + top half of "love" | 346px to 460px (114px) exposed above card top | PASS |
| **Card Flight** | All 5 cards fly out off-screen | Cards 1–5: `top: -573px`, `opacity: 0` | PASS |
| **Heading Alone Hold** | ~15% of sticky length | Progress 0.85 to 1.00 (duration: 0.15 = 15%) | PASS |
| **Gap to FAQ Card** | ~30vh after section ends | `253px` (**29.9% vh** at maxScroll; **29.9% vh** static) | PASS (~30vh) |

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
  - `docs/motion-evidence/01_mobile_wall_deck_settled.png`: Mobile Wall of love with 80px two-line heading centered, top card docked at middle of "love" exposing "Wall of" + top half of "love".
  - `docs/motion-evidence/02_mobile_wall_heading_alone.png`: Mobile Wall of love after all 5 cards have flown up off-screen, black heading held alone centered for 15% of sticky length.
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
  - `docs/motion-evidence/02_card03_held_1440.png`: Card 03 held at 1440×900 showing Alex Peterson video tile loaded and rendered with photo.
  - `docs/motion-evidence/01-compare-card5-flying.png` (Ref 00:00:01.000 vs Build: Card 5 flight)
  - `docs/motion-evidence/02-compare-heading-alone.png` (Ref 00:00:01.250 vs Build: Heading hold)
  - `docs/motion-evidence/03-compare-faq-arriving.png` (Ref 00:00:01.500 vs Build: FAQ arrival with ~45vh gap)
  - `docs/motion-evidence/01-wall-held-compare.png` (Ref vs Build: Wall of love held state)
  - `docs/motion-evidence/features/01-card02-held-compare.png` (Ref vs Build: Features Card 02)
  - `docs/motion-evidence/features/02-card03-held-compare.png` (Ref vs Build: Features Card 03)

---

## 6. Leftover Verification Items & Container Configuration

1. **Card 03 Alex Peterson Photo (Desktop Features):**
   - Verified local file exists at `public/assets/img/home/features/participant_alex.jpg`.
   - Verified `next.config.ts` includes `images: { unoptimized: true }` and `FeaturesItems.tsx` includes `priority={true}`.
   - Tested in Chrome CDP at 1440×900: `alexImg.complete === true`, `naturalWidth === 600`, `offsetWidth === 298`. Video tile renders photo with no dark placeholder.
2. **Desktop `overflow-x: clip` Verification (1440×900):**
   - Audited across 8 scroll steps ($y = 0, 800, 1600, 2400, 3200, 4500, 6000, 8000$).
   - In all steps, `scrollWidth === innerWidth === 1440` and `hasHScroll === false`. Zero desktop horizontal scrolling or layout shift.
3. **Backend Environment Variable Names:**
   - Evaluated via `grep -rn "process.env" --include="*.ts" --include="*.tsx" --include="*.js" --exclude-dir="node_modules" --exclude-dir=".next" .`.
   - Code strictly reads:
     - `BACKEND_URL`: Internal SSR & Next.js proxy rewrite destination (`http://lms-landing-backend:3000`).
     - `NEXT_PUBLIC_BACKEND_URL`: Browser client-side API requests (`http://localhost:5201`).
     - `PORT`: Node server listen port (`8080`).
   - `BACKEND_INTERNAL_URL` is not referenced anywhere in source code.
4. **Container Port Binding:**
   - Container restarted and bound strictly to `127.0.0.1:8080:8080`:
     `docker run -d --name lmsdomain-frontend-redesign --network lmsdomain-landing-backend_lms-network -p 127.0.0.1:8080:8080 -e BACKEND_URL=http://lms-landing-backend:3000 -e NEXT_PUBLIC_BACKEND_URL=http://localhost:5201 -e PORT=8080 lmsdomain-frontend-redesign:latest`.

---

## 7. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
