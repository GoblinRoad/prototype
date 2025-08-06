import React from 'react'
import { MapPin } from 'lucide-react'

interface MapComponentProps {
    mapRef: React.RefObject<HTMLDivElement>
    onCurrentLocationClick: () => void
}

export const MapComponent: React.FC<MapComponentProps> = ({
                                                              mapRef,
                                                              onCurrentLocationClick
                                                          }) => {
    return (
        <>
            <div ref={mapRef} className="w-full h-full" />
            <button
                onClick={onCurrentLocationClick}
                className="fixed right-4 z-10 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 min-h-[44px] min-w-[44px] bottom-16 sm:bottom-12 md:bottom-16 lg:bottom-12"
                style={{
                    marginBottom: `max(4rem, calc(4rem + env(safe-area-inset-bottom)))`
                }}
                aria-label="현재 위치로 이동"
            >
                <MapPin className="w-6 h-6 text-emerald-600" />
            </button>
        </>
    )
}