# Open Issues & Product Disclosures

**Date:** 2026-10-18  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Homepage Design Round 5 (Do not mark verified)

---

## 1. Homepage Design Round 5 Implementation Status

In this round, all homepage sections were reviewed and realigned against the owner's video recording and Mota reference specifications:

- **Section 0 (Card Styling):** Standardized whole-homepage card styling via `HomeCard.tsx` (`#FFFFFF` background, 1px `#ECEDEF` border, 20px outer radius, 12px inner radius, standard shadow `0 24px 48px -16px rgba(22,22,22,0.14), 0 2px 6px rgba(22,22,22,0.04)`, 24px/20px padding, Urbanist 18px/600 titles, 13px/400 `#6B6F76` subtitles, and `#F5F6F8` inner fields).
- **Section 1 (Hero):**
  - Removed duplicate "to": line 1 "Meet all-in-one platform", line 2 "to [rotating keyword]".
  - Implemented 4 mixed product cards: (1) Course builder, (2) HelpDesk AI tutor, (3) Checkout with USD/INR toggle and gateway chips, (4) Certificate issued with 3D medal.
  - Adjusted vertical fold geometry so all 4 cards fit cleanly within the first fold at 1280×800 and 1440×900 (`bottom <= innerHeight`), with top spacing ~75–85px below the demo button.
- **Section 2 (Features):**
  - Converted stacked cards to Mota paper index deck motion: Card 02 slides up over Card 01 leaving Card 01's "01" top strip exposed; Card 03 slides up leaving "01" and "02" strips exposed.
  - Replaced static screenshots with animated visuals: moving lesson player with faint learner watermark (`learner@email.com`), paused video checkpoint quiz overlay, and live class tile with two participant camera feeds (Mia Lewis & Alex Peterson) matching Mota reference.
- **Section 3 (Text Reveal):** Preserved intact without modification.
- **Section 4 (AI Section):**
  - Left column displays full step titles: HelpDesk AI tutor, Domie AI content generator, AI prescriptive analytics, AI command bar.
  - Contrast improved for dark theme: active step title `#FFFFFF`, inactive `#6B6F76`, description `#C9CCD1`.
  - Non-truncated short tab labels: "AI tutor", "Content", "Analytics", "Command bar".
- **Section 5 (Benefits):**
  - Aligned all 3 card tops and heights horizontally on the exact same row.
  - Rendered 3 distinct, large 3D illustrations (180px tall) for Sell anywhere, Your brand, and Keep learners.
  - Centered concise 2-line summaries for each benefit.
- **Section 6 (Wall of Love):**
  - Dynamic fit-to-width headline ensures "Wall of love" spans ~88% of screen width with font weight 600, with zero horizontal scroll (`scrollWidth === innerWidth`) verified at 375, 768, 1280, 1440, and 1920 viewports.
  - Card deck positioned directly over "of" (starting at the vertical midpoint of the letters and hanging below the baseline).
  - Pinned scroll distance tightened for an immediate smooth exit into FAQ.
  - Cards neutralized with "Placeholder" badges, initials avatars, and "Customer story coming soon" labels.
- **Section 7 (FAQ & Footer):** Preserved intact without modification.

---

## 2. Items Still Being Worked On

- **Multipage Templates:** Building out the dedicated secondary pages (Features, Pricing, About, Contact, Login) following the unified card styling and approved feature catalogue.
- **Real Asset Licensing & Custom Photography:** Stock participant photos are temporarily provided via Unsplash (credited in `docs/assets-credits.md`) pending proprietary product photoshoot assets.

---

## 3. What We Need From the Owner

1. **Rev-share terms (if we charge one):** Details on percentage and payout cadence so we can finish the pricing card.
2. **The onboarding timeframe (days/weeks):** Realistic deployment benchmark so we can finish the "Get started in..." line.
3. **Real customer names and quotes:** Authorized enterprise testimonials, client photos, and logos when ready to replace the neutral placeholder cards.
