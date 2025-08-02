"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"

interface PreferenceHeaderProps {
    currentStep: number
    totalSteps: number
    isEditing: boolean
    onPrevious: () => void
    onBack: () => void
}

const PreferenceHeader: React.FC<PreferenceHeaderProps> = ({
                                                               currentStep,
                                                               totalSteps,
                                                               isEditing,
                                                               onPrevious,
                                                               onBack,
                                                           }) => {
    return (
        <>
            {/* 헤더 */}
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {currentStep > 1 ? (
                            <button onClick={onPrevious} className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        ) : (
                            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <h1 className="text-lg font-semibold text-gray-900">{isEditing ? "선호도 수정" : "맞춤 추천 설정"}</h1>
                    </div>
                    <span className="text-sm text-gray-500">
            {currentStep}/{totalSteps}
          </span>
                </div>
            </div>

            {/* 진행률 표시 */}
            <div className="bg-white px-4 pb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
            </div>
        </>
    )
}

export default PreferenceHeader
