"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Star, ThumbsUp, ThumbsDown, Brain, Send } from "lucide-react"

interface AiFeedbackModalProps {
    isOpen: boolean
    onClose: () => void
    courseName?: string
}

const AiFeedbackModal: React.FC<AiFeedbackModalProps> = ({ isOpen, onClose, courseName = "AI 추천 코스" }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [rating, setRating] = useState(0)
    const [difficulty, setDifficulty] = useState("")
    const [satisfaction, setSatisfaction] = useState("")
    const [feedback, setFeedback] = useState("")
    const [preferences, setPreferences] = useState({
        themes: [] as string[],
        timePreference: "",
        intensity: "",
        region: "",
    })
    const [personalInfo, setPersonalInfo] = useState({
        purpose: [] as string[],
        companion: "",
        frequency: "",
    })

    // 모달 열릴 때 스크롤 막기
    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"

            return () => {
                document.body.style.position = ""
                document.body.style.top = ""
                document.body.style.width = ""
                window.scrollTo(0, scrollY)
            }
        }
    }, [isOpen])

    const handleThemeToggle = (theme: string) => {
        setPreferences((prev) => ({
            ...prev,
            themes: prev.themes.includes(theme) ? prev.themes.filter((t) => t !== theme) : [...prev.themes, theme],
        }))
    }

    const handlePurposeToggle = (purpose: string) => {
        setPersonalInfo((prev) => ({
            ...prev,
            purpose: prev.purpose.includes(purpose) ? prev.purpose.filter((p) => p !== purpose) : [...prev.purpose, purpose],
        }))
    }

    const handleSubmit = () => {
        // 피드백 데이터 처리 로직
        console.log("피드백 제출:", {
            rating,
            difficulty,
            satisfaction,
            feedback,
            preferences,
            personalInfo,
        })
        onClose()
        // 성공 메시지 표시 등
    }

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center pb-20">
            <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[calc(100vh-80px)] overflow-hidden flex flex-col">
                {/* 헤더 */}
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 pt-6 pb-4 relative flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">AI 피드백</h2>
                            <p className="text-purple-100 text-sm">{courseName}</p>
                        </div>
                    </div>

                    {/* 진행 단계 */}
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`flex-1 h-2 rounded-full ${step <= currentStep ? "bg-white" : "bg-white/30"}`}
                            ></div>
                        ))}
                    </div>
                    <p className="text-white/80 text-sm mt-2">단계 {currentStep}/4</p>
                </div>

                {/* 콘텐츠 */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* 1단계: 코스 평가 */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">코스는 어떠셨나요?</h3>

                                {/* 별점 평가 */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">전체 만족도</label>
                                    <div className="flex items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setRating(star)} className="transition-colors">
                                                <Star
                                                    className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 난이도 평가 */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">난이도는 어떠셨나요?</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["너무 쉬움", "적당함", "너무 어려움"].map((level) => (
                                            <button
                                                key={level}
                                                onClick={() => setDifficulty(level)}
                                                className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                                                    difficulty === level
                                                        ? "border-purple-500 bg-purple-50 text-purple-700"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 추천 의향 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">다른 사람에게 추천하시겠어요?</label>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setSatisfaction("추천")}
                                            className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                                                satisfaction === "추천"
                                                    ? "border-green-500 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <ThumbsUp
                                                className={`w-6 h-6 mx-auto mb-2 ${satisfaction === "추천" ? "text-green-600" : "text-gray-400"}`}
                                            />
                                            <p
                                                className={`text-sm font-medium ${satisfaction === "추천" ? "text-green-700" : "text-gray-600"}`}
                                            >
                                                추천해요
                                            </p>
                                        </button>
                                        <button
                                            onClick={() => setSatisfaction("비추천")}
                                            className={`flex-1 p-4 rounded-xl border-2 transition-colors ${
                                                satisfaction === "비추천" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <ThumbsDown
                                                className={`w-6 h-6 mx-auto mb-2 ${satisfaction === "비추천" ? "text-red-600" : "text-gray-400"}`}
                                            />
                                            <p
                                                className={`text-sm font-medium ${satisfaction === "비추천" ? "text-red-700" : "text-gray-600"}`}
                                            >
                                                아쉬워요
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2단계: 상세 피드백 */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">상세한 의견을 들려주세요</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    이 코스의 좋았던 점이나 개선점을 자유롭게 적어주세요
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="예: 경치가 아름다웠어요. 다만 쓰레기통이 부족했습니다..."
                                    className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <h4 className="font-medium text-blue-900 mb-2">💡 이런 점들을 알려주시면 도움이 돼요</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• 코스의 경치나 분위기</li>
                                    <li>• 시설 상태 (화장실, 쓰레기통 등)</li>
                                    <li>• 안전성이나 접근성</li>
                                    <li>• 다른 이용자들과의 경험</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* 3단계: 선호도 설정 */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">선호하는 코스 스타일을 알려주세요</h3>

                            {/* 테마 선호도 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">선호하는 테마 (복수 선택 가능)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: "강변", icon: "🌊" },
                                        { value: "산/숲", icon: "🏔️" },
                                        { value: "도시/공원", icon: "🏙️" },
                                        { value: "해변", icon: "🏖️" },
                                    ].map((theme) => (
                                        <button
                                            key={theme.value}
                                            onClick={() => handleThemeToggle(theme.value)}
                                            className={`p-4 rounded-xl border-2 transition-colors ${
                                                preferences.themes.includes(theme.value)
                                                    ? "border-purple-500 bg-purple-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div className="text-2xl mb-2">{theme.icon}</div>
                                            <p className="text-sm font-medium">{theme.value}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 시간대 선호도 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">선호하는 시간대</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["오전", "오후", "저녁"].map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setPreferences((prev) => ({ ...prev, timePreference: time }))}
                                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                                                preferences.timePreference === time
                                                    ? "border-purple-500 bg-purple-50 text-purple-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 운동 강도 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">선호하는 운동 강도</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["가벼운", "보통", "강한"].map((intensity) => (
                                        <button
                                            key={intensity}
                                            onClick={() => setPreferences((prev) => ({ ...prev, intensity }))}
                                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                                                preferences.intensity === intensity
                                                    ? "border-purple-500 bg-purple-50 text-purple-700"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            {intensity}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4단계: 개인화 정보 */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900">마지막으로 몇 가지만 더 알려주세요</h3>

                            {/* 플로깅 목적 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    플로깅을 하는 주된 목적 (복수 선택 가능)
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: "운동", icon: "💪" },
                                        { value: "환경보호", icon: "🌱" },
                                        { value: "스트레스해소", icon: "😌" },
                                        { value: "사회활동", icon: "👥" },
                                    ].map((purpose) => (
                                        <button
                                            key={purpose.value}
                                            onClick={() => handlePurposeToggle(purpose.value)}
                                            className={`p-4 rounded-xl border-2 transition-colors ${
                                                personalInfo.purpose.includes(purpose.value)
                                                    ? "border-purple-500 bg-purple-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <div className="text-2xl mb-2">{purpose.icon}</div>
                                            <p className="text-sm font-medium">{purpose.value}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 동반자 유형 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">주로 누구와 함께 하시나요?</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["혼자", "친구와", "가족과"].map((companion) => (
                                        <button
                                            key={companion}
                                            onClick={() => setPersonalInfo((prev) => ({ ...prev, companion }))}
                                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                                                personalInfo.companion === companion
                                                    ? "border-purple-500 bg-purple-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            {companion}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 활동 빈도 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">목표 활동 빈도</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {["주 1-2회", "주 3-4회", "주 5회 이상", "가끔씩"].map((frequency) => (
                                        <button
                                            key={frequency}
                                            onClick={() => setPersonalInfo((prev) => ({ ...prev, frequency }))}
                                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                                                personalInfo.frequency === frequency
                                                    ? "border-purple-500 bg-purple-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            {frequency}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 하단 버튼 */}
                <div className="p-6 border-t bg-white flex-shrink-0">
                    <div className="flex space-x-3">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                이전
                            </button>
                        )}
                        {currentStep < 4 ? (
                            <button
                                onClick={nextStep}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
                            >
                                다음
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                            >
                                <Send className="w-4 h-4" />
                                <span>피드백 제출</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiFeedbackModal
