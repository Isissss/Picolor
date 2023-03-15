'use client'
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { HiOutlineClipboardCopy } from "react-icons/hi";

function CopyColors(props: {
    colors: {
        hex: string;
    }[]
}) {
    const [hasCopied, setHasCopied] = useState(false)
    const colors = props.colors.map((color: any) => color.hex).join(', ');

    useEffect(() => {
        if (hasCopied) {
            setTimeout(() => {
                setHasCopied(false);
            }, 1500);
        }
    }, [hasCopied]);

    const copyColors = () => {
        try {
            navigator.clipboard.writeText(colors);
            setHasCopied(true);
        } catch (err) {
            console.error(err);
            setHasCopied(false);
        }
    }

    return <div>
        <button className="btn rounded-lg place-content-center dark:text-white text-slate-700 py-2 px-4 w-full flex content-center" onClick={() => copyColors()}>
            {hasCopied ?
                <span className="flex text-md align-center"> <FiCheck className="self-center mr-2 text-green-500" /> <span className="font-bold dark:text-white text-slate-700"> Copied! </span> </span>
                :
                <span className="flex text-md align-center"> <HiOutlineClipboardCopy className="self-center mr-2" />  <span className="font-bold dark:text-white text-slate-700"> Copy colors </span> </span>}
        </button>
    </div>
}

export default CopyColors;