'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
function Header() {
    const currentRoute = usePathname();
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)

    }, [])

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }

    }

    return (
        <header className="flex flex-row z-10 px-5 md:px-20 min-[1650px]:px-48 py-3 bg-blue-500 text-white">
            <p className="font-bold mr-2 text-2xl"><Link href={'/'}>Picolor</Link></p>
            <div className="flex flex-row gap-2 px-2 place-items-center justify-self-center rounded-full">
                <Link href="/" className={`text-lg leading-6 ${currentRoute == "/" || currentRoute?.includes("/search") ? 'font-bold' : ''}`}> Search</Link>
                <Link href="/favorites" prefetch={false} className={`text-lg leading-6 ${currentRoute == "/favorites" ? 'font-bold' : ''}`}> Saved</Link>
            </div>
            <button className="ml-auto hidden dark:block" onClick={() => toggleTheme()}> <FaMoon /> </button>
            <button className="ml-auto block dark:hidden" onClick={() => toggleTheme()}> <FaSun /> </button>
        </header >
    )
}

export default Header;