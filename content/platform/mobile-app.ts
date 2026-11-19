import { PlatformPageData } from "./types";

/**
 * /platform/mobile-app. Plans confirmed 2026-11-18:
 * LMS Domain app (Android + iOS) on every plan; the academy's own branded app on Pro and Enterprise;
 * DRM, watermark and screen-recording block in the apps on every plan; WhatsApp notifications on every plan;
 * community on Growth and up; device limits on Pro; any language.
 */
/** Extra sections of the mobile apps page (editable with the page in Admin > Website > Platform). */
export const MOBILE_APP_EXTRAS = {
  alsoTitle: "Also in the app",
  also: [
    { title: "Push notifications", text: "Class, test and announcement alerts on the learner's phone." },
    { title: "Offline downloads", text: "Learners download lessons and watch them without internet." },
    { title: "Buy courses in the app", text: "Learners browse your catalogue and buy courses inside the app." },
    { title: "Teacher and admin login", text: "Teachers and admins sign in with their own separate login." },
  ],
  stepsEyebrow: "Your own app",
  stepsTitle: "How you get your branded app",
  stepsSubtitle: "Included on Pro and Enterprise. We do the building and help with the store listing.",
  /** Three steps, by position (each keeps its own picture) */
  steps: [
    { title: "Share your brand", text: "Send us your app name, logo and colours." },
    { title: "We build your app", text: "Your Android and iOS app, built with your academy's name and look." },
    { title: "Publish it your way", text: "In your own store accounts with our help, or in ours." },
  ],
};

export const mobileAppPlatformData: PlatformPageData = {
  slug: "mobile-app",
  eyebrow: "Mobile apps",
  heroAccent: "every learner's pocket",
  title: "Your academy in every learner's pocket",
  subtitle:
    "Every plan includes the LMS Domain app for Android and iOS. On Pro, learners download your own branded app, with your name, logo and colours in Google Play and the App Store.",
  metaTitle: "Mobile Apps for Your Academy: Android and iOS | LMS Domain",
  metaDescription:
    "Learners watch protected lessons, join live classes and take tests in the Android and iOS app. Every plan includes the LMS Domain app; Pro adds your own branded app.",
  sectionHeading: "Everything learners do in the app",
  frameTitle: "Android and iOS apps",
  frameAlt: "Your academy's lessons, live classes and tests in a mobile app",
  features: [
    { title: "The LMS Domain app", description: "Learners download the LMS Domain app for Android or iOS and open your academy inside it.", icon: "Smartphone" },
    { title: "Your own branded app", description: "Your academy's name, logo and colours in Google Play and the App Store.", icon: "BadgeCheck", plan: "Pro" },
    { title: "Protected video", description: "DRM video, a learner watermark and blocked screen recording in the apps.", icon: "ShieldCheck" },
    { title: "Live classes in the app", description: "Classes on Zoom, Google Meet or Teams open from the app in one tap.", icon: "Video" },
    { title: "Tests on the go", description: "Timed mock tests with instant scores and a rank in the batch.", icon: "ClipboardCheck" },
    { title: "WhatsApp reminders", description: "Class, test and homework reminders on WhatsApp.", icon: "MessageCircle" },
    { title: "Community", description: "Posts and replies with the batch inside the app.", icon: "Users", plan: "Growth" },
    { title: "Any language", description: "Learners use the app in the language they choose.", icon: "Languages" },
    { title: "Push notifications", description: "Class, test and announcement alerts on the learner's phone.", icon: "Bell" },
    { title: "Offline downloads", description: "Learners download lessons and watch them without internet.", icon: "Download" },
    { title: "Buy courses in the app", description: "Learners browse your catalogue and buy courses inside the app.", icon: "ShoppingCart" },
    { title: "Teacher and admin login", description: "Teachers and admins sign in with their own separate login.", icon: "UserCog" },
  ],
  usedFor: [
    {
      title: "Coaching institutes",
      href: "/solutions/coaching-institutes",
      description: "Students join live batches and take timed mock tests from their phone, with a rank after every test.",
    },
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description: "Learners practise between classes and study in the language they are most comfortable with.",
    },
    {
      title: "Solo educators & creators",
      href: "/solutions/solo-educators",
      description: "Your courses on learners' phones from day one, then your own branded app when you move to Pro.",
    },
  ],
  faqs: [
    {
      question: "Is there a mobile app on every plan?",
      answer:
        "Yes. Every plan includes the LMS Domain app for Android and iOS, where learners open your academy. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
    },
    {
      question: "What is the difference between the LMS Domain app and a branded app?",
      answer:
        "In the LMS Domain app, learners find your academy inside our app. A branded app is your own listing in Google Play and the App Store, with your academy's name, logo and colours. Branded apps are on Pro and Enterprise.",
    },
    {
      question: "Who publishes the branded app?",
      answer:
        "We help you publish it in your own Google Play and Apple developer accounts; the store account fees are paid by you. If you prefer, we publish it in our accounts instead. Branded apps are on Pro and Enterprise.",
    },
    {
      question: "Can learners watch lessons offline?",
      answer: "Yes. Learners can download lessons in the app and watch them later without internet.",
    },
    {
      question: "Are videos protected in the app?",
      answer:
        "Yes, on every plan. Videos use DRM, carry a watermark with the learner's details, and screen recording is blocked in the apps. Device limits are available on Pro.",
    },
    {
      question: "Can learners join live classes from the app?",
      answer: "Yes. Live classes, Google Meet or Microsoft Teams open from the app, and learners can get a WhatsApp reminder before each class.",
    },
    {
      question: "Does the app work in other languages?",
      answer: "Yes. Learners can use the app in the language they choose.",
    },
  ],
};
