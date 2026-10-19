# Open Issues & Product Disclosures

**Date:** 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Features Desktop v2 Revision (Pending owner review; do not mark verified)

---

## 1. Features Desktop Layout & Motion Fixes (Reference 0:07 v2)

Following the owner's instruction in prompt 10 (`checkpoint: pre-features-v2`, replacing `homepage-features-desktop-fix.md`), the desktop Features section at $\ge 1024$px was redesigned in `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx`. Mobile (<1024px) and every other section remain preserved untouched.

### Problem Addressed
- **Prior attempt:** Fixed card heights of 480px / 440px were too small (~53% / 55% of window), leaving an unnatural empty void at the bottom and appearing squashed compared to Mota at 0:07 (~69% window height, bottom sitting ~3% / 30px above window bottom). Additionally, a duplicate top-left number was shown alongside the bottom-left number, and Card 02 peeked below Card 01 at start.
- **Reference 0:07:** One large white card fills the screen vertically down to ~32px above the bottom of the window. The heading sits directly below the floating nav at 56px. Exactly ONE `"01"` label is visible at the bottom-left. Card 02 is completely offscreen at start with zero peeking.

### Implemented Corrections (Features v2)
1. **Card Height Fills the Screen (Viewport Units):**
   - Card height changed from fixed 480px / 440px to:
     `calc(100vh - 272px - 32px)` (`calc(100vh - 304px)`)
   - Bottom of Card 01 sits **exactly 32px above the bottom of the window** at pin start across all viewports.
   - At 1440×900: Card height is **587px** (**65.2%** of window), bottom is at **868px** (distance to fold: **32px**).
   - At 1280×800: Card height is **487px** (**60.9%** of window), bottom is at **768px** (distance to fold: **32px**).
   - Removed all fixed 480px/440px classes and 1280×800 overrides.
2. **Heading Size & Positioning:**
   - Section heading styled at **56px**, line-height **1.1** (`text-[56px] leading-[1.1] max-w-3xl mx-auto`, two lines).
   - Eyebrow `"✦ CORE CAPABILITIES"`: **12px font**, exactly **12px** above heading (`mb-[12px]`).
   - Sits **16px below the nav**: Nav B bottom sits at ~67.3px, heading block starts at 84px (`lg:pt-[84px]`; measured gap: **17px**).
   - Gap between heading and card is exactly **40px** (`mb-[40px]`).
3. **One Number Per Card:**
   - At pin start, only Card 01 is on screen. Exactly **one** `"01"` is visible at bottom-left (14px font, 32px from left and bottom edges).
   - **Top-left duplicate number removed completely.**
   - In the GSAP scroll timeline, as Card 02 arrives, Card 01's single number shifts up into the exposed 28px top ledge (`top: 6px, left: 32px`).
   - When Card 03 arrives, Card 02's single number shifts up into Card 02's exposed 28px top ledge.
   - Zero duplicate numbers exist in the DOM or on screen at any time.
4. **Nothing Peeks at Start:**
   - Card 02 and Card 03 start at `y: "100vh"` (completely below the viewport).
   - No 24px peek, no `"02"` showing. Card 01 sits clean and alone with heading above it.
   - Total visible number labels at pin start: **1** (Card 01's bottom-left).
5. **Stack Motion:**
   - As you scroll:
     - Heading scrolls away (`y: -160, opacity: 0`).
     - Card 01 moves up until its top sits **24px below the nav** (~92px from the window top; top = 92px).
     - Card 02 slides up from below the window and comes to rest over Card 01, leaving a **28px ledge** of Card 01 visible at the top (top of Card 02 at ~120px).
     - Card 03 slides up from below and comes to rest over Card 02, leaving a **28px ledge** of Card 02 visible (top of Card 03 at ~148px).
     - Both ledges (01 and 02) stay visible at the top, below the nav.
     - When stacked, each card that has settled ends **32px above the bottom of the window**.
6. **Card Content Scaled Up:**
   - Left column (40% width):
     - Title: **34px**, medium weight (`text-[34px] font-medium text-[#161616] leading-[1.2]`).
     - Description: **20px**, grey, max 3 lines, max width 440px (`text-[20px] text-[#6B7280] max-w-[440px] line-clamp-3`).
     - Centred vertically in the left 40% of the card.
   - Right column (image group):
     - Fills **47%** of card width and **78%** of card height (`w-[47%] h-[78%]`).
     - The big photo is ~**374px wide** at 1440 (~26% of window width).
     - Visuals animate in when each card settles (same motion ownership as now).

---

## 2. Uniform Constant Card Height H Across All Cards and Scroll States

### Problem Addressed
Previously, Card 01 was calculated at `calc(100vh - 304px)` at pin start, but Cards 02 and 03 were sized to end 32px above the bottom of the window from their stacked positions (`calc(100vh - 120px - 32px)` and `calc(100vh - 148px - 32px)`). Additionally, a timeline tween animated `height` on Card 01, causing Card 01 to appear to resize during scroll.

### Implemented Fix
1. **Single Constant Card Height $H$:**
   - Evaluated once from Card 01 at pin start:
     `H = 100vh - (card 01 top at pin start) - 32px`
   - At 1440×900: $H = 900 - 281.4 - 32 = 587\text{px}$.
   - At 1280×800: $H = 800 - 281.4 - 32 = 487\text{px}$.
   - Applied uniformly to all three cards (`card1Ref`, `card2Ref`, `card3Ref`) in JSX and GSAP initial sets.
   - Recalculated only on window resize (via resize listener and ScrollTrigger invalidation), never during scroll.
2. **Zero Height/Scale Tweens During Scroll:**
   - Removed all `height`, `scale`, and `scaleY` tweens on the cards.
   - Card 01 moves up via `y` only (`y: -(cardTopAtStart - 92)`).
   - Card 02 and Card 03 translate via `y` only into their stacked positions.
3. **Card Bottoms Settle Naturally Without Stretching:**
   - At 1440×900:
     - Card 01 initial bottom: **868.4px** (32px above window bottom)
     - Card 01 stacked bottom: $92.4 + 587 = \mathbf{679.4\text{px}}$
     - Card 02 settled bottom: $120.4 + 587 = \mathbf{707.4\text{px}}$
     - Card 03 settled bottom: $148.4 + 587 = \mathbf{735.4\text{px}}$
     - Neither Card 02 nor Card 03 is stretched to the window bottom; they preserve the authentic paper-stack look.
4. **Preserved Features v2 Polish:**
   - 56px heading, 12px eyebrow, 40px gap, single bottom-left numbering shifting into the 28px exposed top ledges, zero peeking of Card 02 at pin start, and scaled photo dimensions.

---

## 3. Browser Measured Values (Chrome CDP at 1440×900 and 1280×800)

### Card Heights Across Scroll Stages (All 3 Cards Must Report Identical Heights)

#### At 1440×900 Viewport ($H = 587\text{px}$)

| Scroll Stage | Scroll Y | Card 01 Height | Card 02 Height | Card 03 Height | Scale / Transform | All Equal? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Pin Start** | 1171px | **587px** | **587px** | **587px** | `matrix(1, 0, 0, 1, 0, 0)` | **YES (587px)** |
| **2. Mid-Stack (Card 02 Settled)** | 2461px | **587px** | **587px** | **587px** | `matrix(1, 0, 0, 1, 0, -184.3)` | **YES (587px)** |
| **3. Fully Stacked (Card 03 Settled)** | 3561px | **587px** | **587px** | **587px** | `matrix(1, 0, 0, 1, 0, -189)` / `-161` / `-133` | **YES (587px)** |

*Settled Tops & Bottoms at 1440×900:*
- Card 01: Top = **92.4px**, Bottom = **679.4px**
- Card 02: Top = **120.4px**, Bottom = **707.4px** (spec: ~707px)
- Card 03: Top = **148.4px**, Bottom = **735.4px** (spec: ~735px)

#### At 1280×800 Viewport ($H = 487\text{px}$)

| Scroll Stage | Scroll Y | Card 01 Height | Card 02 Height | Card 03 Height | Scale / Transform | All Equal? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Pin Start** | 1171px | **487px** | **487px** | **487px** | `matrix(1, 0, 0, 1, 0, 0)` | **YES (487px)** |
| **2. Mid-Stack (Card 02 Settled)** | 2461px | **487px** | **487px** | **487px** | `matrix(1, 0, 0, 1, 0, -189)` | **YES (487px)** |
| **3. Fully Stacked (Card 03 Settled)** | 3561px | **487px** | **487px** | **487px** | `matrix(1, 0, 0, 1, 0, -189)` / `-161` / `-133` | **YES (487px)** |

---

### Layout & Spacing Verification

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Nav Bottom Edge** | Floating Nav B | 67.33px from top | Measured |
| **Heading Block Top** | ~16px below nav bottom | 84.00px from top (gap: **17px**) | Matches spec (~16px) |
| **Heading Font Size** | 56px | **56px** | Matches spec |
| **Heading Line Height** | 1.1 | 61.6px (1.1 ratio) | Matches spec |
| **Eyebrow Font Size & Gap** | 12px, 12px above heading | **12px font**, **12px gap** | Matches spec |
| **Gap Heading to Card** | 40px | **40px** | Matches spec |
| **Card 01 Top at Pin Start** | Below heading block | **281.4px** from top | Measured |
| **Card 01 Bottom at Pin Start (1440×900)** | Window bottom minus 32px | **868.4px** from top (32px to fold) | Matches spec |
| **Card 01 Bottom at Pin Start (1280×800)** | Window bottom minus 32px | **768.4px** from top (32px to fold) | Matches spec |
| **Visible Number Labels at Start** | Exactly 1 (Card 01 bottom-left) | **1** (`text: "01"`, 14px font) | Matches spec |
| **Top-Left Duplicate Number** | Removed completely | **None** in DOM | Matches spec |
| **Card 02 Peeking Below at Start** | None (starts at y: 100vh) | **false** (offscreen at 1181px / 1081px) | Matches spec |

---

## 4. Evidence Artifacts

- **Motion Walkthrough Videos (Through Features and back up):**
  - `lmsdomain_motion_walkthrough.mp4` (1440×900)
  - `lmsdomain_motion_walkthrough_1280.mp4` (1280×800)
- **High-Resolution Stage Stills (1440×900):**
  - `docs/motion-evidence/features/features_stage1_pin_start_1440.png`
  - `docs/motion-evidence/features/features_stage2_card02_settled_1440.png`
  - `docs/motion-evidence/features/features_stage3_card03_settled_1440.png`
- **Side-by-Side Comparison Still (Pin Start vs Reference 0:07):**
  - `docs/motion-evidence/features/01-features-card-compare.png`
  - `01-features-card-compare.png` in artifacts
- **Audit Measurement Data:**
  - `scratch/audit_uniform_cards_result.json`

---


## 4. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
