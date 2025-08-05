import React from "react";
import { MapPin, Clock, Users } from "lucide-react";

const courses = [
  {
    id: 1,
    name: "한강 플로깅 코스",
    location: "마포구 한강공원",
    duration: "1시간 30분",
    difficulty: "쉬움",
    rating: 4.8,
    participants: 234,
    image: "https://cdn.m-i.kr/news/photo/202408/1146803_915673_016.jpg",
  },
  {
    id: 2,
    name: "남산타워 둘레길",
    location: "중구 남산공원",
    duration: "2시간",
    difficulty: "보통",
    rating: 4.6,
    participants: 189,
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "올림픽공원 코스",
    location: "송파구 올림픽공원",
    duration: "1시간",
    difficulty: "쉬움",
    rating: 4.7,
    participants: 156,
    image:
      "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const RegionalCourses: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">추천 플로깅 코스</h2>
        <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
          전체보기
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
                {course.difficulty}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-2">{course.name}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>{course.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {course.participants}명
                    </span>
                  </div>
                </div>

                <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                  참여하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalCourses;
