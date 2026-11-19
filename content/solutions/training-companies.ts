import { SolutionPageData } from "./types";

export const trainingCompaniesData: SolutionPageData = {
  slug: "training-companies",
  eyebrow: "Training companies",
  title: "Run client cohorts and certify the people who finish",
  subtitle: "LMS Domain helps training companies and professional educators run private batches for each client, deliver bootcamps and live sessions, review project work, issue branded certificates and report on completion, on your own website.",
  metaTitle: "LMS for Training Companies & Corporate Cohorts | LMS Domain",
  metaDescription: "Run private client batches and bootcamps, teach live, review projects, issue branded certificates and export completion reports on your own white-label LMS.",
  sectionHeading: "How does LMS Domain support professional training businesses?",
  features: [
    {
      title: "Bootcamps & cohort delivery",
      tagline: "Intensive cohort learning with group milestones.",
      description:
        "Deliver structured vocational bootcamps with shared milestone checkpoints, scheduled live sessions, and coordinated instructor reviews.",
      icon: "Users",
    },
    {
      title: "1:1 tutor booking",
      tagline: "Dedicated office hours and private consultations.",
      description:
        "Learners can book 1:1 sessions with your trainers directly based on calendar availability.",
      icon: "UserCheck",
    },
    {
      title: "Private batches for a client",
      tagline: "Dedicated cohort rosters and schedules.",
      description:
        "Run private batches for a client, schedule live sessions, and monitor attendance and completion across the cohort.",
      icon: "Building2",
    },
    {
      title: "Instructor payouts & reporting",
      tagline: "Automated revenue splitting and financial tracking.",
      description:
        "Work out trainer revenue splits and export enrolment, progress and completion reports at any time.",
      icon: "BarChart3",
    },
    {
      title: "Branded completion certificates",
      tagline: "Certificates for learners who finish",
      description:
        "Award branded PDF certificates when learners meet the course's passing requirements.",
      icon: "Award",
    },
  ],
  platformLinks: [
    {
      title: "Bootcamps & Live Classes",
      href: "/platform/teach",
      description: "Deliver cohort bootcamps, live sessions and 1:1 tutor bookings.",
    },
    {
      title: "Client Batches & Payments",
      href: "/platform/sell",
      description: "Take online or offline payments for client batches, with B2B GST invoices for academies in India.",
    },
    {
      title: "Branded Certificates & Testing",
      href: "/platform/assess",
      description: "Issue completion certificates and evaluate hands-on assignments.",
    },
  ],
  faqs: [
    {
      question: "How can training companies deliver cohort bootcamps?",
      answer:
        "You can organize vocational bootcamps with defined start dates, group milestones, scheduled live sessions, and practical project submissions reviewed by instructors.",
    },
    {
      question: "Can learners book 1:1 sessions with trainers?",
      answer:
        "Yes, the Tutor Booking feature allows learners to schedule and pay for private 1:1 sessions based on the trainer's calendar availability.",
    },
    {
      question: "Can I invoice clients for group batches?",
      answer:
        "Yes. You can collect payment online or accept a bank transfer and approve it once you've checked the receipt. Academies in India can also issue B2B GST invoices with the client's GSTIN.",
    },
    {
      question: "How are instructor revenue payouts tracked?",
      answer:
        "LMS Domain tracks sales per instructor so admins can work out revenue splits and export detailed reports.",
    },
    {
      question: "Can we award branded certificates to learners who finish?",
      answer:
        "Yes, you can configure branded PDF certificates for learners who finish training bootcamps and fulfill course completion requirements.",
    },
    {
      question: "Is training content protected against unauthorized downloading?",
      answer:
        "Yes, training videos are protected with dynamic viewer watermarks, device sign-in limits, and role-based access permissions on secure cloud infrastructure.",
    },
  ],
  ctaTitle: "Scale your training business with LMS Domain.",
  ctaSubtitle:
    "Book a 20-minute demo. We'll show you how cohort management, client batches, and trainer workflows operate together.",
  ctaButtonText: "Book a demo",
  v5: {
    heroAccent: "certify the people who finish",
    pains: [
      { before: "A separate spreadsheet for every client's learners", after: "A private batch for each client, with its own roster and schedule" },
      { before: "Session links and recordings sent around by email", after: "Live sessions, recordings saved to the course" },
      { before: "Certificates made one by one in a design tool", after: "Branded PDF certificates issued when learners finish" },
      { before: "Clients asking for progress updates every week", after: "Completion and test reports exported in a click" },
    ],
    weekTitle: "One client cohort, start to finish",
    weekSubtitle: "How a training company runs a 6-week programme for a client on LMS Domain.",
    week: [
      {
        day: "Wk 1",
        title: "Private batch set up",
        body: "The client's team gets its own batch, with a schedule, a trainer and drip release for each module.",
        card: {
          title: "Northwind Retail · Data skills",
          meta: "Private batch · 32 learners",
          rows: [
            { label: "Trainer", value: "Daniel Reyes" },
            { label: "Live sessions", value: "Tue, Thu" },
            { label: "Module 1", value: "Unlocked", tone: "ok" },
          ],
        },
      },
      {
        day: "Wk 3",
        title: "Live sessions and practice",
        body: "Learners join live sessions and work through recorded lessons between them.",
        card: {
          title: "Session 5 · Pivot tables",
          meta: "Live · 1 h 15 min",
          progress: { label: "29 of 32 joined", value: 91 },
          chip: { label: "Recording saved", tone: "ok" },
        },
      },
      {
        day: "Wk 5",
        title: "Project reviewed",
        body: "Each learner submits a project. Trainers score it and give private feedback.",
        card: {
          title: "Final project · Sales dashboard",
          meta: "Due Friday",
          rows: [
            { label: "Reviewed", value: "24", tone: "ok" },
            { label: "Waiting for review", value: "6", tone: "warn" },
            { label: "Not submitted", value: "2", tone: "muted" },
          ],
        },
      },
      {
        day: "Wk 6",
        title: "Certified and reported",
        body: "Learners who finish get a branded certificate, and you export the completion report for your client.",
        card: {
          title: "Programme complete",
          meta: "Northwind Retail",
          progress: { label: "28 of 32 completed", value: 88 },
          chip: { label: "28 certificates issued", tone: "brand" },
        },
      },
    ],
  },
};

