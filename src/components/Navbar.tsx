"use client"
import React, { useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image'
import Link from 'next/link'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import IconButton from './IconButton'
import { cn } from '@/lib/utils'
import { Cross, X } from 'lucide-react'


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [hambergerMenuClass, setHambergerMenuClass] = useState("hidden")

    const handleHamberger = () => {
        if (isMenuOpen) {
            setHambergerMenuClass("hidden");
            setIsMenuOpen(false);
            console.log(hambergerMenuClass);
            console.log(isMenuOpen);
        } else {
            setHambergerMenuClass("absolute flex");
            setIsMenuOpen(true);
            console.log(hambergerMenuClass);

        }
    }

    return (
        <MaxWidthWrapper className="">
            <header className='my-6'>
                <nav className='relative grainy border-r-[1px] border-b-[1px] border-slate-200 py-2 px-4 bg-gray-100 rounded-full md:px-6 flex flex-row justify-between items-center '>
                    <div>
                        {/* <Image src="/Logo.png" width={40} height={40} alt='Logo' title='StudyBean'></Image> */}
                        <Link href="/">
                            <h1 className='font-bold text-xl text-primary-500'>StudyBean</h1>
                        </Link>
                    </div>
                    <div className='hidden md:flex gap-4 justify-end items-center font-extrabold text-primary-800'>
                        <Link href="/pomodoro" className='hover:text-primary-500'>Pomodoro</Link>
                        <Link href="https://blogsmic.vercel.app/" className='hover:text-primary-500' target='_blank'>Blogsmic</Link>
                        <Link href="" className='hover:text-primary-500'>About</Link>
                        <Link href="" className='hover:text-primary-500'>Contact Us</Link>
                    </div>

                    <IconButton className="py-2 block md:hidden border-none hover:bg-transparent hover:text-black" onclick={handleHamberger}>
                        {isMenuOpen ? <X height="20px"/> : <HamburgerMenuIcon height="20px"/>}
                    </IconButton>
                    <div className={cn(hambergerMenuClass, 'z-99 top-16 right-0 left-0 flex-col border gap-4 text-lg font-bold p-4 justify-end items-center text-primary-800 backdrop-blur-xl shadow-xl rounded-lg md:hidden')}>
                        <Link href="/pomodoro" className=' active:text-primary-500 active:underline active:underline-offset-4'>Pomodoro</Link>
                        <Link href="https://blogsmic.vercel.app/" className=' active:text-primary-500 active:underline active:underline-offset-4' target='_blank'>Blogsmic</Link>
                        <Link href="" className=' active:text-primary-500 active:underline active:underline-offset-4'>About</Link>
                        <Link href="" className=' active:text-primary-500 active:underline active:underline-offset-4'>Contact Us</Link>
                    </div>
                </nav>
            </header>
        </MaxWidthWrapper>
    )
}

export default Navbar