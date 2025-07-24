import type React from "react"
import { Outlet } from "react-router-dom"
import BottomNavigation from "@/components/global/BottomNavigation"

const AppLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <main className="pb-20 max-w-md mx-auto">
                <Outlet />
            </main>
            <BottomNavigation />
        </div>
    )
}

export default AppLayout
