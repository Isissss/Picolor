
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
    colors: { hex: string; }[];
}
