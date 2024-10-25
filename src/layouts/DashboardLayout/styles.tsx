import styled from "styled-components";

export const HeaderOffset = styled.div`
  min-height: 64px;
  flex: 1;
`;

export const HeaderBox = styled(HeaderOffset)`
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-bottom-color: rgba(5, 5, 5, 0.3);
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  background-color: white;
`;

export const FixedHeader = styled.header`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 500;
`;

export const StyledNav = styled.nav`
  width: 200px;
`;

export const HanaLogoDiv = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 41px;
  margin-left: 10px;
  color: #000000;
`;

export const HanaLogo = styled.img`
  width: 45px;
  height: auto;
`;

export const Main = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  > div {
    overflow: auto;
    height: 100vh;
  }
`;
