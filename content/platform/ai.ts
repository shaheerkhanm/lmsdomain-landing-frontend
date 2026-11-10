import { PlatformPageData } from "./types";

export const aiPlatformData: PlatformPageData = {
  slug: "ai",
  eyebrow: "DOMIE AI",
  badge: "Pro",
  title: "Domie AI: a teaching assistant grounded in your own courses.",
  subtitle:
    "LMS Domain offers Domie AI on the Pro plan for academies, coaching institutes, and training organizations in India. Provide a HelpDesk student tutor grounded in your academy's own course content, generate drafts for course titles and descriptions, see analytics, and consult the Ask Domie assistant daily.",
  metaTitle: "Domie AI Teaching Assistant & Course Tools | LMS Domain",
  metaDescription:
    "Support learners 24/7 with a Domie AI teaching assistant grounded in your course content. Draft curriculum metadata and view academy analytics with ease.",
  sectionHeading: "How does Domie AI support teaching and operations in LMS Domain?",
  frameTitle: "Domie AI Assistant & Tutor",
  frameAlt: "Domie AI: a teaching assistant grounded in your own courses",
  features: [
    {
      title: "HelpDesk AI tutor",
      description:
        "Reduces off-topic answers by grounding responses in your course content to support learners when instructors are offline.",
      icon: "MessageSquare",
    },
    {
      title: "Course content drafts",
      description:
        "Drafts course titles, descriptions, and learning outcomes to help instructors prepare new curriculum modules faster.",
      icon: "PenTool",
    },
    {
      title: "Operational analytics",
      description:
        "Surfaces proactive administrative alerts and highlights learners who may need help before they fall behind in their batch.",
      icon: "LineChart",
    },
    {
      title: "AI command bar",
      description:
        "Navigate academy settings, find courses, and jump to operational tools instantly with quick keyboard shortcuts.",
      icon: "Command",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Provide syllabus assistance for grammar, test questions, and exam preparation queries.",
    },
    {
      title: "Coaching institutes",
      href: "/solutions/coaching-institutes",
      description:
        "Answer repetitive student syllabus questions automatically using lesson-grounded assistance.",
    },
  ],
  faqs: [
    {
      question: "How does Domie AI answer student questions?",
      answer:
        "Domie AI is a HelpDesk student tutor that grounds its answers in your academy's published course materials. It provides relevant answers when instructors are offline without inventing answers.",
    },
    {
      question: "Does Domie AI generate complete lessons or quizzes?",
      answer:
        "No, Domie AI does not generate full lesson scripts, quizzes, or grades. It assists instructors by drafting curriculum metadata such as course titles, course descriptions, and learning outcomes.",
    },
    {
      question: "What is the Ask Domie assistant in the admin panel?",
      answer:
        "Ask Domie is an operational assistant that provides a daily morning summary of academy activity, batch enrollments, and upcoming schedules directly in your admin dashboard.",
    },
    {
      question: "What are operational analytics?",
      answer:
        "Operational analytics highlight learners whose progress or attendance has dropped, alerting instructors before students fall behind in their batch.",
    },
    {
      question: "Which plans include Domie AI?",
      answer:
        "Domie AI features are included on the Pro plan within fair-use limits. You can enable or disable AI capabilities for specific courses and student groups.",
    },
    {
      question: "Does Domie AI use my course content to train external AI models?",
      answer:
        "No. Domie AI processes queries strictly within your academy's tenant environment. LMS Domain does not use an academy's course content to train external AI models.",
    },
  ],
};

