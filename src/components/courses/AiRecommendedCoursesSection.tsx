import type React from "react"
import { Sparkles } from "lucide-react"
import type { Course } from "../../types"
import CourseCard from "./CourseCard"

interface AiRecommendedCoursesSectionProps {
    courses: Course[]
    onCourseClick: (courseId: string) => void
}

const AiRecommendedCoursesSection: React.FC<AiRecommendedCoursesSectionProps> = ({ courses, onCourseClick }) => {
    return (
        <div className="p-4">
            {/* AI 추천 설명 */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-gray-900">AI 맞춤 추천</h2>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                    당신의 활동 기록과 선호도를 분석하여 최적의 플로깅 코스를 추천합니다.
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>• 개인 난이도 맞춤</span>
                    <span>• 날씨 고려</span>
                    <span>• 선호 테마 반영</span>
                </div>
            </div>

            {/* 추천 이유 */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">오늘의 추천 이유</h3>
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>현재 날씨가 플로깅하기 좋음</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>당신의 평균 활동 수준에 적합</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>강변 테마를 선호하는 패턴 감지</span>
                    </div>
                </div>
            </div>

            {/* AI 추천 코스 */}
            <div className="space-y-3">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
                ))}
            </div>

            {/* AI 학습 정보 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">AI가 더 정확해지도록 도와주세요</h4>
                <p className="text-sm text-gray-600 mb-3">
                    플로깅 완료 후 코스 평가를 남겨주시면 더 나은 추천을 받을 수 있습니다.
                </p>
                <button className="text-sm text-emerald-600 font-medium">피드백 남기기 →</button>
            </div>
        </div>
    )
}

export default AiRecommendedCoursesSection
