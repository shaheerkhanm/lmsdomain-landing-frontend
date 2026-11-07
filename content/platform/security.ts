import { PlatformPageData } from "./types";

export const securityPlatformData: PlatformPageData = {
  slug: "security",
  eyebrow: "SECURITY & DATA PROTECTION",
  title: "Protect your courses and your learners' data.",
  subtitle:
    "LMS Domain delivers secure cloud hosting and content protection for coaching institutes and enterprise training companies in India. Safeguard course lecture videos with dynamic learner watermarks, enforce simultaneous device login limits, assign Admin and Instructor access controls, and retain full ownership with complete data export capabilities.",
  metaTitle: "Secure Cloud LMS & Video Watermarking | LMS Domain",
  metaDescription:
    "Protect courses with dynamic video watermarks, learner device sign-in limits, staff role permissions, and secure cloud hosting on your own domain.",
  sectionHeading: "How does content and data protection work in LMS Domain?",
  frameTitle: "Security, Watermarking & Access Controls",
  frameAlt: "Protect your courses and your learners' data",
  features: [
    {
      title: "Video watermarking",
      description:
        "Discourage unauthorized video screen recording with dynamic, viewer-specific watermarks stamped across playback.",
      icon: "ShieldAlert",
    },
    {
      title: "Learner device limits",
      description:
        "Manage account sharing by enforcing a maximum number of authorized sign-in devices per registered student.",
      icon: "Smartphone",
    },
    {
      title: "Role-based access control (RBAC)",
      description:
        "Enforce strict least-privilege security with granular permissions for administrators, instructors, and evaluators.",
      icon: "Lock",
    },
    {
      title: "Managed cloud hosting",
      description:
        "Managed cloud hosting with HTTPS on every academy domain.",
      icon: "Server",
    },
    {
      title: "Your data stays yours",
      description:
        "Your data stays yours, and you can export it.",
      icon: "FileText",
    },
  ],
  usedFor: [
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Satisfy corporate data handling requirements, protect intellectual property, and govern employee records.",
    },
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Prevent question bank leakages and unauthorized screen recording of proprietary test preparation materials.",
    },
    {
      title: "Coaching institutes",
      href: "/solutions/coaching-institutes",
      description:
        "Protect competitive exam video modules and restrict student credentials from unauthorized sharing.",
    },
  ],
  faqs: [
    {
      question: "How does dynamic video watermarking protect course videos?",
      answer:
        "Dynamic video watermarking stamps the logged-in student's email and user ID visibly across the video player during playback. This discourages screen recording and unauthorized video sharing.",
    },
    {
      question: "Can I restrict simultaneous student device logins?",
      answer:
        "Yes, you can enforce maximum device limits per student account. When the limit is reached, older sessions are terminated or new logins are blocked to prevent credential sharing.",
    },
    {
      question: "Where is academy data hosted, and who owns it?",
      answer:
        "Your academy data is hosted on secure cloud infrastructure protected with TLS encryption. You retain 100% ownership of your course content, student records, and intellectual property.",
    },
    {
      question: "What permissions do Instructor accounts have?",
      answer:
        "Instructor accounts have restricted role-based permissions. They can view only their assigned batches, manage course materials, and grade student tests without accessing overall financial or revenue reports.",
    },
    {
      question: "Can I export all my student and course data?",
      answer:
        "Yes, you can export student directories, test results, attendance logs, and transaction reports at any time in standard CSV format.",
    },
    {
      question: "Is there DRM video encryption available today?",
      answer:
        "Hardware DRM encryption (such as Widevine and FairPlay) is currently on our product roadmap. Today, lecture videos are protected with dynamic user watermarking, secure streaming tokens, and strict session limits.",
    },
  ],
};

