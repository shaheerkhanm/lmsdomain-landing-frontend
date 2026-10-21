import type {
  PricingPageModel,
  Plan,
  PricingComparison,
  PricingAddOn,
  PricingEnterprise,
} from "@/types/content";

export const DEFAULT_PRICING_HERO = {
  eyebrow: "✦ PRICING",
  title: "Transparent, Scalable Plans for Every Stage",
  subtitle:
    "Choose the right plan to launch, scale, and deliver verified courses for your academy.",
};

export const DEFAULT_PRICING_EMPTY_STATE = {
  title: "Academy Plans & Custom Pricing",
  subtitle:
    "We are tailoring our pricing tiers to offer flexible configurations for training institutes, creator studios, and enterprise academies. Speak with our team to explore tailored plans or request a guided platform walkthrough.",
  primaryCta: {
    label: "Request a Demo",
    action: "demo" as const,
  },
  secondaryCta: {
    label: "Contact Sales",
    href: "/contact?topic=sales",
    action: "contact" as const,
  },
};

export const PRICING_COMPARISON_GROUPS: PricingComparison["groups"] = [
  {
    title: "Course Learning & Delivery",
    rows: [
      {
        label: "Structured Courses",
        tooltip: "Organize lessons into modules with video, text, and documents.",
        values: { starter: true, scale: true, enterprise: true },
      },
      {
        label: "Video Watermarking",
        tooltip: "Dynamic watermarking to protect proprietary video content.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "Scheduled Content Release",
        tooltip: "Release lessons on schedule to pace learner cohorts.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "Course Certificates",
        tooltip: "Automated, verifiable PDF certificates upon completion.",
        values: { starter: "Standard", scale: "Custom Branded", enterprise: "Custom Branded" },
      },
    ],
  },
  {
    title: "Assessment & Interactivity",
    rows: [
      {
        label: "Graded Quizzes",
        tooltip: "Automated scoring and comprehensive question formats.",
        values: { starter: true, scale: true, enterprise: true },
      },
      {
        label: "Assignments and Instructor Reviews",
        tooltip: "File submissions with instructor grading and written feedback.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "In-Video Checkpoint Quizzes",
        tooltip: "Pause video playback until learners answer checkpoint questions.",
        values: { starter: false, scale: true, enterprise: true },
      },
    ],
  },
  {
    title: "Engagement & Retention",
    rows: [
      {
        label: "Leaderboards and Points",
        tooltip: "Gamified ranking based on lesson progress and quiz points.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "Watch-Percentage Completion",
        tooltip: "Verify that learners complete configured video watch percentages.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "Lesson Lock Help Drawer",
        tooltip: "In-context guidance for learners when lessons are locked.",
        values: { starter: false, scale: true, enterprise: true },
      },
    ],
  },
  {
    title: "Domie AI Tools (Premium)",
    rows: [
      {
        label: "HelpDesk AI Tutor",
        tooltip: "Grounded 24/7 AI tutor answering questions from course syllabus.",
        values: { starter: false, scale: "Add-on", enterprise: true },
      },
      {
        label: "AI Prescriptive Analytics",
        tooltip: "Surfaces actionable alerts on declining enrolments and coupons.",
        values: { starter: false, scale: "Add-on", enterprise: true },
      },
      {
        label: "Domie AI Content Generator",
        tooltip: "Drafts course titles, descriptions, and learning outcomes.",
        values: { starter: false, scale: "Add-on", enterprise: true },
      },
      {
        label: "AI Command Bar",
        tooltip: "Unified ⌘K search interface across academy administration.",
        values: { starter: false, scale: "Add-on", enterprise: true },
      },
    ],
  },
  {
    title: "Platform & Security",
    rows: [
      {
        label: "Custom Domain with SSL",
        tooltip: "Host your academy on your own branded web domain.",
        values: { starter: true, scale: true, enterprise: true },
      },
      {
        label: "Learner Device Limits",
        tooltip: "Restrict the number of devices allowed per learner account.",
        values: { starter: false, scale: true, enterprise: true },
      },
      {
        label: "Support SLA",
        values: { starter: "Standard Email", scale: "Priority Email", enterprise: "Dedicated Manager" },
      },
    ],
  },
];

export const NEUTRAL_FIXTURE_PLANS: Plan[] = [
  {
    id: "starter",
    slug: "starter",
    name: "Starter Academy",
    tagline: "For individual educators and coaches launching their first academy.",
    isPopular: false,
    prices: {
      monthly: 0,
      yearly: 0,
    },
    priceSuffix: "/month",
    limits: [
      { label: "Active Learners", value: "Up to 100" },
      { label: "Courses", value: "Up to 5" },
    ],
    features: [
      "Structured Courses",
      "Graded Quizzes",
      "Course Certificates",
      "Custom Domain with SSL",
      "Standard Email Support",
    ],
    cta: {
      label: "Start Free Trial",
      action: "signup",
      href: "/signup?plan=starter",
    },
    displayOrder: 1,
  },
  {
    id: "scale",
    slug: "scale",
    name: "Scale Institute",
    tagline: "For growing academies with multiple cohorts and interactive courses.",
    isPopular: true,
    prices: {
      monthly: 0,
      yearly: 0,
    },
    priceSuffix: "/month",
    limits: [
      { label: "Active Learners", value: "Up to 1,000" },
      { label: "Courses", value: "Unlimited" },
    ],
    features: [
      "Everything in Starter, plus:",
      "Video Watermarking",
      "Scheduled Content Release",
      "In-Video Checkpoint Quizzes",
      "Leaderboards and Points",
      "Watch-Percentage Completion",
      "Priority Email Support",
    ],
    cta: {
      label: "Get Started",
      action: "signup",
      href: "/signup?plan=scale",
    },
    displayOrder: 2,
  },
  {
    id: "enterprise",
    slug: "enterprise",
    name: "Enterprise Academy",
    tagline: "For training institutes, universities, and enterprise teams.",
    isPopular: false,
    prices: {
      monthly: null,
      yearly: null,
    },
    priceSuffix: "",
    priceNote: "Custom",
    limits: [
      { label: "Active Learners", value: "Tailored to scale" },
      { label: "Storage & Bandwidth", value: "Dedicated" },
    ],
    features: [
      "Everything in Scale, plus:",
      "HelpDesk AI Tutor Included",
      "AI Prescriptive Analytics",
      "Domie AI Content Generator",
      "AI Command Bar",
      "Learner Device Limits",
      "Dedicated Account Manager",
    ],
    cta: {
      label: "Contact Sales",
      action: "contact",
      href: "/contact?topic=sales",
    },
    displayOrder: 3,
  },
];

export const PRICING_ADD_ONS: PricingAddOn[] = [
  {
    name: "Domie AI Suite",
    description:
      "Course-grounded AI tutor, prescriptive admin analytics, and AI content drafting.",
    price: "Custom",
    unit: "per academy / month",
  },
  {
    name: "Dedicated Streaming Bandwidth",
    description:
      "Enterprise high-bitrate video delivery with global edge CDN acceleration.",
    price: "Custom",
    unit: "per TB",
  },
  {
    name: "Custom Integration & SSO",
    description:
      "SAML 2.0 / Okta enterprise single sign-on and custom webhook orchestration.",
    price: "Custom",
    unit: "one-time setup",
  },
];

export const PRICING_ENTERPRISE: PricingEnterprise = {
  title: "Need Custom Capacity or Multi-Branch Support?",
  description:
    "We work closely with universities, corporate training organizations, and high-volume institutes to deliver dedicated deployments, compliance guarantees, and custom integrations.",
  cta: {
    label: "Speak with Our Enterprise Team",
    action: "contact",
    href: "/contact?topic=enterprise",
  },
};

