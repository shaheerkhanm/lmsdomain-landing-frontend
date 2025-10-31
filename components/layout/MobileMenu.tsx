import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';


function MobileMenu({ navLinks, buttons }: any) {
  return (
    <div className='p-10 flex flex-col gap-5'>
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
        className=""
      >
        <img
          src="/assets/img/logo/logo.svg"
          className="lg:h-[40px] h-[30px] "
          alt="Bookarlo Logo"
        />
      </motion.a>
      <ul>
        {navLinks?.map((link: any, index: any) => (
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
              className="block py-2 px-0 text-[20px] hover:text-MainColor transition"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>
      <div className="flex flex-col gap-4">
        {buttons?.map((btn: any, index: any) => (
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


  )
}

export default MobileMenu