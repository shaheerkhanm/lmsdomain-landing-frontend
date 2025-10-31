'use client'

import React from 'react'
import { Icons } from './common/Icons'
import Link from 'next/link'
import { motion } from 'framer-motion'

function CopyrightSection() {
    const currentYear = new Date().getFullYear();

    const links = [
        {
            href: 'mailto:info@lmsdomain.com',
            icon: <Icons.email_Icon className="md:size-[15px] size-[13px] fill-ScndColor group-hover:fill-MainColor duration-200 transition-all" />,
            text: 'info@lmsdomain.com',
        },
        {
            href: 'tel:+1234567890',
            icon: <Icons.phone_Icon className="md:size-[15px] size-[13px] fill-ScndColor group-hover:fill-MainColor duration-200 transition-all" />,
            text: '+1 234 567 890',
        }
    ];

    return (
        <div className="copyright-section flex md:flex-row flex-col items-center justify-between">
            <p>{currentYear} LMS. All rights reserved.</p>
            <div className="flex md:gap-6 gap-3">
                {links?.map((item, index) => (
                    <motion.div
                        initial={{ x: -80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: index * -0.1,
                            duration: 0.5, type: "tween", stiffness: 100, damping: 20
                        }}
                        viewport={{ once: false, amount: 0 }}
                        key={index}
                    >
                        <Link href={item.href} className="flex items-center group gap-2">
                            {item.icon}
                            <span className="text-ScndColor group-hover:text-MainColor md:text-[16px] text-[15px] duration-200 transition-all">
                                {item.text}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default CopyrightSection
