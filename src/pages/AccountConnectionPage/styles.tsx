import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
`;

export const MainText = styled.p`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 33px;
  line-height: 150%;

  color: #000000;
`;

export const SubText = styled.p`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  margin-left: 10px;

  color: #666666;
`;
