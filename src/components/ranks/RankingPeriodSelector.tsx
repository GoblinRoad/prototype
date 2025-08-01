import type React from "react"

interface RankingPeriodSelectorProps {
    rankingPeriod: "weekly" | "monthly" | "all"
    setRankingPeriod: (period: "weekly" | "monthly" | "all") => void
}

const RankingPeriodSelector: React.FC<RankingPeriodSelectorProps> = ({
                                                                         rankingPeriod,
                                                                         setRankingPeriod
                                                                     }) => {
    return (
        <div className="flex justify-center mb-8">
            <div className="flex space-x-8">
                <button
                    onClick={() => setRankingPeriod("weekly")}
                    className={`pb-3 text-base font-semibold transition-all duration-200 relative ${
                        rankingPeriod === "weekly"
                            ? 'text-gray-900'
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    주간
                    {rankingPeriod === "weekly" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setRankingPeriod("monthly")}
                    className={`pb-3 text-base font-semibold transition-all duration-200 relative ${
                        rankingPeriod === "monthly"
                            ? 'text-gray-900'
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    월간
                    {rankingPeriod === "monthly" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setRankingPeriod("all")}
                    className={`pb-3 text-base font-semibold transition-all duration-200 relative ${
                        rankingPeriod === "all"
                            ? 'text-gray-900'
                            : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    전체
                    {rankingPeriod === "all" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                    )}
                </button>
            </div>
        </div>
    )
}

export default RankingPeriodSelector