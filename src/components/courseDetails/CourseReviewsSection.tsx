import type React from "react"
import { Star } from "lucide-react"

interface CourseReviewsSectionProps {
    rating: number
    reviewCount: number
}

const CourseReviewsSection: React.FC<CourseReviewsSectionProps> = ({ rating, reviewCount }) => {
    // 임시 리뷰 데이터 (실제로는 API에서 가져올 데이터)
    const reviews = [
        {
            id: "1",
            user: "김플로깅",
            avatar:
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
            rating: 5,
            time: "2일 전",
            comment:
                "한강 경치가 정말 아름다워요! 평평한 길이라 걷기도 편하고, 일몰 시간에 플로깅하니 더욱 좋았습니다. 쓰레기통도 곳곳에 있어서 편리해요.",
        },
        {
            id: "2",
            user: "환경지킴이",
            avatar:
                "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
            rating: 4,
            time: "5일 전",
            comment:
                "가족과 함께 즐겁게 플로깅했습니다. 아이들도 쉽게 따라올 수 있는 코스예요. 다만 주말에는 사람이 많아서 조금 복잡할 수 있어요.",
        },
    ]

    return (
        <div className="p-4">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">{rating}</div>
                    <div className="flex items-center justify-center mt-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-gray-600">{reviewCount}개의 리뷰</div>
                </div>
            </div>

            {/* 리뷰 목록 */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center space-x-3 mb-3">
                            <img
                                src={review.avatar || "/placeholder.svg"}
                                alt="사용자"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <h5 className="font-medium text-gray-900">{review.user}</h5>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{review.time}</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <button className="text-emerald-600 font-medium text-sm">더 많은 리뷰 보기</button>
            </div>
        </div>
    )
}

export default CourseReviewsSection
