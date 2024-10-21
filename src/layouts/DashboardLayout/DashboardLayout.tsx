import { Outlet } from "react-router-dom";

import { HeaderWrapper } from "./styles";

export default function DashboardLayout() {
  return (
    <>
      <header>
        <HeaderWrapper>
          <div style={{ flex: 1 }}>
            <span>자산을 하나로</span>
          </div>
          <div>
            <span>님, 환영합니다!</span>
          </div>
        </HeaderWrapper>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}
