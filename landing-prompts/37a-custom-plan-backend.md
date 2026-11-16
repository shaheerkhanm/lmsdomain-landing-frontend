# Prompt 37a: Custom Plan content in the admin (BACKEND)

**Paste into the backend Claude Code** (lmsdomain-landing-backend). **Attach** [37-custom-plan-content.md](37-custom-plan-content.md): it is the copy that goes into the admin. Run this after prompt 36 (page visibility) and before prompt 37b (frontend).

```
Backend repo lmsdomain-landing-backend, branch release/live-admin (git pull first; this backend serves the live site, so only add, never change existing fields or entries the live frontend reads). Add admin content for a new "Custom Plan" offer on the new site: a dedicated page /custom-lms plus entry points on Pricing, Home, nav and footer. The attached 37-custom-plan-content.md is the copy; every line in it must be editable in the admin. Don't change what lmsdomain.com (the old live frontend) reads or shows, don't touch the live database, don't deploy. Database changes only as insert-only scripts with `const APPLY = false;` (dry run by default), following scripts/insert-site-identity.js. Every new admin screen uses the redesigned admin components (cards, image fields with preview, list reorder, "Where this appears", refresh on save, the list search and sort from prompts 33c/33d).

1. CUSTOM PLAN PAGE CONTENT. New admin screen "Custom Plan page" under Website (its own group, after Pricing). It lists the page's sections in page order, each with a plain-words description and a published switch, like the About page screen from prompt 17. Store it in whatever shape fits the existing CMS best (one entry per section with slugs `site-custom-*`, or one document with sub-objects; say which and why). Refresh tag `custom-plan`. Sections and fields (names are suggestions, keep them consistent):
   - seo: title, description, share image.
   - hero: eyebrow, title, highlightedWords (the part shown in the accent style, e.g. "live in days"), subtitle, primaryCta {label}, secondaryCta {label}, proofChips: string[], brandPreview {nameLabel, namePlaceholder, colourLabel, colours: string[] (hex, 5–6 swatches)}, optional hero image.
   - audiences: title?, items[{icon (fixed set), title, text}].
   - deliverables: title, subtitle, items[{icon, title, text, tag}] (reorderable).
   - timeline: title, subtitle, steps[{when, title, text}], footnote.
   - comparison: title, leftLabel, rightLabel, rows[{topic, left, right}].
   - mobileApps: eyebrow, title, text, bullets: string[], note, screenshots[{image, alt}] (reuse the demo app screens from prompt 17 by default), appIcon demo image.
   - services: title, items[{icon, title, text}].
   - pricingNote: title, text, ctaLabel, optional startingFrom {amount, currency, suffix} (empty = no price shown).
   - form: title, subtitle, field labels and option lists (organisation types, learner bands, needs, launch timing), submitLabel, successMessage (supports {name}), consentText.
   - faq: items[{question, answer}] (reuse the existing FAQ model if it supports a page/group key; otherwise a list here).
   - cta: title, text, primaryLabel, secondaryLabel.
   Fields that hold promises to clients (launch days, store accounts, reply time) get a short admin help note: "Shown to clients as a promise; keep it accurate."

2. ENTRY POINTS (all editable, each with its own published switch):
   - Pricing enterprise band: the /pricing page already supports an optional `enterprise` {title, description, cta}. Fill it from the content file with cta href /custom-lms. If the field lives in an entry lmsdomain.com also reads, use a new-site copy instead (rule from 14b).
   - Home band `site-home-custom-plan`: eyebrow, title, text, ctaLabel, optional image. Refresh tag `home`.
   - Nav and footer: add a "Custom Plan" nav item (label, href /custom-lms, optional badge "New") and a footer link "Custom LMS" through whatever model the new-site nav/footer links use now. If links are hard-coded in the frontend today, add the smallest model needed and report it.
   - Page visibility (prompt 36, Admin > Settings > Pages): add a row slug `custom-lms`, label "Custom Plan", path `/custom-lms`, visible true, whenHidden "home", hideable (not locked). If prompt 36 isn't merged yet, stop and say so; run 36 first. The insert script in step 4 adds the row to an existing Pages entry only if it's missing.

3. CUSTOM PLAN ENQUIRIES. The form posts to the existing enquiry endpoint as a new type (type 3, "custom-plan"; check the current type numbers first). Extra fields: organisationType, learners, needs: string[], launchTiming, currentPlatform, message, plus the standard name, email, phoneNumber, organizationName. Validate server-side (required fields, email format, allowed option values, lengths), keep the existing rate limit and spam protection. In admin Enquiries: a "Custom plan" filter tab and badge, and the detail view shows the extra fields in a readable block. The enquiry email (prompts 15/19 templates) gets a "Custom plan request" subject prefix and lists the extra fields. Old enquiry types must behave exactly as before.

4. DEMO CONTENT SCRIPT scripts/insert-custom-plan-content.js: insert-only, dry run by default, fills every field above from 37-custom-plan-content.md, all published on the new site. It never overwrites a field that already has a value. Print what it would insert.

5. VERIFY on a local test DB only: screenshots of the Custom Plan admin screen (top, a list section, the form section), the Pricing enterprise band and Home band fields, a custom-plan enquiry in the list and detail view, and the email preview; the script's dry run and apply against the test DB; the public API responses. `npx tsc --noEmit`, `npm run build` and `scripts/check-admin-restyle.mjs` pass.

Commit `feat(custom-plan): admin content, entry points and enquiry type`. Report: commits; the exact public API endpoints and JSON examples for prompt 37b (page content, home band, enterprise band, nav/footer links, enquiry POST body and error shape); deploy steps (`/opt/lmsdomain/deploy.sh backend`, then the script's dry run, then apply).
```
