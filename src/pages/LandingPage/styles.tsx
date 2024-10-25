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
  position: relative;
  background-color: #006b6b;
  height: 100vh; // 이 값을 추가하여 내부 내용이 잘 보이도록 조정
  width: 100vw;
  h1 {
    color: #333;
  }
`;

export const Container22 = styled.div`
  position: relative;
  background-color: #0063b2;
  height: 100vh; // 이 값을 추가하여 내부 내용이 잘 보이도록 조정
  width: 100wh;
  h1 {
    color: #333;
  }
`;

export const Con22Box = styled.div`
  position: relative;
  left: 45%;
  top: -65.5%;
  width: 680px;
  height: 479px;

  background-color: #ffffff;
  border-radius: 20px;
`;

export const Con2MainText = styled.p`
  position: relative;
  padding-top: 7%;
  width: 327px;
  height: 200px;

  left: 15%;
  top: -30%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 900;
  font-size: 80px;
  line-height: 105px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Con2SubText = styled.p`
  position: relative;
  padding-top: 6%;
  width: 327px;
  height: 20px;
  left: 15%;
  top: 90%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Con22SubText = styled.p`
  position: relative;
  width: 400px;
  height: 60px;
  padding-top: 5%;
  left: 28.5%;
  transform: translateX(-50%);
  top: 105%;
  line-height: 1.5; // 예시
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export const Element1 = styled.div`
  /*8개 질문으로 간단하게!*/

  position: relative;
  width: 250px;
  height: 200px;
  left: 1%;
  top: -7%;
  margin: 20px; /* 모든 방향에 20px의 마진 추가 */
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5px;
`;

export const Element2 = styled.div`
  /* Group 481560 */

  position: relative;
  width: 247px;
  height: 275px;
  left: 35%;
  top: -52.5%;
  margin: 20px; /* 모든 방향에 20px의 마진 추가 */
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5px;
`;

export const Con22p2 = styled.p`
  margin-left: 20px;
`;

export const Element3 = styled.div`
  /* 맞춤형 금융 상품 추천까지! */

  position: relative;
  width: 339px;
  height: 277px;
  left: 66%;
  top: -114%;
  margin: 20px; /* 모든 방향에 20px의 마진 추가 */
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5%;
`;

export const ElementImg = styled.img`
  width: 165px;
  height: 135px;
`;

export const Con22Button = styled.button`
  position: absolute;
  width: 342.78px;
  height: 62.74px;
  left: 50%;
  transform: translateX(-50%);
  top: 84%;
  /* margin-top: 40px; */
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

export const Con2DivforBox = styled.div`
  position: absolute;
  width: 150px;
  height: 152px;

  left: 54%;
  top: 10%;

  background-color: #ffffff;
  border-radius: 20px;
`;

export const Con2DivforImage = styled.img`
  width: 150px;
  height: 152px;
  object-fit: cover; // 비율 유지하면서 크기 조정
`;

export const Con22h1 = styled.h1`
  position: relative;
  width: 459px;
  height: 89px;
  left: 19%;
  top: 8%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 93px;

  color: #000000;
`;

export const Con22p = styled.p`
  position: relative;
  width: 600px;
  height: 89px;
  left: 11%;
  top: 2%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 15px;

  color: #000000;
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
  top: 220%;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  line-height: 104px;
  letter-spacing: -0.02em;

  color: #212529;
`;

export const Con3StyleDiv = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  left: 0px;
  top: 20%;
  background: #2e3c7e;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 1000;
  font-size: 52px;
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
  left: 67%;
  top: 20%;

  width: 100px;
  height: 100px;
`;

export const Con3Img2 = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 91%;
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
  left: 97%;
  top: 49%;

  width: 100px;
  height: 100px;
`;
