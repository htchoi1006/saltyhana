import { useRef } from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import CounselButton from "../../components/CounselButton/CounselButton";
import Header from "../../components/Header/Header";
import { Main } from "./styles";
import { HeaderOffset } from "../../components/Header/styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ModalManager, {
  ModalManagerType,
} from "../../components/Modals/ModalManager";

export default function DashboardLayout() {
  const navigation = useNavigation();

  const modalManagerRef = useRef<ModalManagerType>(null);

  const handleButtonClick = () => {
    modalManagerRef.current?.openModal("채팅모달");
  };

  return (
    <>
      <Header />
      <Main>
        <div style={{ flex: "none" }}>
          <HeaderOffset></HeaderOffset>
          <Sidebar />
        </div>
        <div style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
          {navigation.state === "loading" ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <HeaderOffset></HeaderOffset>
              <Outlet />
            </>
          )}
        </div>

        <div style={{}}>
          {/* 상담 모달 */}
          <ModalManager ref={modalManagerRef} />
          <CounselButton onClick={handleButtonClick} />
        </div>
      </Main>
    </>
  );
}
