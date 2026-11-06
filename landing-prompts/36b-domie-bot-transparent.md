# Prompt 36b: Domie bot without the black box (FRONTEND, Antigravity)

**Why:** the first version used videos on a black background and relied on a blend effect to hide the black. In your build the blend didn't apply, so the homepage shows a black square, and the dark disc on /ai looks heavy on white. These new files have a real transparent background, so there is nothing to hide: the bot and its soft glow sit straight on any background (see `preview-transparent.png`).

**Before you paste:** in the repo folder `public/images/ai/domie/`:
1. Delete the old files: `domie-orb-480.webm`, `domie-orb-480.mp4`, `domie-orb-160.webm`, `domie-orb-160.mp4`, `domie-orb-480-poster.jpg`, `domie-orb-160-poster.jpg`.
2. Copy in the four files from this project's `landing-prompts/assets/domie-v2/`:

| File | Size | Use |
|---|---|---|
| `domie-bot.webp` | 614 KB, 360×360, animated, transparent | Large bot (112–180px) |
| `domie-bot-sm.webp` | 102 KB, 96×96, animated, transparent, cropped close | Small avatar (20–48px) |
| `domie-bot-still.webp`, `domie-bot-sm-still.webp` | 18 KB, 3 KB | Still image for reduced motion |

**Attach:** this file and `preview-transparent.png`.

```
RULES: Work only in this repo, branch feature/multipage. Do NOT push or deploy. No new npm packages. Only change the Domie bot (components/ai/DomieOrb.tsx, content/ai/mascot.ts and the places that render it). Don't change any other design, motion or copy. Commit only if `npm run build` and lint pass.

The bot files are now animated WebP images with a TRANSPARENT background in public/images/ai/domie/: domie-bot.webp (large), domie-bot-sm.webp (small), domie-bot-still.webp and domie-bot-sm-still.webp (still frames). The old video files are deleted. The attached preview-transparent.png shows the target: the bot sits directly on the dark section, on white, and inside the chat/command-bar cards, with no box, disc or circle behind it.

1. DomieOrb.tsx: replace the <video> with a plain <img> (or next/image with unoptimized={true}; do NOT let Next re-encode it, that can drop the animation). Large uses domie-bot.webp, small (size <= 64) uses domie-bot-sm.webp. Explicit width and height = size, decoding="async", loading="lazy" (eager + fetchpriority="high" only for the /ai hero), alt="" + aria-hidden unless a label is given.
   Reduced motion: the still WebP instead.
   Remove ALL of these from the bot and its wrappers: the "surface" prop, the dark #161616 disc, border-radius/overflow clipping, background colours, box-shadows, mix-blend-mode, and the poster/IntersectionObserver video logic. The bot must have nothing behind it.
   Keep the "thinking" pulse (scale 1 -> 1.06 -> 1) on the wrapper.
   Update content/ai/mascot.ts to the new file names (lg, sm, lgStill, smStill).

2. Glow: the large bot already has its own soft glow baked in. Remove the extra blurred purple glow div you added behind it on the homepage and on /ai (it doubles the glow). Do not add a new one.

3. Sizes stay as in prompt 36: homepage intro 160px (112px below 1024px), /ai hero 180px (120px below 640px), chat avatars 32px, generator/analytics 24px, command bar 22px.

4. CHECK: zoom screenshots to 200% around the bot on the homepage AI section, the /ai hero, and one avatar in a white card and one in a dark card. There must be no square, circle, dark edge or grey fringe around it. Check Chrome, Firefox and Safari (Playwright webkit): all three must animate. Lighthouse mobile Performance on / and /ai not more than 2 points below the prompt 36 result.

EVIDENCE: docs/multipage/evidence/domie-orb/v2/: homepage AI intro and one pinned step at 1440 and 390, /ai hero at 1440 and 390, the zoomed crops, and the Lighthouse numbers.
Commit: `fix(ai): transparent Domie bot, no background box`.
```
