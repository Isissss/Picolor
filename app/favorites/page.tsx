'use client'
import { useState } from "react";
import Photo from "../../components/Photo";
import { useEffect } from "react";
import Pagination from "../../components/Pagination";
import { useFavorites } from "../templates/Layout";

const PER_PAGE = 10;

function FFavorites() {
    const { favorites } = useFavorites();
    const [shownFavorites, setShownFavorites] = useState([]) as any;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
 

    useEffect(() => { 
        if (favorites) {
            const start = (page - 1) * PER_PAGE;
            const end = start + PER_PAGE;
            const shown = favorites.slice(start, end);
            setShownFavorites(shown);
            setTotalPages(Math.ceil(favorites.length / PER_PAGE));
        }
    }, [favorites, page]);


    if (!favorites) {
        return <>
            <p className="text-gray-500 animate-pulse">Checking favorites... Hold on!</p>
        </>
    }

    if (favorites.length === 0) {
        return <>
            <p className="text-gray-500">No favorites yet.</p>
        </>;
    }

    return <><div className="flex justify-items-center flex-col">
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {shownFavorites && shownFavorites.map((item: any) => {
                return <Photo key={item.id} photo={item} />
            })
            }
        </div>
    </div>

        <div style={{ position: "relative", display: "block", overflow: "hidden" }}>
            <div className="flex justify-center items-center mt-4">
                <Pagination nextPage={page + 1 > totalPages} page={page} changePage={setPage} favorites={true} />
            </div>
        </div >

    </>

}
export default FFavorites