'use client'
import ColorList from './ColorList';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import { PhotoType } from "../types/types";
import { useFavorites } from '../app/templates/Layout';

function Photo(props: { photo: PhotoType }) {
    if (!props) return null;

    const photo = props.photo;
    const { favorites, setFavorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {

        setIsFavorite(favorites?.some((item: any) => item.id === photo.id));

    }, [favorites, photo])



    const save = () => {
        if (isFavorite) {
            const filtered = favorites.filter((item: any) => item.id !== photo.id);
            setFavorites(filtered);
        } else {
            setFavorites([...favorites, photo]);
        }
        setIsFavorite(!isFavorite);
    };


    return (
        <div className="group flex flex-col justify-items-center bg-slate-100 dark:bg-slate-800 rounded-lg ring-2 ring-slate-400/5 dark:ring-slate-900/5 shadow-md p-1">

            <div className="relative rounded-t-lg overflow-hidden">
                <Blurhash
                    hash={photo.blur_hash}
                    width={300}
                    height={300}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className=" rounded-t-lg"
                />
                <Image
                    height={300}
                    width={300}
                    loading='lazy'
                    src={photo.urls.regular}
                    alt={photo.alt_description || "Image"}
                    className="object-cover object-middle h-full w-full absolute inset-0 rounded-t-lg"
                />

                <div>
                    <button data-tooltip-id={`save${photo.id}`} data-tooltip-content={isFavorite ? "Remove from favorites" : "Save for later"} onClick={() => save()} className={`absolute  top-2 right-2 p-2 bg-gray-800/60 rounded-full hover:bg-gray-800/90`}>
                        {isFavorite ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
                    </button>
                    <Tooltip id={`save${photo.id}`} style={{ background: '#222' }} />
                </div>

            </div>
            <div className="credit text-sky-700 dark:text-sky-400 h-10 text-xs text-center place-items-center content-center flex" >
                <p className="w-full py-2">
                    <a target="_blank" href={`https://unsplash.com/@${photo.user}?utm_source=picolor&utm_medium=referral`}
                    >Author {" "}
                        <span className="italic underline">{photo.user}</span> </a>
                    via <a href={`https://unsplash.com?utm_source=picolor&utm_medium=referral`}>
                        <span className="italic underline">Unsplash</span>
                    </a>
                </p>
            </div>
            <div className=" ">
                <ColorList colors={photo.colors} />
            </div>
        </div >
    )
}

export default Photo;