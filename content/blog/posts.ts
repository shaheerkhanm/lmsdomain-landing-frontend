export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  readingTime: string;
  author: string;
  toc: { id: string; title: string }[];
  content: string; // HTML format for rich formatting
  faqs: { question: string; answer: string }[];
  /** Label on the cover and blog list (Admin > Blog). Built-in posts: see BLOG_META. */
  category?: string;
  /** Cover design: "start" (steps), "lms" (course screen) or "sell" (checkout). */
  cover?: BlogCoverStyle;
  /** Cover photo uploaded in Admin > Blog (/uploads/... or https). Replaces the drawn cover. */
  coverImage?: string;
}

export type BlogCoverStyle = "start" | "lms" | "sell";

/** Cover and label of the built-in posts (posts from the admin carry their own). */
export const BLOG_META: Record<string, { category: string; tone: string; ink: string; art: BlogCoverStyle }> = {
  "how-to-start-an-online-academy-in-india": { category: "Getting started", tone: "#F1EDFF", ink: "#6C4BFF", art: "start" },
  "what-is-an-lms-guide-for-coaching-institutes": { category: "LMS basics", tone: "#E6F4F1", ink: "#0D9488", art: "lms" },
  "best-lms-for-coaching-institutes-in-india": { category: "Choosing an LMS", tone: "#E6F4F1", ink: "#0D9488", art: "lms" },
  "how-to-sell-courses-online-in-india-with-gst-invoices": { category: "Selling courses", tone: "#FFF1E8", ink: "#EA580C", art: "sell" },
};
export const BLOG_COVER_STYLES: BlogCoverStyle[] = ["start", "lms", "sell"];

const decode = (s: string) =>
  s.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

/** Contents list from the article's section headings (<h2 id="...">), plus the FAQ when there is one. */
export function tocFromHtml(html: string, hasFaqs: boolean): { id: string; title: string }[] {
  const toc = Array.from(String(html || "").matchAll(/<h2[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)).map((m) => ({ id: m[1], title: decode(m[2]) }));
  return hasFaqs ? [...toc, { id: "faqs", title: "Frequently asked questions" }] : toc;
}

/** "6 min read" from the article length (about 220 words a minute). */
export function readingTimeFor(html: string): string {
  const words = decode(String(html || "")).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  "how-to-start-an-online-academy-in-india": {
    slug: "how-to-start-an-online-academy-in-india",
    title: "How to start an online academy in India: a step-by-step guide",
    subtitle:
      "A practical, operational guide to launching your own branded online teaching academy in India, from curriculum structuring to GST compliance and live classes.",
    metaTitle: "How to Start an Online Academy in India | LMS Domain",
    metaDescription:
      "A practical, step-by-step guide to starting an online academy in India. Learn about curriculum structuring, live classes, GST compliance, and platform setup.",
    date: "2026-11-07",
    readingTime: "9 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "defining-your-niche", title: "1. Define your subject and delivery format" },
      { id: "structuring-curriculum", title: "2. Structure your curriculum and batch schedule" },
      { id: "setting-up-technology", title: "3. Choose your learning technology and domain" },
      { id: "payments-and-gst", title: "4. Set up payments, fee collection, and GST invoices" },
      { id: "running-live-classes", title: "5. Deliver live classes and assessments" },
      { id: "onboarding-students", title: "6. Onboard learners and scale operations" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>Starting an online academy in India has shifted from stitching together disconnected messaging groups and unlisted video links into running a professional, branded learning business. Whether you are an established coaching institute moving online, a language tutor preparing students for exams like IELTS or PTE, or a domain expert launching professional skill bootcamps, the core operational requirements remain consistent: structured curriculum delivery, scheduled live teaching, reliable fee collection, and institutional credibility.</p>

<p>This guide breaks down the essential steps required to build, launch, and operate a sustainable online teaching academy in India.</p>

<h2 id="defining-your-niche">1. Define your subject and delivery format</h2>
<p>The first step is determining your pedagogical format. Online teaching in India generally falls into three operational models:</p>
<ul>
  <li><strong>Scheduled Cohort Batches:</strong> Ideal for test-prep institutes, language schools, and academic coaching where learners progress through a shared calendar timetable. Students benefit from group accountability, scheduled morning or evening classes, and structured milestones.</li>
  <li><strong>Intensive Bootcamps:</strong> Popular for technical and vocational skills like digital marketing, data analysis, or full-stack engineering. These combine live interactive lectures with hands-on project submissions and faculty feedback.</li>
  <li><strong>Hybrid Self-Paced Courses with 1:1 Booking:</strong> Pre-recorded video modules unlocked via drip release, supplemented by paid 1:1 tutor consultation sessions for personalized doubt resolution.</li>
</ul>

<h2 id="structuring-curriculum">2. Structure your curriculum and batch schedule</h2>
<p>A successful online academy requires more than a folder of video recordings. Learners expect a clear syllabus progression. When organizing your curriculum:</p>
<ul>
  <li><strong>Modular Chapter Structure:</strong> Break long topics into digestible 10–20 minute video lessons, accompanied by summary PDF notes and actionable reading assignments.</li>
  <li><strong>Drip Release Pacing:</strong> Prevent student overwhelm and content ripping by releasing lessons according to enrollment pacing or fixed batch calendar dates.</li>
  <li><strong>Morning and Evening Batch Options:</strong> Working professionals and school students require flexible timing. Structuring separate morning and evening shifts for the same curriculum maximizes enrollment capacity.</li>
</ul>

<h2 id="setting-up-technology">3. Choose your learning technology and domain</h2>
<p>Teaching under third-party marketplace platforms often means competing with thousands of other tutors while losing control over your learner relationships. Running your academy on your own custom web domain (e.g., <code>learn.youracademy.in</code>) reinforces authority and institutional trust.</p>
<p>When selecting a learning management platform like <a href="/platform">LMS Domain</a>, ensure it provides built-in white-label capabilities: automated SSL security certificates, customizable brand themes and logos, student portal directories, and role-based access for instructors and administrators.</p>

<h2 id="payments-and-gst">4. Set up payments, fee collection, and GST invoices</h2>
<p>In India, fee collection must accommodate domestic payment preferences while fulfilling statutory tax compliance:</p>
<ul>
  <li><strong>Domestic Payment Gateways:</strong> Integrating gateways like Razorpay or Paytm allows students to pay via UPI (Google Pay, PhonePe, Paytm), RuPay debit cards, credit cards, and net banking. For international students, connecting Stripe or DOKU enables payments in USD, EUR, GBP, and regional currencies.</li>
  <li><strong>Automated GST Invoices:</strong> Educational businesses registered under GST must issue compliant tax invoices detailing their GSTIN, student state of supply, and applicable tax rates. Using a platform that generates automated GST invoices on checkout eliminates hours of manual bookkeeping.</li>
  <li><strong>Offline Payment Verification:</strong> Many students still prefer direct bank transfers (NEFT/IMPS) or cash deposits. Having a streamlined workflow to verify payment screenshots and approve enrollments with one click keeps enrollment friction low.</li>
</ul>

<h2 id="running-live-classes">5. Deliver live classes and assessments</h2>
<p>Live instruction remains the heart of student retention and active participation. Connecting your platform with Zoom, Google Meet or Teams enables automated class meeting links, calendar notifications, and automatic lecture recording archives stored directly in the lesson timeline.</p>
<p>Complement live sessions with regular evaluations:</p>
<ul>
  <li><strong>Timed Mock Tests:</strong> Build chapter question banks and administer timed practice tests with automated scoring and passing requirements.</li>
  <li><strong>Written Project Reviews:</strong> Let learners upload file submissions for instructor evaluation and qualitative feedback.</li>
  <li><strong>Branded Completion Certificates:</strong> Automatically issue PDF completion certificates under your academy name when students fulfill graduation criteria.</li>
</ul>

<h2 id="onboarding-students">6. Onboard learners and scale operations</h2>
<p>Once your platform and curriculum are in place, focus on delivering a smooth onboarding experience. Send automated transactional emails with student login credentials, provide an intuitive course orientation, and maintain prompt support. As your student body expands, tools like <a href="/platform/ai">Domie AI</a> can assist by answering routine syllabus questions around the clock without burdening your teaching staff.</p>
`,
    faqs: [
      {
        question: "Do I need a registered company to start an online academy in India?",
        answer:
          "You can begin as a sole proprietorship, partnership, or private limited company depending on your scale. You will need a current business bank account and payment gateway account (such as Razorpay or Paytm) to accept online course fees.",
      },
      {
        question: "Can I use my own domain for my academy website?",
        answer:
          "Yes, on Growth and up you can connect your custom domain (e.g., learn.yourbrand.com) with automated SSL certificates included. On Starter, your academy runs on a free LMS Domain subdomain.",
      },
      {
        question: "How do live classes integrate with the student portal?",
        answer:
          "LMS Domain connects with Zoom, Google Meet and Teams so students join scheduled batch classes with a single click. Class recordings are archived directly into the course timeline for replay.",
      },
    ],
  },

  "what-is-an-lms-guide-for-coaching-institutes": {
    slug: "what-is-an-lms-guide-for-coaching-institutes",
    title: "What is an LMS? A plain guide for coaching institutes",
    subtitle:
      "A straightforward breakdown of learning management systems, explaining how coaching institutes and tuition centers use them to manage batches, live classes, and assessments.",
    metaTitle: "What is an LMS? Guide for Coaching Institutes | LMS Domain",
    metaDescription:
      "A plain-language guide explaining what a learning management system (LMS) is, how it works, and why Indian coaching institutes use it to manage batches and live classes.",
    date: "2026-11-07",
    readingTime: "8 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "what-is-an-lms", title: "1. What is a Learning Management System (LMS)?" },
      { id: "why-generic-tools-fail", title: "2. Why generic messaging and video tools fall short" },
      { id: "core-capabilities", title: "3. Core capabilities coaching institutes need" },
      { id: "protecting-content", title: "4. Protecting your lectures and test materials" },
      { id: "evaluating-options", title: "5. How to choose the right LMS for your institute" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>For coaching institutes, tuition centers, and competitive exam academies in India, managing daily operations across multiple student batches has traditionally involved juggling separate tools: chat groups for announcements, cloud storage folders for notes, meeting apps for classes, and spreadsheets for fees.</p>

<p>A Learning Management System (LMS) replaces this fragmented patchwork with a single, unified digital hub. This guide explains what an LMS does, how it operates in daily coaching workflows, and what to look for when choosing one.</p>

<h2 id="what-is-an-lms">1. What is a Learning Management System (LMS)?</h2>
<p>A Learning Management System is specialized software designed to deliver, manage, and track educational courses and student progress. Rather than functioning as a public video-sharing website, an LMS provides a secure, private environment where only enrolled students can access study materials, attend scheduled live classes, submit assignments, and take exams.</p>

<p>For a coaching institute, an LMS operates on three primary levels:</p>
<ul>
  <li><strong>The Student Portal:</strong> Where enrolled learners log in on their phones or computers to access course videos, read study PDFs, view batch schedules, join live classes, and take practice tests.</li>
  <li><strong>The Teacher Portal:</strong> Where faculty members organize lesson drip releases, conduct scheduled live sessions, review student assignments, and evaluate mock test scores.</li>
  <li><strong>The Administrator Dashboard:</strong> Where institute management oversees batch rosters, tracks live class attendance, collects fees via payment gateways with GST invoices, and manages staff role permissions.</li>
</ul>

<h2 id="why-generic-tools-fail">2. Why generic messaging and video tools fall short</h2>
<p>Many coaching centers initially try to run online teaching using free chat applications and video calling links. However, institutes quickly encounter operational bottlenecks:</p>
<ul>
  <li><strong>Link Sharing &amp; Unauthorized Access:</strong> Meeting links and video URLs get forwarded to unregistered students, causing revenue leakage.</li>
  <li><strong>Disorganized Learning Archives:</strong> In chat streams, study PDFs and recorded lecture links quickly get buried under hundreds of student questions.</li>
  <li><strong>Lack of Attendance Accountability:</strong> Manually noting down which students attended live sessions wastes valuable teaching time and leaves parents without reliable attendance records.</li>
  <li><strong>Manual Payment Reconciliation:</strong> Tracking bank transfers manually across hundreds of student accounts leads to administrative errors and delayed fee collection.</li>
</ul>

<h2 id="core-capabilities">3. Core capabilities coaching institutes need</h2>
<p>An effective coaching LMS should be built around cohort workflows rather than just selling pre-recorded videos. Key capabilities include:</p>
<ul>
  <li><strong>Structured Batch Management:</strong> The ability to run separate morning, evening, and weekend batches for the same course, each with its own timetable and roster.</li>
  <li><strong>Live Class Integration:</strong> Single-click class launching with automatic attendance logging and lecture recording storage.</li>
  <li><strong>Subject Question Banks:</strong> Robust testing tools that support chapter-wise quizzes and timed mock tests with automated grading and rank analysis.</li>
  <li><strong>Integrated Fee Collection:</strong> Direct integration with Indian payment gateways (Razorpay, Paytm) with automated GST invoice generation and offline bank transfer reviews.</li>
</ul>

<h2 id="protecting-content">4. Protecting your lectures and test materials</h2>
<p>Intellectual property is a coaching institute's most valuable asset. Premium coaching LMS platforms like <a href="/platform/security">LMS Domain</a> implement protective safeguards including dynamic video watermarking—which stamps the enrolled student's email and ID across playback—and concurrent device sign-in limits to prevent unauthorized account sharing.</p>

<h2 id="evaluating-options">5. How to choose the right LMS for your institute</h2>
<p>When evaluating LMS software, consider your institutional branding, ease of onboarding, and localized support. A white-label platform that runs entirely under your own website domain (<code>learn.yourcoaching.in</code>) elevates your professional credibility, while a domestic Indian support team ensures your staff receives prompt assistance during batch launches.</p>
`,
    faqs: [
      {
        question: "Can an LMS handle both online and offline coaching batches?",
        answer:
          "Yes, many hybrid coaching institutes use LMS Domain to provide digital class recordings, chapter notes, and mock tests to their physical classroom students while also running purely online remote batches.",
      },
      {
        question: "Does an LMS replace our teaching faculty?",
        answer:
          "No, an LMS empowers faculty by eliminating repetitive administrative tasks like taking roll call, sharing links, and manually grading multiple-choice tests, allowing teachers to focus on instruction and mentoring.",
      },
      {
        question: "Can students use the LMS on their smartphones?",
        answer:
          "Yes, LMS Domain is fully responsive across mobile web browsers, allowing students to watch lectures, join live classes, and complete quizzes from any smartphone or tablet.",
      },
    ],
  },

  "how-to-sell-courses-online-in-india-with-gst-invoices": {
    slug: "how-to-sell-courses-online-in-india-with-gst-invoices",
    title: "How to sell courses online in India with GST invoices",
    subtitle:
      "A complete guide to course monetization, payment gateway integrations (Razorpay, Paytm, Stripe), coupon strategies, and automated GST tax compliance for Indian educators.",
    metaTitle: "Sell Courses Online in India with GST Invoices | LMS Domain",
    metaDescription:
      "Learn how to sell online courses in India with GST compliance. Step-by-step guide to Razorpay, Paytm, Stripe integrations, GST invoices, and coupon setup.",
    date: "2026-11-07",
    readingTime: "10 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "introduction-monetization", title: "1. The online education monetization landscape in India" },
      { id: "choosing-payment-gateways", title: "2. Selecting and integrating Indian payment gateways" },
      { id: "understanding-gst", title: "3. Understanding GST compliance for online education" },
      { id: "generating-gst-invoices", title: "4. Automating regular and B2B GST invoices" },
      { id: "handling-offline-payments", title: "5. Handling offline bank transfers and review workflows" },
      { id: "pricing-and-promotions", title: "6. Discount coupons and pricing strategies" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>Selling educational courses and live cohort seats online in India has expanded dramatically. However, as independent academies, test-prep centers, and training companies scale beyond informal fee collection, financial compliance becomes essential. Accepting student tuition securely while issuing automated regular and B2B GST invoices is critical for building a legitimate, audit-proof education business.</p>

<p>This guide explains how to set up payment infrastructure, connect domestic and international gateways, and automate GST invoicing on your own branded website.</p>

<h2 id="introduction-monetization">1. The online education monetization landscape in India</h2>
<p>Indian learners expect seamless checkout experiences powered by instant payment rails, especially UPI. At the same time, education businesses face specific regulatory requirements: distinguishing between inter-state and intra-state transactions, applying the appropriate Goods and Services Tax (GST) rate, and generating serial tax invoices that satisfy accounting audits.</p>

<h2 id="choosing-payment-gateways">2. Selecting and integrating Indian payment gateways</h2>
<p>To maximize checkout conversion, your academy website should support the primary payment methods preferred by Indian students:</p>
<ul>
  <li><strong>Razorpay:</strong> The standard domestic gateway in India, supporting UPI apps (Google Pay, PhonePe, Paytm, BHIM), RuPay and international debit/credit cards, and net banking across 50+ Indian banks. Direct settlements deposit into your registered business bank account.</li>
  <li><strong>Paytm Payment Gateway:</strong> Highly popular across tier-2 and tier-3 cities, offering deep UPI coverage and Paytm Wallet support.</li>
  <li><strong>Stripe:</strong> Essential if your academy attracts students from the diaspora (e.g., NRI students in the Gulf, USA, Canada, or UK). Stripe enables international card processing in USD, EUR, GBP, and major foreign currencies.</li>
  <li><strong>DOKU:</strong> Valuable for academies marketing language or vocational courses into Southeast Asian markets like Indonesia.</li>
</ul>

<h2 id="understanding-gst">3. Understanding GST compliance for online education</h2>
<p>In India, commercial online education and commercial coaching services are generally subject to 18% Goods and Services Tax (GST). Tax treatment depends on student location:</p>
<ul>
  <li><strong>Intra-State Supply:</strong> When the student is located in the same state as your registered business entity, the invoice applies 9% Central GST (CGST) and 9% State GST (SGST).</li>
  <li><strong>Inter-State Supply:</strong> When the student is in a different Indian state, the invoice applies 18% Integrated GST (IGST).</li>
  <li><strong>Export of Services:</strong> Invoices issued to foreign learners paying in convertible foreign exchange may qualify as zero-rated export of services under applicable legal provisions.</li>
</ul>

<h2 id="generating-gst-invoices">4. Automating regular and B2B GST invoices</h2>
<p>Manually calculating tax breakdowns and typing invoices for hundreds of student enrollments each month is inefficient and prone to error. An academy platform like <a href="/platform/sell">LMS Domain</a> automates this entire sequence:</p>
<ul>
  <li><strong>Sequential Numbering:</strong> Generates unique, non-repeating tax invoice serial numbers for every successful checkout.</li>
  <li><strong>Mandatory Business Identifiers:</strong> Displays your registered business name, registered office address, PAN, and 15-digit GSTIN.</li>
  <li><strong>Student Tax Details:</strong> Captures student state of supply and optional corporate client GSTIN for B2B client batches.</li>
  <li><strong>Automated PDF Delivery:</strong> Immediately emails the finalized PDF tax receipt to the learner while archiving the record in your admin payment reports.</li>
</ul>

<h2 id="handling-offline-payments">5. Handling offline bank transfers and review workflows</h2>
<p>A significant portion of higher-ticket enrollments (such as year-long coaching packages or corporate bootcamps) occur via direct IMPS, NEFT, or RTGS bank transfers. Your checkout should offer an "Offline Payment" option where students upload transaction reference numbers and payment screenshots.</p>
<p>Institute administrators can review the submitted receipt against their bank statement and approve enrollment with one click, automatically granting student access and generating the corresponding tax invoice.</p>

<h2 id="pricing-and-promotions">6. Discount coupons and pricing strategies</h2>
<p>Promotional incentives can drive enrollment surges ahead of new batch start dates. Effective discounting controls include:</p>
<ul>
  <li><strong>Percentage vs. Flat Discounts:</strong> Configure percentage codes (e.g., <code>EARLYBIRD15</code> for 15% off) or fixed rupee deductions (e.g., <code>SAVE1000</code>).</li>
  <li><strong>Expiry Dates &amp; Redemption Caps:</strong> Set time windows and maximum claim limits to create genuine scarcity.</li>
  <li><strong>Transparent Tax Display:</strong> Ensure your checkout clearly presents course price, discount amount, and 18% GST breakdown before final payment confirmation.</li>
</ul>
`,
    faqs: [
      {
        question: "Is GST registration mandatory before selling courses online?",
        answer:
          "Under Indian tax law, businesses exceeding threshold annual turnover limits (generally ₹20 lakhs for services in most states) must register for GST. If you are registered, you must collect GST and issue compliant tax invoices.",
      },
      {
        question: "Does LMS Domain charge a commission on course sales?",
        answer:
          "No, LMS Domain operates on fixed software subscription pricing with zero platform transaction commissions. Standard processing fees are charged directly by your connected payment gateway (e.g., Razorpay or Stripe).",
      },
      {
        question: "Can I sell courses in multiple currencies?",
        answer:
          "Yes, you can charge learners in INR, USD, EUR, GBP, and other major currencies supported by your connected gateway merchant account.",
      },
    ],
  },
  "best-lms-for-coaching-institutes-in-india": {
    slug: "best-lms-for-coaching-institutes-in-india",
    title: "Best LMS for coaching institutes in India (2026): what to check, and five options compared",
    subtitle:
      "A buyer's checklist for coaching institutes and tuition centres, plus a side-by-side look at LMS Domain, Edmingle, Graphy, Learnyst and Moodle using each platform's public pricing page.",
    metaTitle: "Best LMS for Coaching Institutes in India (2026) | LMS Domain",
    metaDescription:
      "How to choose an LMS for a coaching institute in India: batches, live classes, tests, video protection, apps and fees. Five platforms compared from their public pricing pages.",
    date: "2026-11-23",
    readingTime: "7 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "what-coaching-institutes-need", title: "1. What a coaching institute needs from an LMS" },
      { id: "checklist", title: "2. Questions to ask in every demo" },
      { id: "options-compared", title: "3. Five options compared" },
      { id: "which-fits", title: "4. Which one fits your institute" },
      { id: "trial-plan", title: "5. How to test a platform in a 15-day trial" },
      { id: "moving", title: "6. Moving from WhatsApp groups and Google Drive" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>A coaching institute doesn't need the same thing as a creator selling one recorded course. You run several batches of the same course at different times, you teach live most days, you test students every week, and your notes and recordings are what students pay for. The "best LMS" is the one that handles that routine without extra tools stuck on the side.</p>

<p>This guide gives you a checklist to test any platform against, then compares five options using each one's public pricing page. We make LMS Domain, so read our part with that in mind. For the others, we only state what their own pricing pages say, with links, so you can check them yourself.</p>

<blockquote><strong>Short answer:</strong> if you teach live batches, run regular tests and want your videos protected, shortlist platforms that include all three on the plan you can afford, and that don't take a cut of each fee you collect. Then run one real batch on a free trial before you decide.</blockquote>

<h2 id="what-coaching-institutes-need">1. What a coaching institute needs from an LMS</h2>
<p>Most coaching institutes in India move online with a mix of a meeting app, a chat group, a cloud drive and a payment link. That works for one batch. It breaks when you have five batches: links get forwarded to people who haven't paid, notes get lost in the chat, attendance is taken by hand, and fees are matched to students in a spreadsheet.</p>
<p>An LMS should replace that mix. For a coaching institute, that means these seven things:</p>
<ol>
  <li><strong>Batches with their own timetable.</strong> The same course runs as a morning, evening and weekend batch, each with its own students, schedule and teacher.</li>
  <li><strong>Live classes inside the LMS.</strong> Students join from their dashboard instead of a forwarded link, attendance is recorded, and the recording is added to the course.</li>
  <li><strong>Tests.</strong> Question banks by chapter, timed mock tests and automatic marking.</li>
  <li><strong>Video and notes protection.</strong> Encrypted (DRM) video, a watermark with the student's details, and limits on screen recording and account sharing.</li>
  <li><strong>A mobile app.</strong> Most students study on a phone. Check whether the app is shared or in your institute's name, and on which plan.</li>
  <li><strong>Fees paid to your own account.</strong> Your own Razorpay or Paytm account, GST invoices, coupons, and ideally no commission on each sale.</li>
  <li><strong>Reminders where students already are.</strong> Class reminders on WhatsApp get read; emails often don't.</li>
</ol>

<h2 id="checklist">2. Questions to ask in every demo</h2>
<p>Feature lists all look alike. These questions show the difference quickly. Ask them in the demo and get the answer for the exact plan you would buy.</p>
<table>
  <thead><tr><th>Ask this</th><th>Why it matters</th></tr></thead>
  <tbody>
    <tr><td>Is there a fee on each sale, on my plan?</td><td>A 5% fee on ₹20 lakh of fees a year is ₹1 lakh, every year, on top of the subscription.</td></tr>
    <tr><td>Can one course run as several batches, each with its own timetable?</td><td>Without it you copy the course for every batch and update each copy by hand.</td></tr>
    <tr><td>Which live class tools work, and is attendance recorded automatically?</td><td>Manual attendance costs teaching time and gives parents nothing reliable.</td></tr>
    <tr><td>Is video protection on my plan, or only on a higher one?</td><td>Recorded lectures shared on Telegram are lost revenue.</td></tr>
    <tr><td>Is the mobile app in my institute's name, and what does that cost?</td><td>A branded app often needs a higher plan, a yearly contract or an add-on.</td></tr>
    <tr><td>Can I bill monthly, and how long is the free trial?</td><td>Yearly-only billing means a large payment before you know the platform suits you.</td></tr>
    <tr><td>Can I export my students and data if I leave?</td><td>Your student list is your business. Make sure it isn't locked in.</td></tr>
  </tbody>
</table>

<h2 id="options-compared">3. Five options compared</h2>
<p>The figures below for Edmingle, Graphy, Learnyst and Moodle are from their public pricing pages, checked on 22 November 2026. Prices and plans change, so check the linked page before you decide.</p>

<h3 id="lms-domain">LMS Domain (our platform)</h3>
<ul>
  <li><strong>Batches, live classes and tests on every plan:</strong> batch timetables, Zoom, Google Meet or Microsoft Teams with automatic attendance and recordings, and timed tests from question banks.</li>
  <li><strong>Video protection on every plan:</strong> DRM video, watermarks, and screen-recording blocking in the app.</li>
  <li><strong>0% commission:</strong> fees go straight to your own Razorpay, Paytm, Stripe or DOKU account. You pay only your gateway's fee. Academies in India get automatic GST invoices.</li>
  <li><strong>Apps:</strong> the LMS Domain app for Android and iOS on every plan, and your own branded Android and iOS app on Pro and up. Device limits are on Pro and up too.</li>
  <li><strong>Billing:</strong> monthly or yearly, with a 15-day free trial. Your own domain is on Growth and up; Starter uses a free subdomain. See <a href="/pricing">pricing</a>.</li>
</ul>

<h3 id="edmingle">Edmingle</h3>
<ul>
  <li>Unlimited live sessions and piracy control are listed, and your own domain is on every plan.</li>
  <li>A shared app on Core. A branded Android app from Prime and iOS from Power, on yearly plans only.</li>
  <li>A private payment gateway is listed from the Power plan.</li>
  <li>Monthly or yearly billing (20% off yearly) and a 7-day trial.</li>
  <li>Source: <a href="https://www.edmingle.com/in/pricing/">edmingle.com/in/pricing</a>. Our detailed comparison: <a href="/compare/edmingle-alternative">LMS Domain vs Edmingle</a>.</li>
</ul>

<h3 id="graphy">Graphy</h3>
<ul>
  <li>A fee on each sale of 10%, 7.5% or 5% depending on the plan (at least ₹10 a sale).</li>
  <li>Yearly plans, from ₹24,999 a year. Your own domain on every paid plan.</li>
  <li>An Android app on every plan; iOS on the Rise plan or as a paid add-on.</li>
  <li>Live classes are included, and DRM protection is listed from the Launch plan.</li>
  <li>Source: <a href="https://graphy.com/pricing">graphy.com/pricing</a>. Our detailed comparison: <a href="/compare/graphy-alternative">LMS Domain vs Graphy</a>.</li>
</ul>

<h3 id="learnyst">Learnyst</h3>
<ul>
  <li>Mock tests and test series, with limits by plan, and DRM content protection listed.</li>
  <li>Live classes with Zoom support.</li>
  <li>Branded Android and iOS apps, with additional charges and a yearly plan.</li>
  <li>Monthly or yearly billing (10% off yearly). The page notes that additional charges apply.</li>
  <li>Source: <a href="https://www.learnyst.com/pricing">learnyst.com/pricing</a>. Our detailed comparison: <a href="/compare/learnyst-alternative">LMS Domain vs Learnyst</a>.</li>
</ul>

<h3 id="moodle">Moodle</h3>
<ul>
  <li>Free, open-source software. You host it yourself, or pay for hosting such as MoodleCloud.</li>
  <li>MoodleCloud ranges from $160 a year (50 users, 1 GB) to $1,990 a year (750 users, 50 GB).</li>
  <li>Selling courses uses Stripe (from the $470-a-year Small plan) or PayPal, so Indian gateways need extra work.</li>
  <li>Live classes are not listed on the MoodleCloud pricing page, so plan for a plugin or a separate tool.</li>
  <li>Source: <a href="https://www.moodlecloud.com/pricing/">moodlecloud.com/pricing</a>. Our detailed comparison: <a href="/compare/moodle-alternative">LMS Domain vs Moodle</a>.</li>
</ul>

<p>You may also see Classplus on shortlists for Indian coaching institutes. We couldn't confirm its current plans and prices from a public pricing page, so we haven't listed details here. Ask for them in writing during the demo.</p>

<h2 id="which-fits">4. Which one fits your institute</h2>
<p>No platform is best for everyone. Here is an honest way to narrow it down:</p>
<ul>
  <li><strong>You teach live batches and test every week:</strong> pick a platform with batches, live class attendance and tests on the plan you'll actually pay for, not only on the top plan.</li>
  <li><strong>Your recorded lectures are your main product:</strong> make video protection and the mobile app your first two checks.</li>
  <li><strong>Your fees add up to several lakh a year:</strong> a per-sale fee costs more than the subscription. Do the sum for your own numbers.</li>
  <li><strong>You mainly sell test series as their own products:</strong> a test-focused platform such as Learnyst may suit you.</li>
  <li><strong>You have an IT team, or a funder requires it:</strong> Moodle gives you full control of the code, at the cost of running it yourself.</li>
  <li><strong>You already run on a platform and it works:</strong> moving has a cost too. Switch only for a clear gain.</li>
</ul>

<h2 id="trial-plan">5. How to test a platform in a 15-day trial</h2>
<p>A demo shows the best case. A trial shows your case. Use the trial to run one real batch:</p>
<ol>
  <li><strong>Days 1 to 2:</strong> set up one course with two batches, add a teacher, and connect your payment gateway in test mode.</li>
  <li><strong>Days 3 to 7:</strong> hold three live classes. Check that attendance and recordings appear without anyone doing it by hand.</li>
  <li><strong>Days 8 to 10:</strong> run a timed test from a question bank and look at the results a teacher would see.</li>
  <li><strong>Days 11 to 13:</strong> ask five students to use the app on their own phones, including a low-cost Android phone, and try to screen-record a lecture.</li>
  <li><strong>Days 14 to 15:</strong> export your student list, and ask support one real question to see how fast and how well they answer.</li>
</ol>

<h2 id="moving">6. Moving from WhatsApp groups and Google Drive</h2>
<p>Most institutes don't move everything at once. A safe order is:</p>
<ul>
  <li>Start new batches on the LMS and leave running batches where they are until they finish.</li>
  <li>Upload notes chapter by chapter as you teach them, rather than all at once.</li>
  <li>Keep the WhatsApp group for announcements for a few weeks, but send class links only through the LMS.</li>
  <li>Move fee collection last, once students are used to logging in.</li>
</ul>
<p>If you'd like a hand, <a href="/demo">book a demo</a> and we'll walk through your batches with you. You can also see how LMS Domain works for <a href="/solutions/coaching-institutes">coaching institutes</a>.</p>
`,
    faqs: [
      {
        question: "What is the best LMS for coaching institutes in India?",
        answer:
          "It depends on how you teach. If you run live batches and weekly tests, choose a platform that includes batches, live class attendance, tests and video protection on the plan you can afford, and that doesn't charge a fee on each sale. Shortlist two or three, then run one real batch on a free trial.",
      },
      {
        question: "Is there a free LMS for coaching institutes?",
        answer:
          "Moodle is free, open-source software, but you pay for hosting and need someone to run and update it. Hosted platforms like LMS Domain charge a subscription but handle hosting, updates and security for you. LMS Domain has a 15-day free trial on every plan.",
      },
      {
        question: "Do I need my own app for my coaching institute?",
        answer:
          "Not at the start. Students can use a shared app, such as the LMS Domain app for Android and iOS, which is on every plan. An app in your institute's own name helps with brand trust as you grow; on LMS Domain it is on Pro and up.",
      },
      {
        question: "How do I stop students sharing recorded lectures?",
        answer:
          "Look for DRM-encrypted video, a watermark showing the student's details, screen-recording blocking in the app, and limits on how many devices can use one account. LMS Domain has DRM, watermarks and screen-recording blocking on every plan, and device limits on Pro and up.",
      },
      {
        question: "Can I collect fees with Razorpay and issue GST invoices?",
        answer:
          "Yes. On LMS Domain you connect your own Razorpay, Paytm, Stripe or DOKU account, fees are paid straight to you with 0% commission, and academies in India get automatic GST invoices.",
      },
      {
        question: "Can I run Zoom, Google Meet or Teams classes from the LMS?",
        answer:
          "Yes. On LMS Domain you connect your own Zoom, Google or Microsoft account, and each class gets its meeting link automatically. Attendance and recordings are added to the course for all three.",
      },
    ],
  },
};

