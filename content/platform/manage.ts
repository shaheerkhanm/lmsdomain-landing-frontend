import { PlatformPageData } from "./types";

export const managePlatformData: PlatformPageData = {
  slug: "manage",
  eyebrow: "ACADEMY OPERATIONS",
  title: "Know every batch, learner and class at a glance.",
  subtitle:
    "LMS Domain is an academy operations and batch management software designed for coaching institutes, training companies, and educational organizations in India. Track student attendance for every live class, oversee batch schedules and drip lessons, assign Admin and Instructor staff permissions, and send automated email and SMS class notifications.",
  metaTitle: "Batch Management & Academy Operations | LMS Domain",
  metaDescription:
    "Manage student cohorts, track attendance for every live class, assign staff roles, and broadcast automated email and SMS notices on LMS Domain.",
  sectionHeading: "How does batch and operations management work in LMS Domain?",
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
    {
      title: "Coaching institutes",
      href: "/solutions/coaching-institutes",
      description:
        "Schedule multiple shifts, take live Zoom attendance, and notify parents and students via SMS.",
    },
  ],
  faqs: [
    {
      question: "How does batch management work in LMS Domain?",
      answer:
        "Batch management allows you to create separate cohorts for the same course with unique schedules, live class timings, and student rosters. Drip dates and instructor assignments can be customized per batch.",
    },
    {
      question: "How is student attendance tracked for live classes?",
      answer:
        "LMS Domain automatically logs attendance when learners join scheduled Zoom classes through the platform. Instructors and administrators can export complete attendance sheets per session.",
    },
    {
      question: "What roles are available for academy team members?",
      answer:
        "LMS Domain provides Admin and Instructor roles with role-based permissions. Admins oversee the entire platform, while Instructors can be restricted to managing their assigned courses, batches, and evaluations.",
    },
    {
      question: "Can I send automated email and SMS notifications?",
      answer:
        "Yes, LMS Domain supports automated email announcements, batch updates, and class reminders. SMS notifications are also available as an option for critical schedule alerts.",
    },
    {
      question: "Can I export student performance and enrollment data?",
      answer:
        "Yes, you can export student rosters, course progress percentages, test scores, and payment reports to CSV spreadsheets anytime from the admin portal.",
    },
    {
      question: "Is there a mobile app for academy administrators?",
      answer:
        "The LMS Domain admin portal is fully responsive and accessible from any smartphone or tablet browser. Branded native mobile apps for Android and iOS are on our roadmap.",
    },
  ],
};

