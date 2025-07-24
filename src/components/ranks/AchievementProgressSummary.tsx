import type React from "react"
import type { Achievement } from "../../types"

interface AchievementProgressSummaryProps {
    achievements: Achievement[]
}

const AchievementProgressSummary: React.FC<AchievementProgressSummaryProps> = ({ achievements }) => {
    const unlockedCount = achievements.filter((a) => a.isUnlocked).length
    const totalCount = achievements.length
    const progressPercentage = (unlockedCount / totalCount) * 100

    return (
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">업적 진행률</h3>
                <span className="text-sm text-emerald-600 font-medium">
          {unlockedCount}/{totalCount}
        </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
    )
}

export default AchievementProgressSummary
