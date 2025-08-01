import type React from "react"
import {Outlet, useLocation} from "react-router-dom"
import BottomNavigation from "@/components/global/BottomNavigation"

const AppLayout: React.FC = () => {
    const location = useLocation()
    const isCertificationPage = location.pathname === '/certification'

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <main className={`flex-1 max-w-md mx-auto w-full ${
                isCertificationPage
                    ? 'overflow-hidden'
                    : 'overflow-y-auto pb-20'
            }`}>
                <Outlet />
            </main>
            <BottomNavigation />
        </div>
    )
}

export default AppLayout