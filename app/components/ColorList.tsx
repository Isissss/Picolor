import Image from 'next/image'
import nearestColor from 'nearest-color';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import colorNameList from 'color-name-list';

import Vibrant from 'node-vibrant'
import CopyColors from './CopyColors';


const getColors = async (url) => {
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
        {colors && colors?.map((color: any, index) => {
            return <div key={index} className="flex flex-row items-center justify-center">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hex }}>
                </div>
                <div className="text-sm text-gray-400">{color.hex}</div>
            </div>
        })}
        {/* // save colors */}
        <CopyColors colors={colors} />
    </div >

}

export default ColorList;
