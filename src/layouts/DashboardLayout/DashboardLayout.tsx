import { Outlet, Link } from "react-router-dom";

import { HeaderWrapper, BodyWrapper, StyledNav } from "./styles";

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
      <BodyWrapper>
        <StyledNav>
          <ul>
            <li>
              <Link to="/home">홈</Link>
            </li>
            <li>
              <Link to="/calendar">캘린더</Link>
            </li>
            <li>
              <Link to="/goal">목표 설정</Link>
            </li>
            <li>
              <Link to="/assets">개인 자산</Link>
            </li>
            <li>
              <Link to="/recommend">상품 추천</Link>
            </li>
          </ul>
        </StyledNav>
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </BodyWrapper>
    </>
  );
}
