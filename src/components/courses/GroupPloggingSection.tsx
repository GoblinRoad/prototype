"use client"

import type React from "react"
import { Calendar, MapPin, Users, PlusCircle } from "lucide-react"
import { useNavigate } from "react-router-dom" // useNavigate 임포트

interface GroupEvent {
    id: string
    name: string
    location: string
    date: string
    time: string
    participants: number
    maxParticipants: number
    difficulty: "쉬움" | "보통" | "어려움"
    imageUrl: string
}

interface GroupPloggingSectionProps {
    events: GroupEvent[]
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "쉬움":
            return "bg-green-100 text-green-800"
        case "보통":
            return "bg-yellow-100 text-yellow-800"
        case "어려움":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const GroupPloggingSection: React.FC<GroupPloggingSectionProps> = ({ events }) => {
    const navigate = useNavigate() // useNavigate 훅 사용

    const handleCreateEventClick = () => {
        navigate("/group-events/create") // 이벤트 생성 페이지로 이동
    }

    const handleEventCardClick = (eventId: string) => {
        navigate(`/group-events/${eventId}`) // 이벤트 상세 페이지로 이동
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">그룹 플로깅 이벤트</h2>
                <button
                    onClick={handleCreateEventClick} // 클릭 이벤트 핸들러 연결
                    className="flex items-center text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
                >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    이벤트 생성
                </button>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">아직 예정된 그룹 플로깅 이벤트가 없습니다.</p>
                    <p className="text-sm text-gray-500">새로운 이벤트를 직접 만들어보세요!</p>
                    <button
                        onClick={handleCreateEventClick} // 클릭 이벤트 핸들러 연결
                        className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                        이벤트 만들기
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => handleEventCardClick(event.id)} // 카드 클릭 시 상세 페이지로 이동
                        >
                            <img src={event.imageUrl || "/placeholder.svg"} alt={event.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-2">{event.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-emerald-500" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-cyan-500" />
                                        <span>
                      {event.date} {event.time}
                    </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                        {event.participants}/{event.maxParticipants}명
                      </span>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(event.difficulty)}`}
                                        >
                      {event.difficulty}
                    </span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation() // 카드 클릭 이벤트와 중복 방지
                                            handleEventCardClick(event.id) // 참여하기 버튼 클릭 시에도 상세 페이지로 이동
                                        }}
                                        className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                                    >
                                        참여하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GroupPloggingSection
