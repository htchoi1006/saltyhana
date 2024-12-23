import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ModalManager, { ModalManagerType } from "../Modals/ModalManager";
import sidebar_home from "../../images/sidebar_home.png";
import sidebar_calendar from "../../images/sidebar_calendar.png";
import sidebar_goal from "../../images/sidebar_goal.png";
import sidebar_assets from "../../images/sidebar_assets.png";
import sidebar_recommend from "../../images/sidebar_recommend.png";
import sidebar_setting from "../../images/sidebar_setting.png";
import sidebar_user from "../../images/sidebar_user.png";
import * as styled from "./styles";

interface INav {
  to: string;
  imgSrc: string;
  displayName: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const modalManagerRef = useRef<ModalManagerType>(null);

  const NavItems: INav[] = [
    { to: "/home", imgSrc: sidebar_home, displayName: "Home" },
    { to: "/calendar", imgSrc: sidebar_calendar, displayName: "캘린더" },
    { to: "/goal", imgSrc: sidebar_goal, displayName: "목표 설정" },
    { to: "/assets", imgSrc: sidebar_assets, displayName: "개인 자산" },
    {
      to: "/recommend",
      imgSrc: sidebar_recommend,
      displayName: "상품 추천",
    },
    { to: "/mypage", imgSrc: sidebar_user, displayName: "내 정보" },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    localStorage.removeItem("accessToken");

    // 루트 페이지로 이동
    navigate("/");
  };

  return (
    <styled.SidebarContainer>
      <styled.MenuSection>
        {NavItems.map((v, i) => (
          <styled.NavItemLink key={i} to={v.to}>
            {({ isActive }) => (
              <styled.MenuItem className={isActive ? "active" : ""}>
                <styled.IconImg src={v.imgSrc} />
                <span>{v.displayName}</span>
              </styled.MenuItem>
            )}
          </styled.NavItemLink>
        ))}
        <ModalManager ref={modalManagerRef} />
      </styled.MenuSection>
      <styled.SettingsSection>
        <styled.MenuItem onClick={handleLogout}>
          <styled.SettingIcon src={sidebar_setting} />
          <span style={{ color: "#b1b1b1" }}>로그아웃</span>
        </styled.MenuItem>
      </styled.SettingsSection>
    </styled.SidebarContainer>
  );
}
