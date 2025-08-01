import type React from "react"
import type { User } from "../../types"

interface RankingListProps {
    users: User[]
    currentUserId?: string
    onUserClick?: (user: User) => void
}

// 상위 3명 표시 컴포넌트 (이미지 디자인에 맞게 수정)
export const TopThreeRanking: React.FC<RankingListProps> = ({ users, onUserClick }) => {
    const formatPoints = (points: number) => {
        return points.toLocaleString();
    };

    const topThreeUsers = users.slice(0, 3);

    // 2등, 1등, 3등 순서로 배치
    const [first, second, third] = topThreeUsers;

    return (
        <div className="px-6 py-8">
            <div className="flex justify-center items-end space-x-6">
                {/* 2등 */}
                {second && (
                    <div className="flex flex-col items-center" onClick={() => onUserClick?.(second)}>
                        <div className="relative mb-3">
                            <img
                                src={second.avatar}
                                alt="2등"
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-400 cursor-pointer"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">2</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 max-w-[80px] truncate">
                            {second.name}
                        </h3>
                        <div className="bg-gray-100 px-3 py-1 rounded-full">
                            <span className="text-gray-700 font-bold text-sm">
                                {formatPoints(second.stats.points)}
                            </span>
                        </div>
                    </div>
                )}

                {/* 1등 */}
                {first && (
                    <div className="flex flex-col items-center" onClick={() => onUserClick?.(first)}>
                        <div className="relative mb-3">
                            <img
                                src={first.avatar}
                                alt="1등"
                                className="w-20 h-20 rounded-full object-cover ring-4 ring-yellow-400 cursor-pointer"
                            />
                            <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">1</span>
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base mb-1 max-w-[90px] truncate">
                            {first.name}
                        </h3>
                        <div className="bg-yellow-100 px-4 py-1 rounded-full">
                            <span className="text-yellow-700 font-bold text-base">
                                {formatPoints(first.stats.points)}
                            </span>
                        </div>
                    </div>
                )}

                {/* 3등 */}
                {third && (
                    <div className="flex flex-col items-center" onClick={() => onUserClick?.(third)}>
                        <div className="relative mb-3">
                            <img
                                src={third.avatar}
                                alt="3등"
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-orange-400 cursor-pointer"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">3</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 max-w-[80px] truncate">
                            {third.name}
                        </h3>
                        <div className="bg-orange-100 px-3 py-1 rounded-full">
                            <span className="text-orange-700 font-bold text-sm">
                                {formatPoints(third.stats.points)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// 4등부터 리스트 컴포넌트 (이미지 디자인에 맞게 수정)
const RankingList: React.FC<RankingListProps> = ({ users, currentUserId, onUserClick }) => {
    const formatPoints = (points: number) => {
        return points.toLocaleString();
    };

    const restOfUsers = users.slice(3); // 4등부터
    const currentUser = users.find(user => user.id === currentUserId);
    const isUserInTopTen = currentUser && currentUser.rank <= 10;

    return (
        <div className="space-y-1">
            {/* 4등부터 10등까지 */}
            {restOfUsers.slice(0, 7).map((user) => {
                const isCurrentUser = user.id === currentUserId;
                return (
                    <div
                        key={user.id}
                        className={`
                            flex items-center py-4 px-4 rounded-xl transition-all duration-200 cursor-pointer
                            ${isCurrentUser ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-white hover:bg-gray-50'}
                        `}
                        onClick={() => onUserClick?.(user)}
                    >
                        {/* 순위 */}
                        <div className="w-8 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-600">
                                {user.rank}
                            </span>
                        </div>

                        {/* 프로필 사진 */}
                        <div className="mx-4">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>

                        {/* 사용자 정보 */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                                {user.name}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {user.stats.distance}km • {user.stats.cleanups}회
                            </p>
                        </div>

                        {/* 포인트 */}
                        <div className="text-right">
                            <div className="font-bold text-gray-700">
                                {formatPoints(user.stats.points)}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* 현재 사용자가 Top 10이 아닌 경우 */}
            {!isUserInTopTen && currentUser && (
                <>
                    <div className="flex justify-center py-4">
                        <div className="text-gray-400 text-sm">• • •</div>
                    </div>

                    <div
                        className="flex items-center py-4 px-4 rounded-xl bg-blue-50 ring-2 ring-blue-200 cursor-pointer"
                        onClick={() => onUserClick?.(currentUser)}
                    >
                        {/* 순위 */}
                        <div className="w-8 flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">
                                {currentUser.rank}
                            </span>
                        </div>

                        {/* 프로필 사진 */}
                        <div className="mx-4">
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.name}
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-300"
                            />
                        </div>

                        {/* 사용자 정보 */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-blue-900 truncate">
                                {currentUser.name} (나)
                            </h3>
                            <p className="text-blue-600 text-sm">
                                {currentUser.stats.distance}km • {currentUser.stats.cleanups}회
                            </p>
                        </div>

                        {/* 포인트 */}
                        <div className="text-right">
                            <div className="font-bold text-blue-700">
                                {formatPoints(currentUser.stats.points)}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RankingList;