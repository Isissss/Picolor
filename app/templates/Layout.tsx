"use client"
import { ThemeProvider } from "next-themes";
import Footer from "../Footer";
import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (<>
        <ThemeProvider attribute="class">
            <Header />
            <main className='flex flex-col flex-grow p-4' >
                <h1 className='text-4xl font-bold text-center text-slate-900 dark:text-white'>Picolor </h1>
                <div className='flex flex-col justify-content-center'>
                    <p className='text-sm text-slate-600 dark:text-slate-400 text-center'> Request a subject to receive images and it's most prominent color which you can use as a color pallete for anything! </p>
                    <p className='text-lg aria-hidden text-center'> 📷🎨🖼️✨ </p>
                </div>
                <div className="flex-1 p-4 w-full max-w-[1600px] min-[1600px]:self-center sm:mx-18 min-[1650px]:mx-36">
                    {children}
                </div>
            </main>
            <Footer />
        </ThemeProvider>
    </>)
}
