import type React from "react"

interface CourseOverviewSectionProps {
    description: string
    highlights: string[]
    startPoint: string
    endPoint: string
    elevation: string
    surface: string
    cleanupSpots: number
}

const CourseOverviewSection: React.FC<CourseOverviewSectionProps> = ({
                                                                         description,
                                                                         highlights,
                                                                         startPoint,
                                                                         endPoint,
                                                                         elevation,
                                                                         surface,
                                                                         cleanupSpots,
                                                                     }) => {
    return (
        <div className="p-4 space-y-4">
            {/* 코스 설명 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">코스 소개</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>

            {/* 코스 하이라이트 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">코스 특징</h3>
                <div className="space-y-2">
                    {highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-sm text-gray-600">{highlight}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 코스 정보 */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">상세 정보</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">출발지</span>
                        <span className="text-sm font-medium">{startPoint}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">도착지</span>
                        <span className="text-sm font-medium">{endPoint}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">고도</span>
                        <span className="text-sm font-medium">{elevation}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">노면 상태</span>
                        <span className="text-sm font-medium">{surface}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600">정리 지점</span>
                        <span className="text-sm font-medium">{cleanupSpots}개소</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseOverviewSection
