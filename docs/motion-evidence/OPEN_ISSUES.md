# Open Issues & Product Disclosures

**Date:** 2026-10-18 / 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Features Desktop Polish Review (Pending owner review; do not mark verified)

---

## 1. Features Desktop Layout & Motion Fixes (Reference 0:07)

Following the owner's inspection of the 0:07 reference frame, the Features section at desktop ($\ge 1024$px) was updated in `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx`. Mobile and every other section were preserved untouched.

### Problem Addressed
- **Prior build:** The heading block was about 80px tall with excessive spacing above and below it, pushing Card 01 down to ~700px on a 900px window and cutting off the bottom of the card before the stack motion started.
- **Reference 0:07:** The heading is smaller and sits directly under the nav. Card 01 starts right under the heading with the **whole card completely visible** before stacking begins. When Card 02 enters, the whole first card moves up as one block.

### Implemented Corrections
1. **Smaller Heading & Proportional Spacing:**
   - Section heading styled at **48px**, line-height **1.1** (`text-[48px] leading-[1.1] max-w-2xl mx-auto`, two lines).
   - Eyebrow `"✦ CORE CAPABILITIES"`: **12px font**, exactly **12px** above the heading (`mb-[12px]`).
   - The heading block starts **24px below the bottom of the nav** (`lg:pt-[92px]` where nav bottom sits at ~67.3px; measured gap: 24.89px).
   - The vertical gap from heading to Card 01 is exactly **32px** (`mb-[32px]`).
2. **Pin When Everything Fits (`start: "top top"`):**
   - Section pins the moment its top reaches the top of the window.
   - At that initial pin moment, the eyebrow, the heading, and **100% of Card 01** are completely visible on screen.
   - The card's bottom is well above the fold:
     - At 1440×900: **156.2px above the bottom of the window** (target $\ge 40$px).
     - At 1280×800: **96.2px above the bottom of the window** (target $\ge 40$px, with card height reduced to 440px).
3. **The Whole Card Moves Up:**
   - As Card 02 starts to enter:
     - The heading scrolls up out of view (`y: -160, opacity: 0`).
     - Card 01 moves up as a whole until its top sits at **120px from the top of the window** (52.7px below the nav bottom, $>24$px clearance).
     - Card 02 slides up from below and covers it, leaving Card 01's 28px ledge (with `"01"`) visible above Card 02.
     - Card 03 slides up leaving both `"01"` and `"02"` ledges exposed.
     - Every card is fully visible once it settles.
4. **Ledges Not Under Nav:**
   - Card 01 ledge top sits at 120px (52.7px below nav).
   - Card 02 ledge top sits at 148px (80.7px below nav).
   - Both ledges stay below the nav at all times, with $>24$px clearance.
5. **Card Width & Height:**
   - Card width is **1290px** at 1440px viewport (90% of window width, not container).
   - Card height is **480px** at 1440×900, and scales to **440px** at 1280×800.
6. **Card 02 Avatars:**
   - Small avatar group sits at `right-8 bottom-8`, remaining $\ge 32$px from card's edges (measured 84.4px from right, 86.8px from bottom).

---

## 2. Browser Measured Values (Chrome CDP at 1440×900 and 1280×800)

### At 1440×900 Window

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Nav Bottom Edge** | Floating Nav B | 67.33px from top | Measured |
| **Heading Block Top** | 24px below nav bottom | 92.22px (gap: **24.89px**) | Matches spec |
| **Eyebrow Font Size** | 12px | 12px | Matches spec |
| **Eyebrow to Heading Gap** | 12px | 12px | Matches spec |
| **Heading Font Size** | 48px | 48px | Matches spec |
| **Heading Line Height** | 1.1 | 52.8px (1.1 ratio) | Matches spec |
| **Heading to Card 01 Gap** | 32px | 32px | Matches spec |
| **Card 01 Width** | 1290px (~90% window) | **1290px** | Matches spec |
| **Card 01 Height** | 480px | **480px** | Matches spec |
| **Card 01 Top at Pin Start** | Below heading block | 263.81px from top | Measured |
| **Card 01 Bottom at Pin Start** | Inside viewport | 743.81px from top | Measured |
| **Card 01 Distance to Fold** | $\ge 40$px above window bottom | **156.19px** | Matches spec ($\ge 40$px) |
| **All of Card 01 Visible** | True at pin start | **true** (zero cutoff) | Matches spec |
| **Card 01 Top When Stacked** | ~120px from window top | **120px** | Matches spec |
| **Ledge Clearance to Nav** | $\ge 24$px below nav bottom | **52.67px** | Matches spec ($\ge 24$px) |
| **Card 02 Avatars From Edges** | $\ge 32$px from right & bottom | Right: **84.4px**, Bottom: **86.8px** | Matches spec ($\ge 32$px) |

### At 1280×800 Window

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Nav Bottom Edge** | Floating Nav B | 67.33px from top | Measured |
| **Heading Block Top** | 24px below nav bottom | 92.22px (gap: **24.89px**) | Matches spec |
| **Card 01 Width** | ~90% window width | **1152px** (90% of 1280) | Matches spec |
| **Card 01 Height** | 440px (reduced for 800px h) | **440px** | Matches spec |
| **Card 01 Top at Pin Start** | Below heading block | 263.81px from top | Measured |
| **Card 01 Bottom at Pin Start** | Inside viewport | 703.81px from top | Measured |
| **Card 01 Distance to Fold** | $\ge 40$px above window bottom | **96.19px** | Matches spec ($\ge 40$px) |
| **All of Card 01 Visible** | True at pin start | **true** (zero cutoff) | Matches spec |

---

## 3. Evidence Artifacts

- **Side-by-Side Comparison Still (Pin Start vs Reference 0:07):**
  - Location: `docs/motion-evidence/features/01-features-card-compare.png`
  - Shows Reference 0:07 on the left and the LMS Domain build at pin start on the right (48px heading 24px below nav, all of Card 01 fully visible, bottom 156px above fold).
- **Motion Walkthrough Video:**
  - Location: `docs/motion-evidence/lmsdomain_motion_walkthrough.mp4` (1.14 MB)
  - QuickTime-compatible MP4 recording slow scroll through Features and back up at 1440×900.
- **Section Stills Captured:**
  - `docs/motion-evidence/features/features_pin_start_1440x900.png`
  - `docs/motion-evidence/features/features_card02_stacked_1440x900.png`
  - `docs/motion-evidence/features/features_pin_start_1280x800.png`

---

## 4. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
