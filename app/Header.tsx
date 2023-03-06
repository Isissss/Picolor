'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
function Header() {
    const currentRoute = usePathname();
    console.log(currentRoute);
    return (
        <header className="flex flex-row p-4 bg-blue-500 text-white w-full">
            <p className="font-bold mr-2 text-xl"><Link href={'/'}>Picolor</Link></p>
            <p className={`text-xl mr-2 ${currentRoute == "/" || currentRoute?.includes("/search") ? 'underline' : ''}`} ><Link href={'/'}>Search</Link></p>
            <p className={`text-xl ${currentRoute == "/favorites" ? 'underline' : ''}`} ><Link href={'/favorites'}>Saved</Link></p>
        </header>
    )
}

export default Header;