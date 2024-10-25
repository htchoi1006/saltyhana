import { Outlet } from "react-router-dom";
import * as styled from "./styles";

import hana_logo from "../../images/hanabank_logo.png";
import Sidebar from "../../components/Sidebar/Sidebar";

import {
  FixedHeader,
  HeaderBox,
  HeaderOffset,
  HanaLogo,
  HanaLogoDiv,
  Main,
} from "./styles";

export default function DashboardLayout() {
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
      </Main>
    </>
  );
}
