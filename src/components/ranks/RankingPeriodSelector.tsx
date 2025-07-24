"use client"

import type React from "react"

interface RankingPeriodSelectorProps {
    rankingPeriod: "weekly" | "monthly"
    setRankingPeriod: (period: "weekly" | "monthly") => void
}

const RankingPeriodSelector: React.FC<RankingPeriodSelectorProps> = ({ rankingPeriod, setRankingPeriod }) => {
    return (
        <div className="bg-white rounded-lg p-1 flex mb-4 shadow-sm">
            <button
                onClick={() => setRankingPeriod("weekly")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    rankingPeriod === "weekly" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                주간
            </button>
            <button
                onClick={() => setRankingPeriod("monthly")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    rankingPeriod === "monthly" ? "bg-blue-100 text-blue-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                월간
            </button>
        </div>
    )
}

export default RankingPeriodSelector
