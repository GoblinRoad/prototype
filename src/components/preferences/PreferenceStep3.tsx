"use client"

import type React from "react"
import { Zap } from "lucide-react"

interface PreferenceStep3Props {
    selectedDifficulty: string
    onSelectDifficulty: (difficulty: string) => void
}

const PreferenceStep3: React.FC<PreferenceStep3Props> = ({ selectedDifficulty, onSelectDifficulty }) => {
    const difficultyLevels = [
        { id: "easy", label: "쉬움", desc: "평지 위주, 짧은 거리", color: "bg-green-100 text-green-600" },
        { id: "medium", label: "보통", desc: "약간의 경사, 적당한 거리", color: "bg-yellow-100 text-yellow-600" },
        { id: "hard", label: "어려움", desc: "가파른 경사, 긴 거리", color: "bg-red-100 text-red-600" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">선호하는 난이도를 선택해주세요</h2>
                <p className="text-gray-600">평소 운동 수준에 맞는 난이도를 선택해주세요</p>
            </div>

            <div className="space-y-4">
                {difficultyLevels.map((level) => (
                    <button
                        key={level.id}
                        onClick={() => onSelectDifficulty(level.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedDifficulty === level.id
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${level.color} flex items-center justify-center`}>
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{level.label}</div>
                                <div className="text-sm text-gray-600">{level.desc}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PreferenceStep3
