import type React from "react"
import { MapPin } from "lucide-react"
import type { Course } from "../../types"
import CourseCard from "./CourseCard"

interface NearbyCoursesSectionProps {
    courses: Course[]
    onCourseClick: (courseId: string) => void
}

const NearbyCoursesSection: React.FC<NearbyCoursesSectionProps> = ({ courses, onCourseClick }) => {
    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">현재 위치 기반 코스</h2>
                <div className="flex items-center text-sm text-emerald-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    서울시
                </div>
            </div>

            <div className="space-y-3">
                {courses.map((course) => (
                    <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
                ))}
            </div>
        </div>
    )
}

export default NearbyCoursesSection
