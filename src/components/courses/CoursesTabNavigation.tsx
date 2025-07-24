"use client"

import type React from "react"
import { Search, Navigation, Sparkles } from "lucide-react"

interface CoursesTabNavigationProps {
    activeTab: "nearby" | "search" | "ai"
    setActiveTab: (tab: "nearby" | "search" | "ai") => void
}

const CoursesTabNavigation: React.FC<CoursesTabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => setActiveTab("nearby")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                        activeTab === "nearby" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Navigation className="w-4 h-4" />
                    <span>내 주변</span>
                </button>
                <button
                    onClick={() => setActiveTab("search")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                        activeTab === "search" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Search className="w-4 h-4" />
                    <span>검색</span>
                </button>
                <button
                    onClick={() => setActiveTab("ai")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                        activeTab === "ai" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Sparkles className="w-4 h-4" />
                    <span>AI 추천</span>
                </button>
            </div>
        </div>
    )
}

export default CoursesTabNavigation
