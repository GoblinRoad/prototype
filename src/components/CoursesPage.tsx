import React, { useState } from 'react';
import { MapPin, Clock, Target, Star, Filter, Search, Navigation } from 'lucide-react';
import type { Course } from '../types';

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const courses: Course[] = [
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
    },
    {
      id: '3',
      name: 'Brooklyn Bridge Path',
      location: 'Brooklyn, NY',
      distance: '2.8 km',
      difficulty: 'Easy',
      estimatedTime: '20 min',
      cleanupSpots: 6,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Hudson River Greenway',
      location: 'Manhattan, NY',
      distance: '8.2 km',
      difficulty: 'Hard',
      estimatedTime: '65 min',
      cleanupSpots: 18,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Prospect Park Circuit',
      location: 'Brooklyn, NY',
      distance: '4.5 km',
      difficulty: 'Medium',
      estimatedTime: '35 min',
      cleanupSpots: 10,
      rating: 4.5
    },
    {
      id: '6',
      name: 'High Line Extension',
      location: 'Manhattan, NY',
      distance: '1.8 km',
      difficulty: 'Easy',
      estimatedTime: '15 min',
      cleanupSpots: 4,
      rating: 4.4
    }
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        {/* Search and Filter Section */}
        <div className="bg-white p-4 shadow-sm">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <div className="flex space-x-2 overflow-x-auto">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              {filteredCourses.length} Courses Available
            </h2>
            <button className="flex items-center text-emerald-600 text-sm font-medium">
              <Navigation className="w-4 h-4 mr-1" />
              Near Me
            </button>
          </div>

          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{course.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {course.location}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{course.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center text-emerald-600 mb-1">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{course.distance}</div>
                  <div className="text-xs text-gray-500">Distance</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-sky-600 mb-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{course.estimatedTime}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-orange-600 mb-1">
                    <span className="w-4 h-4 text-lg">🗑️</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{course.cleanupSpots}</div>
                  <div className="text-xs text-gray-500">Cleanup Spots</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors">
                  Start Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;