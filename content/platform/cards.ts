// Feature cards on the Platform pages (built-in text, six per page, in layout
// order). The pictures stay in each page's Bento component; the text can be
// changed in Admin > Website > Platform.

export interface PlatformCard {
  title: string;
  text: string;
}

export const PLATFORM_CARDS: Record<"teach" | "assess" | "manage" | "sell" | "brand" | "ai" | "security" | "mobile-app", PlatformCard[]> = {
  "teach": [
    {
      "title": "Courses with video, PDF and text",
      "text": "Build modules from video lessons, PDF guides and text pages, then publish when you are ready."
    },
    {
      "title": "Drip release on a schedule",
      "text": "Unlock lessons by date or by enrolment day, so a whole batch moves forward together."
    },
    {
      "title": "Live classes on Zoom, Meet or Teams",
      "text": "Schedule classes for each batch. Learners get reminders and join from your academy."
    },
    {
      "title": "Recordings saved to the course",
      "text": "Every live class recording lands in the right module, ready for learners who missed it."
    },
    {
      "title": "Cohort bootcamps",
      "text": "Run fixed-date cohorts with project milestones and review stages for every learner."
    },
    {
      "title": "1:1 tutor booking",
      "text": "Learners pick a tutor, day and time, and pay for private sessions on your site."
    }
  ],
  "assess": [
    {
      "title": "Question banks",
      "text": "Build banks by topic and level, then pull questions into any test in a random order."
    },
    {
      "title": "Timed tests with your rules",
      "text": "Set a time limit, pass mark and number of attempts for every quiz or mock exam."
    },
    {
      "title": "Instant scores and rank",
      "text": "Multiple-choice tests are marked automatically, so learners see their score and rank right away."
    },
    {
      "title": "Assignments with private review",
      "text": "Learners upload their work. Teachers give private feedback and a score, or ask for a revision."
    },
    {
      "title": "Quiz checkpoints inside videos",
      "text": "Add a question at any point in a recorded lesson. The video waits until the learner answers."
    },
    {
      "title": "Branded certificates",
      "text": "When a learner finishes, they get a PDF certificate with your logo, their name and the course."
    }
  ],
  "manage": [
    {
      "title": "Batches with their own schedule",
      "text": "Run the same course in several batches, each with its own timings, roster, instructor and drip dates."
    },
    {
      "title": "Every learner in one profile",
      "text": "See each learner's courses, progress, test scores and attendance in one place."
    },
    {
      "title": "Attendance, logged for you",
      "text": "When learners join a live class through your academy, attendance is recorded automatically."
    },
    {
      "title": "Roles and permissions",
      "text": "Admins see everything. Instructors only see their own courses, batches and reviews."
    },
    {
      "title": "Email and SMS notices",
      "text": "Send class reminders and batch updates by email automatically. SMS is available on Growth and up."
    },
    {
      "title": "Export anything to CSV",
      "text": "Download rosters, progress, test scores and payment reports as spreadsheets at any time."
    }
  ],
  "sell": [
    {
      "title": "Your own course store",
      "text": "A catalogue and cart on your website, so learners can browse, add courses and check out in one go."
    },
    {
      "title": "Coupons and offers",
      "text": "Create percentage or flat discount codes with expiry dates, minimum orders and usage limits."
    },
    {
      "title": "Stripe, Razorpay, Paytm and DOKU",
      "text": "Connect your own gateway account. Payments go straight to you, with 0% commission from us."
    },
    {
      "title": "Sell in many currencies",
      "text": "Charge in USD, EUR, GBP, INR and more. Indian academies also get GST invoices automatically."
    },
    {
      "title": "Offline payments with approval",
      "text": "Learners can upload a bank transfer receipt. You check it and approve the enrolment in one click."
    },
    {
      "title": "Sales reports and payouts",
      "text": "Track sales over time, work out instructor revenue splits and export financial reports."
    },
    {
      "title": "Subscriptions and bundles",
      "text": "Sell monthly or yearly memberships, and bundle courses together at a better price."
    },
    {
      "title": "Affiliates",
      "text": "Partners and past learners share their own link and earn a commission on every sale it brings."
    },
    {
      "title": "Abandoned carts and upsells",
      "text": "Remind learners who left checkout, and offer a related course right after they buy."
    }
  ],
  "brand": [
    {
      "title": "Your own domain, with free SSL",
      "text": "Connect your domain on any plan. SSL certificates are issued and renewed for you automatically."
    },
    {
      "title": "Homepage builder",
      "text": "Arrange featured courses, faculty and announcements on your homepage without code."
    },
    {
      "title": "Logo, colours and fonts",
      "text": "Upload light and dark logos and a favicon, and set your colours. Custom fonts on Growth and up."
    },
    {
      "title": "Your brand everywhere",
      "text": "Your branding shows on the website, learner portal, emails and certificates. Remove “Powered by LMS Domain” on Pro."
    },
    {
      "title": "SEO settings for every page",
      "text": "Set meta titles, descriptions and share images for your homepage, courses and catalogue."
    },
    {
      "title": "Blog and help articles",
      "text": "Publish blog posts, announcements and help articles to reach new learners and support current ones."
    }
  ],
  "ai": [
    {
      "title": "Course drafts in seconds",
      "text": "Domie drafts course titles, descriptions and learning outcomes. Your team edits and approves them."
    },
    {
      "title": "Learners who need attention",
      "text": "See whose progress or attendance has dropped, so teachers can step in before they fall behind."
    },
    {
      "title": "A morning summary",
      "text": "Ask Domie gives admins a daily summary of enrolments, batches and upcoming classes."
    },
    {
      "title": "Find anything fast",
      "text": "Jump to any course, batch or setting from one search bar with a keyboard shortcut."
    },
    {
      "title": "Your content stays yours",
      "text": "Domie works inside your academy. Your course content is never used to train outside AI models."
    },
    {
      "title": "Teachers stay in charge",
      "text": "Domie helps with questions and drafts. It doesn't write full lessons, create quizzes or grade work."
    }
  ],
  "security": [
    {
      "title": "DRM video with a watermark",
      "text": "Videos are DRM-encrypted and carry each learner's email and ID, so any recording shows who shared it. The apps block screen recording."
    },
    {
      "title": "Device limits per learner",
      "text": "Set how many devices each learner can use. Older sessions sign out or new sign-ins are blocked."
    },
    {
      "title": "The right access for each role",
      "text": "Instructors see their own batches, materials and grading, but not revenue or payment reports."
    },
    {
      "title": "Time-limited video links",
      "text": "Videos stream through links that expire, so a copied link can't be passed around for long."
    },
    {
      "title": "Managed, encrypted hosting",
      "text": "We run the hosting for you with a certified cloud provider, with HTTPS on your domain and TLS encryption for your data."
    },
    {
      "title": "Your data stays yours",
      "text": "You own 100% of your courses and learner records, and can export them any time. DPDP and GDPR ready."
    }
  ],
  "mobile-app": [
    {
      "title": "The LMS Domain app",
      "text": "Learners download the LMS Domain app for Android or iOS and open your academy inside it."
    },
    {
      "title": "Your own branded app",
      "text": "Your academy's name, logo and colours in Google Play and the App Store."
    },
    {
      "title": "Protected video",
      "text": "DRM video, a watermark with the learner's details, and screen recording blocked in the apps."
    },
    {
      "title": "Live classes in one tap",
      "text": "Classes on Zoom, Google Meet or Teams open from the app, with a reminder before each one."
    },
    {
      "title": "Tests on the go",
      "text": "Timed mock tests with instant scores and a rank in the batch."
    },
    {
      "title": "WhatsApp reminders",
      "text": "Class, test and homework reminders arrive on WhatsApp."
    },
    {
      "title": "Community",
      "text": "Posts and replies with the batch, inside the app."
    },
    {
      "title": "Any language",
      "text": "Learners use the app in the language they choose."
    }
  ]
};
