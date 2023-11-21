import React from "react"; 
import Photo from "../../../components/Photo"
import Pagination from "../../../components/Pagination";
import { PhotoType } from "../../../types/types";
import { unsplashSdk } from "../../../lib/unsplash";

export const revalidate = 0
  
interface PageProps {
    params: {
        searchTerm: string;
    },
    searchParams: {
        page: string
    }
} 

const search = async (searchTerm: string, page: number) => { 

    if (searchTerm.toLowerCase() === 'random') { 
        const res = await unsplashSdk.getPopular()
        
        return { images: res, pages: undefined }
    }
  
    return await unsplashSdk.getByQuery(searchTerm, page)   
}


async function SearchResults({ params, searchParams }: PageProps) {
    const pageNum = parseInt(searchParams.page) || 1

    const { images, pages } = await search(params.searchTerm, pageNum) 
 

    if (!images || images.length === 0) {
        return (
            <div className="flex justify-items-center flex-col">
                <p className="text-gray-500 text-sm">No results found for {params?.searchTerm}</p>
            </div>
        )
    }

    return (<div className="flex justify-items-center flex-col" >

        <p className="text-gray-500 text-sm"> {params.searchTerm.toLowerCase() == 'random' ? `Random images` : `You searched for: ${params.searchTerm} `}</p>
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {images.map((photo: PhotoType) => (
                <Photo key={photo.id} photo={photo} />
            ))}
        </div>
        { params.searchTerm.toLowerCase() !== 'random' &&
            <Pagination nextPage={pageNum >= ( pages ? pages - 1 : 1000)}  page={pageNum} searchTerm={params.searchTerm} />
        }
    </div >
    );
}

export default SearchResults;