"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, PlusCircle, ImageIcon, Upload, MapPin, Search, X, MessageSquare } from "lucide-react" // MessageSquare 아이콘 추가
import type { KakaoPostcodeData, KakaoGeocoderResult } from "@/types"
import type { MutableRefObject } from "react"

interface KakaoPostcodeInstance {
    embed: (container: HTMLElement, options?: { width?: string; height?: string }) => void
    oncomplete?: (data: KakaoPostcodeData) => void
    onclose?: (state: string) => void
}

const CreateGroupEventPage: React.FC = () => {
    const navigate = useNavigate()
    const [eventName, setEventName] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [meetingPointLat, setMeetingPointLat] = useState<number | null>(null)
    const [meetingPointLng, setMeetingPointLng] = useState<number | null>(null)
    const [maxParticipants, setMaxParticipants] = useState(10)
    const [difficulty, setDifficulty] = useState<"쉬움" | "보통" | "어려움">("보통")
    const [description, setDescription] = useState("")
    const [eventImage, setEventImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [kakaoServicesLoaded, setKakaoServicesLoaded] = useState(false)
    const [kakaoPostcodeLoaded, setKakaoPostcodeLoaded] = useState(false)
    const [showPostcodeModal, setShowPostcodeModal] = useState(false)
    const [chatLink, setChatLink] = useState("") // 카카오톡 오픈채팅 링크 상태 추가

    const postcodeContainerRef = useRef<HTMLDivElement>(null)
    const postcodeInstanceRef = useRef<KakaoPostcodeInstance | null>(
        null,
    ) as MutableRefObject<KakaoPostcodeInstance | null>

    // Kakao Map API (services library) 및 Postcode API 스크립트 로드
    useEffect(() => {
        // 1. Kakao Map SDK (Geocoder 포함) 로드
        const mapScript = document.createElement("script")
        mapScript.async = true
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_API_KEY}&autoload=false&libraries=services`
        document.head.appendChild(mapScript)

        mapScript.onload = () => {
            window.kakao.maps.load(() => {
                setKakaoServicesLoaded(true)
            })
        }

        // 2. Kakao Postcode API 로드
        const postcodeScript = document.createElement("script")
        postcodeScript.async = true
        postcodeScript.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        document.head.appendChild(postcodeScript)

        postcodeScript.onload = () => {
            setKakaoPostcodeLoaded(true)
        }

        return () => {
            if (document.head.contains(mapScript)) {
                document.head.removeChild(mapScript)
            }
            if (document.head.contains(postcodeScript)) {
                document.head.removeChild(postcodeScript)
            }
        }
    }, [])

    // 모달 열릴 때 스크롤 막기
    useEffect(() => {
        if (showPostcodeModal) {
            const scrollY = window.scrollY
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = "100%"
            document.body.style.overflow = "hidden"

            return () => {
                document.body.style.position = ""
                document.body.style.top = ""
                document.body.style.width = ""
                document.body.style.overflow = ""
                window.scrollTo(0, scrollY)
            }
        }
    }, [showPostcodeModal])

    // 카카오 우편번호 검색창 생성 및 삽입
    useEffect(() => {
        if (
            showPostcodeModal &&
            kakaoPostcodeLoaded &&
            postcodeContainerRef.current &&
            window.daum &&
            window.daum.Postcode
        ) {
            // 기존 인스턴스가 있다면 제거
            if (postcodeInstanceRef.current) {
                postcodeInstanceRef.current = null
            }

            // 컨테이너 초기화
            if (postcodeContainerRef.current) {
                postcodeContainerRef.current.innerHTML = ""
            }

            try {
                // 새 Postcode 인스턴스 생성
                postcodeInstanceRef.current = new window.daum.Postcode({
                    oncomplete: (data: KakaoPostcodeData) => {
                        console.log("주소 선택 완료:", data)
                        const fullAddress = data.roadAddress || data.jibunAddress
                        setEventLocation(fullAddress)

                        // 주소-좌표 변환 (Geocoder API 사용)
                        if (kakaoServicesLoaded && window.kakao && window.kakao.maps && window.kakao.maps.services) {
                            const geocoder = new window.kakao.maps.services.Geocoder()
                            geocoder.addressSearch(fullAddress, (result: KakaoGeocoderResult[], status: string) => {
                                if (status === window.kakao.maps.services.Status.OK) {
                                    const firstResult = result[0]
                                    if (firstResult) {
                                        setMeetingPointLat(Number.parseFloat(firstResult.y))
                                        setMeetingPointLng(Number.parseFloat(firstResult.x))
                                        console.log("좌표 변환 성공:", firstResult.y, firstResult.x)
                                    } else {
                                        console.warn("주소에 대한 좌표를 찾을 수 없습니다.")
                                        setMeetingPointLat(null)
                                        setMeetingPointLng(null)
                                    }
                                } else {
                                    console.error("주소-좌표 변환 실패:", status)
                                    setMeetingPointLat(null)
                                    setMeetingPointLng(null)
                                }
                            })
                        } else {
                            console.warn("Kakao Map services library가 로드되지 않아 좌표 변환을 할 수 없습니다.")
                            setMeetingPointLat(null)
                            setMeetingPointLng(null)
                        }
                        setShowPostcodeModal(false)
                    },
                    onclose: (state: string) => {
                        console.log("Postcode 창 닫힘:", state)
                        if (state === "FORCE_CLOSE") {
                            setShowPostcodeModal(false)
                        }
                    },
                    theme: {
                        bgColor: "#FFFFFF",
                        searchBgColor: "#F8F9FA",
                        contentBgColor: "#FFFFFF",
                        pageBgColor: "#FAFAFA",
                        textColor: "#333333",
                        queryTextColor: "#222222",
                    },
                })

                // DOM에 embed
                if (postcodeContainerRef.current) {
                    postcodeInstanceRef.current.embed(postcodeContainerRef.current, {
                        width: "100%",
                        height: "100%",
                    })
                    console.log("Postcode embed 성공")
                }
            } catch (error) {
                console.error("Postcode 생성 오류:", error)
                alert("주소 검색 서비스를 불러오는데 실패했습니다. 다시 시도해주세요.")
                setShowPostcodeModal(false)
            }
        }
    }, [showPostcodeModal, kakaoPostcodeLoaded, kakaoServicesLoaded])

    // 모달 닫힐 때 인스턴스 정리
    useEffect(() => {
        if (!showPostcodeModal && postcodeInstanceRef.current) {
            postcodeInstanceRef.current = null
            if (postcodeContainerRef.current) {
                postcodeContainerRef.current.innerHTML = ""
            }
        }
    }, [showPostcodeModal])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEventImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    // 카카오 우편번호 검색 모달 열기
    const handleOpenPostcode = () => {
        if (!kakaoPostcodeLoaded) {
            alert("카카오 우편번호 API 로딩 중입니다. 잠시 후 다시 시도해주세요.")
            return
        }
        if (!window.daum || !window.daum.Postcode) {
            alert("카카오 우편번호 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.")
            return
        }
        console.log("주소 검색 모달 열기")
        setShowPostcodeModal(true)
    }

    const handleCloseModal = () => {
        console.log("모달 닫기")
        setShowPostcodeModal(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !eventName ||
            !eventDate ||
            !eventTime ||
            !eventLocation ||
            meetingPointLat === null ||
            meetingPointLng === null
        ) {
            alert("필수 정보를 모두 입력하고 모임 장소 주소를 검색하여 위도/경도를 확인해주세요.")
            return
        }

        // 이벤트 생성 로직
        console.log({
            eventName,
            eventDate,
            eventTime,
            eventLocation,
            meetingPointLat,
            meetingPointLng,
            maxParticipants,
            difficulty,
            description,
            eventImage,
            chatLink, // 채팅 링크 추가
        })
        alert("새로운 그룹 플로깅 이벤트가 생성되었습니다!")
        navigate("/courses?tab=group")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* 헤더 */}
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">이벤트 생성</h1>
                </div>
            </div>

            {/* 폼 영역 */}
            <div className="flex-1 overflow-y-auto p-4 pb-20">
                <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-6 shadow-md">
                    {/* 이벤트 이름 */}
                    <div>
                        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-2">
                            이벤트 이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="eventName"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="예: 주말 한강공원 단체 플로깅"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    {/* 날짜 및 시간 */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                                날짜 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="eventDate"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-2">
                                시간 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                id="eventTime"
                                value={eventTime}
                                onChange={(e) => setEventTime(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                    </div>

                    {/* 모임 장소 */}
                    <div>
                        <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700 mb-2">
                            모임 장소 (주소) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                id="eventLocation"
                                value={eventLocation}
                                readOnly
                                placeholder="주소 검색 버튼을 눌러주세요"
                                className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={handleOpenPostcode}
                                disabled={!kakaoPostcodeLoaded}
                                className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-1 transition-colors ${
                                    kakaoPostcodeLoaded
                                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                            >
                                <Search className="w-4 h-4" />
                                <span>주소 검색</span>
                            </button>
                        </div>
                        {meetingPointLat !== null && meetingPointLng !== null && (
                            <p className="text-sm text-gray-600 mt-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-emerald-500" />
                                <span>
                  위도: {meetingPointLat.toFixed(6)}, 경도: {meetingPointLng.toFixed(6)}
                </span>
                            </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">'주소 검색' 버튼을 눌러 정확한 모임 장소를 입력해주세요.</p>
                    </div>

                    {/* 카카오톡 오픈채팅 링크 */}
                    <div>
                        <label htmlFor="chatLink" className="block text-sm font-medium text-gray-700 mb-2">
                            카카오톡 오픈채팅 링크
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="url"
                                id="chatLink"
                                value={chatLink}
                                onChange={(e) => setChatLink(e.target.value)}
                                placeholder="예: https://open.kakao.com/o/abcdefg"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">참여자들과 소통할 오픈채팅방 링크를 입력해주세요.</p>
                    </div>

                    {/* 최대 참여 인원 */}
                    <div>
                        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-2">
                            최대 참여 인원 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="maxParticipants"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            min="1"
                            max="100"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    {/* 난이도 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            난이도 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-3">
                            {["쉬움", "보통", "어려움"].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setDifficulty(level as "쉬움" | "보통" | "어려움")}
                                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                                        difficulty === level
                                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 상세 설명 */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            상세 설명
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="이벤트에 대한 자세한 내용을 입력해주세요. (예: 준비물, 유의사항 등)"
                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    {/* 대표 이미지 */}
                    <div>
                        <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700 mb-2">
                            대표 이미지
                        </label>
                        <div className="flex items-center space-x-4">
                            {imagePreview ? (
                                <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="이벤트 미리보기"
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300 text-gray-400">
                                    <ImageIcon className="w-8 h-8" />
                                </div>
                            )}
                            <label
                                htmlFor="eventImage"
                                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                <span>이미지 선택</span>
                                <input type="file" id="eventImage" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* 이벤트 생성 버튼 */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-colors"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>이벤트 생성하기</span>
                    </button>
                </form>
            </div>

            {/* 우편번호 검색 모달 */}
            {showPostcodeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md h-[600px] max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
                        {/* 모달 헤더 */}
                        <div className="relative bg-white px-6 pt-6 pb-4 border-b flex-shrink-0">
                            <h2 className="text-xl font-bold text-gray-900">주소 검색</h2>
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        {/* 우편번호 검색창이 삽입될 영역 */}
                        <div
                            ref={postcodeContainerRef}
                            className="flex-1 w-full overflow-auto bg-white"
                            style={{ minHeight: "500px" }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateGroupEventPage
