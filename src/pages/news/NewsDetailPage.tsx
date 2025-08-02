"use client";

import React from "react";
import { useParams } from "react-router-dom";
import type { NewsItem } from "@/types";
import NewsDetail from "@/components/news/NewsDetail.tsx";
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
    // ... 다른 뉴스 항목 생략
]

function getNewsById(id: string) {
    return newsData.find((n) => n.id === id)!
}

const NewsDetailPage: React.FC = () => {


    const { newsId } = useParams<{ newsId: string }>();

    const news: NewsItem = getNewsById(newsId!);

    const handleShare = async () => {
        // NewsDetailPage가 onShare를 호출할 때 사용할 함수
        if (navigator.share) {
            await navigator.share({
                title: news.title,
                text: news.summary,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(`${news.title}\n${window.location.href}`);
            alert("링크가 복사되었습니다");
        }
    };

    return <NewsDetail news={news} onShare={handleShare} />;
};

export default NewsDetailPage;
