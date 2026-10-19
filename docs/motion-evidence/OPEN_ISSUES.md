# Open Issues & Product Disclosures

**Date:** 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Features Polish Revision (Pending owner review; do not mark verified)

---

## 1. Features Desktop Conveyor Motion Model & Card 03 Polish

Following the owner's instructions in prompts 10 and 11, the desktop Features section at $\ge 1024$px in `components/sections/HomePage/FeaturesSection/FeaturesSection.tsx` maintains the reference conveyor motion model while implementing the visual polish for Card 03, card numbers, and arrival image visibility. Mobile (<1024px) and every other section remain preserved untouched.

### Implemented Polish Updates
1. **Card Numbers (Matching Reference 01-card02-held & 02-card03-held):**
   - Replaced pale monospace numbers with dark `#111` (`rgb(17, 17, 17)`), **12px font**, in the **same sans font (Urbanist)** as the rest of the text, medium weight (`font-medium`).
   - Positioned cleanly at `bottom: 40px, left: 35px` on all three cards.
   - When Card 02 and Card 03 underlap in the $78\text{px}$ bottom strip, their number is dark `#111`, 12px sans, centered vertically in the strip.
2. **Card 03 Images: Bigger and Diagonal (Matching Reference 02-card03-held):**
   - **Tile Size:** Each tile is 50% of the card height ($\approx 300\times 220\text{px}$ at $1440\times 900$) with a `16px` radius (`rounded-[16px]`).
   - **Diagonal Positioning:**
     - Tile 1 (Mia Lewis): positioned upper-left.
     - Tile 2 (Alex Peterson): positioned lower-right, overlapping Tile 1's bottom-right corner by **30.2px horizontally** and **29.7px vertically** (target: $\approx 30\text{px}$).
     - The entire group is vertically centred in the card on the same horizontal line as the title and summary.
   - **Name Chips:**
     - Dark pills (`#111` / `rgb(17, 17, 17)` background, white 13px medium text, soft shadow).
     - Tile 1 chip ("Mia Lewis"): sits at the right edge of Tile 1, featuring a small purple square avatar (`size-5 rounded-[4px] bg-[#7B5CF5]`) with initial `"M"`.
     - Tile 2 chip ("Alex Peterson"): sits at the bottom-left of Tile 2, featuring a small magenta/rose square avatar (`size-5 rounded-[4px] bg-[#E11D48]`) with initial `"A"`.
   - **Connector Line:**
     - Thin dotted grey line (`stroke: #9CA3AF`, `stroke-dasharray: 3 3`, `1.5px` width) routing smoothly between the Mia Lewis chip and the Alex Peterson chip.
   - **Booking Chip:**
     - "Tomorrow, 10:00  1-on-1 Zoom" white chip with purple indicator placed under the lower tile.
3. **Images Visible While a Card Arrives:**
   - Card 03 visuals are now mounted at `0.85` opacity inside `card3ContentRef` (which is at `0.35` opacity while arriving/underlapping), so Card 03's entire right-side composition is visible (pale) while rising behind Card 02, matching Card 02's arrival behavior.
   - Once Card 03 settles in the held position, the tiles and chips animate smoothly into full opacity and scale.

---

## 2. Browser Measured Values (Chrome CDP at 1440×900)

### Card Numbers

| Card | Measured Text | Font Size | Font Family | Font Weight | Computed Color | Position |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Card 01** | `"01"` | **12px** | Sans-serif (Urbanist) | 500 (medium) | `rgb(17, 17, 17)` (`#111`) | `bottom: 40px, left: 35px` |
| **Card 02** | `"02"` | **12px** | Sans-serif (Urbanist) | 500 (medium) | `rgb(17, 17, 17)` (`#111`) | `bottom: 40px, left: 35px` |
| **Card 03** | `"03"` | **12px** | Sans-serif (Urbanist) | 500 (medium) | `rgb(17, 17, 17)` (`#111`) | `bottom: 40px, left: 35px` |
| **Underlap Strip (Card 03 in C2)** | `"03"` | **12px** | Sans-serif (Urbanist) | 500 (medium) | `rgb(17, 17, 17)` (`#111`) | Visible in 78px strip |

### Card 03 Tile Geometry & Diagonal Layout

| Metric | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Card 03 Height ($H$)** | 68% of 900 (612px) | **612px** | Matches spec |
| **Tile 1 (Mia Lewis) Dimensions** | $\approx 300\times 220\text{px}$ (50% card height) | **300.0px $\times$ 220.0px** | Exact match |
| **Tile 1 Border Radius** | 16px | **16px** | Exact match |
| **Tile 2 (Alex Peterson) Dimensions** | $\approx 300\times 220\text{px}$ (50% card height) | **299.7px $\times$ 219.8px** | Exact match |
| **Tile 2 Border Radius** | 16px | **16px** | Exact match |
| **Diagonal Horizontal Overlap** | $\approx 30\text{px}$ | **30.2px** | Exact match |
| **Diagonal Vertical Overlap** | $\approx 30\text{px}$ | **29.7px** | Exact match |
| **Tile 1 Position** | Upper-left of visual group | `left: 0px, top: 0px` in group | Centred in card |
| **Tile 2 Position** | Lower-right of visual group | `left: 270px, top: 190px` in group | Centred in card |
| **Mia Lewis Chip** | Dark `#111`, 13px, "M" avatar, right edge of Tile 1 | `rgb(17, 17, 17)`, 13px, avatar `"M"`, `left: 245px, top: 135px` | Matches reference |
| **Alex Peterson Chip** | Dark `#111`, 13px, "A" avatar, bottom-left of Tile 2 | `rgb(17, 17, 17)`, 13px, avatar `"A"`, `left: 200px, top: 345px` | Matches reference |
| **Dotted Connector Line** | Thin grey dotted line between chips | `path` present, `stroke: #9CA3AF`, `stroke-dasharray: 3 3` | Matches reference |
| **Booking Chip** | Under lower tile | `left: 330px, top: 422px` (11.9px below Tile 2 bottom) | Matches reference |
| **Card 03 Arrival Opacity** | Images in place at pale opacity while rising | `c3ContentOpacity: 0.35`, `c3TileOpacity: 0.85` | Images visible arriving |

---

## 3. Evidence Artifacts

- **Side-by-Side Comparison Stills (Reference vs Our Build):**
  - `docs/motion-evidence/features/01-card02-held-compare.png` (Reference vs Build: Card 02 Held with dark 12px sans numbers)
  - `docs/motion-evidence/features/02-card03-held-compare.png` (Reference vs Build: Card 03 Held with diagonal tiles, chips, and line)
- **High-Resolution Stage Stills (1440×900):**
  - `docs/motion-evidence/features/01_card02_held_1440.png`
  - `docs/motion-evidence/features/02_card03_held_1440.png`
- **Motion Walkthrough Videos (Slow scroll through Features and back up):**
  - `docs/motion-evidence/lmsdomain_motion_walkthrough.mp4` (1440×900)
  - `docs/motion-evidence/lmsdomain_motion_walkthrough_1280.mp4` (1280×800)
- **Detailed JSON Metrics:**
  - `docs/motion-evidence/features/features_polish_metrics.json`

---

## 4. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
