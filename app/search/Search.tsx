'use client'
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from 'react-tooltip'
import { OrderBy } from "unsplash-js";
import Link from "next/link";
import { VscFlame } from "react-icons/vsc";
import { BsDice1, BsDice6 } from "react-icons/bs";
import { revalidatePath } from "next/cache";

function Search() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("");
        router.push(`/search/${search}`)
    }

    return (<div className="flex flex-row">
        <form onSubmit={handleSearch} className="flex flex-row w-full">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for a subject" required />
                <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
        <div className="flex justify-self-center">
            <button onClick={(e) => {
                router.push(`/search/random`)
                router.refresh()
            }} className="flex justify-center items-center rounded-lg bg-blue-600 hover:bg-blue-700 h-[52px] w-[52px] mx-1 text-lg" aria-label="Search for trending images"> <BsDice6 />  </button>

        </div>
    </div>)
}

export default Search;