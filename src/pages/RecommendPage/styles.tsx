import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translateY(20px);
    }
to {
    opacity: 1;
    transform: translateY(0);
    }
`;

// 페이지 본문
export const BodyWrapper = styled.div`
  display: flex;
  height: 100%;
  background-color: #f5f7fa;
  align-items: center;
  justify-content: center;
`;

export const InnerBodyWrapper = styled.div`
  display: flex;
  width: 93%;
  height: 95%;
  flex-direction: column;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 15px;
`;

export const PageTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  color: #343434;
`;

export const PageDescription = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  padding-bottom: 15px;
`;

export const TestCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// 소비성향 테스트 카드
export const TestCard = styled.div`
  background: #fffbd8;
  width: 98%;
  height: 320px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 35px;
  animation: ${fadeIn} 1s ease-out;
`;

export const TestCardLeftDiv = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  margin-left: 50px;
`;

export const TestCardHeader = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  display: flex;
  align-items: center;
  color: #343434;
`;

export const TestCardHeaderIcon = styled.img`
  width: 80px;
  height: auto;
`;

export const TestCardDescription = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #343434;
  margin-top: 10px;

  > p {
    margin: 0;
  }
`;

export const TestCardButton = styled.button`
  box-sizing: border-box;
  width: 200px;
  background: rgba(248, 231, 140, 0.79);
  border-radius: 50px;
  border: none;
  margin-top: 20px;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background: rgba(249, 225, 90, 0.79);
  }

  > span {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #343434;
  }
`;

export const TestCardRightDiv = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-right: 7%;
`;

export const TestCardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
`;

// 고객센터 버튼
export const CounselBox = styled.div`
  width: 200px; /* 버튼의 너비 */
  height: 65px; /* 버튼의 높이 */
  background-color: #b3b3b3; /* 버튼 배경색 */
  border-radius: 50px; /* 둥근 모서리 */
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: flex-start; /* 아이콘과 텍스트를 왼쪽으로 정렬 */
  padding-left: 0px; /* 내부 여백 제거 */
  padding-right: 15px; /* 우측 여백만 설정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  cursor: pointer;
  gap: 10px; /* 아이콘과 텍스트 간격 */
  margin-top: 60px;
  margin-left: auto; /* 화면 왼쪽으로 붙임 */
  transition: transform 0.5s ease; /* 부드러운 전환 효과 추가 */

  &:hover {
    transform: scale(1.1);
  }
`;
