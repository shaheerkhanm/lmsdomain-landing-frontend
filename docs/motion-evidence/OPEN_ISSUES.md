# Open Issues & Product Disclosures

**Date:** 2026-10-18  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Homepage Design Round 6 (Pending owner review; do not mark verified)

---

## 1. Homepage Design Round 6 Implementation Summary

In Design Round 6, modifications were strictly restricted to the three requested sections (**Features**, **AI Section**, and **Wall of Love**). The Hero, Text Reveal, Benefits, FAQ, Footer, and all mobile layouts below 1024px were preserved without changes.

### Section 1: Features Section (Reference 6s to 11s)
- **Card Geometry & Styling:** One clean white card per step (`w-[90%] max-w-[1240px] h-[540px] rounded-[24px] bg-white border border-[#ECEDEF] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]`).
- **Left Column:** Clean title (~22–24px medium weight) and 1–2 lines of grey description (`text-[#6B7280]`). Removed the previous "01 COURSE MANAGEMENT" header bar, divider line, and 4 bullet pills.
- **Card Numbering & Ledges:** Small grey numbers (`01`, `02`, `03`) sit in the bottom-left corner of each card. Top ledge strips retain `01` and `02` exposed as stepped tabs when stacked.
- **Scroll Motion (Desktop ≥1024px):** Section title scrolls away normally. Card 01 pins 120px below nav. Card 02 peeks 28px below, then slides up to `y: 28px` over Card 01 (text opacity 35% → 100% on settle). Card 03 slides up to `y: 56px`, leaving both `01` and `02` ledges stacked above it. Section unpins and scrolls away as one block.
- **Image Motion:**
  - *Card 01:* Lesson video player (`instructor_lesson.jpg`) and Module outline card start ~60px apart and slide together to overlap. A 1px `#7B5CF5` line draws to the lock icon, then "Unlocks in 3 days" chip pops in.
  - *Card 02:* Quiz card on left, central node with 6 colored satellite squares, connecting line draws, and certificate card fans out into 3 stacked layers.
  - *Card 03:* Two live-class video tiles (Mia Lewis and Alex Peterson) slide in sequentially (Alex 0.15 later), name chips pop in, followed by "Tomorrow, 10:00" booking chip.
- **Mobile (<1024px):** Stacked vertical flow preserved with visuals below text.

### Section 2: AI Section (Reference 13.5s to 24s)
- **Numbered Progress Rail:** Positioned on the left (~6% from the left edge at 1440px). Numbers 1, 2, 3, 4 stacked vertically with 2px connecting lines. Each line segment fills with `#7B5CF5` from top to bottom on scroll. Completed segments remain filled. Active/completed numbers are white (`#FFFFFF`), upcoming numbers are grey (`#6B7280`).
- **Text Column:** Positioned right of the rail. Only the active step's text is visible (`✦ AI ADD-ON`, ~48px title, description). On step transitions, outgoing text moves up 40px and fades out while incoming text rises 40px from below and fades in.
- **Studio Window:** Active tabs and tool panels (Tutor typing, Content drafting, Analytics alerts, Command bar) update synchronously with scroll progress.
- **Scroll Motion:** Pinned scroll-scrubbed timeline across 4 steps on desktop (≥1024px). Unpinned horizontal tabs flow preserved below 1024px.

### Section 3: Wall of Love (Reference 27s to 31.5s)
- **Zero Fake Claims / Placeholder Cards:** Reads directly from `content/home/testimonials.ts`. Until real client quotes are provided, each entry has `placeholder: true`, rendering 3 grey skeleton quote lines, a grey avatar circle, "Customer name", and "Role, Academy" without fake dates or "VERIFIED" badges. Real quotes display automatically when populated in content.
- **Card Geometry & Deck:** White cards (~300×170px, radius 16px, soft shadow, social icon). 5 cards stacked directly over "of" with alternating tilts: −4°, +3°, −2°, +4°, −3°.
- **Flight Motion (Desktop ≥1024px):** "Wall of love" transitions grey → black as section reaches center. Deck rises from below and settles centered over "of". On scroll, Cards 1 through 4 successively fly straight up and out past the top of the viewport (`y: -110vh`), revealing the card below. Card 5 remains settled over "of" at 0°. Pin releases into FAQ maintaining the ~120px gap.
- **Mobile (<1024px):** All 5 placeholder cards stacked below the headline.

---

## 2. Verification & Evidence Artifacts

- **Screen Walkthrough Video:** `lmsdomain_motion_walkthrough.mp4` (1.28 MB) recorded at 1440×900, scrolling slowly down through Features, AI Section, and Wall of love, then back up.
- **Side-by-Side Comparison Stills (Reference vs Build):**
  - Features Card 02 Halfway: `features_compare_card02_halfway.png`
  - AI Section Rail Step 2: `ai_compare_rail_step2.png`
  - Wall of Love Deck over "of": `wall_compare_deck_over_of.png`
  - Wall of Love Card Flight: `wall_compare_card_flight.png`
- **Mobile & Tablet Full-Page Screenshots:**
  - Mobile 375×812: `homepage_375.png` (scrollWidth = 375px, zero sideways scroll)
  - Tablet 768×1024: `homepage_768.png` (scrollWidth = 768px, zero sideways scroll)

---

## 3. What We Need From the Owner

1. **Authorized Customer Testimonials:** Real client quotes, names, avatars, and approval to replace the neutral placeholder skeleton cards in `content/home/testimonials.ts`.
2. **Rev-share terms (if applicable):** Percentage and payout schedule for the pricing tier cards.
3. **Dedicated Secondary Pages Confirmation:** Approval to begin secondary pages (Features, Pricing, About, Contact, Login) once the homepage design is finalized.
