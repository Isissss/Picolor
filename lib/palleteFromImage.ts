import Vibrant from "node-vibrant";
import nearestColor from 'nearest-color';
import colorNameList from 'color-name-list';

const colors = colorNameList.reduce((obj: any, color: any) => {
    obj[color.name] = color.hex;
    return obj;
}, {});

const nearest = nearestColor.from(colors);

export const getPalleteFromImages = async (photo: any) => {  
        const swatches = await Vibrant.from(photo.urls.thumb).maxColorCount(7).getPalette(); 

        const colorTemp = Object.entries(swatches)
            .filter(([_, palette]) => palette && palette.hex)
            .map(([_, palette]) => {  
                const { hex, hsl } = palette;
                const name = nearest(hex).name;
                return { hex, hsl, name };
            });

        return {
            id: photo.id,
            width: photo.width,
            height: photo.height,
            urls: photo.urls,
            alt_description: photo.alt_description || 'Picture',
            user: photo.user.name,
            colors: colorTemp,
            blur_hash: photo.blur_hash || 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
        };
   
};