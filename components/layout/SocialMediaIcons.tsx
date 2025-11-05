'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "./common/Icons";



export default function SocialMediaIcons({ data }: any) {

     if (!data) return null;

    const socialLinks = [
        { href: data?.twitter, icon: Icons.x_Icon },
        { href: data?.instagram, icon: Icons.insta_Icon },
        { href: data?.fb, icon: Icons.fb_Icon },
        { href: data?.youtubelink, icon: Icons.youtube_Icon },
        { href: data?.linkedin, icon: Icons.linkedin_Icon },
    ];


    return (
        <div className="flex gap-[20px]">
            {socialLinks?.map((item: any, index: any) => {
                if (!item.href) {
                    return null;
                }
                const Icon = item.icon;


                return (
                    <motion.div
                        key={index}
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: index * 0.1, // 0.1s stagger delay
                            duration: 0.3,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <Link href={item?.href} target="_blank">
                            <Icon className="md:size-[25px] size-[20px] fill-ScndColor hover:fill-MainColor duration-200 transition-all" />
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
