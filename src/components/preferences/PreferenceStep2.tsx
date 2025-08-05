"use client"

import type React from "react"
import { Check } from 'lucide-react'

interface PreferenceStep2Props {
    selectedRegions: string[]
    onToggleRegion: (region: string) => void
}

const PreferenceStep2: React.FC<PreferenceStep2Props> = ({ selectedRegions, onToggleRegion }) => {
    const regions = [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        "세종특별자치시",
        "경기도",
        "강원도",
        "충청북도",
        "충청남도",
        "전라북도",
        "전라남도",
        "경상북도",
        "경상남도",
        "제주특별자치도",
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">선호하는 지역을 선택해주세요</h2>
                <p className="text-gray-600">주로 활동하고 싶은 지역을 선택해주세요</p>
            </div>

            <div className="space-y-3">
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => onToggleRegion(region)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                            selectedRegions.includes(region)
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{region}</span>
                            {selectedRegions.includes(region) && <Check className="w-5 h-5 text-emerald-600" />}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PreferenceStep2
