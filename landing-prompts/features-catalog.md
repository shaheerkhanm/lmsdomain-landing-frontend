# LMS Domain feature catalogue (source of truth)

From Shaheer's Features page spec, 2026-10-21. It replaces the 2026-10-18 list: same features, edited names and descriptions, and this category order. Use these names on every page (Features, Domie AI, Pricing, homepage).

**AI is the headline.** On the Features page the AI category gets its own spotlight section right after the overview. It also has its own page (`/ai`, Prompt 01b).

**Premium:** shown with a "Premium" label. Never imply that premium items are in every plan.

## 1. Course Learning

| Feature | Description |
|---|---|
| Structured Courses | Organize learning into sections and lessons with support for video, text, PDFs, and document-based learning materials. |
| Video Watermarking | Discourage unauthorized video sharing with watermarks displayed on learning videos. |
| Scheduled Content Release | Release lessons according to a schedule, allowing learners to progress through courses at the intended pace. |
| Learner Device Limits | Limit the number of devices a learner can use to sign in, helping institutions manage account sharing. |
| Course Certificates | Issue certificates when learners meet course-completion requirements, with configurable certificate designs. |
| Achievements and Points | Reward learning progress with achievements and points to encourage continued participation. |
| Course Discussion Forums | Give learners a dedicated discussion space for questions, answers, and course-related conversations. |

## 2. Assessment and Evaluation

| Feature | Description |
|---|---|
| Graded Quizzes | Create course quizzes to assess learners' understanding and measure learning outcomes. |
| Assignments and Instructor Reviews | Allow learners to submit assignments and instructors to review their work and provide feedback. |
| In-Video Checkpoint Quizzes (Premium) | Insert questions at specific points in a video. Playback pauses until learners answer the checkpoint question and continue. |

## 3. Learner Engagement (Premium)

| Feature | Description |
|---|---|
| Leaderboards and Points | Show rankings based on learner progress and points to encourage participation and healthy competition. |
| Watch-Percentage Completion | Mark a video lesson as complete after the learner watches the configured percentage of its duration. |
| Lesson Lock Help Drawer | Provide a contextual help panel for learners who encounter a locked lesson, helping them understand what they need to do next. |

## 4. AI-Powered Tools (Premium)

| Feature | Audience | Description |
|---|---|---|
| HelpDesk AI Tutor | Learners | Help learners ask questions about their course materials and receive answers grounded in the content of their own courses. Save conversations and maintain separate chat histories for each course. |
| AI Prescriptive Analytics | Administrators | Provide administrators with concise insights and alerts about areas requiring attention, such as declining enrolments, expiring coupons, and low course engagement. |
| Domie AI Content Generator | Course creators | Help course creators draft course titles, descriptions, and learning outcomes with AI assistance. |
| AI Command Bar | Administrators | Provide a unified search interface across administrative pages, with AI-assisted answers to questions about the platform. |

## 5. Live and Cohort Learning

| Feature | Description |
|---|---|
| Live Classes with Zoom | Schedule live classes using Zoom and make session recordings available where supported. |
| Cohort-Based Bootcamps | Organize learners into cohorts with structured programmes and recurring live classes. |
| One-to-One Tutor Booking | Allow learners to book individual sessions with tutors. |
| Team Training Packages | Enable organizations to purchase and manage training packages for their teams. |

## 6. Course Sales and Payments

| Feature | Description |
|---|---|
| Course Catalogue, Cart, and Wishlist | Let learners discover courses, save courses to a wishlist, add courses to a cart, and purchase them. |
| Coupons and Discounts | Create percentage-based or fixed-value discount codes, with controls for managing their status. |
| Multiple Payment Gateways | Support Stripe, Razorpay, Paytm, and DOKU for course payment processing, subject to the applicable configuration and availability. |
| Offline Payment Management | Allow administrators to record and approve offline payments, including bank transfers. |
| Multiple Currencies and Languages | Support learning and selling experiences in multiple currencies and languages, according to the platform's configuration. |
| Instructor Payouts and Revenue Reports | Give instructors visibility into their earnings and provide administrators with revenue reports by course and reporting period. |

## 7. Content Publishing and Digital Products

| Feature | Description |
|---|---|
| Ebooks and Digital Books | Publish and sell digital books alongside online courses. |
| Blog Publishing | Publish articles and provide a review step for posts awaiting approval, where supported by the publishing workflow. |
| Newsletters | Support newsletter publishing and communication with subscribers. |
| Knowledge Base | Create self-service help articles that learners and customers can consult when they need assistance. |

## 8. Administration and Communication

| Feature | Description |
|---|---|
| Role-Based Access Control | Assign administrative roles and permissions so each administrator can access only the sections authorized for them. |
| Messages and Contact Management | Manage learner messages through an inbox and maintain a contact list. |
| Email and SMS Notifications | Configure email templates and support SMS notifications for relevant platform communications. |

## 9. Branding, Website, and Reach

| Feature | Description |
|---|---|
| Custom Domain with SSL | Allow an institution to use its own domain for its academy with SSL protection. Domain setup requires the appropriate DNS configuration. |
| Homepage Builder | Create and manage the public-facing academy homepage without requiring a developer for every content change. |
| SEO Management | Configure page titles, meta descriptions, and social-sharing metadata to improve how pages are presented in search results and when shared. |
| Per-School Branding | Customize the logo, colors, and platform name for each school to create a branded learning experience. |

38 features in total. Integrations named: Zoom, Stripe, Razorpay, Paytm, DOKU (show as text unless approved logos exist in the repo).

## Homepage claims that are NOT in this list

The current homepage build (`feature/redesign-v2`) says things this list doesn't include. Unless Shaheer confirms them, they should be reworded or removed:

| Current homepage claim | Closest real feature |
|---|---|
| Hardware L1 DRM, Widevine L1 + FairPlay | Watermarked video + device limits |
| Dynamic forensic watermarking (learner ID, IP hash) | Watermarked video |
| Enterprise SSO (SAML / OIDC) | Not listed |
| SCORM 2004 | Not listed |
| 4K transcoding, adaptive HLS | Not listed (video lessons only) |
| WebRTC live classrooms, breakout pods | Live classes with Zoom |
| Domie AI multi-week curriculum / syllabus generation | Domie AI content generator: titles, descriptions and outcomes |
| Translation into many languages | Multi-language platform (not AI translation) |
