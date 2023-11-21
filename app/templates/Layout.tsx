"use client"
import { ThemeProvider } from "next-themes";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined)

export const useFavorites = () => { 
    const context = useContext(FavoriteContext)
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoriteProvider')
    }
    return context
}

export default function Layout({ children }: { children: React.ReactNode }) {

    const [favorites, setFavorites] = useState(null) as any;
 
    useEffect(() => {
        const saved = localStorage.getItem("saved");
        if (saved && saved !== "undefined") { 
            setFavorites(JSON.parse(saved));
        } else {
            setFavorites([]);
        }
    }, []);  

    useEffect(() => {
        if (favorites !== null) { 
            localStorage.setItem("saved", JSON.stringify(favorites));
        }
    }, [favorites]);

 
    return (<>
        <ThemeProvider attribute="class">
            <FavoriteContext.Provider value={{ favorites,  setFavorites }}>
            <Header />
            <main className='flex flex-col flex-grow p-4' >
                <h1 className='text-4xl font-bold text-center text-slate-900 dark:text-white'>Picolor </h1>
                <div className='flex flex-col justify-content-center'>
                    <p className='text-sm text-slate-600 dark:text-slate-400 text-center'> Request a subject to receive images and it's most prominent color which you can use as a color pallete for anything! </p>
                    <p className='text-lg text-center' aria-hidden> 📷🎨🖼️✨ </p>
                </div>
                <div className="flex-1 p-4 w-full max-w-[1600px]  mx-auto  ">
                    {children}
                </div>
            </main>
            <Footer />
            </FavoriteContext.Provider>
        </ThemeProvider>
    </>)
}
