"use client"

import type React from "react"
import { ArrowRight, Check } from "lucide-react"

interface PreferenceFooterProps {
    currentStep: number
    totalSteps: number
    isEditing: boolean
    canProceed: boolean
    onNext: () => void
}

const PreferenceFooter: React.FC<PreferenceFooterProps> = ({
                                                               currentStep,
                                                               totalSteps,
                                                               isEditing,
                                                               canProceed,
                                                               onNext,
                                                           }) => {
    return (
        <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <button
                onClick={onNext}
                disabled={!canProceed}
                className="w-full flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                {currentStep === totalSteps ? (
                    <>
                        <Check className="w-5 h-5 mr-2" />
                        {isEditing ? "수정 완료" : "완료하기"}
                    </>
                ) : (
                    <>
                        다음
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                )}
            </button>
        </div>
    )
}

export default PreferenceFooter
