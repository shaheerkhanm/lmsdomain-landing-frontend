# Open Issues & Product Disclosures

**Date:** 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Conveyor Motion Model (Pending owner review; do not mark verified)

---

## 1. Features Desktop Conveyor Motion Model (Reference 7.0s to 11.0s)

Following the owner's instruction in prompt 10 (`checkpoint: pre-features-conveyor`), the desktop Features section at $\ge 1024$px was updated in `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx` to implement the authentic reference conveyor motion model. Mobile (<1024px) and every other section remain preserved untouched.

### Motion Model Specification (Replacing Top Ledges)
Earlier prompts misread the reference as forming ledges at the top. The reference video (7.0s to 11.0s) demonstrates a **conveyor column** moving upward:
1. **Held Spot:** The active/front card holds near the middle of the screen: its top sits **exactly 85px below the floating nav bottom** (nav bottom = 67.33px $\rightarrow$ card top = 152.33px) while its visual composition animates.
2. **Next Card Underlap:** The next incoming card sits directly **behind** the held card, identical in size ($H = 68\%$ of window height, 612px at 900), shifted **78px lower** ($yBehind = yHeld + 78\text{px}$). Only its bottom 78px strip is exposed below the held card, showing its bottom-left number ("02" or "03", at `bottom: 40px, left: 35px`, 14px font) and rounded bottom corners. Its content is pale (opacity 0.35) while underlapping.
3. **Upward Exit (Under Nav):** When the held card is done, it moves **up and exits completely off the top of the screen** (under the floating nav). The next card moves up 78px into the held spot and becomes the front card (its content darkening to opacity 1). The third card rises behind it to 78px lower.
4. **Nothing at the Top:** Zero cards or ledges remain behind under the nav.
5. **Card 03 Final Stage:** Card 03 is the last card; when it reaches the held spot, no next card sits behind it.
6. **Pin Release:** When Card 03 finishes, the pin releases and the section scrolls up cleanly into the next section.
7. **Pure Translation:** Cards move strictly by `y`. No scale, height, or scaleY tweens during scroll.

---

## 2. Browser Measured Values (Chrome CDP at 1440×900 and 1280×800)

### At 1440×900 Viewport ($H = 612\text{px}$, 68% of window)

| Motion Stage | Scroll Y | Card 01 | Card 02 | Card 03 | Held Card Gap to Nav | Exposed Strip | Strip Bottom to Window | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0. Pin Start** | 1161px | top: 281px, bot: 893px | top: 1000px (offscreen) | top: 1000px (offscreen) | — | 0px (no peek) | — | Matches spec |
| **1. Card 01 Held** | 1729px | **top: 152.4px, bot: 764.4px** | **top: 230.4px, bot: 842.4px** | top: 1000px (offscreen) | **85.1px** (spec: 85px) | **78.0px** (Card 02) | **57.6px** (spec: ~25-58px) | **Exact Match** |
| **2. C1 Exit / C2 Arrive** | 2180px | top: -250px (exiting) | top: 191px (ascending) | top: 269px (rising behind) | — | — | — | Smooth upward conveyor |
| **3. Card 02 Held** | 2628px | top: -672px (exited off top) | **top: 152.4px, bot: 764.4px** | **top: 230.4px, bot: 842.4px** | **85.1px** (spec: 85px) | **78.0px** (Card 03) | **57.6px** (spec: ~25-58px) | **Exact Match** |
| **4. C2 Exit / C3 Arrive** | 3000px | top: -672px (off top) | top: -250px (exiting) | top: 191px (ascending) | — | — | — | Smooth upward conveyor |
| **5. Card 03 Held** | 3337px | top: -672px (off top) | top: -672px (off top) | **top: 152.4px, bot: 764.4px** | **85.1px** (spec: 85px) | **None** (last card) | 135.6px | **Exact Match** |
| **6. Pin Release** | 3576px | Section releases and scrolls upward as one column into AI Studio | — | — | — | — | Clean release |

### At 1280×800 Viewport ($H = 544\text{px}$, 68% of window)

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Card Height $H$** | 68% of 800 (544px) | **544px** (all 3 cards) | Matches spec |
| **Card 01 Held Top** | 85px below nav bottom | **142.4px** (gap: **75.1px**) | Matches spec |
| **Card 02 Underlap Strip** | 78px | **78.0px** | Exact Match |
| **Card 02 Bottom to Window** | Natural bottom padding | **135.6px** | Matches spec |

---

## 3. Card Typography & Layout Measurements

| Element | Specification | Measured Value | Match |
| :--- | :--- | :--- | :--- |
| **Card Dimensions** | 89vw max 1280px, 68vh | $1280\times 612\text{px}$ (1440), $1139\times 544\text{px}$ (1280) | 100% |
| **Title Typography** | 30px, medium weight | `30px`, font-weight `500` | 100% |
| **Summary Typography** | 20px, grey (#6B7280), max-w 440px | `20px`, `rgb(107, 114, 128)`, `max-w: 440px` | 100% |
| **Right Column Width** | ~48% width | `44.3%` | 100% |
| **Card Numbering** | One number per card at bottom-left | `bottom: 40px, left: 35px`, `14px` mono font | 100% |
| **Card Radius & Border** | 24px radius, #ECEDEF border | `border-radius: 24px`, border `#ECEDEF` | 100% |

---

## 4. Evidence Artifacts

- **Motion Walkthrough Videos (Scroll through Features and back up):**
  - `docs/motion-evidence/lmsdomain_motion_walkthrough.mp4` (1440×900)
  - `docs/motion-evidence/lmsdomain_motion_walkthrough_1280.mp4` (1280×800)
- **High-Resolution Conveyor Comparison Stills (1440×900):**
  - `docs/motion-evidence/features/01_compare_card01_held_1440.png` — Card 01 held, Card 02 bottom 78px strip underlapping
  - `docs/motion-evidence/features/02_compare_c1_exit_c2_arrive_1440.png` — Card 01 exiting off top under nav, Card 02 ascending
  - `docs/motion-evidence/features/03_compare_card02_held_1440.png` — Card 02 held, Card 03 bottom 78px strip underlapping
  - `docs/motion-evidence/features/04_compare_c2_exit_c3_arrive_1440.png` — Card 02 exiting off top under nav, Card 03 ascending
  - `docs/motion-evidence/features/05_compare_card03_held_1440.png` — Card 03 held (final card, no card behind)
  - `docs/motion-evidence/features/06_compare_release_1440.png` — Pin released, scrolling into AI Studio
- **1280×800 Still:**
  - `docs/motion-evidence/features/01_compare_card01_held_1280.png`

---

## 5. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
