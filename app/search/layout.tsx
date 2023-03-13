import Search from "./Search";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (<>
        <Search />
        <div>{children}</div>
    </>)
}
