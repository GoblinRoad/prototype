import type React from "react";
import { MapPin, Info } from "lucide-react";

interface LocationOverviewSectionProps {
  description?: string;
  category: string;
  latitude: number;
  longitude: number;
}

const LocationOverviewSection: React.FC<LocationOverviewSectionProps> = ({
  description,
  category,
  latitude,
  longitude,
}) => {
  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "공원":
        return "넓은 공간에서 여유롭게 플로깅을 즐길 수 있는 장소입니다.";
      case "하천":
        return "물가를 따라 걸으며 자연을 느낄 수 있는 장소입니다.";
      case "산":
        return "자연 속에서 운동도 하고 환경보호도 할 수 있는 장소입니다.";
      case "해변":
        return "바다를 보며 플로깅할 수 있는 특별한 장소입니다.";
      case "문화재":
        return "역사와 문화를 느끼며 플로깅할 수 있는 의미있는 장소입니다.";
      case "시가지":
        return "도심 속에서 쉽게 접근할 수 있는 플로깅 장소입니다.";
      default:
        return "플로깅하기 좋은 장소입니다.";
    }
  };

  const getPloggingTips = (category: string) => {
    switch (category) {
      case "공원":
        return [
          "넓은 공간이므로 계획적으로 경로를 정해보세요",
          "화장실과 휴식 공간이 잘 갖춰져 있어요",
          "가족 단위 방문객이 많으니 안전에 주의하세요"
        ];
      case "하천":
        return [
          "물가는 미끄러울 수 있으니 조심하세요",
          "습도가 높을 수 있으니 충분한 수분 섭취를 하세요",
          "야간에는 조명이 있는 구간을 이용하세요"
        ];
      case "산":
        return [
          "등산화나 운동화를 착용하세요",
          "경사가 있으므로 무리하지 마세요",
          "날씨 변화에 대비한 준비를 하세요"
        ];
      default:
        return [
          "안전에 주의하며 플로깅하세요",
          "주변 환경을 보호해주세요",
          "충분한 수분 섭취를 하세요"
        ];
    }
  };

  return (
    <div className="bg-white">
      {/* 장소 설명 */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Info className="w-5 h-5 mr-2 text-emerald-600" />
          장소 소개
        </h3>
        <p className="text-gray-700 leading-relaxed mb-3">
          {description || getCategoryDescription(category)}
        </p>
      </div>

      {/* 플로깅 팁 */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          💡 플로깅 팁
        </h3>
        <div className="space-y-2">
          {getPloggingTips(category).map((tip, index) => (
            <div key={index} className="flex items-start">
              <span className="text-emerald-600 text-sm mr-2 mt-1">•</span>
              <span className="text-gray-700 text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 위치 정보 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
          위치 정보
        </h3>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-600 space-y-1">
            <div>위도: {latitude}</div>
            <div>경도: {longitude}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationOverviewSection;
