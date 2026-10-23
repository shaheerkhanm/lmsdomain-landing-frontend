# Backend gaps (starting list, from the prompt 00 audit)

Written from `results/00/00-audit.md` (commit `ea7ee08`) by comparing what the backend has with what the new pages need. Antigravity copies this into `docs/multipage/backend-gaps.md` and keeps it up to date. Each row is either something to add in the backend, or content to enter in the admin.

**Type:** **Field** means a backend developer adds a field or model. **Content** means someone enters it in the admin; no code needed.

> **CMS entries cannot be created in the admin.** Admin > CMS only edits entries that already exist (`controllers/admin/cms.ts` updates by slug, no create/upsert). New entries come from the backend seed (`seeder/cms.ts`, `$setOnInsert`, safe to re-run on its own). The public `POST /api/cms` accepts any slug present in the `cms` collection with `isActive: true` and `isDeleted ≠ true`; other slugs return 422 "Slug is not valid" and the frontend falls back.
>
> Seeded today: `home-hero`, `home-graph-section`, `home-teach-smarter`, `customers`, `features`, `results`, `testimonials`, `cta`, `pricing-hero`, `pricing-faq`, `pricing-footer-card`, `features-hero`, `features-content`, `about-hero`, `about-mission`, `about-values`, `about-story`, `about-leadership`, `about-mission-card`, `mail-options`, `address`, `footer`.
>
> **Requested by the frontend but not seeded** (a backend developer must add them to the seed before anyone can fill them in): `pricing-empty`, `contact-hero`, `contact-form`, `ai-hero`, `ai-availability`, `ai-cta`, `ai-how-it-works`, `auth-copy`, `features-cta`, `features-media`, `privacy-policy`, `terms`, `refund-policy`, `dpa`. Rows below that say "CMS entry … in Admin > CMS" for these slugs need that seed entry first.
>
> **Do not run the full `npm run seed` on a live server:** `displayOrderSetup` resets every pricing plan's and feature's `displayOrder` to creation order, and the `seo` / `template` seeds `insertMany` without checks (duplicates). Run only the CMS seed.
>
> **Security:** `seeder/cms.ts` (`mail-options`) contains an SMTP / SendGrid API key in the backend repository. Rotate that key and load it from env instead.

> **Phase B done (backend `7b55b86`…`f3f0f8d`; frontend `bb728e9`, `cdbb6e4`):** every section of home, features, Domie AI, contact, pricing (empty state, comparison and FAQ headings, closing band), about (closing band) and login/signup is edited in Admin > <page> > Cms, with lists and media in a "Section content" form. Settings > App links holds the app login/signup/forgot-password URLs. Admin > SEO has Add, delete, share image and noindex for every page. `npm run check:parity` lists any section still rendered from built-in text. Kept in code by decision: the four legal pages, navigation and footer link labels, form validation messages, accessibility labels, and the text inside UI illustrations (mock app screens). Until launch the live site shares the database: where both sites need a section the new site reads its own `site-<slug>` copy and nothing the live site reads is changed. See [launch-cleanup.md](launch-cleanup.md).

> **Phase A done (backend `12759fa`, `38dec8e`; frontend `be65072`):** the pricing comparison table (Admin > Pricing > Comparison), the /features catalog (Admin > Features > Categories and Items (new site)), the "Built for How You Teach" tabs (Features > Audiences) and Seamless Integrations (Features > Integrations) are edited in the admin. The frontend falls back to the code data (`content/features/*.ts`) when the API is empty or unreachable. The live site's Features list (`/api/features`) is a separate collection and is unchanged. Rows below about feature categories, premium flags and the feature list are covered by this for the new site.

## Must have before the page can go live

| Page | What's missing | Type | Detail |
|---|---|---|---|
| Pricing | Plans | Content | The `pricings` collection has **0 documents**. Enter your real plans in Admin > Pricing. Nothing can be shown until then. |
| Pricing | Currency per plan | Field | **Must have before selling in more than one currency.** Add `currency` (ISO 4217 code, e.g. `INR`, `USD`) to each Pricing plan, optionally `locale` (e.g. `en-IN`). Until then every plan uses server env `PRICING_CURRENCY`, else `INR`, formatted with `Intl.NumberFormat` (`en-IN` for INR, `en-US` otherwise). |
| Pricing | Popular plan | Field (done in backend `c8ba6ab`, branch `devops`, not deployed) | `isPopular: Boolean` (default false) on Pricing, a "Most popular" checkbox on the admin create/edit forms; saving one plan as popular clears it on the others. Until that is deployed, server env `PRICING_POPULAR_PLAN` highlights a plan by name; the backend flag always wins. |
| Pricing | Custom / contact plan | Field | `isCustom: boolean` on Pricing. A plan shows "Custom" instead of a price only when `isCustom` is true or `buttonAction` is `contact`; a missing price never turns into "Custom". |
| Pricing | Yearly pricing | Done (no change needed) | Yearly prices are derived exactly as on the live site: `price × 12 × (1 − discount/100)`, from the existing `discount` field (Number, %), rounded to whole units. The ×12 price is shown struck through with "Save X%" when `discount` > 0. `price_yearly` exists in the model but, as on the live site, is not used. Plans without `discount` (or 0) show the ×12 total alone. |
| Pricing | Empty state copy | Content | CMS entry `pricing-empty` (`title`, `subTitle`, `buttonText`, `buttonAction`) for customizing the empty state when 0 plans are published. |
| Pricing | Hero copy | Content | CMS entry `pricing-hero` (`title`, `subTitle`, `tags` = eyebrow) to customize pricing hero. |
| Pricing | Enterprise band copy | Content | CMS entry `pricing-enterprise` (`title`, `subTitle`, `buttonText`, `buttonAction`) to customize the enterprise tier card. |
| Features | Category | Field | Add `category` (one of the 9 from features-catalog.md) and `categoryOrder` to Features, or a separate Feature Category model with `title`, `slug`, `description`, `displayOrder`. *(Current: frontend uses `content/features/catalog.ts` with single-function seam `resolveFeatureCategories()` in `lib/api/content.ts`)* |
| Features | Premium flag | Field | `isPremium: boolean` on Features. *(Current: typed in `content/features/catalog.ts`)* |
| Features | Feature list | Content | Enter the 38 features from features-catalog.md in Admin > Features (title = name, subTitle = description). *(Current: stored and validated in `content/features/catalog.ts`)* |
| Domie AI page | AI tools | Content | The 4 AI tools are entered as Features with category "AI Tools" and `isPremium: true`, so no new model is needed once the two fields above exist. |
| Domie AI page | Page copy | Content | New CMS entries: `ai-hero` (title, subTitle, buttonText, buttonAction, tags = command-bar example queries), `ai-availability`, `ai-cta`, `ai-how-it-works` (title, counts = steps with title and description). |
| SEO | Missing pages | Content | `seos` has only home, pricing, features, about. Add `ai`, `contact`, `privacy-policy`, `terms`, `refund-policy`, `dpa`. |
| SEO | Share image | Field | `ogImage` (image) on Seo. Until it exists, pages share without a picture. |
| Contact page | Page copy | Content | New CMS entry `contact-hero` (title, subTitle) and `contact-form` (buttonText, success title and message). Email, phone and address already come from `address`. |
| Contact | Real phone number | Content | The CMS entry `address` currently contains placeholder phone `1234567890`. The frontend filters out placeholder phone numbers. Enter the real contact phone number in Admin > Settings > Address. |
| About | Licensed Hero Photo | Content | The CMS entry `about-hero` currently contains an unlicensed Unsplash+ watermarked preview (`/uploads/upload1759252684970.jpeg`). Replace with a licensed high-res photograph in Admin > CMS. Frontend guards with `ABOUT_HERO_IMAGE_APPROVED = false` in `content/about/page.ts` until replaced. |
| Login / Signup | App auth links | Field | Add `appLoginUrl`, `appSignupUrl`, `appForgotPasswordUrl` to admin Settings (the `address` settings document read by `getSiteSettings()`). Until then `getAppAuthUrls()` falls back to server env `APP_LOGIN_URL` / `APP_SIGNUP_URL` / `APP_FORGOT_PASSWORD_URL`; with neither set, the buttons are disabled. |

## Can wait (the page works without it; that part is hidden)

| Page | What's missing | Type | Detail |
|---|---|---|---|
| Legal pages | CMS Legal Content Model | Content | The four legal pages (`/privacy-policy`, `/terms`, `/refund-policy`, `/dpa`) use approved, word-for-word legal text stored in `content/legal/`. If entries for these slugs are created in Admin > CMS with rich content, `getLegalPage` will use the CMS content; until then, the repo's original text serves as the production source of truth. |
| Navigation | Menu / Nav links | Field | No menu model in backend. Links are currently configured statically in `content/navigation.ts`. Add a Menu/Navigation model (`title`, `href`, `order`, `location`: `header` \| `footer`) if dynamic menu editing in admin is desired. |
| Features | Individual Feature Detail Route | Field | No per-feature detail model or slug endpoint in backend (e.g. `/features/[slug]`). All feature info currently resides in the main Features collection. Skipped dynamic slug routes until detail endpoint exists. |
| FAQ | Which page a question belongs to | Field | `faqs` is used only for pricing. Add `page` (`home`, `pricing`, `ai`, `features`, `contact`) and `displayOrder`, so every page can have its own FAQ. |
| Homepage FAQ | Questions | Content | The homepage FAQ is hard-coded in `content/home/faq.ts`. Once `page` exists, enter those questions with `page = home`. |
| Pricing | Plan limits | Field | Only `max_users` exists. If you want more limits on the cards (courses, storage, admins), add `limits: [{ label, value }]`. |
| Pricing | Per-currency prices | Field | Optional, for regional pricing: a price per currency on each plan (e.g. `prices: [{ currency, monthly, yearly }]`). The frontend resolves currency in one place (`resolvePlanCurrency` in `lib/api/content.ts`), ready to pick the visitor's currency once this exists. |
| Pricing | Yearly savings label | Field | The "Save 20%" pill was hard-coded and is now hidden. Add a field for it (e.g. on a pricing settings entry) if you want it shown; the existing per-plan `discount` is not used. |
| Pricing | Comparison table | Field | No model. Either a `pricing-comparison` model (`group`, `label`, one value per plan) or skip the table. |
| Pricing | Add-ons (e.g. AI as a premium add-on) | Field | No model. Needed only if AI is sold as an add-on, not inside a plan. |
| Features | Icon | Field | Features has `image` but no small icon. Add `icon` (image) or reuse `image`. |
| About | Timeline, stats | Field | Not in the backend; those sections stay hidden. |
| Contact | Dedicated Contact Fields | Field | The Enquiry backend currently receives name, email, phoneNumber, organizationName, subject, type (1). Form topic and pricing plan are bundled into `subject`. Add dedicated topic / plan fields to Enquiry model if separate column indexing is desired. |
| Images | Alt text | Field | Most models have `altImage`; `cms` image1–3 have `altImage1–3`. Pricing has none (fine, no images). |
| Features | Product Tour Video URL | Field | CMS field `features-hero.videoUrl` for optional "Watch a product tour" modal button in the hero. Currently omitted until a real tour video URL is configured in the admin. |
| Features | Media Slots | Field | Add `features-media` CMS slug with slot upload fields (one entry per slot) so marketing photos and demo video loops can be updated from Admin without code changes. |

## Data to check before it shows anywhere

- **Footer / `address` settings** (Admin > Settings > Address; feeds the footer email, phone and social icons on every page): `fb`, `instagram` and `linkedin` are `https://facebook/lmsdomain`, `https://instagram/lmsdomain`, `https://linkedin/lmsdomain`. These have no `.com`, so the footer icons link to dead addresses. Enter full profile URLs (e.g. `https://www.facebook.com/<page>`). `twitter` = `@LMSDOMAIN` works (it becomes `https://x.com/LMSDOMAIN`). `phone` = `1234567890` is a placeholder and stays hidden until replaced. `email` = `Info@lmsdomain.com.sa` is shown; confirm it is the right address.
- **`footer` CMS entry** `content` is Lorem ipsum. The footer detects it and shows the built-in description instead; replace it in Admin > CMS if you want custom text.
- **`pricing-hero`** subtitle is **Lorem ipsum** ("Lorem ipsum dolor sit amet consectetur…") and is live on `/pricing` at every width (seen in the QA screenshots). Replace it in Admin > CMS.
- **SEO titles** are placeholders: `home` = `lms-domain`, `pricing` = `lms-domain-pricing`, `about` = `lms-domain-about`, `features` = `lms-domain-features`, with placeholder descriptions (`lms domain description`). These become the browser tab and search titles. Enter real titles in Admin > SEO.
- **`about` mission statement** claims "helped over 10,000 educators reach millions of learners worldwide" and "10K+". Confirm these are true before launch, or edit the CMS entry.
- **`home-graph-section`** says "10+" and "25+ countries served". The homepage ignores it today. Don't use these numbers on any page unless they're true.
- **`smartteaches`** has 2 test entries (`SmartTechTest`, `Smart Automation`). Delete or replace them before anything reads that list.
- **`customers`, `homefeatures`, `clients`, `testimonials`** are empty. The homepage Wall of Love reads `/api/home/testimonials` (`customerName`, `customerProfession`, `comment`, `image`) and is hidden until at least one active testimonial exists. Demo cards (`content/home/sample-testimonials.ts`) appear only with `CMS_USE_FIXTURES=true` in local preview.
- **Enquiry:** empty name and phone in the admin are expected for type 2 (the email-only CTA form). Type 1 (Request Demo) saves name, organization, phone, email and subject. Not a bug.

