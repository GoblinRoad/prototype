import React from 'react';
import { Cloud, Droplets, Wind, AlertTriangle } from 'lucide-react';
import type { WeatherData } from '../types';

const WeatherWidget: React.FC = () => {
  const weatherData: WeatherData = {
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 68,
    aqi: 45,
    aqiLevel: 'Good'
  };

  const getAQIColor = (level: string) => {
    switch (level) {
      case 'Good': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Poor': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Unhealthy': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAQIIcon = (level: string) => {
    if (level === 'Good') return <Wind className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <section className="bg-white px-4 py-6">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weather & Air Quality</h2>
        
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Manhattan, NY</h3>
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">{weatherData.temperature}°</span>
                <div className="text-sm text-gray-600">
                  <div>{weatherData.condition}</div>
                  <div>Feels like 24°</div>
                </div>
              </div>
            </div>
            <Cloud className="w-12 h-12 text-sky-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Humidity</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{weatherData.humidity}%</span>
            </div>

            <div className={`rounded-xl p-3 border ${getAQIColor(weatherData.aqiLevel)}`}>
              <div className="flex items-center space-x-2 mb-1">
                {getAQIIcon(weatherData.aqiLevel)}
                <span className="text-sm font-medium">Air Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">{weatherData.aqi}</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-current bg-opacity-10">
                  {weatherData.aqiLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-800">
                Perfect conditions for plogging! 🏃‍♀️
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;