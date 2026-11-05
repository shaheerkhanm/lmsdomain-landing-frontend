Repos: frontend `~/Documents/Docker/lms-frontend/lmsdomain-landing-frontend` (currently on `feature/multipage`, commit `21629d0`) and backend `~/Documents/Docker/lms-backend/lmsdomain-landing-backend`.

Create a new branch `revamp/phase-1` from `feature/multipage` in the frontend, and `revamp/phase-1` from the current branch in the backend. Commit in small steps, one commit per numbered section below. **Do not push and do not deploy.** Do not touch any `.env` file, and never print or hard-code credentials.

## Ground rules (apply to every change)

- Never present these as available today: DRM, FairPlay, WebRTC live classes, branded Android/iOS apps, WhatsApp, memberships, affiliates, funnels, AI assessment / AI quiz generation. Remove them; do not reword them into "coming soon" on these pages.
- Never invent testimonials, quotes, ratings, customer results, revenue or growth numbers.
- Approved metrics only, used exactly: "2,000+ learners", "100+ courses", "300+ lessons", "100+ live classes". Do not publish the academy count or "3 countries".
- Do not change any price number.
- Live payment gateways are Stripe, Razorpay, Paytm and DOKU. PayPal is not offered.

**Important: most copy has two layers.** Built-in defaults live in `content/*.ts` and component fallbacks, and the live MongoDB CMS overrides them at request time (`lib/api/content.ts`). Editing the defaults alone will not change staging or production. So for every claim, do both: (a) fix the code default, and (b) make the code refuse to render the claim even if the CMS still contains it.

---

## 1. Delete dead code

These files are imported nowhere. Delete them and confirm `npx tsc --noEmit` still passes:

- `components/modules/RefundPolicy.tsx`, `TermsAndCondition.tsx`, `PrivacyPolicy.tsx`, `DataProcessingAgreement.tsx`
- `components/ui/animated-beam.tsx`, `components/ui/HomeCard.tsx`, `components/ui/sheet.tsx`
- `components/sections/PricingPage/` (whole folder) and `lib/data/pricingData.ts`
- `components/sections/AboutPage/` (whole folder)
- `components/sections/HomePage/ResultSection/` and `TestimonialSection/` (whole folders)
- `components/sections/HomePage/Banner/EmailSection.tsx`, `BannerGridSection.tsx`, `HeadingAnimateText.tsx`
- `components/sections/HomePage/FeaturesSection/FeaturesItems.tsx`, `FeaturesCards.tsx`
- `components/sections/HomePage/AdvantageSection/AdvanteageItemCard.tsx`
- `components/layout/common/RequestDemoForm.tsx`, `MainTitle.tsx`
- `components/magicui/number-ticker.tsx`

Keep `components/ui/accordion.tsx`.

## 2. Claims guard

Create `lib/claims.ts` with:

- a case-insensitive regex of not-live terms: `android`, `\bios\b`, `iphone`, `ipad`, `app store`, `google play`, `play store`, `store listings?`, `mobile apps?`, `\bapps\b`, `\bDRM\b`, `fairplay`, `widevine`, `whatsapp`, `webrtc`, `memberships?`, `affiliates? program`, `\bfunnels?\b`, `paypal`;
- `mentionsNotLive(...values)`: true if any string matches;
- `liveOr(value, fallback)`: returns the fallback when the value matches;
- `keepLive(items, pick)`: drops list items whose picked fields match.

Add a header comment explaining that it runs server-side after the CMS merge, and that the future `/roadmap` page must not use it.

## 3. Homepage

In `components/modules/HomePage.tsx`:

- Remove `MobileAppSection` (the "MOBILE APP" section), `CustomerSection` (the "Wall of love" testimonials) and `CustomPlanBand`, plus their fetches (`getHomeMobileApp`, `getHomeTestimonials`, `getHomeCustomPlanBand`, and `getSection("testimonials")`).
- Delete `components/sections/HomePage/MobileAppSection.tsx`, `CustomPlanBand.tsx`, the `CustomerSection/` folder and `content/home/sample-testimonials.ts`.
- Delete those three fetchers and the `BackendTestimonial` interface from `lib/api/content.ts`, and remove their now-unused type imports.
- In `getHomeClients()`, skip any logo whose name matches `/^client\s*\d*$/i`, such as "Client4".

In `components/marketing/custom-plan/BrandPreviewMock.tsx` (also used on /custom-lms):

- remove the "Overlapping Phone Frame (App preview)" `motion.div` (the "Mobile App" panel);
- remove the `useScroll`/`useTransform` parallax that drove it;
- remove the `<Star /> 4.9` rating chip and the unused `Star` import.

## 4. /custom-lms

**4a. Defaults in `content/custom-plan/page.ts`:**

- SEO title: "Custom LMS for Your Academy, Set Up for You | LMS Domain".
- SEO description: "Get your own branded LMS and website, set up by our team. Your domain and your brand, with setup, migration and support included."
- Hero title: "Your own LMS, set up for you", with `highlightedWords: "set up for you"`.
- Hero subtitle: drop "and Android & iOS apps" and "no months of waiting".
- Remove the "Web + Android + iOS" proof chip.
- Remove the "Schools, colleges and universities" audience. In the coaching card, change "one app your students open" to "one academy site your students open".
- Remove the Android app and iOS app deliverables.
- Timeline:
  - remove the "Day 7–10 / Apps submitted to the stores" step;
  - relabel the steps "Step 1" to "Step 4";
  - set the footnote to "We agree the dates with you in the written plan.";
  - set the title to "From first call to launch".
- Comparison:
  - remove the "Mobile apps" row;
  - change "Web in days, apps right after" to "A fixed plan with agreed dates".
- Delete the whole `mobileApps` block.
- Services: change "your academy and apps" to "your academy".
- Remove these unverified timing promises everywhere: "within 24 hours", "3 to 5 working days", "within one working day", "within a day", "in days". Replace them with neutral wording such as "after our call" or "we agree the launch date with you in the written plan".
- Remove "Android app" and "iOS app" from the form `needs`.
- FAQ:
  - replace "How fast can my LMS really go live?" with "How long does setup take?" and the answer "It depends on how much content we move and what you need on day one. We agree the launch date with you in the written plan.";
  - delete the "Do I get my own apps…" question;
  - remove "apps" and "store listings" from the remaining answers.

**4b. Components:**

- Delete `components/marketing/custom-plan/CustomPlanMobileApps.tsx` and its export in `index.ts`, and stop rendering it in `app/(marketing)/custom-lms/page.tsx`.
- In `CustomPlanDeliverables.tsx`:
  - delete the `case "Android"` and `case "iOS"` illustrations (including the "★ 4.9" Google Play mock) and their `TAG_COLORS` entries;
  - make `Web`, `AI`, `After launch` and `Custom` the 2-column items, so the 4-column grid fills evenly.
- In `CustomPlanHero.tsx`, `CustomPlanTimeline.tsx`, `CustomPlanPricingNote.tsx` and `CustomPlanFaq.tsx` (the subtitle mentions "custom apps"), change the hard-coded fallbacks to match 4a.
- In `CustomPlanEnquiryForm.tsx`:
  - set the default needs to `["Web academy"]`;
  - remove "Android app" and "iOS app" from the fallback options.

**4c. Page file `app/(marketing)/custom-lms/page.tsx`:**

- Build the title and description with `liveOr(admin value, default)`.
- Change the keywords to "Custom LMS", "White label LMS", "Branded LMS", "Enterprise LMS".
- Change the Service JSON-LD `serviceType` to "Custom Learning Management System".
- Set the provider `url` to `getSiteUrl() || PRODUCTION_ORIGIN`.

**4d. CMS guard in `getCustomPlanPage()` (`lib/api/content.ts`):**

- Stop fetching `site-custom-mobile-apps` and drop `mobileApps` from the result.
- Before returning, run every list through `keepLive`: proof chips, audiences, deliverables, timeline steps, comparison rows, form needs and FAQ items.
- Also drop any audience whose title matches `/schools?|colleges?|universit/i`.
- Drop any FAQ answer, comparison row or text field that matches `/within 24 hours|working days|in days\b|within a day|one working day/i`, falling back to the default for single fields.
- Relabel timeline steps `Step N`.
- Pass the hero title, subtitle and SEO through `liveOr`.

**4e. Backend:**

- In `controllers/api/enquiry.ts`, keep "Android app" and "iOS app" in `ALLOWED_NEEDS`, so old submissions still validate. The form will simply stop offering them.
- In `scripts/insert-custom-plan-content.js`, make the same copy changes as 4a, so the DB can be cleaned by re-running the script.

## 5. /pricing, /features, /ai and site-wide copy

- **Pricing teaser:**
  - In `lib/api/content.ts` (`getPricingPage`, the `enterprise` fallbacks around lines 412–437), change "Need your own branded LMS and apps?" to "Need your own branded LMS?".
  - Change "Get a Custom Plan: your academy, Android and iOS apps, set up by our team in days." to "Get a Custom Plan: your academy, set up and supported by our team."
  - Pass the CMS `entData.title` and `entData.description` through `liveOr`.
- **Plan descriptions:** pass each plan's `subTitle` (tagline) and each `tags` feature through the claims guard. This removes "apps" from the Premium description that comes from the DB.
- **PayPal:**
  - `components/marketing/features/HeroAssembly.tsx:392`: change "Stripe / PayPal Gateways" to "Stripe / Razorpay / Paytm / DOKU".
  - `StickyCategoryChapters.tsx:302`: change the gateway list to `["Stripe", "Razorpay", "Paytm", "DOKU", "Offline Bank Transfer"]`.
  - `CategoryMiniScenes.tsx:421`: change "Instant Stripe / PayPal access" to "Stripe, Razorpay, Paytm or DOKU".
  - `content/features/integrations.ts:33`: remove the PayPal entry.
- `CategoryMiniScenes.tsx:434`: remove the "0% Platform Fee" label and show the transaction id or nothing instead.
- `HeroAssembly.tsx:315`: remove the "Cryptographic QR Verification" row.
- **AI claims in `components/marketing/features/AiDarkChapter.tsx`:**
  - `:546`: replace "prevents hallucination" with "reduces off-topic answers by grounding responses in your course content".
  - `:514-516`: remove the "AI Curriculum Outliner: Generate 10 structured lessons & quizzes" item. The content generator only drafts titles, descriptions and learning outcomes.
  - `:507`: remove "Domie references course transcripts and slides directly."
- **Other AI claims:**
  - `content/ai/page.ts:25`: remove "Cites lesson sources so students can review the exact context".
  - `components/marketing/AiHowItWorks.tsx:33`: remove "clear source citations".
  - Remove the "From your course: Module 2" source chips at `content/home/hero.ts:34`, `components/sections/HomePage/AiSection/AiSection.tsx:360` and `AiDarkChapter.tsx:327`.
- **DRM:**
  - `content/auth/page.ts:35`: change "Course builder with lesson sequences and DRM video hosting" to "Course builder with lesson sequences and video hosting".
  - `content/features/audiences.ts:53`: change the tag "DRM Protection" to "Watermarking".
- **CTA band:** `components/sections/HomePage/CtaSection/CtaSection.tsx:77` and `content/cms-sections.ts:44`: change the email band title "Join forward-thinking\nAI leaders" to "Monthly notes for\nacademy owners". The success message must not say "priority access list"; use "Thanks, you're subscribed." The fixed `name` and `organizationName` values in the payload are fine.
- **Legal fallbacks** (`content/legal/terms.ts`, `privacy-policy.ts`, `dpa.ts`): replace "Stripe, Razorpay, PayPal" with "Stripe, Razorpay, Paytm, DOKU". Only touch the gateway names.

## 6. Hero (homepage)

Files:
- `components/sections/HomePage/Banner/BannerSection.tsx`, `MainHeading.tsx`
- `KeywordPill.tsx` (delete it)
- `content/home/hero.ts`, `content/cms-sections.ts`
- `types/content.ts` (`HeroContent`)

Changes:
- Replace the rotating H1 with a static H1: **"Run your academy's batches, live classes and tests in one place."** Delete `KeywordPill.tsx`.
- In `HeroContent`, add a `title` field and stop reading `titlePrefix`/`rotatingWords`/`connector`. If the CMS still sends them, ignore them.
- Subheading: "LMS Domain gives language, test-prep and training academies their own branded learning platform: schedule batches, teach live, test learners and collect fees online, on your own domain."
- Primary CTA "Book a 20-minute demo" opens the existing demo modal. Secondary CTA "See pricing" is a `Link` to `/pricing`.
- Microcopy under the CTAs, 14px grey: "Your own domain on every plan · Set up with our team".
- **The H1, subheading and CTAs must be visible in the server HTML at first paint.** Today they sit inside a `motion.div` with `initial="hidden"` (opacity 0), so they are invisible until JavaScript runs.
  - Remove the entrance animation from the H1 and the subheading.
  - The product stage below may keep a ≤300ms fade, but only via `whileInView` and never on the H1.
- Exactly one `<h1>` per page. Check every marketing route.
- **Reduced motion, site-wide:**
  - wrap the app in `<MotionConfig reducedMotion="user">` (from `motion/react`) in `app/layout.tsx`;
  - in `components/SmoothScroll.jsx`, skip Lenis when `prefers-reduced-motion: reduce`;
  - in `lib/gsap.ts`, add a `prefersReducedMotion()` helper and make the GSAP pinned sections render static when it is true.

## 7. Pricing page structure (do not change any number)

- **Static prices.** `components/marketing/PricingCard.tsx:43-105` animates each digit with `motion.span`, which overlaps monthly and yearly figures. Render the price as plain text. Only a single ≤200ms opacity crossfade of the whole price on the monthly/yearly toggle is allowed, and none under reduced motion.
- **Choose Plan.** Every non-custom plan button opens the existing demo modal (`EnquiryForm`) with the plan pre-filled, and also sets the URL to `?plan=<slug>` (via `router.replace`, no scroll), so the link can be shared. The Enterprise / custom plan does the same. Remove the `/signup?plan=` path from `PricingCard.tsx:142-160`.
- **FAQ anchor.** Give the pricing FAQ section `id="faqSection"` (in `MarketingFaq`, add an `id` prop). If the CMS has no FAQ items, render the built-in FAQ from `content/pricing/faq.ts` (new file) so the anchor always exists. Seed it with these questions only:
  - Can I use my own domain?
  - Which payment gateways do you support?
  - Can I run live classes?
  - Can you move my existing courses and students?

  Use the answers from the brief. Leave out the "confirm" questions for now.
- **Single pricing config.** Create `config/pricing.ts` exporting a typed `PricingConfig`:
  - `currency` (default `"INR"`);
  - `annualRule: { type: "monthsFree", months: 2 }`;
  - `plans: PlanConfig[]`, each with `id`, `name`, `tagline`, `monthly: number | null`, `limits: { activeLearners, adminSeats, storageGb, bandwidthGbPerMonth }`, `features: string[]`, `isPopular`, `isCustom`;
  - `taxLabel: "+ GST"`.

  Leave the plan values **empty (`plans: []`)** until the owner gives approved prices. `getPricingPage()` keeps reading the backend for now, but must use `config/pricing.ts` when it has plans. Add a comment saying the backend source will be retired once prices are approved. Show `taxLabel` next to every price.
- **Annual discount.** When `annualRule` is set, compute yearly as `monthly × (12 − months)` for every plan instead of the per-plan DB `discount` %. Only switch to this rule when `config/pricing.ts` has plans. Until then keep the current behaviour, and note it in your report.

## 8. Demo / lead flow

**Frontend, `components/marketing/DemoForm.tsx`** (used by the modal and by /contact). Fields, in this order:

| Field | Required? | Notes |
| --- | --- | --- |
| Full name | Yes | |
| Work email | Yes | |
| Phone / WhatsApp | Yes | Country-code select (default +91; include +1, +44, +61, +62, +65, +971, +977, +880, +94, +60) plus a number input. Send `phoneNumber` as digits only, prefixed with the country code digits. |
| Academy name | Yes | `organizationName` |
| Active learners | Yes | Select: "<100", "100–500", "500–2,000", "2,000+" |
| Message | No | Optional |

- Remove the topic select and "Project Scope or Questions". Nothing else is required.
- Keep the honeypot. Send `type: 1`, `topic: "Demo"`, `plan` (when pre-filled), `learners` and `page`.
- After success, replace the form with a confirmation panel: "Thanks, {first name}. Our team will email you to fix a 20-minute demo time that suits you." Add a "Close" button in the modal. Do not embed a booking tool; the owner chose none for now.

**Backend, `controllers/api/enquiry.ts`, type 1 branch:**
- make `subject` optional; build it as `Demo request: {organizationName}` if missing;
- accept and store `learners` against the allowed list above (add the values to the model comment);
- allow phone digits 7–15 as today.

Keep type 2 and type 3 unchanged.

**Footer link.** "Request Live Demo" links to `/#cta-enquiry`, but the homepage has no such section.
- Add a small client component, mounted once in `app/layout.tsx`, that opens the demo modal whenever the URL hash is `#cta-enquiry` or `#demo`, on load and on `hashchange`.
- Change the footer link to `/#demo`.
- Keep `/#cta-enquiry` working.

**Analytics.** No analytics tool is configured in the repo, so do not add a `generate_lead` event. Note it in the report.

## 9. Environment safety

- Add a server env var `SITE_ENV` (`production` | `staging` | `development`). Derive it from `SITE_URL` when unset: the production origin means `production`, anything else means `staging`/`development`. Export `isProductionSite()` from `lib/site.ts`, and replace `isIndexableSite()` with it.
- In `middleware.ts` (new file), add the header `X-Robots-Tag: noindex, nofollow` to every response when not production.
- In `app/layout.tsx` `generateMetadata`, set `robots: { index: false, follow: false }` when not production, so `<meta name="robots" content="noindex, nofollow">` is in every page's HTML. Make sure a page's own metadata cannot override it back to indexable outside production.
- `app/robots.ts` is already environment-aware; keep it, and switch it to `isProductionSite()`.
- **`app/sitemap.ts`:** give each route a real `lastModified`.
  - Add a `lastModified` constant map in `content/sitemap-dates.ts`, keyed by route, set to today's date for the pages you changed and to the last git commit date of each page's main file for the rest.
  - Legal pages use the CMS `updatedAt` when available.
  - Never use `new Date()` at request time.
- **Organization JSON-LD** (`app/(marketing)/page.tsx`):
  - `url` is `PRODUCTION_ORIGIN` when `isProductionSite()`, else `SITE_URL`;
  - drop any `sameAs` URL whose host has no dot (the DB has `https://facebook/lmsdomain`).
- Add `docs/staging-basic-auth.md` with an nginx example. **Do not apply it.** Use placeholders, never real values, and comment that `.well-known` stays open for certificate renewal. The example:
  - `auth_basic "Staging";`
  - `auth_basic_user_file /etc/nginx/.htpasswd-staging;`
  - an `htpasswd -c` command;
  - a `location = /robots.txt { auth_basic off; }` exception.

## 10. Verify and report

1. Run `npx tsc --noEmit` and `npm run build` in the frontend, and the backend build (`npm run build`). All must pass.
2. Grep the frontend `app components content lib` for:

   `android|\bios\b|app store|google play|mobile app|\bapps\b|4\.9|★|paypal|0% platform|cryptographic|hallucinat|curriculum outliner|cites lesson|transcripts and slides|forward-thinking|DRM|whatsapp|within 24 hours|working days`

   Print the remaining hits. Only `lib/claims.ts`, code comments and the legal Terms "affiliates" wording are acceptable.
3. Run the site locally with `SITE_URL=https://staging.lmsdomain.online`. With `curl -I` and `curl`, show that `/` returns `X-Robots-Tag: noindex, nofollow` and contains `<meta name="robots" content="noindex, nofollow">`, and that `/robots.txt` disallows everything. Then repeat with `SITE_URL=https://lmsdomain.com` and show the opposite.
4. With JavaScript disabled, take a 375×812 screenshot of `/`. The H1 must be visible. Also take 1440×900 screenshots of `/`, `/pricing` (monthly and yearly) and `/custom-lms`, and save all of them to `docs/phase1/`.
5. Report:
   - each commit with its files;
   - the grep output;
   - the curl output;
   - anything you could not do;
   - the DB entries the owner should clean in Admin, because the code now hides them but they still exist:
     - `site-home-mobile-app`
     - `site-home-custom-plan`
     - the home testimonials (Anita Dev, Amal Devi)
     - the "Client4" client
     - `site-custom-mobile-apps`
     - `site-pricing-enterprise`
     - the Premium plan description

Stop there. Phase 2 is a separate prompt.
