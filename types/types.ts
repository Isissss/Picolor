import { Vec3 } from "node-vibrant/lib/color";

export type PhotoType = {
    id: string;
    user: string;
    blur_hash: string;
    alt_description: string;
    width: number;
    height: number;
    urls: {
        regular: string;
        small: string;
    };
    colors: ColorType[];
}


export type ColorType = {
    hex: string,
    hsl: Vec3,
    name: string
}