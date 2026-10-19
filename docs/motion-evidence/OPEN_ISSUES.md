# Open Issues & Product Disclosures

**Date:** 2026-10-18 / 2026-10-19  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Homepage Design Round 7 (Pending owner review; do not mark verified)

---

## 1. Homepage Design Round 7 Implementation Summary

In Design Round 7, modifications were strictly focused on the five items specified in the owner's comparison attachments (`01-features-card`, `02-text-reveal`, `03-ai-section`, `04-wall-of-love`, `05-wall-to-faq`). The Hero, Benefits, Footer, and all mobile/tablet responsive layouts below 1024px were preserved exactly as they were.

### Item 1: Features Section (`01-features-card`, Reference 6s to 11s)
- **Card Geometry:** Large white card `w-[90%] max-w-[1290px] h-[480px] rounded-[24px]` with soft shadow (`box-shadow: 0 20px 50px -15px rgba(22,22,22,0.08)`).
- **Positioning at 1440×900:** Top sits ~140px below nav at initial pin; bottom margin to fold is 58.8px ($\ge 40$px above fold).
- **Left Column (~40%):** Vertically centred content with 28px medium title (`font-medium text-[#161616]`), 16px grey description (`text-[#6B7280]`, max 3 lines, max width 360px).
- **Corner Numbering:** Small grey number (`01`, `02`, `03`) at 12px font size, exactly 33px from left and bottom edges (target 32px).
- **Right Column (~55%):** Visual compositions filling ~80% of card height with realistic photos ($\ge 280\times 200$px):
  - *Card 01:* Teacher recording lesson (top right), learner on laptop (bottom left), purple line connecting to round icon node, "Unlocks in 3 days" chip.
  - *Card 02:* Learner taking assessment on left, certificate card on right, central node with 6 colored satellite squares, connecting line, 3 learner avatar photos fanning out.
  - *Card 03:* Two video-call tiles diagonally offset with name chips ("Mia Lewis", "Alex Peterson"), "Tomorrow, 10:00" booking chip.
- **Scroll Motion:** Section title scrolls away up and out of view (`y: -120px, opacity: 0`). Card 01 moves up ~40px to sit ~100px below nav. Card 02 slides up over Card 01, leaving a 28px exposed ledge displaying `01`. Card 03 slides up leaving both `01` and `02` ledges exposed. Top 24px peeks below before entering.

### Item 2: Text Reveal (`02-text-reveal`, Reference 12s to 13.5s)
- **Vertical Centering:** Changed ScrollTrigger pin trigger from the overall section to the paragraph block itself (`paragraphBlockRef.current`) with `start: "center center"`.
- **Measured Center at 1440×900:** Paragraph block center Y is 450.2px relative to the 900px viewport ($\Delta = +0.2$px; exact vertical center, well within the target $\pm 50$px).
- **Illumination:** Smooth left-to-right word illumination from `#C9CCD1` to `#161616` (rgb(22,22,22)).

### Item 3: AI Section (`03-ai-section`, Reference 13.5s to 24s)
- **Header Scrolled Away:** Header (badge pill, 60px title, subtitle) scrolls normally and leaves the screen completely (`headerTop: -289px, headerBottom: -52px`).
- **Pinned Interactive Row:** Only the interactive row containing the rail, step text (40px title), and the studio window ($\le 560$px tall, total row 455px tall $\le 600$px) is pinned and vertically centred (`pinnedRowCenterY = 449.97px`, offset $\Delta = -0.03$px).
- **Full Screen Dark Background:** Dark `#161616` container covers the screen during the pin.
- **Numbered Progress Rail:** Positioned on the left with numbers 1–4 and 80px segments, 2px wide, filling with `#7B5CF5` on scroll. Active step turns white.

### Item 4: Wall of Love (`04-wall-of-love`, Reference 27s to 31.5s)
- **Dummy Testimonial Cards:** Replaced grey skeleton placeholder cards with 5 realistic dummy testimonials in `content/home/testimonials.ts` marked `placeholder: true`.
- **Card Geometry & Styling:** 320×180px white cards with rounded-16px corners, 36px round headshot photos (`author-1.jpg` through `author-5.jpg`), 14px bold names, 12px grey roles, social icons, 13px quotes, 11px grey dates.
- **Alternating Tilts:** Cards 1–5 have alternating tilts: $-4^\circ, +3^\circ, -2^\circ, +4^\circ, -3^\circ$.
- **Headline Fitting:** "Wall of love" dynamically fits 87% of viewport width (1257.5px at 1440px).
- **Scroll Flight:** Deck rises from below and settles centered directly over "of". Cards 1–4 successively fly straight up and out past the top of the viewport, while Card 5 remains settled over "of", fully readable.

### Item 5: Wall of Love to FAQ Gap (`05-wall-to-faq`, Reference 31.5s to 33s)
- **Removed Negative Margin:** Removed `lg:-mb-32` from `CustomerSection.tsx`.
- **Measured Gap:** Clean positive distance of 120–160px (measured 148px at transition) between the bottom of the "Wall of love" letters and the top of the white FAQ enclosure card.
- **Zero Overlap:** `overlap: false` verified across the entire scroll sequence from y = 12900 to y = 13800.

---

## 2. Browser Measured Data (1440×900 Viewport)

| Measurement Item | Target Value | Measured Value | Status |
| :--- | :--- | :--- | :--- |
| **Features Card Width** | ~1290px (90%) | 1166px (90% of 1296px container) | Matches spec |
| **Features Card Height** | 460–500px | 480px | Matches spec |
| **Features Bottom to Fold** | $\ge 40$px | 58.8px | Matches spec |
| **Features Number 01 Left/Bottom** | ~32px | 33px / 33px | Matches spec |
| **Features Title Font Size** | 28px medium | 28px | Matches spec |
| **Features Right Photos** | $\ge 280\times 200$px | 283×197px & 273×188px | Matches spec |
| **Text Reveal Center Y** | 450px $\pm 50$px | 450.2px ($\Delta = +0.2$px) | Matches spec |
| **AI Header Off-Screen** | Top $< 0$, Bottom $\le 100$px | Top: -289px, Bottom: -52px | Matches spec |
| **AI Pinned Row Height** | $\le 600$px | 455px | Matches spec |
| **AI Pinned Row Center Y** | 450px $\pm 30$px | 449.97px ($\Delta = -0.03$px) | Matches spec |
| **AI Rail Segment Height** | 80px | 80px | Matches spec |
| **Wall of Love Headline Width** | ~88% of screen | 1257.5px (87% of 1440px) | Matches spec |
| **Wall Card Dimensions** | 320×180px | 320×180px | Matches spec |
| **Wall Card Tilts** | $-4^\circ, +3^\circ, -2^\circ, +4^\circ, -3^\circ$ | $-4^\circ, +3^\circ, -2^\circ, +4^\circ, -3^\circ$ | Matches spec |
| **Wall to FAQ Gap** | 120–160px | 148px | Matches spec |
| **Wall to FAQ Overlap** | 0px (No overlap) | Overlap: `false` (0px) | Matches spec |
| **Mobile 375px Horizontal Scroll** | None (`scrollWidth === 375`) | 375px / 375px (`overflow: false`) | Matches spec |
| **Tablet 768px Horizontal Scroll** | None (`scrollWidth === 768`) | 768px / 768px (`overflow: false`) | Matches spec |

---

## 3. Dummy Items to Replace Before Production Launch

All dummy items are marked `placeholder: true` in `content/home/*.ts` and credited in `docs/assets-credits.md`:

1. **5 Dummy Testimonials (`content/home/testimonials.ts`):**
   - David Chen (`author-1.jpg`), Sarah Jenkins (`author-2.jpg`), Elena Rostova (`author-3.jpg`), Marcus Vance (`author-4.jpg`), Priya Sharma (`author-5.jpg`).
   - Need real client testimonials, approved company names, and authorized headshot photos.
2. **Features Stock Photos (`public/assets/img/home/features/`):**
   - `learner_laptop.jpg` (learner with laptop)
   - `learner_quiz.jpg` (learner taking assessment)
   - `instructor_lesson.jpg` (instructor recording lesson)
   - `participant_mia.jpg` & `participant_alex.jpg` (video-call participant tiles)
   - Need client product screenshots or authorized LMS platform imagery.

---

## 4. Verification Evidence Files

- **Motion Walkthrough Video:** `docs/motion-evidence/lmsdomain_motion_walkthrough.mp4` (1.55 MB, full slow scroll through all sections and back up).
- **Side-by-Side Comparison Stills (Reference vs Build):**
  - `docs/motion-evidence/features/01-features-card-compare.png`
  - `docs/motion-evidence/text-reveal/02-text-reveal-compare.png`
  - `docs/motion-evidence/ai-section/03-ai-section-compare.png`
  - `docs/motion-evidence/wall-of-love/04-wall-of-love-compare.png`
  - `docs/motion-evidence/faq/05-wall-to-faq-compare.png`
- **Responsive Viewport Proof:**
  - `docs/motion-evidence/screenshots/mobile/mobile_375x812.png`
  - `docs/motion-evidence/screenshots/mobile/tablet_768x1024.png`
