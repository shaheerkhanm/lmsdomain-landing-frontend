import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in | LMS Domain",
};

export default function LoginPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-[#161616]">Log In</h1>
      <p className="text-sm text-[#6B6F76]">
        Access your courses, cohorts and instructor dashboard.
      </p>
      <div className="pt-4">
        <Link
          href="https://app.lmsdomain.com/login"
          className="inline-flex w-full items-center justify-center py-3.5 px-4 rounded-xl bg-[#161616] text-white font-medium text-sm hover:bg-black transition-colors"
        >
          Continue to LMS App
        </Link>
      </div>
      <div className="pt-2 text-xs text-[#6B6F76]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#7B5CF5] font-semibold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
