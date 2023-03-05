import Link from "next/link";
import React from "react";

function Footer() {
    return (
        <footer className="p-4 relative align-baseline w-full absolute inset-x-0 bottom-0   rounded-t-lg shadow md:flex md:items-center md:justify-between md:p-6  bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://iettech.nl/" className="hover:underline">Iettech</a>.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">

                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;