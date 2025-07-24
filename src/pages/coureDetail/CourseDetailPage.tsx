"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { CourseDetail, TouristSpot } from "@/types"
import CourseDetailHeader from "@/components/courseDetails/CourseDetailHeader"
import CourseMapSection from "@/components/courseDetails/CourseMapSection"
import CourseBasicInfo from "@/components/courseDetails/CourseBasicInfo"
import CourseDetailTabNavigation from "@/components/courseDetails/CourseDetailTabNavigation"
import CourseOverviewSection from "@/components/courseDetails/CourseOverviewSection"
import TouristSpotsSection from "@/components/courseDetails/TouristSpotsSection"
import CourseReviewsSection from "@/components/courseDetails/CourseReviewsSection"

const CourseDetailPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<"overview" | "spots" | "reviews">("overview")
    const [isLiked, setIsLiked] = useState(false)
    const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null)
    const [loading, setLoading] = useState(true)

    // 코스 데이터 (실제로는 API에서 가져올 데이터)
    const coursesData: Record<string, CourseDetail> = {
        "1": {
            id: "1",
            name: "한강공원 플로깅 코스",
            location: "서울 마포구 망원한강공원",
            distance: "3.2 km",
            difficulty: "쉬움",
            estimatedTime: "25분",
            cleanupSpots: 8,
            rating: 4.8,
            reviewCount: 124,
            description:
                "한강을 따라 걷는 아름다운 플로깅 코스입니다. 평평한 길로 구성되어 있어 초보자도 쉽게 도전할 수 있으며, 강변의 멋진 경치를 감상하며 환경보호에 동참할 수 있습니다.",
            highlights: [
                "한강의 아름다운 일몰 경관",
                "넓은 잔디밭과 휴식 공간",
                "자전거 도로와 분리된 안전한 보행로",
                "충분한 쓰레기통과 화장실 시설",
            ],
            startPoint: "망원한강공원 주차장",
            endPoint: "양화대교 남단",
            elevation: "평지 (고도차 거의 없음)",
            surface: "포장도로 90%, 흙길 10%",
        },
        "2": {
            id: "2",
            name: "올림픽공원 둘레길",
            location: "서울 송파구 올림픽공원",
            distance: "5.1 km",
            difficulty: "보통",
            estimatedTime: "40분",
            cleanupSpots: 12,
            rating: 4.6,
            reviewCount: 87,
            description:
                "올림픽공원을 둘러싸는 아름다운 둘레길입니다. 다양한 조각품과 녹지를 감상하며 플로깅할 수 있으며, 적당한 언덕이 있어 운동 효과도 좋습니다.",
            highlights: [
                "다양한 야외 조각품 감상",
                "울창한 숲길과 호수 경관",
                "적당한 경사로 운동 효과 증대",
                "깨끗하게 관리된 공원 시설",
            ],
            startPoint: "올림픽공원 평화의 광장",
            endPoint: "몽촌토성 입구",
            elevation: "완만한 언덕 (최대 고도차 30m)",
            surface: "포장도로 70%, 흙길 30%",
        },
        "3": {
            id: "3",
            name: "청계천 산책로",
            location: "서울 중구 청계천",
            distance: "2.8 km",
            difficulty: "쉬움",
            estimatedTime: "20분",
            cleanupSpots: 6,
            rating: 4.5,
            reviewCount: 156,
            description:
                "도심 속 청계천을 따라 걷는 짧은 플로깅 코스입니다. 직장인들의 점심시간 플로깅이나 가벼운 산책에 적합하며, 도심 속에서 자연을 느낄 수 있습니다.",
            highlights: [
                "도심 속 자연 공간",
                "짧은 거리로 부담 없음",
                "대중교통 접근성 우수",
                "야간 조명으로 저녁 플로깅 가능",
            ],
            startPoint: "청계광장",
            endPoint: "마장동 청계천변",
            elevation: "평지 (고도차 없음)",
            surface: "포장도로 100%",
        },
        // AI 추천 코스들
        ai1: {
            id: "ai1",
            name: "🤖 AI 추천: 초보자 친화적 코스",
            location: "서울 마포구",
            distance: "2.5 km",
            difficulty: "쉬움",
            estimatedTime: "18분",
            cleanupSpots: 5,
            rating: 4.6,
            reviewCount: 45,
            description:
                "AI가 초보자를 위해 특별히 선별한 코스입니다. 평평한 길과 짧은 거리로 구성되어 플로깅을 처음 시작하는 분들에게 최적화되어 있습니다.",
            highlights: [
                "AI 알고리즘으로 선별된 초보자 맞춤 코스",
                "평평한 길로만 구성",
                "적당한 휴식 공간 배치",
                "안전한 야간 조명 시설",
            ],
            startPoint: "AI 추천 시작점",
            endPoint: "AI 추천 도착점",
            elevation: "평지",
            surface: "포장도로 100%",
        },
    }

    // 주변 관광지 정보
    const touristSpots: TouristSpot[] = [
        {
            id: "1",
            name: "망원한강공원",
            description:
                "한강을 따라 조성된 대표적인 시민공원으로, 넓은 잔디밭과 다양한 레저 시설을 갖추고 있습니다. 특히 일몰 명소로 유명하며, 가족 단위 방문객들에게 인기가 높습니다.",
            imageUrl:
                "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
            distance: "0m",
            category: "공원",
        },
        {
            id: "2",
            name: "선유도공원",
            description:
                "한강 위의 작은 섬으로 만들어진 생태공원입니다. 옛 정수장을 재활용한 독특한 건축물과 아름다운 수생식물원이 특징입니다.",
            imageUrl:
                "https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
            distance: "800m",
            category: "생태공원",
        },
        {
            id: "3",
            name: "양화대교",
            description:
                "한강을 가로지르는 아름다운 다리로, 밤에는 조명이 켜져 더욱 아름다운 야경을 자랑합니다. 도보로 건널 수 있어 한강 양쪽을 모두 즐길 수 있습니다.",
            imageUrl:
                "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
            distance: "1.2km",
            category: "랜드마크",
        },
        {
            id: "4",
            name: "홍대거리",
            description:
                "젊음의 거리로 유명한 홍대 주변에는 다양한 카페, 음식점, 문화공간이 있습니다. 플로깅 후 휴식과 식사를 즐기기 좋은 곳입니다.",
            imageUrl:
                "https://images.pexels.com/photos/2901528/pexels-photo-2901528.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop",
            distance: "1.5km",
            category: "문화거리",
        },
    ]

    useEffect(() => {
        const fetchCourseDetail = async () => {
            setLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call

                if (courseId && coursesData[courseId]) {
                    setCourseDetail(coursesData[courseId])
                } else {
                    navigate("/courses") // Redirect if course not found
                }
            } catch (error) {
                console.error("코스 정보를 불러오는데 실패했습니다:", error)
                navigate("/courses")
            } finally {
                setLoading(false)
            }
        }

        if (courseId) {
            fetchCourseDetail()
        }
    }, [courseId, navigate])

    const handleToggleLike = () => {
        setIsLiked(!isLiked)
        // 좋아요 상태를 서버에 저장하는 로직 추가
    }

    const handleShare = () => {
        // 공유 기능 로직 추가
        console.log("코스 공유하기")
    }

    const handleStartPlogging = () => {
        // 플로깅 시작 로직 (실제 플로깅 페이지로 이동)
        console.log(`코스 ${courseId} 플로깅 시작`)
        navigate(`/certification?courseId=${courseId}`) // 예시: 인증 페이지로 이동
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">코스 정보를 불러오는 중...</p>
                </div>
            </div>
        )
    }

    if (!courseDetail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">코스를 찾을 수 없습니다.</p>
                    <button onClick={() => navigate("/courses")} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                        코스 목록으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <CourseDetailHeader isLiked={isLiked} onToggleLike={handleToggleLike} onShare={handleShare} />
            <CourseMapSection location={courseDetail.location} />
            <CourseBasicInfo
                name={courseDetail.name}
                location={courseDetail.location}
                rating={courseDetail.rating}
                reviewCount={courseDetail.reviewCount}
                distance={courseDetail.distance}
                estimatedTime={courseDetail.estimatedTime}
                difficulty={courseDetail.difficulty}
                onStartPlogging={handleStartPlogging}
            />
            <CourseDetailTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="pb-20">
                {activeTab === "overview" && (
                    <CourseOverviewSection
                        description={courseDetail.description}
                        highlights={courseDetail.highlights}
                        startPoint={courseDetail.startPoint}
                        endPoint={courseDetail.endPoint}
                        elevation={courseDetail.elevation}
                        surface={courseDetail.surface}
                        cleanupSpots={courseDetail.cleanupSpots}
                    />
                )}
                {activeTab === "spots" && <TouristSpotsSection spots={touristSpots} />}
                {activeTab === "reviews" && (
                    <CourseReviewsSection rating={courseDetail.rating} reviewCount={courseDetail.reviewCount} />
                )}
            </div>
        </div>
    )
}

export default CourseDetailPage
