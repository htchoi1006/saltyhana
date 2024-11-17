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
} from "./styles";
import travel from "../../images/travel.svg";
import goals from "../../images/goals.png";

interface GoalContainerProps {
  goal: string | null;
  startdate: string | null;
  enddate: string | null;
  progress: number | 0;
}

const GoalProgressContainer = (props: GoalContainerProps) => {
  const { goal, startdate, enddate, progress } = props;

  const [currentProgress, setCurrentProgress] = useState(0);
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    // 프로그레스바 초기화
    setCurrentProgress(0);
    setDisplayedProgress(0);

    // 약간의 지연 후 애니메이션 시작
    const startDelay = setTimeout(() => {
      setCurrentProgress(progress);

      // 숫자 카운트 업 애니메이션
      const duration = 1500; // 1.5초
      const steps = 60; // 60프레임
      const increment = progress / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const counter = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setDisplayedProgress((prev) => {
            const next = Math.min(
              progress,
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
  }, [progress]);

  return (
    <StyledGoalContainer>
      <GoalContainerDiv>
        <GoalContainerHeader>짭짤하나 님의 현재 목표</GoalContainerHeader>
        <GoalTitle>{goal}</GoalTitle>
        <GoalDate>
          {startdate} ~ {enddate}
        </GoalDate>

        {/* <ProgressContainer>
					<ProgressBar>
						<Progress style={{ width: `${currentProgress}%` }} />
						<ProgressPercentage
							style={{
								right: `${100 - currentProgress}%`,
								bottom: "50px",
							}}
						>
							{`${displayedProgress}%`}
						</ProgressPercentage>
						<ProgressImage
							src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Running.png"
							alt="Man Running"
							leftPosition={currentProgress}
						/>
					</ProgressBar>
				</ProgressContainer> */}
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
        </ProgressContainer>
      </GoalContainerDiv>
      <GoalIcon src={travel} />
    </StyledGoalContainer>
  );
};

const GoalSetContainer = () => {
  return (
    <StyledGoalContainer>
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
    </StyledGoalContainer>
  );
};

export default function GoalContainer(props: GoalContainerProps) {
  const { goal, startdate, enddate, progress } = props;

  return goal == null ? (
    <GoalSetContainer />
  ) : (
    <GoalProgressContainer
      goal={goal}
      startdate={startdate}
      enddate={enddate}
      progress={progress}
    />
  );
}
