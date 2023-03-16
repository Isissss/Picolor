import React, { Suspense } from "react";
import Vibrant from 'node-vibrant'
import { createApi } from "unsplash-js";
import Photo from "../../../components/Photo"
import { Vec3 } from "@vibrant/color";
import Pagination from "../../../components/Pagination";
import nearestColor from 'nearest-color';
import colorNameList from 'color-name-list';
import { PhotoTest } from "../../../types/types";
import { Random, Basic } from "unsplash-js/dist/methods/photos/types";


interface PageProps {
    params: {
        searchTerm: string;
    },
    searchParams: {
        page: string
    }
}

const api = createApi({
    accessKey: process.env.APP_KEY || '',
});

const colorList = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colorList);


type PhotosResponse = {
    results: PhotoTest[] | [];
    total_pages: number;
}


const getPhotosAndColors = async (photos: Random[] | Basic[]) => {
    const photosWithPalette: PhotoTest[] = []
    for (const photo of photos) {
        const colorTemp: { hex: string; hsl: Vec3; name: string | undefined }[] = [];
        const swatches = await Vibrant.from(photo.urls.thumb).getPalette()
        Object.entries(swatches).forEach(([key, palette]) => {
            if (palette) {
                if (palette?.hex) {
                    const colors = {
                        hex: palette?.hex,
                        hsl: palette?.hsl,
                        name: nearest(palette?.hex)?.name
                    }
                    colorTemp.push(colors)
                }
            }
        })

        photosWithPalette.push({
            id: photo.id,
            width: photo.width,
            height: photo.height,
            urls: photo.urls,
            alt_description: photo.alt_description || 'Picture',
            user: photo.user.name,
            colors: colorTemp,
            blur_hash: photo.blur_hash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'
        })
    }

    return photosWithPalette
}



const search = async (searchTerm: string, page: number) => {
    let newResult: PhotosResponse = { results: [], total_pages: 0 }


    if (searchTerm.toLowerCase() == 'random') {
        const res = await api.photos.getRandom({ count: 10, orientation: 'portrait' }, { cache: 'force-cache' })

        if (!res || !res.response) return { results: [], total_pages: 0 }

        if (Array.isArray(res.response)) {
            newResult.results = await getPhotosAndColors(res.response)
        } else {
            newResult.results = await getPhotosAndColors([res.response])
        }

        return newResult
    }

    const res = await api.search.getPhotos({ query: searchTerm, page: (page || 1), orientation: 'squarish', orderBy: 'relevant', perPage: 10 }
        , { cache: 'force-cache' })

    if (!res || !res.response || res.response.results.length === 0) return { results: [], total_pages: 0 }

    newResult.results = await getPhotosAndColors(res.response.results)
    newResult.total_pages = res?.response?.total_pages

    return newResult
}


async function SearchResults({ params, searchParams }: PageProps) {
    const pageNum = parseInt(searchParams?.page) || 1

    let searchResults = await search(params?.searchTerm, pageNum)

    if (!searchResults.results) {
        return (
            <div className="flex justify-items-center flex-col">
                <p className="text-gray-500 text-sm">No results found for {params?.searchTerm}</p>
            </div>
        )
    }

    return (<div className="flex justify-items-center flex-col" >
        <p className="text-gray-500 text-sm">You searched for {params?.searchTerm}</p>
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResults.results.map((photo: PhotoTest) => (
                <Photo key={photo.id} photo={photo} />
            ))}
        </div>
        {params.searchTerm.toLowerCase() !== 'random' && <Pagination nextPage={pageNum >= (searchResults.total_pages - 1)} prevPage={pageNum <= 1} page={pageNum} searchTerm={params.searchTerm} />
        }
    </div >
    );
}

export default SearchResults;