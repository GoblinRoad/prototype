"use client"

import type React from "react"
import { Trophy, Zap } from "lucide-react"
import type { User } from "../../types"

interface RankingListProps {
    users: User[]
    rankingType: "distance" | "cleanups" | "points"
    onUserClick: (user: User) => void
}

const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-600" />
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>
}

const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-500"
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400"
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-500"
    return "bg-gradient-to-r from-emerald-400 to-emerald-500"
}

const RankingList: React.FC<RankingListProps> = ({ users, rankingType, onUserClick }) => {
    return (
        <div className="space-y-3">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white rounded-xl p-4 shadow-sm active:scale-95 transition-transform duration-200 cursor-pointer"
                    onClick={() => onUserClick(user)}
                >
                    <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadgeColor(user.rank)}`}>
                            {getRankIcon(user.rank)}
                        </div>

                        <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Zap className="w-3 h-3 mr-1" />
                                    {rankingType === "distance" && `${user.stats.distance}km`}
                                    {rankingType === "cleanups" && `${user.stats.cleanups}개`}
                                    {rankingType === "points" && `${user.stats.points}점`}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">
                                {rankingType === "distance" && user.stats.distance}
                                {rankingType === "cleanups" && user.stats.cleanups}
                                {rankingType === "points" && user.stats.points}
                            </div>
                            <div className="text-xs text-gray-500">
                                {rankingType === "distance" && "km"}
                                {rankingType === "cleanups" && "개"}
                                {rankingType === "points" && "점"}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RankingList
