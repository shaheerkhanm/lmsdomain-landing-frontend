export interface PlatformOverviewPillar {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: string;
}

export const platformOverviewSeo = {
  title: "All-in-One Academy Operating System | LMS Domain",
  description:
    "Explore LMS Domain's 7 pillars: courses, batches, Zoom live classes, assessments, multi-currency checkout, and course-grounded AI under your own brand.",
  heroAnswer:
    "LMS Domain is an online course platform and academy operating system built for Indian coaching institutes, test-prep academies, and training providers. Teach live batches on Zoom, host recorded curriculum with drip scheduling, conduct mock assessments, sell courses in INR with GST invoices, and issue branded PDF certificates on your own domain.",
};

export const platformOverviewPillars: PlatformOverviewPillar[] = [
  {
    slug: "teach",
    href: "/platform/teach",
    title: "Teach",
    tagline: "Teach recorded courses and live batches from one place.",
    description:
      "Structured video lessons, drip releases, Zoom live classes, cohort bootcamps, and 1:1 tutor bookings.",
    icon: "BookOpen",
  },
  {
    slug: "assess",
    href: "/platform/assess",
    title: "Assess",
    tagline: "Test learners and certify the ones who finish.",
    description:
      "Graded quizzes, written assignments with private review, in-video checkpoints, and branded completion certificates.",
    icon: "CheckSquare",
  },
  {
    slug: "manage",
    href: "/platform/manage",
    title: "Manage",
    tagline: "Know every batch, learner and class at a glance.",
    description:
      "Batch rosters, student progress records, attendance for every live class, role-based access control, and automated SMS alerts.",
    icon: "CalendarRange",
  },
  {
    slug: "sell",
    href: "/platform/sell",
    title: "Sell",
    tagline: "Collect fees in any currency, on your own checkout.",
    description:
      "Online course cart, coupons, Stripe, Razorpay, Paytm and DOKU, multi-currency checkout, and instructor payouts.",
    icon: "CreditCard",
  },
  {
    slug: "brand",
    href: "/platform/brand",
    title: "Brand",
    tagline: "Your academy, on your own domain.",
    description:
      "Custom domain with automated SSL, visual homepage builder, per-school brand themes, SEO tags, and blog publishing.",
    icon: "Globe2",
  },
  {
    slug: "ai",
    href: "/platform/ai",
    title: "Domie AI",
    badge: "Premium",
    tagline: "A teaching assistant grounded in your own courses.",
    description:
      "Course-grounded student tutor, curriculum metadata drafts, proactive operational analytics, and command bar shortcuts.",
    icon: "Sparkles",
  },
  {
    slug: "security",
    href: "/platform/security",
    title: "Security",
    tagline: "Protect your courses and your learners' data.",
    description:
      "Video watermarking stamps, device sign-in limits, role-based access control, and managed cloud hosting with HTTPS.",
    icon: "ShieldCheck",
  },
];

