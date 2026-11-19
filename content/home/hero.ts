import { HeroContent } from "@/types/content";

export const heroContent: HeroContent = {
  title: "Run your academy's batches, live classes and tests in one place.",
  subtitle:
    "Build courses, sell them and support every learner, with AI that drafts your content, answers learner questions and tells you what needs attention.",
  ctaText: "Book a 20-minute demo",
  secondaryCtaText: "See pricing",
  microcopy: "Your own branding on every plan · Set up with our team",
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
    },
    {
      type: "checkout",
      title: "Checkout",
      subtitle: "Instant global enrollment",
      courseName: "Full-Stack Web Engineering",
      priceUsd: "$89",
      priceInr: "₹7,999",
      couponText: "WELCOME10 applied",
      gateways: ["Stripe", "Razorpay", "Paytm", "DOKU"],
    },
    {
      type: "certificate",
      title: "Certificate issued",
      subtitle: "Course completion",
      learnerName: "Aisha K.",
      courseName: "Full-Stack Web Engineering",
      buttonText: "View certificate",
    },
  ],
};
