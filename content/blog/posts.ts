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
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  "how-to-start-an-online-academy-in-india": {
    slug: "how-to-start-an-online-academy-in-india",
    title: "How to start an online academy in India: a step-by-step guide",
    subtitle:
      "A practical, operational guide to launching your own branded online teaching academy in India, from curriculum structuring to GST compliance and live classes.",
    metaTitle: "How to Start an Online Academy in India | LMS Domain",
    metaDescription:
      "A practical, step-by-step guide to starting an online academy in India. Learn about curriculum structuring, live Zoom classes, GST compliance, and platform setup.",
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
<p>Live instruction remains the heart of student retention and active participation. Connecting your platform directly with Zoom enables automated class meeting links, calendar notifications, and automatic lecture recording archives stored directly in the lesson timeline.</p>
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
          "Yes, LMS Domain allows you to connect your custom domain (e.g., learn.yourbrand.com) on every plan with automated SSL security certificates included.",
      },
      {
        question: "How do live Zoom classes integrate with the student portal?",
        answer:
          "LMS Domain integrates directly with Zoom so students join scheduled batch classes with a single click. Class recordings are archived directly into the course timeline for replay.",
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
  <li><strong>The Student Portal:</strong> Where enrolled learners log in on their phones or computers to access course videos, read study PDFs, view batch schedules, join live Zoom classes, and take practice tests.</li>
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
  <li><strong>Live Zoom Integration:</strong> Single-click class launching with automatic attendance logging and lecture recording storage.</li>
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
          "Yes, LMS Domain is fully responsive across mobile web browsers, allowing students to watch lectures, join live Zoom classes, and complete quizzes from any smartphone or tablet.",
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
};

