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
  /** Cover design: "start" (steps), "lms" (course screen), "sell" (checkout), "protect" (watermarked player) or "app" (phone with your app). */
  cover?: BlogCoverStyle;
  /** Cover photo uploaded in Admin > Blog (/uploads/... or https). Replaces the drawn cover. */
  coverImage?: string;
}

export type BlogCoverStyle = "start" | "lms" | "sell" | "protect" | "app";

/** Cover and label of the built-in posts (posts from the admin carry their own). */
export const BLOG_META: Record<string, { category: string; tone: string; ink: string; art: BlogCoverStyle }> = {
  "how-to-start-an-online-academy-in-india": { category: "Getting started", tone: "#F1EDFF", ink: "#6C4BFF", art: "start" },
  "what-is-an-lms-guide-for-coaching-institutes": { category: "LMS basics", tone: "#E6F4F1", ink: "#0D9488", art: "lms" },
  "how-to-get-your-own-coaching-app": { category: "Mobile apps", tone: "#E8F1FF", ink: "#2563EB", art: "app" },
  "how-to-stop-screen-recording-of-course-videos": { category: "Content protection", tone: "#FDEEF3", ink: "#DB2777", art: "protect" },
  "best-lms-for-coaching-institutes-in-india": { category: "Choosing an LMS", tone: "#E6F4F1", ink: "#0D9488", art: "lms" },
  "how-to-sell-courses-online-in-india-with-gst-invoices": { category: "Selling courses", tone: "#FFF1E8", ink: "#EA580C", art: "sell" },
};
export const BLOG_COVER_STYLES: BlogCoverStyle[] = ["start", "lms", "sell", "protect", "app"];

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
  "how-to-stop-screen-recording-of-course-videos": {
    slug: "how-to-stop-screen-recording-of-course-videos",
    title: "How to stop screen recording of your course videos (and what no platform can stop)",
    subtitle:
      "An honest guide for academies and coaching institutes: what DRM, app-level blocking, watermarks and device limits each prevent, where browsers fall short, and what to do when a lecture leaks.",
    metaTitle: "How to Stop Screen Recording of Course Videos | LMS Domain",
    metaDescription:
      "Can you stop students screen-recording your course videos? What DRM, app blocking, watermarks and device limits each do, where browsers fall short, and what to do when a lecture leaks.",
    date: "2026-11-23",
    readingTime: "4 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "how-videos-leak", title: "1. How course videos actually leak" },
      { id: "layers", title: "2. The four layers of protection" },
      { id: "browsers", title: "3. Why a website can't promise a full block" },
      { id: "when-it-leaks", title: "4. What to do when a lecture leaks" },
      { id: "checklist", title: "5. What to check when choosing a platform" },
      { id: "lms-domain", title: "6. How LMS Domain protects your videos" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>Your recorded lectures are what students pay for. When one copy ends up in a Telegram channel, every student who watches it there is a student who didn't enrol. So the question comes up in almost every demo: <em>can you stop students from screen-recording my videos?</em></p>

<p>The honest answer is: you can stop most of it, and you can trace the rest. No platform can stop everything, because anyone can point a second phone at the screen. What works is several layers together, each closing a different gap. This guide explains what each layer does and doesn't do, so you can judge any platform's claims, including ours.</p>

<blockquote><strong>Short answer:</strong> stream videos with DRM so they can't be downloaded, play paid lessons in an app that blocks screen recording, show a watermark with each student's details so any leak can be traced, and limit how many devices one account can use.</blockquote>

<h2 id="how-videos-leak">1. How course videos actually leak</h2>
<p>It helps to know what you're defending against. Paid lectures usually get out in one of five ways:</p>
<ol>
  <li><strong>Downloading the video file</strong> with a browser extension or downloader, when the video is a plain file or an unprotected stream.</li>
  <li><strong>Screen recording on a phone</strong>, using the recorder built into Android or iOS.</li>
  <li><strong>Screen recording on a computer</strong>, using a recording app or a browser extension.</li>
  <li><strong>Sharing one account</strong> with friends, so five people watch on one fee.</li>
  <li><strong>Filming the screen</strong> with a second phone.</li>
</ol>
<p>Each layer below closes one or two of these. None of them closes all five.</p>

<h2 id="layers">2. The four layers of protection</h2>
<table>
  <thead><tr><th>Layer</th><th>What it stops</th></tr></thead>
  <tbody>
    <tr><td><strong>DRM encryption</strong></td><td>Downloading. The video is streamed encrypted and only plays inside your academy for a signed-in student.</td></tr>
    <tr><td><strong>App screen-recording block</strong></td><td>Screen recording and screenshots on the phone while a lesson plays in the app.</td></tr>
    <tr><td><strong>Watermark with the student's details</strong></td><td>Nothing on its own, but it shows who leaked a copy, and students think twice before sharing a video with their own details on it.</td></tr>
    <tr><td><strong>Device limits</strong></td><td>Account sharing, by capping how many devices can sign in to one account.</td></tr>
  </tbody>
</table>

<h3 id="drm">DRM encryption</h3>
<p>DRM (digital rights management) encrypts the video and only gives the key to a signed-in student's player for a short time. Downloader tools then get an encrypted file they can't play. This is the base layer: without it, the other layers matter less, because the file itself can be copied.</p>

<h3 id="app-block">Blocking screen recording in the app</h3>
<p>Android and iOS both let an app protect what's on screen. On Android, an app can mark its screen as secure, so screenshots and screen recordings come out blank. On iOS, an app can tell when the screen is being recorded and hide the video. That's why a proper app is the strongest place to watch paid lessons on a phone.</p>

<h3 id="watermark">Watermarks with the student's details</h3>
<p>A dynamic watermark shows the signed-in student's details over the video while it plays and moves around, so it can't simply be cropped out. It doesn't stop a recording, but it changes behaviour: students know any copy leads back to them. When a copy does leak, you know whose account it came from.</p>

<h3 id="device-limits">Device limits</h3>
<p>A device limit caps how many phones and computers can use one account. When a student signs in on one device too many, the oldest session is signed out or the new sign-in is refused. That stops one fee being shared around a group of friends.</p>

<h2 id="browsers">3. Why a website can't promise a full block</h2>
<p>Be careful with any platform that says it blocks screen recording everywhere. In a web browser, the website doesn't control the computer. Recording apps and browser extensions run outside the page, so a website can't switch them off.</p>
<p>DRM helps here too: on some browser and device combinations, DRM-protected video shows up black in a screen recording. But that depends on the browser, the operating system and the hardware, so it isn't something you can rely on for every student.</p>
<p>The practical answer is to ask students to watch paid lessons in the app on their phone, where the block works, and to keep the watermark on everywhere so recordings from a computer can still be traced.</p>

<h2 id="when-it-leaks">4. What to do when a lecture leaks</h2>
<ol>
  <li><strong>Get a copy</strong> of the leaked video or a screenshot of the post, with the link and date.</li>
  <li><strong>Read the watermark</strong> to find which account it came from.</li>
  <li><strong>Suspend that account</strong> and talk to the student. Often it's a friend using their login, which is what device limits are for.</li>
  <li><strong>Report the copy</strong> through the platform's copyright complaint process. Telegram, YouTube and Google all have one, and you'll need to show you own the content.</li>
  <li><strong>Tell your students</strong>, briefly, that videos are watermarked and leaks are traced. It deters the next one.</li>
</ol>

<h2 id="checklist">5. What to check when choosing a platform</h2>
<ul>
  <li>Is the video DRM-encrypted, or just a hidden link to a file?</li>
  <li>Does the mobile app block screen recording and screenshots during lessons, on both Android and iOS?</li>
  <li>Does the watermark show the student's own details, and does it move?</li>
  <li>Can you limit devices per student, and on which plan?</li>
  <li>Is all of this on the plan you'd buy, or only on a higher one?</li>
</ul>
<p>Then test it yourself during a free trial: sign in as a student, try to download a lesson, and try to screen-record it on an Android phone and an iPhone.</p>

<h2 id="lms-domain">6. How LMS Domain protects your videos</h2>
<ul>
  <li><strong>Every plan:</strong> DRM-encrypted video, a dynamic watermark with the learner's details, and screen recording and screenshots blocked while lessons play in the Android and iOS apps.</li>
  <li><strong>Pro and up:</strong> device limits per learner. You can also publish your own branded Android and iOS app on Pro and up.</li>
</ul>
<p>You can try all of it on the 15-day free trial. See <a href="/platform/security">security</a> for the details, <a href="/platform/mobile-app">the mobile app</a>, or <a href="/demo">book a demo</a> and we'll show you a recording attempt on a real phone.</p>
`,
    faqs: [
      {
        question: "Can I completely stop students from screen recording my videos?",
        answer:
          "No platform can stop everything, because a student can film the screen with a second phone. You can stop downloading with DRM, block screen recording in the mobile app, and use a watermark with each student's details so any copy that does leak can be traced to an account.",
      },
      {
        question: "Can a website block screen recording in the browser?",
        answer:
          "Not fully. Recording apps and browser extensions run outside the web page. On some browsers and devices DRM-protected video appears black in a recording, but it depends on the browser, operating system and hardware. A mobile app is the reliable place to block it.",
      },
      {
        question: "Does a watermark stop screen recording?",
        answer:
          "No, but it discourages it and makes leaks traceable. A dynamic watermark shows the signed-in student's details over the video and moves around, so a leaked copy shows which account it came from.",
      },
      {
        question: "Can students download my course videos?",
        answer:
          "Not if the videos are DRM-encrypted. Downloader tools then get an encrypted file they can't play. On LMS Domain, course videos are DRM-encrypted on every plan.",
      },
      {
        question: "How do I stop students sharing one account?",
        answer:
          "Use device limits, which cap how many devices can sign in to one account. On LMS Domain, device limits are on Pro and up.",
      },
      {
        question: "Does LMS Domain block screen recording on every plan?",
        answer:
          "Yes. Every plan includes DRM video, a watermark with the learner's details, and a screen-recording and screenshot block while lessons play in the Android and iOS apps.",
      },
    ],
  },
  "how-to-get-your-own-coaching-app": {
    slug: "how-to-get-your-own-coaching-app",
    title: "How to get your own coaching app: options, store accounts and what to check",
    subtitle:
      "A practical guide for coaching institutes and academies: shared app or your own branded app, how publishing in Google Play and the App Store works, and the questions to ask before you choose.",
    metaTitle: "How to Get Your Own Coaching App (Android and iOS) | LMS Domain",
    metaDescription:
      "How to get your own coaching app for Android and iOS: shared vs branded apps, building vs white-label, Google Play and App Store accounts, and what to check before you choose.",
    date: "2026-11-23",
    readingTime: "5 min read",
    author: "LMS Domain Editorial Team",
    toc: [
      { id: "do-you-need-one", title: "1. Do you need your own app?" },
      { id: "three-ways", title: "2. Three ways to get an app" },
      { id: "what-it-should-do", title: "3. What a coaching app should do" },
      { id: "store-accounts", title: "4. Publishing in Google Play and the App Store" },
      { id: "selling-in-app", title: "5. Selling courses inside the app" },
      { id: "checklist", title: "6. Questions to ask before you choose" },
      { id: "lms-domain", title: "7. How it works on LMS Domain" },
      { id: "faqs", title: "Frequently asked questions" },
    ],
    content: `
<p>Most students in a coaching institute study on their phone. Parents ask for "the app", competitors advertise theirs, and an app with your name on it in the Play Store looks established. So sooner or later every institute asks: <em>how do we get our own app?</em></p>

<p>There are three ways to do it, and they differ a lot in cost, effort and who owns what. This guide explains each one, how publishing in Google Play and the App Store works, and what to check before you choose.</p>

<blockquote><strong>Short answer:</strong> start with a shared app from your LMS so students can learn on their phones from day one. When your brand matters enough, move to a branded app built on the same platform, published in your own store accounts. Building an app from scratch only makes sense if you have a development team to keep it running.</blockquote>

<h2 id="do-you-need-one">1. Do you need your own app?</h2>
<p>Not on day one. What students need is to watch lessons, join live classes and take tests easily on a phone. That can come from three places:</p>
<ul>
  <li><strong>Your website in the phone's browser.</strong> Works on any phone with nothing to install, but there are no push alerts, offline downloads or in-app protection.</li>
  <li><strong>A shared app.</strong> Your LMS provider's app in the stores, where students open your academy. Full app features from the first day, but the store listing carries the provider's name.</li>
  <li><strong>Your own branded app.</strong> Your academy's name, logo and colours in Google Play and the App Store. It builds trust and keeps your brand in front of students every time they unlock their phone.</li>
</ul>
<p>A branded app matters most when you have enough students that brand recognition affects enrolments, or when you advertise and want people to search for your name in the stores.</p>

<h2 id="three-ways">2. Three ways to get an app</h2>
<table>
  <thead><tr><th>Option</th><th>What to expect</th></tr></thead>
  <tbody>
    <tr><td><strong>Build from scratch</strong> with an agency or your own developers</td><td>Full control, but you pay for the build and for every update. Video protection, live classes, tests and payments all have to be built and maintained, and both stores change their rules every year.</td></tr>
    <tr><td><strong>Branded (white-label) app</strong> from your LMS</td><td>Your name and look on an app the provider already maintains. Features and fixes arrive with the platform. Check which plan includes it and whose store account it's published in.</td></tr>
    <tr><td><strong>Shared app</strong> from your LMS</td><td>Nothing to publish. Students download the provider's app and open your academy inside it. The quickest start, with the provider's name on the listing.</td></tr>
  </tbody>
</table>
<p>For most coaching institutes, the white-label route is the sweet spot: it looks like your own app, without you running a software project.</p>

<h2 id="what-it-should-do">3. What a coaching app should do</h2>
<p>Whichever route you take, test the app against how your students actually study:</p>
<ul>
  <li><strong>Protected lessons:</strong> encrypted video, a watermark with the student's details, and screen recording blocked while lessons play.</li>
  <li><strong>Live classes:</strong> one tap from the timetable into the class, with attendance recorded.</li>
  <li><strong>Tests:</strong> timed mock tests with results straight after.</li>
  <li><strong>Offline downloads:</strong> students on weak or expensive data can watch lessons later without internet.</li>
  <li><strong>Push notifications:</strong> class, test and announcement alerts.</li>
  <li><strong>Buying courses in the app:</strong> students browse your catalogue and enrol without going to a website.</li>
  <li><strong>Separate logins for staff:</strong> teachers and admins sign in with their own accounts, not a shared one.</li>
  <li><strong>Their language:</strong> students learn better in the language they're most comfortable with.</li>
</ul>

<h2 id="store-accounts">4. Publishing in Google Play and the App Store</h2>
<p>A branded app has to be published from a developer account in each store. There are two ways to do this:</p>
<ul>
  <li><strong>In your own developer accounts.</strong> The listing, its reviews and its download history belong to your institute. If you ever change provider, the listing stays yours. This is the better option for most institutes.</li>
  <li><strong>In your provider's accounts.</strong> Less paperwork for you, but the listing sits in someone else's account. Ask what happens to it if you leave.</li>
</ul>
<p>If you open your own accounts, plan for these:</p>
<ul>
  <li><strong>Store fees:</strong> Google Play charges a one-time registration fee (US$25 at the time of writing). Apple's Developer Program costs US$99 a year. These are paid to Google and Apple, not to your LMS provider.</li>
  <li><strong>Register as an organisation:</strong> open the accounts in your institute's name rather than a personal name. Both stores ask organisations for a D-U-N-S number, a free business identifier that can take some days to get, so apply early.</li>
  <li><strong>Store review:</strong> both stores review every app before it goes live and review updates too. Google also has extra testing steps for some new accounts. Allow time for this before a launch date you've announced.</li>
</ul>
<p>Store rules change, so check Google's and Apple's current requirements when you start.</p>

<h2 id="selling-in-app">5. Selling courses inside the app</h2>
<p>Google and Apple both have rules about selling digital content, such as recorded courses, inside apps, and the rules differ between the two stores and by country. Before you launch, ask your provider how course purchases work in each store, and whether any store fees apply to sales made inside the app.</p>

<h2 id="checklist">6. Questions to ask before you choose</h2>
<ol>
  <li>Is there a shared app on my plan, and which plan includes a branded app?</li>
  <li>Will the branded app be published in my store accounts or yours, and what happens to it if I leave?</li>
  <li>Are video protection, live classes and tests the same in the app as on the website?</li>
  <li>Can students download lessons and watch them offline?</li>
  <li>Who handles store reviews, updates and new phone versions?</li>
  <li>How do course purchases inside the app work in each store?</li>
</ol>

<h2 id="lms-domain">7. How it works on LMS Domain</h2>
<ul>
  <li><strong>Every plan:</strong> the LMS Domain app for Android and iOS. Students open your academy inside it, with protected lessons, live classes on Zoom, Google Meet or Microsoft Teams, timed tests, offline downloads and push notifications.</li>
  <li><strong>Pro and Enterprise:</strong> your own branded Android and iOS app with your academy's name, logo and colours. You send us your app name, logo and colours; we build it and help with the store listing.</li>
  <li><strong>Store accounts:</strong> we help you publish in your own Google Play and Apple developer accounts, and you pay the store fees. If you prefer, we publish it in our accounts instead.</li>
</ul>
<p>Read more about <a href="/platform/mobile-app">the mobile app</a>, compare plans on the <a href="/pricing">pricing page</a>, or <a href="/demo">book a demo</a> and we'll show you the app on a real phone.</p>
`,
    faqs: [
      {
        question: "How can I get my own app for my coaching institute?",
        answer:
          "You can build one from scratch with developers, get a branded (white-label) app from your LMS provider, or start with your provider's shared app. A branded app from your LMS gives you your own name and look without running a software project. On LMS Domain, the branded app is on Pro and Enterprise.",
      },
      {
        question: "What is the difference between a shared app and a branded app?",
        answer:
          "In a shared app, students download the provider's app and open your academy inside it. A branded app is your own listing in Google Play and the App Store, with your academy's name, logo and colours.",
      },
      {
        question: "Do I need my own Google Play and Apple developer accounts?",
        answer:
          "Not always, but it's usually better. In your own accounts, the listing, reviews and downloads belong to your institute. On LMS Domain we help you publish in your own accounts, and you pay the store fees; or we can publish in ours.",
      },
      {
        question: "How much do Google Play and Apple developer accounts cost?",
        answer:
          "At the time of writing, Google Play charges a one-time US$25 registration fee and Apple's Developer Program costs US$99 a year. Check both stores for current prices.",
      },
      {
        question: "Can students download lessons and watch offline in the app?",
        answer:
          "On LMS Domain, yes. Students can download lessons in the app and watch them later without internet.",
      },
      {
        question: "Is screen recording blocked in the app?",
        answer:
          "Yes. On LMS Domain, screen recording is blocked while lessons play in the Android and iOS apps, on every plan, and videos are DRM-encrypted with a watermark showing the learner's details.",
      },
    ],
  },
};

