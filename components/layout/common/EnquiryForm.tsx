"use client";

import React from "react";
import { DemoForm } from "@/components/marketing/DemoForm";

export function EnquiryForm({
  onClose,
  initialSubject,
}: {
  onClose?: () => void;
  initialSubject?: string;
}) {
  return (
    <div className="font-urbanist">
      <div className="pb-4 mb-4 border-b border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Request an Academy Demo
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about your organization and our specialists will schedule a personalized walkthrough.
        </p>
      </div>

      <DemoForm
        onClose={onClose}
        initialSubject={initialSubject}
        variant="modal"
        submitLabel="Schedule My Demo"
      />
    </div>
  );
}

export default EnquiryForm;
