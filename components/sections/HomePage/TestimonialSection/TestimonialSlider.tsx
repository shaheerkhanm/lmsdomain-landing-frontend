"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Icons } from "@/components/layout/common/Icons";
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";

function TestimonialSlider() {
    const [data, setData] = useState<any[]>([]);
    const swiperRef = useRef<any | null>(null);
    const [slidesPerView, setSlidesPerView] = useState(2.5);

    // ✅ Fetch data client-side after mount
    useEffect(() => {
        const getData = async () => {
            try {
                const location =
                    process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getTestimonials;
                const response = await fetchData({
                    url: location,
                    body: { slug: "" },
                });
                setData(response || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setData([]);
            }
        };
        getData();
    }, []);

    // 🔹 Update slidesPerView dynamically based on screen width
    useEffect(() => {
        const updateSlidesPerView = () => {
            const width = window.innerWidth;
            if (width < 600) setSlidesPerView(1);
            else if (width < 1024) setSlidesPerView(2);
            else setSlidesPerView(2.5);
        };
        updateSlidesPerView();
        window.addEventListener("resize", updateSlidesPerView);
        return () => window.removeEventListener("resize", updateSlidesPerView);
    }, []);

    const showNav = data?.length > slidesPerView;

    const goToNext = () => swiperRef.current?.slideNext();
    const goToPrev = () => swiperRef.current?.slidePrev();

    // ✅ Centralized Swiper settings
    const settings = {
        modules: [Autoplay],
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 500,
        loop: data?.length > 3 ? true : false,
        slidesPerView: 1, // base for mobile
        spaceBetween: 20,
        breakpoints: {
            600: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
        },
        className: "w-full testimonial-slider",
        onSwiper: (swiper: any) => {
            swiperRef.current = swiper;
        },
    };

    const getPaddedData = (data: any[]) => {
        if (!data || data.length === 0) return [];
        const padded = [...data];
        let range = padded.length
        while (range < 4) {
            if (range == 3) {
                padded.push(...data.slice(0, 3));
                range++
            }
            if (range == 2) {
                padded.push(...data.slice(0, 2));
                range = range + 2
            }
            else {
                padded.push(...data.slice(0, 3 - range));
                range++
            }

        }
        return padded;
    };

    const paddedData = getPaddedData(data);

    return (
        <div className="relative">
            <Swiper {...settings}>
                {data?.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col gap-2 border border-black rounded-[20px] md:p-[30px] p-[20px]">
                            <Icons.quote_icon className="fill-ScndColor" />
                            <p className="2xl:text-[18px] text-[16px]">{item?.comment}</p>
                            <span className="font-semibold text-black text-[16px] line-clamp-1">
                                {item?.customerName}
                                {item?.customerProfession ? `, ${item?.customerProfession}` : ""}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {showNav && (
                <div className="flex justify-start md:mt-[20px] mt-[10px] rtl:flex-row-reverse gap-2 z-3 w-full">
                    <button
                        onClick={goToPrev}
                        className="custm-slider-prev bg-transparent hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all"
                    >
                        <img
                            src="/assets/img/svg/slider-prev.svg"
                            alt="Slider Prev Icon"
                            className="size-[40px]"
                        />
                    </button>
                    <button
                        onClick={goToNext}
                        className="custm-slider-next bg-transparent hover:bg-white rounded-[20px] size-[40px] flex items-center justify-center cursor-pointer border-none border-transparent hover:border-MainColor duration-200 transition-all"
                    >
                        <img
                            src="/assets/img/svg/slider-next.svg"
                            alt="Slider Next Icon"
                            className="size-[40px]"
                        />
                    </button>
                </div>
            )}
        </div>
    );
}

export default TestimonialSlider;
