/**
 * Mobile app band on each Solutions page. Claims match the features confirmed 2026-11-18/19:
 * LMS Domain app on every plan, branded app on Pro and up, DRM and screen-recording block, live classes on
 * Zoom/Meet/Teams, WhatsApp and push reminders, offline downloads, in-app purchase, certificates, any language.
 */
export type AppBandKey = "coaching-institutes" | "language-test-prep-academies" | "solo-educators" | "training-companies";

export interface AppBandContent {
  title: string;
  text: string;
  points: string[];
  alert: { title: string; body: string };
}

export const APP_BANDS: Record<AppBandKey, AppBandContent> = {
  "coaching-institutes": {
    title: "Mock tests and live batches on every student's phone",
    text: "Students take timed tests, join classes and check their rank from the app, wherever they study.",
    points: [
      "Timed mock tests with an instant score and rank",
      "Live batches on Zoom, Google Meet or Teams in one tap",
      "WhatsApp reminders before every class and test",
    ],
    alert: { title: "Full test 5 starts at 6:00 PM", body: "JEE Main · Batch A · Tap to open" },
  },
  "language-test-prep-academies": {
    title: "Practise between classes, in their own language",
    text: "Learners join speaking classes, rewatch recordings and practise from their phone.",
    points: [
      "Speaking classes on Google Meet, Zoom or Teams",
      "Class recordings saved to the course to rewatch",
      "The app in the language each learner chooses",
    ],
    alert: { title: "Speaking class starts in 10 minutes", body: "Business English · Batch B · Tap to join" },
  },
  "solo-educators": {
    title: "Your courses in your learners' pockets",
    text: "Learners buy, watch and finish your courses on their phone. On Pro, the app carries your own name.",
    points: [
      "Protected videos with DRM and screen recording blocked",
      "Learners buy courses inside the app",
      "Your own branded app in the stores on Pro",
    ],
    alert: { title: "New lesson is live", body: "Guitar basics · Strumming patterns" },
  },
  "training-companies": {
    title: "Training your teams can take anywhere",
    text: "Participants follow cohort sessions, learn offline on the move and download their certificates from the app.",
    points: [
      "Cohort schedules, live sessions and reminders",
      "Offline downloads for learners on the move",
      "Certificates to download and share from the app",
    ],
    alert: { title: "Your certificate is ready", body: "Business English · Level 2 · Tap to download" },
  },
};
