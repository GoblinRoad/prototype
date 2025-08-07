"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Calendar, Users, Info, MessageSquare, CheckCircle, XCircle, Play } from "lucide-react"
import type { GroupEvent, KakaoMapInstance } from "@/types"
// import profileImage from "#/defaultProfile.webp"

const GroupEventDetailPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>()
    const navigate = useNavigate()
    const [eventDetail, setEventDetail] = useState<GroupEvent | null>(null)
    const [loading, setLoading] = useState(true)
    const [isJoined, setIsJoined] = useState(false)
    const [mapLoaded, setMapLoaded] = useState(false)

    const mapRef = useRef<HTMLDivElement>(null)
    const kakaoMapInstance = useRef<KakaoMapInstance | null>(null)

    const groupEventsData: Record<string, GroupEvent> = {
        g1: {
            id: "g1",
            name: "주말 한강공원 단체 플로깅",
            location: "서울 여의도 한강공원",
            date: "2025-08-10",
            time: "10:00",
            participants: 15,
            maxParticipants: 30,
            difficulty: "쉬움",
            imageUrl: "https://cdn.m-i.kr/news/photo/202408/1146803_915673_016.jpg",
            description:
                "여의도 한강공원에서 함께 플로깅하며 깨끗한 한강을 만들어요! 초보자도 환영하며, 쓰레기 봉투와 집게는 제공됩니다. 가벼운 복장과 편한 신발을 착용해주세요.",
            meetingPoint: "여의나루역 2번 출구 앞",
            meetingPointLat: 37.52832,
            meetingPointLng: 126.93019,
            organizer: { id: "org1", name: "깨비로드 운영진", avatar: profileImage },
            chatLink: "https://open.kakao.com/o/example",
            status: "upcoming",
            participantsList: Array.from({ length: 15 }).map((_, i) => ({
                id: `user${i + 1}`,
                name: `참여자 ${i + 1}`,
                avatar: profileImage,
            })),
        },
        g2: {
            id: "g2",
            name: "남산 둘레길 환경 정화",
            location: "서울 중구 남산공원",
            date: "2025-08-15",
            time: "14:00",
            participants: 8,
            maxParticipants: 20,
            difficulty: "보통",
            imageUrl: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400",
            description:
                "남산 둘레길을 걸으며 쓰레기를 줍는 환경 정화 활동입니다. 적당한 경사가 있어 운동도 되고, 아름다운 남산의 자연을 지킬 수 있습니다. 개인 텀블러 지참 부탁드립니다.",
            meetingPoint: "남산도서관 입구",
            meetingPointLat: 37.55094,
            meetingPointLng: 126.98008,
            organizer: { id: "org2", name: "그린워커스", avatar: profileImage },
            chatLink: "https://open.kakao.com/o/example2",
            status: "upcoming",
            participantsList: Array.from({ length: 8 }).map((_, i) => ({
                id: `user${i + 1}`,
                name: `참여자 ${i + 1}`,
                avatar: profileImage,
            })),
        },
    }

    useEffect(() => {
        const fetchEventDetail = async () => {
            setLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 500))

                if (eventId && groupEventsData[eventId]) {
                    setEventDetail(groupEventsData[eventId])
                    setIsJoined(false)
                } else {
                    navigate("/courses/group")
                }
            } catch (error) {
                console.error("이벤트 정보를 불러오는데 실패했습니다:", error)
                navigate("/courses/group")
            } finally {
                setLoading(false)
            }
        }

        if (eventId) {
            fetchEventDetail()
        }
    }, [eventId, navigate])

    useEffect(() => {
        const script = document.createElement("script")
        script.async = true
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_API_KEY}&autoload=false&libraries=services`

        script.onload = () => {
            window.kakao.maps.load(() => {
                setMapLoaded(true)
            })
        }

        document.head.appendChild(script)

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [])

    useEffect(() => {
        if (eventDetail && mapLoaded && mapRef.current && window.kakao && window.kakao.maps && !kakaoMapInstance.current) {
            const { meetingPointLat, meetingPointLng } = eventDetail

            if (meetingPointLat && meetingPointLng) {
                const mapOption = {
                    center: new window.kakao.maps.LatLng(meetingPointLat, meetingPointLng),
                    level: 3,
                }
                const map = new window.kakao.maps.Map(mapRef.current, mapOption)
                kakaoMapInstance.current = map

                const markerPosition = new window.kakao.maps.LatLng(meetingPointLat, meetingPointLng)
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                })
                marker.setMap(map)
            }
        }
    }, [eventDetail, mapLoaded])

    const handleJoinToggle = () => {
        setIsJoined(!isJoined)
        alert(isJoined ? "이벤트 참여가 취소되었습니다." : "이벤트에 참여했습니다!")
    }

    const handleStartEvent = () => {
        alert("그룹 플로깅을 시작합니다!")
        navigate(`/certification?eventId=${eventId}`)
    }

    const handleChatRoomClick = () => {
        if (eventDetail) {
            navigate(`/group-events/${eventId}/chat`, {
                state: { eventName: eventDetail.name, eventId: eventDetail.id },
            })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">이벤트 정보를 불러오는 중...</p>
                </div>
            </div>
        )
    }

    if (!eventDetail) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">이벤트를 찾을 수 없습니다.</p>
                    <button onClick={() => navigate("/courses/group")} className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                        이벤트 목록으로 돌아가기
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto w-full">
            {/* 헤더 */}
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0 w-full">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">그룹 플로깅 상세</h1>
                </div>
            </div>

            {/* 이벤트 이미지 */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded-b-lg">
                <img
                    src={eventDetail.imageUrl || "/placeholder.svg"}
                    alt={eventDetail.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 모든 콘텐츠를 감싸는 새로운 컨테이너. 여기에 패딩을 적용합니다. */}
            <div className="flex-1 overflow-y-auto pb-20 p-4 space-y-4">
                {/* 기본 정보 섹션 */}
                <div className="bg-white rounded-xl p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{eventDetail.name}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span>{eventDetail.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-cyan-500" />
                            <span>
                {eventDetail.date} {eventDetail.time}
              </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>
                {eventDetail.participants}/{eventDetail.maxParticipants}명 참여
              </span>
                        </div>
                        <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                eventDetail.difficulty === "쉬움"
                                    ? "bg-green-100 text-green-800"
                                    : eventDetail.difficulty === "보통"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                            }`}
                        >
              {eventDetail.difficulty}
            </span>
                    </div>
                </div>

                {/* 상세 정보 섹션 */}
                <div className="space-y-4">
                    {/* 이벤트 설명 */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Info className="w-5 h-5 text-blue-500" />
                            이벤트 소개
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{eventDetail.description}</p>
                    </div>

                    {/* 모임 장소 지도 */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-purple-500" />
                            모임 장소
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{eventDetail.meetingPoint}</p>
                        {eventDetail.meetingPointLat && eventDetail.meetingPointLng && mapLoaded ? (
                            <div ref={mapRef} className="w-full h-48 rounded-lg" />
                        ) : (
                            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                지도 정보를 불러오는 중...
                            </div>
                        )}
                    </div>

                    {/* 주최자 정보 */}
                    {eventDetail.organizer && (
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Users className="w-5 h-5 text-orange-500" />
                                주최자
                            </h3>
                            <div className="flex items-center space-x-3">
                                <img
                                    src={eventDetail.organizer.avatar || "/placeholder.svg"}
                                    alt={eventDetail.organizer.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium text-gray-900">{eventDetail.organizer.name}</span>
                            </div>
                        </div>
                    )}

                    {/* 참여자 목록 */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-500" />
                            참여자 ({eventDetail.participants}명)
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {eventDetail.participantsList?.slice(0, 10).map((participant) => (
                                <img
                                    key={participant.id}
                                    src={participant.avatar || "/placeholder.svg"}
                                    alt={participant.name}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                            ))}
                            {eventDetail.participantsList && eventDetail.participantsList.length > 10 && (
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 border border-gray-200">
                                    +{eventDetail.participantsList.length - 10}
                                </div>
                            )}
                        </div>
                        <button
                            className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            onClick={() =>
                                navigate(`/group-events/${eventId}/participants`, {
                                    state: { participants: eventDetail.participantsList, eventName: eventDetail.name },
                                })
                            }
                        >
                            모든 참여자 보기
                        </button>
                    </div>
                </div>
            </div>

            {/* 하단 액션 버튼 */}
            <div className="bg-white border-t border-gray-200 p-4 w-full">
                {isJoined && (
                    <div className="flex space-x-4 mb-4">
                        {/*<a*/}
                        {/*    href={eventDetail.chatLink}*/}
                        {/*    target="_blank"*/}
                        {/*    rel="noopener noreferrer"*/}
                        {/*    className="flex-1 flex items-center justify-center px-4 py-3 text-sm bg-cyan-100 text-cyan-800 rounded-2xl font-medium hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 transition-colors"*/}
                        {/*    aria-label="이벤트 채팅방 열기"*/}
                        {/*>*/}
                            <button
                                onClick={handleChatRoomClick} // 카카오톡 오픈채팅 링크 대신 내부 채팅방으로 이동
                                className="flex-1 flex items-center justify-center px-4 py-3 text-sm bg-cyan-100 text-cyan-800 rounded-2xl font-medium hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 transition-colors"
                                aria-label="이벤트 채팅방 열기"
                            >
                            <MessageSquare className="w-5 h-5 mr-2 text-cyan-600" />
                            채팅방
                        </button>
                        {/*</a>*/}

                        <button
                            onClick={handleStartEvent}
                            className="flex-1 flex items-center justify-center px-4 py-3 text-sm bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 transition-colors"
                            aria-label="플로깅 이벤트 시작"
                        >
                            <Play className="w-5 h-5 mr-2" />
                            플로깅 시작하기
                        </button>
                    </div>
                )}

                {isJoined ? (
                    <button
                        onClick={handleJoinToggle}
                        className="w-full flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                    >
                        <XCircle className="w-5 h-5 mr-2" />
                        참여 취소
                    </button>
                ) : (
                    <button
                        onClick={handleJoinToggle}
                        className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        참여하기
                    </button>
                )}
            </div>
        </div>
    )
}

export default GroupEventDetailPage
