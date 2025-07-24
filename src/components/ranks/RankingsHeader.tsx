"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface RankingsHeaderProps {
    title: string
}

const RankingsHeader: React.FC<RankingsHeaderProps> = ({ title }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            </div>
        </div>
    )
}

export default RankingsHeader
