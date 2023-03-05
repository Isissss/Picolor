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
import Pagination from "../../components/Pagination";

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

const getColors = async (url: string) => {
    const colorTemp: (string | Vec3 | undefined)[] = []
    await Vibrant.from(url).getPalette().then((palette) => {
        for (const swatch in palette) {
            if (palette[swatch]) {

                const colors = {
                    hex: palette[swatch]?.hex,
                    hsl: palette[swatch]?.hsl,
                }
                colorTemp.push(colors)

            }
        }
    }
    )
    return colorTemp
}

const search = async (searchTerm: string, page: number) => {
    let res

    if (searchTerm.toLowerCase() == 'random') {
        res = await api.photos.getRandom({ orientation: 'squarish', count: 10 }, { cache: 'force-cache' })


        for (const photo of res.response) {
            photo.colors = await getColors(photo.urls.thumb)
        }
        return res.response

    }
    else {
        res = await api.search.getPhotos({ query: searchTerm, page: (page || 1), orientation: 'squarish', 'orderBy': 'latest', perPage: 10 }
            , { cache: 'force-cache' })


        for (const photo of res.response.results) {
            photo.colors = await getColors(photo.urls.thumb)
        }


        return res.response
    }

}


async function SearchResults({
    params,
    searchParams,
}: {
    params: { searchTerm: string };
    searchParams?: { [key: string | number]: string | number | string[] | number[] | undefined };
}) {
    let searchResults = await search(params?.searchTerm, searchParams?.page || 1)
    let totalPages

    if (params.searchTerm.toLowerCase() !== 'random') {
        totalPages = searchResults?.total_pages
        searchResults = searchResults?.results
    }

    return (<div className="flex justify-items-center flex-col">
        <p className="text-gray-500 text-sm">You searched for {params.searchTerm}</p>
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResults?.map((photo) => (
                <Photo key={photo.id} photo={photo} />

            ))}
        </div>
        <Pagination totalPages={totalPages} page={parseInt(searchParams?.page) || 1} searchTerm={params.searchTerm} />

    </div >
    );
}

export default SearchResults;