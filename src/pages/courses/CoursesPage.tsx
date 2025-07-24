"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowLeft,
  Search,
  MapPin,
  Filter,
  Star,
  Clock,
  Target,
  Navigation,
  Sparkles,
  Mountain,
  Waves,
  Building,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types"

const CoursesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("전체")
  const [selectedTheme, setSelectedTheme] = useState("전체")
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<"nearby" | "search" | "ai">("nearby")

  // 지역 옵션
  const regions = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "대전",
    "광주",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ]

  // 테마 옵션
  const themes = [
    { value: "전체", label: "전체", icon: null },
    { value: "산", label: "산/숲", icon: Mountain },
    { value: "바다", label: "바다/강", icon: Waves },
    { value: "도시", label: "도시/공원", icon: Building },
  ]

  // 난이도 옵션
  const difficulties = ["전체", "쉬움", "보통", "어려움"]

  // 현재 위치 기반 코스
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

  // 검색/필터된 코스
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

  // AI 추천 코스
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "쉬움":
        return "bg-green-100 text-green-800"
      case "보통":
        return "bg-yellow-100 text-yellow-800"
      case "어려움":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getThemeIcon = (theme: string) => {
    const themeObj = themes.find((t) => t.value === theme)
    if (themeObj?.icon) {
      const IconComponent = themeObj.icon
      return <IconComponent className="w-4 h-4" />
    }
    return null
  }

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "전체" || course.location.includes(selectedRegion)
    const matchesDifficulty = selectedDifficulty === "전체" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesRegion && matchesDifficulty
  })

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
      <div
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleCourseClick(course.id)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{course.name}</h4>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              {course.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Target className="w-4 h-4 mr-1" />
              {course.distance}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {course.estimatedTime}
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </span>
        </div>

        <button
            className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation()
              // 플로깅 시작 로직
            }}
        >
          코스 시작하기
        </button>
      </div>
  )

  return (
      // max-w-md mx-auto 클래스를 App.tsx의 Layout 컴포넌트로 이동했습니다.
      <div className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">코스 찾기</h1>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white px-4 py-3 border-b">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
                onClick={() => setActiveTab("nearby")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                    activeTab === "nearby" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Navigation className="w-4 h-4" />
              <span>내 주변</span>
            </button>
            <button
                onClick={() => setActiveTab("search")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                    activeTab === "search" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Search className="w-4 h-4" />
              <span>검색</span>
            </button>
            <button
                onClick={() => setActiveTab("ai")}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center space-x-1 ${
                    activeTab === "ai" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI 추천</span>
            </button>
          </div>
        </div>

        <div className="pb-20">
          {activeTab === "nearby" && (
              /* 내 주변 탭 */
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">현재 위치 기반 코스</h2>
                  <div className="flex items-center text-sm text-emerald-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    서울시
                  </div>
                </div>

                <div className="space-y-3">
                  {nearbyCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
          )}

          {activeTab === "search" && (
              /* 검색 탭 */
              <div className="p-4">
                {/* 검색바 */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="코스명 또는 지역을 검색하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* 필터 토글 버튼 */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 mb-4 text-emerald-600 font-medium"
                >
                  <Filter className="w-4 h-4" />
                  <span>상세 필터</span>
                </button>

                {/* 필터 옵션 */}
                {showFilters && (
                    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm space-y-4">
                      {/* 지역 선택 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          {regions.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                          ))}
                        </select>
                      </div>

                      {/* 테마 선택 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">테마</label>
                        <div className="grid grid-cols-2 gap-2">
                          {themes.map((theme) => (
                              <button
                                  key={theme.value}
                                  onClick={() => setSelectedTheme(theme.value)}
                                  className={`p-3 rounded-lg border transition-colors flex items-center justify-center space-x-2 ${
                                      selectedTheme === theme.value
                                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                          : "border-gray-200 hover:border-gray-300"
                                  }`}
                              >
                                {getThemeIcon(theme.value)}
                                <span className="text-sm font-medium">{theme.label}</span>
                              </button>
                          ))}
                        </div>
                      </div>

                      {/* 난이도 선택 */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                        <div className="flex space-x-2">
                          {difficulties.map((difficulty) => (
                              <button
                                  key={difficulty}
                                  onClick={() => setSelectedDifficulty(difficulty)}
                                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                                      selectedDifficulty === difficulty
                                          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  }`}
                              >
                                {difficulty}
                              </button>
                          ))}
                        </div>
                      </div>
                    </div>
                )}

                {/* 검색 결과 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">검색 결과 ({filteredCourses.length}개)</h3>
                  </div>

                  {filteredCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                  ))}

                  {filteredCourses.length === 0 && (
                      <div className="text-center py-8">
                        <div className="text-gray-400 mb-2">검색 결과가 없습니다</div>
                        <div className="text-sm text-gray-500">다른 조건으로 검색해보세요</div>
                      </div>
                  )}
                </div>
              </div>
          )}

          {activeTab === "ai" && (
              /* AI 추천 탭 */
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
                  {aiRecommendedCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
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
          )}
        </div>
      </div>
  )
}

export default CoursesPage
