import { SolutionPageData } from "./types";

export const coachingInstitutesData: SolutionPageData = {
  slug: "coaching-institutes",
  eyebrow: "COACHING INSTITUTES & TUTORS",
  title: "The LMS built for coaching institutes that teach live batches.",
  subtitle:
    "LMS Domain is an all-in-one learning management system for coaching institutes, competitive exam centers, and tuition academies in India. Run scheduled morning and evening batches, teach live on Zoom with automatic attendance, conduct timed mock tests, and collect fees with GST invoices on your own custom domain.",
  metaTitle: "LMS for Coaching Institutes in India | LMS Domain",
  metaDescription:
    "Run live Zoom batches, track class attendance, conduct timed mock tests, and collect course fees with GST invoices on your own branded coaching website.",
  sectionHeading: "How does LMS Domain support coaching institutes and tuition centers?",
  features: [
    {
      title: "Batch scheduling & timetables",
      tagline: "Morning and evening batches with drip lesson pacing.",
      description:
        "Organize distinct shifts for schools, repeaters, and weekend cohorts. Set class schedules, manage student rosters, and drip release lesson materials as your syllabus advances.",
      icon: "CalendarRange",
    },
    {
      title: "Live Zoom classes with attendance",
      tagline: "Classroom meetings with automated attendance logging.",
      description:
        "Launch Zoom live lectures directly from the student dashboard. Attendance is recorded automatically as learners join, and cloud lecture recordings are archived with the course.",
      icon: "Video",
    },
    {
      title: "Mock tests & question banks",
      tagline: "Chapter-wise quizzes and timed competitive exams.",
      description:
        "Build deep question banks organized by subject and difficulty. Administer timed mock exams with automated score calculation, negative marking options, and instant student rank reports.",
      icon: "CheckSquare",
    },
    {
      title: "Fee collection with GST invoices",
      tagline: "Razorpay, Paytm, UPI, and manual bank transfer reviews.",
      description:
        "Collect monthly or term tuition fees directly to your bank account. The system issues automated GST-compliant tax invoices and lets staff verify direct bank transfer receipts.",
      icon: "CreditCard",
    },
    {
      title: "Student & parent alerts",
      tagline: "Automated transactional email and SMS class notifications.",
      description:
        "Send batch schedule updates, unexpected cancellation alerts, and fee due reminders directly through transactional emails and optional SMS broadcasts.",
      icon: "Building2",
    },
    {
      title: "Branded institute website",
      tagline: "Your name, logo, colors, and domain.",
      description:
        "Deliver learning under your institute's official domain name (e.g., learn.yourinstitute.com) with custom color themes, course catalog pages, and faculty biographies.",
      icon: "Award",
    },
  ],
  platformLinks: [
    {
      title: "Teach & Batches",
      href: "/platform/teach",
      description: "Manage multiple batch shifts with drip content and live Zoom classes.",
    },
    {
      title: "Assess & Question Banks",
      href: "/platform/assess",
      description: "Configure timed mock exams and automated student scoring.",
    },
    {
      title: "Sell & GST Invoices",
      href: "/platform/sell",
      description: "Accept local payment methods with GST tax receipts and offline approvals.",
    },
  ],
  faqs: [
    {
      question: "Can coaching institutes run multiple batches for the same subject?",
      answer:
        "Yes, you can create multiple morning, evening, and weekend batches for any course. Each batch has its own independent calendar schedule, student roster, and Zoom live class links.",
    },
    {
      question: "How do live Zoom classes work with attendance tracking?",
      answer:
        "Live sessions launch directly through our Zoom integration without sharing separate external meeting IDs. The platform logs each learner's join and exit timestamps automatically for staff review.",
    },
    {
      question: "Can we create chapter-wise mock tests and question banks?",
      answer:
        "Yes, you can upload question banks organized by topic and difficulty level. You can generate timed chapter quizzes or full-length mock examinations with automated scoring and answer explanations.",
    },
    {
      question: "How do fee collection and GST invoices work?",
      answer:
        "Students can pay fees online via UPI, debit cards, net banking, or payment gateways including Razorpay and Paytm. Automated GST tax invoices are generated instantly with your academy GSTIN details.",
    },
    {
      question: "Can we send SMS and email alerts to students?",
      answer:
        "Yes, LMS Domain supports automated email announcements and optional SMS broadcasts for batch schedule changes, exam reminders, and enrollment confirmations.",
    },
    {
      question: "Is there a mobile app for students?",
      answer:
        "Students can attend live classes, watch recorded lectures, and take practice tests using any mobile web browser today. Dedicated branded native mobile apps for Android and iOS are on our product roadmap.",
    },
  ],
  ctaTitle: "See how LMS Domain powers your coaching institute.",
  ctaSubtitle:
    "Book a 20-minute demo. We'll show you how batch schedules, live Zoom classes, and timed mock tests operate on your custom domain.",
  ctaButtonText: "Book a demo",
};

