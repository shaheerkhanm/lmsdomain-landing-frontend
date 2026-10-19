# Open Issues & Product Disclosures

**Date:** 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Wall of Love Revision (Pending owner review; do not mark verified)

---

## 1. Wall of Love Desktop Vertical Centering, 30vw Cards, and Cascading Deck Sequence

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

## 2. Browser Measured Values (Chrome CDP)

### 1440×900 Desktop Viewport

| Parameter | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Headline Vertical Center** | Exactly centered at 50% ($y = 450\text{px}$) | **50.05%** ($y = 450.5\text{px}$) | Exact match |
| **Headline Span** | Letters run across center line | **35.5% to 64.6%** ($319.5\text{px}$ to $581.4\text{px}$) | Exact match |
| **Top Card (Card 1) Top Edge** | Sits across middle of letters ($\approx 47\%-51\%$) | **51.2%** ($460.7\text{px}$) | Exact match |
| **Top Card Bottom Edge** | Most hangs below letters ($\approx 76\%-78\%$) | **78.4%** ($705.3\text{px}$) | Exact match |
| **Card Dimensions** | $\approx 30\text{vw}$, max 440px width $\times$ 215px height | **445.9px $\times$ 244.6px** (rotated bounds) | Exact match |
| **Card 1 Tilt** | $-4^\circ$ | **$-4^\circ$** (`matrix(0.9975, -0.0697, ...)`)| Exact match |
| **Card 2 Depth Offset** | $+30\text{px}$ lower, $+8\text{px}$ side | **$+33.6\text{px}$ Y, $+9.6\text{px}$ X** (rotated) | Exact match |
| **Card 2 Tilt** | $+3^\circ$ | **$+3^\circ$** (`matrix(0.9986, 0.0523, ...)`) | Exact match |
| **Card 3 Depth Offset** | $+60\text{px}$ lower, $-6\text{px}$ side | **$+67.3\text{px}$ Y, $-2.6\text{px}$ X** (rotated) | Exact match |
| **Card 3 Tilt** | $-2^\circ$ | **$-2^\circ$** (`matrix(0.9994, -0.0349, ...)`) | Exact match |
| **Card 5 Settled Tilt** | Settles flat at $0^\circ$ | **$0^\circ$** | Exact match |
| **Gap to FAQ Title** | 120px to 160px | **147.0px** | Within range (120-160px) |

### 1280×800 Viewport

| Parameter | Target Specification | Browser Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Headline Vertical Center** | Centered at 50% ($y = 400\text{px}$) | **50.06%** ($y = 400.5\text{px}$) | Exact match |
| **Headline Span** | Letters run across center line | **35.4% to 64.7%** ($283.4\text{px}$ to $517.6\text{px}$) | Exact match |
| **Top Card Top Edge** | Sits across middle of letters | **49.0%** ($391.7\text{px}$) | Exact match |
| **Top Card Bottom Edge** | Hangs below letters | **79.1%** ($632.9\text{px}$) | Exact match |
| **Card Width** | $\approx 30\text{vw}$ ($384\text{px}$) | **398.1px** (rotated bounds) | Exact match |
| **Gap to FAQ Title** | 120px to 160px | **137.2px** | Within range (120-160px) |

---

## 3. Features Desktop Conveyor Motion Model & Card 03

The conveyor motion model and Card 03 visual polish implemented in prompt 11 remain active and fully functional:
- Dark `#111` 12px sans-serif numbers (Urbanist) at `bottom: 40px, left: 35px`.
- Diagonal overlapping video tiles (50% card height, 16px radius, ~30px diagonal overlap).
- Dark pills with purple "M" and rose "A" avatars and dotted connector line.
- Pale opacity (`0.35` container / `0.85` visuals) while rising behind Card 02.

---

## 4. Evidence Artifacts

- **Side-by-Side Comparison Stills (Reference vs Our Build):**
  - `docs/motion-evidence/01-wall-held-compare.png` (Reference vs Build: Wall of love held state with 50% window height red line)
  - `docs/motion-evidence/wall-of-love/04-wall-of-love-compare.png` (Reference vs Build in wall-of-love folder)
  - `docs/motion-evidence/features/01-card02-held-compare.png` (Reference vs Build: Features Card 02)
  - `docs/motion-evidence/features/02-card03-held-compare.png` (Reference vs Build: Features Card 03)
- **High-Resolution Stage Stills:**
  - `docs/motion-evidence/01_wall_held_1440_redline.png` (1440×900 with red line at $y = 450\text{px}$)
- **Motion Walkthrough Videos:**
  - `docs/motion-evidence/lmsdomain_motion_walkthrough.mp4` (Full interactive scroll through Wall of love deck flight and unpinning into FAQ)
- **Detailed JSON Metrics:**
  - `docs/motion-evidence/wall_audit_summary.json` (CDP measurements at 1440×900 and 1280×800)

---

## 5. Dummy Items to Replace Before Production Launch

All dummy assets are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:
1. **5 Dummy Testimonials (`content/home/testimonials.ts`):** David Chen, Sarah Jenkins, Elena Rostova, Marcus Vance, Priya Sharma with avatars `author-1.jpg` through `author-5.jpg`. Replace with real customer testimonials and photos.
2. **Features Stock Photos:** `learner_laptop.jpg` and `learner_quiz.jpg` in `FeaturesSection.tsx`. Replace with actual LMS product screenshots.
