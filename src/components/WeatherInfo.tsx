import React from "react";
import { Sun, Wind, Droplets, AlertTriangle } from "lucide-react";

const WeatherInfo: React.FC = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white mt-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sun className="w-8 h-8" />
          <div>
            <p className="text-2xl font-bold">22°C</p>
            <p className="text-blue-100 text-sm">맑음</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-sm">미세먼지 좋음</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">습도 45%</span>
          </div>
        </div>
      </div>

      <div className="mt-3 p-2 bg-white/20 rounded-lg">
        <p className="text-sm text-center">
          오늘은 플로깅하기 좋은 날씨예요! 🌟
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
