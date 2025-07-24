"use client"

import type React from "react"

interface CourseDetailTabNavigationProps {
    activeTab: "overview" | "spots" | "reviews"
    setActiveTab: (tab: "overview" | "spots" | "reviews") => void
}

const CourseDetailTabNavigation: React.FC<CourseDetailTabNavigationProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-white px-4 py-3 border-b">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "overview" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    개요
                </button>
                <button
                    onClick={() => setActiveTab("spots")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "spots" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    주변 관광지
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "reviews" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                    리뷰
                </button>
            </div>
        </div>
    )
}

export default CourseDetailTabNavigation
