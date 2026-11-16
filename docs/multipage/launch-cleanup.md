# After launch: retire what only the old site uses

Until the new site replaces lmsdomain.com, the old frontend (`main`, commit `77ca9c0`) runs on the **same backend and database**. Phase B therefore never changes or unpublishes anything the old site reads. Where both sites need the same section, the new site reads its own copy, with the slug `site-<old slug>`.

Do the steps below **only after** the new frontend serves lmsdomain.com. Take a `mongodump` backup first, as for every deploy.

## 1. CMS entries the old site reads

**Retire**: the new site doesn't read these. In Admin > <page> > Cms they are labelled "(live site – retire after launch)", and the new site reads the "(new site)" copy.

| Old entry (retire) | New site reads | Admin screen |
|---|---|---|
| `home-hero` | `site-home-hero` | Home > Cms |
| `home-teach-smarter` | `site-home-teach-smarter` | Home > Cms |
| `features-hero` | `site-features-hero` | Features > Cms |
| `pricing-faq` | `site-pricing-faq` | Pricing > Cms |
| `pricing-footer-card` | `site-pricing-footer-card` | Pricing > Cms |
| `about-mission-card` | `site-about-mission-card` | About > Cms |
| `footer` | `site-footer` | Settings > Cms |

**Retire**: the old site fetches these, but neither site shows them.

| Old entry | Admin screen |
|---|---|
| `home-graph-section` | Home > Cms |
| `customers` | Home > Cms |
| `results` | Home > Cms |
| `features-content` | Features > Cms |

**Keep**: both sites read these, and they are shared on purpose.

| Entry | Note |
|---|---|
| `address` | contact details and social links |
| `pricing-hero` | Pricing banner. The new site uses its title and subtitle. |
| `about-hero`, `about-values`, `about-story`, `about-mission` | About page |
| SEO `home`, `features`, `pricing`, `about` | Both sites read them. Editing one in Admin > SEO changes the live site's title, description and keywords too. Share image and noindex are new-site only. |

**How to retire:** set `isActive: false` on each old entry. Its admin title ends in "(live site – retire after launch)". Check the site, and delete the entries a week later. In mongosh:

```js
db.cms.updateMany(
  { slug: { $in: ["home-hero", "home-teach-smarter", "features-hero", "pricing-faq", "pricing-footer-card", "about-mission-card", "footer", "home-graph-section", "customers", "results", "features-content"] } },
  { $set: { isActive: false, updatedAt: new Date() } }
)
```

Then remove " (new site)" from the copies' admin titles. This is optional:

```js
db.cms.find({ slug: /^site-/ }).forEach((d) => db.cms.updateOne({ _id: d._id }, { $set: { cmsTitle: d.cmsTitle.replace(/ \(new site\)$/, "") } }))
```

**Don't rename the `site-*` slugs back:** the new frontend reads exactly those slugs (`content/cms-sections.ts`).

## 2. The old Features screen and API

| What | Used by | After launch |
|---|---|---|
| Admin > Features > Features (collection `features`) | old `/features` list | Hide it in `views/component/sidebar.ejs`, then delete the route and controller |
| Admin `/dashboard/content` (multiple content types) | old `/features` slider | Hide and remove it the same way |
| `POST /api/features`, `POST /api/features/content` | old site only | Remove both routes from `routes/api.ts` |

The new site uses Features > Categories, Items (new site), Audiences and Integrations (`/api/features/catalog`, `/api/features/audiences`, `/api/integrations`).

## 3. Other endpoints only the old code knows

`POST /api/home/smartTeach`, `/api/home/customers`, `/api/home/features`, `/api/home/clients` and `/api/home/results` are only called from old-site components that are never rendered. Remove them, together with the admin screens that only feed them (`/dashboard/smartTeach`, `/dashboard/homeFeatures`, `/dashboard/customers`, `/dashboard/clients`, `/dashboard/results`), once you have confirmed nothing else uses them.

The new site still uses these, so keep them:
- `/api/cms`, `/api/seo`, `/api/enquiry`
- `/api/pricing`, `/api/pricing/faq`, `/api/pricing/comparison`
- `/api/home/testimonials`
- `/api/about/values`, `/api/about/leadership`
- the catalog endpoints above

## 4. Scripts

After cleanup, remove the `LIVE_SITE_READS` guards from these backend scripts:
- `scripts/insert-page-content.js`
- `scripts/overwrite-cms-text.js`
- `scripts/migrate-media.js`

The scripts have already run by then, so you can also delete them.

## 5. Check

- `npm run check:parity -- https://lmsdomain.com` reports 0 partial and 0 from code.
- The admin lists show no "(live site – retire after launch)" entries as active.
