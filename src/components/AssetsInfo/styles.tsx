import styled from "styled-components";

// 자산 변화 가이드 스타일
export const AssetGuideDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
  margin-top: 30px;
`;

// 자산 변화 가이드 제목
export const AssetTitle = styled.h3`
  font-size: 30px;
  margin: 0px;
`;

// 자산 변화 가이드 설명
export const AssetDescription = styled.h3`
  font-size: 15px;
  margin: 0px;
`;

// 자산 변화 가이드 이미지
export const CharacterIcon = styled.img.attrs({ alt: "이미지" })`
  width: 180px;
  height: auto;
`;

// 자산 기간 변화에 따른 누적 합계 스타일
export const CumulativeSum = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #264653;
  margin-top: 20px;

  > span {
    color: #008485;
    font-weight: 900;
  }
`;
