import React from 'react';
import { MapPin, Clock, Target, Star } from 'lucide-react';
import type { Course } from '../types';

const Hero: React.FC = () => {
  const recommendedCourses: Course[] = [
    {
      id: '1',
      name: 'Central Park Loop',
      location: 'Manhattan, NY',
      distance: '3.2 km',
      difficulty: 'Easy',
      estimatedTime: '25 min',
      cleanupSpots: 8,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Riverside Trail',
      location: 'Brooklyn, NY',
      distance: '5.1 km',
      difficulty: 'Medium',
      estimatedTime: '40 min',
      cleanupSpots: 12,
      rating: 4.6
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-sky-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ready to Plog Today?
          </h2>
          <p className="text-gray-600">
            Discover eco-friendly running routes in your area
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Your Region</h3>
            <div className="flex items-center text-sm text-emerald-600">
              <MapPin className="w-4 h-4 mr-1" />
              Manhattan, NY
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-emerald-50 rounded-xl p-3">
              <div className="text-lg font-bold text-emerald-600">127</div>
              <div className="text-xs text-gray-600">Total KM</div>
            </div>
            <div className="bg-sky-50 rounded-xl p-3">
              <div className="text-lg font-bold text-sky-600">43</div>
              <div className="text-xs text-gray-600">Clean-ups</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <div className="text-lg font-bold text-orange-600">8.5</div>
              <div className="text-xs text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Recommended Courses</h3>
          {recommendedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;