import React from "react";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

const rankings = [
  {
    rank: 1,
    name: "지구지킴이",
    points: 2450,
    badges: 12,
    weeklyIncrease: "+89",
    avatar: "🌟",
  },
  {
    rank: 2,
    name: "환경사랑",
    points: 2280,
    badges: 10,
    weeklyIncrease: "+76",
    avatar: "🌱",
  },
  {
    rank: 3,
    name: "클린워커",
    points: 2100,
    badges: 9,
    weeklyIncrease: "+65",
    avatar: "♻️",
  },
  {
    rank: 4,
    name: "그린플로거",
    points: 1980,
    badges: 8,
    weeklyIncrease: "+54",
    avatar: "🌿",
  },
  {
    rank: 5,
    name: "에코히어로",
    points: 1850,
    badges: 7,
    weeklyIncrease: "+43",
    avatar: "🌍",
  },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-yellow-500" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">
          #{rank}
        </span>
      );
  }
};

const PloggingRanking: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">플로깅 랭킹</h2>
        <div className="flex items-center gap-1 text-emerald-600 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>주간 순위</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="space-y-3">
          {rankings.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                user.rank <= 3
                  ? "bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-100"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {getRankIcon(user.rank)}
                <div className="text-2xl">{user.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{user.points}점</span>
                    <span>•</span>
                    <span>뱃지 {user.badges}개</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>{user.weeklyIncrease}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-center">
          <p className="text-sm text-emerald-700">
            <span className="font-semibold">내 순위: 23위</span> • 1,450점
          </p>
          <button className="mt-2 text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors">
            더 많은 활동으로 순위 올리기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PloggingRanking;
