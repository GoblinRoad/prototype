import type React from "react"
import { Star, Target, Trash2, MapPin, Calendar, Award, Lock, Medal } from "lucide-react"
import type { Achievement } from "../../types"

interface AchievementListProps {
    achievements: Achievement[]
}

const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
        case "star":
            return <Star className="w-6 h-6" />
        case "target":
            return <Target className="w-6 h-6" />
        case "trash":
            return <Trash2 className="w-6 h-6" />
        case "map":
            return <MapPin className="w-6 h-6" />
        case "calendar":
            return <Calendar className="w-6 h-6" />
        case "award":
            return <Award className="w-6 h-6" />
        default:
            return <Medal className="w-6 h-6" />
    }
}

const getCategoryName = (category: string) => {
    switch (category) {
        case "milestone":
            return "기념일"
        case "distance":
            return "거리"
        case "cleanup":
            return "정리"
        case "region":
            return "지역"
        case "streak":
            return "연속"
        default:
            return "기타"
    }
}

const AchievementList: React.FC<AchievementListProps> = ({ achievements }) => {
    return (
        <div className="space-y-3">
            {achievements.map((achievement) => (
                <div
                    key={achievement.id}
                    className={`rounded-xl p-4 ${
                        achievement.isUnlocked ? "bg-white shadow-sm" : "bg-gray-100 border-2 border-dashed border-gray-300"
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.isUnlocked ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                            }`}
                        >
                            {achievement.isUnlocked ? getAchievementIcon(achievement.icon) : <Lock className="w-6 h-6" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`font-semibold ${achievement.isUnlocked ? "text-gray-900" : "text-gray-500"}`}>
                                    {achievement.title}
                                </h3>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        achievement.isUnlocked ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                  {getCategoryName(achievement.category)}
                </span>
                            </div>
                            <p className={`text-sm ${achievement.isUnlocked ? "text-gray-600" : "text-gray-400"}`}>
                                {achievement.description}
                            </p>
                            {achievement.isUnlocked && achievement.unlockedAt && (
                                <p className="text-xs text-emerald-600 mt-1">{achievement.unlockedAt} 달성</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AchievementList
