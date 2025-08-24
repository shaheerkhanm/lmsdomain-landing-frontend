'use client'

import React from "react";
import SocialMediaIcons from "./SocialMediaIcons";
import { motion } from "motion/react"
import CopyrightSection from "./CopyrightSection";


const navData = [
  {
    title: "Company",
    links: ["Home", "About Us"],
  },
  {
    title: "Product",
    links: ["Pricing", "Solutions", "FAQs", "Demo"],
  },
  {
    title: "Connect",
    links: ["Login", "Contact us"],
  },
];

function Footer() {
  return (
    <div className="main-padding py-[3%] font-manrope bg-[#F3F2FA] flex flex-col gap-[50px]">
      <div className="grid grid-cols-12 gap-4">
        {/* Logo & Description */}
        <div className="col-span-4">
          <div className="flex flex-col gap-6">
            <div className="logo-div">
              <motion.img
                initial={{ x: 80, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                viewport={{ once: false, amount: 0.7 }}
                src="/assets/img/logo/logo.svg"
                alt="Logo"
                className="h-[60px] object-contain"
              />
            </div>
            <motion.p
              initial={{ x: 80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              className="leading-normal 2xl:text-[18px] text-[16px]">
              Lorem ipsum dolor sit amet consectetur. Pulvinar semper
              pellentesque purus dignissim. Turpis commodo diam faucibus
              posuere laoreet nunc.
            </motion.p>
            <SocialMediaIcons />
          </div>
        </div>

        {/* Empty space */}
        <div className="col-span-3"></div>

        {/* Navigation Links */}
        <div className="col-span-5 grid grid-cols-12 gap-4 ">
          {navData.map((section, idx) => (
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: idx * -0.2,
                duration: 0.5, type: "tween", stiffness: 100, damping: 20
              }}
              viewport={{ once: false, amount: 0.3 }}
              key={idx} className="col-span-4">
              <div className="flex flex-col gap-3">
                <h4 className="font-bold 2xl:text-[18px] text-[16px]">{section.title}</h4>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link, i) => (
                    <li key={i} className="hover:underline hover:text-MainColor transition-all duration-200 cursor-pointer 2xl:text-[18px] text-[16px]">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <CopyrightSection />
    </div>
  );
}

export default Footer;
