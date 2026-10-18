import { FeaturesContent } from "@/types/content";

export const featuresContent: FeaturesContent = {
  sectionTitle: "Everything you need to teach online",
  cards: [
    {
      id: "courses-that-run-themselves",
      stepNumber: "01",
      title: "Courses that run themselves",
      summary:
        "Sections and lessons in video, text and PDF, with watermarked video and drip content.",
      details: [
        "Structured sections and lessons (video, text, PDF)",
        "Watermarked video protection against screen recording",
        "Drip content scheduling by date or progress",
      ],
    },
    {
      id: "assess-and-certify",
      stepNumber: "02",
      title: "Assess and certify",
      summary:
        "Quizzes, assignments and in-video checkpoints, with a certificate when learners finish.",
      details: [
        "Graded quizzes with automated scoring",
        "Assignments with in-depth instructor review",
        "In-video checkpoints and final certificates",
      ],
    },
    {
      id: "live-and-cohort-learning",
      stepNumber: "03",
      title: "Live and cohort learning",
      summary:
        "Live classes on Zoom, bootcamps and one-to-one tutor booking.",
      details: [
        "Live classes with Zoom integration",
        "Bootcamps with milestones and cohorts",
        "One-to-one tutor booking calendar",
      ],
    },
  ],
};

