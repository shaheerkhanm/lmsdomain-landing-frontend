import { FEATURE_CATEGORIES } from "@/content/features/catalog";
import type { AiPageData, AiTool, CommandBarExample } from "@/types/content";

// Derive the 4 AI tools strictly from the official catalog category 'ai-powered-tools'
const aiCategory = FEATURE_CATEGORIES.find((c) => c.slug === "ai-powered-tools");
const aiFeatures = aiCategory?.features || [];

const tutorFeature = aiFeatures.find((f) => f.slug === "helpdesk-ai-tutor");
const generatorFeature = aiFeatures.find((f) => f.slug === "domie-ai-content-generator");
const analyticsFeature = aiFeatures.find((f) => f.slug === "ai-prescriptive-analytics");
const commandBarFeature = aiFeatures.find((f) => f.slug === "ai-command-bar");

export const AI_TOOLS: AiTool[] = [
  {
    id: "helpdesk-ai-tutor",
    slug: "helpdesk-ai-tutor",
    name: tutorFeature?.title || "HelpDesk AI Tutor",
    audience: tutorFeature?.audience || "For learners",
    summary:
      tutorFeature?.description ||
      "Help learners ask questions about their course materials and receive answers grounded in the content of their own courses. Save conversations and maintain separate chat histories for each course.",
    bullets: [
      "Answers grounded directly in your syllabus and uploaded course materials",
      "Maintains isolated chat histories for every course the student is taking",
      "Cites lesson sources so students can review the exact context",
    ],
    badge: "Premium",
    demo: "tutor",
    icon: "Bot",
  },
  {
    id: "ai-prescriptive-analytics",
    slug: "ai-prescriptive-analytics",
    name: analyticsFeature?.title || "AI Prescriptive Analytics",
    audience: analyticsFeature?.audience || "For administrators",
    summary:
      analyticsFeature?.description ||
      "Provide administrators with concise insights and alerts about areas requiring attention, such as declining enrolments, expiring coupons, and low course engagement.",
    bullets: [
      "Highlights courses with declining enrolments before revenue drops",
      "Alerts administrators when promotional coupon codes approach expiration",
      "Flags lessons with lower student engagement or quiz completion rates",
    ],
    badge: "Premium",
    demo: "analytics",
    icon: "LineChart",
  },
  {
    id: "domie-ai-content-generator",
    slug: "domie-ai-content-generator",
    name: generatorFeature?.title || "Domie AI Content Generator",
    audience: generatorFeature?.audience || "For course creators",
    summary:
      generatorFeature?.description ||
      "Help course creators draft course titles, descriptions, and learning outcomes with AI assistance.",
    bullets: [
      "Drafts course titles aligned with your intended subject area",
      "Generates clear, comprehensive course summary descriptions",
      "Proposes structured learning outcome bullet points ready to edit",
    ],
    badge: "Premium",
    demo: "generator",
    icon: "Sparkles",
  },
  {
    id: "ai-command-bar",
    slug: "ai-command-bar",
    name: commandBarFeature?.title || "AI Command Bar",
    audience: commandBarFeature?.audience || "For administrators",
    summary:
      commandBarFeature?.description ||
      "Provide a unified search interface across administrative pages, with AI-assisted answers to questions about the platform.",
    bullets: [
      "Instant unified search across administrative pages and academy settings",
      "Natural language answers for configuration and operational questions",
      "Accessible from anywhere with the ⌘K keyboard shortcut",
    ],
    badge: "Premium",
    demo: "commandbar",
    icon: "Command",
  },
];

export const DEFAULT_COMMAND_BAR_EXAMPLES: CommandBarExample[] = [
  {
    query: "How do I configure custom certificates?",
    results: [
      {
        kind: "page",
        title: "Certificate Templates",
        subtitle: "Courses > Settings > Certificates",
      },
      {
        kind: "setting",
        title: "Enable Automatic Certificate Issuing",
        subtitle: "Issue PDF certificates upon 100% course completion",
      },
      {
        kind: "answer",
        title: "Upload your background layout in Certificate Settings and place merge tags for learner name and date.",
      },
    ],
  },
  {
    query: "Which courses have declining enrolments?",
    results: [
      {
        kind: "page",
        title: "Prescriptive Analytics Overview",
        subtitle: "Analytics > Performance > Enrolments",
      },
      {
        kind: "setting",
        title: "Enrolment Alert Thresholds",
        subtitle: "Adjust sensitivity for automatic attention notifications",
      },
      {
        kind: "answer",
        title: "Enrolments are down on one course this month. Review promotional coupons or send reminder emails.",
      },
    ],
  },
  {
    query: "Draft new course on Web Development",
    results: [
      {
        kind: "page",
        title: "Course Creator Studio",
        subtitle: "Courses > New Course > Domie AI Assistant",
      },
      {
        kind: "setting",
        title: "Content Generator Preferences",
        subtitle: "Select default target audience and outcome format",
      },
      {
        kind: "answer",
        title: "Domie AI can suggest course titles, descriptive overviews, and structured learning outcomes.",
      },
    ],
  },
];

export const DEFAULT_AI_PAGE_DATA: AiPageData = {
  hero: {
    eyebrow: "✦ DOMIE AI",
    title: "AI Grounded in Your Courses, Built for Your Entire Academy",
    subtitle:
      "Assist learners with course-grounded answers, help creators draft content faster, and surface key operational alerts for administrators.",
    primaryCta: {
      label: "Request Demo",
      action: "modal",
    },
    secondaryCta: {
      label: "View Pricing",
      href: "/pricing",
    },
    commandBarExamples: DEFAULT_COMMAND_BAR_EXAMPLES,
  },
  tools: AI_TOOLS,
  howItWorks: {
    title: "How Domie AI Operates Inside Your Platform",
    steps: [
      {
        stepNumber: "01",
        title: "Grounded in Your Material",
        description:
          "Domie AI indexes your uploaded lessons, syllabuses, and course notes so answers stay faithful to what you teach.",
      },
      {
        stepNumber: "02",
        title: "Available Where Needed",
        description:
          "Learners interact with the tutor inside active lessons, while administrators access alerts and search across the management console.",
      },
      {
        stepNumber: "03",
        title: "Full Administrator Control",
        description:
          "Keep complete governance over AI features with course-level toggles, clear source citations, and human-in-the-loop workflows.",
      },
    ],
  },
  availability: {
    title: "Premium AI Add-Ons for Growing Academies",
    description:
      "Domie AI tools are available as premium add-ons to enhance your teaching and administration workflows. Explore our plans or speak with our team to add AI capabilities to your academy.",
    cta: {
      label: "View Plans & Pricing",
      href: "/pricing",
    },
    secondaryCta: {
      label: "Request Demo",
      action: "modal",
    },
  },
  relatedTools: {
    title: "Related Premium Capabilities",
    subtitle: "Explore interactive engagement tools that pair with Domie AI.",
    items: [
      {
        title: "In-Video Checkpoint Quizzes",
        description:
          "Insert questions at specific points in a video. Playback pauses until learners answer the checkpoint question and continue.",
        badge: "Premium",
        href: "/features#assessment-and-evaluation",
        icon: "PlayCircle",
      },
      {
        title: "Leaderboards and Points",
        description:
          "Show rankings based on learner progress and points to encourage participation and healthy competition.",
        badge: "Premium",
        href: "/features#learner-engagement",
        icon: "Trophy",
      },
      {
        title: "Watch-Percentage Completion",
        description:
          "Mark a video lesson as complete after the learner watches the configured percentage of its duration.",
        badge: "Premium",
        href: "/features#learner-engagement",
        icon: "Timer",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions About Domie AI",
    subtitle: "Everything you need to know about course grounding, privacy, and add-on availability.",
    items: [
      {
        question: "How does HelpDesk AI Tutor ground its responses?",
        answer:
          "HelpDesk AI Tutor generates answers grounded exclusively in the curriculum, notes, and lessons uploaded to that course, citing the specific lesson source so learners can verify.",
      },
      {
        question: "Are Domie AI features included in base plans or sold as add-ons?",
        answer:
          "Domie AI capabilities are premium add-ons designed to scale with your institution. You can review plan options on our pricing page or contact our team for a tailored demo.",
      },
      {
        question: "Can I enable AI for some courses and disable it for others?",
        answer:
          "Yes. Academy administrators have granular control to enable or disable HelpDesk AI Tutor and other AI tools on a per-course or academy-wide basis.",
      },
      {
        question: "What operations can the AI Command Bar perform?",
        answer:
          "The AI Command Bar provides a quick ⌘K search interface across administrative pages, platform settings, and instant answers to operational how-to questions.",
      },
    ],
  },
  cta: {
    title: "Ready to Supercharge Your Academy with AI?",
    subtitle:
      "Experience how Domie AI helps your instructors create courses faster and supports your learners around the clock.",
    primaryCta: {
      label: "Request Live Demo",
      action: "modal",
    },
    secondaryCta: {
      label: "View Pricing",
      href: "/pricing",
    },
  },
};
