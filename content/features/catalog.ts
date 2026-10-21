import { FeatureCategory } from "@/types/content";

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    slug: "course-learning",
    title: "Course Learning",
    eyebrow: "Course Learning",
    intro:
      "Build structured curriculums with flexible content formats, scheduled content release, and verifiable completion certificates.",
    order: 1,
    features: [
      {
        slug: "structured-courses",
        title: "Structured Courses",
        description:
          "Organize learning into sections and lessons with support for video, text, PDFs, and document-based learning materials.",
        icon: "BookOpen",
      },
      {
        slug: "video-watermarking",
        title: "Video Watermarking",
        description:
          "Discourage unauthorized video sharing with watermarks displayed on learning videos.",
        icon: "ShieldAlert",
      },
      {
        slug: "scheduled-content-release",
        title: "Scheduled Content Release",
        description:
          "Release lessons according to a schedule, allowing learners to progress through courses at the intended pace.",
        icon: "CalendarClock",
      },
      {
        slug: "learner-device-limits",
        title: "Learner Device Limits",
        description:
          "Limit the number of devices a learner can use to sign in, helping institutions manage account sharing.",
        icon: "Smartphone",
      },
      {
        slug: "course-certificates",
        title: "Course Certificates",
        description:
          "Issue certificates when learners meet course-completion requirements, with configurable certificate designs.",
        icon: "Award",
      },
      {
        slug: "achievements-and-points",
        title: "Achievements and Points",
        description:
          "Reward learning progress with achievements and points to encourage continued participation.",
        icon: "Medal",
      },
      {
        slug: "course-discussion-forums",
        title: "Course Discussion Forums",
        description:
          "Give learners a dedicated discussion space for questions, answers, and course-related conversations.",
        icon: "MessagesSquare",
      },
    ],
  },
  {
    slug: "assessment-and-evaluation",
    title: "Assessment and Evaluation",
    eyebrow: "Assessment and Evaluation",
    intro:
      "Measure learner understanding through automated quizzes, instructor assignment reviews, and interactive video checkpoints.",
    order: 2,
    features: [
      {
        slug: "graded-quizzes",
        title: "Graded Quizzes",
        description:
          "Create course quizzes to assess learners' understanding and measure learning outcomes.",
        icon: "CheckSquare",
      },
      {
        slug: "assignments-and-instructor-reviews",
        title: "Assignments and Instructor Reviews",
        description:
          "Allow learners to submit assignments and instructors to review their work and provide feedback.",
        icon: "FileSignature",
      },
      {
        slug: "in-video-checkpoint-quizzes",
        title: "In-Video Checkpoint Quizzes",
        description:
          "Insert questions at specific points in a video. Playback pauses until learners answer the checkpoint question and continue.",
        isPremium: true,
        icon: "PlayCircle",
      },
    ],
  },
  {
    slug: "learner-engagement",
    title: "Learner Engagement",
    eyebrow: "Learner Engagement",
    intro:
      "Drive course completion with gamified rankings, verified watch thresholds, and in-context lesson assistance.",
    isPremium: true,
    order: 3,
    features: [
      {
        slug: "leaderboards-and-points",
        title: "Leaderboards and Points",
        description:
          "Show rankings based on learner progress and points to encourage participation and healthy competition.",
        isPremium: true,
        icon: "Trophy",
      },
      {
        slug: "watch-percentage-completion",
        title: "Watch-Percentage Completion",
        description:
          "Mark a video lesson as complete after the learner watches the configured percentage of its duration.",
        isPremium: true,
        icon: "Timer",
      },
      {
        slug: "lesson-lock-help-drawer",
        title: "Lesson Lock Help Drawer",
        description:
          "Provide a contextual help panel for learners who encounter a locked lesson, helping them understand what they need to do next.",
        isPremium: true,
        icon: "HelpCircle",
      },
    ],
  },
  {
    slug: "ai-powered-tools",
    title: "AI-Powered Tools",
    eyebrow: "Domie AI",
    intro:
      "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.",
    isPremium: true,
    order: 4,
    features: [
      {
        slug: "helpdesk-ai-tutor",
        title: "HelpDesk AI Tutor",
        audience: "For learners",
        description:
          "Help learners ask questions about their course materials and receive answers grounded in the content of their own courses. Save conversations and maintain separate chat histories for each course.",
        isPremium: true,
        icon: "Bot",
      },
      {
        slug: "domie-ai-content-generator",
        title: "Domie AI Content Generator",
        audience: "For course creators",
        description:
          "Help course creators draft course titles, descriptions, and learning outcomes with AI assistance.",
        isPremium: true,
        icon: "Sparkles",
      },
      {
        slug: "ai-prescriptive-analytics",
        title: "AI Prescriptive Analytics",
        audience: "For administrators",
        description:
          "Provide administrators with concise insights and alerts about areas requiring attention, such as declining enrolments, expiring coupons, and low course engagement.",
        isPremium: true,
        icon: "LineChart",
      },
      {
        slug: "ai-command-bar",
        title: "AI Command Bar",
        audience: "For administrators",
        description:
          "Provide a unified search interface across administrative pages, with AI-assisted answers to questions about the platform.",
        isPremium: true,
        icon: "Command",
      },
    ],
  },
  {
    slug: "live-and-cohort-learning",
    title: "Live and Cohort Learning",
    eyebrow: "Live and Cohort Learning",
    intro:
      "Host live sessions, manage structured cohorts, provide 1-on-1 tutoring, and deliver team training packages.",
    order: 5,
    features: [
      {
        slug: "live-classes-with-zoom",
        title: "Live Classes with Zoom",
        description:
          "Schedule live classes using Zoom and make session recordings available where supported.",
        icon: "Video",
      },
      {
        slug: "cohort-based-bootcamps",
        title: "Cohort-Based Bootcamps",
        description:
          "Organize learners into cohorts with structured programmes and recurring live classes.",
        icon: "Users2",
      },
      {
        slug: "one-to-one-tutor-booking",
        title: "One-to-One Tutor Booking",
        description:
          "Allow learners to book individual sessions with tutors.",
        icon: "UserCheck",
      },
      {
        slug: "team-training-packages",
        title: "Team Training Packages",
        description:
          "Enable organizations to purchase and manage training packages for their teams.",
        icon: "Building2",
      },
    ],
  },
  {
    slug: "course-sales-and-payments",
    title: "Course Sales and Payments",
    eyebrow: "Course Sales and Payments",
    intro:
      "Monetize courses globally with flexible storefronts, promotional coupons, regional payment gateways, and transparent instructor payouts.",
    order: 6,
    features: [
      {
        slug: "course-catalogue-cart-and-wishlist",
        title: "Course Catalogue, Cart, and Wishlist",
        description:
          "Let learners discover courses, save courses to a wishlist, add courses to a cart, and purchase them.",
        icon: "ShoppingCart",
      },
      {
        slug: "coupons-and-discounts",
        title: "Coupons and Discounts",
        description:
          "Create percentage-based or fixed-value discount codes, with controls for managing their status.",
        icon: "Percent",
      },
      {
        slug: "multiple-payment-gateways",
        title: "Multiple Payment Gateways",
        description:
          "Support Stripe, Razorpay, Paytm, and DOKU for course payment processing, subject to the applicable configuration and availability.",
        icon: "CreditCard",
      },
      {
        slug: "offline-payment-management",
        title: "Offline Payment Management",
        description:
          "Allow administrators to record and approve offline payments, including bank transfers.",
        icon: "Receipt",
      },
      {
        slug: "multiple-currencies-and-languages",
        title: "Multiple Currencies and Languages",
        description:
          "Support learning and selling experiences in multiple currencies and languages, according to the platform's configuration.",
        icon: "Globe2",
      },
      {
        slug: "instructor-payouts-and-revenue-reports",
        title: "Instructor Payouts and Revenue Reports",
        description:
          "Give instructors visibility into their earnings and provide administrators with revenue reports by course and reporting period.",
        icon: "TrendingUp",
      },
    ],
  },
  {
    slug: "content-publishing-and-digital-products",
    title: "Content Publishing and Digital Products",
    eyebrow: "Content Publishing and Digital Products",
    intro:
      "Diversify academy revenue with downloadable digital publications, blogs, newsletter campaigns, and help centre articles.",
    order: 7,
    features: [
      {
        slug: "ebooks-and-digital-books",
        title: "Ebooks and Digital Books",
        description:
          "Publish and sell digital books alongside online courses.",
        icon: "BookMarked",
      },
      {
        slug: "blog-publishing",
        title: "Blog Publishing",
        description:
          "Publish articles and provide a review step for posts awaiting approval, where supported by the publishing workflow.",
        icon: "FileEdit",
      },
      {
        slug: "newsletters",
        title: "Newsletters",
        description:
          "Support newsletter publishing and communication with subscribers.",
        icon: "Mail",
      },
      {
        slug: "knowledge-base",
        title: "Knowledge Base",
        description:
          "Create self-service help articles that learners and customers can consult when they need assistance.",
        icon: "BookOpenCheck",
      },
    ],
  },
  {
    slug: "administration-and-communication",
    title: "Administration and Communication",
    eyebrow: "Administration and Communication",
    intro:
      "Maintain operational control with granular staff roles, a consolidated messaging inbox, and automated notifications.",
    order: 8,
    features: [
      {
        slug: "role-based-access-control",
        title: "Role-Based Access Control",
        description:
          "Assign administrative roles and permissions so each administrator can access only the sections authorized for them.",
        icon: "ShieldCheck",
      },
      {
        slug: "messages-and-contact-management",
        title: "Messages and Contact Management",
        description:
          "Manage learner messages through an inbox and maintain a contact list.",
        icon: "Inbox",
      },
      {
        slug: "email-and-sms-notifications",
        title: "Email and SMS Notifications",
        description:
          "Configure email templates and support SMS notifications for relevant platform communications.",
        icon: "Bell",
      },
    ],
  },
  {
    slug: "branding-website-and-reach",
    title: "Branding, Website, and Reach",
    eyebrow: "Branding, Website, and Reach",
    intro:
      "Deliver a seamless white-label brand with custom domain SSL, a visual homepage builder, per-school styling, and built-in SEO controls.",
    order: 9,
    features: [
      {
        slug: "custom-domain-with-ssl",
        title: "Custom Domain with SSL",
        description:
          "Allow an institution to use its own domain for its academy with SSL protection. Domain setup requires the appropriate DNS configuration.",
        icon: "Lock",
      },
      {
        slug: "homepage-builder",
        title: "Homepage Builder",
        description:
          "Create and manage the public-facing academy homepage without requiring a developer for every content change.",
        icon: "LayoutTemplate",
      },
      {
        slug: "seo-management",
        title: "SEO Management",
        description:
          "Configure page titles, meta descriptions, and social-sharing metadata to improve how pages are presented in search results and when shared.",
        icon: "Search",
      },
      {
        slug: "per-school-branding",
        title: "Per-School Branding",
        description:
          "Customize the logo, colors, and platform name for each school to create a branded learning experience.",
        icon: "Palette",
      },
    ],
  },
];

/**
 * Returns all 38 features as a flat array.
 */
export function getAllFeatures() {
  return FEATURE_CATEGORIES.flatMap((c) => c.features);
}

