# Open Issues & Product Disclosures

**Date:** 2026-10-18  
**Branch:** `feature/redesign-v2`  
**Status:** IN PROGRESS — Content & Feature Realignment (Do not mark verified)

---

## 1. Testimonial Placeholders (Wall of Love)

In strict adherence to specification §6.2:
- All previously generated individual names have been removed across `CustomerSection.tsx` and `StackedAcademyDeck.tsx`.
- All invented learner metrics and absolute claims have been eradicated.
- The misleading "VERIFIED" badge has been completely removed from all cards.
- Cards render clean, designated partner spotlight capability statements:
  - **Card 1:** "Enterprise Academy Spotlight" / "Partner Case Study Placeholder"
  - **Card 2:** "Professional Training Spotlight" / "Clinical & Continuing Ed Placeholder"
  - **Card 3:** "Global Academy Spotlight" / "Global Learning Platform Showcase"

**Action Required Prior to Production Deployment:**
Replace placeholder cards with real, consented client quotes, verified enterprise logos, and authorized case studies once customer marketing agreements are formally executed.

---

## 2. Real Capabilities Alignment (Owner's Feature List)

The landing page content has been strictly realigned to the owner's approved capability catalogue. All unsupported technical claims have been completely removed from the codebase:

### Eradicated Claims (Zero-Hit Verified in `components/`, `content/`, and `app/`):
- Hardware DRM, Widevine, FairPlay, L1, TEE, DRM Shield
- SSO, SAML, Okta
- SCORM, SCORM 2004
- 4K, Adaptive HLS, WebRTC
- Forensic watermarking, IP address watermarks (e.g. 192.168.1.104)
- Single-tenant, isolated tenant, Sovereign
- Google Meet, Vimeo
- Domie AI v2.4 Engine, 1,228 assets indexed, in seconds
- Syllabus / syllabi, Generate Syllabus, curriculum generation
- Auto-graded AI quizzes (Domie only drafts titles, descriptions, and learning outcomes)
- AI translation (multi-language platform supported, but AI does not translate)

### Approved Platform Feature Set in Production Build:
1. **Learning experience:** structured courses (video, text, PDF, document lessons), watermarked video, device limits, drip content, assignments and quizzes, certificates (configurable design), course forum, achievements and points.
2. **Premium learning tools:** in-video checkpoint quizzes, leaderboard and points, watch-percentage completion, lesson lock help drawer.
3. **AI add-ons (premium):** HelpDesk AI tutor, AI prescriptive analytics, Domie AI content generator, AI command bar.
4. **Live and cohort learning:** live classes with Zoom, bootcamps, tutor booking, team training.
5. **Selling and payments:** catalogue/cart/wishlist, coupons, Stripe/Razorpay/Paytm/DOKU, offline payments, multi-currency and multi-language, instructor payouts and revenue reports.
6. **Admins and instructors:** roles and permissions, ebooks, blogs/newsletter/knowledge base, messages and contacts, email and SMS notifications, custom domain with SSL.
7. **Brand and reach:** home page builder, SEO settings, per-school branding.

---

## 3. Pending Information from Owner

The following items remain pending owner feedback:
1. Revenue-share terms and pricing structure.
2. Official onboarding timeframe benchmarks.
