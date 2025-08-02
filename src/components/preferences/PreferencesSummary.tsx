"use client"

import type React from "react"
import { MapPin, Mountain, Clock, Users, Target } from "lucide-react"
import type { UserPreferences } from "@/types"

interface PreferencesSummaryProps {
    preferences: UserPreferences
    onEdit: () => void
}

const PreferencesSummary: React.FC<PreferencesSummaryProps> = ({ preferences, onEdit }) => {
    const getThemeLabel = (theme: string) => {
        const themeMap: Record<string, string> = {
            sea: "바다/해변",
            mountain: "산/등산로",
            urban: "도심/시내",
            park: "공원/녹지",
            river: "강변/호수",
            historic: "역사/문화",
        }
        return themeMap[theme] || theme
    }

    const getDifficultyLabel = (difficulty: string) => {
        const difficultyMap: Record<string, string> = {
            easy: "쉬움",
            medium: "보통",
            hard: "어려움",
        }
        return difficultyMap[difficulty] || difficulty
    }

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">나의 선호도</h3>
                <button onClick={onEdit} className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
                    수정하기
                </button>
            </div>

            <div className="space-y-3">
                {/* 선호 테마 */}
                <div className="flex items-start space-x-3">
                    <Mountain className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-gray-900">선호 테마</div>
                        <div className="text-sm text-gray-600">
                            {preferences.preferredThemes.map((theme) => getThemeLabel(theme)).join(", ")}
                        </div>
                    </div>
                </div>

                {/* 선호 지역 */}
                <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-gray-900">선호 지역</div>
                        <div className="text-sm text-gray-600">
                            {preferences.preferredRegions.slice(0, 2).join(", ")}
                            {preferences.preferredRegions.length > 2 && ` 외 ${preferences.preferredRegions.length - 2}곳`}
                        </div>
                    </div>
                </div>

                {/* 난이도 */}
                <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-gray-900">선호 난이도</div>
                        <div className="text-sm text-gray-600">
                            {getDifficultyLabel(preferences.difficultyLevel)} • {preferences.preferredDistance}
                        </div>
                    </div>
                </div>

                {/* 동반자 */}
                <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-gray-900">주요 동반자</div>
                        <div className="text-sm text-gray-600">
                            {preferences.companionType.slice(0, 2).join(", ")}
                            {preferences.companionType.length > 2 && ` 외 ${preferences.companionType.length - 2}개`}
                        </div>
                    </div>
                </div>

                {/* 활동 목적 */}
                <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="text-sm font-medium text-gray-900">주요 목적</div>
                        <div className="text-sm text-gray-600">
                            {preferences.activityPurpose.slice(0, 2).join(", ")}
                            {preferences.activityPurpose.length > 2 && ` 외 ${preferences.activityPurpose.length - 2}개`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferencesSummary
