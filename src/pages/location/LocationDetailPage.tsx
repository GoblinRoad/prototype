"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { PloggingLocation } from "@/types";
import CourseDetailHeader from "@/components/courseDetails/CourseDetailHeader";
import LocationImageSection from "@/components/location/LocationImageSection";
import LocationBasicInfo from "@/components/location/LocationBasicInfo";
import LocationDetailTabNavigation from "@/components/location/LocationDetailTabNavigation";
import LocationOverviewSection from "@/components/location/LocationOverviewSection";
import CourseReviewsSection from "@/components/courseDetails/CourseReviewsSection";

const LocationDetailPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "reviews">("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [locationDetail, setLocationDetail] = useState<PloggingLocation | null>(null);
  const [loading, setLoading] = useState(true);

  // 플로깅 장소 데이터 (실제로는 API에서 가져올 데이터)
  const locationsData: Record<string, PloggingLocation> = {
    "1": {
      id: "1",
      name: "한강공원 여의도지구",
      address: "서울특별시 영등포구 여의도동",
      category: "공원",
      rating: 4.8,
      reviewCount: 324,
      imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      latitude: 37.5219,
      longitude: 126.9338,
      description: "한강이 한눈에 보이는 넓은 공원에서 여유로운 플로깅을 즐겨보세요. 평평한 산책로와 잘 정비된 시설로 누구나 쉽게 플로깅할 수 있는 곳입니다.",
    },
    "2": {
      id: "2",
      name: "청계천 광화문 구간",
      address: "서울특별시 중구 세종대로",
      category: "하천",
      rating: 4.6,
      reviewCount: 198,
      imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      latitude: 37.5696,
      longitude: 126.9783,
      description: "도심 속 맑은 하천을 따라 걸으며 환경을 생각하는 시간을 가져보세요. 접근성이 좋아 직장인들의 점심시간 플로깅 장소로 인기가 높습니다.",
    },
    "3": {
      id: "3",
      name: "올림픽공원",
      address: "서울특별시 송파구 올림픽로",
      category: "공원",
      rating: 4.7,
      reviewCount: 256,
      imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      latitude: 37.5215,
      longitude: 127.1248,
      description: "넓은 공원에서 다양한 활동과 함께 플로깅을 즐길 수 있습니다. 아름다운 조각공원과 호수가 있어 플로깅하며 문화도 감상할 수 있는 특별한 장소입니다.",
    },
  };

  useEffect(() => {
    const fetchLocationDetail = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

        if (locationId && locationsData[locationId]) {
          setLocationDetail(locationsData[locationId]);
        } else {
          navigate("/courses"); // Redirect if location not found
        }
      } catch (error) {
        console.error("장소 정보를 불러오는데 실패했습니다:", error);
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };

    if (locationId) {
      fetchLocationDetail();
    }
  }, [locationId, navigate]);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    // 좋아요 상태를 서버에 저장하는 로직 추가
  };

  const handleShare = () => {
    // 공유 기능 로직 추가
    console.log("장소 공유하기");
  };

  const handleStartPlogging = () => {
    // 플로깅 시작 로직 (실제 플로깅 페이지로 이동)
    console.log(`장소 ${locationId} 플로깅 시작`);
    navigate(`/certification?locationId=${locationId}`); // 예시: 인증 페이지로 이동
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">장소 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  };

  if (!locationDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">장소를 찾을 수 없습니다.</p>
          <button 
            onClick={() => navigate("/courses")} 
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
          >
            장소 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CourseDetailHeader 
        isLiked={isLiked} 
        onToggleLike={handleToggleLike} 
        onShare={handleShare} 
      />
      <LocationImageSection 
        imageUrl={locationDetail.imageUrl}
        name={locationDetail.name}
        address={locationDetail.address}
      />
      <LocationBasicInfo
        name={locationDetail.name}
        address={locationDetail.address}
        category={locationDetail.category}
        rating={locationDetail.rating}
        reviewCount={locationDetail.reviewCount}
        onStartPlogging={handleStartPlogging}
      />
      <LocationDetailTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pb-20">
        {activeTab === "overview" && (
          <LocationOverviewSection
            description={locationDetail.description}
            category={locationDetail.category}
            latitude={locationDetail.latitude}
            longitude={locationDetail.longitude}
          />
        )}
        {activeTab === "reviews" && (
          <CourseReviewsSection 
            rating={locationDetail.rating} 
            reviewCount={locationDetail.reviewCount} 
          />
        )}
      </div>
    </div>
  );
};

export default LocationDetailPage;
