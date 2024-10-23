import styled from "styled-components";

export const StyleDiv = styled.div`
  background-color: #ffffff;
  width: 100vh;
  height: 10vh;
`;

export const Logo = styled.img`
  width: 45px;
  height: auto;
  margin-left: 30px;
  margin-top: 20px;
`;

export const HeaderButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9.5px 20px;
  gap: 10px;

  position: absolute;
  width: 105px;
  height: 36px;
  left: 91.5%;
  top: 22px;

  background: #008485;
  border-radius: 20px;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;

  &:hover {
    background: #006f6f;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
