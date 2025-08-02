"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Search, Share2, Clock, Eye, X } from "lucide-react"
import type { NewsItem, NewsFilter } from "@/types"

const EnvironmentalNewsPage: React.FC = () => {
    const navigate = useNavigate()
    const [showSearchBar, setShowSearchBar] = useState(false)

    const [filter, setFilter] = useState<NewsFilter>({
        category: "all",
        searchQuery: "",
        sortBy: "latest",
    })

    const newsData: NewsItem[] = [
        {
            id: "1",
            title: "플라스틱 없는 바다를 위한 새로운 기술 개발",
            summary: "해양 플라스틱 쓰레기를 효과적으로 수거할 수 있는 혁신적인 기술이 개발되어 주목받고 있습니다.",
            content: `최근 해양 환경 보호를 위한 획기적인 기술이 개발되어 화제가 되고 있습니다. 

이 기술은 인공지능과 로봇 기술을 결합하여 바다에 떠다니는 플라스틱 쓰레기를 자동으로 감지하고 수거할 수 있는 시스템입니다.

주요 특징:
• AI 기반 쓰레기 인식 시스템
• 자율 항해 기능
• 친환경 소재로 제작
• 태양광 에너지 활용

이 기술의 도입으로 해양 생태계 보호에 큰 도움이 될 것으로 기대됩니다. 특히 플로깅과 같은 시민 참여 활동과 함께 시너지 효과를 낼 수 있을 것으로 보입니다.

전문가들은 "이러한 기술적 혁신과 시민들의 자발적 참여가 결합될 때 진정한 환경 보호가 가능하다"고 말했습니다.`,
            imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400",
            publishedAt: "2025-01-15T10:30:00Z",
            source: "환경일보",
            category: "technology",
            tags: ["플라스틱", "해양보호", "기술혁신", "AI"],
            readTime: 3,
            viewCount: 1250,
            author: "김환경 기자",
            sourceUrl: "https://example.com/news/1",
        },
        {
            id: "2",
            title: "전국 플로깅 참여자 100만 명 돌파",
            summary: "환경보호 실천 운동인 플로깅 참여자가 전국적으로 100만 명을 넘어서며 새로운 이정표를 세웠습니다.",
            content: `전국의 플로깅 참여자가 100만 명을 돌파하며 환경보호 실천 운동이 확산되고 있습니다.

환경부 발표에 따르면, 올해 들어 플로깅 참여자가 급격히 증가하여 연말 기준 100만 명을 넘어섰다고 밝혔습니다.

주요 성과:
• 수거된 쓰레기: 총 500톤
• 정화된 지역: 전국 5,000여 곳
• 참여 단체: 1,200개 이상
• 청소년 참여율: 전체의 35%

특히 MZ세대의 참여가 두드러지며, SNS를 통한 인증 문화가 확산에 큰 역할을 했다고 분석됩니다.

환경부 관계자는 "시민들의 자발적 참여가 이룬 성과"라며 "앞으로도 다양한 지원 정책을 통해 플로깅 문화를 확산시켜 나가겠다"고 말했습니다.`,
            imageUrl: "https://images.pexels.com/photos/2382894/pexels-photo-2382894.jpeg?auto=compress&cs=tinysrgb&w=400",
            publishedAt: "2025-01-14T14:20:00Z",
            source: "그린뉴스",
            category: "environment",
            tags: ["플로깅", "환경보호", "시민참여", "100만명"],
            readTime: 2,
            viewCount: 2100,
            author: "이지구 기자",
        },
        {
            id: "3",
            title: "기후변화 대응, 개인 실천이 핵심",
            summary: "IPCC 최신 보고서에 따르면 개인의 작은 실천이 기후변화 대응에 중요한 역할을 한다고 강조했습니다.",
            content: `기후변화에 관한 정부간 협의체(IPCC)가 발표한 최신 보고서에서 개인의 환경 실천이 기후변화 대응에 미치는 영향을 분석했습니다.

보고서 주요 내용:
• 개인 실천으로 탄소 배출량 30% 감소 가능
• 플로깅, 제로웨이스트 등 실천 운동 확산
• 환경 교육의 중요성 강조
• 정부-시민 협력 체계 필요성

특히 플로깅과 같은 환경 정화 활동이 직접적인 환경 개선뿐만 아니라 환경 의식 제고에도 큰 효과가 있다고 평가했습니다.

전문가들은 "작은 실천이 모여 큰 변화를 만든다"며 "지속적인 참여와 실천이 중요하다"고 강조했습니다.`,
            imageUrl: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
            publishedAt: "2025-01-13T09:15:00Z",
            source: "기후변화뉴스",
            category: "climate",
            tags: ["기후변화", "IPCC", "개인실천", "탄소감축"],
            readTime: 4,
            viewCount: 1800,
            author: "박기후 기자",
        },
        {
            id: "4",
            title: "해양 생태계 복원 프로젝트 성과 발표",
            summary: "정부와 시민단체가 함께 진행한 해양 생태계 복원 프로젝트가 괄목할 만한 성과를 거두었다고 발표했습니다.",
            content: `해양수산부가 주도하고 시민단체가 참여한 해양 생태계 복원 프로젝트의 1년간 성과가 발표되었습니다.

프로젝트 성과:
• 해양 쓰레기 수거량: 1,200톤
• 복원된 해안선: 총 150km
• 참여 시민: 15만 명
• 복원된 산호초 면적: 50헥타르

특히 플로깅 활동을 통한 해안 정화가 해양 생태계 복원에 직접적인 도움이 되었다고 평가받았습니다.

해양수산부 관계자는 "시민들의 적극적인 참여 없이는 불가능했을 성과"라며 "앞으로도 지속적인 협력을 통해 건강한 해양 생태계를 만들어 나가겠다"고 밝혔습니다.`,
            imageUrl: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
            publishedAt: "2025-01-12T16:45:00Z",
            source: "바다신문",
            category: "ocean",
            tags: ["해양생태계", "복원프로젝트", "해안정화", "시민참여"],
            readTime: 3,
            viewCount: 950,
            author: "최바다 기자",
        },
        {
            id: "5",
            title: "도시 숲 조성 사업, 시민 참여 확대",
            summary: "전국 주요 도시에서 진행 중인 도시 숲 조성 사업에 시민들의 참여가 크게 늘어나고 있습니다.",
            content: `전국 주요 도시에서 추진 중인 도시 숲 조성 사업에 시민들의 관심과 참여가 급증하고 있습니다.

사업 현황:
• 조성 예정 도시 숲: 200개소
• 식재 예정 나무: 100만 그루
• 시민 참여자: 5만 명
• 투자 규모: 500억 원

도시 숲 조성과 함께 주변 환경 정화 활동도 활발히 진행되고 있으며, 플로깅 동호회들이 적극적으로 참여하고 있습니다.

산림청 관계자는 "도시 숲은 미세먼지 저감과 도시 열섬 현상 완화에 효과적"이라며 "시민들의 지속적인 관심과 참여를 부탁한다"고 말했습니다.`,
            imageUrl: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=400",
            publishedAt: "2025-01-11T11:30:00Z",
            source: "산림일보",
            category: "forest",
            tags: ["도시숲", "나무심기", "미세먼지", "시민참여"],
            readTime: 2,
            viewCount: 1100,
            author: "정숲속 기자",
        },
    ]

    // 필터링된 뉴스
    const filteredNews = newsData
        .filter((n) => {
            const matchesCategory = filter.category === "all" || n.category === filter.category
            const matchesSearch =
                filter.searchQuery === "" ||
                n.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                n.summary.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                n.tags.some((tag) => tag.toLowerCase().includes(filter.searchQuery.toLowerCase()))
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            if (filter.sortBy === "latest") {
                return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            }
            if (filter.sortBy === "popular") {
                return b.viewCount - a.viewCount
            }
            return 0
        })

    const handleShare = async (news: NewsItem) => {
        if (navigator.share) {
            await navigator.share({
                title: news.title,
                text: news.summary,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(`${news.title}\n${window.location.href}`)
            alert("링크가 클립보드에 복사되었습니다!")
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return "오늘"
        if (diffDays === 2) return "어제"
        if (diffDays <= 7) return `${diffDays - 1}일 전`
        return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto w-full">
            {/* 헤더 */}
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-900">환경 소식</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setShowSearchBar(!showSearchBar)} className="p-2 hover:bg-gray-100 rounded-lg">
                            <Search className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* 검색바 */}
                {showSearchBar && (
                    <div className="mt-3 relative">
                        <input
                            type="text"
                            placeholder="뉴스 검색..."
                            value={filter.searchQuery}
                            onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            autoFocus
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        {filter.searchQuery && (
                            <button
                                onClick={() => setFilter((prev) => ({ ...prev, searchQuery: "" }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 정렬 옵션 */}
            <div className="bg-white px-4 py-2 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">총 {filteredNews.length}개의 소식</span>
                    <select
                        value={filter.sortBy}
                        onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as "latest" | "popular" }))}
                        className="text-sm text-gray-600 bg-transparent border-none focus:outline-none"
                    >
                        <option value="latest">최신순</option>
                        <option value="popular">인기순</option>
                    </select>
                </div>
            </div>

            {/* 뉴스 리스트 */}
            <div className="flex-1 overflow-y-auto pb-20">
                {filteredNews.length > 0 ? (
                    <div className="p-4 space-y-4">
                        {filteredNews.map((news) => (
                            <div
                                key={news.id}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => navigate(`/news/${news.id}`)}
                            >
                                <div className="aspect-video w-full bg-gray-200 overflow-hidden">
                                    <img
                                        src={news.imageUrl || "/placeholder.svg"}
                                        alt={news.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{news.source}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleShare(news)
                                                }}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                <Share2 className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{news.title}</h3>

                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{news.summary}</p>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{news.readTime}분</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-3 h-3" />
                                                <span>{news.viewCount.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <span>{formatDate(news.publishedAt)}</span>
                                    </div>

                                    {/* 태그 */}
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {news.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center p-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
                            <p className="text-gray-600 mb-4">다른 키워드로 검색해보세요</p>
                            <button
                                onClick={() => setFilter((prev) => ({ ...prev, searchQuery: "", category: "all" }))}
                                className="text-emerald-600 font-medium hover:text-emerald-700"
                            >
                                전체 소식 보기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnvironmentalNewsPage
