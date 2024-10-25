import { useRef } from "react";

import * as styled from "./styles";
import sidebar_home from "../../images/sidebar_home.png";
import sidebar_calendar from "../../images/sidebar_calendar.png";
import sidebar_goal from "../../images/sidebar_goal.png";
import sidebar_assets from "../../images/sidebar_assets.png";
import sidebar_recommend from "../../images/sidebar_recommend.png";
import sidebar_reservation from "../../images/sidebar_reservation.png";
import sidebar_setting from "../../images/sidebar_setting.png";

import ModalManager from "../Modals/ModalManager";

interface INav {
  to: string;
  imgSrc: string;
  displayName: string;
}
interface ModalManagerType {
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

export default function Sidebar() {
  const NavItems: INav[] = [
    { to: "/home", imgSrc: sidebar_home, displayName: "Home" },
    { to: "/calendar", imgSrc: sidebar_calendar, displayName: "캘린더" },
    { to: "/goal", imgSrc: sidebar_goal, displayName: "목표 설정" },
    { to: "/assets", imgSrc: sidebar_assets, displayName: "개인 자산" },
    { to: "/recommend", imgSrc: sidebar_recommend, displayName: "상품 추천" },
  ];

  const modalManagerRef = useRef<ModalManagerType>(null);

  const handleOpenModal = () => {
    modalManagerRef.current?.openModal("창구예약");
  };

  return (
    <styled.SidebarContainer>
      <styled.MenuSection>
        {NavItems.map((v, i) => (
          <styled.NavItemLink to={v.to}>
            {({ isActive }) => (
              <styled.MenuItem className={isActive ? "active" : ""}>
                <styled.IconImg src={v.imgSrc} />
                <span>{v.displayName}</span>
              </styled.MenuItem>
            )}
          </styled.NavItemLink>
        ))}
        <styled.MenuItem onClick={handleOpenModal}>
          <styled.ReservationIcon src={sidebar_reservation} />
          <span>창구 예약</span>
        </styled.MenuItem>
        <ModalManager ref={modalManagerRef} />
      </styled.MenuSection>
      {/* <styled.Divider /> */}
      <styled.SettingsSection>
        <styled.MenuItem>
          <styled.SettingIcon src={sidebar_setting} />
          <span style={{ color: "#b1b1b1" }}>로그아웃</span>
        </styled.MenuItem>
      </styled.SettingsSection>
    </styled.SidebarContainer>
  );
}
