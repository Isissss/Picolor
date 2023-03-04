'use client'
import Image from 'next/image'
import nearestColor from 'nearest-color';
import colorNameList from 'color-name-list';
import React, { useState, useEffect, Suspense } from "react";
import { HiOutlineClipboardCopy } from 'react-icons/Hi';
import { FiCheck } from 'react-icons/fi';
import { BsBookmarkHeart } from 'react-icons/bs';
import ColorList from './ColorList';

import ImageContainer from './ImageContainer';


function Photo(props) {
    const photo = props.photo;
    const [hasCopied, setHasCopied] = useState(false);
    // const colors = photo.colors.map((color: any) => color.hex).join(', ');

    useEffect(() => {
        if (hasCopied) {
            setTimeout(() => {
                setHasCopied(false);
            }, 1500);
        }
    }, [hasCopied]);



    const copyColors = async () => {
        try {
            navigator.clipboard.writeText(colors);
            setHasCopied(true);
        } catch (err) {
            console.error(err);
            setHasCopied(false);
        }
    }



    return (
        <div key={photo.id} className="group flex flex-col justify-items-center bg-slate-800 rounded-lg ring-2 ring-slate-900/5 shadow-md">
            <div className="relative">

                <button onClick={copyColors} className="hidden group-hover:block absolute top-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200"> <BsBookmarkHeart className="text-gray-500" /> </button>
                <ImageContainer photo={photo} />

            </div>


            <a
                className="credit text-sky-400 text-center h-10 text-sm  align-middle"
                target="_blank"
                href={`https://unsplash.com/@${photo.user.username}`}
            >
                Author <span className="italic underline">{photo.user.name}</span> via Unsplash
            </a>
            <div className="rounded-sm">
                Colorlist:

                <Suspense fallback={<div>Loading...</div>}>
                    {/* @ts-ignore */}
                    <ColorList url={photo.urls.regular} />
                </Suspense>
            </div>


        </div >
    )
}

export default Photo;