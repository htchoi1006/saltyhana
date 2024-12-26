import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContainer, Container } from "./styles";
import { DayCellContentArg, DayCellMountArg } from "@fullcalendar/core";
import travel from "../../images/goal_icon_travel.png";
import MonthCalendar from "../../components/MonthCalendar/MonthCalendar";
import GoalList from "../../components/GoalList/GoalList";

import { CloseButton } from "../../components/Modals/styles";

interface APIGoal {
  id: number;
  userName: string;
  title: string;
  startAt: string;
  endAt: string;
  iconImage: string | null; // icon 테이블의 icon_image
  iconColor: string | null; // icon 테이블의 color
  customImage: string | null;
  connected_account: string | null;
  amount: number;
  percentage: number;
}
export interface Goal {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  color: string;
  progress: number;
  icon: string;
}

const transformAPIGoals = (apiGoals: APIGoal[]): Goal[] => {
  return apiGoals.map((apiGoal) => ({
    id: apiGoal.id,
    title: apiGoal.title,
    startDate: apiGoal.startAt.split("T")[0],
    endDate: apiGoal.endAt.split("T")[0],
    color: apiGoal.iconColor || "#718ebf",
    progress: apiGoal.percentage,
    icon: apiGoal.iconImage || apiGoal.customImage || travel,
  }));
};

export default function Calendar() {
  const navigate = useNavigate();
  const apiKey: string | undefined = process.env.REACT_APP_CAL_API_KEY;
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);
  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
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

        const apiGoals: APIGoal[] = await response.json();
        const transformedGoals = transformAPIGoals(apiGoals);
        setGoals(transformedGoals);

        // Set first goal as selected if available
        if (transformedGoals.length > 0 && !selectedGoal) {
          setSelectedGoal(transformedGoals[0]);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  // 첫 번째 목표를 기본으로 선택
  // const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(
  // 	goals[0]
  // );
  // const [calendarKey, setCalendarKey] = useState(0); // 캘린더 강제 재렌더링 상태

  const handleGoalClick = (goal: Goal) => {
    setSelectedGoal(goal);
    setCalendarKey((prev) => prev + 1);
  };

  const handleDayCellDidMount = (arg: DayCellMountArg): void => {
    const date = arg.date;
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() + 1);
    const formattedDate = previousDate.toISOString().split("T")[0];

    if (selectedGoal) {
      // 특정 목표가 선택되었을 때
      if (
        formattedDate >= selectedGoal.startDate &&
        formattedDate <= selectedGoal.endDate
      ) {
        const dayNumberCell = arg.el.querySelector(".fc-daygrid-day-top");
        if (dayNumberCell) {
          dayNumberCell.setAttribute(
            "style",
            `background-color: ${selectedGoal.color}; padding: 3px; margin-top: 5px;`,
          );

          if (formattedDate === selectedGoal.startDate) {
            dayNumberCell.setAttribute(
              "style",
              `background-color: ${selectedGoal.color}; 
               border-top-left-radius: 50px; 
               border-bottom-left-radius: 50px; padding: 3px; margin-top: 5px;`,
            );
          }
          if (formattedDate === selectedGoal.endDate) {
            dayNumberCell.setAttribute(
              "style",
              `background-color: ${selectedGoal.color}; 
               border-top-right-radius: 50px; 
               border-bottom-right-radius: 50px; padding: 3px; margin-top: 5px;`,
            );
          }
        }

        if (
          formattedDate === selectedGoal.startDate ||
          formattedDate === selectedGoal.endDate
        ) {
          const img = document.createElement("img");

          img.src = selectedGoal.icon;
          img.alt = "Goal Icon";
          img.style.width = "90px";
          img.style.position = "relative";
          img.style.bottom = "5px";
          img.style.left = "50%";
          img.style.transform = "translateX(-50%)";

          const dayFrame = Array.from(
            arg.el.getElementsByClassName(
              "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
            ),
          );

          if (dayFrame.length > 0) {
            dayFrame.forEach((frame) => frame.append(img.cloneNode(true)));
          }
        }
      }
    }
  };

  const handleDayCellContent = (args: DayCellContentArg): JSX.Element => {
    const dayNumber = args.dayNumberText.replace("일", "");
    return <div>{dayNumber}</div>;
  };

  const handleDateSelect = (date: string) => {
    navigate("/goal", { state: { selectedDate: date } }); // 날짜를 목표 정하기 페이지 state로 전달
  };

  const handleLoadCalendar = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/google-calendar/auth`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const authUrl = await response.text();
      if (!authUrl) {
        throw new Error("No authentication URL received");
      }

      // 브라우저를 Google 인증 URL로 이동
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <Container>
      <CalendarContainer>
        <CloseButton onClick={handleLoadCalendar}>구글 연동</CloseButton>
        <MonthCalendar
          calendarKey={calendarKey}
          apiKey={apiKey}
          handleDayCellDidMount={handleDayCellDidMount}
          handleDayCellContent={handleDayCellContent}
          onDateClick={handleDateSelect} // 날짜 클릭 핸들러 전달
        />
      </CalendarContainer>
      <GoalList
        goals={goals}
        onGoalClick={handleGoalClick}
        setGoals={setGoals}
      />
    </Container>
  );
}
