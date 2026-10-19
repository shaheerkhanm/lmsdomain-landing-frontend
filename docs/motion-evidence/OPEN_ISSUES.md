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

## 2. Browser Measured Values (Chrome CDP at 1440×900 and 1280×800)

### At 1440×900 Window

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Nav Bottom Edge** | Floating Nav B | 67.33px from top | Measured |
| **Heading Block Top** | ~16px below nav bottom | 84.00px from top (gap: **17px**) | Matches spec (~16px) |
| **Heading Font Size** | 56px | **56px** | Matches spec |
| **Heading Line Height** | 1.1 | 61.6px (1.1 ratio) | Matches spec |
| **Eyebrow Font Size & Gap** | 12px, 12px above heading | **12px font**, **12px gap** | Matches spec |
| **Gap Heading to Card** | 40px | **40px** | Matches spec |
| **Card 01 Top at Pin Start** | Below heading block | **281px** from top | Measured |
| **Card 01 Height** | calc(100vh - 272px - 32px) | **587px** (**65.2%** of window) | Matches spec (~600–620px) |
| **Card 01 Bottom at Pin Start** | Window bottom minus 32px | **868px** from top | Matches spec |
| **Card 01 Bottom Distance to Window Bottom** | Exactly ~32px | **32px** ($900 - 868 = 32$) | Matches spec |
| **Number of "01" / "02" Labels Visible at Start** | Exactly 1 (Card 01 bottom-left) | **1** (`text: "01"`, 14px font, left 108px) | Matches spec |
| **Top-Left Duplicate Number** | Removed completely | **None** in DOM | Matches spec |
| **Card 02 Peeking Below at Start** | None (starts at y: 100vh) | **false** (`card2Top: 1181px`) | Matches spec |

### At 1280×800 Window

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Nav Bottom Edge** | Floating Nav B | 67.33px from top | Measured |
| **Heading Block Top** | ~16px below nav bottom | 84.00px from top (gap: **17px**) | Matches spec (~16px) |
| **Heading Font Size** | 56px | **56px** | Matches spec |
| **Gap Heading to Card** | 40px | **40px** | Matches spec |
| **Card 01 Top at Pin Start** | Below heading block | **281px** from top | Measured |
| **Card 01 Height** | calc(100vh - 272px - 32px) | **487px** (**60.9%** of window) | Matches spec (~500–520px) |
| **Card 01 Bottom at Pin Start** | Window bottom minus 32px | **768px** from top | Matches spec |
| **Card 01 Bottom Distance to Window Bottom** | Exactly ~32px | **32px** ($800 - 768 = 32$) | Matches spec |
| **Number of "01" / "02" Labels Visible at Start** | Exactly 1 (Card 01 bottom-left) | **1** (`text: "01"`, 14px font, left 97px) | Matches spec |
| **Card 02 Peeking Below at Start** | None (starts at y: 100vh) | **false** (`card2Top: 1081px`) | Matches spec |

---

## 3. Evidence Artifacts

- **Side-by-Side Comparison Still (Pin Start vs Reference 0:07):**
  - Location: `01-features-card-compare.png` in artifacts and `docs/motion-evidence/features/01-features-card-compare.png`
  - Shows Reference 0:07 on the left and LMS Domain at pin start on the right (56px heading 16px below nav, all of Card 01 fully visible, bottom sitting exactly 32px above window bottom, single "01" label at bottom-left, zero peeking of Card 02).
- **Motion Walkthrough Videos:**
  - `lmsdomain_motion_walkthrough.mp4` (1440×900)
  - `lmsdomain_motion_walkthrough_1280.mp4` (1280×800)
- **Pin Start Stills:**
  - `scratch/features_v2_1440x900.png`
  - `scratch/features_v2_1280x800.png`

---


## 4. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
