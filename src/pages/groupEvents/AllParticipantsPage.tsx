import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Users } from "lucide-react"
import type { Participant } from "@/types"

const AllParticipantsPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { participants, eventName } = location.state as {
        participants: Participant[]
        eventName: string
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto w-full">
            {/* Header */}
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0 w-full">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">{eventName ? `${eventName} 참여자` : "이벤트 참여자"}</h1>
                </div>
            </div>

            {/* Participants List */}
            <div className="flex-1 overflow-y-auto p-4 pb-20">
                {participants && participants.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
                        {participants.map((participant) => (
                            <div
                                key={participant.id}
                                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <img
                                    src={participant.avatar || "/placeholder.svg"}
                                    alt={participant.name}
                                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                                />
                                <span className="font-medium text-gray-900">{participant.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 bg-white rounded-xl shadow-sm">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">참여자가 없습니다.</p>
                        <p className="text-sm text-gray-500">새로운 참여자를 기다려보세요!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllParticipantsPage
