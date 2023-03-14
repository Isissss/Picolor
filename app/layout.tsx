'use client'
import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'
import { ThemeProvider } from 'next-themes'
export default function RootLayout({ children, }
    : { children: React.ReactNode }) {
    return (
      
        <html lang='en' style={{ scrollbarGutter: 'stable' }}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="language" content="en" />
            </head>
           
            <body className="bg-slate-900 text-white flex flex-col  min-h-screen "  >
            <ThemeProvider attribute="class">
                <Header />
                <main className='flex flex-col flex-grow p-4' >
                    <h1 className='text-3xl font-bold text-center'>Picolor </h1>
                    <div className='flex flex-col justify-content-center'>
                        <p className='text-sm text-slate-400 text-center'> Request a subject to receive images and it's most prominent color which you can use as a color pallete for anything! </p>
                        <p className='text-md aria-hidden text-center'> 📷🎨🖼️✨ </p>
                    </div>
                    <div className="flex-1 p-4 xl:mx-24">
                        {children}
                    </div>
                </main>
                <Footer />
                </ThemeProvider>
            </body>
    
        </html >
    )
}

