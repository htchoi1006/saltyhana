import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 개별 상품 스타일
export const Card = styled.div`
  width: 90%;
  aspect-ratio: 16/10;
  margin-top: 10px;
  background-size: cover;
  border-radius: 35px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  position: relative;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
`;

// 카드 안 제목
export const CardTitle = styled.span`
  position: absolute;
  font-weight: 600;
  font-size: 28px;
  text-align: left;
  margin: 0;
  top: 20px;
  left: 18px;
  color: black;
  z-index: 2;
`;

// 카드 안 부제목
export const CardSubTitle = styled.span`
  position: absolute;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  margin: 0;
  top: 70px;
  text-align: left;
  left: 18px;
  color: black;
  z-index: 2;
`;

// 상품 정보
export const Info = styled.p`
  position: absolute;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  white-space: pre-line;
  line-height: 1.5;
  bottom: 20px;
  left: 18px;
  color: black;
  z-index: 2;
  margin: 0;
  text-align: left;
`;

// 카드 이미지 스타일
export const CardImage = styled.img`
  width: 90px;
  height: 90px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  object-fit: contain;
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 투명 배경 설정 */
`;
