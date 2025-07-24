import React from 'react';
import { MapPin, Clock, Target, Star } from 'lucide-react';
import type { Course } from '../types';

const RecommendedCourses: React.FC = () => {
    const recommendedCourses: Course[] = [
        {
            id: '1',
            name: '한강공원 플로깅 코스',
            location: '서울 마포구',
            distance: '3.2 km',
            difficulty: '쉬움',
            estimatedTime: '25분',
            cleanupSpots: 8,
            rating: 4.8
        },
        {
            id: '2',
            name: '올림픽공원 둘레길',
            location: '서울 송파구',
            distance: '5.1 km',
            difficulty: '보통',
            estimatedTime: '40분',
            cleanupSpots: 12,
            rating: 4.6
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case '쉬움': return 'bg-green-100 text-green-800 border-green-200';
            case '보통': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case '어려움': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <section className="bg-gray-50 px-4 py-6">
            <div className="max-w-md mx-auto">
                {/* 추천 코스 섹션 */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">오늘의 추천 코스</h3>
                        <div className="flex items-center text-sm text-emerald-600 font-medium">
                            <MapPin className="w-4 h-4 mr-1" />
                            서울시
                        </div>
                    </div>

                    {recommendedCourses.map((course) => (
                        <div key={course.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 active:scale-95 transition-transform duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h4>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {course.location}
                                    </div>
                                </div>
                                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-semibold ml-1 text-gray-900">{course.rating}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Target className="w-4 h-4 mr-1 text-emerald-500" />
                                        <span className="font-medium">{course.distance}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-1 text-blue-500" />
                                        <span className="font-medium">{course.estimatedTime}</span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg">
                        더 많은 코스 보기
                    </button>
                </div>
            </div>
        </section>
    );
};

export default RecommendedCourses;