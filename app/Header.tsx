import React from "react";
import Link from "next/link";
function Header() {
    return (
        <header className="flex flex-row p-4 bg-blue-500 text-white w-full">
            <p className="font-bold mr-2 text-2xl">Picolor</p>
            <p className="text-xl mr-2"><Link href={'/search'}>Search</Link></p>
            <p className="text-xl"><Link href={'/favorites'}>Saved</Link></p>
        </header>
    )
}

export default Header;