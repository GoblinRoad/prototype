import type { RouteObject } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/home/HomePage";
import CoursesPage from "@/pages/courses/CoursesPage";
import RankingsPage from "@/pages/ranks/RankingsPage";
import CertificationPage from "@/pages/certification/CertificationPage";
import MyPage from "@/pages/accounts/MyPage";
import CourseDetailPage from "@/pages/coureDetail/CourseDetailPage";
import GroupEventDetailPage from "@/pages/groupEvents/GroupEventDetailPage";
import CreateGroupEventPage from "@/pages/groupEvents/CreateGroupEventPage";
import AllParticipantsPage from "@/pages/groupEvents/AllParticipantsPage";
import GroupChatPage from "@/pages/chats/GroupChatPage";
import PreferencesOnboardingPage from "@/pages/onboarding/PreferencesOnboardingPage.tsx"; // 새 페이지 임포트
import EnvironmentalNewsPage from "@/pages/news/EnvironmentalNewsPage";
import NewsDetailPage from "@/pages/news/NewsDetailPage.tsx";
import HelpSupportPage from "@/pages/help/HelpSupportPage";
import PrivacySecurityPage from "@/pages/accounts/PrivacySecurityPage";
import PrivacyPolicyPage from "@/pages/accounts/PrivacyPolicyPage";
import AppPermissionsPage from "@/pages/accounts/AppPermissionsPage";
import LoginPage from "@/pages/accounts/LoginPage";
import ActivityHistoryPage from "@/pages/accounts/ActivityHistoryPage";

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
      {
        path: "preferences/setup",
        element: <PreferencesOnboardingPage />,
      },
      {
        path: "news",
        element: <EnvironmentalNewsPage />,
      },
      {
        path: "news/:newsId",
        element: <NewsDetailPage />,
      },
      {
        path: "help-support",
        element: <HelpSupportPage />,
      },
      {
        path: "privacy-security",
        element: <PrivacySecurityPage />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "app-permissions",
        element: <AppPermissionsPage />,
      },
      {
        path: "login",
        element: (
          <LoginPage
            onLogin={(provider) => console.log(`${provider} 로그인 처리`)}
          />
        ),
      },
      {
        path: "activity-history",
        element: <ActivityHistoryPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
