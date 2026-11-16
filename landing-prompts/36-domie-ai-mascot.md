# Prompt 36: Domie AI bot in the AI section (FRONTEND, Antigravity)

**What this does:** puts the animated Domie AI bot (the glowing orb with eyes, from your `domie-ai.gif`) into the homepage AI section, in the places where Domie is "speaking", and the same on the /ai page. Nothing else changes.

**Before you paste:** copy the six files from this project's `landing-prompts/assets/domie/` folder into the frontend repo at `public/images/ai/domie/`:

| File | Size | Use |
|---|---|---|
| `domie-orb-480.webm` + `domie-orb-480.mp4` | 81 KB + 126 KB | Large bot (shown at 112–200px), whole glow |
| `domie-orb-160.webm` + `domie-orb-160.mp4` | 36 KB + 41 KB | Small avatar (shown at 22–64px), cropped close to the orb |
| `domie-orb-480-poster.jpg`, `domie-orb-160-poster.jpg` | 12 KB, 4 KB | Still frame for reduced motion and while loading |

Why not the GIF itself: it is 3.6 MB with a solid black background (it would show as a black box on white, and as a slightly different black square on the #161616 section). These are the same 4.2-second loop, cropped to the bot, with the edges faded to pure black, at about 1/30 of the size. `preview-how-it-looks.png` in the same folder shows how they look on the dark section and on white. Leave `domie-ai.gif` out of the repo.

**Attach:** this file, `preview-how-it-looks.png`, and a fresh screenshot of the homepage AI section on staging.

```
RULES: Work only in this repo, branch feature/multipage (git pull first). Do NOT push or deploy. Do NOT edit .env files. No new npm packages. Do not change any other section, motion, layout or copy. Commit only if `npm run build` and lint pass. If anything is unclear, stop and explain instead of guessing.

ASSETS (already in public/images/ai/domie/): domie-orb-480.webm/.mp4 + domie-orb-480-poster.jpg (large, includes the glow), domie-orb-160.webm/.mp4 + domie-orb-160-poster.jpg (small, cropped tight to the orb). They are short looping videos of the bot on a pure black background. Do not re-encode them. The attached preview-how-it-looks.png shows the target look.

1. ONE COMPONENT: components/ai/DomieOrb.tsx
   - Props: size (px), variant "lg" | "sm" (default: "sm" when size <= 64, else "lg"), surface "dark" | "light", thinking?: boolean, label?: string, className.
   - Renders <video autoplay muted loop playsinline preload="none" poster=...> with <source webm> then <source mp4>, width=height=size, disablePictureInPicture, no controls, object-fit cover.
   - surface "dark" (on #161616 or darker): the video gets mix-blend-mode: screen, so its black background disappears into the section and only the glowing bot shows. No container.
   - surface "light" (on white / #F3F4F6): the video sits in a round #161616 disc (border-radius 50%, overflow hidden, same size), like an avatar. Large discs get box-shadow 0 20px 60px rgba(123,92,245,.30).
   - Reduced motion (prefers-reduced-motion: reduce): render only the poster <img>, no video.
   - Off screen: IntersectionObserver plays the video when it enters the viewport and pauses it when it leaves. Start loading (preload) only when it is within 200px of the viewport, except where step 3 says eager.
   - thinking: a soft pulse on the wrapper (scale 1 -> 1.06 -> 1, 1.2s ease-in-out, repeating, Motion). Off for reduced motion.
   - Accessibility: decorative by default (aria-hidden, the video has no audio). When label is given (e.g. "Domie AI" as a chat avatar), the wrapper gets role="img" and aria-label=label.
   - iOS: muted + playsinline are required for autoplay; check it actually plays in Safari/WebKit (Playwright webkit) and that a play() rejection falls back to the poster quietly.
   - Sources in one place: content/ai/mascot.ts { name: "Domie", lg: { webm, mp4, poster }, sm: { webm, mp4, poster } }. Add "ai-mascot (uploads: webm, mp4, poster for large and small)" to docs/multipage/backend-gaps.md under "can wait", so the admin can swap the bot later. Don't change the backend.

2. HOMEPAGE AI SECTION (components/sections/HomePage/AiSection/AiSection.tsx). Keep the dark surface, pill, title, the pinned rail/text/window row and all motion exactly as they are.
   a. Intro (the part that scrolls normally before the pin): a large DomieOrb, surface "dark", 160px on desktop and 112px below 1024px, centred ABOVE the "Premium add-on" pill. Behind it a soft glow: a round div 1.6x the orb size, radial-gradient(circle, #7B5CF5 0, transparent 65%), opacity 0.35, blur 20px. On first view the orb and glow fade in and rise 16px (0.6s, Motion, once). Pill, title and subtitle keep their sizes. The intro must still leave the screen before the pin starts (round 7 rule); check that the pinned row is fully visible for all 4 steps at 1440x900 and 1280x720.
   b. In the window, Domie is the one talking, so the small orb is the bot's avatar. The window content is white, so use surface "light":
      - Step 1, HelpDesk AI tutor: a 32px DomieOrb (label "Domie AI") to the left of every answer bubble, top-aligned. While the answer is typing out it has thinking on; when the text finishes, thinking off. The learner's question bubble stays as it is.
      - Step 2, Domie AI content generator: a 24px orb next to the "Generate" button with a "Domie is writing…" label while the fields fill one by one; the label fades out when the last field is done (the orb stays, thinking off).
      - Step 3, AI prescriptive analytics: a 24px orb at the start of the AI summary, with the small heading "Domie's summary".
      - Step 4, AI command bar: replace the sparkle icon at the left of the command bar input with a 22px orb; thinking on while the query is typing.
      New strings ("Domie is writing…", "Domie's summary") go into content/home/ai.ts, not the component.
   c. Below 1024px: the 112px orb above the pill; window avatars the same as desktop. No pin, as today.

3. /ai PAGE (app/(marketing)/ai/page.tsx):
   - Hero (white): a 180px DomieOrb, surface "light" (dark disc with the purple shadow), 120px below 640px, centred above the "✦ DOMIE AI" eyebrow. This one is above the fold: preload="auto", and the poster <img> gets fetchpriority="high".
   - Hero command bar: replace the sparkle icon with a 22px orb; thinking on while each example query types.
   - Pinned showcase windows: the same avatar rules as 2b.
   - Nowhere else on /ai (not Availability, FAQ or CTA). One large orb per page; small ones only where Domie speaks.

4. CHECKS
   - Dark section: no visible square, edge or lighter box around the large orb (zoom a screenshot to 200% around it). If you see one, stop and tell me; don't edit the video.
   - Performance: Lighthouse mobile Performance on / and /ai must not drop more than 2 points. Report the bytes transferred for the orb files on each page (DevTools network or Playwright).
   - Reduced motion: only posters, no pulse, no fade-in.
   - Chromium, Firefox and WebKit (Playwright) all show the orb animating on both pages.
   - npm run build + lint pass.

EVIDENCE (docs/multipage/evidence/domie-orb/):
   - Homepage AI section at 1440x900: the intro with the large orb, and one screenshot per pinned step (4) showing the avatar.
   - Same at 390x844 (intro + 4 steps).
   - /ai hero at 1440 and 390, and one showcase step.
   - Reduced-motion screenshot of the homepage intro.
   - A short screen recording (webm) of the homepage AI section scrolling through all 4 steps.
   - Lighthouse Performance before/after for / and /ai.
Commit: `feat(ai): Domie AI bot in the AI section and /ai page`.
```
