"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Settings } from "lucide-react"

const Header: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="sticky top-0 z-50">
            <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-4">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">🌱</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">깨비로드</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate("/preferences/setup")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Settings className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
