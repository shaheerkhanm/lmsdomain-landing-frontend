"use client";

import React from "react";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { DemoForm } from "@/components/marketing/DemoForm";

export function EnquiryForm({
  onClose,
  initialSubject,
}: {
  onClose?: () => void;
  initialSubject?: string;
}) {
  return (
    <div className="font-inter">
      <div className="pb-4 border-b border-slate-100">
        <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Request an Academy Demo
        </DialogTitle>
        <DialogDescription className="text-sm text-slate-500 mt-1">
          Tell us about your organization and our specialists will schedule a personalized walkthrough.
        </DialogDescription>
      </div>

      <div className="mt-6">
        <DemoForm
          onClose={onClose}
          initialSubject={initialSubject}
          variant="modal"
          submitLabel="Schedule My Demo"
        />
      </div>
    </div>
  );
}

export default EnquiryForm;
