import { PlatformPageData } from "./types";

export const securityPlatformData: PlatformPageData = {
  slug: "security",
  eyebrow: "SECURITY & DATA PROTECTION",
  title: "Protect your courses and your learners' data.",
  subtitle:
    "Protect proprietary course videos, control student account access, and ensure compliant data processing on secure cloud infrastructure.",
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
  ],
};

