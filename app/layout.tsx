
import '../styles/globals.css'
import 'react-tooltip/dist/react-tooltip.css'
import Layout from './templates/Layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: "Picolor",
        template: "Picolor - %s",
    }
}

export default function RootLayout({ children }
    : { children: React.ReactNode }) {
    return (
        <html lang='en' style={{ overflow: "overlay" }}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="language" content="en" />
            </head>
            <body className="bg-slate-200 dark:bg-slate-900 text-white flex flex-col  min-h-screen "  >
                <Layout >
                    {children}
                </Layout>
            </body>
        </html >
    )
}

