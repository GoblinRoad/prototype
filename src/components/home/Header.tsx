import React from 'react';

const Header: React.FC = () => {
  return (
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">깨비로드</h1>
          </div>
        </div>
      </header>
  );
};

export default Header;