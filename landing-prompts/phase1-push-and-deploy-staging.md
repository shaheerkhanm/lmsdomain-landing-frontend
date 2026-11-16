# Antigravity prompt: push Phase 1 and deploy to staging

Paste everything below the line into Antigravity.

---

You are finishing Phase 1 of the LMS Domain marketing site revamp. The owner, Shaheer, has approved pushing branch `revamp/phase-1` and deploying it to **staging only**. Production (lmsdomain.com) must not be touched.

Repos:
- Frontend: `lmsdomain-landing-frontend` (the folder this prompt sits in, under `landing-prompts/`)
- Backend: `/Users/shaheerkhan/Documents/Docker/lms-backend/lmsdomain-landing-backend`

Rules:
- Do not deploy to production. Do not merge into `main`/`master` and do not push to it.
- Do not print, log, commit or paste any credentials, tokens, .env values or passwords. If a step needs a secret, ask Shaheer to enter it himself.
- If anything is unclear or fails, stop and report. Do not improvise a workaround that touches production.

## Step 1. Small leftovers (one commit in the frontend)

1. In `components/**/CustomPlanEnquiryForm.tsx`, remove the stale comment that mentions `?needs=android,ios`.
2. Run `npm run lint` and `npm run build` (or the repo's equivalents from package.json). Both must pass.
3. Commit: `chore: remove stale mobile-app comment`.

## Step 2. Check both branches are clean

In each repo:
1. `git status`: must be clean, on `revamp/phase-1`.
2. `git log --oneline main..revamp/phase-1` (use `master` if that is the default branch). Show me the list.
3. Run a secret check on the diff: `git diff main..revamp/phase-1 | grep -iE "password|secret|token|api[_-]?key|mongodb(\+srv)?://"`. If anything real shows up, stop and report it. Do not push.

## Step 3. Push both branches

In each repo: `git push -u origin revamp/phase-1`. Report the result. Do not open or merge a pull request.

## Step 4. Find out how staging is deployed

Before deploying, look for the existing staging process and tell me what you found:
- CI workflows (`.github/workflows/*`), `Dockerfile`, `docker-compose*.yml`, `deploy*.sh`, `Makefile`, README deploy notes, in both repos.
- Which branch staging builds from, and whether it deploys automatically on push.

Then:
- **If staging deploys from a branch automatically**, tell me which branch. Do not merge into it yourself. Ask Shaheer whether to point staging at `revamp/phase-1` or merge it into the staging branch.
- **If staging is deployed by a manual command or script**, show Shaheer the exact command and which server it targets. Run it only after he confirms in the chat, and only for staging.
- **If you can't find a deploy process**, stop and ask Shaheer how staging is normally deployed.

Staging environment variables for the frontend must include:
- `SITE_ENV=staging` (or not `production`), so the site sends `noindex` and `X-Robots-Tag`
- `SITE_URL=https://staging.lmsdomain.online`

Check that they are set, but don't print their values beyond these two.

## Step 5. Verify on staging

Once it's live, open https://staging.lmsdomain.online and check each item. Save screenshots to `docs/phase1/staging/` (desktop 1440 wide and mobile 375 wide):

1. Homepage: the H1 "Run your academy's batches, live classes and tests in one place." shows immediately. There's no mobile apps section, no custom plan band, and no Anita Dev / Amal Devi testimonials or Client4 logo.
2. `/pricing`:
   - Plan cards show real prices with "+ GST".
   - Toggle monthly/yearly: prices change and the yearly view shows "2 months free". Take a screenshot of each. They must differ.
   - Click "Choose plan" on each card: the demo modal opens and the URL has `?plan=<name>`.
   - `/pricing#faqSection` scrolls to the FAQ.
   - Note if the hero subtitle is still Lorem ipsum (it lives in Admin, `pricing-hero`).
3. `/custom-lms`: no Android, iOS, app store, DRM, WhatsApp, PayPal or AI quiz wording anywhere.
4. Demo form (open via `/#demo`): submit one test with organisation "TEST - please ignore". The confirmation panel appears and the email arrives at the Admin > Mail options address. Report whether the email arrived.
5. `curl -sI https://staging.lmsdomain.online | grep -i x-robots-tag` shows `noindex`. `/robots.txt` disallows everything.
6. Search the rendered homepage, /pricing and /custom-lms HTML for: `android|ios|iphone|app store|play store|drm|fairplay|widevine|whatsapp|webrtc|membership|affiliate|funnel|paypal|lorem`. List every hit with its page.

## Step 6. Report

Write `docs/phase1/staging-report.md` with:
- Commits pushed (both repos)
- How staging was deployed (command or pipeline, no secrets)
- A pass/fail for each Step 5 item, with screenshot filenames
- Anything that failed or looked wrong

Commit the report and screenshots to `revamp/phase-1` and push. Then stop. Don't start Phase 2.
