import { PlatformPageData } from "./types";

export const managePlatformData: PlatformPageData = {
  slug: "manage",
  eyebrow: "Manage",
  heroAccent: "at a glance",
  aiNote: "With Domie AI (Pro), see which learners are falling behind on progress or attendance before it becomes a problem.",
  title: "See every batch, learner and class at a glance",
  subtitle: "LMS Domain keeps batch rosters, learner progress and attendance for every live class in one dashboard, with roles for your team and automatic reminders for learners.",
  metaTitle: "Batch Management, Attendance & Learner Tracking | LMS Domain",
  metaDescription: "Manage batches, track attendance for every live class, follow learner progress, set team roles and send email and SMS reminders from one LMS Domain dashboard.",
  sectionHeading: "Everything you need to run your academy",
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
        "Attendance is logged automatically when learners join a live class, and you can export the sheet for any session.",
      icon: "ClipboardCheck",
    },
    {
      title: "Roles and permissions (RBAC)",
      description:
        "Give admins full control and limit instructors to their own courses, batches and reviews.",
      icon: "ShieldAlert",
      plan: "Custom roles on Pro",
    },
    {
      title: "Email, WhatsApp & SMS notifications",
      description:
        "Send announcements, class reminders and enrolment notices by email and WhatsApp automatically. SMS is available on Growth and up.",
      icon: "Bell",
    },
    {
      title: "API and webhooks",
      description:
        "Connect LMS Domain to your CRM, HR or accounting tools with the public API and webhooks.",
      icon: "Command",
      plan: "Growth",
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
        "Run several batch timings, get Zoom attendance logged automatically, and remind students by email or SMS.",
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
        "The admin portal works in any phone or tablet browser. Learners get the LMS Domain app for Android and iOS, or your own branded app on Pro and Enterprise.",
    },
  ],
};

