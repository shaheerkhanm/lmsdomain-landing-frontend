import type { AuthCopy } from "@/types/content";

export const DEFAULT_AUTH_COPY: AuthCopy = {
  login: {
    title: "Log in to your academy",
    subtitle: "Access your courses, student analytics, and instructor portal.",
    submitLabel: "Continue to LMS App",
    signupPrompt: "Don't have an academy account?",
    signupLinkLabel: "Sign up",
    forgotLabel: "Forgot password?",
    adminNote: "Not an admin? Log in on your academy's site.",
    centralSubmitLabel: "Sign in",
  },
  signup: {
    title: "Start your academy",
    subtitle: "Build, host, and scale your learning courses with LMS Domain.",
    submitLabel: "Create academy account",
    loginPrompt: "Already have an account?",
    loginLinkLabel: "Log in",
    termsNote: "By continuing, you agree to our Terms of Service and Privacy Policy.",
  },
  forgot: {
    title: "Reset your password",
    subtitle:
      "Each academy has its own password. If your email is an admin, we'll email a reset link for each of your academies.",
    submitLabel: "Send reset link",
    backLabel: "Back to log in",
  },
  sidePanel: {
    title: "Your complete academy platform",
    subtitle:
      "One unified system for live cohort courses, video hosting, interactive assessments, and AI-powered learning.",
    bullets: [
      "Custom branded domain with complete white-label styling",
      "Course builder with lesson sequences and DRM video hosting",
      "Automated grading and verifiable digital certificates",
    ],
  },
};

