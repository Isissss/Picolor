'use-client'

import CopyColors from './CopyColors';
import { ColorList } from '../types/types';

function ColorList(props: { colors: ColorList[] }) {
    const colors = props.colors

    return <div>
        {colors && colors?.map((color: ColorList, index: number) => (
            <div key={index} style={{ backgroundColor: color.hex, color: (color.hsl[2] > 0.45 ? "black" : "white") }} className="flex flex-row items-center justify-between p-1">
                <span className="text-sm"> {color.name}  </span>
                <span className="text-sm">{color.hex}</span>
            </div>
        ))}
        {/* // save colors */}
        <CopyColors colors={colors} />
    </div>

}

export default ColorList;
