import styled from "styled-components"; //1. styled-component를 import 합니다.

export const Logo = styled.div`
  font-family: “Noto Sans KR”;
  font-style: normal;
  font-weight: 900;
  font-size: 26px;
  line-height: 41px;
  margin-left: 10px;
  color: #000000;
`;
export const HanaLogo = styled.img`
  width: 45;
  height: auto;
`;
export const YourType = styled.div`
  h3 {
    /* 당신의 소비 유형은 */
    position: absolute;
    width: 265px;
    height: 31px;
    left: 747px;
    top: 130px;

    text-align: center;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 104%;
    /* or 31px */

    color: #000000;
  }

  h1 {
    /* 오늘만 산다 */

    /* 나에게 주는 선물 */

    position: absolute;
    width: 540px;
    height: 73px;
    left: 623px;
    top: 160px;

    text-align: center;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 70px;
    line-height: 104%;
    /* identical to box height, or 73px */

    color: #000000;
  }
`;
export const YourTypeTag1 = styled.div`
  /*#YOLO*/
  h3 {
    position: absolute;
    width: 108px;
    height: 47px;
    left: 469px;
    top: 777px;

    display: flex;
    justify-content: center;
    align-items: center;
    background: #cfcfcf;
    border-radius: 20px;
  }

  /*당신은 ㅇㅇ입니다*/
  p {
    position: absolute;
    width: 750px;
    height: 78px;
    left: 469px;
    top: 835px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 130%;
    /* or 39px */
    display: flex;
    align-items: center;

    color: #000000;
  }
`;

export const YourTypeTag2 = styled.div`
  /*___P*/
  h3 {
    position: absolute;
    width: 112px;
    height: 47px;
    left: 583px;
    top: 777px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #cfcfcf;
    border-radius: 20px;
  }
`;

export const ResultImg = styled.img`
  /* 오늘만 산다, 나에게 주는 선물 이미지(1,2) */
  position: absolute;
  width: 437;
  height: 414;
  left: 670px;
  top: 300px;
`;

export const ResultImg3 = styled.img`
  /* F2 2 */

  position: absolute;
  width: 560px;
  height: 490px;
  left: 572px;
  top: 323px;

  background: url(F2.png);
`;

export const Retry = styled.div`
  /* 다시하기 */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  gap: 10px;

  position: absolute;
  width: 291px;
  height: 93px;
  left: 113px;
  top: 972px;

  background: #008485;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  p {
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
  }
`;

export const ToMain = styled.div`
  /* 메인으로 */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  gap: 10px;

  position: absolute;
  width: 291px;
  height: 93px;
  left: 1297px;
  top: 972px;

  background: #008485;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  p {
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
  }
`;

export const BackGround = styled.div`
  /* Rectangle 2632 */

  position: absolute;
  width: 1728px;
  height: 1021px;

  background: #f5f7fa;
`;
