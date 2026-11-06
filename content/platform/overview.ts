export interface PlatformOverviewPillar {
  slug: string;
  href: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: string;
}

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
      "Graded quizzes, written assignments with private review, in-video checkpoints, and verifiable PDF certificates.",
    icon: "CheckSquare",
  },
  {
    slug: "manage",
    href: "/platform/manage",
    title: "Manage",
    tagline: "Know every batch, learner and class at a glance.",
    description:
      "Batch rosters, student progress records, attendance logs, role-based access control, and automated SMS alerts.",
    icon: "CalendarRange",
  },
  {
    slug: "sell",
    href: "/platform/sell",
    title: "Sell",
    tagline: "Collect fees in any currency, on your own checkout.",
    description:
      "Online course cart, coupons, Stripe, Razorpay, Paytm and DOKU, multi-currency support, and instructor payouts.",
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
      "Video watermarking stamps, device sign-in limits, role-based access control, secure AWS cloud hosting, and transparent DPA.",
    icon: "ShieldCheck",
  },
];
