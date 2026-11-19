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
    metaTitle: "Edmingle Alternative for Academies | LMS Domain",
    metaDescription:
      "Comparing Edmingle? LMS Domain gives academies live classes, batches, timed tests, payments in any currency and their own domain, with 0% commission.",
    title: "Looking for an Edmingle alternative for your academy?",
    subtitle:
      "LMS Domain is an all-in-one platform for academies, coaching institutes and training businesses anywhere. Run batches with live classes, timed tests and certificates, and sell in any currency on your own domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain is built for education businesses that teach in batches and want payments to go straight to their own account.",
      points: [
        "Academies that run morning, evening and weekend batches, with attendance logged automatically.",
        "Institutes that sell to learners in more than one country, through Stripe, Razorpay, Paytm or DOKU.",
        "Teams that want hands-on help from our team to set up courses, domain and payments.",
        "Schools and training companies that prefer a fixed plan price with 0% commission on sales.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Built for batch teaching",
        description: "Give each batch its own start date, live class schedule, attendance log and lesson release dates.",
      },
      {
        title: "Your academy on your own domain",
        description: "Run your academy on your own web address, with your logo and colours and free SSL, on every plan.",
      },
      {
        title: "Payments in any currency",
        description:
          "Take payments through Stripe, Razorpay, Paytm or DOKU in your learners' currencies. Academies in India also get automatic GST invoices.",
      },
      {
        title: "Tests and certificates",
        description: "Run timed tests from your question banks and send branded PDF certificates when learners finish.",
      },
    ],
    faqs: [
      {
        question: "Can I move my existing courses and learners to LMS Domain?",
        answer:
          "Yes. Our team helps you move courses and learners from other platforms. Full migration is included free on [Enterprise](/pricing).",
      },
      {
        question: "Does LMS Domain take a commission on my sales?",
        answer: "No. You pay a fixed plan price and keep 100% of your sales. Your payment gateway charges its usual processing fees.",
      },
      {
        question: "Can I run live classes?",
        answer: "Yes. Schedule live classes for each batch. Learners join from your academy, and attendance is logged automatically.",
      },
    ],
  },

  "graphy-alternative": {
    slug: "graphy-alternative",
    competitorName: "Graphy",
    metaTitle: "Graphy Alternative for Academies | LMS Domain",
    metaDescription:
      "Comparing Graphy? LMS Domain gives academies live batches, timed tests, certificates and payments in any currency on their own domain, with 0% commission.",
    title: "Looking for a Graphy alternative for your online academy?",
    subtitle:
      "LMS Domain is a white-label learning platform for academies and educators anywhere. Teach recorded courses and live batches, run timed tests, and sell in any currency under your own brand and domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description: "LMS Domain is built for academies that teach in scheduled batches, test their learners and want payments paid straight to them.",
      points: [
        "Academies and tutors who teach live batches, not only recorded courses.",
        "Institutes that need question banks and timed tests for exams and language courses.",
        "Businesses that want payments to settle straight into their own Stripe, Razorpay, Paytm or DOKU account.",
        "Teams that want help from our team with setup and ongoing support.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Batches and timetables",
        description: "Run several batches of the same course, each with its own learners, class links and attendance.",
      },
      {
        title: "Your domain, your brand",
        description: "Host your academy on your own domain with free SSL, your colours and a built-in blog.",
      },
      {
        title: "Tests and certificates",
        description: "Timed tests scored automatically, written assignments with teacher feedback, and branded PDF certificates.",
      },
      {
        title: "Domie AI on Pro",
        description: "On the Pro plan, Domie AI answers learner questions using only your own published course content.",
      },
    ],
    faqs: [
      {
        question: "How are learner payments handled?",
        answer:
          "You connect your own Stripe, Razorpay, Paytm or DOKU account, and payments go straight to you. LMS Domain charges 0% commission.",
      },
      {
        question: "Can I use my own domain?",
        answer: "Yes, on Growth and up, with free SSL included. On Starter, your academy runs on a free LMS Domain subdomain.",
      },
    ],
  },

  "learnyst-alternative": {
    slug: "learnyst-alternative",
    competitorName: "Learnyst",
    metaTitle: "Learnyst Alternative for Academies | LMS Domain",
    metaDescription:
      "Comparing Learnyst? LMS Domain gives academies live classes, batches, timed tests, video watermarking and payments in any currency on their own domain.",
    title: "Looking for a Learnyst alternative for your institute?",
    subtitle:
      "LMS Domain is one simple platform for academies and coaching institutes anywhere. Teach live classes, manage batches, run timed tests and take payments in any currency on your own domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description: "LMS Domain suits academies that want a simple experience for learners and staff, with reliable batch tools.",
      points: [
        "Institutes that want a clean, modern experience for learners on phone and desktop browsers.",
        "Academies that teach live, with attendance logged and recordings saved to the course.",
        "Training companies that run bootcamps and paid 1:1 sessions.",
        "Educators who want hands-on help moving from their current platform.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Simple for learners and staff",
        description: "Clear navigation for learners and your team, so they spend time learning and teaching, not looking for things.",
      },
      {
        title: "Live classes",
        description: "Schedule classes for each batch, send reminders, log attendance and save recordings to the right module.",
      },
      {
        title: "Content protection",
        description: "Protect your videos with DRM encryption, watermarks showing each learner's details and a screen-recording block in the apps, plus device limits (Pro and up).",
      },
      {
        title: "Payments in any currency",
        description: "Sell through Stripe, Razorpay, Paytm or DOKU, with coupons and offline payments you approve (Growth and up).",
      },
    ],
    faqs: [
      {
        question: "Does LMS Domain have question banks and timed tests?",
        answer: "Yes. Organise questions by subject and difficulty, set a time limit and a pass mark, and see results the moment a test closes.",
      },
      {
        question: "Is there a mobile app?",
        answer: "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
      },
    ],
  },

  "thinkific-alternative": {
    slug: "thinkific-alternative",
    competitorName: "Thinkific",
    metaTitle: "Thinkific Alternative for Live-Batch Academies | LMS Domain",
    metaDescription:
      "Comparing Thinkific? LMS Domain is built for academies that teach live batches: live classes, attendance, timed tests and payments in any currency, with 0% commission.",
    title: "Looking for a Thinkific alternative built for live batches?",
    subtitle:
      "LMS Domain is built for academies that teach in batches as well as selling recorded courses. Run live classes, track attendance, test your learners and get paid in any currency through your own payment gateway.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description: "LMS Domain suits academies whose teaching runs on a timetable, with live classes, batches and tests.",
      points: [
        "Academies that teach live batches, not only self-paced courses.",
        "Institutes that sell to learners in several countries, in their own currencies.",
        "Businesses that want payments to go straight to their own Stripe, Razorpay, Paytm or DOKU account.",
        "Educators who want setup help from a real team, and the same support after launch.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Your choice of payment gateway",
        description: "Connect Stripe, Razorpay, Paytm or DOKU and sell in multiple currencies. Payments go straight to you.",
      },
      {
        title: "0% commission",
        description: "You pay a fixed plan price and keep every sale. Academies in India also get automatic GST invoices.",
      },
      {
        title: "Batches with live classes",
        description: "Run morning and evening batches with lesson release dates, live class attendance and roles for your teachers.",
      },
      {
        title: "Setup help from our team",
        description: "We help you get your courses, domain and payments ready, and stay on hand after you launch.",
      },
    ],
    faqs: [
      {
        question: "Can learners from other countries buy my courses?",
        answer: "Yes. Connect Stripe or DOKU to accept international cards and currencies, alongside any local payment methods you offer.",
      },
      {
        question: "Can I sell private 1:1 sessions?",
        answer: "Yes. With tutor booking (Growth and up), learners pick a tutor, day and time, and pay for private sessions on your site.",
      },
    ],
  },

  "teachable-alternative": {
    slug: "teachable-alternative",
    competitorName: "Teachable",
    metaTitle: "Teachable Alternative for Live Teaching | LMS Domain",
    metaDescription:
      "Comparing Teachable? LMS Domain is built for academies that teach live: batches, live classes with attendance, timed tests and payments in any currency.",
    title: "Looking for a Teachable alternative built for live batch teaching?",
    subtitle:
      "LMS Domain gives academies the tools for live teaching as well as recorded courses: batches with live classes, timed tests, 1:1 bookings and payments in any currency, all on your own domain.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description: "LMS Domain suits academies and training institutes that teach live, test their learners and run on a timetable.",
      points: [
        "Institutes that run scheduled live classes, with attendance logged automatically.",
        "Academies that need question banks and timed tests with automatic scoring.",
        "Businesses that want to sell in several currencies through their own payment gateway.",
        "Teams that want their own branding on every plan, and their own domain from Growth.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Batches, live classes and attendance",
        description: "Run live classes for each batch, log attendance automatically and save recordings to the course.",
      },
      {
        title: "Payments that go straight to you",
        description: "Use Stripe, Razorpay, Paytm or DOKU in multiple currencies, with automatic GST invoices for academies in India.",
      },
      {
        title: "Question banks and timed tests",
        description: "Build tests from your question banks with a time limit and pass mark, and see scores straight away.",
      },
      {
        title: "Your brand on every plan",
        description: "Your logo and colours on every plan, and your own domain with free SSL from Growth.",
      },
    ],
    faqs: [
      {
        question: "Does LMS Domain take a percentage of my sales?",
        answer: "No. You pay a fixed plan price with 0% commission. Your payment gateway charges its usual processing fees.",
      },
      {
        question: "Can I sell ebooks and downloadable materials?",
        answer: "Yes. Sell ebooks on their own or include them with a course.",
      },
    ],
  },

  "kajabi-alternative": {
    slug: "kajabi-alternative",
    competitorName: "Kajabi",
    metaTitle: "Kajabi Alternative for Academies | LMS Domain",
    metaDescription:
      "Comparing Kajabi? LMS Domain focuses on running an academy: batches, live classes, timed tests, certificates and payments in any currency on your own domain.",
    title: "Looking for a Kajabi alternative focused on running an academy?",
    subtitle:
      "LMS Domain focuses on the day-to-day work of an academy: batches and timetables, live classes, tests and certificates, and payments in any currency through your own gateway.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description:
        "LMS Domain suits coaching institutes, language schools and training companies that want tools for teaching and running classes at a clear price.",
      points: [
        "Academies that need batch timetables, live classes and attendance logs.",
        "Institutes that rely on question banks, timed tests and PDF certificates.",
        "Businesses that want payments to settle straight into their own account, in their learners' currencies.",
        "Educators who want a clear plan price with 0% commission on sales.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "Focused on running your academy",
        description: "Teaching, tests, batches and payments in one place, so your team runs classes from one dashboard.",
      },
      {
        title: "Live teaching",
        description: "Start live classes from your academy, with attendance logged and recordings saved to the course.",
      },
      {
        title: "Payments in any currency",
        description: "Connect Stripe, Razorpay, Paytm or DOKU, with coupons and offline payments you approve (Growth and up).",
      },
      {
        title: "Onboarding with our team",
        description: "We help you move your courses, connect your domain and train your staff when you start.",
      },
    ],
    faqs: [
      {
        question: "How does LMS Domain pricing work?",
        answer: "Each plan has a fixed price, with 0% commission on every plan and your own domain from Growth. See the [pricing page](/pricing) for details.",
      },
      {
        question: "Can several teachers work in my academy?",
        answer: "Yes. Give your team Admin or Instructor roles, so each teacher sees and manages only what they need.",
      },
    ],
  },

  "moodle-alternative": {
    slug: "moodle-alternative",
    competitorName: "Moodle",
    metaTitle: "Moodle Alternative: Fully Managed LMS | LMS Domain",
    metaDescription:
      "Comparing Moodle? LMS Domain is a fully managed LMS: no servers or plugins to look after, with live classes, timed tests and built-in payments.",
    title: "Looking for a fully managed Moodle alternative?",
    subtitle:
      "Moodle is open source and often self-hosted, which means looking after hosting, upgrades and plugins. LMS Domain is fully managed: live classes, tests and payments are built in, and we look after the hosting.",
    whoSuitsBetter: {
      heading: "Who LMS Domain suits best",
      description: "LMS Domain suits academies and training businesses that want a complete LMS without running servers or plugins.",
      points: [
        "Institutes that want a modern experience for learners that works well on phones.",
        "Organisations that don't want to manage servers, upgrades or security patches.",
        "Academies that want to sell courses with built-in checkout, coupons and multi-currency pricing.",
        "Teams that want live classes with attendance, without extra plugins.",
      ],
    },
    lmsDomainStrengths: [
      {
        title: "No servers to look after",
        description: "We run the hosting, SSL and updates on managed cloud infrastructure, over HTTPS.",
      },
      {
        title: "Selling built in",
        description: "Sell courses through Stripe, Razorpay, Paytm or DOKU in multiple currencies, with no shop plugins to set up.",
      },
      {
        title: "Modern on every device",
        description: "Clean pages that learners and teachers find easy to use on a phone or a computer.",
      },
      {
        title: "Batches and live classes ready to go",
        description: "Live classes, batch timetables and question bank tests work from day one.",
      },
    ],
    faqs: [
      {
        question: "Can we move our courses from Moodle?",
        answer:
          "Yes. Our team helps you move courses and learners from other platforms. Full migration is included free on [Enterprise](/pricing).",
      },
      {
        question: "Who owns our courses and learner data?",
        answer: "You do. Your courses, question banks and learner records belong to your academy.",
      },
    ],
  },
};
