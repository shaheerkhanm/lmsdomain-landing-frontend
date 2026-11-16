# LMS Domain: Motion Reconstruction Specification

**Status:** specification only. Nothing in this document has been implemented or tested by its author.
**Target repository / branch:** `lmsdomain-landing-frontend` on `feature/redesign-v2` (no production deploys).
**Stack to keep:** Next.js 15.5.28, React 19, TypeScript, Tailwind CSS 4, GSAP (+ ScrollTrigger), Motion, Lenis, Docker, Nginx.

---

## 1. Executive summary

The reference (Mota landing page recording) gets its feel from **eight motion sequences**. The current LMS Domain build has the right section order and largely the right content. Five of the eight sequences are **missing or reproduce a different behavior**, and the typography and scale differ enough that even static frames read differently.

| # | Reference sequence | Current build (observed in the 60 s local recording) | Verdict |
|---|---|---|---|
| 1 | Rotating highlighted word, ~1 s per word, color wipe left→right | Word changes roughly every 3–4 s with an instant swap; no wipe was visible at 6 fps | **Inaccurate** |
| 2 | Floating, oversized, tilted hero cards converge into a black device frame on scroll | Dashboard is already assembled inside the frame on load; cards have only a slight tilt | **Missing** (core "wow" moment) |
| 3 | Nav: centered logo nav fades out → pill nav builds itself (button grows from a small square, links fade in) | Full-width nav crossfades into a pill; wordmark stays in the pill | **Inaccurate** |
| 4 | Feature cards: front card scrolls away upward, revealing the next card that sits *behind and below* it, faded/blurred until it becomes active | Cards scroll as separate blocks with gaps; no reveal-from-behind, no fade/blur hand-off; cards are about half the reference height | **Missing** |
| 5 | Paragraph words go from light gray to near-black progressively while scrolling | Paragraph is fully dark the whole time | **Missing / broken** |
| 6 | Product showcase: one title visible at a time on the left; tab click swaps panels; folder flies into dropzone, then SVG ring 0→100 %, then "Complete!" | Tabs, ring and panels exist and work on click. The left column shows all three titles stacked at once, and there is no folder fly-in or dropzone drag-over state | **Partially accurate** |
| 7 | Benefits: 3 cards in a row; on scroll they enlarge, tilt as a group, collapse into one stack, rotate and shrink to nothing | Single-card "Click to cycle benefits" deck (4 cards) | **Different behavior** (the reference is not click-to-cycle) |
| 8 | Wall of love: giant near-black "Wall of love" scales up behind; scroll-driven deck where the top card flies up and away to reveal the next | "Wall of love" is ~10 % opacity; single-card "Click card to peel away" | **Different behavior** |
| 9 | FAQ: one large white card, accordion | Present and close to the reference; accordion works | **Accurate** (minor tuning) |

A correction to my own earlier file (`antigravity-section-prompts.md`): it described the feature cards as "sticky cards that slide up and cover the previous one" and the showcase as "scroll-pinned 3 steps". The frame-by-frame analysis below shows the reference does **the opposite stacking direction** (the front card leaves upward and reveals the card behind it). It also shows the showcase steps being changed **by tab clicks** in the recording. This spec supersedes that file wherever they disagree.

---

## 2. Source-video analysis and limitations

### 2.1 Files analyzed

| Label | File | Specs | What it shows |
|---|---|---|---|
| **REF** | `Screen Recording 2026-10-17 at 9.18.09 PM.mov` (project files) / its transcode `uploads/hearth/99b0e784…` | 35.4 s, 1600×1200 transcode at 30 fps, Safari, `mota.io` | The Mota reference, scrolled once top→bottom, then jumps back to top |
| **CUR** | `Screen Recording 2026-10-18 at 12.46.48 AM.mov` (project files) | 60.36 s, 2940×1912 at 60 fps (Retina, ≈1470×956 CSS px viewport), Chrome, `127.0.0.1` | The current LMS Domain build: scroll top→bottom, a reverse scroll back to the showcase at ~30 s, tab clicks, deck clicks, FAQ clicks, the "Request Demo" modal |

Note: the `.mp4` transcode attached to the second request (`uploads/hearth/f4823ceb…`) is byte-identical to the first reference transcode, so it is **not** the current build. CUR was analyzed directly from the `.mov` in the project files.

### 2.2 Method

- REF was sampled at 4 fps for the whole video and at 10 fps for 2.4–4.0 s (nav and dashboard). Key frames were inspected at full resolution.
- CUR was sampled at 2 fps for the whole video, 6 fps for 2.8–4.8 s (nav and word swap) and 2 fps for 10–17 s (features).
- All frames are saved in `landing-prompts/motion-frames/`:
  - `reference/ref_<seconds>s.jpg` (63 frames, cropped to the page area ≈1440×900)
  - `current-build/cur_<seconds>s.jpg` (26 frames)

### 2.3 Limitations (read before trusting any number)

1. **Timestamps are not scroll distances.** Both recordings were scrolled by hand with momentum (Lenis-style smoothing in both). A transition that takes "0.6 s" in the video took 0.6 s *at that person's scroll speed*. All durations for **scroll-linked** motion are therefore given as **scroll-distance estimates in viewport heights (vh)**, inferred from how far other content moved in the same frames. Treat them as estimates.
2. **Time-based durations** (word swap, progress ring, crossfades) are measured from frames and accurate to about ±0.1 s (REF at 4 fps) or ±0.05 s (REF nav at 10 fps).
3. **Reverse scrolling is not demonstrated in REF.** At 34.25 s REF jumps back to the top (likely a page reload or "scroll to top"), so reverse behavior is **not observed** and the reverse expectations below are **inferred**. CUR does demonstrate one reverse scroll (≈30–31 s).
4. **Hover states are barely visible in REF.** The cursor appears only in the showcase (≈14–23 s). No hover effects on cards or buttons can be confirmed.
5. **Pinning vs. user pausing.** In the showcase (15.25–22.5 s) the page does not move. The person stopped scrolling and clicked tabs. The recording **cannot prove** whether that section is pinned. Where pinning is clearly visible (content held fixed while the scroll obviously continued), it is marked **Observed**. Otherwise it is marked **Inferred** or **Unknown**.
6. **Easing curves cannot be measured** precisely at 4 fps. Where a motion visibly decelerates into place, it is described as "ease-out". Exact curves are recommendations, labeled as such.
7. **Viewport.** REF page area is about 1440 CSS px wide (estimate from the crop; Safari chrome excluded). CUR is about 1470×956 CSS px. Use **1440×900** for all comparisons (§8).
8. **Fonts and assets.** REF uses a geometric sans (Gilroy-like). CUR uses an Inter-like grotesk. This is a visual-fidelity issue, not a motion issue, but it changes how every frame reads (§6.1).

Legend used below: **[O]** = directly observed in frames; **[I]** = inferred implementation detail; **[E]** = estimate.

---

## 3. Section-by-section reference breakdown (REF)

### S1. Hero idle state: 0.00 – 2.50 s
- **Purpose:** headline, rotating keyword, CTA, preview of the product as "exploded" UI cards.
- **Initial state [O]:**
  - Nav state A: four gray links around a centered 48 px black rounded-square logo ("Features", "Extension", [logo], "Benefits", "FAQ"). There is no nav background.
  - H1 is two lines, centered, ≈64 px near-black, weight ≈500–600: "Meet all-in-one platform / to [word]".
  - Subtitle is two lines of ≈19 px gray.
  - CTA is a black button, ≈48 px tall, radius ≈12 px.
  - Below the CTA, four white UI cards sit **outside and over** a black device frame. Only the frame's top edge and its interior (a pale gray with a faint dot grid) show between them.
- **Motion [O]:**
  - The keyword cycles "connect → transfer → contact" (A01).
  - The cards drift by a few pixels between frames while the page is not scrolling. [I] This is a slow idle float or cursor parallax; the amplitude is small (≈2–6 px).
- **Layering [O]:** cards are above the frame. The frame is behind the cards and below the CTA.
- **Backgrounds [O]:** page #FFFFFF.

### S2. Hero → dashboard assembly and nav transformation: 2.50 – 4.00 s
- **Initial state [O]:** as S1.
- **Final state [O] (3.5–4.0 s):**
  - The black frame (radius ≈28 px, bezel ≈16 px, left icon rail ≈64 px) holds a "Home" header, a search field, a black "Start Meeting" button and an avatar, plus four cards in a 2×2 grid, all axis-aligned.
  - Nav state B: a white pill (radius ≈18 px, soft shadow) centered at the top, containing "Features · Benefits · FAQ · Contact us" and a black "Join the waitlist" button.
- **What moves [O]:**
  - The headline, subtitle and CTA scroll up **under** the state-A nav (at 2.9 s the headline overlaps the nav links). So the state-A nav is fixed or sticky and does not scroll with the hero.
  - The cards translate inward and down, scale down and lose their tilt, settling into the grid (A05).
  - The frame grows from ≈69 % to ≈81 % of the viewport width (≈1.17×) [E].
  - The nav changes in two steps (A03 and A04).
- **Scroll vs. time:** the cards are **scroll-linked** [I]. Their positions change only while the page moves, and the motion is proportional to scroll. The nav B assembly looks **time-based once triggered** [I], because it completes in ≈0.6 s with a consistent cadence.
- **Pinning:** **Unknown/Inferred.** The assembly completes within roughly 0.6–0.8 vh of scroll [E] while the frame keeps moving upward, so the section is either not pinned or pinned for a very short distance. Reproduce it as a short, scroll-scrubbed timeline without a long pin (A05).

### S3. Dashboard exit and background change: 4.00 – 5.50 s
- **[O]** The assembled dashboard scrolls up normally. Below it the background switches from white to light gray (#F3F4F6 [E]) at a hard edge, with no gradient. The features eyebrow ("✦ FEATURES", small, purple) and the H2 ("All must-have remote / features in 1 place", ≈44 px, two lines) enter with normal scroll.

### S4. Feature cards: 5.50 – 11.25 s
- **Card geometry [O]:**
  - White, ≈1280 px wide (≈89 vw), ≈615 px tall (≈68 vh), radius ≈40 px, very soft shadow.
  - Left column: title ≈30 px near-black and description ≈19 px gray (line-height ≈32 px), vertically centered.
  - Right ≈55 %: an illustration composition.
  - Index "01"/"02"/"03" (≈15 px, near-black) sits in the bottom-left corner.
- **Stacking [O]:**
  - The **next card sits behind the current one** (lower z-index), offset downward so that ≈130–180 px of its lower part, including its index number, shows below the front card's bottom edge.
  - The behind card's contents are **faded and slightly blurred** (07.75 s: card 02 text ≈20 % opacity, illustration washed out).
  - As the person scrolls, the **front card moves up at full scroll speed and leaves the viewport upward**.
  - The card behind moves up **much more slowly**: between 07.75 s and 08.00 s card 01 moved ≈350 px while card 02 moved ≈48 px. It reaches the front position and its contents sharpen to full opacity.
  - The following card (03) is then visible peeking below it (08.75 s, 09.25 s).
- **Inner animations [O]:**
  - Card 01: the second photo enters from smaller to full size (5.75 → 6.00 s), and the text goes from faded to dark. A thin dotted connector line from the logo badge to the photo group is visible (07.75 s); it is partially drawn at 6.75 s [O] and completed by 7.75 s.
  - Card 02: concentric thin circles around a center folder tile, with four pastel file-type tiles placed on the circles. A purple line grows from the left photo toward the center (08.75 s: short; 09.25 s: longer, with a dotted tail). The single right photo becomes a cluster of three overlapping photos between 08.75 s and 09.25 s.
  - Card 03: two video tiles, with black name chips ("Mia Lewis" with a purple "M" avatar, "Alex Peterson" with a pink "A" avatar) connected to the tiles by thin rounded-corner lines.
- **Pinning [I]:** the whole stack behaves like a pinned sequence (the behind card is nearly stationary while the front card scrolls away) and releases after card 03.

### S5. Text illumination: 11.25 – 13.75 s
- **[O]** The background returns to white with a hard edge.
  - A centered paragraph (≈44 px [E], weight ≈500, line-height ≈1.3, ≈9 lines, max width ≈820 px) starts entirely light gray (≈#C9CCD1 [E]).
  - Words turn near-black in reading order as the page scrolls: 12.00 s has 1 line dark, 12.75 s has 2 lines, 13.00 s has 3 lines.
  - The paragraph drifts upward slowly while illuminating (it moves ≈45 px between 12.0 and 12.75 s), then scrolls away normally (13.25 s →) before it is fully illuminated.
- **Pinning [I]:** slowed or partially pinned. The text keeps moving a little, so it is not hard-pinned.

### S6. Product (extension) showcase: 13.75 – 23.25 s
- **Layout [O]:**
  - Far left: a vertical rail with "1", "2", "3" and thin 1 px gray connecting lines. The segment under the active number is purple.
  - Left column: eyebrow "✦ EXTENSION" (purple), title ≈48 px two lines, description ≈17 px gray. **Only the active step's text is fully visible.**
  - Right: an app window ≈480 px wide (radius ≈24 px, shadow) with a light-gray header containing the logo and wordmark. A segmented tab control follows: "Remote Control | Transfer Files | Start Meeting", with the active tab as a white pill.
- **Step change trigger [O]:** in this recording, a **click on a tab** (the cursor sits on "Transfer Files" at 15.5 s; the page is not moving from 15.25 to 22.5 s). Whether scrolling also advances steps is **Unknown**.
- **Step change visuals [O] (15.5–16.25 s and 22.5–23.0 s):**
  - The left text column moves **up** as a whole. The old title and paragraph slide up and fade to ≈20 %, and the new ones rise from below and become dark. Roughly 0.5 s [E].
  - The rail fill moves to the next number.
  - The tab pill slides to the clicked tab.
- **Transfer Files sequence [O] (time-based after the click):**

  | Time | State |
  |---|---|
  | 15.75 s | "Send files to anyone" plus a small gray dropzone with two lines of placeholder text |
  | 16.75 s | A blue folder icon with a small label enters from the window's right edge |
  | 17.25 s | The dropzone turns lavender (drag-over state) and the folder is inside it; a small "+" cursor badge is visible |
  | 18.00 s | The folder fades/drops at the center and the dropzone fades |
  | 18.25 s | An SVG ring appears at 3 % |
  | 18.25–20.25 s | The ring and center number count 3 → 11 → 27 → 43 → 62 → 78 → 92 → 99 → 100 % (≈2.0 s, roughly linear with a slight ease-out at the end) |

  Below the ring: two small label/value pairs and a secondary "Cancel" button.
  - 20.75 s: the ring is replaced by a blue folder icon. "Complete!", a copy-link field and a black "Send another?" button fade in (≈0.25–0.5 s).
- **Start Meeting sequence [O]:** a glossy 3D illustration **scales up from small** (23.0 s ≈40 % → 23.5 s 100 %, ease-out). Then the heading "You are in one click from the world!", a black "Start new meeting" button with an icon, and an "Enter meeting code" input.

### S7. Benefits: 24.25 – 26.75 s
- **Entrance [O]:**
  - The background is light gray.
  - Eyebrow "✦ BENEFITS" and H2 "Always sync yourself / with Product Name" (two lines) fade from gray to dark (24.50 → 24.75 s).
  - Three white cards (≈300 px wide, ≈ square, radius ≈28 px, faint grid pattern inside, large glossy 3D icon on top, centered title and three-line description) rise from below in a row with small individual offsets and tilts (25.0–25.25 s).
- **Exit (scroll-linked, [O] sequence; pinning [I]):**

  | Time | State |
  |---|---|
  | 25.50 s | Cards enlarge (≈1.25×) and the whole row rotates clockwise ≈5°. Cards start overlapping. |
  | 25.75 s | Row rotation ≈10°, cards ≈400 px wide and overlapping. Z-order: right card on top, then middle, then left. |
  | 26.00–26.25 s | The row keeps rotating (≈40° at 26.25 s) while the cards slide toward one another into a tight diagonal stack, still enlarged. |
  | 26.50 s | Cards fully stacked (three edges visible) and rotated further, so text reads vertically. |
  | 26.75 s | The stack has shrunk to a small card at center and fades out. |

  The heading scrolls away at ≈25.75 s while the cards stay centered, which indicates pinning [I].

### S8. Wall of love: 27.00 – 31.50 s
- **Text entrance [O]:**
  - "Wall of love" sits centered on gray and grows from small, light gray (27.00 s, ≈20 % width) to near-full-width near-black (27.75 s, ≈88 vw, glyph height ≈170 px at 1440 px).
  - It stays at the same vertical position from 27.75 to 31.25 s while scrolling continues, so it is pinned [O].
- **Deck [O]:**
  - Testimonial cards (≈420 px wide, radius ≈24 px, white, shadow) form a stack **over** the text: avatar, name, role, social icon (X/Twitter, Facebook, LinkedIn), quote, date.
  - Cards in the stack have alternating small rotations [E]: front ≈−5°, next ≈+6°, next ≈−3°.
  - The first card rises from below the viewport into the deck (27.50–28.00 s).
  - On further scroll, **the front card translates upward out of the viewport** (28.75 s: ≈200 px above the deck; 29.0 s: at the top edge), revealing the next card.
  - This repeats for each card. The **last card ("Alex") ends at 0° rotation** (30.75 s).
  - At 31.5 s the whole section, text included, scrolls away.

### S9. FAQ: 31.50 – 34.00 s
- **[O]**
  - A single wide white card (≈88 vw, radius ≈32 px) on gray rises into view.
  - Left: "You ask – we answer." (≈30 px) and a gray subtitle. These are gray at 32.0 s and dark by 32.5 s.
  - Right: five questions separated by thin dividers, each with a small chevron. The rows fade in top-to-bottom; at 32.25 s the fifth row is still faint.
  - No row is opened in REF, so accordion motion is **not observed**.

### S10. Loop / page load: 34.25 – 35.40 s
- **[O]** The screen briefly shows gray, then the hero reappears at the top. The hero text and cards fade in from ≈50 % to full opacity (34.5 → 34.75 s), and the nav A logo is faded at 34.5 s. [I] This is a page-load entrance (hero content fades/rises in ≈0.4–0.6 s). REF has **no footer**.

---

## 4. Timestamped animation inventory

Priority: **P0** = defines the reference's identity and is currently missing or wrong. **P1** = visible fidelity gap. **P2** = polish.
Scroll distances are in viewport heights (vh) and are **estimates [E]**.

| ID | Section | REF time | Animated elements | Trigger | Initial state | Intermediate states | Final state | Transform / opacity changes | Sticky / pin | Timing / easing estimate | Reverse-scroll expectation | Priority | Verification |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A01 | Hero | 0.00–2.75 | Keyword pill and its letters | Time loop | Word 1 on pill color 1 | New color sweeps left→right over the old pill; letters change as the sweep passes; pill width morphs | Word 2 on color 2 | Pill: `clip-path inset(0 100% 0 0)` → `inset(0 0 0 0)` for the new layer; width tween; per-letter swap | None | Hold ≈0.5 s, sweep ≈0.5 s, so ≈1.0 s per word [O ±0.1 s]; ease-in-out | N/A (time-based); keeps cycling when scrolled back to top | P0 | 10 fps frame capture showing a half-swept pill (compare `ref_00.50s`, `ref_00.75s`, `ref_01.50s`) |
| A02 | Hero | 0.00–2.50 | 4 hero cards | Idle loop or pointer [I] | Exploded positions | ±2–6 px drift | Same | translate only | None | Slow (≥4 s period) [E] | N/A | P2 | Two screenshots 1 s apart with no scroll differ by ≤6 px |
| A03 | Nav | 2.90–3.45 | Nav A links and logo | Scroll position (hero CTA passing nav row) [I] | Visible, gray links, black logo | Links fade; the CTA scrolls up over the logo (3.3 s); logo ghosted (3.5 s) | Hidden | opacity 1→0 (≈0.3 s) | Nav A fixed | ≈0.3 s, ease-out | On scrolling back above the threshold, nav B disassembles and nav A fades back in | P0 | Screenshots at scrollY just before and after the threshold |
| A04 | Nav | 3.60–4.00 | Nav B pill, button, links | Same threshold, after A03 [I] | Nothing | 3.7 s: small gray rounded square right of center → 3.8 s: wider gray button, links faint → 3.9 s: full-width button, links visible | White pill, black "Join the waitlist" button, 4 links | Button: width/scale from ≈40 px square to full, color gray→black; links opacity 0→1 (stagger ≈40 ms); pill background opacity 0→1 | Fixed top, centered | ≈0.4–0.5 s total [O ±0.05 s] | Reverse order on scroll-up | P0 | 10 fps screen recording of the threshold crossing; compare to `ref_03.50s`, `ref_03.75s` |
| A05 | Hero | 2.50–3.50 | 4 cards and black frame | Scroll-scrubbed | Cards ≈1.15–1.25× scale, pushed outward past the frame edges, rotateZ ±2–3°, slight rotateX tilt; frame ≈0.85× | Cards travel inward and down; tilt reduces; frame grows | Cards in a 2×2 grid inside the frame, no rotation; frame 1× | x, y, scale, rotateZ, rotateX per card; frame scale 0.85→1 | Short or no pin [I] | ≈0.7 vh of scroll [E]; scrubbed (`scrub: 0.6–1`) | Fully reversible: scrolling up re-explodes the cards along the same path | P0 | Screenshots at scroll progress 0, 0.25, 0.5, 1.0 compared to `ref_00.00s`, `ref_03.00s`, `ref_03.25s`, `ref_03.50s` |
| A06 | Features | 4.00–5.75 | Section background, eyebrow, H2 | Normal scroll | White page | Hard edge to #F3F4F6 | Gray section | None (static edge); H2 fade-up ≈24 px [I] | None | Default reveal ≈0.6 s | Reverse: no re-hide required | P2 | Screenshot at the section boundary |
| A07 | Features | 5.50–6.00 | Card 01 text and photos | Card enters viewport | Text ≈20 % opacity; photo 2 small | Photo 2 grows; text darkens | Full opacity, full size | opacity 0.2→1; photo scale ≈0.6→1 with translate | Part of the A09 pin | ≈0.5 s or ≈0.3 vh [E]; ease-out | Reversible if scrubbed | P1 | Compare to `ref_05.75s`, `ref_06.00s` |
| A08 | Features | 6.50–7.75 | Dotted connector in card 01; purple line in card 02 | Scroll progress within the active card [I] | Not drawn | Partially drawn | Fully drawn | SVG `stroke-dashoffset` (path length → 0) | Inside pin | ≈0.3–0.5 vh [E] | Reversible (scrubbed) | P1 | Frames at 50 % and 100 % of the card's active range; compare `ref_06.75s`, `ref_07.75s`, `ref_08.75s`, `ref_09.25s` |
| A09 | Features | 7.50–11.25 | Cards 01–03 | Scroll-scrubbed, pinned | Card 01 front; card 02 behind it, offset ≈+150 px down, contents ≈20 % opacity, blur ≈4 px [E] | Front card translates up at scroll speed and leaves the viewport; card behind rises to the front position (≈150 px travel) and its contents go to 100 % / blur 0; the next card appears behind | Card 03 front; then the section un-pins | Front card y: 0 → −110 vh. Next card y: +150 px → 0; content opacity 0.2→1; filter blur 4→0 px | Section pinned for ≈1 vh per card transition [E] | Scrubbed, linear mapping to scroll; contents ease-out | Fully reversible: on scroll-up the front card comes back down from the top and covers the current card again | **P0** | Screenshots at each transition midpoint compared to `ref_07.75s`, `ref_08.00s`, `ref_08.75s`, `ref_09.25s`, `ref_09.75s` |
| A10 | Features | 8.75–9.25 | Card 02 orbit tiles and right photo cluster | Card becomes active | 1 photo on the right | Cluster of 3 photos fans in | 3 overlapping photos | scale/opacity per photo, stagger ≈80 ms [E] | Inside pin | ≈0.4 s [E] | Reversible | P2 | Compare `ref_08.75s` → `ref_09.25s` |
| A11 | Features | 9.25–9.75 | Card 03 name chips and connector lines | Card becomes active | Chips gray/faded | Chips darken | Black chips with avatars | opacity; line draw | Inside pin | ≈0.4 s [E] | Reversible | P2 | Compare `ref_09.25s`, `ref_09.75s`, `ref_11.00s` |
| A12 | Text reveal | 11.50–13.50 | Each word of the paragraph | Scroll-scrubbed | All words #C9CCD1 | Words turn #161616 in reading order | All dark (completes as the paragraph leaves) | color/opacity per word | Soft pin or slowed scroll [I] (paragraph moves ≈45 px while ≈2 lines illuminate) | ≈1.5–2 vh of scroll [E]; linear per word | Fully reversible: words return to gray in reverse order | **P0** | Screenshots at 25/50/75 % progress; count dark words (should be ≈25/50/75 % ± 1 line); compare `ref_12.00s`, `ref_12.75s`, `ref_13.25s` |
| A13 | Showcase | 15.50–16.25, 22.50–23.00 | Left text column, rail fill, tab pill | Tab click [O] | Step N text visible | Old text moves up and fades to ≈20 %; new text rises from below and reaches 100 % | Step N+1 only | Column translateY by one item height; opacity | Unknown whether pinned | ≈0.5 s, ease-in-out [E] | Clicking an earlier tab moves the column down (inverse) | **P0** | Click each tab; capture 10 fps; compare `ref_15.75s`, `ref_16.00s`, `ref_22.75s`, `ref_23.00s` |
| A14 | Showcase | 16.75–18.00 | Folder icon, dropzone | Time sequence after the "Transfer Files" step activates | Empty gray dropzone | Folder slides in from the right edge (16.75 s) → dropzone turns lavender (17.25 s) → folder centered | Folder dropped; dropzone fades | Folder x: +200 px → 0, slight rotation; dropzone background gray→lavender | Within window | ≈1.25 s total [O ±0.25 s] | Restarts when the tab is re-entered | P1 | Frames vs `ref_16.75s`, `ref_17.25s`, `ref_18.00s` |
| A15 | Showcase | 18.25–20.25 | SVG ring and number | Time, after A14 | 0 % | 11 / 27 / 43 / 62 / 78 / 92 / 99 % | 100 % | stroke-dashoffset; integer counter | Within window | ≈2.0 s [O ±0.1 s], near-linear with ease-out at the end | Restarts on re-entry | P1 | Counter values at 0.5 s intervals within ±8 % of REF |
| A16 | Showcase | 20.75–21.00 | "Complete!" state | After A15 | Ring | Ring out, folder icon in, text and button fade up | Complete state | opacity/translateY 8 px | Within window | ≈0.3–0.5 s | — | P1 | Compare `ref_20.75s`, `ref_21.00s` |
| A17 | Showcase | 23.00–23.50 | 3D meeting illustration | Step 3 activates | scale ≈0.4, opacity 0 | Growing | scale 1 | scale and opacity, ease-out (slight overshoot acceptable [I]) | Within window | ≈0.5 s | Replays on re-entry | P2 | Compare `ref_23.00s`, `ref_23.25s`, `ref_23.50s` |
| A18 | Benefits | 24.50–25.25 | H2 and three cards | Section enters | H2 gray; cards below the fold | H2 darkens; cards rise with slight per-card offsets | Row of 3, slight tilts | H2 color; cards y +80 px → 0 with stagger | No | ≈0.5 s or ≈0.3 vh | Reversible if scrubbed | P1 | Compare `ref_24.50s`, `ref_24.75s`, `ref_25.00s`, `ref_25.25s` |
| A19 | Benefits | 25.50–26.75 | Three cards as a group | Scroll-scrubbed, pinned [I] | Row, 1×, ≈0° | Scale ≈1.3×, group rotateZ 5° → 10° → 40° → ≈70°; cards slide together into a stack (z-order right on top) | Stack scales to ≈0.1 and fades to 0 | Group: rotateZ 0→≈70°, scale 1→1.3→0.1, opacity 1→0. Per card: x toward the stack center | Pinned ≈1–1.5 vh [E] | Scrubbed; scale-up phase ≈30 %, collapse ≈40 %, shrink/fade ≈30 % of progress [E] | Fully reversible: scrolling up re-grows, un-stacks and un-rotates | **P0** | Screenshots at 0, 25, 50, 75, 100 % of the pin vs `ref_25.25s`, `ref_25.75s`, `ref_26.25s`, `ref_26.50s`, `ref_26.75s` |
| A20 | Wall of love | 27.00–27.75 | Giant "Wall of love" text | Scroll-scrubbed | scale ≈0.2, color ≈#BDBDBD | Growing and darkening | ≈88 vw wide, #161616 | scale, color | Pin starts here [O] | ≈0.5–0.7 vh [E] | Reversible | **P0** | Compare `ref_27.00s`, `ref_27.25s`, `ref_27.50s`, `ref_27.75s` |
| A21 | Wall of love | 27.50–31.25 | Testimonial deck | Scroll-scrubbed, pinned [O] | Deck rises from below into the center | Front card translates up off-screen (y → −100 vh), keeping or slightly increasing its tilt; the next card becomes front | Last card front, rotation 0° | Per card: y, rotateZ | Pinned [O] (text fixed while scroll continues) | ≈0.6–0.8 vh per card [E] | Fully reversible: cards fly back down onto the deck in reverse order | **P0** | Screenshots at each card hand-off vs `ref_28.00s`, `ref_28.75s`, `ref_29.00s`, `ref_29.75s`, `ref_30.75s` |
| A22 | FAQ | 31.75–32.75 | FAQ card, heading, rows | Section enters | Card below; text gray | Card rises; heading darkens; rows fade in with stagger | Static card | y +60 px → 0; opacity; row stagger ≈60 ms | No | ≈0.6 s | Reverse: no re-hide required | P2 | Compare `ref_32.00s`, `ref_32.25s`, `ref_32.75s` |
| A23 | FAQ | not shown | Accordion row | Click | Closed | Height expands | Open | height auto (measured), chevron rotate 180° | — | ≈0.3 s ease-in-out **[I: not in REF]** | — | P2 | Open/close each row; no layout jump of the card below |
| A24 | Page load | 34.25–34.75 | Hero content, nav A | Load | ≈50 % opacity | — | 100 % | opacity (+ small translateY [I]) | — | ≈0.4–0.6 s | — | P2 | Hard reload screenshot sequence |

---

## 5. Detailed motion implementation specifications

### 5.0 Architecture rules (apply to every sequence)

1. **One owner per element property.**
   - GSAP + ScrollTrigger owns **all scroll-linked and pinned** motion (A03–A05, A08–A09, A12, A19–A21).
   - Motion owns **discrete UI state transitions** (A01 word swap, A13 tab content, A14–A17 window sequence, A23 accordion, layoutId tab pill).
   - Never let both libraries write `transform` or `opacity` on the **same DOM node**. If a Motion-animated child lives inside a GSAP-scrubbed parent, GSAP animates the wrapper and Motion animates an inner element.
2. **Lenis ↔ ScrollTrigger wiring** (one place, app root, client component):
   - `lenis.on('scroll', ScrollTrigger.update)`
   - `gsap.ticker.add((t) => lenis.raf(t * 1000))`
   - `gsap.ticker.lagSmoothing(0)`
   - No second `requestAnimationFrame` loop for Lenis.
   - Motion's `useScroll` must **not** drive any element that ScrollTrigger pins.
3. **Pins:**
   - Use `pin: true` with `pinSpacing: true` on a dedicated wrapper.
   - Never pin an element that also has a CSS `transform` from Tailwind classes.
   - Call `ScrollTrigger.refresh()` after fonts (`document.fonts.ready`) and hero images load.
4. **React 19 / Next 15:**
   - All motion components are `'use client'`.
   - Create GSAP timelines inside `useGSAP` (if `@gsap/react` is already a dependency) or inside `gsap.context()` in `useLayoutEffect` with `ctx.revert()` cleanup. Do not add new dependencies without need.
   - Guard against React Strict Mode double-mount, which creates duplicate ScrollTriggers.
5. **Responsiveness:**
   - Wrap every scroll timeline in `gsap.matchMedia()` with three contexts: `(min-width: 1024px)`, `(max-width: 1023px)` and `(prefers-reduced-motion: reduce)`.
   - Below 1024 px: no pins longer than 1 vh; feature cards and benefits stack vertically with simple reveals; the wall-of-love deck may keep its pin if it fits.
6. **Reduced motion:** render every sequence's **final state**. Specifically:
   - A01 shows the first word only, with no cycling.
   - A05 shows the assembled dashboard.
   - A09 shows the cards stacked vertically in normal flow.
   - A12 shows all words dark.
   - A19 shows the three cards in a row with no exit.
   - A21 shows the cards in a static grid or list.
   - The showcase tabs still switch, without translate.
7. **Performance:** animate only `transform`, `opacity` and (sparingly) `filter: blur` on small elements. Avoid animating `box-shadow`; pre-render shadows on pseudo-elements and fade those instead.

### 5.1 A01: Keyword wipe
- **Words (LMS):** "teach" → "certify" → "scale" (3 words, like REF). Colors: butter #F3CF74 → lavender #8E7CF8 → mint #A6E3D3 (REF order yellow → purple → mint).
- **Text color stays near-black on every pill**, as in REF. The current build uses tinted text on pale pills (purple on lavender, red-orange on peach), which reads differently.
- **Structure:** `<span class="pill">` containing two absolutely positioned layers (old and new) plus a hidden width-measuring copy.
- **Sequence (per word, ≈1.0 s):**
  1. Hold for 0.5 s.
  2. Tween the new layer's `clip-path` from `inset(0 100% 0 0 round 14px)` to `inset(0 0 0 0 round 14px)` over 0.5 s, ease-in-out.
  3. Swap the visible characters left→right in sync with the wipe front (character *i* switches when the wipe passes its x-position). REF frames show mixed words such as "tranect" and "contsfer" mid-wipe.
  4. Tween the pill width to the new word's measured width over the same 0.5 s.
- **Headline layout:** keep REF's **two-line** structure: "Meet the all-in-one platform / to [word]". The current "… to [word] at global scale" adds a third phrase and changes the rhythm. If "at global scale" must stay, move it into the subtitle.
- **Owner:** Motion (or a small GSAP time timeline; pick one).

### 5.2 A03 + A04: Navigation transformation
- **Nav A (top):**
  - Fixed and transparent. On desktop the links sit **close to the logo**, with ≈48 px gaps, as a centered group of 2 + logo + 2. They are not pushed to the far edges as in CUR.
  - Logo: use a **square icon mark** (the "D" glyph from the LMS Domain logo, white on a 48 px black rounded square), not the full wordmark, to match REF.
- **Threshold:** when the hero CTA's top crosses the nav row (`ScrollTrigger` on the CTA, `start: "top 90px"`).
- **A03:** nav A links and logo fade to 0 over 0.3 s.
- **A04 (starts ≈0.2 s after A03 begins):**
  1. The nav B button appears as a 40×40 rounded square right of center, gray (#3A3A3A at 60 %), and morphs to its full width over 0.35 s while darkening to #161616. The label fades in during the last 40 %.
  2. Links ("Features", "AI Studio", "Benefits", "FAQ", "Contact us") fade in left→right with a 40 ms stagger.
  3. The pill background and border fade in over 0.25 s.
- **Logo in nav B:** REF has **no logo** in the pill. The current build keeps the wordmark there. Keeping it is a product decision; if it is kept, fade it in last so the "button grows first" beat still reads. Default: **remove it** to match REF.
- **Reverse:** crossing back above the threshold plays B out in reverse, then A in.
- **Owner:** ScrollTrigger `onEnter` / `onLeaveBack` toggling a GSAP timeline (`timeline.play()` / `reverse()`), not scrubbed.

### 5.3 A05: Hero card convergence (P0)
- **Markup:** a black frame `div` plus four card `div`s that are **siblings of the frame, not children**, so they can sit outside its bounds at progress 0. All are absolutely positioned in a relative stage sized to the final frame.
- **Final layout (progress 1):** the 2×2 grid inside the frame, as in `ref_03.50s` and CUR's assembled dashboard. Keep the LMS card content already in CUR (Protected Video Player, Custom Domain, Curriculum Storage, Domie AI Copilot).
- **Start offsets (progress 0) at 1440 px [E]:** from `ref_00.00s` / `ref_00.50s`.

  | Card | x | y | scale | rotateZ | rotateX | Notes |
  |---|---|---|---|---|---|---|
  | Top-left | −140 px | −170 px | 1.18 | −2° | 8° | Top-left of frame, overlapping the frame's left edge |
  | Top-right | +120 px | −190 px | 1.18 | +2° | 8° | Top-right, overlapping the right edge |
  | Bottom-left | −60 px | −40 px | 1.12 | +3° | 10° | |
  | Bottom-right | +60 px | −60 px | 1.12 | −3° | 10° | |
  | Frame | | | 0.85 | | | Starts behind the cards, only its top edge visible |

  Use `transformPerspective: 1200`. The cards must overlap the space directly under the CTA, as in REF (the top cards' top edges are ≈60 px below the CTA).
- **Timeline:**
  - ScrollTrigger on the stage: `start: "top 70%"`, `end: "top 15%"`, `scrub: 0.8`. If that distance is shorter than ≈0.7 vh at 1440×900, add a short pin of ≤0.3 vh.
  - All four cards tween to `x:0, y:0, scale:1, rotateZ:0, rotateX:0`, and the frame to `scale:1`.
  - Stagger the card start positions in the timeline by ≈0.05 so they don't land at the same instant (REF: the top cards land slightly before the bottom ones).
- **Idle float (A02, P2):** apply ±4 px y float with Motion **to an inner wrapper** of each card, never to the GSAP-scrubbed outer node. Disable it once progress > 0.
- **Reverse:** scrubbed, so it reverses automatically. Verify that the cards re-explode on scroll-up.

### 5.4 A09 (+A07, A08, A10, A11): Feature cards revealed from behind (P0)
- **Geometry:** cards ≈89 vw (max 1280 px) × ≈68 vh (min 560 px, max 640 px), radius 40 px, centered.
  - CUR's cards are about half this height and are separated by gaps. Fix the size first, or the motion will not read.
- **Index label:** "01/02/03" bottom-left, 15 px, near-black, 32 px from the edges.
- **Stacking:** all cards are absolutely stacked in a pinned stage. `z-index`: card 1 = 3, card 2 = 2, card 3 = 1.
- **Initial transforms:**

  | Card | y | Content | Notes |
  |---|---|---|---|
  | 1 | 0 | Full | |
  | 2 | +150 px (lower edge and "02" visible under card 1, as in `ref_07.75s`) | opacity 0.2, blur 4 px | Card shell stays white and opaque |
  | 3 | +300 px | opacity 0.2, blur 4 px | Fully hidden under card 2 until card 1 leaves |

- **Pin:** wrapper `start: "top top+=140"` (below the nav pill), `end: "+=200%"` (≈1 vh per transition), `scrub: true`.
- **Transition k (k = 1, 2):**

  | Element | Change |
  |---|---|
  | Card k | y 0 → −110 vh (linear; it should look like it scrolls away at page speed) |
  | Card k+1 | y +150 → 0 (ease-out over the same segment) |
  | Card k+1 content | opacity 0.2 → 1, blur 4 → 0 over the last 60 % of the segment |
  | Card k+2 | y +300 → +150 (now peeking, as in `ref_08.75s` / `ref_09.25s`) |

- **Inner sequences**, nested in the same timeline so they scrub:
  - **A07** (card 1, at section entry): photo 2 from scale 0.6 / opacity 0 to 1; title and description from opacity 0.2 to 1.
  - **A08:** the dotted connector path in card 1 draws via `stroke-dashoffset` over the first 50 % of card 1's hold. The purple line in card 2 draws during card 2's arrival.
  - **A10:** card 2's right photo becomes a 3-photo cluster (two extra photos scale from 0.8 / opacity 0, 80 ms stagger) once card 2 is front.
  - **A11:** card 3's chips go from opacity 0.3 to 1; connector lines draw.
- **Reverse:** scrubbed. On scroll-up, card k comes back down from above and covers card k+1, which fades and blurs back. Verify explicitly.
- **Below 1024 px:** no pin; cards in normal flow with 24 px gaps; content fades in on enter.

### 5.5 A12: Word illumination (P0)
- **Current defect:** CUR shows the paragraph fully dark at every frame (17.0–19.5 s). Either the effect is not wired, or its start and end make it complete before the section is visible. Inspect the trigger values first.
- **Implementation:**
  - Split into word `span`s (no extra dependency is needed; a simple `split(' ')` preserving punctuation is enough).
  - Each word's base color is #C9CCD1. Animate `color` (or the opacity of a dark overlay copy) to #161616.
  - ScrollTrigger: `start: "top 75%"`, `end: "bottom 35%"`, `scrub: 0.5`. Use a timeline with one tween per word, `stagger: 1`, so words light up evenly across the range.
  - Optional soft pin: `pin: true` with `end: "+=60%"`, so the paragraph drifts only slightly while lighting up (REF moves ≈45 px while two lines light up).
- **Typography:** ≈44 px at 1440 px, weight 500, line-height 1.3, max width 820 px, centered. CUR's paragraph is close in width and size, so only the color behavior is wrong.
- **Reverse:** words return to gray in reverse order.

### 5.6 A13–A17: Product showcase
- **Keep:**
  - CUR's tab control, LMS content (Course Creation / DRM Transcoding / Live & Analytics) and working ring.
  - The rail with numbers and purple fill, which already exists in CUR.
- **Fix the left column (A13):**
  - Show **one** step's eyebrow, title and paragraph at a time, vertically centered against the window.
  - Implement it as a vertical list inside an `overflow: hidden` viewport ≈320 px tall.
  - On tab change, translate the list by one item height (Motion `animate={{ y: -index * itemH }}`, 0.5 s, ease `[0.65, 0, 0.35, 1]`).
  - The outgoing item goes to opacity 0.2 then out of view; the incoming item goes to opacity 1.
  - CUR currently shows all three stacked, with inactive ones in gray. That is a different layout.
- **Trigger:** tab click (as observed). **Do not** add scroll-driven step advancing unless the owner asks; REF does not demonstrate it.
- **Pinning:** not required by the evidence. CUR scrolls normally through this section, and that is acceptable.
- **A14 (DRM tab, LMS mapping of "Transfer Files"):**
  - Panel: "Upload a lecture" plus a gray dropzone with "Drag a video here or choose from your device".
  - After 0.6 s, a video-file tile (e.g. "Lecture_04.mp4") slides in from the window's right edge (x +200 → 0, rotate 6° → 0°, 0.5 s).
  - The dropzone turns lavender (#EEE9FF [E]) while the tile is over it.
  - The tile settles at center and fades.
  - CUR jumps straight to the ring, so this is missing.
- **A15:**
  - CUR's ring sits on a beige panel; REF's ring sits on white with no panel. Remove the panel background.
  - Ring: 120 px, 10 px stroke, purple #7B5CF5 on a #F1F1F4 track.
  - Duration ≈2.0 s from 0 to 100. CUR is close; keep its counter.
- **A16:** "Encrypted & ready" (LMS copy) replaces "Complete!". Show a lock/shield-folder icon, a read-only player-link field with a copy button, and a black "Upload another" button, fading up over 0.3 s.
- **A17 (Live tab):** CUR shows a dark "Interactive Live Classroom & Lab" panel. REF shows a **3D illustration that scales up** plus a headline and a CTA row. For fidelity:
  - Replace the dark panel with a light panel.
  - Add a 3D illustration (asset needed, §6.3) that scales 0.4 → 1 over 0.5 s.
  - Below it: "Your class is one click away.", then a black "Start live class" button and a "Enter class code" input.

### 5.7 A18 + A19: Benefits row → collapse (P0)
- **Remove** the click-to-cycle deck and its "Click to cycle benefits (n/4)" pill. REF has no click interaction here.
- **Layout:**
  - H2 on **two lines** (CUR has one): "One platform for / every kind of academy". Other LMS-true copy is acceptable, but keep two lines.
  - Three cards, ≈300×330 px, radius 28 px, white with a faint 16 px grid pattern at ≈4 % opacity.
  - Each card has a 3D icon top-center (≈160 px), a centered title (18 px semibold) and a three-line description (14 px gray).
- **A18 entrance:**
  - The H2 goes from color #BDBDBD to #161616 over ≈0.4 s on enter.
  - The cards rise from y +80 → 0 with a 0.08 s stagger and come to rest with slight individual tilts (−1°, 0°, +1°) and y offsets (0, +8, +16 px).
- **A19 exit:**
  - Pin the section (`start: "top top+=120"`, `end: "+=120%"`, `scrub: true`) and wrap the three cards in a group node.

  | Progress | Group | Cards |
  |---|---|---|
  | 0 → 0.3 | rotateZ 0 → 10°, scale 1 → 1.3 | Card x-gaps shrink so the edges overlap by ≈40 px; z-order right > middle > left |
  | 0.3 → 0.7 | rotateZ 10 → 45° | Cards move to a shared center with small residual offsets (±24 px), forming a stack |
  | 0.7 → 1.0 | rotateZ 45 → 70°, scale 1.3 → 0.1, opacity 1 → 0 | — |

  The H2 scrolls away naturally at the start of the pin (do not pin it).
- **Reverse:** scrubbed, so it is fully reversible.
- **Below 1024 px:** three cards stacked vertically, no exit animation.

### 5.8 A20 + A21: Wall of love (P0)
- **Remove** the click-to-peel interaction and the "Click card to peel away (1/3) …" caption.
- **Text:** "Wall of love", ≈12 vw font size (≈170 px glyph height at 1440 px), weight 600, letter-spacing −0.03em, color #161616, centered. CUR's text is ≈10 % opacity; it must be **solid**.
- **Pin:** `start: "top top"`, `end: "+=" + (cards × 70 + 70) + "%"`, `scrub: true`.
- **A20 (first ≈0.7 vh):** text scale 0.2 → 1 and color #BDBDBD → #161616.
- **A21:**
  - Cards are absolutely centered over the text with z-order card 1 highest.
  - Initial rotations alternate (−5°, +6°, −3°, …, last card 0°), with small x/y jitter (±12 px).
  - The deck rises from y +100 vh to 0 during the end of A20.
  - Then for each card except the last, over ≈0.7 vh: y 0 → −110 vh and rotateZ unchanged → (current −3°).
  - The last card stays.
- **Reverse:** scrubbed. Cards fly back down onto the deck in reverse order.
- **Content:** see §6.2. **Do not ship invented testimonials.**

### 5.9 A22 + A23: FAQ
- Keep CUR's card and accordion.
- Tuning to match REF:
  - The heading goes from #BDBDBD to #161616 on enter.
  - Rows fade in with a 60 ms stagger.
  - The card rises 60 px on enter.
- REF has **no** "Request a Demo" button in the FAQ card. CUR has one. Keeping it is a product choice and does not affect motion; default is to keep it.
- **Accordion:** animate height with Motion (`height: 'auto'`) and rotate the chevron 180°. Make sure the page height change triggers `ScrollTrigger.refresh()` (debounced), or the pins below will be misplaced. Only Footer follows FAQ, but run the refresh anyway.

### 5.10 A24: Page-load entrance
- On first paint, the hero H1, subtitle, CTA and nav A fade from opacity 0 → 1 with 8 px rise, staggered by 0.08 s and lasting 0.5 s.
- Cards fade in last. Their scroll-linked positions must already be applied before the fade, to avoid a jump.

---

## 6. LMS Domain content and asset mapping

### 6.1 Global visual tokens (needed for frames to match)
- **Font:** REF uses a geometric sans with round "a"/"e" (Gilroy-like). Use **Urbanist** (Google, free) or licensed **Gilroy**, weights 500/600. CUR's Inter-like font is the single largest static difference after scale.
- **Colors:**

  | Role | Value |
  |---|---|
  | Page | #FFFFFF |
  | Alternate section | #F3F4F6 |
  | Ink | #161616 |
  | Body gray | #6B6F76 |
  | Unlit text | #C9CCD1 |
  | Accent | #7B5CF5 |
  | Pills | #F3CF74 / #8E7CF8 / #A6E3D3 |

- **Radii:**

  | Element | Radius |
  |---|---|
  | Feature and FAQ cards | 32–40 px |
  | UI cards | 20 px |
  | Benefit cards | 28 px |
  | Buttons | 12 px |
  | Nav pill | 18 px |

### 6.2 Section mapping

| Section | REF content | LMS Domain replacement (keep layout) | Notes / must verify |
|---|---|---|---|
| Nav | Features, Extension, [logo], Benefits, FAQ → pill with Contact us + "Join the waitlist" | Features, AI Studio, [D mark], Benefits, FAQ → pill with Contact us + **"Request Demo"** (CUR) | — |
| Hero H1 | "Meet all-in-one platform / to [connect/transfer/contact]" | "Meet the all-in-one platform / to [teach / certify / scale]" | Move "at global scale" into the subtitle |
| Hero subtitle | 2 lines | "Launch a white-label academy on your own domain, protect every lesson with DRM, and build courses with Domie AI." | Keep to 2 lines at 1440 px |
| Hero CTA | Join the waitlist | Request a Demo | Opens the existing modal (CUR) |
| Dashboard cards | Remote control / Take the control / Storage capacity / Promo | Protected Video Player / Custom Domain & SSO / Curriculum Storage / Domie AI Copilot (CUR) | Verify "SSO" and "Widevine L1 + FairPlay" are shipping features |
| Features eyebrow + H2 | "✦ FEATURES" / "All must-have remote features in 1 place" | "✦ CORE CAPABILITIES" / "Everything you need to / deliver and protect learning" (CUR) | Two lines in REF; CUR wraps to three. Reduce the font size or shorten the copy so it wraps to two lines without changing the layout |
| Feature 01 | Remote control (photos + logo connector) | Protected Video & DRM: two rounded photos (instructor recording; learner on a laptop) with the dotted connector to the D mark | Use real photos (licensed) like REF, not only UI mockups. CUR uses UI mockups everywhere; REF mixes people photos and UI chips |
| Feature 02 | File Manager (orbit with file tiles) | Courses, Lessons & Quizzes: a center "course" tile; orbit tiles Video, PDF, Quiz, SCORM | Verify SCORM support before naming it |
| Feature 03 | Video Meetings (two tiles + name chips) | Live Classes & Batches: two video tiles with chips "Instructor" and a batch name (e.g. "Batch A · 24 learners") | Use a neutral sample, not a named real person |
| Text reveal | "In today's fast-paced world …" | CUR copy ("In today's digital world, maximizing efficiency and protecting knowledge is paramount …") | — |
| Showcase | Empower Your Devices / Effortless File Transfers / Collaborate Anywhere | AI Course Creation (Domie AI) / Protected Video Delivery / Live Classes & Assessments (CUR) | — |
| Benefits | Exchange / Manage / Collaborate | Branded Custom Domains / Attendance & Certificates / Learner Progress & Analytics | Drop "Direct Monetization" unless revenue features are confirmed |
| Wall of love | 4 social-style cards | **Real** customer quotes only | See below |
| FAQ | 5 questions | CUR's 6 LMS questions | Answers must match actual product behavior |
| Footer | none | Keep CUR's footer | Not part of the motion work |

**Testimonials (hard rule):** CUR shows named people with specific numbers (for example "Elena Rostova … 14,000+ engineering learners", "Marcus Chen", "Dr. Sophia Ramirez") under "Representative academy operator feedback". Unless these are real, consented customers, they count as invented testimonials and statistics.
- **Do not ship them as-is.**
- Options: (a) replace them with real quotes and permission; (b) keep the motion but use clearly marked placeholder cards ("Your academy's story here"); (c) hide the section until real quotes exist.

**Claims to verify before launch** (they appear in CUR; this spec cannot confirm them): Widevine L1 + FairPlay DRM, SSO, SCORM 2004, 4K/multi-bitrate streaming, WebRTC classrooms, revenue share terms, and any learner counts. If unverified, rephrase them generically (for example "protected video delivery with DRM").

### 6.3 Assets required (not producible in code)
1. **Square brand mark (SVG):** the "D" glyph, white, for the 48 px black square (nav A, feature card 01 connector).
2. **Glossy 3D illustrations (transparent PNG/WebP, ≈800 px):**
   - 1 for the hero promo card (CUR has one).
   - 3 for the benefits cards.
   - 1 for the showcase live tab.
   - Style: soft pastel clay, as in REF (pink gear, blue/indigo cog, mint cloud).
3. **People photos (licensed):** 2 for feature 01, 1 + 3 for feature 02, 2 for feature 03. Warm, natural, laptop and video-call scenes.
4. **Avatars** for real testimonials, only with consent.

---

## 7. Prioritized implementation phases

Each phase starts with a **checkpoint commit** on `feature/redesign-v2` (`git commit -m "checkpoint: before <phase>"`). Run `git status` to confirm a clean tree before starting. **No deploys, no Docker image pushes, no Nginx changes.**

| Phase | Scope | IDs | Exit condition |
|---|---|---|---|
| 0. Audit | Read the current components, the Lenis/GSAP/Motion setup, `package.json` and global CSS. List every animation in the code with its owner library and the element it targets. Flag any element animated by two libraries. Produce `docs/motion-audit.md` with: animation, file:line, status (working / missing / broken / inaccurate) against this spec's IDs | all | Audit file committed; no code changes |
| 1. Foundations | Lenis↔ScrollTrigger wiring; `gsap.matchMedia` scaffolding; reduced-motion path; font swap to Urbanist; color/radius tokens; card sizes (features ≈68 vh, benefits ≈300 px) | §5.0, §6.1 | Static screenshots at 1440×900 match REF proportions within tolerance (§8.3) with all motion disabled |
| 2. Hero | A01, A03, A04, A05, A24, (A02) | P0 | §9 hero checks pass |
| 3. Features | A09 with A07, A08, A10, A11 | P0 | §9 features checks pass, including reverse |
| 4. Text reveal | A12 | P0 | §9 checks pass |
| 5. Benefits | A18, A19; remove the click deck | P0 | §9 checks pass |
| 6. Wall of love | A20, A21; remove click-peel; testimonial content decision | P0 | §9 checks pass |
| 7. Showcase | A13, A14, A15 panel fix, A16, A17 | P1 | §9 checks pass |
| 8. FAQ and polish | A22, A23, refresh-on-resize, mobile pass | P2 | Full checklist pass |

Work on **one animation ID at a time**: implement, verify against its REF frames, commit, then move on.

---

## 8. Testing and visual-comparison procedures

### 8.1 Environment
- Run the dev server locally (`npm run dev`) or the local Docker build. Never use production.
- Browser: Chromium via Playwright (already common in Next projects; if not installed, ask before adding it).
- Viewports:
  - **1440×900** (primary; matches the REF crops in `motion-frames/reference/`)
  - 1024×768
  - 390×844 (mobile)
  - each of the above with `reducedMotion: 'reduce'`

### 8.2 Scripted captures (deterministic scroll)
For each scroll-linked ID:
1. Disable Lenis smoothing in test mode (`?motiontest=1` → `lenis.options.lerp = 1`), or scroll with `window.scrollTo` followed by `lenis.scrollTo(y, { immediate: true })`. Then call `await page.waitForTimeout(400)` so scrubbed tweens settle.
2. Compute each trigger's start and end with `ScrollTrigger.getAll()` exposed on `window.__st` in test mode only, then capture screenshots at progress 0, 0.25, 0.5, 0.75 and 1.0. File names: `cur_<ID>_p<progress>.png`.
3. Place each capture next to the listed REF frame in a contact sheet, for example `ffmpeg -i ref.jpg -i cur.png -filter_complex hstack cmp_<ID>_p50.jpg`. Commit the sheets under `docs/motion-evidence/`.
4. **Reverse:** repeat the captures scrolling **upward** from progress 1.0 to 0, and confirm the screenshots match the forward captures at the same progress values.

For each time-based ID (A01, A04, A13–A17):
- Record with Playwright `recordVideo` (≥30 fps).
- Extract frames at 10 fps (`ffmpeg -vf fps=10`) and compare state order and timing against §4.

### 8.3 Tolerances (at 1440×900)
- Element bounding boxes at matching progress: position within ±24 px, size within ±8 %.
- Rotation within ±3°. Opacity states: "faded" means ≤0.35, "full" means ≥0.95.
- Time-based durations within ±25 % of §4.
- Word illumination: the dark-word fraction is within ±10 % of the scroll progress.
- No layout shift: CLS < 0.05 in a Lighthouse run. No visible jump when a pin starts or ends: the screenshots 1 px before and after `start` and `end` differ only by the scroll delta.

### 8.4 Conflict checks
- In test mode, log a warning if any element has both an active GSAP tween and a Motion animation on `transform`/`opacity` (wrap both APIs in thin helpers that register targets).
- Run `ScrollTrigger.getAll().length` after navigating away and back (client routing). It must not grow, which shows there are no duplicate triggers.

### 8.5 What does NOT count as proof
A successful `docker build`, zero console errors, passing type checks, or the presence of GSAP or Motion code. Only the side-by-side visual evidence in §8.2 counts.

---

## 9. Acceptance checklist

Every item requires a committed evidence image or video under `docs/motion-evidence/` and a one-line note. Unresolved items are listed honestly in `docs/motion-evidence/OPEN_ISSUES.md`.

**Global**
- [ ] Urbanist (or Gilroy) loaded; headings match REF weight and proportions (`ref_00.00s` vs `cur_hero_p0`)
- [ ] Lenis + ScrollTrigger single ticker; no duplicate triggers after route changes
- [ ] No element animated by both GSAP and Motion (audit log clean)
- [ ] Reduced motion: every section shows its final state with no pinning longer than its content
- [ ] 1024 px and 390 px: no horizontal scroll, no overlapping text, pins disabled where §5 says

**Hero (A01–A05, A24)**
- [ ] A01: three words, ≈1 s each; a mid-wipe frame shows two colors and mixed letters
- [ ] A01: text is near-black on every pill; H1 is two lines
- [ ] A05 p0: four cards extend beyond the frame edges with visible tilt (vs `ref_00.00s`)
- [ ] A05 p0.5 and p1 match `ref_03.00s` and `ref_03.50s`
- [ ] A05 reverse: cards re-explode on scroll-up
- [ ] A03/A04: nav A fades out; the button grows from a small square; links fade in; then the pill. Order is verified in a 10 fps capture
- [ ] A03/A04 reverse: plays in reverse on scroll-up
- [ ] A24: hero fades in on hard reload without a position jump

**Features (A07–A11)**
- [ ] Cards ≈89 vw × ≈68 vh, radius ≈40 px, index bottom-left
- [ ] The next card's lower edge and index are visible below the front card; its content is faded and blurred (vs `ref_07.75s`)
- [ ] The front card leaves upward; the next card rises into place and sharpens (vs `ref_08.00s`, `ref_08.75s`)
- [ ] Connector and line draws are scrubbed; the photo cluster appears on card 02
- [ ] Reverse scroll re-covers each card in order
- [ ] Section un-pins cleanly into the text reveal (no gap or jump)

**Text reveal (A12)**
- [ ] At 25/50/75 % progress the dark-word share is ≈25/50/75 %
- [ ] Reverse returns words to gray

**Showcase (A13–A17)**
- [ ] Only one step's text is visible; switching slides the column up or down with a fade
- [ ] Rail fill and tab pill follow the active tab
- [ ] DRM tab: file tile flies in, dropzone shows the lavender drag-over state, ring runs 0→100 in ≈2 s on white, then the complete state
- [ ] Live tab: 3D illustration scales in, followed by the headline and CTA row

**Benefits (A18–A19)**
- [ ] Click-to-cycle deck removed; three cards in a row; H2 on two lines
- [ ] Pin sequence matches `ref_25.75s` → `ref_26.25s` → `ref_26.50s` → `ref_26.75s`
- [ ] Fully reversible

**Wall of love (A20–A21)**
- [ ] Giant text is solid near-black, ≈88 vw, scales in (vs `ref_27.00s` → `ref_27.75s`)
- [ ] Deck over the text; the front card exits upward on scroll; the last card ends at 0°
- [ ] Fully reversible; no click-to-peel caption
- [ ] Testimonials are real with consent, or clearly placeholder, or the section is hidden

**FAQ (A22–A23)**
- [ ] Card entrance and row stagger; accordion opens and closes without layout jumps; ScrollTrigger refreshed after height changes

---

## 10. Ready-to-paste Antigravity implementation prompt

Attach to the conversation: this file, `motion-frames/reference/` (all), and `motion-frames/current-build/` (all).

```
You are working in the existing repository `lmsdomain-landing-frontend` on branch `feature/redesign-v2`. Do NOT create a new project, do NOT switch branches, do NOT deploy, do NOT change Docker or Nginx config, and do NOT add dependencies unless a step below cannot be done without one (ask first).

Stack to keep: Next.js 15.5.28, React 19, TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger, Motion, Lenis.

Your source of truth is the attached `lmsdomain_motion_reconstruction_spec.md` plus the reference frames in `motion-frames/reference/` (file names are timestamps in the Mota reference video) and the current-build frames in `motion-frames/current-build/`. Where the spec says [O] it was observed in the reference; [I] or [E] are inferred or estimated, so match the frames, not the numbers, when they disagree.

Process (follow strictly):
1. Make a checkpoint commit: `git commit -am "checkpoint: before motion reconstruction"` (or confirm the tree is clean).
2. Phase 0 audit: read the current components, styles, Lenis/GSAP/Motion setup and package.json. Write `docs/motion-audit.md` listing every existing animation with file:line, the library that owns it, the element it targets, and its status against the spec IDs A01–A24 (working / missing / broken / inaccurate). Flag any element animated by two libraries. Commit. Do not change code in this phase.
3. Phase 1 foundations per spec §5.0 and §6.1: one Lenis↔ScrollTrigger ticker, gsap.matchMedia contexts (desktop ≥1024px, below 1024px, prefers-reduced-motion), Urbanist font, color and radius tokens, and section sizes (feature cards ≈89vw × ≈68vh, benefits cards ≈300px). Commit.
4. Then implement ONE animation ID at a time, in this order: A05+A03+A04+A01+A24 (hero), A09 with A07/A08/A10/A11 (features), A12 (text reveal), A18+A19 (benefits; remove the click-to-cycle deck), A20+A21 (wall of love; remove click-to-peel), A13–A17 (showcase fixes), A22+A23 (FAQ). For each ID:
   a. Implement exactly as spec §5 describes. GSAP/ScrollTrigger owns scroll-linked and pinned motion; Motion owns discrete UI state (tabs, word swap, accordion). Never let both libraries animate transform/opacity on the same DOM node; use an inner wrapper.
   b. Preserve all working components, the Request Demo modal, the FAQ, the footer and existing integrations.
   c. Verify in the real browser at 1440×900 with Playwright using the procedure in spec §8.2: screenshots at progress 0, 0.25, 0.5, 0.75 and 1.0, scrolling forward AND backward, placed side by side with the listed reference frames. Save them to `docs/motion-evidence/<ID>/`.
   d. Check reduced-motion and the 1024px and 390px viewports.
   e. Commit with message `motion(<ID>): <summary>`.
5. Content rules: keep the LMS Domain copy from the current build unless spec §6.2 says otherwise. Do NOT invent customers, testimonials, statistics or features. The current testimonial cards (Elena Rostova, Marcus Chen, Dr. Sophia Ramirez, with their numbers) must be replaced by clearly marked placeholders until the owner supplies real quotes. List every product claim from spec §6.2 "Claims to verify" in `docs/motion-evidence/OPEN_ISSUES.md` for the owner to confirm.
6. A successful build, zero console errors or the presence of animation code is NOT proof. Only the side-by-side evidence counts. If a sequence still differs from the reference, write exactly how in `docs/motion-evidence/OPEN_ISSUES.md` instead of claiming it is done.
7. When finished, report: which IDs pass with evidence paths, which do not and why, and the list of commits. Do not merge and do not deploy.
```
