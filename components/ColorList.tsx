'use-client'

import CopyColors from './CopyColors';

function ColorList(props: any) {


    const colors = props.colors

    return <div>
        {colors && colors?.map((color: any, index) => (
            <div key={index} style={{ backgroundColor: color.hex, color: (color.hsl[2] > 0.45 ? "black" : "white") }} className="flex flex-row items-center justify-between p-1">
                <span className="text-xs"> {color.name}  </span>
                <span className="text-xs">{color.hex}</span>
            </div>
        ))}
        {/* // save colors */}
        <CopyColors colors={colors} />
    </div>

}

export default ColorList;
