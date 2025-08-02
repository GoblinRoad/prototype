"use client"

import type React from "react"

interface PreferenceStep7Props {
    selectedFacilities: string[]
    accessibilityPreference: string
    onToggleFacility: (facility: string) => void
    onSelectAccessibility: (accessibility: string) => void
}

const PreferenceStep7: React.FC<PreferenceStep7Props> = ({
                                                             selectedFacilities,
                                                             accessibilityPreference,
                                                             onToggleFacility,
                                                             onSelectAccessibility,
                                                         }) => {
    const facilities = [
        { id: "restroom", label: "화장실", icon: "🚻" },
        { id: "parking", label: "주차장", icon: "🅿️" },
        { id: "cafe", label: "카페", icon: "☕" },
        { id: "restaurant", label: "음식점", icon: "🍽️" },
        { id: "convenience", label: "편의점", icon: "🏪" },
        { id: "bench", label: "휴식공간", icon: "🪑" },
    ]

    const accessibilityOptions = [
        {
            id: "public_transport",
            label: "대중교통 접근성 중요",
            desc: "지하철, 버스로 쉽게 갈 수 있는 곳",
        },
        { id: "parking_convenience", label: "주차 편의성 중요", desc: "주차하기 편한 곳" },
        { id: "walking_distance", label: "도보 접근성 중요", desc: "집에서 걸어갈 수 있는 곳" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">중요한 시설과 접근성을 선택해주세요</h2>
                <p className="text-gray-600">코스 선택 시 중요하게 생각하는 요소들을 알려주세요</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">중요한 부대시설 (복수 선택 가능)</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {facilities.map((facility) => (
                            <button
                                key={facility.id}
                                onClick={() => onToggleFacility(facility.id)}
                                className={`p-3 rounded-lg border-2 text-center transition-all ${
                                    selectedFacilities.includes(facility.id)
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="text-xl mb-1">{facility.icon}</div>
                                <div className="text-sm font-medium text-gray-900">{facility.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">접근성 선호도</h3>
                    <div className="space-y-3">
                        {accessibilityOptions.map((access) => (
                            <button
                                key={access.id}
                                onClick={() => onSelectAccessibility(access.id)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                    accessibilityPreference === access.id
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="font-medium text-gray-900 mb-1">{access.label}</div>
                                <div className="text-sm text-gray-600">{access.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferenceStep7
