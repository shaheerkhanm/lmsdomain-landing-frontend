"use client";

import React from "react";
import Image from "next/image";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Check, Clock } from "lucide-react";
import { DemoForm } from "@/components/marketing/DemoForm";

/** Shared size and look for every "Book a demo" dialog on the site. */
export const DEMO_DIALOG_CLASS =
  "w-[calc(100%-24px)] max-w-[960px] sm:max-w-[960px] max-h-[94vh] overflow-y-auto gap-0 rounded-[28px] border-0 bg-white p-0 shadow-[0_40px_120px_-30px_rgba(10,10,11,0.55)] [&>[data-slot=dialog-close]]:z-10 [&>[data-slot=dialog-close]]:grid [&>[data-slot=dialog-close]]:h-9 [&>[data-slot=dialog-close]]:w-9 [&>[data-slot=dialog-close]]:place-items-center [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-white/90 [&>[data-slot=dialog-close]]:text-[#0A0A0B] [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:shadow-sm";

const POINTS = ["A live walkthrough with your own courses", "The right plan for how you teach", "Answers to every question you have"];
const FACES = ["/assets/img/home/participant_mia.jpg", "/assets/img/home/participant_alex.jpg", "/assets/img/home/testimonials/author-1.jpg"];

export function EnquiryForm({
  onClose,
  initialSubject,
  initialTopic,
  initialPlan,
  initialBilling,
  initialCurrency,
}: {
  onClose?: () => void;
  initialSubject?: string;
  initialTopic?: string;
  initialPlan?: string;
  initialBilling?: string;
  initialCurrency?: string;
}) {
  return (
    <div className="grid font-sans md:grid-cols-[0.85fr_1.15fr]">
      {/* Left: what you get (dark) */}
      <div className="relative isolate overflow-hidden bg-[#0B0A12] p-7 text-white sm:p-9 md:rounded-l-[28px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full bg-[#6C4BFF] opacity-35 blur-3xl" />
          <div className="absolute -bottom-28 -right-16 h-[280px] w-[320px] rounded-full bg-[#3B5BFF] opacity-20 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_30%_20%,#000,transparent_85%)]" />
        </div>

        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12px] font-medium text-white/80">
          <Clock className="h-3.5 w-3.5" /> Free · 20 minutes
        </p>
        <DialogTitle className="mt-5 font-urbanist text-[clamp(26px,3vw,34px)] font-semibold leading-[1.08] tracking-[-0.03em]">
          See your academy on LMS Domain
        </DialogTitle>
        <DialogDescription className="mt-3 text-[14.5px] leading-[1.6] text-white/65">
          Tell us a little about your academy. Our team will get in touch to book a time that suits you.
        </DialogDescription>

        <ul className="mt-7 hidden space-y-3 md:block">
          {POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-[14.5px] text-white/85">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#6C4BFF]">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-8 hidden items-center gap-3 border-t border-white/10 pt-6 md:flex">
          <div className="flex">
            {FACES.map((f, i) => (
              <Image key={f} src={f} alt="" width={72} height={72} className={`h-9 w-9 rounded-full object-cover object-top ring-2 ring-[#0B0A12] ${i ? "-ml-2.5" : ""}`} />
            ))}
          </div>
          <p className="text-[13px] leading-[1.45] text-white/65">
            Real people from our team
            <br />
            read every request
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="p-6 sm:p-9">
        <DemoForm
          onClose={onClose}
          initialSubject={initialSubject}
          initialTopic={initialTopic}
          initialPlan={initialPlan}
          initialBilling={initialBilling}
          initialCurrency={initialCurrency}
          variant="modal"
          submitLabel="Book my free demo"
        />
      </div>
    </div>
  );
}

export default EnquiryForm;
