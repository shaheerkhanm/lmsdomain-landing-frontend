export interface ComparePageData {
  slug: string;
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  whoSuitsBetter: {
    heading: string;
    description: string;
    points: string[];
  };
  lmsDomainStrengths: {
    title: string;
    description: string;
  }[];
  competitorPublicInfo?: {
    statement: string;
    sourceUrl: string;
    checkedOn: string;
  };
  faqs: { question: string; answer: string }[];
}

export const COMPARE_PAGES: Record<string, ComparePageData> = {
  "edmingle-alternative": {
    slug: "edmingle-alternative",
    competitorName: "Edmingle",
    metaTitle: "Edmingle Alternative: Academy & Batch LMS | LMS Domain",
    metaDescription:
      "Looking for an Edmingle alternative in India? LMS Domain provides scheduled live Zoom batches, mock tests, GST invoices, and dedicated onboarding on your own domain.",
    title: "Looking for an Edmingle alternative for your academy?",
    subtitle:
      "LMS Domain is an all-in-one learning management system built for Indian coaching institutes, test-prep centers, and training businesses. Run scheduled live Zoom batches, timed mock tests, and collect fees with automated GST invoices under your own brand.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is designed specifically for education businesses that teach in batches and require direct payment settlements with local Indian support.",
      points: [
        "Institutes that run structured morning, evening, and weekend batches with automated attendance.",
        "Academies that need built-in GST tax invoices and direct payouts via Razorpay, Paytm, and Stripe.",
        "Educators who want direct guidance and hands-on onboarding from an engineering team in Kerala, India.",
        "Schools and training companies that prefer predictable subscription pricing without platform commission cuts.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Built for scheduled batch teaching",
        description:
          "Manage distinct student cohorts with individual start dates, Zoom live class schedules, automatic attendance tracking, and drip lesson pacing.",
      },
      {
        title: "Complete white-label on your domain",
        description:
          "Launch your academy portal on your own web domain (learn.yourbrand.com) with custom logos, brand color accents, and free automated SSL.",
      },
      {
        title: "Indian payment gateways with GST",
        description:
          "Collect fees via Razorpay, Paytm, Stripe, or DOKU with automated GST-compliant tax invoices and offline bank transfer approvals.",
      },
      {
        title: "Testing & branded certificates",
        description:
          "Conduct chapter-wise quizzes and timed mock exams from question banks, and issue branded PDF completion certificates.",
      },
    ],
    faqs: [
      {
        question: "Can I move my existing courses and student records to LMS Domain?",
        answer:
          "Yes, our onboarding team assists with migrating course videos, student rosters, question banks, and learning materials to ensure a smooth transition.",
      },
      {
        question: "Does LMS Domain charge a commission on my course sales?",
        answer:
          "No, LMS Domain operates on fixed subscription pricing with zero platform transaction commissions. Standard processing fees are charged directly by your payment gateway.",
      },
      {
        question: "Can I run live classes through Zoom?",
        answer:
          "Yes, LMS Domain integrates directly with Zoom so scheduled live classes launch seamlessly from the student portal, with attendance logged automatically.",
      },
    ],
  },

  "graphy-alternative": {
    slug: "graphy-alternative",
    competitorName: "Graphy",
    metaTitle: "Graphy Alternative: White-Label Academy LMS | LMS Domain",
    metaDescription:
      "Explore LMS Domain as a Graphy alternative. Run live Zoom batches, conduct timed mock exams, sell with GST invoices, and maintain full brand control on your own domain.",
    title: "Looking for a Graphy alternative for your online academy?",
    subtitle:
      "LMS Domain offers a complete white-label learning platform for coaching institutes and educators in India. Deliver structured courses, manage scheduled live batches on Zoom, conduct mock tests, and collect fees with GST compliance under your own domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is purpose-built for academies and coaching businesses that prioritize scheduled cohort teaching, mock assessments, and direct payment relationships.",
      points: [
        "Coaching centers and tutors who teach live cohorts rather than relying solely on marketing funnels.",
        "Institutes requiring robust question banks and timed mock exams for competitive and language tests.",
        "Businesses wanting direct gateway settlements (Razorpay, Paytm) with automated GST invoicing.",
        "Teams looking for dedicated onboarding and direct technical support from an Indian SaaS provider.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Deep batch & timetable operations",
        description:
          "Coordinate multiple morning and evening shifts with distinct rosters, Zoom meeting links, and automatic attendance logs.",
      },
      {
        title: "Your domain, your brand",
        description:
          "Host learning entirely on your domain with automated SSL, custom styling, blog publishing, and downloadable ebooks.",
      },
      {
        title: "Comprehensive assessments & certificates",
        description:
          "Administer timed mock exams with automated scoring, written assignment feedback, and branded PDF completion certificates.",
      },
      {
        title: "Grounded AI assistance",
        description:
          "Domie AI on Premium provides a 24/7 student HelpDesk tutor grounded strictly in your academy's published course materials.",
      },
    ],
    faqs: [
      {
        question: "How does LMS Domain handle student payments?",
        answer:
          "You connect your own payment gateway merchant accounts (Razorpay, Paytm, Stripe, DOKU). Student payments settle directly into your bank account with automated GST invoices.",
      },
      {
        question: "Can I connect my own custom domain?",
        answer:
          "Yes, you can connect your own domain or subdomain on every LMS Domain plan with automated SSL certificate provisioning included.",
      },
    ],
  },

  "learnyst-alternative": {
    slug: "learnyst-alternative",
    competitorName: "Learnyst",
    metaTitle: "Learnyst Alternative: Modern Academy Platform | LMS Domain",
    metaDescription:
      "Considering a Learnyst alternative? LMS Domain offers live Zoom classes, batch scheduling, question bank mock tests, GST invoices, and dynamic video watermarking.",
    title: "Looking for a modern Learnyst alternative for your institute?",
    subtitle:
      "LMS Domain provides a clean, unified platform for coaching institutes and academies in India. Deliver live Zoom classes, manage scheduled batch rosters, run timed mock tests, and collect course fees with automated GST invoices on your own custom domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is ideal for educators seeking a clean, intuitive interface for students and administrators with reliable batch operations.",
      points: [
        "Institutes wanting an uncluttered, modern user experience for students on both desktop and mobile web.",
        "Academies requiring live Zoom classes with automatic attendance and recordings saved directly in course modules.",
        "Training companies delivering bootcamps and 1:1 tutor consultation sessions.",
        "Educators who value hands-on migration and personalized customer support.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Modern, clean user experience",
        description:
          "Intuitive navigation for learners and staff, designed to maximize course completion and reduce support overhead.",
      },
      {
        title: "Live Zoom integration with attendance",
        description:
          "Schedule classes per batch, send automatic reminders, log attendance, and archive lecture replays organized by chapter.",
      },
      {
        title: "Content protection safeguards",
        description:
          "Protect lecture videos with dynamic user watermarks and concurrent device login restrictions.",
      },
      {
        title: "Local payment checkouts with GST",
        description:
          "Accept UPI, cards, and net banking with automated GST tax invoices and one-click offline bank transfer approvals.",
      },
    ],
    faqs: [
      {
        question: "Does LMS Domain support question banks and mock tests?",
        answer:
          "Yes, you can organize questions by subject and difficulty, set countdown timers, configure passing marks, and generate instant rank sheets.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Students access all features seamlessly in any mobile web browser. Native mobile apps are on our product roadmap.",
      },
    ],
  },

  "thinkific-alternative": {
    slug: "thinkific-alternative",
    competitorName: "Thinkific",
    metaTitle: "Thinkific Alternative for India: INR & GST | LMS Domain",
    metaDescription:
      "Need a Thinkific alternative in India? LMS Domain provides INR pricing, UPI and Razorpay payments, automated GST invoices, live Zoom batches, and local Indian support.",
    title: "Looking for a Thinkific alternative with native Indian payments and GST?",
    subtitle:
      "While global course platforms like Thinkific focus on USD subscriptions and recorded video sales, LMS Domain is built specifically for Indian academies requiring UPI payments, automated GST invoices, scheduled live Zoom batches, and local support.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is tailored for academies in India that need domestic payment infrastructure, live batch workflows, and local rupee pricing.",
      points: [
        "Academies that need native UPI, net banking, and RuPay card support through Razorpay and Paytm.",
        "Indian businesses that must issue compliant GST tax invoices with state-wise CGST, SGST, and IGST breakdowns.",
        "Institutes that teach live cohort batches with Zoom rather than relying solely on self-paced videos.",
        "Educators seeking affordable INR plan pricing without foreign currency exchange fluctuations.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Native Indian payment rails",
        description:
          "Accept payments via Razorpay and Paytm with full UPI support (Google Pay, PhonePe, Paytm UPI) and direct bank deposits.",
      },
      {
        title: "Automated GST tax compliance",
        description:
          "Generate compliant GST tax invoices showing your GSTIN and state tax breakdowns automatically on every student enrollment.",
      },
      {
        title: "Scheduled cohort batch management",
        description:
          "Run recurring morning and evening shifts with calendar drip pacing, Zoom attendance tracking, and faculty role permissions.",
      },
      {
        title: "Local Indian support team",
        description:
          "Get prompt, direct assistance from an engineering team based in Kozhikode, Kerala, during your local business hours.",
      },
    ],
    faqs: [
      {
        question: "Can international students also purchase courses on LMS Domain?",
        answer:
          "Yes, by connecting Stripe or DOKU, you can accept international credit cards and currencies alongside domestic Indian payments.",
      },
      {
        question: "Can I offer 1:1 consultation sessions like coaching?",
        answer:
          "Yes, LMS Domain includes a Tutor Booking module allowing learners to book and pay for private 1:1 sessions on your calendar.",
      },
    ],
  },

  "teachable-alternative": {
    slug: "teachable-alternative",
    competitorName: "Teachable",
    metaTitle: "Teachable Alternative for India: GST & Batches | LMS Domain",
    metaDescription:
      "A localized Teachable alternative for Indian academies. Built for live Zoom classes, scheduled batches, question bank mock tests, and GST-compliant checkouts.",
    title: "Looking for a Teachable alternative built for live batch teaching?",
    subtitle:
      "Teachable was designed primarily for asynchronous video courses in Western markets. LMS Domain gives Indian academies the tools they need for live Zoom batches, chapter mock tests, tutor bookings, and automated GST compliance on their own custom domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is built for Indian training institutes and coaching centers that require live interaction, local tax compliance, and batch timetables.",
      points: [
        "Institutes that conduct scheduled live classes via Zoom with automated attendance logging.",
        "Academies requiring chapter-wise mock tests and question banks with automated grading.",
        "Businesses needing domestic UPI checkout and automated GST tax invoices.",
        "Teams wanting white-label branding on their custom domain on every plan.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Batches, Zoom, and attendance",
        description:
          "Run live cohort classes with Zoom integration, log student attendance automatically, and organize lecture recordings by section.",
      },
      {
        title: "Domestic payments & GST invoices",
        description:
          "Integrate Razorpay and Paytm to accept UPI payments, and generate automated GST tax receipts for accounting compliance.",
      },
      {
        title: "Question banks and mock tests",
        description:
          "Administer timed practice tests with custom passing marks, negative scoring, and instant performance analysis.",
      },
      {
        title: "Your domain on every plan",
        description:
          "Connect your own custom domain (learn.yourbrand.in) with free SSL without requiring expensive enterprise tiers.",
      },
    ],
    faqs: [
      {
        question: "Does LMS Domain charge a percentage of my course sales?",
        answer:
          "No, LMS Domain charges fixed software subscription rates with zero platform commissions. Gateway transaction fees are billed directly by your payment gateway.",
      },
      {
        question: "Can I sell downloadable ebooks and materials?",
        answer:
          "Yes, you can sell standalone PDF ebooks or bundle them with course enrollments.",
      },
    ],
  },

  "kajabi-alternative": {
    slug: "kajabi-alternative",
    competitorName: "Kajabi",
    metaTitle: "Kajabi Alternative: Batch & Academy LMS | LMS Domain",
    metaDescription:
      "Looking for a cost-effective Kajabi alternative in India? LMS Domain provides live Zoom classes, batch rosters, mock tests, and GST invoices on your own domain.",
    title: "Looking for a focused, cost-effective Kajabi alternative?",
    subtitle:
      "Kajabi offers marketing tools tailored for solo creators in USD markets at premium pricing. LMS Domain focuses on core academy operations: structured batch scheduling, live Zoom instruction, mock exams, and Indian payment gateways with GST compliance.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is designed for established coaching institutes, language schools, and training organizations seeking operational focus and transparent INR pricing.",
      points: [
        "Academies that need structured batch timetables, live Zoom classes, and attendance logs.",
        "Institutes requiring rigorous question banks, timed mock tests, and PDF certificates.",
        "Businesses that need direct domestic payment settlements in INR with automated GST tax receipts.",
        "Educators who want transparent software pricing without paying premium USD rates for unused marketing funnels.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Focused academy operations",
        description:
          "Everything required to teach, test, manage, and bill students without the overhead and complexity of bloated marketing funnels.",
      },
      {
        title: "Live cohort teaching with Zoom",
        description:
          "Single-click live classroom launching with automated attendance logging and lecture recording archives.",
      },
      {
        title: "Indian payment gateways with GST",
        description:
          "Connect Razorpay, Paytm, Stripe, or DOKU with automated tax invoicing and offline bank transfer reviews.",
      },
      {
        title: "Dedicated onboarding and training",
        description:
          "Our team helps migrate your curriculum, configure your domain, and train your staff during onboarding.",
      },
    ],
    faqs: [
      {
        question: "How does LMS Domain pricing compare?",
        answer:
          "LMS Domain offers transparent, affordable INR subscription pricing tailored to Indian education businesses, with your custom domain included on every tier.",
      },
      {
        question: "Can I manage multiple teachers on my platform?",
        answer:
          "Yes, LMS Domain includes Admin and Instructor roles with granular permissions to restrict instructors to their assigned batches.",
      },
    ],
  },

  "moodle-alternative": {
    slug: "moodle-alternative",
    competitorName: "Moodle",
    metaTitle: "Moodle Alternative: Modern Managed LMS | LMS Domain",
    metaDescription:
      "Tired of managing self-hosted Moodle servers? LMS Domain is a modern, fully managed cloud LMS with live Zoom classes, mock tests, and payment checkouts.",
    title: "Looking for a modern, fully managed Moodle alternative?",
    subtitle:
      "While Moodle is an open-source platform requiring manual server setup, plugin maintenance, and developer support, LMS Domain is a fully managed cloud platform with modern interfaces, integrated Zoom classes, and automated payment gateways.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is built for academies and training businesses that want enterprise-grade learning management without maintaining servers or complex plugin architectures.",
      points: [
        "Institutes that want a modern, intuitive student interface that works effortlessly on mobile devices.",
        "Organizations that want to eliminate server management, PHP upgrades, and security patching overhead.",
        "Academies that require built-in commercial checkouts with Razorpay, Paytm, and automated GST invoices.",
        "Teams wanting live Zoom classes with automatic attendance without installing third-party plugins.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Zero server maintenance",
        description:
          "Fully managed cloud hosting with automated SSL, daily backups, and security updates handled by our team.",
      },
      {
        title: "Built-in monetization & GST",
        description:
          "Sell courses immediately with domestic and international gateways without configuring custom e-commerce plugins.",
      },
      {
        title: "Modern mobile-first design",
        description:
          "Clean, responsive interfaces that students and teachers enjoy opening every day on phone or desktop browsers.",
      },
      {
        title: "Native batch & live class workflows",
        description:
          "Integrated Zoom meetings, batch timetables, and question bank testing ready right out of the box.",
      },
    ],
    faqs: [
      {
        question: "Can we migrate our courses and question banks from Moodle?",
        answer:
          "Yes, our engineering team assists with migrating course structures, video files, PDFs, and question banks into LMS Domain.",
      },
      {
        question: "Who owns our student and course data?",
        answer:
          "You retain 100% ownership of your courses, question banks, and student records. You can export complete data spreadsheets at any time.",
      },
    ],
  },
};

