import type React from "react";
import { Star, MapPin } from "lucide-react";

interface LocationBasicInfoProps {
  name: string;
  address: string;
  category: string;
  rating: number;
  reviewCount: number;
  onStartPlogging: () => void;
}

const LocationBasicInfo: React.FC<LocationBasicInfoProps> = ({
  name,
  address,
  category,
  rating,
  reviewCount,
  onStartPlogging,
}) => {
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
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{getCategoryIcon(category)}</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
            {category}
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{address}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
            <span className="font-semibold text-gray-900">{rating}</span>
            <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStartPlogging}
        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
      >
        이 장소에서 플로깅 시작하기
      </button>
    </div>
  );
};

export default LocationBasicInfo;
