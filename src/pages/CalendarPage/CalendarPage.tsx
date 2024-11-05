// import React from "react";
// import * as styled from "./styles";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import googleCalendarPlugin from "@fullcalendar/google-calendar";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   DayCellContentArg,
//   DayCellMountArg,
//   EventSourceInput,
// } from "@fullcalendar/core";
// import goalimage from "../../images/goal_icon_travel.png";

// interface Goal {
//   id: number;
//   title: string;
//   startDate: string;
//   endDate: string;
//   color: string;
// }

// interface CalendarProps {}

// const Calendar: React.FC<CalendarProps> = () => {
//   const apiKey: string | undefined = process.env.REACT_APP_CAL_API_KEY;
//   const calendarRef = React.useRef<FullCalendar>(null);

//   const goals: Goal[] = [
//     {
//       id: 1,
//       title: "프로젝트 완성",
//       startDate: "2024-11-01",
//       endDate: "2024-11-15",
//       color: "#3b82f6",
//     },
//   ];

//   const calculateProgress = (date: Date, goal: Goal): number => {
//     const dateStr = date.toISOString().split("T")[0];
//     const totalDays: number =
//       (new Date(goal.endDate).getTime() - new Date(goal.startDate).getTime()) /
//       (1000 * 3600 * 24);
//     const progressDays: number =
//       (new Date(dateStr).getTime() - new Date(goal.startDate).getTime()) /
//       (1000 * 3600 * 24);

//     return Math.min(Math.max((progressDays / totalDays) * 100, 0), 100);
//   };

//   const checkDateType = (date: Date, goal: Goal): "start" | "end" | null => {
//     const dateStr = date.toISOString().split("T")[0];
//     if (dateStr === goal.startDate) return "start";
//     if (dateStr === goal.endDate) return "end";
//     return null;
//   };

//   const getActiveGoals = (date: Date): Goal[] => {
//     const dateStr = date.toISOString().split("T")[0];
//     return goals.filter((goal) => {
//       return dateStr >= goal.startDate && dateStr <= goal.endDate;
//     });
//   };

//   const handleDayCellDidMount = (arg: DayCellMountArg): void => {
//     const activeGoals = getActiveGoals(arg.date);

//     if (activeGoals.length === 0) return;

//     // Get the main day cell element
//     const dayCell = arg.el as HTMLElement;

//     // Set relative positioning on the day cell
//     dayCell.style.position = "relative";

//     activeGoals.forEach((goal) => {
//       const progress = calculateProgress(arg.date, goal);
//       const dateType = checkDateType(arg.date, goal);

//       // Create container for icon and progress bar
//       const container = document.createElement("div");
//       container.className = "goal-container";

//       // Create icon if it's start or end date
//       if (dateType) {
//         const imgUrl = goalimage;
//         const icon = document.createElement("div");
//         icon.className = "goal-icon";
//         icon.innerHTML = `
//                     <img src=${imgUrl} width="30" height="30">
//                     </img>
//                 `;

//         // Add icon based on date type
//         if (dateType === "start") {
//           container.appendChild(icon);
//         }

//         // Add progress bar container
//         const progressEvent = document.createElement("div");
//         progressEvent.className = "progress-event";

//         // Adjust progress event width based on icon presence
//         progressEvent.style.maxWidth = dateType ? "80%" : "100%";

//         // Create progress bar
//         const progressBar = document.createElement("div");
//         progressBar.className = "progress-bar";
//         progressBar.style.width = `${progress}%`;
//         progressBar.style.backgroundColor = "#0087bf";

//         // Append progress bar
//         progressEvent.appendChild(progressBar);
//         container.appendChild(progressEvent);

//         // Add icon at the end if it's end date
//         if (dateType === "end") {
//           container.appendChild(icon);
//         }
//       } else {
//         // Just add progress bar for dates in between
//         const progressEvent = document.createElement("div");
//         progressEvent.className = "progress-event";
//         progressEvent.style.maxWidth = "100%";

//         const progressBar = document.createElement("div");
//         progressBar.className = "progress-bar";
//         progressBar.style.width = `${progress}%`;
//         progressBar.style.backgroundColor = "#0087bf";

//         progressEvent.appendChild(progressBar);
//         container.appendChild(progressEvent);
//       }

//       dayCell.appendChild(container);
//     });
//   };

//   const handleDayCellContent = (args: DayCellContentArg): JSX.Element => {
//     const dayNumber = args.dayNumberText.replace("일", "");
//     return <div>{dayNumber}</div>;
//   };

//   return (
//     <styled.CalendarContainer>
//       <styled.FullCalendarWrapper>
//         <style>
//           {`
//                         .fc-daygrid-day {
//                             position: relative !important;
//                             padding-bottom: 6px !important;
//                         }
//                         .fc-daygrid-day-frame {
//                             min-height: 100px !important;
//                             height: 100% !important;
//                         }
//                         .fc-daygrid-day-events {
//                             margin-bottom: 8px !important;
//                         }
//                         .goal-container {
//                             position: absolute;
//                             bottom: 0;
//                             left: 0;
//                             right: 0;
//                             display: flex;
//                             align-items: center;
//                             justify-content: center;
//                             padding: 0 12px;
//                             gap: 4px;
//                             height: 30px;
//                             box-sizing: border-box;
//                         }
//                         .goal-icon {
//                             display: flex;
//                             align-items: center;
//                             justify-content: center;
//                             flex-shrink: 0;
//                             height: 100%;
//                         }
//                         .goal-icon img {
//                             max-height: 100%;
//                             width: auto;
//                             object-fit: contain;
//                         }
//                         .progress-event {
//                             flex: 1;
//                             height: 6px;
//                             background-color: #e5e7eb;
//                             border-radius: 3px;
//                             position: relative;
//                             align-self: center;
//                         }
//                         .progress-bar {
//                             height: 100%;
//                             border-radius: 3px;
//                             transition: width 0.3s ease;
//                         }
//                         .fc-daygrid-day-frame {
//                             overflow: visible !important;
//                         }
//                     `}
//         </style>
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           height={800}
//           showNonCurrentDates={false}
//           fixedWeekCount={false}
//           googleCalendarApiKey={apiKey}
//           events={{
//             googleCalendarId: "hyuktae.choi@gmail.com",
//             className: "gcal-event",
//           }}
//           headerToolbar={{
//             left: "prev",
//             center: "title",
//             right: "next",
//           }}
//           titleFormat={{ year: "numeric", month: "2-digit" }}
//           locale="ko"
//           eventDisplay="block"
//           eventTextColor="#FFF"
//           eventColor="#008485"
//           dayMaxEvents={2}
//           moreLinkContent={(args: { num: number }) => `+${args.num}개 더보기`}
//           eventTimeFormat={{
//             hour: "2-digit",
//             minute: "2-digit",
//             meridiem: false,
//             hour12: false,
//           }}
//           buttonText={{
//             today: "오늘",
//             month: "월",
//             week: "주",
//             day: "일",
//             list: "목록",
//           }}
//           dayCellDidMount={handleDayCellDidMount}
//           dayCellContent={handleDayCellContent}
//         />
//       </styled.FullCalendarWrapper>
//     </styled.CalendarContainer>
//   );
// };

// export default Calendar;
import React, { useState } from "react";
import { DayCellContentArg, DayCellMountArg } from "@fullcalendar/core";
import travel from "../../images/goal_icon_travel.png";
import beer from "../../images/goal_icon_beer.png";
import MonthCalendar from "../../components/MonthCalendar/MonthCalendar";
import GoalList from "../../components/GoalList/GoalList";
import { CalendarContainer, Container } from "./styles";
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
  const apiKey: string | undefined = process.env.REACT_APP_CAL_API_KEY;
  const [selectedGoal, setSelectedGoal] = React.useState<Goal | undefined>(
    undefined,
  );
  const [calendarKey, setCalendarKey] = useState(0); // State to force re-render

  const goals: Goal[] = [
    {
      id: 1,
      title: "프로젝트 완성",
      startDate: "2024-11-01",
      endDate: "2024-11-15",
      color: "#eab308",
      progress: 20,
      icon: beer,
    },
    {
      id: 2,
      title: "여행",
      startDate: "2024-11-05",
      endDate: "2024-11-10",
      color: "#3b82f6",
      progress: 10,
      icon: travel,
    },
  ];

  const handleGoalClick = (goal: Goal) => {
    // 목표 클릭 시 해당 목표로 설정
    setSelectedGoal(goal);
    setCalendarKey((prev) => prev + 1);
  };

  const handleDayCellDidMount = (arg: DayCellMountArg): void => {
    const date = arg.date;
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() + 1);
    const formattedDate = previousDate.toISOString().split("T")[0];

    if (selectedGoal) {
      // 특정 목표 골랐을 때 trigger
      if (
        formattedDate >= selectedGoal.startDate &&
        formattedDate <= selectedGoal.endDate
      ) {
        const dayNumberCell = arg.el.querySelector(".fc-daygrid-day-top");
        if (dayNumberCell) {
          // 선택된 목표 색상으로 설정
          dayNumberCell.setAttribute(
            "style",
            `
            background-color: ${selectedGoal.color};
            padding: 3px;
            margin-top: 5px;
          `,
          );

          // 시작 날짜일 경우 왼쪽 모서리 둥글게
          if (formattedDate === selectedGoal.startDate) {
            dayNumberCell.setAttribute(
              "style",
              `
              background-color: ${selectedGoal.color}; 
              border-top-left-radius: 50px; 
              border-bottom-left-radius: 50px;
              padding: 3px;
              margin-top: 5px;
            `,
            );
          }

          // 종료 날짜일 경우 오른쪽 모서리 둥글게
          if (formattedDate === selectedGoal.endDate) {
            dayNumberCell.setAttribute(
              "style",
              `
              background-color: ${selectedGoal.color}; 
              border-top-right-radius: 50px; 
              border-bottom-right-radius: 50px;
              padding: 3px;
              margin-top: 5px;
            `,
            );
          }
        }
      }
    }

    goals.forEach((goal) => {
      if (formattedDate === goal.startDate || formattedDate === goal.endDate) {
        const icon = goal.id === 1 ? beer : goal.id === 2 ? travel : ""; // Select icon based on goal ID
        const img = document.createElement("img");

        img.src = icon;
        img.alt = "Goal Icon";
        img.style.width = "90px";
        img.style.position = "relative";
        img.style.bottom = "5px";
        img.style.left = "50%";
        img.style.transform = "translateX(-50%)";

        // 'fc-daygrid-day-frame fc-scrollgrid-sync-inner' 클래스를 가진 div 찾기
        const dayFrame = Array.from(
          arg.el.getElementsByClassName(
            "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
          ),
        );

        if (dayFrame.length > 0) {
          dayFrame.forEach((frame) => {
            frame.append(img.cloneNode(true)); // 각 요소에 이미지를 추가
          });
        }
      }
    });
  };

  const handleDayCellContent = (args: DayCellContentArg): JSX.Element => {
    const dayNumber = args.dayNumberText.replace("일", "");
    return <div>{dayNumber}</div>;
  };

  return (
    <Container>
      <CalendarContainer>
        <MonthCalendar
          calendarKey={calendarKey}
          apiKey={apiKey}
          handleDayCellDidMount={handleDayCellDidMount}
          handleDayCellContent={handleDayCellContent}
        />
      </CalendarContainer>
      <GoalList goals={goals} onGoalClick={handleGoalClick} />
    </Container>
  );
}
