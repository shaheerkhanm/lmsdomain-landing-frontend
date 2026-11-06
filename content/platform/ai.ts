import { PlatformPageData } from "./types";

export const aiPlatformData: PlatformPageData = {
  slug: "ai",
  eyebrow: "DOMIE AI",
  badge: "Premium",
  title: "Domie AI: a teaching assistant grounded in your own courses.",
  subtitle:
    "An AI teaching assistant built specifically for academies to answer student inquiries, draft course metadata, and highlight learners who need help.",
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
      title: "Prescriptive analytics",
      description:
        "Surfaces proactive administrative alerts and highlights learners who may need help before they disengage.",
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
        "Provide round-the-clock course assistance for grammar, test questions, and exam preparation queries.",
    },
  ],
};

