# Backend gaps (starting list, from the prompt 00 audit)

Written from `results/00/00-audit.md` (commit `ea7ee08`) by comparing what the backend has with what the new pages need. Antigravity copies this into `docs/multipage/backend-gaps.md` and keeps it up to date. Each row is either something to add in the backend, or content to enter in the admin.

**Type:** **Field** means a backend developer adds a field or model. **Content** means someone enters it in the admin; no code needed.

## Must have before the page can go live

| Page | What's missing | Type | Detail |
|---|---|---|---|
| Pricing | Plans | Content | The `pricings` collection has **0 documents**. Enter your real plans in Admin > Pricing. Nothing can be shown until then. |
| Pricing | Currency | Field | Add `currency` (e.g. `USD`, `INR`, `SAR`) to Pricing, or one site-wide currency setting. Today nothing says what `price` is in. |
| Pricing | Popular plan | Field | `isPopular: boolean` on Pricing. |
| Pricing | Yearly pricing / Billing periods | Field | Add `price_yearly: number` or billingPeriods to Pricing model. Today only `price` exists, with no field for annual billing rates or savings. |
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

## Can wait (the page works without it; that part is hidden)

| Page | What's missing | Type | Detail |
|---|---|---|---|
| Navigation | Menu / Nav links | Field | No menu model in backend. Links are currently configured statically in `content/navigation.ts`. Add a Menu/Navigation model (`title`, `href`, `order`, `location`: `header` \| `footer`) if dynamic menu editing in admin is desired. |
| Features | Individual Feature Detail Route | Field | No per-feature detail model or slug endpoint in backend (e.g. `/features/[slug]`). All feature info currently resides in the main Features collection. Skipped dynamic slug routes until detail endpoint exists. |
| FAQ | Which page a question belongs to | Field | `faqs` is used only for pricing. Add `page` (`home`, `pricing`, `ai`, `features`, `contact`) and `displayOrder`, so every page can have its own FAQ. |
| Homepage FAQ | Questions | Content | The homepage FAQ is hard-coded in `content/home/faq.ts`. Once `page` exists, enter those questions with `page = home`. |
| Pricing | Plan limits | Field | Only `max_users` exists. If you want more limits on the cards (courses, storage, admins), add `limits: [{ label, value }]`. |
| Pricing | Comparison table | Field | No model. Either a `pricing-comparison` model (`group`, `label`, one value per plan) or skip the table. |
| Pricing | Add-ons (e.g. AI as a premium add-on) | Field | No model. Needed only if AI is sold as an add-on, not inside a plan. |
| Features | Icon | Field | Features has `image` but no small icon. Add `icon` (image) or reuse `image`. |
| About | Timeline, stats | Field | Not in the backend; those sections stay hidden. |
| Legal pages | Legal text in the admin | Field | Privacy, Terms, Refund and DPA are hard-coded components today. Keep them as they are for now (same text, same URLs, new layout). Move them into a `legal` model (`slug`, `title`, `lastUpdated`, `content`) later if you want to edit them in the admin. |
| Images | Alt text | Field | Most models have `altImage`; `cms` image1–3 have `altImage1–3`. Pricing has none (fine, no images). |
| Features | Product Tour Video URL | Field | CMS field `features-hero.videoUrl` for optional "Watch a product tour" modal button in the hero. Currently omitted until a real tour video URL is configured in the admin. |
| Features | Media Slots | Field | Add `features-media` CMS slug with slot upload fields (one entry per slot) so marketing photos and demo video loops can be updated from Admin without code changes. |

## Data to check before it shows anywhere

- **`home-graph-section`** says "10+" and "25+ countries served". The homepage ignores it today. Don't use these numbers on any page unless they're true.
- **`smartteaches`** has 2 test entries (`SmartTechTest`, `Smart Automation`). Delete or replace them before anything reads that list.
- **`customers`, `homefeatures`, `clients`, `testimonials`** are empty, so the homepage Wall of Love is still placeholder cards from `content/home/testimonials.ts`.
- **Enquiry:** empty name and phone in the admin are expected for type 2 (the email-only CTA form). Type 1 (Request Demo) saves name, organization, phone, email and subject. Not a bug.

