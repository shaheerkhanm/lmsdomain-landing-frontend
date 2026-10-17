"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiRoutes } from "@/utils/api/apiRoutes";
import { BACKEND_URL } from "@/utils/constants/constant";
import { fetchData } from "@/utils/api";
import { toast } from "sonner";

type EmailInputs = {
  email: string;
};

export function EmailSection({
  inputClass = "",
  btnClass = "",
  data,
}: {
  inputClass?: string;
  btnClass?: string;
  data?: any;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailInputs>();

  const onSubmit: SubmitHandler<EmailInputs> = async (formData) => {
    try {
      setIsSubmitting(true);
      const url = BACKEND_URL + apiRoutes.getEnquiry;
      const body = {
        ...formData,
        type: 2,
      };

      const response = await fetchData({ url, body });

      if (response) {
        toast.success("Thank you! We've received your email and will reach out shortly.", {
          richColors: true,
          duration: 4000,
        });
        reset();
      } else {
        toast.error("Unable to submit. Please try again.", { richColors: true });
      }
    } catch (error) {
      toast.error("Something went wrong while sending enquiry.", { richColors: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto font-inter">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex flex-col sm:flex-row gap-2 sm:gap-0 items-center bg-white p-1.5 rounded-2xl border border-slate-300 shadow-sm focus-within:border-MainColor focus-within:ring-3 focus-within:ring-MainColor/10 transition-all">
        <input
          type="email"
          placeholder="Enter your institutional email..."
          className={`w-full px-4 py-2.5 text-sm bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl ${inputClass}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
          })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-5 py-2.5 text-sm font-semibold text-white bg-MainColor hover:bg-[#5A3DE6] rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 shrink-0 cursor-pointer ${btnClass}`}
        >
          {isSubmitting ? "Submitting..." : "Get Started"}
        </button>
      </form>

      {errors.email?.message && (
        <span className="text-xs text-red-600 block mt-1.5 text-center sm:text-left pl-2">
          {errors.email.message}
        </span>
      )}
    </div>
  );
}

export default EmailSection;
