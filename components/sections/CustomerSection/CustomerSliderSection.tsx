'use client'

import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomerCard from './CustomerCard';

interface CustomerData {
    title: string,
    content: string,
    img: string,
    bgColor: string,
}


function CustomerSliderSection() {

    const data: CustomerData[] = [
        {
            title: "Individual Coaches",
            content: "Sell courses and grow your personal brand",
            img: "/assets/img/customer/customer-1.png",
            bgColor: "bg-[#CBBFFF]",
        },
        {
            title: "Training Institutes",
            content: "Manage staff, batches, and student performance",
            img: "/assets/img/customer/customer-2.png",
            bgColor: "bg-[#FFD6A4]",
        },
        {
            title: "Corporate Teams",
            content: "Onboard, upskill, and train teams effectively",
            img: "/assets/img/customer/customer-3.png",
            bgColor: "bg-[#FFE39B]",
        },
    ]


    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
        ]
    };

    return (
        <div className='mt-[40px]'>
            <Slider {...settings} className='w-full'>
                {data?.map((item: any, index: any) => (
                    <div key={index} className='px-3'>
                        <CustomerCard item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default CustomerSliderSection