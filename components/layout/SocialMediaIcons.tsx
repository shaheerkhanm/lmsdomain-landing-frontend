import { motion } from "framer-motion";
import Link from "next/link";
import { Icons } from "./common/Icons";

const socialLinks = [
    { href: "https://twitter.com", icon: Icons.x_Icon },
    { href: "https://instagram.com", icon: Icons.insta_Icon },
    { href: "https://facebook.com", icon: Icons.fb_Icon },
    { href: "https://youtube.com", icon: Icons.youtube_Icon },
    { href: "https://linkedin.com", icon: Icons.linkedin_Icon },
];

export default function SocialMediaIcons() {
    return (
        <div className="flex gap-[20px]">
            {socialLinks.map((item, index) => {
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
                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                            <Icon className="size-[25px] fill-ScndColor hover:fill-MainColor duration-200 transition-all" />
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
