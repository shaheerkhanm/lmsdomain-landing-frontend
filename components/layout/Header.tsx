"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import MobileMenu from "./MobileMenu";
import { motion } from "framer-motion";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✅ Nav links with href
    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: "#about" },
    ];

    // ✅ Buttons
    const buttons = [
        {
            text: "Login",
            href: "/login",
            className:
                "px-6 py-2 2xl:text-[18px] text-[16px] font-medium rounded-lg bg-white border border-ScndColor text-ScndColor hover:bg-MainColor hover:border-transparent hover:text-white common-transition",
        },
        {
            text: "Start A Free Trial",
            href: "/signup",
            className:
                "px-6 py-2 2xl:text-[18px] text-[16px] font-medium rounded-lg bg-ScndColor text-white hover:bg-MainColor common-transition",
        },
    ];

    return (
        <div
            className={`fixed w-full top-[25px] flex justify-center z-99 main-padding transition-all duration-500 ease-in-out ${isScrolled ? "!-top-[110px]" : "top-[25px]"
                }`}
        >
            <nav className="bg-white w-full md:rounded-[15px] rounded-[10px] border-gray-200 shadow-xl">
                <div className="flex flex-wrap items-center justify-between mx-4 md:py-4 py-3">
                    {/* Menu Button & Logo */}
                    <div className="flex md:justify-start justify-between gap-3 md:w-fit w-full">
                        <button
                            onClick={() => setShowMenu(true)}
                            type="button"
                            className="inline-flex items-center md:p-2 md:size-10 size-7 justify-center text-sm text-gray-500 rounded-lg lg:hidden"
                        >
                            <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                        <motion.a
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.3,
                                type: "tween",
                            }}
                            viewport={{ once: true }}
                            href="#"
                            className="flex items-center space-x-3 rtl:space-x-reverse origin-left"
                        >
                            <img
                                src="/assets/img/logo/logo.svg"
                                className="lg:h-[40px] h-[30px] py-[3px] ps-3"
                                alt="Bookarlo Logo"
                            />
                        </motion.a>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden w-full lg:block md:w-auto ps-20">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white font-manrope">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.3 + index * 0.15,
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <a
                                        href={link.href}
                                        className="block py-2 px-0 2xl:text-[18px] text-[16px] hover:text-MainColor transition"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="button-section md:flex hidden gap-[10px] font-manrope">
                        {buttons.map((btn, index) => (
                            <motion.div
                                key={btn.text}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.4 + index * -0.2,
                                    duration: 0.3,
                                    ease: "easeOut",
                                }}
                                viewport={{ once: true }}
                            >
                                <Link href={btn.href} className={btn.className}>
                                    {btn.text}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={showMenu} onOpenChange={() => setShowMenu(false)}>
                <SheetContent className="w-[85%]">
                    <MobileMenu navLinks={navLinks} />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Header;
