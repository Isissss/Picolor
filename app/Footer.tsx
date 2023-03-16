import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
    return (
        <footer className="p-4 relative align-middle w-full inset-x-0 bottom-0 rounded-t-lg shadow  md:items-center  md:py-6 xl:px-48 bg-gray-100 dark:bg-gray-800">

            <ul className="flex flex-wrap items-center align-middle justify-between  text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>   <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">2023 - Made by <a href="https://iettech.nl/" className="hover:underline">Iettech</a>
                </span> </li>
                <li>
                    <a href="https://github.com/Isissss" className="hover:underline pr-1"><BsGithub className="inline-block mr-1 mb-1" />  Github</a>
                </li>
            </ul>
        </footer>
    )
}

