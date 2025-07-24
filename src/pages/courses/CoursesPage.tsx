"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Course } from "@/types"
import CoursesHeader from "@/components/courses/CoursesHeader"
import CoursesTabNavigation from "@/components/courses/CoursesTabNavigation"
import NearbyCoursesSection from "@/components/courses/NearbyCoursesSection"
import SearchCoursesSection from "@/components/courses/SearchCoursesSection"
import AiRecommendedCoursesSection from "@/components/courses/AiRecommendedCoursesSection"

const CoursesPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"nearby" | "search" | "ai">("nearby")

  // 현재 위치 기반 코스 (데이터는 CoursesPage에서 관리)
  const nearbyCourses: Course[] = [
    {
      id: "1",
      name: "한강공원 플로깅 코스",
      location: "서울 마포구",
      distance: "3.2 km",
      difficulty: "쉬움",
      estimatedTime: "25분",
      cleanupSpots: 8,
      rating: 4.8,
    },
    {
      id: "2",
      name: "올림픽공원 둘레길",
      location: "서울 송파구",
      distance: "5.1 km",
      difficulty: "보통",
      estimatedTime: "40분",
      cleanupSpots: 12,
      rating: 4.6,
    },
    {
      id: "3",
      name: "청계천 산책로",
      location: "서울 중구",
      distance: "2.8 km",
      difficulty: "쉬움",
      estimatedTime: "20분",
      cleanupSpots: 6,
      rating: 4.5,
    },
  ]

  // 검색/필터링을 위한 전체 코스 (데이터는 CoursesPage에서 관리)
  const allCourses: Course[] = [
    ...nearbyCourses,
    {
      id: "4",
      name: "남산 순환로",
      location: "서울 중구",
      distance: "4.5 km",
      difficulty: "보통",
      estimatedTime: "35분",
      cleanupSpots: 10,
      rating: 4.7,
    },
    {
      id: "5",
      name: "부산 해운대 해변길",
      location: "부산 해운대구",
      distance: "6.2 km",
      difficulty: "쉬움",
      estimatedTime: "45분",
      cleanupSpots: 15,
      rating: 4.9,
    },
    {
      id: "6",
      name: "제주 우도 해안길",
      location: "제주 제주시",
      distance: "8.1 km",
      difficulty: "어려움",
      estimatedTime: "65분",
      cleanupSpots: 20,
      rating: 4.8,
    },
  ]

  // AI 추천 코스 (데이터는 CoursesPage에서 관리)
  const aiRecommendedCourses: Course[] = [
    {
      id: "ai1",
      name: "🤖 AI 추천: 초보자 친화적 코스",
      location: "서울 마포구",
      distance: "2.5 km",
      difficulty: "쉬움",
      estimatedTime: "18분",
      cleanupSpots: 5,
      rating: 4.6,
    },
    {
      id: "ai2",
      name: "🤖 AI 추천: 경치 좋은 강변 코스",
      location: "서울 잠실",
      distance: "4.8 km",
      difficulty: "보통",
      estimatedTime: "38분",
      cleanupSpots: 11,
      rating: 4.8,
    },
  ]

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <CoursesHeader title="코스 찾기" />
        <CoursesTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="pb-20">
          {activeTab === "nearby" && <NearbyCoursesSection courses={nearbyCourses} onCourseClick={handleCourseClick} />}
          {activeTab === "search" && <SearchCoursesSection allCourses={allCourses} onCourseClick={handleCourseClick} />}
          {activeTab === "ai" && (
              <AiRecommendedCoursesSection courses={aiRecommendedCourses} onCourseClick={handleCourseClick} />
          )}
        </div>
      </div>
  )
}

export default CoursesPage
