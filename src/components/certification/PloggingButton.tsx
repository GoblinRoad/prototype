import React from 'react'
import { Play } from 'lucide-react'

interface PloggingButtonProps {
    isTracking: boolean
    onClick: () => void
}

export const PloggingButton: React.FC<PloggingButtonProps> = ({
                                                                  isTracking,
                                                                  onClick
                                                              }) => {
    return (
        <div className="fixed left-1/2 transform -translate-x-1/2 z-10 bottom-16 sm:bottom-12 md:bottom-16 lg:bottom-12">
            <button
                onClick={onClick}
                className={`relative w-20 h-20 rounded-full transition-all duration-500 flex items-center justify-center group min-h-[44px] min-w-[44px] ${
                    isTracking
                        ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.8)]'
                        : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.9)]'
                }`}
                style={{
                    marginBottom: `max(4rem, calc(4rem + env(safe-area-inset-bottom)))`
                }}
            >
                <div className={`absolute -inset-4 rounded-full border-2 border-emerald-400 transition-all duration-1000 ${
                    isTracking ? 'animate-pulse opacity-60' : 'opacity-0 group-hover:opacity-40'
                }`} />

                <div className={`absolute -inset-2 rounded-full border border-emerald-300 transition-all duration-700 ${
                    isTracking ? 'animate-ping opacity-40' : 'opacity-0 group-hover:opacity-30'
                }`} />

                {!isTracking ? (
                    <Play className="w-7 h-7 text-white ml-1 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                ) : (
                    <div className="w-6 h-6 bg-white rounded-full opacity-90 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                )}
            </button>
        </div>
    )
}