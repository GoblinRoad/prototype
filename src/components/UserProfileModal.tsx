import React, { useEffect } from 'react';
import { X, Trophy, Target, Zap, Calendar, Star, Medal, MapPin } from 'lucide-react';
import type { User } from '../types';

interface UserProfileModalProps {
    user: User;
    onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
    // 모달 열릴 때 뒤쪽 스크롤 막기
    useEffect(() => {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;

        // body 스크롤 막기
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // 모달 닫힐 때 복원
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // 사용자 상세 정보 (실제로는 API에서 가져올 데이터)
    const userDetail = {
        ...user,
        joinDate: '2023-06-15',
        level: 15,
        currentStreak: 12,
        longestStreak: 28,
        completedCourses: 23,
        favoriteLocation: '한강공원',
        badges: ['첫 걸음', '거리 달성자', '정리 챔피언', '연속 달성자'],
        recentActivities: [
            { date: '2일 전', activity: '올림픽공원 플로깅 완료', points: 85 },
            { date: '4일 전', activity: '한강공원 코스 완주', points: 120 },
            { date: '1주 전', activity: '"연속 달성자" 뱃지 획득', points: 200 }
        ],
        monthlyStats: {
            thisMonth: { distance: 28.4, cleanups: 35, points: 890 },
            lastMonth: { distance: 31.2, cleanups: 42, points: 1020 }
        }
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
        if (rank === 2) return <Trophy className="w-6 h-6 text-gray-400" />;
        if (rank === 3) return <Trophy className="w-6 h-6 text-orange-600" />;
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">#{rank}</span>;
    };

    const getRankBadgeColor = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
        if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
        if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-500';
        return 'bg-gradient-to-r from-emerald-400 to-emerald-500';
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-t-3xl w-full max-w-md h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 헤더 */}
                <div className="relative bg-gradient-to-br from-emerald-500 to-sky-500 px-6 pt-6 pb-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="text-center mt-4">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-3"
                        />

                        <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>

                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                                {getRankIcon(user.rank)}
                            </div>
                            <div className="text-white">
                                <div className="text-sm opacity-90">현재 순위</div>
                                <div className="font-bold">#{user.rank}</div>
                            </div>
                            <div className="text-white">
                                <div className="text-sm opacity-90">레벨</div>
                                <div className="font-bold">{userDetail.level}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 스크롤 가능한 콘텐츠 */}
                <div className="overflow-y-auto h-full pb-20">
                    {/* 주요 통계 */}
                    <div className="px-6 -mt-4 mb-6">
                        <div className="bg-white rounded-2xl p-5 shadow-lg">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Target className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{user.stats.distance}km</div>
                                    <div className="text-xs text-gray-600">총 거리</div>
                                </div>

                                <div>
                                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Trophy className="w-6 h-6 text-sky-600" />
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{user.stats.cleanups}</div>
                                    <div className="text-xs text-gray-600">정리한 개수</div>
                                </div>

                                <div>
                                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Zap className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{user.stats.points}</div>
                                    <div className="text-xs text-gray-600">총 점수</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 추가 정보 */}
                    <div className="px-6 space-y-4">
                        {/* 활동 통계 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">활동 통계</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">현재 연속</div>
                                    <div className="text-lg font-bold text-emerald-600">{userDetail.currentStreak}일</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">최장 연속</div>
                                    <div className="text-lg font-bold text-sky-600">{userDetail.longestStreak}일</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">완주한 코스</div>
                                    <div className="text-lg font-bold text-orange-600">{userDetail.completedCourses}개</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">선호 장소</div>
                                    <div className="text-sm font-medium text-gray-900 flex items-center justify-center">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {userDetail.favoriteLocation}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 이번 달 vs 지난 달 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">월간 비교</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">이번 달 거리</span>
                                    <div className="text-right">
                                        <span className="font-bold text-gray-900">{userDetail.monthlyStats.thisMonth.distance}km</span>
                                        <span className="text-xs text-red-500 ml-2">
                      -{(userDetail.monthlyStats.lastMonth.distance - userDetail.monthlyStats.thisMonth.distance).toFixed(1)}km
                    </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">이번 달 정리</span>
                                    <div className="text-right">
                                        <span className="font-bold text-gray-900">{userDetail.monthlyStats.thisMonth.cleanups}개</span>
                                        <span className="text-xs text-red-500 ml-2">
                      -{userDetail.monthlyStats.lastMonth.cleanups - userDetail.monthlyStats.thisMonth.cleanups}개
                    </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">이번 달 점수</span>
                                    <div className="text-right">
                                        <span className="font-bold text-gray-900">{userDetail.monthlyStats.thisMonth.points}점</span>
                                        <span className="text-xs text-red-500 ml-2">
                      -{userDetail.monthlyStats.lastMonth.points - userDetail.monthlyStats.thisMonth.points}점
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 뱃지 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">획득한 뱃지</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {userDetail.badges.map((badge, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-1">
                                            <Medal className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-xs font-medium text-gray-900 break-words">{badge}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 최근 활동 */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-3">최근 활동</h3>
                            <div className="space-y-3">
                                {userDetail.recentActivities.map((activity, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Star className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                                            <p className="text-xs text-gray-500">{activity.date} • +{activity.points}점</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 가입 정보 */}
                        <div className="text-center pb-6">
                            <p className="text-sm text-gray-500">
                                {new Date(userDetail.joinDate).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long'
                                })} 가입
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;