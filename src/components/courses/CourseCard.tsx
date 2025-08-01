"use client"

import type React from "react"
import { MapPin, Clock, Target, Star } from "lucide-react"
import type { Course } from "@/types"

interface CourseCardProps {
    course: Course
    onCourseClick: (courseId: string) => void
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

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseClick }) => {
    return (
        <div
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onCourseClick(course.id)}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {course.location}
                    </div>
                </div>
                <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{course.rating}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-1" />
                        {course.distance}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.estimatedTime}
                    </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </span>
            </div>

            <button
                className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                onClick={(e) => {
                    e.stopPropagation()
                    // 플로깅 시작 로직
                }}
            >
                코스 시작하기
            </button>
        </div>
    )
}

export default CourseCard
