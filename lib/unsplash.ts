
import { createApi } from "unsplash-js";
import { cache } from 'react'
import { getPalleteFromImages } from "./palleteFromImage";
import { Random } from "unsplash-js/dist/methods/photos/types";
import { ApiResponse } from "unsplash-js/dist/helpers/response";

const api = createApi({
    accessKey: process.env.APP_KEY || '',
});

const getPopular = async () => {
    const images = await api.photos.getRandom({ orientation: 'portrait', count: 10 }) as ApiResponse<Random[]>

    const { response } = images

    const photosWithPallets = await Promise.all(response.map((photo: Random) => getPalleteFromImages(photo)))

    return photosWithPallets;

}

const getByQuery = async (query: string, page: number) => {
    const images = await api.search.getPhotos({ query, page: (page || 1), perPage: 10, orientation: 'squarish' })

    const { results, total_pages } = images.response;

    const photosWithPallets = await Promise.all(results.map((photo: Random) => getPalleteFromImages(photo)))

    return { images: photosWithPallets, pages: total_pages }
}


export const unsplashSdk = {
    getPopular: (async () =>
        getPopular()
    ),
    getByQuery: cache(async (params: string, page: number) =>
        getByQuery(params, page))

};