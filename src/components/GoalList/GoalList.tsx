import React, { useState } from "react";
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
  setGoals: (goals: Goal[]) => void;
}

export default function GoalList(props: GoalListProps) {
  const { goals, onGoalClick, setGoals } = props;
  const [activeGoalId, setActiveGoalId] = useState<string | null>(
    goals.length > 0 ? String(goals[0].id) : null,
  ); // 첫 번째 요소를 기본 선택

  const handleGoalClick = (goal: Goal) => {
    setActiveGoalId(String(goal.id));
    onGoalClick(goal);
  };

  const handleDelete = async (goalId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the goal click event

    try {
      const response = await fetch(
        `http://localhost:9090/api/calendar/goals/${goalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      // Update local state
      const updatedGoals = goals.filter((goal) => goal.id !== goalId);
      setGoals(updatedGoals);

      // If the deleted goal was active, select the first remaining goal
      if (String(goalId) === activeGoalId) {
        if (updatedGoals.length > 0) {
          setActiveGoalId(String(updatedGoals[0].id));
          onGoalClick(updatedGoals[0]);
        } else {
          setActiveGoalId(null);
        }
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("목표 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <GoalListContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            color={goal.color}
            isActive={String(goal.id) === activeGoalId}
            onClick={() => handleGoalClick(goal)}
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
            <DeleteButton
              src={deleteIcon}
              onClick={(e) => handleDelete(goal.id, e)}
            />
          </GoalItem>
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
