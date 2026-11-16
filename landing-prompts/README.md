# LMS Domain multi-page site: Antigravity prompts

These prompts grow the one-page landing site into a multi-page site (Features, Domie AI, Pricing, About, Contact, Login/Sign up, legal pages, 404) on a new branch `feature/multipage`, branched from `feature/redesign-v2`.

## Do you need designs?

No. Each page's design is derived from the finished landing page (Urbanist type, the white / #F3F4F6 palette, ink #161616, accent #7B5CF5, pastel pills, 32–40px cards, the pill nav, the footer, the FAQ card, the final CTA) and the Mota reference style. The prompts tell Antigravity to reuse those exact components, so every page looks like the same site. Optional: if you like a specific pricing or about page somewhere, attach 1–2 screenshots of it for layout only.

## Your features

[features-catalog.md](features-catalog.md) is your feature list in priority order (9 categories, AI first). Every page uses these exact names. Attach it with prompts 01, 01b and 02.

## Your backend

[backend-gaps.md](backend-gaps.md) is what the backend still needs: fields a developer adds, and content you enter in the admin. The "must have" rows block their page from going live.

[backend-map.md](backend-map.md) lists what your admin already has (Enquiry, Home CMS entries, Pricing, Features, About, Seo, Settings) and which page uses each one. Attach it with prompts 00, 04 and 07.

## Order (one prompt per Antigravity conversation turn)

| # | File | What it builds | Wait for |
|---|---|---|---|
| 00 | [00-foundation.md](00-foundation.md) | Branch from the approved homepage (77ca9c0), audit of your backend integration and env vars, routes, shared nav/footer, CMS content layer, revalidate webhook, shared components, responsive rules | Done: audit approved (`ea7ee08`), saved in [results/00/](results/00/) |
| 00b | [00b-continue-after-audit.md](00b-continue-after-audit.md) | Steps 2–7 of prompt 00 with the review's decisions: real endpoints, server-only backend calls, enquiry and image proxies, legacy pages kept, homepage unchanged | Done: `9a3046e`, passed review |
| 01 | [01-features-page.md](01-features-page.md) | `/features` (+ optional `/features/[slug]`) | Done: `b152dad` (38/38 features); review the page in your browser |
| 01c | [01c-features-engagement.md](01c-features-engagement.md) | Makes /features more engaging: real photos, short video loops, audience switcher, journey strip, feature finder, two interactive illustrations | Done: `5671b44`; small fixes queued at the start of 01b |
| 01b | [01b-domie-ai-page.md](01b-domie-ai-page.md) | `/ai`, the premium Domie AI page: typing command bar hero, pinned showcase of the 4 AI tools | Done: `f41cf2f`; small fixes queued at the start of 02 |
| 02 | [02-pricing-page.md](02-pricing-page.md) | `/pricing` with billing toggle, plan cards, comparison table | Done: `a007b57` (shows a "plans coming soon" card until plans are entered) |
| 02b | [02b-pricing-sample-data.md](02b-pricing-sample-data.md) | Local-only sample plans so you can preview the full /pricing design (`CMS_USE_FIXTURES=true npm run dev -- -p 3002`) | — |
| 02c | [02c-pricing-hero-pattern.md](02c-pricing-hero-pattern.md) | Faint dot pattern behind the /pricing hero, sample banner moved out of the nav, "/year" suffix on yearly prices | — |
| 03 | [03-about-page.md](03-about-page.md) | `/about` | Done: `fa98b5c` (Values and Team appear once you add them in Admin > About) |
| 03b | [03b-about-fix-and-sample-data.md](03b-about-fix-and-sample-data.md) | Fixes the "1 Issue" error on /about, hides the watermarked hero photo, adds local-only sample About content | Done; one fix queued at the start of 04 |
| 04 | [04-contact-page.md](04-contact-page.md) | `/contact`, sharing the Request Demo form | Done: `2704807`; small fixes queued at the start of 05 |
| 05 | [05-login-signup.md](05-login-signup.md) | `/login`, `/signup` | Done: `7d1be85` (Redirect mode); small fixes queued at the start of 06 |
| 06 | [06-legal-404.md](06-legal-404.md) | Privacy, Terms, Refund, DPA, 404 | Done; legal pages restored in 06b |
| 06b | [06b-restore-legal-pages.md](06b-restore-legal-pages.md) | Restores /privacy-policy, /terms, /refund-policy and /dpa with their original text in the new layout | Done: `2240ae8` |
| 07 | [07-home-content-to-backend.md](07-home-content-to-backend.md) | Moves the homepage's hard-coded copy into the backend | Homepage motion review finished |
| 08 | [08-responsive-qa-and-fix.md](08-responsive-qa-and-fix.md) | Whole-site QA at 375–1920px, plus a Fix prompt | Done: `7d59403`, finished in 08b/08c |
| 08b | [08b-finish-qa.md](08b-finish-qa.md) | Finishes 08: admin-controlled app links, demo testimonials hidden live, honest QA report, staging not indexed, a screenshot script you run | Done: `6c5fcb6`, `cc136d2`, `86185f7`, `efe2085` |
| 08c | [08c-resume-08b.md](08c-resume-08b.md) | Resumes 08b after the quota stop (new chat; attach 08b too) | Done |
| 09 | [09-staging-checklist.md](09-staging-checklist.md) | Checklist for putting the branch on staging by hand: admin fixes, env, build, what to check | Admin fixes first |
| 10 | [10-yearly-pricing-and-parity-audit.md](10-yearly-pricing-and-parity-audit.md) | Yearly prices from the plan discount as on live, live-vs-staging audit, why admin Settings/SEO are empty | Done (8ee4885, ca378a8) |
| 10b | [10b-add-missing-cms-entries.md](10b-add-missing-cms-entries.md) | Insert-only script for the CMS entries missing on the live DB (address, about, settings, mail-options without secrets) | Done (applied on server: 22 CMS, 4 SEO) |
| 11 | [11-integrations-nav-features-fixes.md](11-integrations-nav-features-fixes.md) | Animated integrations section, site nav on the homepage, /features tab and image fixes, taxes note, most popular flag | Done (89b637f…e80a260; backend c8ba6ab not deployed) |
| 12 | [12-commit-server-backend-fixes.md](12-commit-server-backend-fixes.md) | Commit the server-only session-hardening backend edits to GitHub, then sync the server | Done (228d185, ef5c44a; server synced) |
| 13 | [13-admin-everything-editable.md](13-admin-everything-editable.md) | Admin coverage table; phase A: pricing comparison table, Features catalog, integrations editable in admin, auto-refresh on save | Built (backend 12759fa, 38dec8e; frontend be65072, 7201fb9); deployed 23 Oct (backend catalog-20261023 + 962cc5b scripts applied; staging 7201fb9) |
| 14 | [14-admin-phase-b.md](14-admin-phase-b.md) | Admin phase B: /ai, contact, home sections, pricing-empty, app links, SEO for all pages, instant refresh from older screens, hardening | Deployed with 14b (23 Oct) |
| 14b | [14b-live-safety-before-deploy.md](14b-live-safety-before-deploy.md) | Before deploying phase B: never change entries the live site reads; new-site copies instead; prove the old frontend is unchanged | Done (backend 818ee96, frontend add9a20); deployed 23 Oct (backend pages-20261023 at 818ee96, scripts applied; staging add9a20) |
| 15 | [15-enquiry-mail.md](15-enquiry-mail.md) | Enquiry email fix (SMTP, blocked ports check), masked secrets, multiple recipients, test button, mail status on enquiries | Built (backend 48669a7, frontend 3adec5e); deployed 23 Oct (mail-20261023); leak closed; SES via port 2587 working |
| 15b | [15b-email-templates.md](15b-email-templates.md) | Branded enquiry emails with animated GIF header, design fields in Mail options; favicon, app icons, manifest, default share image, Site identity in admin | Deployed (brand-20261024; staging 1ac2714). Deploy: [15b-deploy-brand.md](15b-deploy-brand.md) |
| 16 | [16-admin-redesign.md](16-admin-redesign.md) | Admin redesign: dashboard, design system, grouped sidebar, enquiry management, image previews on every upload, better forms | Deployed (admin-20261024, devops ffd8b4e). Review + deploy: [16-deploy-admin.md](16-deploy-admin.md) |
| 17 | [17-content-app-clients-about.md](17-content-app-clients-about.md) | BACKEND: mobile app section with demo screens, client logos, About content fill and clearer About admin | Built (16f6c43). Deploy: [17-deploy-content.md](17-deploy-content.md) |
| 18 | [18-admin-login-profile-security.md](18-admin-login-profile-security.md) | BACKEND: login redesign, profile picture and edits, secure login (lockout, 2FA, reset), empty states and buttons, FAQ check | Deployed (security-20261024, a2d7c2e). [18-deploy.md](18-deploy.md). 2FA, reset and generic login error later. |
| 19 | [19-email-redesign.md](19-email-redesign.md) | BACKEND: premium email redesign, 3 directions then pick one | Deployed (mail4-20261024, 7704acc). [19-antigravity-v2.md](19-antigravity-v2.md) |
| 20 | [20-frontend-app-clients-about.md](20-frontend-app-clients-about.md) | FRONTEND: mobile app section, client logos marquee, About content | Built (e941216, 73f052a). Deploy: [20-deploy-frontend.md](20-deploy-frontend.md) |
| 21 | [21-antigravity-prelaunch-audit.md](21-antigravity-prelaunch-audit.md) | FRONTEND (Antigravity): pre-launch audit and polish: every page at 3 widths, links, SEO/sitemap/robots, accessibility, Lighthouse, content gaps list | Built (13854d9, 16872ff, c3d9db4, f44a411). Deploy: [21-deploy-staging.md](21-deploy-staging.md) |
| 22 | [22-central-login-steps.md](22-central-login-steps.md) | FRONTEND (Claude, not Antigravity): /login becomes a real admin sign-in form against the central Laravel API (academy picker, handoff, reCAPTCHA), new /forgot-password, local fake API. Review and questions for the Laravel team: [22-central-login-review.md](22-central-login-review.md) | Waiting on the Laravel team for staging URL and reCAPTCHA key before deploy |
| 23 | [23-central-login-admin-settings.md](23-central-login-admin-settings.md) | BACKEND + FRONTEND (Claude): central login address, reCAPTCHA site key and on/off switch in Admin > Settings > App links, with a domain allow-list | After the 22 staging deploy |
| 34 | [34-fix-hero-to-jump.md](34-fix-hero-to-jump.md) | FRONTEND: hero pill keeps one width so the word "to" stops jumping when the word changes (alternative: smooth width glide) | — |
| 36 | [36-domie-ai-mascot.md](36-domie-ai-mascot.md) | FRONTEND: animated Domie AI bot in the homepage AI section (above the title, and as the chat/answer avatar in each step) and on /ai. Files in [../assets/domie/](../assets/domie/) | — |
| 37 | [37-custom-plan-content.md](37-custom-plan-content.md), [37a-custom-plan-backend.md](37a-custom-plan-backend.md), [37b-custom-plan-frontend.md](37b-custom-plan-frontend.md) | Custom Plan offer: copy deck, BACKEND admin content + enquiry type, FRONTEND /custom-lms page (brand preview, pinned launch timeline, 3-step form) and entry points on nav, footer, pricing, home | Confirm the [confirm] lines in the content file; run 37a before 37b |
| 36 | [36-features-page-redesign.md](36-features-page-redesign.md) | FRONTEND (Antigravity): /features redesign: assembling hero, feature marquee, bento overview with live tiles, dark pinned Domie AI chapter (with the Domie GIF), horizontal journey, sticky category chapters, branding playground, ⌘K finder | — |
| 36 | [36-admin-page-visibility.md](36-admin-page-visibility.md) | BACKEND + FRONTEND: Admin > Settings > Pages to show or hide Features, AI, Pricing, About, Contact, Login, Sign up, Refund, DPA; hidden pages leave the nav, footer, buttons and sitemap and redirect home | — |

Rules every prompt repeats: no hard-coded copy, prices, customers or statistics; content comes from the same backend the landing page uses, through one typed layer (`lib/api/content.ts`, `types/content.ts`) with ISR + a revalidate webhook; anything the backend lacks is listed in `docs/multipage/backend-gaps.md` instead of being invented; responsive at 375, 414, 768, 1024, 1280, 1440, 1920px; GSAP/Motion ownership rules from the motion spec.

## Files to upload back here after Antigravity finishes

So I can review each step, upload these from your repo to this project (zip a folder if it's easier):

- After 00: `docs/multipage/00-audit.md`, `docs/multipage/env.md`, `docs/multipage/backend-gaps.md`, `docs/multipage/cms-webhook.md`, and `docs/multipage/evidence/foundation/`
- After each page (01–06): that page's `docs/multipage/evidence/<page>/` screenshots and the updated `backend-gaps.md`
- After 07: `docs/multipage/evidence/home-cms/`
- After 08: `docs/multipage/QA_REPORT.md` and `docs/multipage/evidence/qa/`
- Any time: the `git log --oneline feature/redesign-v2..feature/multipage` output

For the current homepage review, upload: `docs/motion-evidence/FINAL_VERIFICATION_REPORT.md`, `docs/motion-evidence/OPEN_ISSUES.md`, `docs/motion-evidence/master_motion_contact_sheet.png`, `docs/motion-evidence/walkthrough.webm`, and a fresh screen recording of the homepage on desktop and phone.

## Backend follow-ups (server, 23 Oct)
- The backend logs whole CMS documents (`docker logs lms-landing-backend`). Once the SendGrid key is in mail-options, it will appear in the logs. Stop logging CMS documents, or redact smtp_pass.
- Server-only session-hardening edits committed as 228d185 and the server synced (23 Oct). Live SESSION_SECRET differs from the old example value; .env.examples line to be emptied.
- The compose file runs a fixed image tag with no build section. Backend deploys mean: docker build a new tag in /opt/lmsdomain/backend, change the tag in the compose file (keep a .bak), then `docker compose up -d --no-deps backend`.
- 25,569 session documents after one week (23 Oct): the backend probably creates a session for every public API request. Set `saveUninitialized: false` (and only create sessions on admin login). Not urgent: sessions expire after 14 days.

## Frontend to-dos before launch
- The frontend has no ESLint set up (`npm run lint` opens Next's setup prompt). Add it in its own approved step (needs eslint packages). Until then prompts use `npx tsc --noEmit` instead of lint.
- `next start` doesn't work with `output: standalone` (dynamic routes 404). Test production builds with `node .next/standalone/server.js`, as the Dockerfile does (22a found this; qa:screens being fixed).
