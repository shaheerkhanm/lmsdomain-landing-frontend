/**
 * Homepage "Mobile apps" section. Plans confirmed 2026-11-18:
 * the LMS Domain app (Android + iOS) on every plan, the academy's own branded app on Pro and Enterprise.
 */
export const HOME_MOBILE_APP = {
  eyebrow: "Mobile apps",
  title: "Your academy in every learner's pocket",
  subtitle:
    "Every plan includes the LMS Domain app for Android and iOS. On Pro, learners download your own branded app instead.",
  steps: [
    {
      key: "learn",
      title: "Lessons that stay yours",
      text: "Learners watch video and PDF lessons in the app. DRM, a moving watermark and blocked screen recording protect your content.",
      plan: "Every plan",
    },
    {
      key: "live",
      title: "Live classes, one tap away",
      text: "Classes on Zoom, Google Meet or Teams open from the app, and a WhatsApp reminder arrives 10 minutes before.",
      plan: "Every plan",
    },
    {
      key: "test",
      title: "Mock tests on the go",
      text: "Timed tests with instant results and a rank, so learners can practise anywhere.",
      plan: "Every plan",
    },
    {
      key: "brand",
      title: "Your own app in the stores",
      text: "On Pro, the app carries your academy's name, logo and colours in Google Play and the App Store.",
      plan: "Pro and up",
    },
  ],
  plans: [
    { title: "LMS Domain app", plan: "Every plan" },
    { title: "Your own branded app", plan: "Pro and up" },
  ],
  linkText: "See the mobile apps",
  linkHref: "/platform/mobile-app",
};

export type HomeMobileAppContent = typeof HOME_MOBILE_APP;
