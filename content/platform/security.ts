import { PlatformPageData } from "./types";

export const securityPlatformData: PlatformPageData = {
  slug: "security",
  eyebrow: "Security",
  heroAccent: "your courses",
  title: "Protect your courses and your learners' data",
  subtitle: "LMS Domain stops course sharing with DRM-encrypted video, learner watermarks, a screen-recording block in the apps and device limits. It gives your team role-based access and single sign-on, and runs on managed cloud hosting with TLS encryption.",
  metaTitle: "Secure LMS with DRM Video, Watermarks & SSO | LMS Domain",
  metaDescription: "Protect course videos with DRM, learner watermarks, a screen-recording block and device limits. Control access with roles and SSO, export your data any time, DPDP and GDPR ready.",
  sectionHeading: "Everything you need to keep content safe",
  frameTitle: "Security, Watermarking & Access Controls",
  frameAlt: "Protect your courses and your learners' data",
  features: [
    {
      title: "DRM-encrypted video",
      description:
        "Course videos are streamed encrypted, so they can't be downloaded or played outside your academy.",
      icon: "Lock",
    },
    {
      title: "Video watermarking",
      description:
        "Discourage screen recording with dynamic, viewer-specific watermarks stamped across playback.",
      icon: "ShieldAlert",
    },
    {
      title: "Screen-recording block",
      description:
        "In the Android and iOS apps, screen recording and screenshots are blocked while lessons play.",
      icon: "Smartphone",
    },
    {
      title: "Learner device limits",
      description:
        "Manage account sharing by enforcing a maximum number of authorized sign-in devices per registered student.",
      icon: "Smartphone",
      plan: "Pro",
    },
    {
      title: "Single sign-on (SSO)",
      description:
        "Let your team and learners sign in with the accounts they already use, managed in one place.",
      icon: "Lock",
      plan: "Pro",
    },
    {
      title: "Role-based access control (RBAC)",
      description:
        "Enforce strict least-privilege security with granular permissions for administrators, instructors, and evaluators.",
      icon: "Lock",
      plan: "Custom roles on Pro",
    },
    {
      title: "Managed cloud hosting",
      description:
        "Hosted with a certified cloud provider, with HTTPS on every academy domain.",
      icon: "Server",
    },
    {
      title: "Your data stays yours",
      description:
        "Export your learners, courses, results and payments any time. DPDP and GDPR ready, with data deleted on request.",
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
        "Your academy data is hosted with a certified cloud provider and protected with TLS encryption. You keep 100% ownership of your course content, student records, and intellectual property. LMS Domain is DPDP and GDPR ready: we sign a data processing agreement and delete data on request.",
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
      question: "How are course videos protected from unauthorized downloading?",
      answer:
        "Course videos are DRM-encrypted and streamed with time-limited playback tokens and dynamic watermarks showing the learner's email and phone number. In the Android and iOS apps, screen recording is blocked. On Pro, you can also limit how many devices each learner signs in from.",
    },
  ],
};

