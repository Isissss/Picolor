import React, { Suspense } from "react";
import Vibrant from 'node-vibrant'
import { createApi } from "unsplash-js";
import Photo from "../../../components/Photo"
import { Vec3 } from "@vibrant/color";
import Pagination from "../../../components/Pagination";
import nearestColor from 'nearest-color';
import colorNameList from 'color-name-list';
import { ApiResponse } from "unsplash-js/dist/helpers/response";


interface PageProps {
    params: {
        searchTerm: string;

    },
    seachParams: {
        page: number;
    }
}

const api = createApi({
    accessKey: process.env.APP_KEY || '',
});

const colorList = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colorList);


type Photos = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; raw: string; small: string };
    user: {
        username: string;
        name: string;
    };
    blur_hash: string | null;
    colors: { hex: string; hsl: Vec3; name: string | undefined }[];

}

type PhotosResponse = {
    results: Photos[];
    total_pages: number | undefined;
}


const getPhotosAndColors = async (photos: any[]) => {
    const photosWithPalette: Photos[] = []
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
        }

        )
        photosWithPalette.push({
            id: photo.id,
            width: photo.width,
            height: photo.height,
            urls: photo.urls,
            user: photo.user.name,
            colors: colorTemp,
            blur_hash: photo.blur_hash
        })
    }

    return photosWithPalette
}


const search = async (searchTerm: string, page: number) => {
    let newResult: PhotosResponse = {
        results: [],
        total_pages: undefined
    }


    if (searchTerm.toLowerCase() == 'random') {
        const res = await api.photos.getRandom({ count: 10, orientation: 'portrait' }, { cache: 'force-cache' })
        newResult.results = await getPhotosAndColors(res.response)
        return newResult
    }

    const res = await api.search.getPhotos({ query: searchTerm, page: (page || 1), orientation: 'squarish', orderBy: 'relevant', perPage: 10 }
        , { cache: 'force-cache' })

    newResult.results = await getPhotosAndColors(res.response.results)
    newResult.total_pages = res.response?.total_pages

    return newResult
}


async function SearchResults({ params, searchParams }: PageProps) {

    let searchResults = await search(params?.searchTerm, searchParams?.page || 1)


    return (<div className="flex justify-items-center flex-col">
        <p className="text-gray-500 text-sm">You searched for {params?.searchTerm}</p>
        {/* <ImageGrid photos={searchResults} /> */}
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {searchResults?.results?.map((photo) => (
                <Photo key={photo.id} photo={photo} />
            ))}
        </div>
        <Pagination totalPages={searchResults.total_pages} page={parseInt(searchParams?.page) || 1} searchTerm={params.searchTerm} />

    </div >
    );
}

export default SearchResults;