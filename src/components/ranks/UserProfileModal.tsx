import React, { useEffect } from 'react';
import { X, Trophy, Target, Zap } from 'lucide-react';
import type { User } from '@/types';

interface UserProfileModalProps {
    user: User;
    onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
    // 모달 열릴 때 뒤쪽 스크롤 막기
    useEffect(() => {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // 사용자 상세 정보
    const userDetail = {
        ...user,
        longestStreak: 28,
        completedCourses: 23,
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-[480px] max-w-[90vw] overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="relative bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="flex items-center space-x-4">
                        {/* 프로필 이미지 */}
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                        />

                        {/* 사용자 정보 */}
                        <div className="text-white">
                            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                            <div className="text-sm opacity-90">현재 순위 #{user.rank}</div>
                        </div>
                    </div>
                </div>

                {/* 콘텐츠 */}
                <div className="p-6 space-y-4">
                    {/* 주요 통계 */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Target className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="text-lg font-bold text-gray-900">{user.stats.distance}km</div>
                            <div className="text-xs text-gray-600">총 거리</div>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Trophy className="w-6 h-6 text-sky-600" />
                            </div>
                            <div className="text-lg font-bold text-gray-900">{user.stats.cleanups}</div>
                            <div className="text-xs text-gray-600">정리한 개수</div>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Zap className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="text-lg font-bold text-gray-900">{user.stats.points}</div>
                            <div className="text-xs text-gray-600">총 점수</div>
                        </div>
                    </div>

                    {/* 활동 통계 - 최장 연속 일수와 완주한 코스 개수 */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-1">최장 연속</div>
                                <div className="text-xl font-bold text-sky-600">{userDetail.longestStreak}일</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-gray-600 mb-1">완주한 코스</div>
                                <div className="text-xl font-bold text-emerald-600">{userDetail.completedCourses}개</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;