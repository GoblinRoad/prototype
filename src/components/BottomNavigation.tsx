import React from 'react';
import { MapPin, Trophy, Home, Award, User } from 'lucide-react';
import type { TabItem } from '../types';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPage, onPageChange }) => {

  const tabs: TabItem[] = [
    { id: 'courses', label: 'Courses', icon: 'MapPin' },
    { id: 'rankings', label: 'Rankings', icon: 'Trophy' },
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'certification', label: 'Certification', icon: 'Award' },
    { id: 'profile', label: 'My Page', icon: 'User' }
  ];

  const getIcon = (iconName: string, isActive: boolean) => {
    const className = `w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`;
    
    switch (iconName) {
      case 'MapPin': return <MapPin className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'Home': return <Home className={className} />;
      case 'Award': return <Award className={className} />;
      case 'User': return <User className={className} />;
      default: return <Home className={className} />;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentPage === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onPageChange(tab.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-emerald-50 scale-105' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  {getIcon(tab.icon, isActive)}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></div>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-emerald-600' : 'text-gray-500'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;