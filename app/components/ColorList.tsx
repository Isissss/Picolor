import Image from 'next/image'
import nearestColor from 'nearest-color';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import colorNameList from 'color-name-list';

import Vibrant from 'node-vibrant'
import CopyColors from './CopyColors';
import { ImageSource } from '@vibrant/image';


const getColors = async (url: string) => {
    const colorTemp: any = []
    await Vibrant.from(url).getPalette().then((palette) => {
        for (const swatch in palette) {
            if (palette[swatch]) {

                if (palette[swatch]?.hex) {
                    const colors = {
                        hex: palette[swatch]?.hex,
                        hsl: palette[swatch]?.hsl,
                    }
                    colorTemp.push(colors)
                }



            }
        }
    }
    )

    return colorTemp

}
const colorList = colorNameList.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
const nearest = nearestColor.from(colorList);


async function ColorList(props: any) {
    const colors = await getColors(props.url)


    return <div>
        {colors && colors?.map((color: any, index) => (
            <div key={index} style={{ backgroundColor: color.hex, color: (color.hsl[2] > 0.45 ? "black" : "white") }} className="flex flex-row items-center justify-between p-1">
                <span> {nearest(color.hex)?.name} </span>
                <span className="text-sm">{color.hex}</span>
            </div>
        ))}
        {/* // save colors */}
        <CopyColors colors={colors} />
    </div>

}

export default ColorList;
