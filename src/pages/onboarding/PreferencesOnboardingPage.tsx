"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import type { UserPreferences } from "@/types"
import PreferenceHeader from "@/components/preferences/PreferenceHeader"
import PreferenceFooter from "@/components/preferences/PreferenceFooter"
import PreferenceStep1 from "@/components/preferences/PreferenceStep1"
import PreferenceStep2 from "@/components/preferences/PreferenceStep2"
import PreferenceStep3 from "@/components/preferences/PreferenceStep3"
import PreferenceStep4 from "@/components/preferences/PreferenceStep4"
import PreferenceStep5 from "@/components/preferences/PreferenceStep5"
import PreferenceStep6 from "@/components/preferences/PreferenceStep6"
import PreferenceStep7 from "@/components/preferences/PreferenceStep7"
import PreferenceStep8 from "@/components/preferences/PreferenceStep8"

const PreferencesOnboardingPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 8
    const [isEditing, setIsEditing] = useState(false)

    const [preferences, setPreferences] = useState<UserPreferences>({
        preferredThemes: [],
        preferredRegions: [],
        difficultyLevel: "",
        exerciseIntensity: "",
        preferredDistance: "",
        preferredTimeSlots: [],
        preferredSeasons: [],
        companionType: [],
        importantFacilities: [],
        accessibilityPreference: "",
        sceneryPreference: [],
        activityPurpose: [],
        courseType: "",
        weatherPreference: [],
    })

    // 기존 선호도 데이터 로드 (수정 모드인 경우)
    useEffect(() => {
        const savedPreferences = localStorage.getItem("userPreferences")
        if (savedPreferences) {
            const parsed = JSON.parse(savedPreferences)
            setPreferences(parsed)
            setIsEditing(true)
        }
    }, [])

    const updatePreferences = (key: keyof UserPreferences, value: any) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const toggleArrayPreference = (key: keyof UserPreferences, value: string) => {
        const currentArray = preferences[key] as string[]
        const newArray = currentArray.includes(value)
            ? currentArray.filter((item) => item !== value)
            : [...currentArray, value]
        updatePreferences(key, newArray)
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        } else {
            handleComplete()
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleComplete = () => {
        // 선호도 정보를 로컬 스토리지에 저장
        localStorage.setItem("userPreferences", JSON.stringify(preferences))

        // 배너 해제
        localStorage.removeItem("preferenceBannerDismissed")

        console.log("사용자 선호도:", preferences)

        const message = isEditing ? "선호도가 업데이트되었습니다!" : "선호도 설정이 완료되었습니다!"
        alert(message)

        // 이전 페이지로 돌아가거나 AI 추천 탭으로 이동
        const from = location.state?.from
        if (from) {
            navigate(from)
        } else {
            navigate("/courses?tab=ai")
        }
    }

    const handleBack = () => {
        const from = location.state?.from
        if (from) {
            navigate(from)
        } else {
            navigate(-1)
        }
    }

    // 각 단계별 진행 가능 여부 확인
    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return preferences.preferredThemes.length > 0
            case 2:
                return preferences.preferredRegions.length > 0
            case 3:
                return !!preferences.difficultyLevel
            case 4:
                return !!preferences.exerciseIntensity && !!preferences.preferredDistance
            case 5:
                return preferences.preferredTimeSlots.length > 0 && preferences.preferredSeasons.length > 0
            case 6:
                return preferences.companionType.length > 0
            case 7:
                return !!preferences.accessibilityPreference && preferences.importantFacilities.length > 0
            case 8:
                return preferences.activityPurpose.length > 0 && !!preferences.courseType
            default:
                return false
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PreferenceStep1
                        selectedThemes={preferences.preferredThemes}
                        onToggleTheme={(theme) => toggleArrayPreference("preferredThemes", theme)}
                    />
                )
            case 2:
                return (
                    <PreferenceStep2
                        selectedRegions={preferences.preferredRegions}
                        onToggleRegion={(region) => toggleArrayPreference("preferredRegions", region)}
                    />
                )
            case 3:
                return (
                    <PreferenceStep3
                        selectedDifficulty={preferences.difficultyLevel}
                        onSelectDifficulty={(difficulty) => updatePreferences("difficultyLevel", difficulty)}
                    />
                )
            case 4:
                return (
                    <PreferenceStep4
                        exerciseIntensity={preferences.exerciseIntensity}
                        preferredDistance={preferences.preferredDistance}
                        onSelectIntensity={(intensity) => updatePreferences("exerciseIntensity", intensity)}
                        onSelectDistance={(distance) => updatePreferences("preferredDistance", distance)}
                    />
                )
            case 5:
                return (
                    <PreferenceStep5
                        selectedTimeSlots={preferences.preferredTimeSlots}
                        selectedSeasons={preferences.preferredSeasons}
                        onToggleTimeSlot={(timeSlot) => toggleArrayPreference("preferredTimeSlots", timeSlot)}
                        onToggleSeason={(season) => toggleArrayPreference("preferredSeasons", season)}
                    />
                )
            case 6:
                return (
                    <PreferenceStep6
                        selectedCompanions={preferences.companionType}
                        onToggleCompanion={(companion) => toggleArrayPreference("companionType", companion)}
                    />
                )
            case 7:
                return (
                    <PreferenceStep7
                        selectedFacilities={preferences.importantFacilities}
                        accessibilityPreference={preferences.accessibilityPreference}
                        onToggleFacility={(facility) => toggleArrayPreference("importantFacilities", facility)}
                        onSelectAccessibility={(accessibility) => updatePreferences("accessibilityPreference", accessibility)}
                    />
                )
            case 8:
                return (
                    <PreferenceStep8
                        selectedPurposes={preferences.activityPurpose}
                        courseType={preferences.courseType}
                        onTogglePurpose={(purpose) => toggleArrayPreference("activityPurpose", purpose)}
                        onSelectCourseType={(type) => updatePreferences("courseType", type)}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto w-full">
            {/* 헤더 */}
            <PreferenceHeader
                currentStep={currentStep}
                totalSteps={totalSteps}
                isEditing={isEditing}
                onPrevious={handlePrevious}
                onBack={handleBack}
            />

            {/* 콘텐츠 */}
            <div className="flex-1 overflow-y-auto p-4">{renderStepContent()}</div>

            {/* 푸터 */}
            <PreferenceFooter
                currentStep={currentStep}
                totalSteps={totalSteps}
                isEditing={isEditing}
                canProceed={canProceed()}
                onNext={handleNext}
            />
        </div>
    )
}

export default PreferencesOnboardingPage
