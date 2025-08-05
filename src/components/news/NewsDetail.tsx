"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { X, Share2, Clock, Eye, ExternalLink, Calendar } from "lucide-react"
import type { NewsItem } from "@/types"

interface NewsDetailProps {
    news: NewsItem
    onShare: () => void
}

const NewsDetailPage: React.FC<NewsDetailProps> = ({ news, onShare }) => {
    const navigate = useNavigate()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleSourceClick = () => {
        if (news.sourceUrl) {
            window.open(news.sourceUrl, "_blank")
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                    <span className="font-medium text-gray-900">뉴스 상세</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={onShare} className="p-2 hover:bg-gray-100 rounded-full">
                        <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* 이미지 */}
            <div className="aspect-video w-full bg-gray-200 overflow-hidden mb-4 rounded-lg">
                <img src={news.imageUrl || "/placeholder.svg"} alt={news.title} className="w-full h-full object-cover" />
            </div>

            {/* 메타 정보 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        {news.category}
                    </span>
                    <span className="text-sm text-gray-600">{news.source}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{news.readTime}분</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{news.viewCount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* 제목 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{news.title}</h1>

            {/* 작성자 및 날짜 */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    {news.author && (
                        <>
                            <span className="text-sm font-medium text-gray-900">{news.author}</span>
                            <span className="text-gray-300">•</span>
                        </>
                    )}
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(news.publishedAt)}</span>
                    </div>
                </div>
                {news.sourceUrl && (
                    <button
                        onClick={handleSourceClick}
                        className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700"
                    >
                        <span>원문보기</span>
                        <ExternalLink className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* 요약 */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">요약</h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">{news.summary}</p>
            </div>

            {/* 본문 */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">본문</h3>
                <div className="prose prose-sm max-w-none">
                    {news.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {/* 태그 */}
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">태그</h3>
                <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewsDetailPage
