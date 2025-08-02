"use client"

import type React from "react"
import { Search, Navigation, Sparkles, Users } from "lucide-react" // Users 아이콘 추가

interface CoursesTabNavigationProps {
    activeTab: "nearby" | "search" | "ai" | "group" // 'group' 탭 추가
    setActiveTab: (tab: "nearby" | "search" | "ai" | "group") => void // 'group' 탭 추가
}

const CoursesTabNavigation: React.FC<CoursesTabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white px-4 py-3 border-b">
            <div className="flex flex-nowrap space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab("nearby")}
                    className={`flex-1 flex-shrink-0 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 whitespace-nowrap ${
                        // flex-1 추가
                        activeTab === "nearby" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Navigation className="w-4 h-4" />
                    <span>내 주변</span>
                </button>
                <button
                    onClick={() => setActiveTab("search")}
                    className={`flex-1 flex-shrink-0 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 whitespace-nowrap ${
                        // flex-1 추가
                        activeTab === "search" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Search className="w-4 h-4" />
                    <span>검색</span>
                </button>
                <button
                    onClick={() => setActiveTab("ai")}
                    className={`flex-1 flex-shrink-0 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 whitespace-nowrap ${
                        // flex-1 추가
                        activeTab === "ai" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Sparkles className="w-4 h-4" />
                    <span>AI 추천</span>
                </button>
                {/* 새로운 '그룹 플로깅' 탭 추가 */}
                <button
                    onClick={() => setActiveTab("group")}
                    className={`flex-1 flex-shrink-0 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 whitespace-nowrap ${
                        // flex-1 추가
                        activeTab === "group" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    <Users className="w-4 h-4" />
                    <span>그룹 플로깅</span>
                </button>
            </div>
        </div>
    )
}

export default CoursesTabNavigation
