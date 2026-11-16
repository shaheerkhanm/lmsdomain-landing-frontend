# Prompt 36: Features page redesign, eye-catching and animated (FRONTEND, Antigravity)

Shaheer's review (3 Nov): the current /features page has "no catching elements", nothing that pulls a visitor in. It is correct and complete (38 features, 9 categories, photos, finder, integrations hub), but it reads like a list: grid of cards, then section after section of more cards.

This prompt keeps all the content and turns the page into a story with motion, in the style of the best SaaS feature pages today:

| Idea | Where it comes from (inspiration only, never copy) |
|---|---|
| Bento grid where every tile is a small live product moment, with a light that follows the cursor along the borders | Linear, Vercel, Apple |
| Pinned "scrollytelling": the page holds still while a product scene changes step by step | Apple product pages, Stripe, Framer |
| Product UI pieces that fly in and assemble into one screen | Stripe, Mota (our homepage reference) |
| A dark, focused AI chapter in the middle of a light page | Linear, Raycast, Vercel AI |
| Horizontal scroll section for the "start to finish" journey | Framer, Lusion, Awwwards sites |
| A playground the visitor can touch (change the brand colour, watch the academy recolour) | Webflow, Framer, Kajabi |
| Command palette (⌘K) feature search | Raycast, Linear |
| Custom-LMS teams' feature pages for wording and order (Thinkific, Kajabi, Teachable, LearnWorlds, Graphy) | Content only |

**Before you paste:** pull `feature/multipage`. Staging shows the current /features.
**Attach:** this file, `features-catalog.md`, the motion spec `lmsdomain_motion_reconstruction_spec.md` (for §5.0 motion rules), and 3–4 screenshots of the homepage (hero, features cards, AI section) so the page stays one family with the homepage.
**If the Domie AI bot GIF is already in the repo** (another prompt adds it for the AI section), the AI chapter below uses it. If not, attach the GIF too and put it at `public/images/domie/domie-bot.gif`.

---

## Paste into Antigravity (frontend folder, branch `feature/multipage`)

```
RULES: Repo lmsdomain-landing-frontend, branch feature/multipage (git pull first). Do NOT push, deploy, edit .env, or touch the live frontend or backend. Run locally with BACKEND_URL=https://lmsdomain.com as READ ONLY (never submit forms, never call /api/revalidate). Change only app/(marketing)/features/** and the components it uses (components/marketing/features/** or wherever they live now). Do not change the homepage or other pages; if a shared component must change, make a features-only variant instead. No new npm packages: use the GSAP + ScrollTrigger, Motion, Lenis setup already in the repo, plus SVG and CSS. Commit in small steps, each only after `npx tsc --noEmit`, `npm run lint` and `npm run build` pass. If something is unclear, stop and explain instead of guessing.

GOAL: Shaheer says /features has "no catching elements, nothing a customer can attract". Redesign it into the most engaging page on the site: a visitor should want to keep scrolling, and every scroll should show the product doing something. Keep all 38 features and their copy, keep the homepage's design family (Urbanist, white / #F3F4F6, ink #161616, body #6B6F76, accent #7B5CF5, pills #F3CF74 #8E7CF8 #A6E3D3, 20/28/40px radii, the soft double shadow, black primary buttons), and stay calm and premium, not noisy. Inspiration: Linear, Stripe, Vercel, Apple product pages, Framer, Raycast. Take ideas, never their layouts, copy, illustrations or assets.

ALLOWED NEW VISUAL TOOLS (for this page only): (1) ink #161616 as a full-bleed dark section background for ONE chapter (the AI chapter); (2) soft radial glows made only from the accent #7B5CF5 or the pill colours at 8–20% opacity; (3) a faint 1px grid or dot pattern (#161616 at 4–6% opacity, the same idea as the /pricing hero dots). Still no glassmorphism, no rainbow gradients, no new fonts or icon sets.

=== 0. INVENTORY FIRST (no code yet) ===
Open /features at 1440 and 390. Write docs/multipage/features-v3-inventory.md listing every current section top to bottom: component file, what it shows, data source (catalog.ts, media.ts, CMS slug, integrations.ts), and what this prompt does with it (keep / restyle / merge / replace). Nothing that is admin-editable today may become hard-coded. Photos and videos from prompt 01c, the integrations hub from prompt 11 and the feature finder must survive (restyled or moved), not disappear. Commit `docs(features): inventory before redesign`.

=== 1. NEW PAGE FLOW (top to bottom) ===
Keep a light → dark → light rhythm. Section names are for you; the visitor sees only the content.

A. HERO, "assemble" (white, faint dot grid, one soft accent glow behind the visual)
   - Left/top: eyebrow "✦ FEATURES", the current H1 and subtitle (from CMS features-hero, current fallbacks), Book a Demo (opens the existing Request Demo modal) and "See pricing". Under the buttons, one quiet factual line from the catalogue data, computed not typed: "38 features · 9 categories · Domie AI built in" (count from catalog.ts so it is always right).
   - H1 entrance: words rise in with a mask (each word inside overflow-hidden, translateY 100% → 0, 0.06s stagger, ease cubic-bezier(0.22,1,0.36,1)). Do not hide the H1 from the first paint: it must be the LCP element, so render it visible on the server and only animate after hydration if the user hasn't scrolled.
   - Right/below: a browser-frame "academy" (white top bar, three dots, address "academy.yourdomain.com") that is empty at first. Six product UI fragments start scattered and slightly rotated around it, then fly in and snap into place, forming one dashboard: a lesson list with a playing video, a quiz card, a certificate, a Domie AI chat bubble pair, a "Payment received" chip, a leaderboard row. Built from the homepage UI-card language (white cards, #F4F5F7 inputs, chips), clearly illustrations, no fake numbers or names (use "Learner", "Course 1", neutral values).
   - Desktop ≥1024: the assembly is scroll-linked (ScrollTrigger scrub, hero pinned for about 60% of a viewport, then releases). Below 1024: plays once on load as a time animation, no pin.
   - Pointer parallax on desktop: fragments shift up to 8px with the mouse (Motion useSpring), off for touch and reduced motion.

B. FEATURE MARQUEE (white, slim)
   Two rows of feature-name chips (all 38 titles, icon + name, Premium chips with the accent tint) sliding in opposite directions, slow (about 40s per loop), edges faded with a mask. Hover pauses the row; each chip links to its feature. CSS animation with transform only, duplicated track for a seamless loop, aria-hidden on the duplicate, and a visually hidden list for screen readers. Reduced motion: static, wrapping.
   NOTE: the content check (§4) counts each title exactly once, so mark the marquee chips with data-marquee and exclude them, or render them as aria-hidden decorative text.

C. BENTO OVERVIEW, "everything at a glance" (gray #F3F4F6)
   Replace the plain 3×3 category grid with a bento grid (12-column, 4 rows on desktop) of 9 tiles, different sizes: AI-Powered Tools and Course Learning are large (2×2), Course Sales and Branding are wide (2×1), the rest 1×1. Each tile: category title, one-line intro, feature count, Premium pill where relevant, and a small LOOPING live illustration that tells the category's story in 3–4 seconds:
     - Course Learning: lesson list, a checkmark ticks onto the next lesson, the progress bar grows, a certificate slides up at the end.
     - Assessment: a quiz card, an option gets selected, turns green, "Passed" chip pops.
     - Learner Engagement: three leaderboard rows swap order with a smooth layout animation (Motion layout).
     - AI-Powered Tools: the Domie chat, a question types itself, three dots, the answer appears line by line.
     - Live and Cohort: a 2×2 video-call grid, a "Live" dot pulses, one tile highlights as speaker.
     - Course Sales: a course card drops into a cart, the cart badge counts 0 → 1, then "Payment received".
     - Content Publishing: an ebook cover with a page turning (CSS 3D rotateY).
     - Administration: role toggles switching on one by one.
     - Branding: the browser frame recolours through the 3 pill colours, padlock + "academy.yourdomain.com".
   Loops run only while the tile is on screen (IntersectionObserver) and pause on hover-out; reduced motion shows the final frame.
   Tile hover (desktop): a spotlight glow follows the cursor along the tile's border and surface (a radial-gradient positioned with CSS variables --x/--y set on pointermove, accent at 12–18%), tile lifts 4px. Clicking a tile scrolls (Lenis, 120px offset) to that category's chapter.
   Entrance: tiles rise and fade in with a 0.06s stagger, ordered by grid position.
   Mobile: 2-column bento (large tiles span 2), then 1 column under 400px. Loops still play but only one tile animates at a time (the one nearest the centre).

D. "BUILT FOR HOW YOU TEACH" (white): keep the audience switcher from 01c, restyled: the active pill slides (Motion layoutId, already there), and switching tabs cross-fades the photo with a soft clip-path reveal (inset from the left), while the feature chips stagger in. Keep its data and accessibility.

E. AI CHAPTER, "meet Domie" (dark: full-bleed #161616, white text, one accent glow, the faint grid in white at 5%)
   This is the page's centre of gravity: the visitor scrolls from light into dark, which by itself makes it feel like an event.
   - Transition in: as the previous section ends, the dark background expands from a large rounded rectangle (radius 40px, inset 24px) to full-bleed (scrub, clip-path inset → 0). Reverse on scroll up.
   - Header: eyebrow "✦ DOMIE AI" + Premium pill, H2, intro. Next to the heading, the Domie AI bot GIF (public/images/domie/domie-bot.gif or wherever the AI-section prompt put it; reuse the same file, do not duplicate). Show it at ~160px on desktop, 120px on mobile, with alt "Domie, the LMS Domain AI assistant". Wrap it in a <picture> or next/image with unoptimized for GIFs; lazy unless above the fold. Reduced motion: show a still frame (export the first frame as domie-bot-still.webp).
   - Pinned showcase on desktop (≥1024): the section pins for about 4 viewport heights. Left: the four AI tools as a vertical list (HelpDesk AI Tutor, Domie AI Content Generator, AI Prescriptive Analytics, AI Command Bar), each with its audience chip ("For learners" etc.) and a thin progress bar that fills while that step is active. Right: ONE large product window that morphs between four scenes as you scroll: the tutor chat answering from course content; the content generator filling title, description and outcomes field by field; three alert rows sliding in with coloured diamond dots and a short summary; the command bar typing a query and grouped results dropping in. Scenes cross-fade with a 12px rise; text inside "types" with a scrubbed reveal. Clicking a tool in the list scrolls to its step.
   - Mobile/tablet: no pin. Four stacked cards, each with its scene playing once when 50% visible.
   - Keep the photos from prompt 11 (tutor and content generator) only if they fit; the scenes are the priority. Link "Explore Domie AI" → /ai.
   - Transition out: the dark shrinks back to a rounded card as the next section comes in (mirror of the entry).

F. JOURNEY, "your academy, start to finish" (white): replace the journey strip with a pinned HORIZONTAL scroll on desktop: six large panels in a row (Create → Teach → Assess → Engage → Sell → Grow), the page scrolls sideways while pinned (GSAP: x = -(trackWidth - viewport), scrub, pin; snap to panels). Each panel: big step number in outline type, two-word label, one sentence built from the catalogue, the catalogue features for that step as chips (links), and one photo from media.ts or one UI illustration. A progress line across the top fills as you move; each panel's illustration does a small entrance when it reaches the centre (containerAnimation). Under 1024: a vertical timeline with a line that draws down as you scroll.

G. CATEGORY CHAPTERS (alternating white / #F3F4F6, catalogue order, AI not repeated)
   Replace the repeated "header + card grid" pattern with a sticky split layout on desktop: left column (40%) sticks while the right column scrolls. Left: eyebrow, H2, intro, Premium pill, and a big category illustration that CHANGES as each feature card on the right becomes active (the active feature is the card crossing the viewport centre; the left illustration cross-fades to that feature's mini scene, and a small "3 / 7" counter updates). Right: the category's feature cards, each with icon (SVG stroke draws on when it enters), title, description, Premium pill. Active card gets the accent border, the others dim to 60%.
   Keep the photos and videos from 01c inside the right column where they already belong (in their rounded frames with UI chips), and keep the two interactive illustrations (watch-percentage slider, checkpoint quiz) in their categories.
   Mini scenes per category reuse the bento illustrations at a larger size (one component, a size prop), so there is no second set of drawings to maintain.
   Payment gateways stay as text chips with the "subject to configuration" note; Zoom as text unless an approved logo exists in the repo.
   Mobile: no sticky; header, then cards, each card shows its own small scene on top.

H. "MAKE IT YOURS" BRANDING PLAYGROUND (white, inside the Branding chapter or right after it)
   An interactive mini academy the visitor can play with: pick one of 5 brand colours (pills and accent from the palette, plus 2 neutral extra swatches), type an academy name (max 24 characters, default "Your Academy"), toggle light/dark. The mock academy homepage (header with logo initial and name, hero, two course cards, a button) recolours instantly with a smooth colour transition, and the address bar shows "academy.yourdomain.com" with a padlock. Caption: "Illustration of Per-School Branding and Custom Domain with SSL. Domain setup requires DNS configuration." Nothing is saved or sent anywhere. Keyboard accessible (radio group for colours, labelled input).

I. FEATURE FINDER AS A COMMAND PALETTE (gray strip): restyle the existing finder as a ⌘K-style palette: a large search field with a "⌘K" hint, results grouped by category with keyboard up/down/enter, Premium filter as a chip. Pressing ⌘K / Ctrl+K anywhere on /features opens it as a modal (Esc closes, focus is trapped and returned). Selecting a feature scrolls to its card and pulses its border (accent outline fading over 1.2s). This also hints at the AI Command Bar feature without claiming the finder is AI.

J. INTEGRATIONS HUB: keep prompt 11's hub as it is (it is already animated). Only align spacing and the section background with the new rhythm.

K. FINAL CTA (dark again, short): the existing final CTA on a #161616 rounded card (radius 40px) with a slow accent "beam" sweeping across the faint grid (one SVG line with a moving gradient stroke, 6s loop, off for reduced motion), heading and copy from CMS/current fallbacks, Book a Demo + See pricing. Magnetic hover on the primary button (moves up to 6px towards the pointer, desktop only).

=== 2. MOTION SYSTEM (one place, consistent) ===
- Put shared timings in one file (e.g. components/marketing/features/motion.ts): ease cubic-bezier(0.22,1,0.36,1), durations 0.5 / 0.8 / 1.2s, stagger 0.06s, rise 24px. Use it everywhere on the page.
- Ownership (motion spec §5.0): GSAP owns scroll-linked and pinned work (hero assembly, AI pin, horizontal journey, sticky chapters, dark expand/shrink); Motion owns UI state (tabs, palette, playground, layout swaps, hover springs). Never both on the same DOM node: wrap with an outer element when needed.
- All ScrollTriggers inside gsap.matchMedia with ({ isDesktop: "(min-width:1024px)", reduce: "(prefers-reduced-motion: reduce)" }); clean up on unmount and on route change (the repo's RouteChangeWatcher). Call ScrollTrigger.refresh() after fonts and images load. Pins must not overlap: test the order hero → AI → journey → chapters.
- Animate transform and opacity only (and clip-path for the reveals). No animating width/height/top/left/box-shadow. Use will-change only during the animation.
- Every looping illustration pauses when off screen and when the tab is hidden (document.visibilityState).
- Scroll back up must look right: every scrubbed sequence reverses cleanly, nothing stays half-assembled.
- prefers-reduced-motion: no pins, no scrub, no marquee movement, no loops, no parallax, no beam; every section shows its final, readable state. The page must still look designed in that mode.

=== 3. PERFORMANCE, RESPONSIVE, ACCESSIBILITY ===
- LCP stays the H1; no image, video or GIF above the fold on mobile except the hero illustration which is pure HTML/SVG. Lighthouse mobile performance on /features must not drop more than 5 points from today; CLS < 0.05; no long tasks over 200ms from the animations (check the Performance panel while scrolling).
- Lazy-load every chapter's heavy pieces (dynamic import with ssr:true for markup, client logic hydrated when near the viewport).
- Widths to check: 375, 414, 768, 1024, 1280, 1440, 1920. No horizontal scroll (except inside the journey's own pinned track on desktop), tap targets ≥ 44px, the dark chapter readable (white text contrast ≥ 4.5:1 on #161616, body text #B5B8BE or lighter).
- One H1, an H2 per chapter, illustrations have role="img" with aria-labels saying they are illustrations, interactive pieces fully keyboard-usable with visible focus, the marquee and decorative duplicates aria-hidden, the palette with role="dialog" and aria-modal.
- Content stays where it is today: catalog.ts, media.ts (and the CMS features-media / features-hero / seo slugs), integrations.ts. No new hard-coded marketing copy except section headings that already exist; if you need a new heading or sentence, add it to the same content layer with a CMS fallback and list it in docs/multipage/backend-gaps.md. No statistics, customers, testimonials or claims beyond features-catalog.md.

=== 4. VERIFY IN A REAL BROWSER (compiling is not proof) ===
- npm run build passes. Content check from prompt 01: every one of the 38 feature titles appears exactly once in the main content (excluding data-marquee / aria-hidden decorative copies). Paste the result.
- Playwright screenshots into docs/multipage/evidence/features-v3/: full page at 1440, 1024, 768, 390 (normal and reduced motion); the hero at 0%, 50% and 100% of its assembly; the bento with one tile hovered (spotlight visible); the AI chapter at each of its 4 steps plus the dark expand halfway; the journey at panels 1, 3 and 6; one sticky chapter with feature 1 and feature 3 active; the playground with two different colours; the ⌘K palette open with a search typed.
- Two screen recordings (webm, Playwright recordVideo): a slow scroll of the whole page top to bottom and back up at 1440, and the same at 390. These are what Shaheer will judge, so they must show the motion clearly.
- Log scrollWidth vs innerWidth at every width; no console errors or hydration warnings; homepage screenshot at 1440 unchanged.
- Lighthouse mobile on /features before and after (performance, accessibility, CLS).
- Commits, in this order: `feat(features): hero assembly and marquee`, `feat(features): bento overview with live tiles`, `feat(features): dark Domie AI chapter`, `feat(features): horizontal journey`, `feat(features): sticky category chapters`, `feat(features): branding playground and command palette`, `feat(features): final CTA and polish`.

=== 5. REPORT ===
1. The inventory and what happened to each old section. 2. Files created / changed / deleted. 3. Commit hashes. 4. Content-check result. 5. Lighthouse before/after. 6. The evidence folder and the two recordings. 7. Anything you skipped or simplified and why, honestly. Do not push, merge or deploy.
```

---

## After it passes: push and put it on staging

When the recordings look right to you:

1. In the frontend folder: `git push origin feature/multipage`
2. On the server: `/opt/lmsdomain/deploy.sh staging`
3. Open https://staging.lmsdomain.online/features on a laptop and a phone. Scroll down slowly and back up, then try the bento tiles, the colour playground and ⌘K.

Upload the two recordings (or your own phone recording of staging) to the project, and I'll review them against this prompt.
