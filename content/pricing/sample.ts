import type {
  Plan,
  PricingComparison,
  PricingAddOn,
  PricingEnterprise,
  FaqItem,
} from "@/types/content";

// Currency is resolved on the server (PRICING_CURRENCY → INR), like real plans.
export const SAMPLE_PLANS: Omit<Plan, "currency">[] = [
  {
    id: "sample-starter",
    slug: "sample-starter",
    name: "Sample Starter",
    tagline: "For individual educators and coaches launching their initial academy.",
    isPopular: false,
    prices: {
      monthly: 3699,
      yearly: 36990,
    },
    priceSuffix: "/month",
    priceSuffixes: {
      monthly: "/month",
      yearly: "/year, billed annually",
    },
    limits: [
      { label: "Users", value: "Up to 250" },
      { label: "Admins", value: "1 Admin" },
    ],
    features: [
      "Structured Courses",
      "Course Discussion Forums",
      "Graded Quizzes",
      "Assignments and Instructor Reviews",
      "Course Certificates",
    ],
    cta: {
      label: "Start Free Trial",
      action: "signup",
      href: "/signup?plan=sample-starter",
    },
    displayOrder: 1,
  },
  {
    id: "sample-growth",
    slug: "sample-growth",
    name: "Sample Growth",
    tagline: "For scaling institutions delivering cohort bootcamps and interactive courses.",
    isPopular: true,
    prices: {
      monthly: 8999,
      yearly: 89990,
    },
    priceSuffix: "/month",
    priceSuffixes: {
      monthly: "/month",
      yearly: "/year, billed annually",
    },
    limits: [
      { label: "Users", value: "Up to 1,500" },
      { label: "Admins", value: "5 Admins" },
    ],
    features: [
      "Structured Courses",
      "Course Certificates",
      "Video Watermarking",
      "Scheduled Content Release",
      "In-Video Checkpoint Quizzes",
      "Leaderboards and Points",
      "Watch-Percentage Completion",
      "HelpDesk AI Tutor",
    ],
    cta: {
      label: "Get Started",
      action: "signup",
      href: "/signup?plan=sample-growth",
    },
    displayOrder: 2,
  },
  {
    id: "sample-enterprise",
    slug: "sample-enterprise",
    name: "Sample Enterprise",
    tagline: "For enterprise training academies requiring unlimited scale, custom SLA, and full AI access.",
    isCustom: true,
    isPopular: false,
    prices: {
      monthly: null,
      yearly: null,
    },
    priceNote: "Custom",
    limits: [
      { label: "Users", value: "Unlimited" },
      { label: "Admins", value: "Unlimited" },
    ],
    features: [
      "Learner Device Limits",
      "In-Video Checkpoint Quizzes",
      "Lesson Lock Help Drawer",
      "Leaderboards and Points",
      "HelpDesk AI Tutor",
      "Domie AI Content Generator",
      "AI Prescriptive Analytics",
      "AI Command Bar",
    ],
    cta: {
      label: "Request a Demo",
      action: "demo",
    },
    displayOrder: 3,
  },
];

export const SAMPLE_COMPARISON: PricingComparison = {
  groups: [
    {
      title: "Course Learning",
      rows: [
        {
          label: "Structured Courses",
          tooltip: "Organize lessons into sections with video, documents, and rich text.",
          values: {
            "sample-starter": true,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Video Watermarking",
          tooltip: "Dynamic learner-identifying watermarks overlaid on video playback.",
          values: {
            "sample-starter": false,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Scheduled Content Release",
          tooltip: "Paced delivery of lessons based on calendar or enrolment dates.",
          values: {
            "sample-starter": false,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Learner Device Limits",
          tooltip: "Restrict maximum simultaneous signed-in devices per student account.",
          values: {
            "sample-starter": false,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Course Certificates",
          tooltip: "Custom verifiable PDF certificates awarded upon criteria completion.",
          values: {
            "sample-starter": "Standard",
            "sample-growth": "Custom Branded",
            "sample-enterprise": "Custom Branded",
          },
        },
      ],
    },
    {
      title: "Assessment and Evaluation",
      rows: [
        {
          label: "Graded Quizzes",
          tooltip: "Multiple question types, automatic scoring, and retake controls.",
          values: {
            "sample-starter": true,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Assignments and Instructor Reviews",
          tooltip: "Student file uploads with grading rubric and feedback threads.",
          values: {
            "sample-starter": true,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "In-Video Checkpoint Quizzes",
          tooltip: "Pause video stream until learner answers check questions.",
          values: {
            "sample-starter": false,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Course Discussion Forums",
          tooltip: "Dedicated Q&A communities linked to course curricula.",
          values: {
            "sample-starter": true,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
      ],
    },
    {
      title: "AI-Powered Tools",
      rows: [
        {
          label: "HelpDesk AI Tutor",
          tooltip: "24/7 student chat tutor grounded in course syllabus and transcript.",
          values: {
            "sample-starter": false,
            "sample-growth": true,
            "sample-enterprise": true,
          },
        },
        {
          label: "Domie AI Content Generator",
          tooltip: "Draft course modules, quizzes, and learning objectives automatically.",
          values: {
            "sample-starter": false,
            "sample-growth": "Add-on",
            "sample-enterprise": true,
          },
        },
        {
          label: "AI Prescriptive Analytics",
          tooltip: "Actionable alert feed on student drop-offs and low cohort activity.",
          values: {
            "sample-starter": false,
            "sample-growth": "Add-on",
            "sample-enterprise": true,
          },
        },
        {
          label: "AI Command Bar",
          tooltip: "Instant ⌘K keyboard workflow across entire admin surface.",
          values: {
            "sample-starter": false,
            "sample-growth": false,
            "sample-enterprise": true,
          },
        },
      ],
    },
  ],
};

export const SAMPLE_ADD_ONS: PricingAddOn[] = [
  {
    name: "AI-Powered Tools",
    description:
      "Unlock HelpDesk AI Tutor, Domie Content Generator, and AI Command Bar for instructors and learners across all courses.",
    price: "$29",
    unit: "/month",
  },
  {
    name: "Extra seats",
    description:
      "Add bundles of 500 active learners and 3 additional administrators as your learning network expands.",
    price: "$19",
    unit: "/month",
  },
];

export const SAMPLE_ENTERPRISE: PricingEnterprise = {
  title: "Enterprise Cohort & Multi-Academy Deployments",
  description:
    "Deploy LMS Domain with custom SSO/SAML 2.0 integration, dedicated isolated cloud database, tailored SLAs, and hands-on white-glove onboarding for large organizations.",
  cta: {
    label: "Talk to Enterprise Sales",
    href: "/contact?topic=enterprise",
    action: "contact",
  },
};

export const SAMPLE_FAQ: { title: string; subtitle: string; items: FaqItem[] } = {
  title: "Frequently Asked Questions",
  subtitle: "Common questions regarding plans, billing periods, seat allocation, and upgrades.",
  items: [
    {
      _id: "faq-switch-period",
      question: "Can I switch between monthly and yearly billing at any time?",
      answer:
        "Yes, you can switch from monthly to annual billing directly from your billing settings. The annual discount is applied immediately on a prorated basis.",
      displayOrder: 1,
      isActive: true,
    },
    {
      _id: "faq-user-limits",
      question: "What happens if our academy exceeds active learner limits?",
      answer:
        "Your academy operations are never interrupted. You will receive an administrator notification to either upgrade to a higher tier or add an Extra Seats pack.",
      displayOrder: 2,
      isActive: true,
    },
    {
      _id: "faq-ai-trial",
      question: "Are Domie AI tools included during the free trial period?",
      answer:
        "Yes. Trial accounts selecting Growth or Enterprise tiers have full access to HelpDesk AI Tutor and AI Content Generator for the duration of the evaluation.",
      displayOrder: 3,
      isActive: true,
    },
    {
      _id: "faq-invoicing",
      question: "Do you offer custom invoicing, procurement, and PO processing?",
      answer:
        "Yes. We support custom PO processing, annual invoicing, and enterprise procurement vendor onboarding for organizations on our Enterprise tier.",
      displayOrder: 4,
      isActive: true,
    },
  ],
};

