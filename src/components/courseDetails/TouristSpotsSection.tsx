import type React from "react"
import type { TouristSpot } from "@/types"

interface TouristSpotsSectionProps {
    spots: TouristSpot[]
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case "공원":
            return "bg-green-100 text-green-700"
        case "생태공원":
            return "bg-emerald-100 text-emerald-700"
        case "랜드마크":
            return "bg-blue-100 text-blue-700"
        case "문화거리":
            return "bg-purple-100 text-purple-700"
        default:
            return "bg-gray-100 text-gray-700"
    }
}

const TouristSpotsSection: React.FC<TouristSpotsSectionProps> = ({ spots }) => {
    return (
        <div className="p-4">
            <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">주변 관광지 ({spots.length}곳)</h3>
                <p className="text-sm text-gray-600">플로깅과 함께 즐길 수 있는 주변 명소들입니다.</p>
            </div>

            <div className="space-y-4">
                {spots.map((spot) => (
                    <div key={spot.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                        <img src={spot.imageUrl || "/placeholder.svg"} alt={spot.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{spot.name}</h4>
                                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(spot.category)}`}>
                    {spot.category}
                  </span>
                                    <span className="text-sm text-gray-500">{spot.distance}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{spot.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TouristSpotsSection
