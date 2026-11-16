# Prompt 36: show or hide main pages from the admin (BACKEND + FRONTEND)

Adds **Admin > Settings > Pages**: one row per site page with a Visible switch. Switch Pricing off, press Save, and within a few seconds the staging site:

- removes Pricing from the top menu, the mobile menu and the footer;
- removes every button or link that points to it (for example "See pricing" on the homepage), so nothing leads to a dead page;
- removes it from the sitemap and marks it noindex;
- sends anyone who opens `/pricing` directly to the homepage (or shows the 404 page, your choice per page).

Switch it back on and everything returns. No redeploy is needed for either.

**Pages you can hide:** Features, Domie AI, Pricing, About, Contact, Login, Sign up, Refund policy, DPA. **Always visible:** Home, Privacy policy and Terms (the law and the app stores expect those two to be reachable, so the switch is locked with a short note).

**Safe by default:** if the setting is missing or the backend is down, every page stays visible. The live site (lmsdomain.com) uses the same backend but never reads this setting, so nothing changes there.

Run Part A first, deploy the backend, then run Part B and deploy staging.

---

## Part A: paste into Antigravity (backend folder, branch `release/live-admin`)

```
RULES: Repo lmsdomain-landing-backend, branch release/live-admin (git pull first). Do NOT deploy, touch any remote database, run seeders or edit .env. The live site (lmsdomain.com) uses this backend: do not change any existing endpoint's existing fields or any entry the live frontend reads; only add. No new npm packages. Reuse the existing "managed" admin pattern (controllers/admin/managed.ts, managedConfigs.ts, views/pages/managed/*) and the current admin restyle (admin-theme.css, prompts 25-34): same cards, toggles, sticky Save bar, toasts and phone layout. Checks before commit: npx tsc --noEmit, npm run build, scripts/check-admin-restyle.mjs (all PASS). If anything is unclear, stop and explain instead of guessing.

GOAL: Admin > Settings > Pages, where the owner shows or hides each main page of the new site.

1. DATA. One Settings entry "Pages" (pageSlug settings, slug page-visibility; follow how the App links entry from prompt 14 is stored). It holds a list, one item per page, in this order:
   home, features, ai, pricing, about, contact, login, signup, privacy-policy, terms, refund-policy, dpa
   Each item: slug (fixed, not editable), label (fixed: Home, Features, Domie AI, Pricing, About, Contact, Login, Sign up, Privacy policy, Terms, Refund policy, DPA), path (fixed: /, /features, /ai, /pricing, /about, /contact, /login, /signup, /privacy-policy, /terms, /refund-policy, /dpa), visible (boolean, default true), whenHidden ("home" | "404", default "home"), updatedAt, updatedBy.
   LOCKED: home, privacy-policy and terms are always visible. The server rejects visible=false for them even if the form is bypassed.

2. SCREEN. Sidebar: Settings > Pages (under Settings, next to App links; same tree lines from 33f). The screen is one card with a row per page:
   - label and path (the path links to the staging page in a new tab, using the existing "View site" base URL);
   - a Visible toggle (on = green "Visible", off = grey "Hidden");
   - when off, a small select "If someone opens the link: Send to homepage / Show 404 page";
   - locked rows show the toggle on and disabled, with the note "Always visible: needed for legal and app-store compliance" (Home: "The homepage can't be hidden").
   Above the list, one line: "Hidden pages disappear from the menu, footer, buttons and sitemap on the new site. The live site isn't affected." Use the existing sticky Save bar and success toast ("Pages updated"). The 33e unsaved-changes guard must clear on save. Phone layout (34): each row becomes a stacked card, toggle on the right, 44px tap targets.

3. HINTS IN OTHER SCREENS. While a page is hidden:
   - its own admin section (e.g. the Pricing list/edit screens, the About screens, the AI page screens, the SEO entry for that page) shows a slim notice at the top: "This page is hidden on the site. Show it in Settings > Pages." with a link;
   - its sidebar item shows a small grey "Hidden" pill after the label (also in the collapsed-rail tooltip).
   No other change to those screens.

4. SAVE. Allow-list only visible and whenHidden per slug (slug, label and path come from code, never from the form). Record updatedAt/updatedBy per changed row. If there is an activity/audit log, log "Pricing hidden" / "Pricing shown" with the user; if not, say so and don't build one. After saving, call the same revalidate webhook the other Settings entries call, and also revalidate the tag/paths the frontend uses for the nav, footer and sitemap (check how the frontend's revalidate route works; the whole site layout must refresh, not just one page).

5. PUBLIC API. Expose a new read-only field in the public settings response that getSiteSettings() in the frontend reads (new field only, e.g. pages: [{ slug, path, visible, whenHidden }]). Locked slugs are always returned visible=true. Confirm with a quick grep that the live frontend ignores unknown settings fields.

6. SCRIPT. Insert-only, dry-run-by-default mongosh script scripts/add-page-visibility.mongosh.js: creates the Pages entry with all 12 rows visible=true if it doesn't exist; does nothing if it does. Print what it would insert. So deploying changes nothing on the site until someone switches a page off.

VERIFY (local backend + local DB copy only):
- toggling Pricing off and saving returns visible=false for pricing in the public API; on again returns true;
- a crafted POST with visible=false for home, privacy-policy or terms is rejected (400, clear message) and the DB is unchanged;
- a crafted POST that tries to change a path or label is ignored;
- the Pricing admin screens show the notice and the sidebar shows the Hidden pill only while it's hidden;
- no "Leave site?" popup on save; the restyle check script passes; phone layout at 390px has no horizontal scroll.
Screenshots into docs/admin-pages/: the Pages screen at 1440 with Pricing hidden, the same at 390, and the Pricing list with the notice.
Commit: feat(admin): Settings > Pages to show or hide site pages
Then git push origin release/live-admin.
REPORT: the files changed, the public API sample output, the mongosh dry-run output, and the verify results.
```

**Deploy Part A:** `./deploy.sh backend`, then run the mongosh script on the server once with the apply flag it prints (it only inserts the entry, all pages visible).

---

## Part B: paste into Antigravity (frontend folder, branch `feature/multipage`)

```
RULES: Repo lmsdomain-landing-frontend, branch feature/multipage (git pull first). Do NOT deploy or edit .env (.env.local is OK). No new npm packages. Do not change any page's design or animations; this only removes links and pages. Checks before commit: npm run build, npx tsc --noEmit, npm run lint (no new errors). If anything is unclear, stop and explain instead of guessing.

GOAL: pages switched off in Admin > Settings > Pages (backend prompt 36 Part A: getSiteSettings() now has pages: [{ slug, path, visible, whenHidden }]) disappear from the whole site and can't be opened.

1. ONE SOURCE. Add lib/pages.ts:
   - the list of site pages (slug -> path) in one place; home, privacy-policy and terms are LOCKED (always visible, whatever the API says);
   - getPageVisibility(): reads pages from getSiteSettings() with the same caching/revalidate tag as the other settings; if the field is missing, the backend is down or a slug is unknown, the page is VISIBLE (fail open);
   - isPageVisible(slug) and isPathVisible(href): isPathVisible handles "/pricing", "/pricing#faqSection", "/pricing?x=1", absolute URLs to the site's own domain, and returns true for anything that isn't one of the listed pages (anchors like /#faq, external links, /dashboard).
   - With CMS_USE_FIXTURES=true, allow a local override PAGES_HIDDEN=pricing,about in .env.local so it can be tested without a backend.

2. GUARD EVERY PAGE. In each hideable page (features, ai, pricing, about, contact, login, signup, refund-policy, dpa, including any child routes like /features/[slug]):
   - at the top of the page/layout server component: if hidden, whenHidden "home" -> redirect("/") (temporary, never permanent; no 308), whenHidden "404" -> notFound() (the branded 404);
   - generateMetadata returns robots noindex,nofollow when hidden (in case it is ever rendered).
   Do this with one shared helper (e.g. guardPage("pricing")) rather than copy-pasted logic. Don't use middleware for this unless the pages can't do it; if you do use middleware, it must never touch /dashboard, /api, /_next or static files.

3. NAV, FOOTER, BUTTONS. Filter every internal link through isPathVisible:
   - Header (desktop pill nav, sticky state, mobile menu): hidden items are removed and the remaining items close the gap (no empty slot, active indicator still aligned). If the nav CTA (e.g. Login, Sign up, Contact) points at a hidden page, hide that button; if Contact is hidden, the "Contact us"/"Request demo" buttons must still open the existing Request Demo modal, not /contact.
   - Footer: hidden links removed; a column with no links left is removed and the grid closes up.
   - Every other internal link on every page: grep the whole app for href="/features", "/ai", "/pricing", "/about", "/contact", "/login", "/signup", "/refund-policy", "/dpa" (also in CMS-driven buttons where the URL comes from the backend). Route them through one <SiteLink> (or a hook) that renders nothing, or the button's existing fallback, when the target is hidden. Buttons whose layout depends on two CTAs (e.g. a hero with "See pricing" + "Book a demo") must still look right with one.
   - Sitemap (app/sitemap.ts) leaves out hidden pages. robots.txt unchanged.
   - Internal search, command bar or footer "Platform"/"Company" lists, if any, use the same filter.
   List every place you changed in docs/multipage/page-visibility.md.

4. FRESHNESS. A save in the admin must reach the menu, footer, sitemap and the page guard on staging within a few seconds without a rebuild: use the same revalidate tag as the other settings and confirm the backend's revalidate call refreshes the root layout. If a page was statically generated, it must still redirect after its page is hidden (prove it with npm run build && npm start, not only dev).

VERIFY with npm run build && npm start (fixtures or a local backend):
- all visible: the site is identical to before (compare screenshots of /, /features, /pricing at 1440 and 390 before and after, they must match);
- Pricing hidden (whenHidden home): no "Pricing" in header, mobile menu or footer; no link to /pricing anywhere in the HTML of /, /features, /ai, /about, /contact (grep the rendered HTML); /pricing returns a temporary redirect to /; /sitemap.xml has no /pricing;
- Pricing hidden with whenHidden 404: /pricing shows the branded 404 with status 404;
- Contact hidden: "Contact us" still opens the Request Demo modal;
- About + Pricing + Features hidden together: the nav and footer still look balanced at 1440, 1024, 768 and 390 (screenshots);
- the API returning no pages field, or the backend stopped: every page visible, no errors;
- privacy-policy and terms can't be hidden even if the API says visible=false.
Screenshots into docs/multipage/evidence/page-visibility/.
Commit: feat: hide site pages from Admin > Settings > Pages
Then git push origin feature/multipage.
REPORT: the files changed, the grep results for the hidden-page test, and the verify results.
```

**Deploy Part B:** `./deploy.sh staging`.

## Try it on staging

1. Admin > Settings > Pages > switch **Pricing** off > Save.
2. Open staging in a private window: Pricing is gone from the menu and footer, and `/pricing` takes you to the homepage.
3. Switch it back on > Save: it comes back.
