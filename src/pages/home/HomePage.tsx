import type React from "react"
import Header from "@/components/home/Header"
import WeatherInfo from "@/components/home/WeatherInfo"
import RegionalCourses from "@/components/home/RegionalCourses"
import PloggingRanking from "@/components/home/PloggingRanking"
import EnvironmentalNews from "@/components/home/EnvironmentalNews"

const HomePage: React.FC = () => {
    return (
        // max-w-md mx-auto 클래스를 App.tsx의 Layout 컴포넌트로 이동했습니다.
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pb-20">
                {" "}
                {/* max-w-md mx-auto 제거 */}
                <WeatherInfo />
                <RegionalCourses />
                <PloggingRanking />
                <EnvironmentalNews />
            </main>
        </div>
    )
}

export default HomePage
