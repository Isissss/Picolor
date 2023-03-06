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

    return (
        <div className="hover:scale-105 group flex flex-col justify-items-center bg-slate-800 rounded-lg ring-2 ring-slate-900/5 shadow-md">
            <div className="relative">
                <ImageContainer photo={photo} />
            </div>
            <div className="credit text-sky-400 text-center h-10 text-sm text-center place-items-center content-center flex" >
                <p className="w-full py-2">
                    <a target="_blank" href={`https://unsplash.com/@${photo.user.username}?utm_source=picolor&utm_medium=referral`}
                    >
                        Author <span className="italic underline">{photo.user.name}</span> </a> via <a href={`https://unsplash.com?utm_source=picolor&utm_medium=referral`}><span className="italic underline">Unsplash</span>
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