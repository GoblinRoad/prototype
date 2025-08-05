"use client"

import type React from "react"

interface PreferenceStep5Props {
    selectedTimeSlots: string[]
    selectedSeasons: string[]
    onToggleTimeSlot: (timeSlot: string) => void
    onToggleSeason: (season: string) => void
}

const PreferenceStep5: React.FC<PreferenceStep5Props> = ({
                                                             selectedTimeSlots,
                                                             selectedSeasons,
                                                             onToggleTimeSlot,
                                                             onToggleSeason,
                                                         }) => {
    const timeSlots = [
        { id: "morning", label: "아침 (6-10시)", icon: "🌅" },
        { id: "afternoon", label: "오후 (12-17시)", icon: "☀️" },
        { id: "evening", label: "저녁 (17-20시)", icon: "🌆" },
    ]

    const seasons = [
        { id: "spring", label: "봄", icon: "🌸" },
        { id: "summer", label: "여름", icon: "☀️" },
        { id: "autumn", label: "가을", icon: "🍂" },
        { id: "winter", label: "겨울", icon: "❄️" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">선호하는 시간대와 계절을 알려주세요</h2>
                <p className="text-gray-600">언제 플로깅을 즐기시나요?</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">선호 시간대 (복수 선택 가능)</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                            <button
                                key={time.id}
                                onClick={() => onToggleTimeSlot(time.id)}
                                className={`p-3 rounded-lg border-2 text-center transition-all ${
                                    selectedTimeSlots.includes(time.id)
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="text-2xl mb-1">{time.icon}</div>
                                <div className="text-xs font-medium text-gray-900">{time.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">선호 계절 (복수 선택 가능)</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {seasons.map((season) => (
                            <button
                                key={season.id}
                                onClick={() => onToggleSeason(season.id)}
                                className={`p-3 rounded-lg border-2 text-center transition-all ${
                                    selectedSeasons.includes(season.id)
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="text-2xl mb-1">{season.icon}</div>
                                <div className="text-xs font-medium text-gray-900">{season.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferenceStep5
