import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import HomePage from "@/pages/home/HomePage"
import CoursesPage from "@/pages/courses/CoursesPage"
import RankingsPage from "@/pages/ranks/RankingsPage"
import CertificationPage from "@/pages/certification/CertificationPage"
import MyPage from "@/pages/accounts/MyPage"
import CourseDetailPage from "@/pages/coureDetail/CourseDetailPage"

const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "courses",
                element: <CoursesPage />,
            },
            {
                path: "courses/:courseId",
                element: <CourseDetailPage />,
            },
            {
                path: "rankings",
                element: <RankingsPage />,
            },
            {
                path: "certification",
                element: <CertificationPage />,
            },
            {
                path: "profile",
                element: <MyPage />,
            },
        ],
    },
]

const router = createBrowserRouter(routes)

export default router