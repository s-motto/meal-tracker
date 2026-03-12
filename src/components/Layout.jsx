import Navbar from "./Navbar"

export default function Layout({children}) {
    return (
        <div className="min-h-screen bg-blush-light overflow-x-hidden">
            <Navbar />
            <main className="pb-16">
                {children}
            </main>
        </div>
    )
}