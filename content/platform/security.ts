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
      title: "Encrypted cloud hosting",
      description:
        "Hosted on AWS infrastructure with TLS 1.2+ encrypted network connections and AES-256 storage encryption at rest.",
      icon: "Server",
    },
    {
      title: "Data handling & DPA",
      description:
        "Governed by a transparent Data Processing Agreement with clear institutional ownership, export options, and privacy protections.",
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
