"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Paperclip, X } from "lucide-react"
// import profileImage from "#/defaultProfile.webp";

interface Message {
    id: string
    senderId: string
    senderName: string
    senderAvatar: string
    text: string
    timestamp: string
    imagePreviews?: string[] // 이미지 미리보기 URL 배열
}

const GroupChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            senderId: "user1",
            senderName: "김플로깅",
            senderAvatar: profileImage,
            text: "안녕하세요! 오늘 플로깅 기대됩니다!",
            timestamp: "오전 9:00",
        },
        {
            id: "2",
            senderId: "user2",
            senderName: "환경지킴이",
            senderAvatar: profileImage,
            text: "네, 저도요! 다들 조심히 오세요~",
            timestamp: "오전 9:05",
        },
        {
            id: "3",
            senderId: "user1",
            senderName: "김플로깅",
            senderAvatar: profileImage,
            text: "혹시 준비물 중에\n특별히 챙겨야 할 게\n있을까요?",
            timestamp: "오전 9:10",
        },
        {
            id: "4",
            senderId: "user3",
            senderName: "깨비로드 운영진",
            senderAvatar: profileImage,
            text: "쓰레기 봉투와 집게는 현장에서 제공됩니다!\n개인 텀블러나 장갑 정도\n챙겨오시면 좋아요.",
            timestamp: "오전 9:15",
        },
    ])
    const [newMessage, setNewMessage] = useState("")
    const [selectedImagePreviews, setSelectedImagePreviews] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isComposing, setIsComposing] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim() || selectedImagePreviews.length > 0) {
            const newMsg: Message = {
                id: Date.now().toString(),
                senderId: "currentUser",
                senderName: "나",
                senderAvatar: "https://via.placeholder.com/32",
                text: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                imagePreviews: selectedImagePreviews.length > 0 ? [...selectedImagePreviews] : undefined,
            }

            setMessages(prevMessages => [...prevMessages, newMsg])
            setNewMessage("")
            setSelectedImagePreviews([])

            if (inputRef.current) {
                inputRef.current.style.height = "auto"
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isComposing) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log("Input value:", e.target.value) // For debugging
        setNewMessage(e.target.value)
        const target = e.target
        target.style.height = "auto"
        target.style.height = `${target.scrollHeight}px`
    }

    const handleCompositionStart = () => {
        setIsComposing(true)
    }

    const handleCompositionUpdate = () => {
        // Empty unless specific logic is needed
    }

    const handleCompositionEnd = () => {
        setIsComposing(false)
    }

    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const imagePromises = Array.from(files).map(file => {
                if (file.type.startsWith("image/")) {
                    return new Promise<string>((resolve) => {
                        const reader = new FileReader()
                        reader.onloadend = () => resolve(reader.result as string)
                        reader.readAsDataURL(file)
                    })
                }
                return Promise.resolve("")
            })

            Promise.all(imagePromises).then(previews => {
                const validPreviews = previews.filter(preview => preview !== "")
                setSelectedImagePreviews(validPreviews)
                console.log("Selected image previews:", validPreviews)
            })
            e.target.value = ""
        }
    }

    const removePreview = (index: number) => {
        setSelectedImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const handleImageClick = (preview: string) => {
        console.log("Image clicked, opening modal:", preview)
        setSelectedImage(preview)
        setIsModalOpen(true)
    }

    const isCurrentUser = (senderId: string) => senderId === "currentUser"

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto w-full">
            <div className="bg-white px-4 py-3 shadow-sm flex-shrink-0 w-full">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">그룹 채팅</h1>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col w-full ${isCurrentUser(msg.senderId) ? "items-end" : "items-start"}`}
                    >
                        {!isCurrentUser(msg.senderId) && (
                            <img
                                src={msg.senderAvatar || "https://via.placeholder.com/32"}
                                alt={msg.senderName}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mb-1"
                            />
                        )}
                        {msg.imagePreviews && msg.imagePreviews.length > 0 && (
                            <div className={`flex gap-1 mb-2 ${isCurrentUser(msg.senderId) ? "justify-end" : "justify-start"}`}>
                                {msg.imagePreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Attached image ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                        onClick={() => handleImageClick(preview)}
                                    />
                                ))}
                            </div>
                        )}
                        {msg.text && (
                            <div className={`flex items-end gap-2 w-full ${isCurrentUser(msg.senderId) ? "justify-end" : "justify-start"}`}>
                                {isCurrentUser(msg.senderId) && (
                                    <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 pr-1">
                                        {msg.timestamp}
                                    </span>
                                )}
                                <div
                                    className={`inline-block p-3 rounded-xl shadow-sm max-w-[75%] ${
                                        isCurrentUser(msg.senderId)
                                            ? "bg-emerald-500 text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-bl-none"
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                                </div>
                                {!isCurrentUser(msg.senderId) && (
                                    <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 pl-1">
                                        {msg.timestamp}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {selectedImagePreviews.length > 0 && (
                <div className="p-4 bg-white border-t border-gray-200 flex gap-2 overflow-x-auto">
                    {selectedImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                onClick={() => handleImageClick(preview)}
                            />
                            <button
                                onClick={() => removePreview(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Enlarged image"
                            className="max-w-[70vw] max-h-[70vh] object-contain"
                        />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 w-full">
                <div className="flex items-center space-x-3">
                    <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-gray-700"
                        onClick={handleFileUploadClick}
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept="image/*"
                    />
                    <textarea
                        ref={inputRef}
                        value={newMessage}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onCompositionStart={handleCompositionStart}
                        onCompositionUpdate={handleCompositionUpdate}
                        onCompositionEnd={handleCompositionEnd}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 p-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none min-h-[40px] max-h-[120px] overflow-y-hidden"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck="false"
                        inputMode="text"
                        rows={1}
                    />
                    <button
                        type="button"
                        onClick={handleSendMessage}
                        className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GroupChatPage