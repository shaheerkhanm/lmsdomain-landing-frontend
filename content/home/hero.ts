import { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  titlePrefix: "Meet all-in-one platform to",
  rotatingWords: [
    { text: "teach", bg: "#F3CF74" },
    { text: "sell", bg: "#FBCFE8" },
    { text: "certify", bg: "#8E7CF8" },
    { text: "scale", bg: "#A6E3D3" },
  ],
  subtitle:
    "Build courses, sell them and support every learner, with AI that drafts your content, answers learner questions and tells you what needs attention.",
  ctaText: "Request a Demo",
  cards: [
    {
      type: "chat",
      badge: "AI",
      title: "HelpDesk AI tutor",
      question: "What's the difference between a quiz and an assignment?",
      answer:
        "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor evaluation.",
      sourceLabel: "From your course: Module 2",
    },
    {
      type: "analytics",
      badge: "AI",
      title: "AI prescriptive analytics",
      flaggedRows: [
        "Enrolments falling in Python Basics",
        "2 coupons expire this week",
        "Low engagement in Module 4",
      ],
      summary: "Review Module 4 checkpoint tasks and send a promotional update for expiring coupons.",
    },
    {
      type: "generator",
      badge: "AI",
      title: "Domie AI content generator",
      draftedTitle: "Modern Full-Stack Engineering",
      draftedDescription:
        "Learn essential frontend architecture, backend services, and scalable web deployment from scratch.",
      learningOutcomes: [
        "Construct responsive user interfaces with modern components",
        "Implement clean server-side application logic and storage",
        "Deliver complete web projects with verified domain hosting",
      ],
      buttonText: "Generate",
    },
    {
      type: "command_bar",
      badge: "AI",
      title: "AI command bar",
      searchPlaceholder: "Search or ask anything…",
      resultRows: [
        { label: "Settings / Custom Domain & SSL", category: "Admin page" },
        { label: "Python Basics for Beginners", category: "Course" },
        { label: "How do I schedule recurring live classes with Zoom?", category: "Platform question" },
      ],
    },
  ],
};

