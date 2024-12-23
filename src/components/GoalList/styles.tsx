import styled from "styled-components";

// 목표 리스트 상위 컨테이너
export const GoalListContainer = styled.div`
  flex: 0.8;
  background: #ffffff;
  border-radius: 35px;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  position: relative;
  height: 90vh;
  overflow-y: scroll;
`;

export const GoalRegisterButton = styled.div`
  bottom: 20px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  background-color: #008485;
  color: white;
  border: none;
  border-radius: 35px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR";

  &:hover {
    background-color: #006e6f;
  }

  &:active {
    background-color: #005858;
  }
`;

// 목표 수정 버튼 스타일
export const EditButton = styled.img.attrs({ alt: "편집 아이콘" })`
  margin-left: 10px;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #008485;
  font-size: 20px;
`;

// 목표 삭제 버튼 스타일
export const DeleteButton = styled.img.attrs({ alt: "삭제 아이콘" })`
  position: absolute;
  top: 0;
  right: 0;
  margin: -5px;
  width: 30px;
  height: auto;
  cursor: pointer;
  visibility: hidden;
`;

// 목표 개별 스타일
export const GoalItem = styled.div<{ color: string; isActive: boolean }>`
  background-color: ${(props) => props.color || "#e5e7eb"};
  color: white;
  padding: 20px;
  border-radius: 35px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.3s ease;

  // 애니메이션 효과 추가
  ${(props) =>
    props.isActive
      ? `
    transform: scale(1.05); // 클릭 시 확대
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3); // 클릭 시 그림자 강조
    opacity: 1; // 클릭 시 투명도 유지
  `
      : `
    &:hover {
      transform: scale(1.03);
      opacity: 0.95; // 호버 시 투명도 약간 줄임
    }
  `}

  &:hover ${DeleteButton} {
    visibility: visible;
  }
`;

// 목표명 스타일
export const GoalTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  text-align: center;
`;

// 목표 아이콘, 이름, 날짜 div
export const GoalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

// 목표명, 날짜 div
export const GoalInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

// 목표 날짜 스타일
export const GoalDate = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff; // 아이콘과 구분을 위한 색상
`;

// 목표 아이콘 스타일
export const GoalIcon = styled.img`
  width: 80px;
  height: auto;
  margin-left: auto;
`;

// Progress bar 스타일
export const ProgressBar = styled.div`
  background-color: #e5e7eb; // 프로그래스 바 배경 색상
  height: 8px; // 프로그래스 바 높이
  border-radius: 4px;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
`;

// Progress bar
export const ProgressFill = styled.div`
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`;
