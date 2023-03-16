import { Vec3 } from "node-vibrant/lib/color";

export type PhotoTest = {
    id: string;
    user: string;
    blur_hash: string;
    alt_description: string;
    width: number;
    height: number;
    urls: {
        regular: string;
    };
    colors: ColorList[];
}


export type ColorList = {
    hex: string,
    hsl: Vec3,
    name: string
}