import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | LMS Domain",
};

export default function SignupPage() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-[#161616]">Sign Up</h1>
      <p className="text-sm text-[#6B6F76]">
        Create your account to start building your branded academy.
      </p>
      <div className="pt-4">
        <Link
          href="https://app.lmsdomain.com/signup"
          className="inline-flex w-full items-center justify-center py-3.5 px-4 rounded-xl bg-[#161616] text-white font-medium text-sm hover:bg-black transition-colors"
        >
          Create Free Account
        </Link>
      </div>
      <div className="pt-2 text-xs text-[#6B6F76]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#7B5CF5] font-semibold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
