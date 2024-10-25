import styled from "styled-components";

// 공통 hover 시간을 위한 변수
const hoverTransitionTime = "0.5s";

// 색상 변수
const selectionHoverColor = "#B4ADAD"; // BeforeQuestion 색상
const beforeHoverColor = "#E8E8E8"; // Selection 1,2,3 색상

export const Stepper = styled.img`
  /* stepper */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 1492px;
  height: 35px;
  left: 123px;
  top: 102px;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const Question = styled.div`
  h1 {
    /* Q1. */
    position: absolute;
    width: 161px;
    height: 89px;
    left: 795px;
    top: 280px;

    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 104%;
    /* or 62px */

    color: #008485;
  }

  p {
    /* 사고 싶은 게 생겼다 */
    position: absolute;
    width: 1000px;
    height: 42px;
    left: 350px;
    top: 410px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 104%;
    /* identical to box height, or 42px */

    color: #000000;
  }
`;

export const Selection1 = styled.button`
  /* Selection 1 */
  position: absolute;
  width: 636px;
  height: 95px;
  left: 524px;
  top: 620px;

  display: flex;
  align-items: center;

  background: #e8e8e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none; /* 검정 테두리 제거 */
  outline: none; /* 클릭 시 발생하는 포커스 테두리 제거 */

  p {
    position: absolute;
    width: 636px;
    height: 96px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    line-height: 104%;
    color: #008485;
  }

  transition: background ${hoverTransitionTime};

  &:hover {
    background: ${selectionHoverColor}; /* BeforeQuestion 색상으로 hover */
  }
`;

export const Selection2 = styled.button`
  /* Selection 2 */
  position: absolute;
  width: 636px;
  height: 96px;
  left: 524px;
  top: 776px;

  display: flex;
  align-items: center;

  background: #e8e8e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none; /* 검정 테두리 제거 */
  outline: none; /* 클릭 시 발생하는 포커스 테두리 제거 */

  p {
    position: absolute;
    width: 636px;
    height: 96px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    line-height: 104%;
    color: #d60036;
  }

  transition: background ${hoverTransitionTime};

  &:hover {
    background: ${selectionHoverColor}; /* BeforeQuestion 색상으로 hover */
  }
`;

export const Selection3 = styled.button`
  /* Selection 3 */
  position: absolute;
  width: 636px;
  height: 96px;
  left: 524px;
  top: 933px;

  display: flex;
  align-items: center;

  background: #e8e8e8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none; /* 검정 테두리 제거 */
  outline: none; /* 클릭 시 발생하는 포커스 테두리 제거 */

  p {
    position: absolute;
    width: 636px;
    height: 96px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 40px;
    line-height: 104%;
    color: #000000;
  }

  transition: background ${hoverTransitionTime};

  &:hover {
    background: ${selectionHoverColor}; /* BeforeQuestion 색상으로 hover */
  }
`;

export const BeforeQuestion = styled.div`
  /* Polygon 3 */
  position: absolute;
  width: 0;
  height: 0;
  left: 97px;
  top: 611px;
  border-top: 26px solid transparent;
  border-bottom: 26px solid transparent;
  border-right: 52px solid #b4adad; /* 삼각형 모양 생성 */
  transform: rotate(0deg); /* 필요에 따라 회전 가능 */

  transition: border-right-color ${hoverTransitionTime};

  &:hover {
    border-right-color: ${beforeHoverColor}; /* Selection 색상으로 hover */
  }
`;
