'use client'
import ColorList from './ColorList';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { usePathname } from 'next/navigation';

function Photo(props) {
    const pathName = usePathname();
    const [favorite, setFavorite] = useState(pathName?.includes("/favorites"));

    const getSaved = () => {
        let init = localStorage.getItem("saved");
        if (init && init !== "undefined") {
            return JSON.parse(init);
        } else {
            return [];
        }
    }

    const save = () => {
        const initial = getSaved();

        if (favorite) {
            const newSaved = initial.filter((item) => item.id !== photo.id);
            localStorage.setItem("saved", JSON.stringify(newSaved));

        } else {
            localStorage.setItem("saved", JSON.stringify([...initial, photo]));
        }

        setFavorite(!favorite);

    };
    const photo = props.photo;

    return (
        <div className="group flex flex-col justify-items-center bg-slate-800 rounded-lg ring-2 ring-slate-900/5 shadow-md p-1">

            <div className="relative rounded-t-lg overflow-hidden">
                <Blurhash
                    hash={photo.blur_hash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'}
                    width={267}
                    height={300}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    className=" rounded-t-lg"
                />
                <img
                    loading="lazy"
                    src={props.photo.urls.raw + '&w=400&fm=webp'}
                    alt={props.photo.alt_description || "Image"}
                    className="object-cover object-middle w-full h-full absolute top-0 left-0 rounded-t-lg"
                />
                <div title={favorite ? 'Unsave' : 'Save'}>
                    <button onClick={() => save()} className={`absolute ${favorite ? 'block' : 'hidden'} group-hover:block top-2 right-2 p-2 bg-gray-800/60 rounded-full hover:bg-gray-100/90`}>
                        {favorite ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
                    </button>
                </div>

            </div>
            <div className="credit text-sky-400  h-10 text-sm text-center place-items-center content-center flex" >
                <p className="w-full py-2">
                    <a target="_blank" href={`https://unsplash.com/@${photo.user}?utm_source=picolor&utm_medium=referral`}
                    >
                        Author <span className="italic underline">{photo.user?.name || photo.user}</span> </a> via <a href={`https://unsplash.com?utm_source=picolor&utm_medium=referral`}><span className="italic underline">Unsplash</span>
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