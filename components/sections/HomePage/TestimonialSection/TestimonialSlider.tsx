"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { Icons } from "@/components/layout/common/Icons";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";

export function TestimonialSlider() {
  const [data, setData] = useState<any[]>([]);
  const swiperRef = useRef<any | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const location =
          process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getTestimonials;
        const response = await fetchData({
          url: location,
          body: { slug: "" },
        });
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        setData([]);
      }
    };
    getData();
  }, []);

  const goToNext = () => swiperRef.current?.slideNext();
  const goToPrev = () => swiperRef.current?.slidePrev();

  if (data.length === 0) return null;

  return (
    <div className="relative font-inter">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={400}
        spaceBetween={20}
        loop={data.length > 2}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
        }}
        className="w-full"
      >
        {data.map((item: any, index: number) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <Icons.quote_icon className="size-5 fill-MainColor opacity-80" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item?.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <div className="size-9 rounded-full bg-purple-100 text-MainColor font-bold text-xs flex items-center justify-center shrink-0">
                  {item?.customerName ? item.customerName.charAt(0) : "C"}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item?.customerName}
                  </h4>
                  {item?.customerProfession && (
                    <span className="text-[11px] text-slate-500 block truncate">
                      {item.customerProfession}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={goToPrev}
          type="button"
          aria-label="Previous testimonial"
          className="size-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-xs"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          type="button"
          aria-label="Next testimonial"
          className="size-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition cursor-pointer shadow-xs"
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
