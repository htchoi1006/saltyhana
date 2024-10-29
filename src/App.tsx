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
    element: <ConnectingAccountPage />,
  },
  {
    element: <DashboardLayout />,
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
    ],
  },
  {
    element: <MainLayout />,
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
/*
const App: React.FC = () => {
  return (

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/connecting-account"
            element={<ConnectingAccountPage />}
          />
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/goal" element={<GoalPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/teststart" element={<TeststartPage />} />
            <Route path="/test/consumption" element={<TestPage />} />
            <Route path="/result/consumption" element={<TestResultPage />} />
          </Route>
        </Routes>
      </Router>
  );
};
*/

export default router;
