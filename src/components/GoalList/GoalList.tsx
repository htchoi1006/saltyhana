import React, { useState } from "react";
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

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (goal: Goal) => void;
  setGoals: (goals: Goal[]) => void;
}

export default function GoalList(props: GoalListProps) {
  const navigate = useNavigate();
  const { goals, onGoalClick, setGoals } = props;

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
        const { activeGoals } = sortGoals(updatedGoals);
        if (activeGoals.length > 0) {
          setActiveGoalId(String(activeGoals[0].id));
          onGoalClick(activeGoals[0]);
        } else {
          setActiveGoalId(null);
        }
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("목표 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const getIconIdFromImageUrl = (imageUrl: string) => {
    // URL에서 파일 이름 추출
    const fileName = imageUrl.split("/").pop()?.split(".")[0];

    // 아이콘 이름을 ID로 매핑
    if (fileName?.includes("travel")) return 23;
    if (fileName?.includes("anniversary")) return 8;
    if (fileName?.includes("shopping")) return 21;
    if (fileName?.includes("money")) return 17;
    if (fileName?.includes("beer")) return 10;
    if (fileName?.includes("coffee")) return 14;
    if (fileName?.includes("car")) return 12;
    if (fileName?.includes("ticket")) return 22;
    if (fileName?.includes("cake")) return 11;
    if (fileName?.includes("lobstar")) return 16;
    if (fileName?.includes("beach")) return 9;
    if (fileName?.includes("pet")) return 19;
    if (fileName?.includes("party")) return 18;
    if (fileName?.includes("cruise")) return 15;
    if (fileName?.includes("amusement")) return 7;
    if (fileName?.includes("christmas")) return 13;
    if (fileName?.includes("phone")) return 20;
    return 0;
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

      // 응답 데이터를 PUT 요청 형식에 맞게 변환
      const formattedGoalData = {
        goalName: goalToEdit.title,
        goalMoney: goalToEdit.totalMoney,
        startDate: goalToEdit.startAt.split("T")[0],
        endDate: goalToEdit.endAt.split("T")[0],
        goalType: parseInt(goalToEdit.category),
        iconId: goalToEdit.iconImage
          ? getIconIdFromImageUrl(goalToEdit.iconImage)
          : 0,
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
      alert("목표 정보를 불러오는데 실패했습니다.");
    }
  };

  const renderGoalItem = (goal: Goal) => (
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
            <EditButton
              src={editIcon}
              onClick={(e) => handleEdit(goal.id, e)}
            />
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
        {activeGoals.map(renderGoalItem)}

        {/* 비활성 목표가 있을 경우에만 구분선 표시 */}
        {inactiveGoals.length > 0 && activeGoals.length > 0 && <Divider />}

        {/* 비활성 목표 렌더링 */}
        {inactiveGoals.map(renderGoalItem)}
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
