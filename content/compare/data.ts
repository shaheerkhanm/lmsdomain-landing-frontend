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
  /** Side-by-side facts. "them" values come from the competitor's own public pages (competitorPublicInfo.sourceUrl). */
  glance?: { label: string; us: string; them: string }[];
  /** Honest cases where the competitor may suit someone better. */
  chooseThem?: string[];
}

export const COMPARE_PAGES: Record<string, ComparePageData> = {
  "edmingle-alternative": {
    slug: "edmingle-alternative",
    competitorName: "Edmingle",
    glance: [
      { label: "Your own domain", us: "Growth and up (free subdomain on Starter)", them: "Every plan" },
      { label: "Mobile app", us: "LMS Domain app on every plan; your own Android and iOS app on Pro", them: "Shared app on Core; branded Android from Prime and iOS from Power, on yearly plans only" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan", them: "Unlimited live sessions" },
      { label: "Payments", us: "Your own Razorpay, Paytm, Stripe or DOKU account on every plan", them: "Private payment gateway listed from Power" },
      { label: "Video protection", us: "DRM, watermarks and screen-recording block on every plan", them: "Piracy control listed" },
      { label: "Free trial", us: "15 days", them: "7 days" },
      { label: "Billing", us: "Monthly or yearly", them: "Monthly or yearly (20% off yearly)" },
    ],
    chooseThem: [
      "You want your own domain on the entry plan.",
      "You need a desktop app for secured live sessions, which Edmingle lists on Maxx.",
      "Your team already runs on Edmingle and is happy with it.",
    ],
    competitorPublicInfo: {
      statement: "Edmingle figures are from its public pricing page.",
      sourceUrl: "https://www.edmingle.com/in/pricing/",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "Do I need a yearly plan for a branded app?",
        answer: "No. On Pro, monthly or yearly, we publish your own Android and iOS app. Edmingle's pricing page lists its branded apps on yearly plans only.",
      },
      {
        question: "Can I collect payments in my own gateway account?",
        answer: "Yes, on every plan. Connect Razorpay, Paytm, Stripe or DOKU and payments go straight to you, with 0% commission.",
      },
      {
        question: "How long is the free trial?",
        answer: "15 days on every plan.",
      },
    ],
  },

  "graphy-alternative": {
    slug: "graphy-alternative",
    competitorName: "Graphy",
    glance: [
      { label: "Fee on each sale", us: "0% on every plan", them: "10%, 7.5% or 5% per sale by plan (at least ₹10)" },
      { label: "Billing", us: "Monthly or yearly", them: "Yearly plans, from ₹24,999 a year" },
      { label: "Your own domain", us: "Growth and up (free subdomain on Starter)", them: "Every paid plan" },
      { label: "Mobile app", us: "LMS Domain app on every plan; your own Android and iOS app on Pro", them: "Android on every plan; iOS on Rise or as a paid add-on" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan", them: "Included; how many run at once depends on the plan" },
      { label: "Video protection", us: "DRM, watermarks and screen-recording block on every plan", them: "DRM protection listed from Launch" },
      { label: "Payments", us: "Your own Razorpay, Paytm, Stripe or DOKU account", them: "Stripe, Razorpay or another gateway" },
    ],
    chooseThem: [
      "You already run a large creator business on Graphy and moving would cost more than the per-sale fee.",
      "You only need an Android app in your own name, which Graphy includes on every plan.",
      "You prefer paying for a full year up front.",
    ],
    competitorPublicInfo: {
      statement: "Graphy figures are from its public pricing page.",
      sourceUrl: "https://graphy.com/pricing",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "Does LMS Domain charge a fee on each sale like Graphy?",
        answer: "No. LMS Domain charges 0% on your sales on every plan. Graphy's pricing page lists a fee of 5% to 10% per sale, depending on the plan. Your payment gateway's own processing fee applies with either.",
      },
      {
        question: "Can my learners use an app?",
        answer: "Yes. Every plan includes the LMS Domain app for Android and iOS. On Pro, we publish your own branded app, in your Apple and Google accounts or in ours.",
      },
      {
        question: "Can I move my courses from Graphy?",
        answer: "Yes. Enterprise includes free migration by our team. On other plans, talk to us about moving your courses and learners.",
      },
    ],
  },

  "learnyst-alternative": {
    slug: "learnyst-alternative",
    competitorName: "Learnyst",
    glance: [
      { label: "Fee on each sale", us: "0% on every plan", them: "Not stated; the page notes additional charges apply" },
      { label: "Mobile app", us: "LMS Domain app on every plan; your own Android and iOS app on Pro", them: "Branded Android and iOS apps, with additional charges and a yearly plan" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan", them: "Live classes with Zoom support" },
      { label: "Tests", us: "Question banks and timed tests on every plan", them: "Mock tests and test series, limited by plan" },
      { label: "Video protection", us: "DRM, watermarks and screen-recording block on every plan", them: "DRM content protection listed" },
      { label: "Billing", us: "Monthly or yearly", them: "Monthly or yearly (10% off yearly)" },
    ],
    chooseThem: [
      "Your institute already runs on Learnyst's apps and learners are used to them.",
      "You mainly sell test series and mock tests as their own products.",
    ],
    competitorPublicInfo: {
      statement: "Learnyst figures are from its public pricing page.",
      sourceUrl: "https://www.learnyst.com/pricing",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "Does LMS Domain charge extra for the app?",
        answer: "Every plan includes the LMS Domain app for Android and iOS. Your own branded app comes with Pro. If we publish it in your Apple and Google accounts, you pay their developer fees.",
      },
      {
        question: "Can I block screen recording?",
        answer: "Yes. Every plan includes DRM video, watermarks with the learner's details and a screen-recording block in the apps.",
      },
      {
        question: "Can I teach live on Google Meet or Teams instead of Zoom?",
        answer: "Yes. Live classes work with Zoom, Google Meet and Microsoft Teams on every plan.",
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
    glance: [
      { label: "Fee on each sale", us: "0% on every plan", them: "7.5% on Starter; 0% from Builder" },
      { label: "Starting price", us: "See our pricing page", them: "$29 a month billed yearly, or $39 monthly" },
      { label: "Payments", us: "Your own Razorpay, Paytm, Stripe or DOKU account, paid straight to you", them: "Teachable Payments or PayPal (2.9% + 30¢ on US cards)" },
      { label: "Mobile app", us: "LMS Domain app on every plan; your own Android and iOS app on Pro", them: "Teachable's student app for iOS and Android" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan, with attendance", them: "Not listed on the pricing page" },
      { label: "Batches and timetables", us: "Included on every plan", them: "Not listed on the pricing page" },
      { label: "Video protection", us: "DRM, watermarks and screen-recording block on every plan", them: "Not listed on the pricing page" },
    ],
    chooseThem: [
      "You sell recorded courses mainly to US learners and want Teachable to handle payments and payouts for you.",
      "You don't teach live batches and don't need tests with timetables.",
      "You want a well-known US platform with a large creator community.",
    ],
    competitorPublicInfo: {
      statement: "Teachable figures are from its public pricing page.",
      sourceUrl: "https://teachable.com/pricing",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "How is LMS Domain different from Teachable?",
        answer: "Teachable is built mainly for recorded courses. LMS Domain also runs live batches on Zoom, Google Meet or Teams with automatic attendance, timed tests from question banks, and payments paid straight into your own gateway account.",
      },
      {
        question: "Do my learners get an app?",
        answer: "Yes. Every plan includes the LMS Domain app for Android and iOS, and Pro adds your own branded app.",
      },
      {
        question: "Can I sell in INR and USD?",
        answer: "Yes. Connect Razorpay, Paytm, Stripe or DOKU and sell in the currencies they support, with GST invoices for academies in India.",
      },
    ],
  },

  "kajabi-alternative": {
    slug: "kajabi-alternative",
    competitorName: "Kajabi",
    glance: [
      { label: "Starting price", us: "See our pricing page", them: "$143 a month billed yearly, or $179 monthly" },
      { label: "Fees on sales", us: "0% commission; only your gateway's fee", them: "No revenue share; 2.7% to 2.9% + 30¢ card fee, plus 0.5% to 2% with an outside processor" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan", them: "Live cohort courses from Growth" },
      { label: "Branded app", us: "Your own Android and iOS app on Pro", them: "Your own app on Pro, from $399 a month billed yearly" },
      { label: "Products and contacts", us: "Set by plan", them: "5 products and 2,500 contacts on Basic" },
      { label: "Payments", us: "Your own Razorpay, Paytm, Stripe or DOKU account on every plan", them: "Kajabi Payments, or another processor for an extra fee" },
    ],
    chooseThem: [
      "You sell coaching and memberships alongside courses, mainly in USD.",
      "You want several websites and communities on one account (Kajabi Pro includes three).",
    ],
    competitorPublicInfo: {
      statement: "Kajabi figures are from its public pricing page.",
      sourceUrl: "https://kajabi.com/pricing",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "Does LMS Domain charge a fee on top of my payment gateway?",
        answer: "No. You pay your plan price and your gateway's normal fee, nothing else. Kajabi's pricing page lists an extra 0.5% to 2% when you use an outside processor.",
      },
      {
        question: "Can I run live batches on the entry plan?",
        answer: "Yes. Live classes on Zoom, Google Meet or Teams are on every plan, with attendance logged automatically.",
      },
      {
        question: "Can I sell in INR?",
        answer: "Yes. Connect Razorpay or Paytm for INR, and Stripe or DOKU for other currencies, with GST invoices for academies in India.",
      },
    ],
  },

  "moodle-alternative": {
    slug: "moodle-alternative",
    competitorName: "Moodle",
    glance: [
      { label: "Software", us: "Fully managed: hosting, updates and security included", them: "Free, open-source software; you host it yourself or pay for hosting" },
      { label: "Hosted price", us: "See our pricing page", them: "MoodleCloud: $160 a year for 50 users and 1 GB, up to $1,990 a year for 750 users and 50 GB" },
      { label: "Selling courses", us: "Your own Razorpay, Paytm, Stripe or DOKU account on every plan, with 0% commission", them: "Stripe from MoodleCloud Small ($470 a year), and PayPal" },
      { label: "Your own domain", us: "Growth and up (free subdomain on Starter)", them: "Add-on on MoodleCloud Medium; included on Standard" },
      { label: "Mobile app", us: "LMS Domain app on every plan; your own Android and iOS app on Pro", them: "The Moodle app on every MoodleCloud plan" },
      { label: "Live classes", us: "Zoom, Google Meet and Teams on every plan", them: "Not listed on the MoodleCloud pricing page" },
    ],
    chooseThem: [
      "You have an IT team and want full control of open-source code and plugins.",
      "Your school, university or funder requires Moodle.",
    ],
    competitorPublicInfo: {
      statement: "Moodle figures are from its public pricing page.",
      sourceUrl: "https://www.moodlecloud.com/pricing/",
      checkedOn: "22 November 2026",
    },
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
      {
        question: "Is Moodle free?",
        answer: "The Moodle software is free and open source, but you pay for hosting, updates and someone to look after it. MoodleCloud's hosted plans start at $160 a year for 50 users.",
      },
      {
        question: "Do I need a developer to run LMS Domain?",
        answer: "No. We host, update and secure your academy. You add courses and learners from your admin panel.",
      },
      {
        question: "Can I sell courses?",
        answer: "Yes, on every plan. Connect Razorpay, Paytm, Stripe or DOKU, and keep 100% of your sales.",
      },
    ],
  },
};
