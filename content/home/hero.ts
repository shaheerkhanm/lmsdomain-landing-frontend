import { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  titlePrefix: "Meet all-in-one platform",
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
      type: "course_builder",
      title: "Course builder",
      subtitle: "Sections and lessons",
      lessons: [
        { title: "Course Introduction & Setup", type: "video" },
        { title: "Architecture Blueprint", type: "pdf" },
        { title: "Checkpoint Evaluation", type: "quiz" },
      ],
      dripChip: "Drip: unlocks Monday",
    },
    {
      type: "ai_tutor",
      badge: "AI",
      title: "HelpDesk AI tutor",
      subtitle: "Answers from your own courses",
      question: "What's the difference between a quiz and an assignment?",
      answer:
        "Quizzes check comprehension with automated scoring, while assignments require learner submissions and direct instructor review.",
      sourceChip: "From your course: Module 2",
    },
    {
      type: "checkout",
      title: "Checkout",
      subtitle: "Instant global enrollment",
      courseName: "Full-Stack Web Engineering",
      priceUsd: "$89",
      priceInr: "₹7,499",
      couponText: "WELCOME10 applied",
      gateways: ["Stripe", "Razorpay", "Paytm", "DOKU"],
    },
    {
      type: "certificate",
      title: "Certificate issued",
      subtitle: "Verified course completion",
      learnerName: "Aisha K.",
      courseName: "Full-Stack Web Engineering",
      buttonText: "View certificate",
    },
  ],
};
