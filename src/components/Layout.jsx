import Navbar from "./Navbar"

export default function Layout({children}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pb-16">
                {children}
            </main>
        </div>
    )
}