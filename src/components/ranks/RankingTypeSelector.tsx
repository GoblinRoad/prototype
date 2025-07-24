"use client"

import type React from "react"

interface RankingTypeSelectorProps {
    rankingType: "distance" | "cleanups" | "points"
    setRankingType: (type: "distance" | "cleanups" | "points") => void
}

const RankingTypeSelector: React.FC<RankingTypeSelectorProps> = ({ rankingType, setRankingType }) => {
    return (
        <div className="bg-white rounded-lg p-1 flex mb-6 shadow-sm">
            <button
                onClick={() => setRankingType("distance")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    rankingType === "distance" ? "bg-emerald-100 text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                거리
            </button>
            <button
                onClick={() => setRankingType("cleanups")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    rankingType === "cleanups" ? "bg-emerald-100 text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                정리
            </button>
            <button
                onClick={() => setRankingType("points")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    rankingType === "points" ? "bg-emerald-100 text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                점수
            </button>
        </div>
    )
}

export default RankingTypeSelector
