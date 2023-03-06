'use client'
import { useState } from "react";
import Photo from "../../components/Photo";
import { useEffect } from "react";

function Favorites() {
    const [favorites, setFavorites] = useState(null);

    useEffect(() => {
        const favorites = localStorage.getItem('saved');

        if (!favorites || favorites === 'undefined') {
            setFavorites([]);
        } else {
            const init = JSON.parse(favorites);
            setFavorites(init);
        }


    }, [])



    if (!favorites) {
        return <div className="p-2 flex-grow">
            <p className="text-gray-500 animate-pulse">Checking favorites...</p>
        </div>;
    }

    if (favorites.length === 0) {
        return <div className="p-2 flex-grow">
            <p className="text-gray-500">No favorites yet.</p>
        </div>;
    }

    return <div className="flex justify-items-center flex-col">
        <div className="grid xl:grid-cols-5 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favorites && favorites.map((item: any) => {
                return <Photo key={item.id} photo={item} />
            })
            }
        </div>

    </div>
}
export default Favorites