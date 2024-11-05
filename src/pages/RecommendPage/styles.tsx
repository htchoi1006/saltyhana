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
}
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
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 35px;
  animation: ${fadeIn} 1s ease-out;
`;

export const TestCardLeftDiv = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  margin: 0 5%;
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
  margin: 20px 0;
  padding: 10px;
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
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
`;

export const TestCardImage = styled.img`
  width: 100%;
  height: 90%;
  object-fit: contain;
`;
