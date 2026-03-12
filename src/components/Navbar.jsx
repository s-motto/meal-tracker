import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
       <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex justify-between items-center">
            <span className="font-semibold text-primary">🥗 Meal Tracker</span>
            <div className="flex gap-4">
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? 'nav-link-attivo' : 'nav-link'}
                    >
                    Diario
                    </NavLink>
                    <NavLink
                    to="/ricette"
                    className={({ isActive }) => isActive ? 'nav-link-attivo' : 'nav-link'}
                    >
                    Ricette
                    </NavLink>
            </div>
         </div>
        </nav>
    )
}   