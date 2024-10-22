import { Outlet, Link } from "react-router-dom";
import * as styled from "./styles";
import { useNavigate } from "react-router-dom";
import { Home, Calendar, Settings, LogOut } from "lucide-react";
import sidebar_home from "../../images/sidebar_home.png";
import sidebar_calendar from "../../images/sidebar_calendar.png";
import sidebar_goal from "../../images/sidebar_goal.png";
import sidebar_assets from "../../images/sidebar_assets.png";
import sidebar_recommend from "../../images/sidebar_recommend.png";
import sidebar_reservation from "../../images/sidebar_reservation.png";
import hana_logo from "../../images/hanabank_logo.png";

import { HeaderWrapper, BodyWrapper } from "./styles";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleCalendarClick = () => {
    navigate("/calendar");
  };

  const handleGoalClick = () => {
    navigate("/goal");
  };

  const handleAssetsClick = () => {
    navigate("/assets");
  };

  const handleRecommendClick = () => {
    navigate("/recommend");
  };

  return (
    <>
      <header>
        <HeaderWrapper>
          <div style={{ display: "flex" }}>
            <styled.HanaLogo src={hana_logo} />
            <styled.HanaLogoDiv>
              <span>자산을 하나로</span>
            </styled.HanaLogoDiv>
          </div>
          <div>
            <span>님, 환영합니다!</span>
          </div>
        </HeaderWrapper>
      </header>
      <BodyWrapper>
        <styled.SidebarContainer>
          <styled.MenuSection>
            <styled.MenuItem onClick={handleHomeClick}>
              {/* <Home /> */}
              <styled.HomeIcon src={sidebar_home} />
              <span>Home</span>
            </styled.MenuItem>

            <styled.MenuItem onClick={handleCalendarClick}>
              {/* <Calendar /> */}
              <styled.CalendarIcon src={sidebar_calendar} />
              <span>캘린더</span>
            </styled.MenuItem>

            <styled.MenuItem onClick={handleGoalClick}>
              <styled.GoalIcon src={sidebar_goal} />
              <span>목표 설정</span>
            </styled.MenuItem>

            <styled.MenuItem onClick={handleAssetsClick}>
              <styled.AssetsIcon src={sidebar_assets} />
              <span>개인 자산</span>
            </styled.MenuItem>

            <styled.MenuItem onClick={handleRecommendClick}>
              <styled.RecommendIcon src={sidebar_recommend} />
              <span>상품 추천</span>
            </styled.MenuItem>

            <styled.MenuItem>
              <styled.ReservationIcon src={sidebar_reservation} />
              <span>창구 예약</span>
            </styled.MenuItem>
          </styled.MenuSection>

          <styled.Divider />

          <styled.SettingsSection>
            <styled.MenuItem>
              <Settings />
              <span>로그아웃</span>
            </styled.MenuItem>
          </styled.SettingsSection>
        </styled.SidebarContainer>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </BodyWrapper>
    </>
  );
}
