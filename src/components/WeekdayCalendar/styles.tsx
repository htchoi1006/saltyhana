import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const rotateCalendar = keyframes`
    0% {
        transform: rotate(10deg);
    }
    70% {
        transform: rotate(-10deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

export const CalendarContainer = styled.div`
  display: flex;
  margin: 0 20px 15px 0;
  align-items: center;
  > div:nth-child(1) {
    flex: none;
  }
  > div:nth-child(2) {
    flex: 1;
    min-height: 90px;
  }
`;

export const CalendarMonthDiv = styled.div`
  display: flex;
  width: 130px;
  flex-direction: column;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  > img {
    animation: ${rotateCalendar} 0.2s ease-out forwards;
  }
  > span {
    font-size: 20px;
    font-weight: 600;
    justify-content: center;
    text-align: center;
    padding-left: 10px;
  }
`;

export const CalendarWeek = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px 5px;
  border-radius: 35px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const CalendarDay = styled.div<{
  is_achieve: boolean;
  is_today: boolean;
  day: string;
  index: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  gap: 7px;
  aspect-ratio: 1;
  border-radius: 30px;
  font-size: 18px;
  animation: ${fadeIn} ${({ index }) => (index + 1) * 0.2}s ease-out forwards;
  border: ${({ is_today }) =>
    is_today ? "3px solid rgb(93 ,75, 156)" : "inherit"};

  > span:nth-child(1) {
    font-weight: 600;
    color: ${({ is_today, is_achieve, day }) => {
      if (!is_achieve) return "rgba(100,100,100,0.3)";
      if (day === "SAT") {
        return "rgb(50, 50, 190)";
      } else if (day === "SUN") {
        return "rgb(190,50, 50)";
      }
      return "black";
    }};
  }
  > span:nth-child(2) {
    font-weight: 800;
    font-size: 20px;
    color: ${({ is_today, is_achieve }) => {
      if (!is_achieve) return "rgba(100,100,100,0.3)";
      return "black";
    }};
  }
`;

export const StateIcon = styled.img.attrs({ alt: "상태 이미지" })`
  width: 100px;
  height: 100px;
  background-size: cover;
`;

export const StampIcon = styled.img.attrs({ alt: "스탬프 이미지" })`
  width: 60px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
