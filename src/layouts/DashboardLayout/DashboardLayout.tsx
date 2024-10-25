import { useState } from "react";
import { Outlet } from "react-router-dom";
import * as styled from "./styles";

import hana_logo from "../../images/hanabank_logo.png";
import Sidebar from "../../components/Sidebar/Sidebar";

import CounselButton from "../../components/CounselButton/CounselButton"; // 고객센터 버튼 컴포넌트
import ChatModal from "../../components/ChatModal/ChatModal"; // 모달 컴포넌트 임포트

import {
  FixedHeader,
  HeaderBox,
  HeaderOffset,
  HanaLogo,
  HanaLogoDiv,
  Main,
} from "./styles";

export default function DashboardLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FixedHeader>
        <HeaderBox>
          <div style={{ display: "flex", flex: 1 }}>
            <HanaLogo src={hana_logo} />
            <HanaLogoDiv>
              <span>자산을 하나로</span>
            </HanaLogoDiv>
          </div>
          <div style={{ flex: "none" }}>
            <span>님, 환영합니다!</span>
          </div>
        </HeaderBox>
      </FixedHeader>
      <Main>
        <div style={{ flex: "none" }}>
          <HeaderOffset></HeaderOffset>
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>
          <HeaderOffset></HeaderOffset>
          <Outlet />
        </div>

        <div style={{}}>
          {/* 상담 모달 */}
          <CounselButton onClick={openModal} />
          <ChatModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </Main>
    </>
  );
}
