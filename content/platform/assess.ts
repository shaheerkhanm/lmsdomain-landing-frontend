import { PlatformPageData } from "./types";

export const assessPlatformData: PlatformPageData = {
  slug: "assess",
  eyebrow: "ASSESSMENTS & EVALUATION",
  title: "Test learners and certify the ones who finish.",
  subtitle:
    "Evaluate student comprehension with automated quizzes, hands-on assignments, in-video knowledge checks, and verified completion credentials.",
  frameTitle: "Gradebook & Assessment Center",
  frameAlt: "Test learners and certify the ones who finish",
  features: [
    {
      title: "Graded quizzes",
      description:
        "Evaluate comprehension with multiple-choice questions, timed testing windows, and automated scoring.",
      icon: "CheckSquare",
    },
    {
      title: "Assignments with review",
      description:
        "Review submissions and give feedback.",
      icon: "FileCheck",
    },
    {
      title: "In-video checkpoints",
      description:
        "Embed question prompts inside recorded lectures to verify attention and test key concepts during playback.",
      icon: "PlayCircle",
    },
    {
      title: "Course completion certificates",
      description:
        "Branded certificates for learners who finish.",
      icon: "Award",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Run timed mock tests, evaluate writing assignments, and issue formal achievement certificates.",
    },
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Assess enterprise cohorts with practical project submissions and certified completion records.",
    },
  ],
};

