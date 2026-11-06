import { PlatformPageData } from "./types";

export const teachPlatformData: PlatformPageData = {
  slug: "teach",
  eyebrow: "TEACHING & CURRICULUM",
  title: "Teach recorded courses and live batches from one place.",
  subtitle:
    "Combine on-demand video lectures, structured learning documents, and scheduled live Zoom classes into one cohesive student journey.",
  frameTitle: "Course Builder & Batch Manager",
  frameAlt: "Teach recorded courses and live batches from one place",
  features: [
    {
      title: "Courses (video, PDF, text)",
      description:
        "Organize learning into sections and lessons with rich support for video, PDF guides, and structured text materials.",
      icon: "BookOpen",
    },
    {
      title: "Scheduled drip release",
      description:
        "Unlock lessons according to a calendar schedule or learner enrollment pacing to keep groups progressing together.",
      icon: "CalendarClock",
    },
    {
      title: "Zoom live classes",
      description:
        "Schedule live classroom sessions for each batch, notify students, and store class recordings with the course.",
      icon: "Video",
    },
    {
      title: "Cohort-based bootcamps",
      description:
        "Deliver intensive group training with cohort start dates, shared project milestones, and structured review stages.",
      icon: "Users",
    },
    {
      title: "1:1 tutor booking",
      description:
        "Enable learners to book private coaching sessions and personal consultation hours with assigned faculty.",
      icon: "UserCheck",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Schedule morning and evening batches with automated attendance and Zoom live classes.",
    },
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Deliver cohort bootcamps, group training packages, and 1:1 tutor consultations.",
    },
  ],
};

