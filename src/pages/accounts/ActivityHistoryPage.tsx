"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PloggingImage {
  id: string;
  imageUrl: string;
  uploadedAt: string;
}

interface PloggingRecord {
  id: string;
  courseName: string;
  date: string;
  distance: number;
  location: string;
  imageUrl: string;
  images: PloggingImage[];
  trashCount: number;
  duration: string;
  points: number;
}

// 이미지 캐러셀 모달 컴포넌트
const ImageCarouselModal: React.FC<{
  images: PloggingImage[];
  onClose: () => void;
}> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // 썸네일 스크롤 동기화
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnailWidth = 80; // 썸네일 너비 + gap
      const scrollPosition = currentIndex * thumbnailWidth - thumbnailWidth * 2; // 중앙에 오도록
      thumbnailRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <style>
        {`
          .thumbnail-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div
        className="bg-white rounded-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900">
            쓰레기 수거 인증
          </h3>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 캐러셀 */}
        <div className="relative flex items-center justify-center p-8 flex-1 min-h-0">
          <div
            className="flex-1 flex justify-center items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={images[currentIndex].imageUrl}
              alt={`쓰레기 ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='16'%3E이미지 로드 실패%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="text-center py-2 border-t border-gray-200 flex-shrink-0">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* 썸네일 */}
        {images.length > 1 && (
          <div className="p-4 border-t border-gray-200 flex-shrink-0">
            <div
              ref={thumbnailRef}
              className="flex gap-2 overflow-x-auto pb-1 thumbnail-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={`쓰레기 ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? "opacity-100 brightness-75"
                      : "opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='10'%3E이미지%3C/text%3E%3C/svg%3E";
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 활동 카드 컴포넌트
const ActivityCard: React.FC<{ record: PloggingRecord }> = ({ record }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const additionalImagesCount = record.images.length - 1; // 첫 번째 이미지 제외

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* 이미지와 기본 정보 */}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={record.imageUrl}
            alt={`${record.courseName} 플로깅`}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setShowImageModal(true)}
            onError={(e) => {
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3E플로깅%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* 추가 이미지 개수 표시 */}
          {additionalImagesCount > 0 && (
            <div className="absolute top-1 right-1 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              +{additionalImagesCount}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">
            {record.courseName}
          </h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            {record.date}
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {record.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {record.duration}
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-lg font-bold text-emerald-600">
            {record.distance}km
          </div>
          <div className="text-xs text-gray-500">거리</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-lg font-bold text-orange-600">
            {record.trashCount}개
          </div>
          <div className="text-xs text-gray-500">정리</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-600">
            {record.points}P
          </div>
          <div className="text-xs text-gray-500">포인트</div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {showImageModal && (
        <ImageCarouselModal
          images={record.images}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </div>
  );
};

const ActivityHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 플로깅 기록 데이터 (실제로는 API에서 가져올 데이터)
  const ploggingRecords: PloggingRecord[] = [
    {
      id: "1",
      courseName: "한강공원 플로깅",
      date: "2024-01-15",
      distance: 3.2,
      location: "한강공원",
      imageUrl: "/images/plogging1.jpg",
      images: [
        {
          id: "img1_1",
          imageUrl: "/images/plogging1.jpg",
          uploadedAt: "2024-01-15T10:35:00Z",
        },
        {
          id: "img1_2",
          imageUrl: "/images/plogging1_2.jpg",
          uploadedAt: "2024-01-15T10:36:00Z",
        },
        {
          id: "img1_3",
          imageUrl: "/images/plogging1_3.jpg",
          uploadedAt: "2024-01-15T10:37:00Z",
        },
        {
          id: "img1_4",
          imageUrl: "/images/plogging1_4.jpg",
          uploadedAt: "2024-01-15T10:38:00Z",
        },
        {
          id: "img1_5",
          imageUrl: "/images/plogging1_5.jpg",
          uploadedAt: "2024-01-15T10:39:00Z",
        },
      ],
      trashCount: 5,
      duration: "45분",
      points: 50,
    },
    {
      id: "2",
      courseName: "올림픽공원 둘레길",
      date: "2024-01-12",
      distance: 5.1,
      location: "올림픽공원",
      imageUrl: "/images/plogging2.jpg",
      images: [
        {
          id: "img2_1",
          imageUrl: "/images/plogging2.jpg",
          uploadedAt: "2024-01-12T15:35:00Z",
        },
        {
          id: "img2_2",
          imageUrl: "/images/plogging2_2.jpg",
          uploadedAt: "2024-01-12T15:36:00Z",
        },
        {
          id: "img2_3",
          imageUrl: "/images/plogging2_3.jpg",
          uploadedAt: "2024-01-12T15:37:00Z",
        },
      ],
      trashCount: 8,
      duration: "1시간 15분",
      points: 120,
    },
    {
      id: "3",
      courseName: "청계천 산책로",
      date: "2024-01-10",
      distance: 2.8,
      location: "청계천",
      imageUrl: "/images/plogging3.jpg",
      images: [
        {
          id: "img3_1",
          imageUrl: "/images/plogging3.jpg",
          uploadedAt: "2024-01-10T09:15:00Z",
        },
      ],
      trashCount: 3,
      duration: "35분",
      points: 45,
    },
    {
      id: "4",
      courseName: "남산타워 코스",
      date: "2024-01-08",
      distance: 4.5,
      location: "남산타워",
      imageUrl: "/images/plogging4.jpg",
      images: [
        {
          id: "img4_1",
          imageUrl: "/images/plogging4.jpg",
          uploadedAt: "2024-01-08T14:20:00Z",
        },
        {
          id: "img4_2",
          imageUrl: "/images/plogging4_2.jpg",
          uploadedAt: "2024-01-08T14:21:00Z",
        },
        {
          id: "img4_3",
          imageUrl: "/images/plogging4_3.jpg",
          uploadedAt: "2024-01-08T14:22:00Z",
        },
        {
          id: "img4_4",
          imageUrl: "/images/plogging4_4.jpg",
          uploadedAt: "2024-01-08T14:23:00Z",
        },
        {
          id: "img4_5",
          imageUrl: "/images/plogging4_5.jpg",
          uploadedAt: "2024-01-08T14:24:00Z",
        },
        {
          id: "img4_6",
          imageUrl: "/images/plogging4_6.jpg",
          uploadedAt: "2024-01-08T14:25:00Z",
        },
      ],
      trashCount: 6,
      duration: "55분",
      points: 80,
    },
    {
      id: "5",
      courseName: "여의도공원",
      date: "2024-01-05",
      distance: 3.8,
      location: "여의도공원",
      imageUrl: "/images/plogging5.jpg",
      images: [
        {
          id: "img5_1",
          imageUrl: "/images/plogging5.jpg",
          uploadedAt: "2024-01-05T16:30:00Z",
        },
        {
          id: "img5_2",
          imageUrl: "/images/plogging5_2.jpg",
          uploadedAt: "2024-01-05T16:31:00Z",
        },
        {
          id: "img5_3",
          imageUrl: "/images/plogging5_3.jpg",
          uploadedAt: "2024-01-05T16:32:00Z",
        },
        {
          id: "img5_4",
          imageUrl: "/images/plogging5_4.jpg",
          uploadedAt: "2024-01-05T16:33:00Z",
        },
      ],
      trashCount: 4,
      duration: "50분",
      points: 65,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">최근 활동</h1>
        </div>
      </div>

      {/* 내용 */}
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            총 {ploggingRecords.length}개의 활동
          </p>
        </div>

        {/* 최근 활동 목록 */}
        <div className="space-y-4">
          {ploggingRecords.map((record) => (
            <ActivityCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityHistoryPage;
