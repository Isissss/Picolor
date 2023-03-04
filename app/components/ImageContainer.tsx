'use client'
import Image from "next/image";
import Vibrant from "node-vibrant";
import { Blurhash } from "react-blurhash";
import { BsBookmarkHeart } from "react-icons/bs";

function ImageContainer(props) {
    return (
        <div style={{ position: "relative", display: "block", overflow: "hidden" }}>
            <Blurhash
                hash={props.photo.blur_hash}
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
            />
            <button className="absolute hidden group-hover:block top-2 right-2 p-2 bg-gray-100/30 rounded-full hover:bg-gray-200">
                <BsBookmarkHeart className="text-gray-500" />
            </button>

        </div >
    );
}

export default ImageContainer;

