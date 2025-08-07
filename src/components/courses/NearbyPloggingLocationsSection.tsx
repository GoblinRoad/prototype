import type React from "react";
import type { PloggingLocation } from "@/types";
import { MapPin, Star } from "lucide-react";

interface NearbyPloggingLocationsSectionProps {
  locations: PloggingLocation[];
  onLocationClick: (locationId: string) => void;
}

const NearbyPloggingLocationsSection: React.FC<
  NearbyPloggingLocationsSectionProps
> = ({ locations, onLocationClick }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "공원":
        return "🏞️";
      case "하천":
        return "🌊";
      case "산":
        return "⛰️";
      case "해변":
        return "🏖️";
      case "문화재":
        return "🏛️";
      case "시가지":
        return "🏢";
      default:
        return "📍";
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          📍 내 주변 플로깅 장소
        </h2>
        <p className="text-sm text-gray-600">
          추천 플로깅 장소에서 환경을 생각하며 운동해보세요
        </p>
      </div>

      <div className="space-y-4">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onLocationClick(location.id)}
          >
            {/* 이미지 영역 */}
            <div className="relative h-32">
              <img
                src={location.imageUrl}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                  {getCategoryIcon(location.category)} {location.category}
                </span>
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-base">
                  {location.name}
                </h3>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{location.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({location.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location.address}</span>
              </div>

              {location.description && (
                <p className="text-sm text-gray-600">
                  {location.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">📍</div>
          <p className="text-gray-500">추천 플로깅 장소가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-1">
            다른 지역을 검색해보세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default NearbyPloggingLocationsSection;
