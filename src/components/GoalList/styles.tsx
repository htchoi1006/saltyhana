import styled from "styled-components";

// 목표 리스트 상위 컨테이너
export const GoalListContainer = styled.div`
  flex: 0.9;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
`;

// 목표 개별 스타일
export const GoalItem = styled.div`
  background-color: ${(props) => props.color || "#e5e7eb"};
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &:hover {
    scale: 1.05;
  }
`;

// 목표명 스타일
export const GoalTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
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
