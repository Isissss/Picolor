'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
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
        <header className="flex flex-row z-10 p-3 bg-blue-500 text-white">
            <p className="font-bold mr-2 text-xl"><Link href={'/'}>Picolor</Link></p>
            <div className="flex flex-row gap-2 px-2 place-items-center justify-self-center rounded-full">
                <Link href="/" className={`text-lg leading-6 ${currentRoute == "/" || currentRoute?.includes("/search") ? 'font-bold' : ''}`}> Search</Link>
                <Link href="/favorites" prefetch={false} className={`text-lg leading-6 ${currentRoute == "/favorites" ? 'font-bold' : ''}`}> Saved</Link>
            </div>
            <button className="ml-auto" onClick={() => toggleTheme()}> {!mounted ? null : (theme === 'dark' ? '🌙' : '☀️')} </button>
        </header >
    )
}

export default Header;