'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";


function ImageContainer(props) {
    let idsSaved: number[] = [];

    const [favorite, setFavorite] = useState(false);

    const getSaved = () => {
        let initial
        let init = localStorage.getItem("saved");
        if (init && init !== "undefined") {
            return JSON.parse(init);
        } else {
            return [];
        }
    }

    useEffect(() => {
        const initial = getSaved();

        idsSaved = initial.map((item: any) => item.id);
        setFavorite(idsSaved.includes(props.photo.id));
    }, [])





    const save = (photo) => {
        const initial = getSaved();

        if (favorite) {
            const newSaved = initial.filter((item) => item.id !== photo.id);

            localStorage.setItem("saved", JSON.stringify(newSaved));
            setFavorite(false);

        } else {
            setFavorite(true);
            localStorage.setItem("saved", JSON.stringify([...initial, photo]));

        }


    };
    return (

        <div className="rounded-t-lg" style={{ position: "relative", display: "block", overflow: "hidden" }}>

            <Blurhash
                hash={props.photo.blur_hash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4'}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}

            />

            <Image
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, margin: "auto" }}
                src={props.photo.urls.regular}
                alt={props.photo.alt_description || "Image"}
                width={props.photo.width}
                height={props.photo.height}
                className="object-cover w-full h-full"
            />
            <div title={favorite ? 'Unsave' : 'Save'}>
                <button onClick={() => save(props.photo)} className={`absolute ${favorite ? 'block' : 'hidden'} group-hover:block top-2 right-2 p-2 bg-gray-800/60 rounded-full hover:bg-gray-100/40`}>
                    {favorite ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
                </button>
            </div>
        </div >
    );
}

export default ImageContainer;

