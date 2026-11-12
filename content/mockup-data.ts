// Sample data for coded product mockups
// Identity: Your Academy (fictional sample academy)
// Time zone: Asia/Kolkata
// Currency: INR (₹)

export interface StatKpi {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  subtext?: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number; // in INR
  display: string;
}

export interface EnrollmentPoint {
  month: string;
  enrollments: number;
  newStudents: number;
}

export interface CourseCompletionItem {
  id: string;
  name: string;
  students: number;
  lessons: number;
  completionRate: number; // percentage
  category: string;
  status: "Active" | "Upcoming" | "Draft";
  price: string;
}

export interface UpcomingLesson {
  id: string;
  time: string;
  title: string;
  type: "Live Zoom" | "1:1 Session" | "Doubt Clearing";
  instructor: string;
  enrolled: number;
}

export interface QuestionBankTest {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  durationMinutes: number;
  attempts: number;
  avgScore: string;
  passingScore: string;
}

export interface PaymentTransaction {
  id: string;
  txnRef: string;
  studentName: string;
  courseTitle: string;
  amount: string;
  gstAmount: string;
  gateway: "Razorpay" | "Paytm" | "Stripe" | "Direct Bank";
  status: "Success" | "Pending Approval" | "Refunded";
  timestamp: string;
}

export interface BatchScheduleEvent {
  id: string;
  date: string;
  day: string;
  time: string;
  course: string;
  batch: string;
  mode: "Zoom Live" | "1:1 Tutor" | "Revision";
  instructor: string;
}

export const MOCKUP_IDENTITY = {
  academyName: "Your Academy",
  shortName: "NA",
  roleLabel: "Your Academy · Admin",
  domain: "learn.youracademy.in",
  timeZoneText: "Figures use the Asia/Kolkata time zone.",
};

export const MOCKUP_KPIS: StatKpi[] = [
  {
    label: "Students",
    value: "2,418",
    change: "▲ 12.4% vs last month",
    changePositive: true,
  },
  {
    label: "Enrollments this month",
    value: "186",
    change: "▲ 9.1%",
    changePositive: true,
  },
  {
    label: "Revenue this month",
    value: "₹4,86,200",
    change: "▲ 14.2%",
    changePositive: true,
  },
  {
    label: "Classes today",
    value: "6",
    subtext: "Live classes and 1:1 sessions",
  },
  {
    label: "Waiting for review",
    value: "7",
    subtext: "Approvals, payments and posts",
  },
];

export const MOCKUP_REVENUE_HISTORY: RevenuePoint[] = [
  { month: "Dec", revenue: 310000, display: "₹3.10L" },
  { month: "Jan", revenue: 342000, display: "₹3.42L" },
  { month: "Feb", revenue: 328000, display: "₹3.28L" },
  { month: "Mar", revenue: 365000, display: "₹3.65L" },
  { month: "Apr", revenue: 390000, display: "₹3.90L" },
  { month: "May", revenue: 382000, display: "₹3.82L" },
  { month: "Jun", revenue: 415000, display: "₹4.15L" },
  { month: "Jul", revenue: 440000, display: "₹4.40L" },
  { month: "Aug", revenue: 432000, display: "₹4.32L" },
  { month: "Sep", revenue: 460000, display: "₹4.60L" },
  { month: "Oct", revenue: 425000, display: "₹4.25L" },
  { month: "Nov", revenue: 486200, display: "₹4.86L" },
];

export const MOCKUP_ENROLLMENTS_TREND: EnrollmentPoint[] = [
  { month: "Dec", enrollments: 120, newStudents: 95 },
  { month: "Jan", enrollments: 135, newStudents: 108 },
  { month: "Feb", enrollments: 128, newStudents: 102 },
  { month: "Mar", enrollments: 144, newStudents: 118 },
  { month: "Apr", enrollments: 152, newStudents: 124 },
  { month: "May", enrollments: 148, newStudents: 120 },
  { month: "Jun", enrollments: 162, newStudents: 132 },
  { month: "Jul", enrollments: 170, newStudents: 139 },
  { month: "Aug", enrollments: 168, newStudents: 135 },
  { month: "Sep", enrollments: 178, newStudents: 145 },
  { month: "Oct", enrollments: 172, newStudents: 140 },
  { month: "Nov", enrollments: 186, newStudents: 152 },
];

export const MOCKUP_COURSE_COMPLETIONS: CourseCompletionItem[] = [
  {
    id: "c1",
    name: "IELTS Academic Masterclass",
    students: 412,
    lessons: 64,
    completionRate: 72,
    category: "Language & Test Prep",
    status: "Active",
    price: "₹7,999",
  },
  {
    id: "c2",
    name: "Python for Beginners",
    students: 356,
    lessons: 48,
    completionRate: 68,
    category: "Coding & Tech",
    status: "Active",
    price: "₹3,499",
  },
  {
    id: "c3",
    name: "NEET Biology Live Batch",
    students: 288,
    lessons: 96,
    completionRate: 61,
    category: "Medical Entrance",
    status: "Active",
    price: "₹14,999",
  },
  {
    id: "c4",
    name: "Spoken English Foundation",
    students: 274,
    lessons: 40,
    completionRate: 77,
    category: "Language & Communication",
    status: "Active",
    price: "₹4,499",
  },
  {
    id: "c5",
    name: "Digital Marketing Bootcamp",
    students: 196,
    lessons: 36,
    completionRate: 83,
    category: "Professional Skills",
    status: "Active",
    price: "₹12,500",
  },
  {
    id: "c6",
    name: "GST and Tally Practical",
    students: 142,
    lessons: 30,
    completionRate: 58,
    category: "Finance & Accounting",
    status: "Active",
    price: "₹3,999",
  },
];

export const MOCKUP_UPCOMING_LESSONS: UpcomingLesson[] = [
  {
    id: "l1",
    time: "10:00",
    title: "NEET Biology live (Batch B)",
    type: "Live Zoom",
    instructor: "Dr. K. Sharma",
    enrolled: 48,
  },
  {
    id: "l2",
    time: "12:30",
    title: "IELTS Speaking 1:1",
    type: "1:1 Session",
    instructor: "Prof. Ananya R.",
    enrolled: 1,
  },
  {
    id: "l3",
    time: "16:00",
    title: "Python doubt-clearing session",
    type: "Doubt Clearing",
    instructor: "Vikram Sen",
    enrolled: 32,
  },
  {
    id: "l4",
    time: "19:00",
    title: "Spoken English live",
    type: "Live Zoom",
    instructor: "Meera Nair",
    enrolled: 40,
  },
];

export const MOCKUP_DOMIE_BRIEF: string[] = [
  "3 learners in NEET Batch B haven't opened a lesson in 7 days.",
  "Revenue is 14% ahead of last month.",
  "2 payments are waiting for approval.",
];

export const MOCKUP_TESTS: QuestionBankTest[] = [
  {
    id: "t1",
    title: "NEET Biology Unit 3 Mock Exam",
    subject: "Biology / NEET",
    questionsCount: 90,
    durationMinutes: 90,
    attempts: 245,
    avgScore: "74%",
    passingScore: "50%",
  },
  {
    id: "t2",
    title: "IELTS Academic Reading Practice 04",
    subject: "Language Prep",
    questionsCount: 40,
    durationMinutes: 60,
    attempts: 388,
    avgScore: "6.8 / 9.0",
    passingScore: "6.0",
  },
  {
    id: "t3",
    title: "Python Data Structures Checkpoint",
    subject: "Programming",
    questionsCount: 25,
    durationMinutes: 45,
    attempts: 310,
    avgScore: "81%",
    passingScore: "65%",
  },
  {
    id: "t4",
    title: "GST Invoicing & Input Credit Assessment",
    subject: "Accounting",
    questionsCount: 30,
    durationMinutes: 40,
    attempts: 126,
    avgScore: "68%",
    passingScore: "60%",
  },
  {
    id: "t5",
    title: "Spoken English Grammar & Vocabulary Test",
    subject: "Language & Communication",
    questionsCount: 35,
    durationMinutes: 30,
    attempts: 260,
    avgScore: "85%",
    passingScore: "70%",
  },
];

export const MOCKUP_PAYMENTS: PaymentTransaction[] = [
  {
    id: "p1",
    txnRef: "TXN-98421",
    studentName: "Aditya Verma",
    courseTitle: "NEET Biology Live Batch",
    amount: "₹14,999",
    gstAmount: "₹2,288",
    gateway: "Razorpay",
    status: "Success",
    timestamp: "Today, 09:42 AM",
  },
  {
    id: "p2",
    txnRef: "TXN-98420",
    studentName: "Sanya Pillai",
    courseTitle: "IELTS Academic Masterclass",
    amount: "₹7,999",
    gstAmount: "₹1,220",
    gateway: "Razorpay",
    status: "Success",
    timestamp: "Today, 08:15 AM",
  },
  {
    id: "p3",
    txnRef: "TXN-98419",
    studentName: "Karthik Menon",
    courseTitle: "Digital Marketing Bootcamp",
    amount: "₹12,500",
    gstAmount: "₹1,907",
    gateway: "Direct Bank",
    status: "Pending Approval",
    timestamp: "Yesterday, 11:30 PM",
  },
  {
    id: "p4",
    txnRef: "TXN-98418",
    studentName: "Ritu Sengupta",
    courseTitle: "Python for Beginners",
    amount: "₹3,499",
    gstAmount: "₹534",
    gateway: "Stripe",
    status: "Success",
    timestamp: "Yesterday, 07:18 PM",
  },
  {
    id: "p5",
    txnRef: "TXN-98417",
    studentName: "Harish Patel",
    courseTitle: "GST and Tally Practical",
    amount: "₹3,999",
    gstAmount: "₹610",
    gateway: "Paytm",
    status: "Success",
    timestamp: "Yesterday, 04:02 PM",
  },
  {
    id: "p6",
    txnRef: "TXN-98416",
    studentName: "Tanvi Deshmukh",
    courseTitle: "Spoken English Foundation",
    amount: "₹4,499",
    gstAmount: "₹686",
    gateway: "Direct Bank",
    status: "Pending Approval",
    timestamp: "Yesterday, 02:20 PM",
  },
];

export const MOCKUP_SCHEDULE_EVENTS: BatchScheduleEvent[] = [
  {
    id: "e1",
    date: "10 Nov",
    day: "Mon",
    time: "10:00 - 11:30 AM",
    course: "NEET Biology 2025",
    batch: "Morning Batch B",
    mode: "Zoom Live",
    instructor: "Dr. K. Sharma",
  },
  {
    id: "e2",
    date: "10 Nov",
    day: "Mon",
    time: "12:30 - 01:15 PM",
    course: "IELTS Speaking Mastery",
    batch: "1:1 Consultation",
    mode: "1:1 Tutor",
    instructor: "Prof. Ananya R.",
  },
  {
    id: "e3",
    date: "10 Nov",
    day: "Mon",
    time: "04:00 - 05:30 PM",
    course: "Python for Beginners",
    batch: "Weekend & Doubts",
    mode: "Revision",
    instructor: "Vikram Sen",
  },
  {
    id: "e4",
    date: "10 Nov",
    day: "Mon",
    time: "07:00 - 08:30 PM",
    course: "Spoken English Fluency",
    batch: "Evening Batch A",
    mode: "Zoom Live",
    instructor: "Meera Nair",
  },
  {
    id: "e5",
    date: "11 Nov",
    day: "Tue",
    time: "10:00 - 11:30 AM",
    course: "Digital Marketing Bootcamp",
    batch: "Cohort 06",
    mode: "Zoom Live",
    instructor: "Rahul Roy",
  },
];

