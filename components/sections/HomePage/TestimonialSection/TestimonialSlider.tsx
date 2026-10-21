"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Icons } from "@/components/layout/common/Icons";

export function TestimonialSlider({ initialData = [] }: { initialData?: any[] }) {
  const [data] = useState<any[]>(initialData);
  const swiperRef = useRef<any | null>(null);

  const goToNext = () => swiperRef.current?.slideNext();
  const goToPrev = () => swiperRef.current?.slidePrev();

  if (data.length === 0) return null;

  return (
    <div className="relative font-inter">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 1.5, spaceBetween: 24 },
          1024: { slidesPerView: 2.5, spaceBetween: 32 },
        }}
        className="w-full pb-12"
      >
        {data.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="h-full p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{item?.content || item?.description}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={item?.image || "/assets/img/default-avatar.png"}
                  alt={item?.name || "Client"}
                  className="size-11 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{item?.name}</h4>
                  <p className="text-xs text-slate-500">{item?.designation || item?.profession}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-end gap-2.5 mt-2">
        <button
          onClick={goToPrev}
          type="button"
          aria-label="Previous Testimonial"
          className="size-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:border-black transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          type="button"
          aria-label="Next Testimonial"
          className="size-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-black hover:border-black transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TestimonialSlider;
