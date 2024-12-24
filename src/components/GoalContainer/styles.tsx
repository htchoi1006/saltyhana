import styled from "styled-components";

export const StyledGoalContainer = styled.div`
  background-color: #eaf1fa;
  font-family:
    Noto Sans KR,
    sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 30px;
  min-height: 150px;
  font-size: 15px;
  font-weight: 700;
  height: 200px;
`;

export const StyledSetGoalContainer = styled.div`
  background-color: #eaf1fa;
  font-family:
    Noto Sans KR,
    sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 25px 30px;
  min-height: 150px;
  font-size: 15px;
  font-weight: 700;
  height: 200px;
`;

export const GoalContainerDiv = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const GoalContainerHeader = styled.div`
  color: rgba(63, 63, 63, 1);
  font-size: 20px;
  font-weight: 600;
`;

export const GoalTitle = styled.div`
  justify-content: flex-start;
  align-items: start;
  display: flex;
  flex-direction: column;
  color: rgba(63, 63, 63, 1);
  font-size: 42px;
  font-weight: 800;
  padding-top: 5px;
`;

export const GoalDate = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  padding-left: 2px;
`;

export const GoalIcon = styled.img.attrs({ alt: "목표 이미지" })`
  width: 200px;
  height: 200px;
  background-size: cover;
  margin-left: 0;
`;

export const ProgressBar = styled.div`
  width: 75%;
  background-color: #ececec;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: relative;
  height: 24px;
  margin-top: 15px;
`;

export const MoneyProgress = styled.div`
  margin-left: 20px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 800;
`;

export const Progress = styled.div`
  background-color: #008485;
  height: 100%;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  position: absolute;
  transition: width 1.5s ease-in-out;
`;

export const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

export const RunnerContainer = styled.div<{ leftPosition: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 1px;
  bottom: 100%;
  left: ${({ leftPosition }) => `calc(${leftPosition}% - 20px)`};
  transition: left 1.5s ease-in-out;
  margin-bottom: 10px;
`;

export const ProgressPercentage = styled.div`
  font-size: 20px;
  white-space: nowrap;
`;

export const ProgressImage = styled.img`
  width: 35px;
  height: 35px;
  transform: scaleX(-1);
`;

export const GoalLeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
`;

export const GoalHeader = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 800;
  font-size: 42px;
  line-height: 70px;
  display: flex;
  align-items: center;

  color: #404040;
`;

export const GoalDescription = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #404040;
  margin-top: 5px;

  > p {
    margin: 0;
  }
`;

export const GoalButton = styled.button`
  box-sizing: border-box;
  width: 200px;
  height: 60px;

  background: #98c5ff;
  border-radius: 50px;
  border: none;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background: #5c9ff4;
  }

  > span {
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    color: #404040;
  }
`;

export const GoalRightDiv = styled.img`
  width: 300px;
  height: 220px;
  margin-left: 400px;
`;
