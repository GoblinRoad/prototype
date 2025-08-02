"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight, Clock, TrendingUp } from "lucide-react"

const EnvironmentalNews: React.FC = () => {
  const navigate = useNavigate()

  // 샘플 뉴스 데이터 (메인페이지용 - 3개만)
  const newsItems = [
    {
      id: "1",
      title: "플라스틱 없는 바다를 위한 새로운 기술 개발",
      summary: "해양 플라스틱 쓰레기를 효과적으로 수거할 수 있는 혁신적인 기술이 개발되어 주목받고 있습니다.",
      imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishedAt: "2025-01-15T10:30:00Z",
      source: "환경일보",
      readTime: 3,
      isHot: true,
    },
    {
      id: "2",
      title: "전국 플로깅 참여자 100만 명 돌파",
      summary: "환경보호 실천 운동인 플로깅 참여자가 전국적으로 100만 명을 넘어서며 새로운 이정표를 세웠습니다.",
      imageUrl: "https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishedAt: "2025-01-14T14:20:00Z",
      source: "그린뉴스",
      readTime: 2,
      isHot: false,
    },
    {
      id: "3",
      title: "기후변화 대응, 개인 실천이 핵심",
      summary: "IPCC 최신 보고서에 따르면 개인의 작은 실천이 기후변화 대응에 중요한 역할을 한다고 강조했습니다.",
      imageUrl: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishedAt: "2025-01-13T09:15:00Z",
      source: "기후변화뉴스",
      readTime: 4,
      isHot: false,
    },
  ]

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "오늘"
    if (diffDays === 2) return "어제"
    if (diffDays <= 7) return `${diffDays - 1}일 전`
    return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
  }

  const handleNewsClick = (newsId: string) => {
    // 뉴스 상세 페이지로 이동하거나 모달 열기
    navigate(`/news?highlight=${newsId}`)
  }

  const handleMoreClick = () => {
    navigate("/news")
  }

  return (
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">환경 소식</h2>
          <button
              onClick={handleMoreClick}
              className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span className="text-sm font-medium">더보기</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {newsItems.map((news, index) => (
              <div
                  key={news.id}
                  onClick={() => handleNewsClick(news.id)}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                {index === 0 ? (
                    // 첫 번째 뉴스는 큰 카드로 표시
                    <>
                      <div className="aspect-video w-full bg-gray-200 overflow-hidden relative">
                        <img
                            src={news.imageUrl || "/placeholder.svg"}
                            alt={news.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        {news.isHot && (
                            <div className="absolute top-3 left-3 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              <TrendingUp className="w-3 h-3" />
                              <span>HOT</span>
                            </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-emerald-600 font-medium">{news.source}</span>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{news.readTime}분</span>
                            </div>
                            <span>{formatTimeAgo(news.publishedAt)}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{news.summary}</p>
                      </div>
                    </>
                ) : (
                    // 나머지 뉴스는 작은 카드로 표시
                    <div className="flex p-4 space-x-3">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                            src={news.imageUrl || "/placeholder.svg"}
                            alt={news.title}
                            className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-emerald-600 font-medium">{news.source}</span>
                          <span className="text-xs text-gray-500">{formatTimeAgo(news.publishedAt)}</span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">{news.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{news.summary}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{news.readTime}분</span>
                        </div>
                      </div>
                    </div>
                )}
              </div>
          ))}
        </div>
      </section>
  )
}

export default EnvironmentalNews
