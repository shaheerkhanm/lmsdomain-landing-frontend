# Prompt 37b: Custom Plan page and entry points (FRONTEND)

**Paste into the frontend Claude Code or Antigravity** (lmsdomain-landing-frontend) after prompt 37a's report. Paste the "API shapes" part of that report under the prompt. **Attach** [37-custom-plan-content.md](37-custom-plan-content.md) (for structure only; the text itself comes from the API).

```
RULES: Frontend repo lmsdomain-landing-frontend, branch feature/multipage (git pull first). Don't push or deploy. Don't edit .env files or the live frontend. Run against the local backend from prompt 37a; never submit forms to https://lmsdomain.com. No hard-coded copy, prices, numbers, customers or timelines: all text comes from the API shapes below, through lib/api/content.ts and types/content.ts, with the `custom-plan` revalidate tag. A section hides when it's unpublished or empty. Reuse the site's components, Urbanist type, palette (white / #F3F4F6, ink #161616, accent #7B5CF5, pastel pills), radii, buttons, PageHero, FAQ card and final CTA. Motion with the existing GSAP + ScrollTrigger and Motion setup and Lenis, following the motion ownership rules; pinned or scroll-linked motion only at >=1024px via gsap.matchMedia, simple fades below; prefers-reduced-motion means no movement. No new npm packages unless you ask first. Commit only when `npm run build` and `npx tsc --noEmit` pass.

GOAL: a page that sells "your own LMS and apps, live in days" as well as the best custom-LMS and white-label providers do, and looks better than them. It should feel like a premium product page (Linear, Vercel, Framer, Stripe level of polish), with two or three memorable interactive moments, not effects on every block.

BUILD app/(marketing)/custom-lms/page.tsx, top to bottom:

1. HERO (white, dot pattern like /pricing): eyebrow, H1 with highlightedWords in the accent treatment the homepage hero uses, subtitle, two buttons (primary scrolls to the form; secondary opens the Request Demo modal with topic "Custom plan"), proof chips.
   SIGNATURE ELEMENT, "Brand preview": on the right (below on mobile), a live mock of the client's own academy: a browser frame with a small academy homepage (logo tile, nav, a course card, a progress bar) and, overlapping it, a phone frame showing the same academy as an app (app icon, course list). Above them a small control card: a text input ("Your Academy", label from CMS) and the colour swatches from CMS. Typing changes the academy name and the logo initials everywhere in the mocks; picking a swatch re-themes buttons, progress bars, icon tile and the app icon with a 300ms colour transition (CSS variables, no re-render flicker). On load it auto-plays once: types a sample name, cycles two colours, then waits for the user. Build the mocks in HTML/CSS, not images. Phone floats with a slight parallax on scroll (desktop only). Input is limited to 24 characters and escaped.

2. AUDIENCES: three cards in a row (stack on mobile) with icon, title, text; subtle hover lift.

3. DELIVERABLES, bento grid: the 10 items in a 4-column bento (Web, Android, iOS and AI cards larger, with a small illustration each in CSS: browser bar, Android phone, iPhone, Domie AI chat bubble); tags as pastel pills. Cards reveal with a 0.06s stagger; on hover the card's illustration does one small motion (e.g. the chat bubble types three dots). 2 columns at 768–1023px, 1 column below.

4. LAUNCH TIMELINE (signature motion): desktop, pinned section where a horizontal track of the steps moves sideways as you scroll, a progress line draws across with a glowing dot, and each step's "when" pill (Day 1, Day 1–2 …) ticks to active as the dot reaches it. A small counter in the corner shows the current "when" value. Mobile: a vertical list with the line drawing down as you scroll. Footnote under it in small muted text. Make sure the pin releases cleanly into the next section (no gap or jump, check like the wall-of-love exit fixes).

5. COMPARISON: a two-column card ("Building it yourself" muted on the left, "LMS Domain Custom Plan" on the right with accent checks and a 2px ink border). Rows reveal one by one; on mobile, each row becomes a stacked pair.

6. MOBILE APPS BAND (gray): text left (eyebrow, title, text, bullets with checks, note in small muted text), right two phone frames (Android and iPhone outlines in CSS) showing the CMS screenshots, cross-fading through them, plus a floating app-icon tile that uses the colour picked in the hero Brand preview (share it through a small context; default the first swatch). Official store badges only if the repo already has approved artwork; otherwise text pills "Google Play" and "App Store".

7. SERVICES AFTER LAUNCH: four compact cards with icons.

8. PRICING NOTE: one wide card with title, text, button to the form; shows startingFrom only if set (Intl.NumberFormat with its currency).

9. ENQUIRY FORM (anchor #plan, white card radius 40px): a 3-step form with a step indicator and a sliding transition (Motion): step 1 about you (name, email, phone, organisation, organisation type), step 2 your needs (learners as segmented pills, needs as multi-select chips, launch timing pills, current platform), step 3 anything else + consent, submit. Labels and options from CMS. Client-side validation per step with clear inline errors, keyboard friendly, values kept when going back. POST through the existing enquiry proxy as type "custom-plan" (shape from 37a). Success state replaces the form with the CMS success message (with {name}) and a small check animation. Errors show the server message. Also accept ?needs=android,ios in the URL to preselect chips.

10. FAQ: reuse the landing FAQ card with the custom-plan items. Add FAQPage JSON-LD.

11. FINAL CTA: reuse the landing final CTA band (testimonials hidden as on /ai and /features), primary button to #plan, secondary to /contact?topic=sales.

SEO: generateMetadata from the seo fields; canonical /custom-lms; add /custom-lms to the sitemap and to WARM_PATHS-style lists in docs; Service JSON-LD (name, description, provider LMS Domain).

ENTRY POINTS:
- Nav: render the "Custom Plan" item (with the small badge if set) from the nav model in 37a, desktop and mobile menu.
- Footer: the "Custom LMS" link.
- /pricing: render the existing `enterprise` band from the CMS (it should now have content) with its button linking to /custom-lms.
- Home: a band from `site-home-custom-plan` placed right before the FAQ: left text and button, right a compact static version of the Brand preview (browser + phone, no input), sliding in on scroll. Don't change any other homepage section or its motion.
- Request Demo modal: when opened with topic "Custom plan", preselect that topic.
- Page visibility (prompt 36): add custom-lms -> /custom-lms to lib/pages.ts (not locked). When it's hidden, the page follows whenHidden and every entry point above (nav, footer, pricing band, home band, sitemap) disappears.

VERIFY:
- Screenshots of /custom-lms full page at 1440, 1024, 768 and 390 px, plus the home band, nav (desktop and mobile menu open), pricing band and footer, to docs/multipage/evidence/custom-plan/.
- A short screen recording (or 6 frames) of the Brand preview interaction and of the pinned timeline including its exit into the next section.
- Submit the form against the local backend: one success, one validation error, one server error; screenshots of each and the saved enquiry in the local admin.
- Lighthouse mobile on /custom-lms (production-mode build as in prompt 35): report Perf, A11y, BP, SEO; CLS under 0.05. Home's performance not worse than before (both numbers).
- No horizontal scroll at 375–1920 px; tap targets >= 44px; reduced motion checked.

Commits: `feat(custom-plan): /custom-lms page`, `feat(custom-plan): entry points on nav, footer, pricing and home`. Report the commits, the evidence paths, anything the API didn't provide, and the staging deploy steps (same as before: push, then /opt/lmsdomain/deploy.sh staging, with /custom-lms added to WARM_PATHS and `custom-plan` to REVALIDATE_TAGS in deploy.sh).

API shapes from prompt 37a:
<paste here>
```
