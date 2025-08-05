"use client"

import type React from "react"

interface PreferenceStep8Props {
    selectedPurposes: string[]
    courseType: string
    onTogglePurpose: (purpose: string) => void
    onSelectCourseType: (type: string) => void
}

const PreferenceStep8: React.FC<PreferenceStep8Props> = ({
                                                             selectedPurposes,
                                                             courseType,
                                                             onTogglePurpose,
                                                             onSelectCourseType,
                                                         }) => {
    const purposes = [
        { id: "exercise", label: "운동/건강", icon: "💪", desc: "체력 증진이 목표" },
        { id: "healing", label: "힐링/휴식", icon: "🧘", desc: "스트레스 해소" },
        { id: "photography", label: "사진촬영", icon: "📸", desc: "아름다운 순간 기록" },
        { id: "environment", label: "환경보호", icon: "🌱", desc: "지구를 위한 실천" },
        { id: "social", label: "사회적 활동", icon: "🤝", desc: "사람들과의 만남" },
        { id: "exploration", label: "탐험/발견", icon: "🗺️", desc: "새로운 장소 발견" },
    ]

    const courseTypes = [
        { id: "circular", label: "순환형 코스", desc: "시작점과 끝점이 같은 원형 코스" },
        { id: "linear", label: "직선형 코스", desc: "시작점에서 목적지까지 일직선" },
        { id: "mixed", label: "상관없음", desc: "코스 형태는 중요하지 않음" },
    ]

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">마지막으로, 플로깅의 목적을 알려주세요</h2>
                <p className="text-gray-600">어떤 목적으로 플로깅을 하시나요?</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">활동 목적 (복수 선택 가능)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {purposes.map((purpose) => (
                            <button
                                key={purpose.id}
                                onClick={() => onTogglePurpose(purpose.id)}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${
                                    selectedPurposes.includes(purpose.id)
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="text-2xl mb-2">{purpose.icon}</div>
                                <div className="font-medium text-gray-900 mb-1">{purpose.label}</div>
                                <div className="text-xs text-gray-600">{purpose.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">선호하는 코스 형태</h3>
                    <div className="space-y-3">
                        {courseTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => onSelectCourseType(type.id)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                    courseType === type.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="font-medium text-gray-900 mb-1">{type.label}</div>
                                <div className="text-sm text-gray-600">{type.desc}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferenceStep8
