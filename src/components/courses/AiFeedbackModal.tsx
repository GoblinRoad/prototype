"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Settings, Target, Sparkles, TrendingUp } from "lucide-react"
import type { Course } from "@/types"
import type { UserPreferences } from "@/types"
import CourseCard from "./CourseCard"

interface AiRecommendedCoursesSectionProps {
    courses: Course[]
    onCourseClick: (courseId: string) => void
    onSetupPreferences?: () => void
}

const AiRecommendedCoursesSection: React.FC<AiRecommendedCoursesSectionProps> = ({
                                                                                     courses,
                                                                                     onCourseClick,
                                                                                     onSetupPreferences,
                                                                                 }) => {
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // 선호도 데이터 로드
        const savedPreferences = localStorage.getItem("userPreferences")
        if (savedPreferences) {
            setUserPreferences(JSON.parse(savedPreferences))
        }
        setIsLoading(false)
    }, [])

    // 선호도가 설정되지 않은 경우
    if (!isLoading && !userPreferences) {
        return (
            <div className="px-4 py-8">
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-emerald-600" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">AI 맞춤 추천을 시작해보세요!</h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                        선호도를 설정하면 AI가 분석하여
                        <br />딱 맞는 플로깅 코스를 추천해드려요
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Target className="w-6 h-6 text-emerald-600" />
                            </div>
                            <span className="text-xs text-gray-600">개인 맞춤</span>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <TrendingUp className="w-6 h-6 text-cyan-600" />
                            </div>
                            <span className="text-xs text-gray-600">정확한 추천</span>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Sparkles className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-xs text-gray-600">AI 분석</span>
                        </div>
                    </div>

                    <button
                        onClick={onSetupPreferences}
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 shadow-lg"
                    >
                        선호도 설정하기
                    </button>
                </div>
            </div>
        )
    }

    // 선호도가 설정된 경우 - 기존 추천 코스 표시
    return (
        <div className="px-4 py-6">
            {/* AI 추천 헤더 */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">AI 맞춤 추천</h2>
                        <p className="text-xs text-gray-600">당신의 취향을 분석한 결과예요</p>
                    </div>
                </div>

                <button
                    onClick={onSetupPreferences}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <Settings className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">설정</span>
                </button>
            </div>

            {/* 추천 이유 표시 */}
            {userPreferences && (
                <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl p-4 mb-6 border border-emerald-100">
                    <h3 className="font-semibold text-gray-900 mb-2">추천 이유</h3>
                    <div className="flex flex-wrap gap-2">
                        {userPreferences.preferredThemes.slice(0, 2).map((theme) => (
                            <span key={theme} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                {theme === "sea" ? "바다" : theme === "mountain" ? "산" : theme === "park" ? "공원" : theme}
              </span>
                        ))}
                        <span className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
              {userPreferences.difficultyLevel === "easy"
                  ? "쉬운 난이도"
                  : userPreferences.difficultyLevel === "medium"
                      ? "보통 난이도"
                      : "어려운 난이도"}
            </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {userPreferences.preferredDistance}
            </span>
                    </div>
                </div>
            )}

            {/* 추천 코스 목록 */}
            <div className="space-y-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 mb-4">추천할 코스를 준비 중이에요</p>
                        <p className="text-sm text-gray-500">잠시 후 다시 확인해주세요</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiRecommendedCoursesSection
