import { PlatformPageData } from "./types";

export const assessPlatformData: PlatformPageData = {
  slug: "assess",
  eyebrow: "Assess",
  heroAccent: "certify",
  aiNote: "With Domie AI (Pro), learners get instant answers from your own lessons while they revise, even when teachers are offline.",
  title: "Test learners and certify the ones who finish",
  subtitle: "LMS Domain lets you run timed tests from your own question banks, review written assignments, add quiz checkpoints inside videos and send certificates automatically when a learner completes a course.",
  metaTitle: "Online Tests, Question Banks & Certificates | LMS Domain",
  metaDescription: "Create timed tests and mock exams from question banks, review assignments, add in-video quizzes and issue branded certificates automatically with LMS Domain.",
  sectionHeading: "Everything you need to test and certify",
  frameTitle: "Gradebook & Assessment Center",
  frameAlt: "Test learners and certify the ones who finish",
  features: [
    {
      title: "Graded quizzes",
      description:
        "Evaluate comprehension with multiple-choice questions, timed testing windows, and automated scoring.",
      icon: "CheckSquare",
    },
    {
      title: "Assignments with review",
      description:
        "Learners upload written answers or files; tutors grade them and give feedback.",
      icon: "FileCheck",
      plan: "Growth",
    },
    {
      title: "In-video checkpoints",
      description:
        "Embed question prompts inside recorded lectures to verify attention and test key concepts during playback.",
      icon: "PlayCircle",
    },
    {
      title: "Course completion certificates",
      description:
        "Branded certificates for learners who finish.",
      icon: "Award",
    },
  ],
  usedFor: [
    {
      title: "Language & test-prep academies",
      href: "/solutions/language-test-prep-academies",
      description:
        "Run timed mock tests, evaluate writing assignments, and issue formal achievement certificates.",
    },
    {
      title: "Training companies",
      href: "/solutions/training-companies",
      description:
        "Assess cohorts with practical project submissions and branded completion certificates.",
    },
    {
      title: "Coaching institutes",
      href: "/solutions/coaching-institutes",
      description:
        "Administer chapter-wise mock tests and generate instant student rank reports.",
    },
  ],
  faqs: [
    {
      question: "What types of tests can I create in LMS Domain?",
      answer:
        "You can create timed multiple-choice mock exams, topic quizzes, and written assignment submissions. Questions can be pulled from custom question banks with randomized order and automated scoring.",
    },
    {
      question: "Does LMS Domain issue completion certificates?",
      answer:
        "Yes, LMS Domain generates branded PDF completion certificates when students finish your course requirements. Certificates carry your academy logo, student name, course details, and issue date.",
    },
    {
      question: "What are in-video checkpoints?",
      answer:
        "In-video checkpoints are interactive question prompts placed at specific timestamps in recorded lectures. Playback pauses until the learner responds, helping verify comprehension during playback.",
    },
    {
      question: "How do instructors review written assignments?",
      answer:
        "Instructors can review student file submissions in the dedicated evaluation portal. Staff can leave private feedback, award scores, and request revisions directly from the student's submission view.",
    },
    {
      question: "Can I set passing percentages and time limits on quizzes?",
      answer:
        "Yes, you can set custom passing marks, maximum attempt counts, and countdown timers for every test. Retakes can be allowed or restricted according to your course policy.",
    },
    {
      question: "Is there a mobile app for taking practice tests?",
      answer:
        "Yes. Learners take quizzes and tests in the Android and iOS app, or in any phone browser. On Pro and Enterprise, you get your own branded app in Google Play and the App Store.",
    },
  ],
};

