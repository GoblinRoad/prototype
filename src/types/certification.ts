export interface CapturedPhoto {
    file: File;
    preview: string;
    timestamp: Date;
}

export type LocationStatus = 'loading' | 'granted' | 'denied' | 'unavailable' | 'timeout'

export interface TrackingData {
    duration: string;
    distance: string;
    score: number;
    currentLocation: string;
}