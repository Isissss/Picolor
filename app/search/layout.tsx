
import Search from './Search'

export default function layout({ children, }
    : { children: React.ReactNode }) {
    return (
        <>
            <Search />
            {children}
        </>
    )
}

