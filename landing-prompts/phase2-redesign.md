# Phase 2: redesign and new site structure (Antigravity prompts)

Phase 2 is too big for one run, so it's split into **four prompts**. Run them in order in the frontend folder, one at a time. After each one, paste Antigravity's report into the Claude thread before you start the next.

| Prompt | What it does |
|---|---|
| 2A | Design tokens, shared components, navigation, new routes and redirects |
| 2B | Homepage rebuild |
| 2C | `/platform` and the seven `/platform/*` pages |
| 2D-backend | **Backend folder:** Admin screens for About (company facts, team) and Contact details |
| 2D | Solutions, Customers, Roadmap, About, Contact, Blog scaffold, FAQ |

When all four pass, deploy staging (same steps as Phase 1: merge into `feature/multipage`, push, `/opt/lmsdomain/deploy.sh staging`). That's the Phase 2 checkpoint: homepage, one platform page and pricing on staging.

Run **2D-backend** in the backend folder before 2D. When you deploy, deploy the backend too (`/opt/lmsdomain/deploy.sh backend`) and run its insert script on staging (see 2D-backend step 4).

---

## Rules (repeated at the top of every prompt)

```
RULES (apply to every step):
- Repo lmsdomain-landing-frontend. Branch: git checkout revamp/phase-1 && git pull, then git checkout -b revamp/phase-2 (if it already exists, check it out and pull). Do not push, merge or deploy. Do not edit .env files.
- Inspect before editing. Reuse existing patterns: content defaults in content/*.ts, CMS overrides through lib/api/content.ts and useSectionContent, the claims guard in lib/claims.ts (liveOr / keepLive) on every CMS-sourced text. Nothing that is admin-editable today may become hard-coded.
- Never present these as available: DRM, FairPlay, Widevine, WebRTC live classes, branded Android/iOS apps, WhatsApp, memberships, affiliates, funnels, AI quiz/assessment generation, PayPal. They may appear ONLY on /roadmap, labelled "Coming soon".
- Never invent testimonials, quotes, ratings, star scores, customer results, revenue, growth or usage numbers. Approved metrics only: 2,000+ learners, 100+ courses, 300+ lessons, 100+ live classes. Do not publish the academy count or "3 countries".
- Do not change any price numbers. Prices come from the existing pricing source (backend plans / config/pricing.ts).
- Where content is missing, render a clear placeholder and mark the code with TODO(content). Never make up names, dates, addresses, phone numbers or photos.
- No new npm packages unless you stop and ask first.
- Commit in small steps, each only after npx tsc --noEmit and npm run build pass. If something is unclear, stop and ask instead of guessing.
```

---

## Prompt 2A: foundations, navigation, routes

```
<paste RULES here>

GOAL: set up the visual system, shared marketing components, the new navigation and the new routes, so 2B–2D can build pages from them.

0. INVENTORY (no code): write docs/phase2/inventory.md: current nav component(s) and breakpoints, current routes under app/, every section component on /, /features and /ai with its data source (content file / CMS slug), which sections are rendered twice (mobile + desktop copies) and where the /features marquee is rendered. Commit `docs(phase2): inventory`.

1. DESIGN TOKENS (Tailwind theme + shadcn CSS variables in the global stylesheet):
   - Fonts: Urbanist for display/headings, Inter for body (use next/font; check what's already loaded).
   - Type scale: H1 56/64 desktop, 36/44 mobile; H2 36/44 (28/36 mobile); body 18/28 (16/26 mobile); readable max width about 70ch.
   - Colours: warm off-white page background, ink-black text, violet (existing #7B5CF5 family) only for the primary action and highlights, ONE secondary accent (teal or green) for success/data states (attendance, "passed", "live"). Check contrast at WCAG AA for text on each background and list the pairs you checked.
   - Commit `feat(design): tokens for type, colour and spacing`.

2. SHARED COMPONENTS in components/marketing/ui/ (one responsive component each, no duplicated mobile/desktop DOM):
   - Section (spacing + optional background tone), Eyebrow, ScreenshotFrame (consistent browser frame around a real screenshot via next/image with sizes; when no image is passed it shows a neutral placeholder labelled "Screenshot coming" and logs nothing), ProofStrip (logos + approved metrics), PlanCard (reads from the pricing source), FAQ (accessible accordion, renders FAQPage JSON-LD from the same data), CTABand (H2 + body + "Book a demo" button that opens the existing demo modal).
   - Motion: only via framer-motion whileInView, 300ms or less, never on H1, prices or body paragraphs; respects prefers-reduced-motion (MotionConfig already set).
   - Commit `feat(ui): shared marketing components`.

3. NAVIGATION: Platform ▾ · Solutions ▾ · Pricing · Customers · Resources ▾ · Log in · [Book a demo]
   - Platform ▾: Teach, Assess, Manage, Sell, Brand, Domie AI, Security (+ "All features" → /platform).
   - Solutions ▾: Language & test-prep academies, Training companies.
   - Resources ▾: Blog, Roadmap, About, Contact.
   - Full nav from 900px wide (today it collapses at 1024px); hamburger below 900px with the same links. Dropdowns keyboard-accessible (Esc closes, focus visible). "Book a demo" opens the existing demo modal.
   - Remove "Custom Plan" from the main nav (it becomes Enterprise on /pricing; /custom-lms stays as a page, linked from the Enterprise card and the footer).
   - Update the footer links to match.
   - Commit `feat(nav): new navigation`.

4. ROUTES AND REDIRECTS:
   - Create empty route shells (a PageHero with the H1 from 2C/2D and a TODO) for: /platform, /platform/teach, /platform/assess, /platform/manage, /platform/sell, /platform/brand, /platform/ai, /platform/security, /solutions/language-test-prep-academies, /solutions/training-companies, /customers, /roadmap, /resources/blog, /demo (renders the demo form on a page; reads ?plan=).
   - Permanent redirects in next.config: /features → /platform, /ai → /platform/ai. Keep any existing redirects.
   - Add the new routes to the sitemap (with real lastmod handling from Phase 1).
   - Exclude /roadmap from the claims guard ONLY for its own roadmap items; everything else on that page still goes through the guard.
   - Commit `feat(routes): platform, solutions, customers, roadmap, demo routes and redirects`.

5. VERIFY: screenshots of the nav at 1440, 1024, 900 and 390 (open and closed dropdowns, mobile menu) into docs/phase2/2a/. curl -I localhost /features and /ai show 308 to the new URLs.

REPORT: inventory summary, tokens added, components with file paths, nav screenshots, commit hashes, anything skipped and why. Stop; don't start 2B.
```

---

## Prompt 2B: homepage

```
<paste RULES here>

GOAL: rebuild the homepage in the order below using the 2A components. One H1 only.

1. HERO (keep Phase 1 copy): H1 "Run your academy's batches, live classes and tests in one place." Subtitle: "LMS Domain gives language, test-prep and training academies their own branded learning platform: schedule batches, teach live, test learners and collect fees online, on your own domain." Primary CTA "Book a 20-minute demo" (modal), secondary "See pricing" (/pricing), microcopy "Your own domain on every plan · Set up with our team". Replace the tilted floating cards with ONE ScreenshotFrame (real dashboard screenshot if one exists in public/; otherwise the placeholder + TODO(content)). Remove the temporary "meet all-in-one platform" and stale-subtitle string checks from MainHeading.tsx and BannerSection.tsx (the Admin hero has been fixed); keep the CMS override + claims guard.
2. TRUST STRIP (ProofStrip): heading "Academies teaching with LMS Domain", the client logos already served by the CMS (/api/home/clients, Client-N names still filtered), linked only if the CMS entry has a URL, plus "2,000+ learners · 100+ courses · 100+ live classes delivered".
3. HOW AN ACADEMY RUNS ON LMS DOMAIN: four steps, each a ScreenshotFrame + short text:
   - Set up batches: "Create a course once and run it as many batches as you need, each with its own schedule, learners and drip release."
   - Teach live: "Schedule Zoom classes for a batch, send reminders, and keep recordings with the course."
   - Test and track: "Quizzes, assignments and in-video checkpoints, with attendance and progress for every learner."
   - Collect fees anywhere: "Razorpay, Paytm, Stripe or DOKU, in multiple currencies, with coupons and offline-payment approval."
   Allowed motion here: one small batch status chip moving Scheduled → Live → Recorded.
4. SELL ANYWHERE: tighten the existing gateways/currencies section (Stripe, Razorpay, Paytm, DOKU only; no PayPal, no "0% fee").
5. YOUR BRAND, YOUR DOMAIN: keep the existing section, restyled with the tokens.
6. DOMIE AI: one compact band with a "Premium" label, two or three lines on HelpDesk tutor / content drafts / analytics, link "Explore Domie AI" → /platform/ai. Resize/compress domie-bot.webp to about 720px wide and under 60 KB (keep the original in assets-src/), or drop it if it can't get that small.
7. WHY ACADEMIES CHOOSE LMS DOMAIN (three items, one card grid max on the page):
   - Built for batches: "Most course platforms are built to sell recorded videos. LMS Domain is built around schedules, batches and live teaching."
   - Sell in any currency: "Indian and international gateways on one checkout."
   - Set up with you: "Our team helps move your courses and learners in and trains your staff."
8. PRICING TEASER: "Plans from ₹X/month, all with your own domain." X = the lowest monthly plan price from the pricing source; if there are no plans, hide the price phrase and show "See plans and pricing". Link /pricing.
9. FAQ: the shared FAQ component with the FAQ list in content/faq.ts (see 2D step 6; create the file here if 2D hasn't run).
10. FINAL CTA (CTABand): H2 "See your academy running on LMS Domain." Body "Book a 20-minute demo. We'll show it with your own course structure." Button "Book a demo".

REMOVE from the homepage: the 3 generic capability cards, the word-by-word animated mission paragraph, any per-word split text, the custom plan mock, anything left of the mobile app section and testimonials. Delete their components if nothing else imports them.

Replace the PNG logo mark with SVG only if an SVG of the new mark exists; otherwise leave it and note it.

VERIFY: screenshots at 1440 and 390 (full page) into docs/phase2/2b/, with JS on and off (H1 visible both ways). Count H1 = 1. Rendered-HTML scan for: android|ios|iphone|app store|play store|drm|fairplay|widevine|whatsapp|webrtc|membership|affiliate|funnel|paypal|lorem|4\.9|★ → 0 hits. Lighthouse mobile on / before and after.

REPORT: sections built (file paths), removed components, screenshots, scan result, Lighthouse before/after, commits. Stop.
```

---

## Prompt 2C: platform pages

```
<paste RULES here>

GOAL: /platform overview plus seven /platform/* pages. Reuse the existing /features and /ai content and media (feature catalogue, Domie AI content) — move it, don't lose it.

LAYOUT for every /platform/* page (one shared PlatformPage template, data in content/platform/*.ts):
1. Outcome H1  2. One ScreenshotFrame  3. Three to five features, each a title + one-line benefit  4. "Used for" block linking to the relevant solution page(s)  5. CTABand.

PAGES (only these features; if the existing catalogue has a feature not listed and it is live, put it on the closest page and list it in the report):
- /platform/teach — H1 "Teach recorded courses and live batches from one place." Courses (video, PDF, text), drip release, Zoom live classes, bootcamps/cohorts, 1:1 tutor booking.
- /platform/assess — H1 "Test learners and certify the ones who finish." Quizzes, assignments with review, in-video checkpoints, certificates. (No AI quiz generation.)
- /platform/manage — H1 "Know every batch, learner and class at a glance." Batches, learners, attendance, roles and permissions (RBAC), messages, email + SMS notifications. (No WhatsApp.)
- /platform/sell — H1 "Collect fees in any currency, on your own checkout." Catalogue and cart, coupons, Stripe / Razorpay / Paytm / DOKU, multi-currency, offline payments with approval, instructor payouts, revenue reports.
- /platform/brand — H1 "Your academy, on your own domain." Custom domain + SSL, homepage builder, branding, SEO settings, blog, ebooks.
- /platform/ai — H1 "Domie AI: a teaching assistant grounded in your own courses." Label "Premium". HelpDesk tutor ("reduces off-topic answers by grounding responses in your course content"), content drafts (titles, descriptions and learning outcomes only), prescriptive analytics, command bar. Nothing about generating lessons or quizzes, citing sources, or preventing hallucination.
- /platform/security — H1 "Protect your courses and your learners' data." Hosting, video watermarking, learner device limits, roles and permissions, data handling & DPA. HONEST CLAIMS ONLY: no DRM, no certifications (ISO, SOC 2, GDPR-certified) unless already stated in the existing legal pages; anything you're unsure about goes in the report as "needs confirmation" and is left out.
- /platform — H1 "Everything an academy needs to teach, test and get paid." Seven cards (one grid), one per page above, each with a one-line summary and link.

"Used for" links: teach/assess/manage/sell → both solution pages; brand → both; ai → language & test-prep; security → training companies.

Remove the duplicated mobile/desktop section copies and the /features marquee as part of moving the content (one responsive component per section). Old /features and /ai components that nothing imports any more: delete them.

VERIFY: screenshots of /platform and every /platform/* page at 1440 and 390 into docs/phase2/2c/. One H1 per page. The same rendered-HTML scan as 2B → 0 hits. /features and /ai redirect.

REPORT: page → content file → features listed, anything moved or dropped from the old /features and /ai pages (and why), "needs confirmation" items for security, screenshots, commits. Stop.
```

---

## Prompt 2D-backend: About and Contact in Admin (run in the BACKEND folder)

```
Backend repo lmsdomain-landing-backend. git checkout release/live-admin && git pull, then git checkout -b revamp/phase-2 (or check it out and pull if it exists). Don't push, merge or deploy, don't touch .env or any live database.
This backend also serves lmsdomain.com, so only ADD: never rename or change existing fields, entries or endpoints the live frontend reads. Use the existing CMS entry pattern and the redesigned admin components (cards, image fields with preview, "Where this appears", refresh/revalidate on save) exactly like Settings > Site identity.

0. FIRST REPORT (no code): how CMS entries are defined, validated, saved and exposed through POST /api/cms (file:line); how an image upload field works and where files are stored; how a repeatable list field is done anywhere in the admin today (if one exists); how saves trigger frontend revalidation (tags).

1. NEW CMS ENTRY "site-about" (Admin > Website > About page), all fields optional:
   - heroTitle, mission (textarea, max 400 chars)
   - companyLegalName, productName, city, region, country, yearFounded (4-digit number)
   - companyBlurb (textarea, max 400 chars) — e.g. how Techiegram and LMS Domain relate
   - team: repeatable list, each item { name (required), role, photo (image upload), bio (max 240 chars), linkedinUrl (https only), group ("founders" | "team"), order (number), visible (boolean, default true) }. Admin can add, edit, reorder, hide and delete items.
2. NEW CMS ENTRY "site-contact" (Admin > Website > Contact details), all optional:
   - email, phone (E.164-ish, same normalisation as the enquiry phone fix), whatsappNumber, addressLines (up to 4 lines), city, postalCode, country, mapUrl (https only), hours (short text).
   Validate URLs (https:// or /uploads/ only), strip HTML from every text field, and return clean JSON through the existing /api/cms endpoint.
3. Add both slugs to the revalidation tags so saving in Admin refreshes staging within seconds.
4. DATA: an insert-only script scripts/insert-about-contact.js with const APPLY = false; (same style as scripts/insert-site-identity.js) that creates the two entries ONLY if they don't exist, never overwriting, with these starting values:
   site-about: heroTitle "We build the platform academies run on."; mission "LMS Domain helps language, test-prep and training academies run batches, live classes and tests on their own branded website. We built it because most course platforms are made for selling recorded videos, not for teaching people on a schedule."; companyLegalName "Techiegram"; productName "LMS Domain"; city "Kozhikode (Calicut)"; region "Kerala"; country "India"; yearFounded 2024; companyBlurb "LMS Domain is a SaaS learning platform built by Techiegram, a software company based in Kozhikode, Kerala."; team: [{ name "Shaheer Khan", role "Co-founder", group "founders", order 1, visible true }, { name "Anoop Sha", role "Co-founder", group "founders", order 2, visible true }] (no photos yet).
   site-contact: phone "+91 9539825916"; whatsappNumber "+91 9539825916"; addressLines ["3rd floor, Malabar Gate Hotel", "17/1491-D-15, Ram Mohan Rd, Palayam"]; city "Kozhikode"; postalCode "673004"; country "India"; email: leave empty (the site keeps its current email until it's set here).
   Run it with APPLY = false locally and show the dry-run output. Don't run it against any remote database.
5. VERIFY on a local test DB only: screenshots of both admin screens (empty, then filled, team item added/reordered/hidden, photo uploaded), the /api/cms JSON for both slugs, and an attempt to save a javascript: URL and an <script> in a text field (refused/stripped). npx tsc --noEmit and npm run build pass.

Commit `feat(cms): About page and Contact details in admin`. REPORT: step 0 findings, the exact JSON shape of both entries (needed for 2D), commits, screenshots, and deploy steps (push, /opt/lmsdomain/deploy.sh backend, then run the insert script on the staging server with APPLY = true). Stop.
```

---

## Prompt 2D: solutions, customers, roadmap, about, contact, blog, FAQ

```
<paste RULES here>

1. /solutions/language-test-prep-academies
   H1 "Built for IELTS, PTE and language academies that teach in batches."
   Body "Run morning and evening batches, take attendance automatically, set timed practice tests, and let students pay in their own currency, all on your academy's own website."
   Sections: batch scheduling, live classes, practice tests and certificates, multi-currency fees, a customer logo block (IELTS Master logo from the CMS clients list; permission confirmed by Shaheer for all three client logos), CTABand.

2. /solutions/training-companies
   H1 "Sell cohorts and team packages, deliver them live, and certify the people who finish."
   Sections: bootcamps/cohorts, 1:1 tutor booking, team training packages, instructor payouts, certificates, CTABand.

3. /customers — "Academies teaching with LMS Domain": logo wall from the CMS clients list (same filter as the homepage), approved metrics line, a short "Case studies are coming soon" note, CTABand. No quotes, no ratings.

4. /roadmap — H1 "What we're building next". Clear "Coming soon" label on every item; a note "Dates aren't fixed; ask us if you need one of these." Items: branded Android and iOS apps, DRM video protection (Widevine/FairPlay), WhatsApp notifications, WebRTC live classes, memberships, affiliate program, sales funnels, AI quiz and assessment generation. No dates, no "Q1" style promises.

5. /about — rebuild, reading the "site-about" CMS entry from 2D-backend (paste its JSON shape below), with content/about.ts holding the same starting values as the default. Sections:
   - Hero H1 = heroTitle.
   - Mission (two sentences) = mission.
   - Company facts: "LMS Domain is a product of Techiegram" style line built from productName / companyLegalName, city + region + country, "Founded in {yearFounded}". Use companyBlurb under it.
   - Founders: team items with group "founders" and visible true, sorted by order: photo (or initials avatar when no photo), name, role, optional bio and LinkedIn link.
   - Team: items with group "team"; hide the whole section when there are none.
   - Numbers: approved metrics only (2,000+ learners · 100+ courses · 300+ lessons · 100+ live classes).
   - CTABand.
   Add Organization JSON-LD details from the same data (legalName, foundingDate, address locality/region/country).
   2D-backend JSON shape: <paste here>

6. FAQ — create content/faq.ts (homepage) and use the same items on /pricing (merge with existing pricing FAQs, no duplicates). All answers approved:
   - Can I use my own domain? — Yes. Every plan includes your own domain with SSL.
   - Which payment gateways do you support? — Razorpay, Paytm, Stripe and DOKU, subject to your gateway account's country and currency.
   - Do you take a cut of my sales? — No. You pay the plan price; gateway fees are charged by your gateway.
   - Can I run live classes? — Yes, through Zoom, scheduled per batch.
   - Is there a mobile app? — Learners use your academy in any phone browser today. Branded Android and iOS apps are on our roadmap. (link "roadmap" → /roadmap)
   - Can you move my existing courses and students? — Yes, our team helps with migration during onboarding.
   - What counts as an active learner? — A learner who signs in at least once during the billing month.
   - Are the AI tools included? — Domie AI is included on the Premium plan. (Mark TODO(pricing): re-check wording once Phase 3 plan names are approved.)
   FAQ items must be CMS-overridable (existing FAQ pattern) and go through the claims guard — EXCEPT that the mobile-app answer is allowed to say "on our roadmap"; whitelist that one item by id, not by turning the guard off.

7. /contact — keep the existing form. Read the "site-contact" CMS entry (from 2D-backend): show email (fall back to the email already on the site when empty), phone as a tel: link, WhatsApp as a wa.me link, the address lines with city/postal code/country, and a map link if set. Each item renders only when set. Use the same data in the footer contact block and in Organization JSON-LD (telephone, address). No booking link for now. ("WhatsApp" here is only a contact label, not a product feature: whitelist that label in the claims guard by field, not globally.)

8. /resources/blog — scaffold only: index page "Blog — coming soon" with an empty state, and /resources/blog/[slug] template with Article JSON-LD, using the existing backend/MDX pattern if one exists. Don't write posts. Exclude from the sitemap until a post exists.

9. /pricing — move the "Custom Plan" teaser into an Enterprise card (multi-academy, SLA, custom features, migration, dedicated support, "Talk to us" → demo modal with ?plan=enterprise, plus a link to /custom-lms). Don't change prices or the yearly discounts (that's Phase 3).

VERIFY: screenshots of every page above at 1440 and 390 into docs/phase2/2d/. One H1 per page. Rendered-HTML scan as in 2B → 0 hits on every page except /roadmap (and the whitelisted FAQ/contact items). List every TODO(content) left in the code.

REPORT: pages, content files, TODO(content) list, screenshots, commits. Stop. Don't merge or deploy.
```

---

## Content from Shaheer (received)

- Techiegram is the legal company; LMS Domain is its SaaS LMS product. Founded 2024, Kozhikode (Calicut), Kerala, India.
- Co-founders: Shaheer Khan and Anoop Sha. Team members and photos will be added later in Admin.
- Phone / WhatsApp: +91 9539825916. Address: 3rd floor, Malabar Gate Hotel, 17/1491-D-15, Ram Mohan Rd, Palayam, Kozhikode, Kerala 673004.
- Permission confirmed for all three client logos.
- Screenshots: use the "Screenshot coming" frame for now.
