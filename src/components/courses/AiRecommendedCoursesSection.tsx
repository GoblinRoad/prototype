"use client"

import type React from "react"
import { Sparkles, Cloud, TrendingUp, Heart, Star, Brain, Zap } from "lucide-react"
import type { Course } from "@/types"
import CourseCard from "./CourseCard"
import AiFeedbackModal from "./AiFeedbackModal"
import { useState } from "react"

interface AiRecommendedCoursesSectionProps {
    courses: Course[]
    onCourseClick: (courseId: string) => void
}

const AiRecommendedCoursesSection: React.FC<AiRecommendedCoursesSectionProps> = ({ courses, onCourseClick }) => {
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
    const [selectedCourseName, setSelectedCourseName] = useState<string>("")


    const handleCourseClick = (courseId: string, courseName: string) => {
        onCourseClick(courseId)
        setSelectedCourseName(courseName)
        setIsFeedbackModalOpen(true)
    }


    return (
        <div className="p-4">
            {/* AI 추천 헤더 - 강화된 디자인 */}
            <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-2xl p-6 mb-6 relative overflow-hidden">
                {/* 배경 장식 요소 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-white animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">AI 맞춤 추천</h2>
                            <p className="text-purple-100 text-sm">당신만을 위한 특별한 코스</p>
                        </div>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                        머신러닝 알고리즘이 당신의 활동 패턴, 선호도, 현재 날씨를 종합 분석하여 최적의 플로깅 코스를 추천합니다.
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-purple-100">
                        <div className="flex items-center space-x-1">
                            <Brain className="w-3 h-3" />
                            <span>개인화 AI</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Cloud className="w-3 h-3" />
                            <span>실시간 날씨</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>학습 기반</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 추천 이유 카드들 */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-amber-500 mr-2" />
                    오늘의 추천 이유
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                <Cloud className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-blue-900">완벽한 날씨 조건</h4>
                                <p className="text-sm text-blue-700">현재 기온 22°C, 미세먼지 좋음으로 플로깅하기 최적</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-emerald-900">활동 수준 맞춤</h4>
                                <p className="text-sm text-emerald-700">당신의 평균 운동 강도와 지구력에 ���적화된 코스</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-purple-900">선호 패턴 반영</h4>
                                <p className="text-sm text-purple-700">강변 테마와 중간 난이도를 선호하는 패턴 감지</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 추천 코스 */}
            <div className="space-y-3 mb-6">
                {courses.map((course) => (
                    <div key={course.id} className="relative">
                        {/* AI 추천 뱃지 */}
                        <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                                <Sparkles className="w-3 h-3" />
                                <span>AI</span>
                            </div>
                        </div>
                        <CourseCard course={course} onCourseClick={() => handleCourseClick(course.id, course.name)} />
                    </div>
                ))}
            </div>

            {/* AI 학습 정보 - 개선된 디자인 */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900">AI가 더 똑똑해지도록 도와주세요</h4>
                        <p className="text-sm text-gray-600">학습 진행률 78%</p>
                    </div>
                </div>

                {/* 진행률 바 */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: "78%" }}
                    ></div>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    플로깅 완료 후 코스 평가와 피드백을 남겨주시면, AI가 당신의 취향을 더 정확히 파악하여 맞춤형 추천의 정확도가
                    향상됩니다.
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>평가 23개</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-red-500" />
                            <span>선호도 학습중</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsFeedbackModalOpen(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                        피드백 남기기
                    </button>
                </div>
            </div>

            {/* AI 피드백 모달 */}
            <AiFeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                courseName={selectedCourseName}
            />

        </div>
    )
}

export default AiRecommendedCoursesSection
