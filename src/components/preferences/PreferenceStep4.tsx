"use client"

import type React from "react"

interface PreferenceStep4Props {
    exerciseIntensity: string
    preferredDistance: string
    onSelectIntensity: (intensity: string) => void
    onSelectDistance: (distance: string) => void
}

const PreferenceStep4: React.FC<PreferenceStep4Props> = ({
                                                             exerciseIntensity,
                                                             preferredDistance,
                                                             onSelectIntensity,
                                                             onSelectDistance,
                                                         }) => {
    const intensityOptions = [
        { id: "light", label: "가벼운 산책" },
        { id: "moderate", label: "적당한 운동" },
        { id: "intense", label: "강한 운동" },
    ]

    const distanceOptions = [
        { id: "1-3km", label: "1-3km (짧은 거리)" },
        { id: "3-5km", label: "3-5km (적당한 거리)" },
        { id: "5-10km", label: "5-10km (긴 거리)" },
        { id: "10km+", label: "10km+ (매우 긴 거리)" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">운동 강도와 거리를 선택해주세요</h2>
                <p className="text-gray-600">평소 선호하는 운동 강도와 거리를 알려주세요</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">운동 강도</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {intensityOptions.map((intensity) => (
                            <button
                                key={intensity.id}
                                onClick={() => onSelectIntensity(intensity.id)}
                                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                    exerciseIntensity === intensity.id
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                                }`}
                            >
                                {intensity.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">선호 거리</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {distanceOptions.map((distance) => (
                            <button
                                key={distance.id}
                                onClick={() => onSelectDistance(distance.id)}
                                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                    preferredDistance === distance.id
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                                }`}
                            >
                                {distance.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferenceStep4
