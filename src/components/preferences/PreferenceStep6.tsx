"use client"

import type React from "react"

interface PreferenceStep6Props {
    selectedCompanions: string[]
    onToggleCompanion: (companion: string) => void
}

const PreferenceStep6: React.FC<PreferenceStep6Props> = ({ selectedCompanions, onToggleCompanion }) => {
    const companions = [
        { id: "alone", label: "혼자서", icon: "🚶", desc: "나만의 시간" },
        { id: "friends", label: "친구와", icon: "👫", desc: "친구들과 함께" },
        { id: "family", label: "가족과", icon: "👨‍👩‍👧‍👦", desc: "가족 단위" },
        { id: "couple", label: "연인과", icon: "💑", desc: "둘만의 시간" },
        { id: "pet", label: "반려동물과", icon: "🐕", desc: "반려동물 동반" },
        { id: "group", label: "그룹 활동", icon: "👥", desc: "단체 활동" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">누구와 함께 하시나요?</h2>
                <p className="text-gray-600">동반자 유형을 선택해주세요 (복수 선택 가능)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {companions.map((companion) => (
                    <button
                        key={companion.id}
                        onClick={() => onToggleCompanion(companion.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                            selectedCompanions.includes(companion.id)
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <div className="text-3xl mb-2">{companion.icon}</div>
                        <div className="font-medium text-gray-900 mb-1">{companion.label}</div>
                        <div className="text-xs text-gray-600">{companion.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PreferenceStep6
