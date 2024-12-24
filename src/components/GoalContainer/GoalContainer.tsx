import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  StyledGoalContainer,
  GoalContainerDiv,
  GoalContainerHeader,
  GoalTitle,
  GoalDate,
  GoalIcon,
  ProgressBar,
  MoneyProgress,
  Progress,
  ProgressContainer,
  ProgressPercentage,
  ProgressImage,
  GoalLeftDiv,
  GoalDescription,
  GoalButton,
  GoalRightDiv,
  GoalHeader,
  RunnerContainer,
  StyledSetGoalContainer,
} from "./styles";
import travel from "../../images/travel.svg";
import goals from "../../images/goals.png";

interface GoalContainerProps {
  goal: string | null;
  goalPeriod: string | null;
  userName: string | null;
  iconImage: string | undefined;
  customImage: string | undefined;
  currentMoney: number | 0;
  totalMoney: number | 0;
  percentage: number | 0;
}

const GoalProgressContainer = (props: GoalContainerProps) => {
  const {
    goal,
    goalPeriod,
    percentage,
    totalMoney,
    currentMoney,
    userName,
    iconImage,
    customImage,
  } = props;

  const [currentProgress, setCurrentProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    // 프로그레스바 초기화
    setCurrentProgress(0);
    setDisplayedProgress(0);

    // 약간의 지연 후 애니메이션 시작
    const startDelay = setTimeout(() => {
      setCurrentProgress(percentage);

      // 숫자 카운트 업 애니메이션
      const duration = 1500; // 1.5초
      const steps = 60; // 60프레임
      const increment = percentage / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const counter = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setDisplayedProgress((prev) => {
            const next = Math.min(
              percentage,
              Math.round(increment * currentStep),
            );
            return next;
          });
        } else {
          clearInterval(counter);
        }
      }, stepDuration);

      return () => {
        clearInterval(counter);
      };
    }, 100);

    return () => clearTimeout(startDelay);
  }, [percentage]);

  // customImage 또는 iconImage 중 유효한 이미지를 선택
  const imageToDisplay = customImage || iconImage || travel; // 기본값으로 travel 이미지를 설정

  return (
    <StyledGoalContainer>
      <GoalContainerDiv>
        <GoalContainerHeader>{userName} 님의 현재 목표</GoalContainerHeader>
        <GoalTitle>{goal}</GoalTitle>
        <GoalDate>{goalPeriod}</GoalDate>
        <ProgressContainer>
          <ProgressBar>
            <Progress style={{ width: `${currentProgress}%` }} />
            <RunnerContainer leftPosition={currentProgress}>
              <ProgressImage
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Running.png"
                alt="Man Running"
              />
              <ProgressPercentage>{`${displayedProgress}%`}</ProgressPercentage>
            </RunnerContainer>
          </ProgressBar>
          <MoneyProgress>
            <span>
              {currentMoney}원&nbsp;/&nbsp;
              {totalMoney}원
            </span>
          </MoneyProgress>
        </ProgressContainer>
      </GoalContainerDiv>
      <GoalIcon src={imageToDisplay} />
    </StyledGoalContainer>
  );
};

const GoalSetContainer = () => {
  return (
    <StyledSetGoalContainer>
      <GoalLeftDiv>
        <GoalHeader>
          <span>목표 설정</span>
        </GoalHeader>
        <GoalDescription>
          <p>목표를 달성하려면 하루에 얼마씩 모아야 할까요?</p>
          <p>나만의 목표를 설정하고 즐거운 저축을 시작하세요.</p>
        </GoalDescription>
        <Link
          to="/goal"
          style={{
            textDecoration: "none",
            color: "inherit",
            width: "100%",
          }}
        >
          <GoalButton>
            <span>목표 설정하러 가기</span>
          </GoalButton>
        </Link>
      </GoalLeftDiv>
      <GoalRightDiv src={goals} />
    </StyledSetGoalContainer>
  );
};

export default function GoalContainer(props: GoalContainerProps) {
  const {
    goal,
    goalPeriod,
    percentage,
    totalMoney,
    currentMoney,
    userName,
    iconImage,
    customImage,
  } = props;

  return goal == null ? (
    <GoalSetContainer />
  ) : (
    <GoalProgressContainer
      goal={goal}
      goalPeriod={goalPeriod}
      percentage={percentage}
      totalMoney={totalMoney}
      currentMoney={currentMoney}
      userName={userName}
      iconImage={iconImage}
      customImage={customImage}
    />
  );
}
