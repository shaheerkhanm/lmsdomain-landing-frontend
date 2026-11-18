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
  title: "All-in-One LMS Platform for Academies & Course Creators | LMS Domain",
  description:
    "One platform to teach courses and live classes on Zoom, Google Meet or Teams, run tests, manage batches, sell in any currency and brand your academy on your own domain. 0% commission.",
  heroAnswer:
    "LMS Domain is an all-in-one learning platform for academies, coaching institutes and course creators. Teach recorded courses and live classes, run tests, manage batches and sell in any currency, all on your own domain.",
};

export const platformOverviewPillars: PlatformOverviewPillar[] = [
  {
    slug: "teach",
    href: "/platform/teach",
    title: "Teach",
    tagline: "Teach recorded courses and live batches from one place.",
    description:
      "Structured video lessons, drip releases, live classes on Zoom, Meet or Teams, cohort bootcamps, and 1:1 tutor bookings.",
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


/* ---------------------------------------------------------------------------
 * v5 overview page: one section per area of the platform.
 * Answer-first copy: the heading says what it does, the first sentence can be quoted alone.
 * Only claims that match the live product and pricing (plan-gated items noted in points).
 * ------------------------------------------------------------------------- */
export interface PlatformSectionV5 {
  slug: string;
  href: string;
  name: string;
  title: string;
  body: string;
  points: string[];
}

export const platformSectionsV5: PlatformSectionV5[] = [
  {
    slug: "teach",
    href: "/platform/teach",
    name: "Teach",
    title: "Teach recorded courses and live classes in one place",
    body: "Build courses from video, PDF and quiz lessons, release them on a schedule, and run live classes on Zoom, Google Meet or Teams for each batch.",
    points: [
      "Video, PDF and quiz lessons in modules",
      "Drip release by date or enrolment day",
      "Live classes on Zoom, Meet or Teams, with saved recordings",
      "Bootcamps and 1:1 tutor booking (Growth and up)",
    ],
  },
  {
    slug: "assess",
    href: "/platform/assess",
    name: "Assess",
    title: "Test learners and certify the ones who finish",
    body: "Create timed tests from your own question banks, review written assignments, and send certificates automatically when a learner completes a course.",
    points: [
      "Timed tests and mock exams from question banks",
      "Assignments with private teacher review",
      "Quiz checkpoints inside video lessons",
      "Branded PDF certificates on completion",
    ],
  },
  {
    slug: "manage",
    href: "/platform/manage",
    name: "Manage",
    title: "See every batch, learner and class at a glance",
    body: "Keep batch rosters, attendance and progress in one dashboard, give your team the right access, and remind learners before every class.",
    points: [
      "Batch rosters and learner progress",
      "Attendance logged automatically for live classes",
      "Admin and instructor roles",
      "Email reminders, plus SMS on Growth and up",
    ],
  },
  {
    slug: "sell",
    href: "/platform/sell",
    name: "Sell",
    title: "Sell courses in any currency, with 0% commission",
    body: "Take payments on your own checkout through Stripe, Razorpay, Paytm or DOKU. Money goes straight to your account and we never take a cut.",
    points: [
      "Stripe, Razorpay, Paytm and DOKU checkout",
      "Multi-currency prices and coupons",
      "Automatic GST invoices for Indian academies",
      "0% commission on every plan",
    ],
  },
  {
    slug: "brand",
    href: "/platform/brand",
    name: "Brand",
    title: "Run your academy on your own domain",
    body: "Launch a branded website for your academy with your own domain, free SSL, your colours and a homepage you can edit without code.",
    points: [
      "Your own domain with free SSL",
      "Homepage builder, no code needed",
      "Your logo, colours and fonts",
      "SEO settings and a built-in blog",
    ],
  },
  {
    slug: "security",
    href: "/platform/security",
    name: "Security",
    title: "Protect your courses and your learners' data",
    body: "Stop course sharing with DRM-encrypted video, learner watermarks and a screen-recording block in the apps, control who can see what, and keep everything on managed hosting with TLS encryption.",
    points: [
      "DRM video, watermarks and screen-recording block on every plan",
      "Learner device limits and single sign-on (Pro and up)",
      "Role-based access for your team",
      "Data export, DPDP and GDPR ready",
    ],
  },
];

export const platformAiSectionV5 = {
  href: "/platform/ai",
  name: "Domie AI",
  title: "An AI assistant that knows your courses",
  body: "Domie AI answers learner questions from your own lessons, drafts course descriptions for your team, and points out what needs your attention.",
  points: [
    "Answers learners using your course content",
    "Drafts course and lesson descriptions",
    "Highlights learners and batches that need attention",
  ],
  note: "Included in Pro with 5 million AI tokens a month, and in Enterprise.",
};

export const platformFaqsV5 = [
  {
    id: "what-is",
    question: "What is LMS Domain?",
    answer:
      "LMS Domain is an all-in-one learning platform for academies, coaching institutes and course creators. It lets you teach courses and live classes, run tests, manage batches and sell courses on your own branded website.",
  },
  {
    id: "who-for",
    question: "Who is LMS Domain for?",
    answer:
      "It is built for academies and training businesses that teach in batches or sell courses online, from solo educators to multi-branch institutes. It works for any subject, from coding and maths to languages and professional training.",
  },
  {
    id: "live-classes",
    question: "Can I run live classes?",
    answer: "Yes. You can schedule live classes on Zoom, Google Meet or Microsoft Teams for each batch. Learners join from your academy, and recordings are saved to the course.",
  },
  {
    id: "sell-currency",
    question: "Can I sell courses in my own currency?",
    answer:
      "Yes. You can sell in multiple currencies through Stripe, Razorpay, Paytm or DOKU. Payments go straight to your account, and LMS Domain charges 0% commission.",
  },
  {
    id: "own-domain",
    question: "Can I use my own domain?",
    answer: "Yes. Every plan lets you run your academy on your own domain with free SSL, your logo and your colours.",
  },
  {
    id: "coding",
    question: "Do I need technical skills to set it up?",
    answer:
      "No. You can build courses and edit your website without code, and our team helps you set up your domain, payments and first courses.",
  },
  {
    id: "switch",
    question: "Can I move my courses from another platform?",
    answer: "Yes. Our team helps you move courses and learners from other platforms. Full migration is included free on Enterprise.",
  },
];
