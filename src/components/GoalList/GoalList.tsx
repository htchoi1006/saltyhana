import React from "react";
import {
  GoalListContainer,
  GoalItem,
  GoalInfo,
  GoalDiv,
  GoalTitle,
  GoalDate,
  GoalIcon,
  ProgressBar,
  ProgressFill,
} from "./styles";
import { Goal } from "../../pages/CalendarPage/CalendarPage";

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (goal: Goal) => void;
}

export default function GoalList(props: GoalListProps) {
  const { goals, onGoalClick } = props;

  return (
    <GoalListContainer>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          color={goal.color}
          onClick={() => onGoalClick(goal)}
        >
          <GoalDiv>
            <GoalInfo>
              <GoalTitle>{goal.title}</GoalTitle>
              <GoalDate>
                {goal.startDate} - {goal.endDate}
              </GoalDate>
            </GoalInfo>
            <GoalIcon src={goal.icon} alt="Goal Icon" />
          </GoalDiv>
          <ProgressBar>
            <ProgressFill
              style={{
                width: `${goal.progress}%`,
                bottom: "50px",
                backgroundColor: goal.color,
                opacity: "0.5",
              }}
            />
          </ProgressBar>
        </GoalItem>
      ))}
    </GoalListContainer>
  );
}
