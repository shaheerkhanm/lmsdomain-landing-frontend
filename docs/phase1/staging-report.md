# Phase 1 Staging Verification Report

- **Date:** 2026-11-06
- **Staging URL:** https://staging.lmsdomain.online
- **Frontend Branch:** `revamp/phase-1` (merged to `feature/multipage`)
- **Backend Branch:** `revamp/phase-1` (merged to `release/live-admin`)

---

## 1. Commits Pushed

### Frontend (`lmsdomain-landing-frontend`)
- `b27ba6c` - `chore: delete dead code files`
- `20acc4f` - `feat(claims): add server-side claim guard and clean CMS defaults`
- `c022779` - `feat(home): remove mobile apps section, custom plan band and unverified testimonials`
- `0bea285` - `feat(custom-lms): overhaul page, remove mobile apps, unverified timelines and numbers`
- `0da7b6d` - `feat(content): align site-wide copy and remove prohibited claims`
- `ad7e101` - `feat(home): static hero, verified copy and site-wide reduced motion`
- `59cf6bf` - `feat(pricing): static price display, gst label and demo modal query wiring`
- `f72f477` - `feat(demo): update demo lead flow with country code and learner tiers`
- `57ffeea` - `feat(env): safe staging and test robots, canonicals, sitemap and site identity`
- `51d2e2d` - `chore: remove stale mobile-app comment`
- `b46f187` - `Merge Phase 1 into feature/multipage`

### Backend (`lmsdomain-landing-backend`)
- `428884c` - `feat(cms): sync custom plan and pricing CMS defaults with Phase 1 copy`
- `26b4135` - `fix(enquiry): support optional demo subject and validate learners count`
- `f41c3fc` - `fix(enquiry): accept formatted phone numbers`
- `f05e46c` - `Merge Phase 1 into release/live-admin`

---

## 2. Staging Deployment Method

Staging was deployed directly on the staging server via deployment script:
```bash
/opt/lmsdomain/deploy.sh backend
/opt/lmsdomain/deploy.sh staging
```
- Staging environment variables verified:
  - `SITE_ENV=staging`
  - `SITE_URL=https://staging.lmsdomain.online`

---

## 3. Step 5 Verification Results

| # | Item | Status | Details / Evidence |
|---|---|---|---|
| **1** | **Homepage Cleanup** | **PASS\*** | • Mobile apps section (`#mobile-apps`): **Absent** (0 hits)<br>• Custom plan band (`#custom-plan`): **Absent** (0 hits)<br>• Unverified testimonials (Anita Dev, Amal Devi): **Absent** (0 hits)<br>• Client4 logo: **Absent** (0 hits)<br>• H1 visible immediately on paint: **Yes**.<br>*\*Note: Staging MongoDB CMS had stored `title: "Meet all-in-one platform"` (legacy rotating pill prefix). Code-level guard added to reject stale prefix and enforce `"Run your academy's batches, live classes and tests in one place."`.*<br>Screenshots: `docs/phase1/staging/home-1440.png`, `docs/phase1/staging/home-375.png` |
| **2** | **Pricing Page (`/pricing`)** | **PASS** | • Real plan prices displayed with `+ GST` label.<br>• Monthly / Yearly toggle operational: prices crossfade and show yearly discount rates (`Save 10%`, `Save 15%`) and strikethrough full prices.<br>• "Choose Plan" buttons open demo modal with `?plan=<slug>` query parameter.<br>• `/pricing#faqSection` anchor scrolls directly to the FAQ accordion.<br>• Hero subtitle contains real verified copy (no Lorem ipsum).<br>Screenshots: `docs/phase1/staging/pricing-monthly-1440.png`, `docs/phase1/staging/pricing-monthly-375.png`, `docs/phase1/staging/pricing-yearly-1440.png`, `docs/phase1/staging/pricing-yearly-375.png`, `docs/phase1/staging/pricing-modal-1440.png`, `docs/phase1/staging/pricing-faq-1440.png` |
| **3** | **Custom LMS (`/custom-lms`)** | **PASS** | • No references to Android, iOS, App Store, Google Play, DRM, Widevine, FairPlay, WhatsApp, PayPal, or AI quiz generation.<br>• Clean modern layout adhering to design rules.<br>Screenshots: `docs/phase1/staging/custom-lms-1440.png`, `docs/phase1/staging/custom-lms-375.png` |
| **4** | **Demo Lead Flow (`/#demo`)** | **PASS** | • Navigating to `https://staging.lmsdomain.online/#demo` opens demo modal automatically.<br>• Successfully submitted test enquiry with Organization: `"TEST - please ignore"`, Name: `"Tester"`, Email: `"shaheer+stagingphase1@lmsdomain.com"`, Country: `+91`, Learners: `100–500`.<br>• Backend accepted enquiry with HTTP 200.<br>• Confirmation panel appeared with `"Thanks, Tester."` and clear next steps.<br>Screenshots: `docs/phase1/staging/demo-form-1440.png`, `docs/phase1/staging/demo-form-375.png`, `docs/phase1/staging/demo-confirmation-1440.png`, `docs/phase1/staging/demo-confirmation-375.png` |
| **5** | **Robots & Headers** | **PASS** | • `curl -sI https://staging.lmsdomain.online \| grep -i x-robots-tag`<br>  Output: `x-robots-tag: noindex, nofollow`<br>• `curl -s https://staging.lmsdomain.online/robots.txt`<br>  Output: `User-Agent: *` / `Disallow: /` |
| **6** | **Rendered HTML Prohibited Terms Scan** | **PASS** | Scanned full rendered HTML of Homepage (`/`), Pricing (`/pricing`), and Custom LMS (`/custom-lms`) for `android|ios|iphone|app store|play store|drm|fairplay|widevine|whatsapp|webrtc|membership|affiliate|funnel|paypal|lorem`:<br>• Homepage: **0 hits**<br>• Pricing: **0 hits**<br>• Custom LMS: **0 hits** |

---

## 4. Screenshot Evidence Files

All screenshots saved in `docs/phase1/staging/`:
- `home-1440.png` - Desktop homepage (1440×900)
- `home-375.png` - Mobile homepage (375×812)
- `pricing-monthly-1440.png` - Desktop pricing monthly billing (1440×900)
- `pricing-monthly-375.png` - Mobile pricing monthly billing (375×812)
- `pricing-yearly-1440.png` - Desktop pricing yearly billing (1440×900)
- `pricing-yearly-375.png` - Mobile pricing yearly billing (375×812)
- `pricing-modal-1440.png` - Desktop pricing demo modal with `?plan=basic` (1440×900)
- `pricing-faq-1440.png` - Desktop pricing scrolled to `#faqSection` (1440×900)
- `custom-lms-1440.png` - Desktop `/custom-lms` page (1440×900)
- `custom-lms-375.png` - Mobile `/custom-lms` page (375×812)
- `demo-form-1440.png` - Desktop demo form modal via `/#demo` (1440×900)
- `demo-form-375.png` - Mobile demo form modal via `/#demo` (375×812)
- `demo-confirmation-1440.png` - Desktop demo confirmation panel (1440×900)
- `demo-confirmation-375.png` - Mobile demo confirmation panel (375×812)

---

## 5. Observations & Fixes Applied

1. **MongoDB CMS Stale Hero Fragment:**
   - In staging MongoDB CMS, `site-home-hero` still stored `title: "Meet all-in-one platform"`, which was the old prefix fragment for the rotating keyword pill.
   - Fixed in frontend: added an explicit check in `MainHeading.tsx` and `BannerSection.tsx` so that if CMS sends `"Meet all-in-one platform"` or the legacy rotating subtitle, the code rejects the fragment and displays the verified static H1: `"Run your academy's batches, live classes and tests in one place."` and approved subtitle.

2. **Email Notification Check:**
   - Test enquiry was submitted with organization `"TEST - please ignore"`. Shaheer can verify receipt at the email address configured in Admin > Mail options.
