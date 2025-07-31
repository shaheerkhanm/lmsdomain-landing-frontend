"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { Sheet, SheetContent } from '../ui/sheet';
import MobileMenu from './MobileMenu';
// import { Icons } from '../common/Icons'
// import { Sheet, SheetContent } from '../ui/sheet'
// import MobileMenu from './MobileMenu'

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    return (

        <div className="fixed w-full top-[20px] flex justify-center z-99 main-padding">
            <nav className="bg-white w-full rounded-[10px] border-gray-200 shadow-custom-shadow">
                <div className="2-full flex flex-wrap items-center justify-between mx-8 py-6">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowMenu(true)}
                            data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100" aria-controls="navbar-default" aria-expanded="false">
                            {/* <span className="sr-only">Open main menu</span> */}
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="/assets/img/logo/logo.svg" className="h-[40px]" alt="Bookarlo Logo" />
                        </a>
                    </div>
                    <div className="hidden w-full lg:block md:w-auto ps-20" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white font-manrope">
                            <li>
                                <a href="#" className="block py-2 px-0 text-[16px] hover:text-MainColor transition">Features</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-0 text-[16px] hover:text-MainColor transition">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-0 text-[16px] hover:text-MainColor transition">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="button-section flex gap-[10px] font-manrope">
                        <Link href={''} className='px-4 py-2 rounded-md bg-white border border-ScndColor text-ScndColor hover:bg-MainColor hover:border-transparent hover:text-white common-transition'>login</Link>
                        <Link href={''} className='px-4 py-2 rounded-md bg-ScndColor text-white hover:bg-MainColor common-transition'>Start A Free Trial</Link>
                    </div>
                </div>
            </nav>
            <Sheet open={showMenu} onOpenChange={() => setShowMenu(false)}>
                <SheetContent className='w-[85%]'>
                    <MobileMenu />
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default Header