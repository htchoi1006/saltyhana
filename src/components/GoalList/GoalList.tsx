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
  GoalRegisterButton,
  DeleteButton,
  EditButton,
} from "./styles";
import { Goal } from "../../pages/CalendarPage/CalendarPage";
import { Link } from "react-router-dom";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (goal: Goal) => void;
}

export default function GoalList(props: GoalListProps) {
  const { goals, onGoalClick } = props;

  return (
    <GoalListContainer>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {goals.map((goal) => (
          <>
            <GoalItem
              key={goal.id}
              color={goal.color}
              onClick={() => onGoalClick(goal)}
            >
              <GoalDiv>
                <GoalInfo>
                  <GoalTitle>
                    {goal.title}
                    <Link to="/goal">
                      <EditButton src={editIcon} />
                    </Link>
                  </GoalTitle>
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
              <DeleteButton src={deleteIcon} />
            </GoalItem>
          </>
        ))}
      </div>
      <div>
        <Link to="/goal" style={{ textDecoration: "none" }}>
          <GoalRegisterButton>
            <span>목표설정</span>
          </GoalRegisterButton>
        </Link>
      </div>
    </GoalListContainer>
  );
}
