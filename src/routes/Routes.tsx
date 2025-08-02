import type { RouteObject } from "react-router-dom"
import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import HomePage from "@/pages/home/HomePage"
import CoursesPage from "@/pages/courses/CoursesPage"
import RankingsPage from "@/pages/ranks/RankingsPage"
import CertificationPage from "@/pages/certification/CertificationPage"
import MyPage from "@/pages/accounts/MyPage"
import CourseDetailPage from "@/pages/coureDetail/CourseDetailPage"
import GroupEventDetailPage from "@/pages/groupEvents/GroupEventDetailPage"
import CreateGroupEventPage from "@/pages/groupEvents/CreateGroupEventPage"
import AllParticipantsPage from "@/pages/groupEvents/AllParticipantsPage"
import GroupChatPage from "@/pages/chats/GroupChatPage" // 새 페이지 임포트


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
            // 그룹 이벤트 관련 라우트 추가
            {
                path: "group-events/:eventId",
                element: <GroupEventDetailPage />,
            },
            {
                path: "group-events/create",
                element: <CreateGroupEventPage />,
            },
            {
                path: "group-events/:eventId/participants",
                element: <AllParticipantsPage />,


            },
            {
                path: "group-events/:eventId/chat", // 새로운 채팅방 라우트
                element: <GroupChatPage />,
            },
        ],
    },
]

const router = createBrowserRouter(routes)

export default router
