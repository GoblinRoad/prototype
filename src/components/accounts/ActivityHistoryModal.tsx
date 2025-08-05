"use client";

import type React from "react";
import { useEffect } from "react";
import { X, MapPin, Clock, Target, Calendar } from "lucide-react";

interface PloggingRecord {
  id: string;
  courseName: string;
  date: string;
  distance: number;
  location: string;
  imageUrl: string;
  trashCount: number;
  duration: string;
  points: number;
}

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActivityHistoryModal: React.FC<ActivityHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  // 모달 열릴 때 뒤쪽 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // 플로깅 기록 데이터 (실제로는 API에서 가져올 데이터)
  const ploggingRecords: PloggingRecord[] = [
    {
      id: "1",
      courseName: "한강공원 플로깅",
      date: "2024-01-15",
      distance: 3.2,
      location: "한강공원",
      imageUrl: "/images/plogging1.jpg",
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
      trashCount: 4,
      duration: "50분",
      points: 65,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">최근 활동</h2>
            <p className="text-sm text-gray-500 mt-1">
              총 {ploggingRecords.length}개의 활동
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 최근 활동 목록 */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-4">
            {ploggingRecords.map((record) => (
              <div
                key={record.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                {/* 이미지와 기본 정보 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={record.imageUrl}
                      alt={`${record.courseName} 플로깅`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='12'%3E플로깅%3C/text%3E%3C/svg%3E";
                      }}
                    />
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
                  <div className="bg-white rounded-lg p-2">
                    <div className="text-lg font-bold text-emerald-600">
                      {record.distance}km
                    </div>
                    <div className="text-xs text-gray-500">거리</div>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <div className="text-lg font-bold text-orange-600">
                      {record.trashCount}개
                    </div>
                    <div className="text-xs text-gray-500">정리</div>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-600">
                      {record.points}P
                    </div>
                    <div className="text-xs text-gray-500">포인트</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHistoryModal;
