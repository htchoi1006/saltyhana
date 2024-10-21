import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SingupPage/SingupPage";
import HomePage from "./pages/HomePage/HomePage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import GoalPage from "./pages/GoalPage/GoalPage";
import AssetsPage from "./pages/AssetsPage/AssetsPage";
import RecommendPage from "./pages/RecommendPage/RecommendPage";
import TestPage from "./pages/TestPage/TestPage";
import Consumption from "./pages/ConsumptionPage/ConsumptionPage";
import Result from "./pages/ResultPage/ResultPage";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/goal" element={<GoalPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/test/consumption" element={<Consumption />} />
            <Route path="/result/consumption" element={<Result />} />
          </Routes>
        </AppContainer>
      </Router>
    </>
  );
};

export default App;
