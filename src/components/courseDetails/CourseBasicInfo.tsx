"use client"

import type React from "react"
import { MapPin, Clock, Target, Star } from "lucide-react"

interface CourseBasicInfoProps {
    name: string
    location: string
    rating: number
    reviewCount: number
    distance: string
    estimatedTime: string
    difficulty: string
    onStartPlogging: () => void
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "쉬움":
            return "bg-green-100 text-green-800"
        case "보통":
            return "bg-yellow-100 text-yellow-800"
        case "어려움":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const CourseBasicInfo: React.FC<CourseBasicInfoProps> = ({
                                                             name,
                                                             location,
                                                             rating,
                                                             reviewCount,
                                                             distance,
                                                             estimatedTime,
                                                             difficulty,
                                                             onStartPlogging,
                                                         }) => {
    return (
        <div className="bg-white px-4 py-4 border-b">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {location}
                    </div>
                </div>
                <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold ml-1">{rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 text-emerald-500 mr-1" />
                        <span className="text-sm font-medium text-gray-600">거리</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{distance}</span>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                        <Clock className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium text-gray-600">시간</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{estimatedTime}</span>
                </div>
                <div className="text-center">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
                </div>
            </div>

            <button
                onClick={onStartPlogging}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors font-semibold"
            >
                플로깅 시작하기
            </button>
        </div>
    )
}

export default CourseBasicInfo
