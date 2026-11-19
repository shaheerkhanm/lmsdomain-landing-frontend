/**
 * Homepage "Sell and grow" section. Plans confirmed 2026-11-18:
 * course store and coupons on every plan; subscriptions/bundles, affiliates, cart recovery and upsells on Growth and up.
 * Payment gateways and currencies are covered by the Features grid, so they are not repeated here.
 * The section shows one sample order (made-up academy and learners) with a note for each tool.
 */
export const HOME_SELL_GROW = {
  eyebrow: "Sell and grow",
  title: "Every sale can bring the next one",
  subtitle: "Coupons, upsells, cart reminders, affiliates and memberships are built in. Here is one order and the tools behind it.",
  /** Six notes, by position: 1 store, 2 coupons, 3 upsells, 4 cart reminders, 5 affiliates, 6 subscriptions. */
  notes: [
    { title: "Your course store", text: "Learners add courses to a cart on your own site.", plan: "Every plan" },
    { title: "Coupons and offers", text: "Percentage or flat codes with expiry dates and usage limits.", plan: "Every plan" },
    { title: "Upsells", text: "A related course offered right after payment.", plan: "Growth and up" },
    { title: "Cart reminders", text: "An email to learners who left checkout.", plan: "Growth and up" },
    { title: "Affiliates", text: "Partners share their link and earn on each sale.", plan: "Growth and up" },
    { title: "Subscriptions and bundles", text: "Monthly or yearly memberships, and course bundles.", plan: "Growth and up" },
  ],
  footnote: "Paid to your own gateway account. 0% commission from LMS Domain.",
  invoiceLine: "Invoice emailed to Mia",
  alsoTitle: "Also included",
  also: [
    { title: "Offline payments", text: "Learners upload a bank transfer receipt. You approve the enrolment in one click." },
    { title: "Sales reports and payouts", text: "Revenue over time, instructor revenue splits and exports." },
    { title: "GST invoices", text: "Sent automatically for academies in India." },
    { title: "Your own gateway", text: "Stripe, Razorpay, Paytm or DOKU, paid straight to your account." },
  ],
  linkText: "See all selling tools",
  linkHref: "/platform/sell",
};

export type HomeSellGrowContent = typeof HOME_SELL_GROW;
