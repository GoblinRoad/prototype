"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"

const rankings = [
  { rank: 1, name: "지구지킴이", points: 2450, badges: 12, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 2, name: "환경사랑", points: 2280, badges: 10, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 3, name: "클린워커", points: 2100, badges: 9, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 4, name: "그린플로거", points: 1980, badges: 8, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 5, name: "에코히어로", points: 1850, badges: 7, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 6, name: "플라스틱헌터", points: 1720, badges: 6, avatar: "https://os.catdogeats.shop/images/cat_in_box.jpg" },
  { rank: 7, name: "바다지킴이", points: 1650, badges: 5, avatar: "" },
]

const PloggingRanking: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // 한 번에 한 아이템만 보이도록 설정
  const itemsPerView = 1
  const maxIndex = Math.max(0, rankings.length - itemsPerView)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }



  return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">플로깅 랭킹</h2>
          <div className="flex items-center gap-1 text-emerald-600 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>주간 순위</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* 슬라이더 컨테이너 */}
          <div
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* 슬라이더 내용 */}
            <div className="overflow-hidden">
              <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`, // 100%씩 이동
                  }}
              >
                {rankings.map((user) => (
                    <div
                        key={user.rank}
                        className="flex-shrink-0 w-full py-4 px-12 transition-all duration-200 bg-emerald-50 border-b last:border-b-0 border-emerald-100"
                    >
                      <div className="flex items-center justify-between">
                        {/* 왼쪽 섹션: 순위, 아바타 */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-500">#{user.rank}</span>
                          <div className="w-12 h-12 flex items-center justify-center">
                            <img
                                src={user.avatar}
                                alt={`${user.name} 아바타`}
                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                                onError={(e) => {
                                  // 이미지 로드 실패 시 기본 프로필 이미지로 대체
                                  (e.target as HTMLImageElement).src = '/defaultProfile.webp';
                                }}
                            />
                          </div>
                        </div>
                        {/* 중앙 섹션: 닉네임 (가운데 정렬) */}
                        <div className="flex-grow text-center">
                          <p className="font-semibold text-gray-800">{user.name}</p>
                        </div>

                        {/* 오른쪽 섹션: 점수, 뱃지 (오른쪽 정렬) */}
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{user.points}점</span>
                            <span>•</span>
                            <span>뱃지 {user.badges}개</span>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* 네비게이션 버튼 */}
            <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center items-center gap-2 p-3 bg-gray-50">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                />
            ))}
          </div>

          {/* 내 순위 정보 */}
          <div className="p-3 bg-emerald-50 text-center border-t">
            <p className="text-sm text-emerald-700">
              <span className="font-semibold">내 순위: 23위</span> • 1,450점
            </p>
            <button className="mt-2 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
              더 많은 활동으로 순위 올리기 →
            </button>
          </div>
        </div>
      </div>
  )
}

export default PloggingRanking