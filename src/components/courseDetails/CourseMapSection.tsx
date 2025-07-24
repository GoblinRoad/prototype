import type React from "react"
import { MapPin, Navigation } from "lucide-react"

interface CourseMapSectionProps {
    location: string
}

const CourseMapSection: React.FC<CourseMapSectionProps> = ({ location }) => {
    return (
        <div className="relative">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">코스 지도</p>
                    <p className="text-sm text-gray-400 mt-1">{location}</p>
                </div>
            </div>
            <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Navigation className="w-5 h-5 text-emerald-600" />
            </button>
        </div>
    )
}

export default CourseMapSection
