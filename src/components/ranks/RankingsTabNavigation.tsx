"use client"

import type React from "react"

interface RankingsTabNavigationProps {
    activeTab: "rankings" | "achievements"
    setActiveTab: (tab: "rankings" | "achievements") => void
}

const RankingsTabNavigation: React.FC<RankingsTabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => setActiveTab("rankings")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "rankings" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    랭킹
                </button>
                <button
                    onClick={() => setActiveTab("achievements")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "achievements" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    업적
                </button>
            </div>
        </div>
    )
}

export default RankingsTabNavigation
