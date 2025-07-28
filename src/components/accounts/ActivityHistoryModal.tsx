"use client";

import type React from "react";
import { useEffect } from "react";
import {
  X,
  Trophy,
  Star,
  Calendar,
  Target,
  MapPin,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";

interface Activity {
  id: string;
  type: "plogging" | "badge" | "streak" | "course" | "achievement";
  title: string;
  description: string;
  points: number;
  date: string;
  location?: string;
  distance?: number;
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
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body 스크롤 막기
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 모달 닫힐 때 복원
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
  // 활동 내역 데이터 (실제로는 API에서 가져올 데이터)
  const activities: Activity[] = [
    {
      id: "1",
      type: "plogging",
      title: "한강공원 플로깅 완료",
      description: "한강공원에서 3.2km 플로깅을 완료했습니다",
      points: 50,
      date: "2시간 전",
      location: "한강공원",
      distance: 3.2,
    },
    {
      id: "2",
      type: "badge",
      title: '"정리 챔피언" 뱃지 획득',
      description: "100회 정리 달성으로 뱃지를 획득했습니다",
      points: 100,
      date: "1일 전",
    },
    {
      id: "3",
      type: "streak",
      title: "7일 연속 달성!",
      description: "7일 연속 플로깅을 달성했습니다",
      points: 75,
      date: "3일 전",
    },
    {
      id: "4",
      type: "course",
      title: "올림픽공원 코스 완주",
      description: "올림픽공원 둘레길을 완주했습니다",
      points: 120,
      date: "4일 전",
      location: "올림픽공원",
      distance: 5.1,
    },
    {
      id: "5",
      type: "achievement",
      title: "거리 달성자 업적 달성",
      description: "총 100km 달성으로 업적을 달성했습니다",
      points: 200,
      date: "1주 전",
    },
    {
      id: "6",
      type: "plogging",
      title: "청계천 산책로 플로깅",
      description: "청계천에서 2.8km 플로깅을 완료했습니다",
      points: 45,
      date: "1주 전",
      location: "청계천",
      distance: 2.8,
    },
    {
      id: "7",
      type: "badge",
      title: '"첫 걸음" 뱃지 획득',
      description: "첫 번째 플로깅을 완료했습니다",
      points: 25,
      date: "2주 전",
    },
    {
      id: "8",
      type: "streak",
      title: "3일 연속 달성",
      description: "3일 연속 플로깅을 달성했습니다",
      points: 30,
      date: "2주 전",
    },
  ];

  // 활동 타입별 아이콘과 색상
  const getActivityIcon = (type: Activity["type"]) => {
    const iconClass = "w-5 h-5";

    switch (type) {
      case "plogging":
        return <Target className={`${iconClass} text-emerald-600`} />;
      case "badge":
        return <Trophy className={`${iconClass} text-yellow-500`} />;
      case "streak":
        return <TrendingUp className={`${iconClass} text-orange-500`} />;
      case "course":
        return <MapPin className={`${iconClass} text-blue-500`} />;
      case "achievement":
        return <Award className={`${iconClass} text-purple-500`} />;
      default:
        return <Star className={`${iconClass} text-gray-500`} />;
    }
  };

  // 활동 타입별 배경 색상
  const getActivityBgColor = (type: Activity["type"]) => {
    switch (type) {
      case "plogging":
        return "bg-emerald-100";
      case "badge":
        return "bg-yellow-100";
      case "streak":
        return "bg-orange-100";
      case "course":
        return "bg-blue-100";
      case "achievement":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  // 활동 타입별 라벨
  const getActivityLabel = (type: Activity["type"]) => {
    switch (type) {
      case "plogging":
        return "플로깅";
      case "badge":
        return "뱃지";
      case "streak":
        return "연속";
      case "course":
        return "코스";
      case "achievement":
        return "업적";
      default:
        return "활동";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">활동 내역</h2>
            <p className="text-sm text-gray-500 mt-1">
              총 {activities.length}개의 활동
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 활동 목록 */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {/* 활동 아이콘 */}
                  <div
                    className={`w-10 h-10 ${getActivityBgColor(
                      activity.type
                    )} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* 활동 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {activity.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-emerald-600 font-medium">
                          +{activity.points}점
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.date}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">
                      {activity.description}
                    </p>

                    {/* 추가 정보 */}
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white border border-gray-200">
                        {getActivityLabel(activity.type)}
                      </span>

                      {activity.location && (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {activity.location}
                        </span>
                      )}

                      {activity.distance && (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <Target className="w-3 h-3 mr-1" />
                          {activity.distance}km
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">
                {activities.reduce((sum, activity) => sum + activity.points, 0)}
              </div>
              <div className="text-xs text-gray-600">총 획득 점수</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {activities.filter((a) => a.type === "plogging").length}
              </div>
              <div className="text-xs text-gray-600">플로깅 횟수</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">
                {activities.filter((a) => a.type === "badge").length}
              </div>
              <div className="text-xs text-gray-600">획득 뱃지</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityHistoryModal;
