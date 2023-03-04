import Link from 'next/link'
import '../styles/globals.css'
import Footer from './Footer'
import Header from './Header'

export default function RootLayout({ children, }
    : { children: React.ReactNode }) {
    return (
        <html>
            <head></head>

            <body className="bg-slate-900 text-white flex flex-col min-h-screen">
                <Header />
                {children}
                <Footer />


            </body>
        </html>
    )
}
