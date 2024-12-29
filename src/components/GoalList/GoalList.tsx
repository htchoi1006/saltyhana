import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Divider,
} from "./styles";
import { Goal } from "../../pages/CalendarPage/CalendarPage";
import { Link } from "react-router-dom";
import editIcon from "../../images/edit.png";
import deleteIcon from "../../images/delete.png";
import ModalManager, { ModalManagerType } from "../Modals/ModalManager";

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (goal: Goal) => void;
  setGoals: (goals: Goal[]) => void;
}

export default function GoalList(props: GoalListProps) {
  const navigate = useNavigate();
  const { goals, onGoalClick, setGoals } = props;
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const modalManagerRef = useRef<ModalManagerType>(null);

  // 목표들을 정렬하는 함수
  const sortGoals = (goalsToSort: Goal[]) => {
    const currentDate = new Date().toISOString().split("T")[0];

    // 목표를 활성(진행 중)과 비활성(종료됨)으로 분류
    const activeGoals = goalsToSort.filter(
      (goal) => goal.endDate >= currentDate,
    );
    const inactiveGoals = goalsToSort.filter(
      (goal) => goal.endDate < currentDate,
    );

    // 활성 목표는 시작일 기준 오름차순 정렬
    const sortedActiveGoals = activeGoals.sort((a, b) =>
      a.startDate.localeCompare(b.startDate),
    );

    return {
      activeGoals: sortedActiveGoals,
      inactiveGoals: inactiveGoals,
    };
  };

  // 정렬된 목표 배열들
  const { activeGoals, inactiveGoals } = sortGoals(goals);

  const [activeGoalId, setActiveGoalId] = useState<string | null>(
    activeGoals.length > 0 ? String(activeGoals[0].id) : null,
  );

  const handleGoalClick = (goal: Goal) => {
    setActiveGoalId(String(goal.id));
    onGoalClick(goal);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:9090/api/calendar/goals/${selectedGoalId}`,
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
      const updatedGoals = goals.filter((goal) => goal.id !== selectedGoalId);
      setGoals(updatedGoals);

      // If the deleted goal was active, select the first remaining goal
      if (String(selectedGoalId) === activeGoalId) {
        const { activeGoals } = sortGoals(updatedGoals);
        if (activeGoals.length > 0) {
          setActiveGoalId(String(activeGoals[0].id));
          onGoalClick(activeGoals[0]);
        } else {
          setActiveGoalId(null);
        }
      }
      modalManagerRef.current?.closeModal();
    } catch (error) {
      console.error("Error deleting goal:", error);
      if (modalManagerRef.current) {
        modalManagerRef.current.openModal("목표관리실패");
      }
    }
  };

  const getIconId = (imageUrl: string) => {
    const fetchIcons = async (imageUrl: string) => {
      try {
        const response = await fetch("http://localhost:9090/api/icons/goal", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch icons");
        }

        const data = await response.json();
        const matchedIcon = data.find(
          (icon: any) => icon.imageUrl === imageUrl,
        );

        return matchedIcon.id;
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    const goalId = fetchIcons(imageUrl);
    return goalId;
  };

  const handleEdit = async (goalId: number, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      // 전체 목표 리스트 조회
      const response = await fetch(
        "http://localhost:9090/api/goals?activeOnly=false",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }

      const goals = await response.json();
      const goalToEdit = goals.find((goal: any) => goal.id === goalId);

      if (!goalToEdit) {
        throw new Error("Goal not found");
      }

      let iconId = 0;
      if (goalToEdit.iconImage) {
        iconId = await getIconId(goalToEdit.iconImage);
      }

      // 응답 데이터를 PUT 요청 형식에 맞게 변환
      const formattedGoalData = {
        goalName: goalToEdit.title,
        goalMoney: goalToEdit.totalMoney,
        startDate: goalToEdit.startAt.split("T")[0],
        endDate: goalToEdit.endAt.split("T")[0],
        goalType: parseInt(goalToEdit.category),
        iconId: goalToEdit.iconImage ? iconId : 0,
        goalImg: goalToEdit.customImage,
        connectedAccount: goalToEdit.connected_account,
        category: goalToEdit.category,
      };

      // 페이지 이동
      navigate("/goal", {
        state: {
          isEdit: true,
          goalId,
          goalData: formattedGoalData,
        },
      });
    } catch (error) {
      console.error("Error fetching goal details:", error);
      if (modalManagerRef.current) {
        modalManagerRef.current.openModal("목표관리실패");
      }
    }
  };

  const handleCancel = () => {
    setSelectedGoalId(null);
    modalManagerRef.current?.closeModal();
  };

  const renderGoalItem = (goal: Goal, isActiveGoal: boolean) => (
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
            {/* 활성 목표일 경우에만 EditButton 렌더링 */}
            {isActiveGoal && (
              <EditButton
                src={editIcon}
                onClick={(e) => handleEdit(goal.id, e)}
              />
            )}
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
      {/* 활성 목표일 경우에만 DeleteButton 렌더링 */}
      {isActiveGoal && (
        <DeleteButton
          src={deleteIcon}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedGoalId(goal.id);
            modalManagerRef.current?.openModal("목표삭제확인"); // 모달 열기
          }}
        />
      )}
    </GoalItem>
  );

  return (
    <GoalListContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* 활성 목표 렌더링 */}
        {activeGoals.map((goal) => renderGoalItem(goal, true))}

        {/* 비활성 목표가 있을 경우에만 구분선 표시 */}
        {inactiveGoals.length > 0 && activeGoals.length > 0 && <Divider />}

        {/* 비활성 목표 렌더링 */}
        {inactiveGoals.map((goal) => renderGoalItem(goal, false))}
      </div>
      <div>
        <Link to="/goal" style={{ textDecoration: "none" }}>
          <GoalRegisterButton>
            <span>목표설정</span>
          </GoalRegisterButton>
        </Link>
        <ModalManager
          ref={modalManagerRef}
          onConfirm={handleDelete}
          onCancel={handleCancel}
          state={"삭제"}
        />
      </div>
    </GoalListContainer>
  );
}
