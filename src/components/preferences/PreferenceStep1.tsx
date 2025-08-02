"use client"

import type React from "react"
import { Mountain, Waves, Building, TreePine } from 'lucide-react'

interface PreferenceStep1Props {
    selectedThemes: string[]
    onToggleTheme: (theme: string) => void
}

const PreferenceStep1: React.FC<PreferenceStep1Props> = ({ selectedThemes, onToggleTheme }) => {
    const themes = [
        { id: "sea", label: "바다/해변", icon: Waves, color: "bg-blue-100 text-blue-600" },
        { id: "mountain", label: "산/등산로", icon: Mountain, color: "bg-green-100 text-green-600" },
        { id: "urban", label: "도심/시내", icon: Building, color: "bg-gray-100 text-gray-600" },
        { id: "park", label: "공원/녹지", icon: TreePine, color: "bg-emerald-100 text-emerald-600" },
        { id: "river", label: "강변/호수", icon: Waves, color: "bg-cyan-100 text-cyan-600" },
        { id: "historic", label: "역사/문화", icon: Building, color: "bg-amber-100 text-amber-600" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">선호하는 테마를 선택해주세요</h2>
                <p className="text-gray-600">여러 개를 선택할 수 있어요</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => onToggleTheme(theme.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                            selectedThemes.includes(theme.id)
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <div className={`w-12 h-12 rounded-lg ${theme.color} flex items-center justify-center mx-auto mb-2`}>
                            <theme.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{theme.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PreferenceStep1
