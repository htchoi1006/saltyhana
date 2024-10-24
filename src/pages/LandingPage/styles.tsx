// 여기서는 이렇게 Landing Page에 대한 CSS 코드를 분리하시면 됩니다 !
// 화면 2분할하고 왼쪽에는 페이지코드, 오른쪽에는 CSS 코드를 띄워놓고 작업하시면 능률이 올라요

import styled from "styled-components"; //1. styled-component를 import 합니다.

export const Con = styled.div`
  //2. 어떤 컴포넌트에 대해 스타일을 선언할 때는 [export const 이름 = styled.div] 로 선언합니다.

  h1 {
    color: #333;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; // 수직 중앙 정렬
    width: 100%;
    height: 100vh;
  }
`;

export const Container1 = styled.div`
  background-color: #e9edf08f;
  h1 {
    color: #333;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; // 수직 중앙 정렬
    width: 100vh; // 부모 div 높이 조정
    height: 100vh; // 부모 div 높이 조정
  }
`;

export const Con1Button = styled.button`
  /* Button */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  gap: 10px;

  position: absolute;
  width: 342.78px;
  height: 62.74px;
  left: 28%;
  transform: translateX(-50%);
  top: 60%;
  margin-top: 40px;
  border: none;
  background: #008485;
  border-radius: 20px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  color: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;

  &:hover {
    background: #006f6f;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledMainText = styled.p`
  position: absolute;
  width: 504px;
  height: 87px;
  left: 31%;
  transform: translateX(-50%);
  top: 20%;

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  line-height: 87px;
  letter-spacing: -0.02em;

  color: #000000;
`;

export const SubText = styled.p`
  position: absolute;
  width: 815.4px;
  height: 64.98px;
  left: 41%;
  transform: translateX(-50%);
  top: 40%;
  margin-top: 40px;

  font-family: "SF Pro Rounded";
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;

  color: #1d1d1d;
`;

export const Img = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 74%;
  top: 20%;
`;

export const StyleDiv = styled.div`
  background-color: #006b6b;
  width: 100vh;
  height: 100vh;
`;

export const Container2 = styled.div`
  background-color: #006b6b;
  h1 {
    color: #333;
  }
`;

export const Con2MainText = styled.p`
  position: absolute;
  width: 327px;
  height: 348px;

  left: 26%;
  transform: translateX(-50%);
  top: 110%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 80px;
  line-height: 116px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Con2SubText = styled.p`
  position: absolute;
  width: 327px;
  height: 60px;

  left: 26%;
  transform: translateX(-50%);
  top: 165%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Con2DivforBox = styled.div`
  position: absolute;
  width: 150px;
  height: 152px;

  left: 54%;
  top: 120%;

  background-color: #ffffff;
  border-radius: 20px;
`;

export const Con2DivforImage = styled.img`
  /* position: absolute; */
  width: 150px;
  height: 152px;
`;

export const Box = styled.div`
  width: 150px;
  height: 152px;

  background-color: #ffffff;
  border-radius: 20px;
`;

export const Container3 = styled.div`
  background-color: #e9edf08f;
`;

export const Con3SubText = styled.p`
  position: absolute;
  width: 1025px;
  height: 28px;
  left: 55%;
  transform: translateX(-50%);
  top: 210%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  line-height: 104px;
  letter-spacing: -0.02em;

  color: #212529;
`;

export const Con3StyleDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 350px;
  left: 0px;
  top: 242%;
  background: #2e3c7e;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 57px;
  line-height: 64px;
  /* or 107% */

  color: #ffffff;
`;

export const Con3StyleDiv1 = styled.div`
  margin-top: 90px;
  padding-left: 15px;
`;

export const Con3StyleDiv2 = styled.div`
  margin-top: 40px;
  padding-left: 40px;
`;

export const Con3Img1 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 66%;
  top: 20%;

  width: 100px;
  height: 100px;
`;

export const Con3Img2 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 89.5%;
  top: 20%;

  width: 100px;
  height: 100px;
`;

export const Con3Img3 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 4%;
  top: 49%;

  width: 100px;
  height: 100px;
`;

export const Con3Img4 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 28%;
  top: 49%;

  width: 100px;
  height: 100px;
`;

export const Con3Img5 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 96%;
  top: 49%;

  width: 100px;
  height: 100px;
`;
