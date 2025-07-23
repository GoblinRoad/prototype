import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Rankings from './components/Rankings';
import NewsSection from './components/NewsSection';
import WeatherWidget from './components/WeatherWidget';
import BottomNavigation from './components/BottomNavigation';
import CoursesPage from './components/CoursesPage';
import RankingsPage from './components/RankingsPage';
import CertificationPage from './components/CertificationPage';
import MyPage from './components/MyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'courses':
        return <CoursesPage />;
      case 'rankings':
        return <RankingsPage />;
      case 'certification':
        return <CertificationPage />;
      case 'profile':
        return <MyPage />;
      default:
        return (
          <>
            <Hero />
            <Rankings />
            <NewsSection />
            <WeatherWidget />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {currentPage === 'home' && <Header />}
      <main className={currentPage !== 'home' ? 'pt-0' : ''}>
        {renderCurrentPage()}
      </main>
      <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;