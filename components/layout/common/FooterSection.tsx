'use client'

import React, { useEffect, useState } from "react";
import { motion } from "motion/react"
import Link from "next/link";
import SocialMediaIcons from "../SocialMediaIcons";
import CopyrightSection from "../CopyrightSection";


const navData = [
    {
        title: "Company",
        links: [
            { title: "Home", href: "/" },
            { title: "About Us", href: "/about" },
            { title: "Features", href: "/features" },
            { title: "Pricing", href: "/pricing" },
        ],
    },
    {
        title: "Product",
        links: [
            { title: "Pricing", href: "#" },
            { title: "Solutions", href: "#" },
            { title: "FAQs", href: "/pricing/#faqSection" },
            { title: "Demo", href: "#" },
        ],
    },
    {
        title: "Connect",
        links: [
            { title: "Login", href: "#" },
            { title: "Contact us", href: "#" },
            { title: "Privacy Policy", href: "/privacy-policy" },
            { title: "Terms & Service", href: "/terms" },
            { title: "⁠Refund & Cancellation Policy", href: "/refund-policy" },
            { title: "Data Processing Agreement (DPA)", href: "/dpa" },
        ],
    },
];

function FooterSection({ addressData, contentData }: any) {


    return (
        <div className="main-padding lg:pb-[3%] lg:pt-[3%] md:pt-[6%] md:pb-[2%] pt-[12%] pb-[10%] font-manrope bg-[#F3F2FA] flex flex-col md:gap-[50px] gap-[30px]">
            <div className="grid grid-cols-12 lg:gap-4">
                {/* Logo & Description */}
                <div className="lg:col-span-4 md:col-span-8 col-span-12">
                    <div className="flex flex-col gap-6">
                        <Link href={'/'} className="logo-div w-fit">
                            <motion.img
                                initial={{ x: 80, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                                viewport={{ once: false, amount: 0.7 }}
                                src="/assets/img/logo/logo.svg"
                                alt="Logo"
                                className="md:h-[60px] h-[40px] object-contain"
                            />
                        </Link>
                        <motion.div
                            initial={{ x: 80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="leading-normal 2xl:text-[18px] text-[16px]"
                            dangerouslySetInnerHTML={{ __html: contentData?.content || "" }}
                        />
                        <SocialMediaIcons data={addressData} />
                    </div>
                </div>

                {/* Empty space */}
                <div className="lg:col-span-1 md:col-span-1 md:block hidden"></div>

                {/* Navigation Links */}
                <div className="lg:col-span-7 md:col-span-12 col-span-12 grid grid-cols-12 lg:gap-4 gap-2 lg:mt-0 md:mt-10 mt-5">
                    {navData?.map((section, idx) => (
                        <motion.div
                            initial={{ x: -80, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{
                                delay: idx * -0.2,
                                duration: 0.5, type: "tween", stiffness: 100, damping: 20
                            }}
                            viewport={{ once: false, amount: 0.3 }}
                            key={idx} className={`
                            ${idx === 0 ? 'md:col-span-3 col-span-6' : ''}
                            ${idx === 1 ? 'md:col-span-3 col-span-6' : ''} 
                            ${idx === 2 ? 'md:col-span-5 col-span-12 md:mt-0 mt-5' : ''}
                            `}>
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold lg:text-[20px] md:text-[18px] text-[16px]">{section.title}</h4>
                                <ul className="flex flex-col lg:gap-3 md:gap-2 gap-1">
                                    {section?.links?.map((link, i) => (
                                        <li key={i}>
                                            <Link
                                                href={link.href}
                                                className="hover:underline hover:text-MainColor transition-all duration-200 cursor-pointer lg:text-[18px] text-[16px] leading-[14px]"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <CopyrightSection data={addressData} />
        </div>
    );
}

export default FooterSection;
