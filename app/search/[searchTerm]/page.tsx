import React, { Suspense, useState } from "react";
import Vibrant from 'node-vibrant'
import { createApi } from "unsplash-js";
import Photo from "../../components/Photo"
import { Vec3 } from "@vibrant/color";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import Link from "next/link";
import ColorList from "../../components/ColorList";
import ImageContainer from "../../components/ImageContainer";

const env = process.env

interface PageProps {
    params: {
        searchTerm: string;

    },
    seachParams: {
        page: number;
    }
}

const api = createApi({
    accessKey: env.APP_KEY || '',
});

type SearchResults = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; raw: string; small: string };
    color: string | null;
    user: {
        username: string;
        name: string;
    };
    colors: any;
}


const search = async (searchTerm: string, page: number) => {
    let res: ApiResponse<Random | Random[] | undefined>

    if (searchTerm.toLowerCase() == 'random') {
        res = await api.photos.getRandom({ orientation: 'landscape', count: 10 })

        if (res.errors) {
            console.log(res.errors)
            return { notFound: true }
        }

        return res.response
    }
    else {
        res = await api.search.getPhotos({ query: searchTerm, page: (page || 1), orientation: 'squarish', 'orderBy': 'relevant', perPage: 10 }
            , { cache: 'force-cache' })

        if (res.errors) {
            console.log(res.errors)
            return (<div>Error</div>)
        }

        return res.response?.results
    }
}

async function SearchResults({
    params,
    searchParams,
}: {
    params: { searchTerm: string };
    searchParams?: { [key: string | number]: string | number | string[] | number[] | undefined };
}) {

    const searchResults = await search(params?.searchTerm, searchParams?.page || 1)

    return (
        <div className="flex justify-items-center flex-col">
            <p className="text-gray-500 text-sm">You searched for {params.searchTerm}</p>
            <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {searchResults?.map((photo) => (
                    (
                        <div key={photo.id} className="group flex flex-col justify-items-center bg-slate-800 rounded-lg ring-2 ring-slate-900/5 shadow-md">
                            <div className="relative">

                                <ImageContainer photo={photo} />

                            </div>

                            <a
                                className="credit text-sky-400 text-center h-10 text-sm  align-middle"
                                target="_blank"
                                href={`https://unsplash.com/@${photo.user.username}`}
                            >
                                Author <span className="italic underline">{photo.user.name}</span> via Unsplash
                            </a>
                            <div className="rounded-sm">
                                <span className="p-1"> Colorlist: </span>
                                <Suspense fallback={<div className="text-center animate-pulse p-1">Loading...</div>}>
                                    {/* @ts-ignore */}
                                    <ColorList url={photo.urls.regular} />
                                </Suspense>
                            </div>
                            {/* // save colors */}

                        </div >
                    )

                ))}



            </div>
            {params.searchTerm.toLowerCase() == 'random' ? null : <div className="flex justify-center items-center mt-4">

                <Link href={{ pathname: `/search/${params.searchTerm}`, query: { page: ((!searchParams.page) ? 1 : parseInt(searchParams.page) - 1) } }} className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Previous
                </Link>
                <Link href={{ pathname: `/search/${params.searchTerm}`, query: { page: (searchParams?.page == 34 ? 34 : (parseInt(searchParams.page) || 1) + 1) }, shallow: true }} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>}

        </div>
    );
}

export default SearchResults;