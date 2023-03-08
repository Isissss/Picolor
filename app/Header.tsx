'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
function Header() {
    const currentRoute = usePathname();
    console.log(currentRoute);
    return (
        <header className="flex flex-row z-10 p-3 bg-blue-500 text-white">
            <p className="font-bold mr-2 text-xl"><Link href={'/'}>Picolor</Link></p>

            <div className="flex flex-row gap-2 px-2 place-items-center justify-self-center rounded-full   ">
                <Link href="/" className={`text-lg font-bold leading-6 ${currentRoute == "/" || currentRoute?.includes("/search") ? 'underline' : ''}`}> Search</Link>
                <Link href="/favorites" prefetch={false} className={`text-lg font-bold leading-6 ${currentRoute == "/favorites" ? 'underline' : ''}`}> Saved</Link>

            </div>
        </header >
    )
}

export default Header;