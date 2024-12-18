import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContainer, Container } from "./styles";
import { DayCellContentArg, DayCellMountArg } from "@fullcalendar/core";
import travel from "../../images/goal_icon_travel.png";
import beer from "../../images/goal_icon_beer.png";
import phone from "../../images/goal_icon_phone.webp";
import MonthCalendar from "../../components/MonthCalendar/MonthCalendar";
import GoalList from "../../components/GoalList/GoalList";
export interface Goal {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  color: string;
  progress: number;
  icon: string;
}

export default function Calendar() {
  const navigate = useNavigate();
  const apiKey: string | undefined = process.env.REACT_APP_CAL_API_KEY;
  const goals: Goal[] = [
    {
      id: 1,
      title: "프로젝트 완성",
      startDate: "2024-11-15",
      endDate: "2024-11-29",
      color: "#eab308",
      progress: 40,
      icon: beer,
    },
    {
      id: 2,
      title: "파리 여행",
      startDate: "2024-11-29",
      endDate: "2024-12-04",
      color: "#3b82f6",
      progress: 0,
      icon: travel,
    },
    {
      id: 3,
      title: "맥북 구매",
      startDate: "2024-11-08",
      endDate: "2024-12-05",
      color: "#718ebf",
      progress: 30,
      icon: phone,
    },
  ];

  // 첫 번째 목표를 기본으로 선택
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(goals[0]);
  const [calendarKey, setCalendarKey] = useState(0); // 캘린더 강제 재렌더링 상태

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

  return (
    <Container>
      <CalendarContainer>
        <MonthCalendar
          calendarKey={calendarKey}
          apiKey={apiKey}
          handleDayCellDidMount={handleDayCellDidMount}
          handleDayCellContent={handleDayCellContent}
          onDateClick={handleDateSelect} // 날짜 클릭 핸들러 전달
        />
      </CalendarContainer>
      <GoalList goals={goals} onGoalClick={handleGoalClick} />
    </Container>
  );
}
