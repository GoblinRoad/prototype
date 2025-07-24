import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Rankings from "./components/Rankings";
import NewsSection from "./components/NewsSection";
import EnvironmentalNews from "./components/EnvironmentalNews";
import PloggingRanking from "./components/PloggingRanking";
import WeatherInfo from "./components/WeatherInfo";
import BottomNavigation from "./components/BottomNavigation";
import CoursesPage from "./components/CoursesPage";
import RankingsPage from "./components/RankingsPage";
import RegionalCourses from "./components/RegionalCourses";
import CertificationPage from "./components/CertificationPage";
import MyPage from "./components/MyPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "courses":
        return <CoursesPage />;
      case "rankings":
        return <RankingsPage />;
      case "certification":
        return <CertificationPage />;
      case "profile":
        return <MyPage />;
      default:
        return (
          <div className="max-w-md mx-auto">
            {/* Weather & Air Quality */}
            <WeatherInfo />

            {/* Regional Courses */}
            <RegionalCourses />

            {/* Plogging Ranking */}
            <PloggingRanking />

            {/* Environmental News */}
            <EnvironmentalNews />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {currentPage === "home" && <Header />}
      <main className={`pb-20 ${currentPage !== "home" ? "pt-0" : ""}`}>
        {renderCurrentPage()}
      </main>
      <BottomNavigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
