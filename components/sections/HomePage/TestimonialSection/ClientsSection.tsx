"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "motion/react"
import { fetchData } from "@/utils/api";
import { apiRoutes } from "@/utils/api/apiRoutes";



function ClientsSection() {

    const [data, setData] = useState<any[]>([]);
    // ✅ Fetch data client-side after mount
    useEffect(() => {
        const getData = async () => {
            try {
                const location =
                    process.env.NEXT_PUBLIC_BACKEND_URL + apiRoutes?.getClients;
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

    const settings = {
        modules: [Autoplay],
        autoplay: { delay: 2000, disableOnInteraction: false },
        speed: 500,
        spaceBetween: 100,
        loop: true,
        breakpoints: {
            1440: { slidesPerView: 5 },
            1024: { slidesPerView: 4, },
            768: { slidesPerView: 3, },
            0: { slidesPerView: 3, spaceBetween: 30, },
        },
        className: "w-full testimonial-slider",
    };

    

    // const data: LogoData[] = [
    //     { img: "/assets/img/clients/Logo.svg" },
    //     { img: "/assets/img/clients/Logo-1.svg" },
    //     { img: "/assets/img/clients/Logo-2.svg" },
    //     { img: "/assets/img/clients/Logo-3.svg" },
    //     { img: "/assets/img/clients/Logo-4.svg" },
    //     { img: "/assets/img/clients/Logo-4.svg" },
    //     { img: "/assets/img/clients/Logo-4.svg" },
    // ];

    return (
        <div className="relative">
            <Swiper {...settings}>
                {data?.map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: index < 5 ? index * 0.1 : 0,
                                duration: 0.3, type: "spring", stiffness: 300, damping: 20
                            }}
                            viewport={{ once: true, amount: 0.7 }} className="img-div">
                            <img
                                src={item?.logo}
                                alt={item?.altImage}
                                title={item?.title}
                                className="h-[48px] object-contain"
                            />
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ClientsSection;
