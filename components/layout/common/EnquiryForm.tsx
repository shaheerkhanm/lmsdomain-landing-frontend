"use client";

import React, { useState } from "react";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";
import { BACKEND_URL } from "@/utils/constants/constant";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";

type EnquiryInputs = {
  name: string;
  email: string;
  phoneNumber: string;
  organizationName: string;
  subject: string;
};

export function EnquiryForm({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInputs>();

  const onSubmit: SubmitHandler<EnquiryInputs> = async (formData) => {
    try {
      setIsSubmitting(true);
      const url = (process.env.NEXT_PUBLIC_BACKEND_URL || BACKEND_URL) + apiRoutes.getEnquiry;
      const cleanedPhone = formData.phoneNumber.replace(/\D/g, "");

      const body = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: cleanedPhone,
        organizationName: formData.organizationName.trim(),
        subject: formData.subject.trim(),
        type: 1,
      };

      const response = await fetchData({ url, body });

      if (response && response.success !== false) {
        toast.success("Enquiry submitted successfully! Our specialists will contact you shortly.", {
          richColors: true,
          duration: 5000,
        });
        reset();
        onClose();
      } else {
        toast.error(response?.message || "Unable to submit enquiry. Please try again.", {
          richColors: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong while sending enquiry. Please try again.", {
        richColors: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-inter">
      <div className="pb-4 border-b border-slate-100">
        <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Request an Academy Demo
        </DialogTitle>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about your organization and our specialists will schedule a personalized walkthrough.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Full Name *
            </label>
            <input
              type="text"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-MainColor focus:ring-2 focus:ring-MainColor/10"
              }`}
              placeholder="e.g. Sarah Jenkins"
              {...register("name", { required: "Full name is required" })}
            />
            {errors.name?.message && (
              <span className="text-xs text-red-600 block">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Work Email *
            </label>
            <input
              type="email"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-MainColor focus:ring-2 focus:ring-MainColor/10"
              }`}
              placeholder="sarah@institution.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email?.message && (
              <span className="text-xs text-red-600 block">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Phone Number *
            </label>
            <input
              type="tel"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                errors.phoneNumber
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-MainColor focus:ring-2 focus:ring-MainColor/10"
              }`}
              placeholder="e.g. 14155552671"
              {...register("phoneNumber", {
                required: "Phone number is required",
                validate: (val) => {
                  const digits = val.replace(/\D/g, "");
                  return (digits.length >= 7 && digits.length <= 15) || "Enter 7-15 digits";
                },
              })}
            />
            {errors.phoneNumber?.message && (
              <span className="text-xs text-red-600 block">{errors.phoneNumber.message}</span>
            )}
          </div>

          {/* Organization Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Organization / Institute *
            </label>
            <input
              type="text"
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                errors.organizationName
                  ? "border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-MainColor focus:ring-2 focus:ring-MainColor/10"
              }`}
              placeholder="e.g. Apex Coding Academy"
              {...register("organizationName", { required: "Organization name is required" })}
            />
            {errors.organizationName?.message && (
              <span className="text-xs text-red-600 block">
                {errors.organizationName.message}
              </span>
            )}
          </div>
        </div>

        {/* Subject / Requirements */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Project Scope or Questions *
          </label>
          <textarea
            rows={3}
            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition resize-none ${
              errors.subject
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-MainColor focus:ring-2 focus:ring-MainColor/10"
            }`}
            placeholder="Tell us about your student volume, timeline, or DRM requirements..."
            {...register("subject", { required: "Project scope or message is required" })}
          />
          {errors.subject?.message && (
            <span className="text-xs text-red-600 block">{errors.subject.message}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-MainColor hover:bg-[#5A3DE6] rounded-lg shadow-sm hover:shadow-[0_0_20px_-3px_rgba(108,75,255,0.35)] transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Schedule My Demo"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnquiryForm;