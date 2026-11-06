import { PlatformPageData } from "./types";

export const managePlatformData: PlatformPageData = {
  slug: "manage",
  eyebrow: "ACADEMY OPERATIONS",
  title: "Know every batch, learner and class at a glance.",
  subtitle:
    "Manage cohort schedules, monitor learner engagement, coordinate teaching staff, and broadcast essential notifications.",
  frameTitle: "Operations Dashboard & Roster",
  frameAlt: "Know every batch, learner and class at a glance",
  features: [
    {
      title: "Batch management",
      description:
        "Organize distinct learning cohorts with individual schedules, student rosters, and custom drip dates.",
      icon: "CalendarRange",
    },
    {
      title: "Learner directory",
      description:
        "Track individual enrollment records, course progress, completed assessments, and account details in one place.",
      icon: "User",
    },
    {
      title: "Attendance tracking",
      description:
        "Attendance for every live class.",
      icon: "ClipboardCheck",
    },
    {
      title: "Roles and permissions (RBAC)",
      description:
        "Protect operational integrity with distinct access levels for administrators, instructors, and evaluators.",
      icon: "ShieldAlert",
    },
    {
      title: "Email & SMS notifications",
      description:
        "Send broadcast announcements, class reminders, and enrollment notices via automated email and SMS channels.",
      icon: "Bell",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Manage morning and evening batch rosters, track daily attendance, and message enrolled students.",
    },
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Coordinate enterprise client groups, delegate instructor responsibilities, and monitor team progress.",
    },
  ],
};

