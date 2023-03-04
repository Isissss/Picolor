import Search from './Search';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <main className='flex flex-col flex-grow justify-content-center p-4 '>
            <div className='flex flex-col justify-content-center'>
                <h1 className='text-3xl font-bold text-center'>Picolor </h1>
                <p className='text-sm text-slate-400 text-center'> Request a subject to receive images and it's most prominent color which you can use as a color pallete for anything! </p>
                <p className='text-md  text-center'> 📷🎨🖼️✨ </p>
            </div>
            <div className="flex-1 p-4  xl:mx-36">
                <Search />
                <div> {children}</div>
                <
            </div>
        </main>
    )
}
