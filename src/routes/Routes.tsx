import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";
import CoursesPage from "@/pages/courses/CoursesPage";
import RankingsPage from "@/pages/ranks/RankingsPage";
import CertificationPage from "@/pages/certification/CertificationPage";
import MyPage from "@/pages/accounts/MyPage";
import CourseDetailPage from "@/pages/coureDetail/CourseDetailPage";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/certification" element={<CertificationPage />} />
            <Route path="/profile" element={<MyPage />} />
        </Routes>
    );
};

export default AppRoutes;