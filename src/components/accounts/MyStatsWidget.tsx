import React from 'react';
import { User } from 'lucide-react';

const MyStatsWidget: React.FC = () => {
    // 내 기록 데이터
    const myStats = {
        totalDistance: 127.5,
        totalCleanups: 43,
        currentStreak: 5,
        level: 12
    };

    return (
        <section className="bg-gradient-to-br from-emerald-50 to-sky-50 px-4 py-6">
            <div className="max-w-md mx-auto">
                {/* 내 기록 섹션 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20 active:scale-95 transition-transform duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <User className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">내 기록</h3>
                        </div>
                        <div className="px-3 py-1 bg-emerald-100 rounded-full">
                            <span className="text-sm text-emerald-700 font-semibold">레벨 {myStats.level}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 active:scale-95 transition-transform duration-150">
                            <div className="text-xl font-bold text-emerald-600">{myStats.totalDistance}</div>
                            <div className="text-xs text-gray-600 mt-1">총 거리 (km)</div>
                        </div>
                        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 active:scale-95 transition-transform duration-150">
                            <div className="text-xl font-bold text-sky-600">{myStats.totalCleanups}</div>
                            <div className="text-xs text-gray-600 mt-1">인증 횟수</div>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 active:scale-95 transition-transform duration-150">
                            <div className="text-xl font-bold text-orange-600">{myStats.currentStreak}</div>
                            <div className="text-xs text-gray-600 mt-1">연속 일수</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyStatsWidget;