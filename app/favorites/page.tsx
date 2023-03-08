'use client'
import { useState } from "react";
import Photo from "../../components/Photo";
import { useEffect } from "react";

function Favorites() {
    const [favorites, setFavorites] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const favorites = localStorage.getItem('saved');

        if (!favorites || favorites === 'undefined') {
            setFavorites([]);
        } else {
            const init = JSON.parse(favorites);
            const totalSaved = init.length;
            setTotalPages(Math.ceil(totalSaved / 10));

            setFavorites(init.splice(((page - 1) * 10), 10));
        }


    }, [page])



    if (!favorites) {
        return <>
            <p className="text-gray-500 animate-pulse">Checking favorites...</p>
        </>
    }

    if (favorites.length === 0) {
        return <>
            <p className="text-gray-500">No favorites yet.</p>
        </>;
    }

    return <><div className="flex justify-items-center flex-col">
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favorites && favorites.map((item: any) => {
                return <Photo key={item.id} photo={item} />
            })
            }
        </div>
    </div>


        <button disabled={page == 1} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => setPage(page - 1)}>
            Previous
        </button>

        <button disabled={page + 1 > totalPages} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => setPage(page + 1)}>
            Next
        </button>

    </>

}
export default Favorites