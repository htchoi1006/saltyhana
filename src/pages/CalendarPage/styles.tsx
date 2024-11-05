import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #f5f7fa;
  font-family: "Noto Sans KR";
  padding: 2rem;
  gap: 2rem;
`;

export const CalendarContainer = styled.div`
  flex: 2.2;
  background: white;
  border-radius: 35px;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  padding: 1rem; /* 패딩을 1rem으로 조정하여 캘린더가 작아질 수 있게 함 */
`;
