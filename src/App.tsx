import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import TestStartPage from "./pages/TeststartPage/TeststartPage";
import HomePage from "./pages/HomePage/HomePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import GoalPage from "./pages/GoalPage/GoalPage";
import AssetsPage from "./pages/AssetsPage/AssetsPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TestPage from "./pages/TestPage/TestPage";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import ConnectingAccountPage from "./pages/ConnectingAccoutPage/ConnectingAccountPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import TestResultPage from "./pages/TestResultPage/TestResultPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MyPage from "./pages/MyPage/MyPage";
import AccountConnectionPage from "./pages/AccountConnectionPage/AccountConnectionPage";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenRefresh } from "../src/hooks/useTokenRefresh";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  useTokenRefresh(); // 토큰 자동 갱신 훅 사용

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/connecting-account",
    element: (
      <ProtectedRoute>
        <ConnectingAccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/connecting-account-finish",
    element: (
      <ProtectedRoute>
        <AccountConnectionPage />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "goal",
        element: <GoalPage />,
      },
      {
        path: "assets",
        element: <AssetsPage />,
      },
      {
        path: "recommend",
        element: <RecommendPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/teststart",
        element: <TestStartPage />,
      },
      {
        path: "/test/consumption",
        element: <TestPage />,
      },
      {
        path: "/result/consumption",
        element: <TestResultPage />,
      },
    ],
  },
]);

export default router;
