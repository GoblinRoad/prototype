import React from 'react';
import Header from '@/components/home/Header';
import WeatherInfo from '@/components/home/WeatherInfo';
import RegionalCourses from '@/components/home/RegionalCourses';
import PloggingRanking from '@/components/home/PloggingRanking';
import EnvironmentalNews from '@/components/home/EnvironmentalNews';

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-md mx-auto pb-20">
                <WeatherInfo />
                <RegionalCourses />
                <PloggingRanking />
                <EnvironmentalNews />
            </main>
        </div>
    );
};

export default HomePage;