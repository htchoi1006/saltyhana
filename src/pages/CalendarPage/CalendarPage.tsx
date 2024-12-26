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
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);
  const [calendarKey, setCalendarKey] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

        console.log(response);

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

  const fetchCalendarEvents = async () => {
    try {
      const eventsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/google-calendar/events`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "application/json",
          },
        },
      );

      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        const formattedEvents = events.map((event: any) => ({
          id: event.id,
          title: event.summary,
          start: event.start,
          url: event.htmlLink,
        }));
        setCalendarEvents(formattedEvents);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      setIsAuthenticated(false);
    }
  };

  // 인증이 필요한 경우에만 구글 Oauth 팝업을 띄움
  const authenticateAndFetchEvents = async () => {
    try {
      // 먼저 이벤트를 직접 가져오기 시도
      const eventsResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/google-calendar/events`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "application/json",
          },
        },
      );

      // 이벤트를 가져오는 데 성공하면 인증 과정 스킵
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        const formattedEvents = events.map((event: any) => ({
          id: event.id,
          title: event.summary,
          start: event.start,
          url: event.htmlLink,
        }));
        setCalendarEvents(formattedEvents);
        setIsAuthenticated(true);
        return;
      }

      // 인증이 필요한 경우에만 팝업으로 권한 받기
      const authResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/google-calendar/auth`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        },
      );

      if (!authResponse.ok) {
        throw new Error("Failed to authenticate");
      }

      const authUrl = await authResponse.text();
      if (!authUrl) {
        throw new Error("No authentication URL received");
      }

      const popup = window.open(
        authUrl,
        "googleAuth",
        "width=600,height=600,left=100,top=100",
      );

      await new Promise<void>((resolve, reject) => {
        const checkPopup = setInterval(() => {
          if (!popup || popup.closed) {
            clearInterval(checkPopup);
            resolve();
          }
        }, 1000);

        setTimeout(() => {
          clearInterval(checkPopup);
          reject(new Error("Authentication timeout"));
        }, 60000);
      });

      // 팝업이 닫힌 후 이벤트 가져오기
      await fetchCalendarEvents();
    } catch (error) {
      console.error("Error during authentication:", error);
      setIsAuthenticated(false);
    }
  };

  // 페이지 로드 시 자동으로 이벤트 가져오기
  useEffect(() => {
    fetchCalendarEvents();
  }, []);

  const handleLoadCalendar = async () => {
    try {
      await authenticateAndFetchEvents();
    } catch (error) {
      console.error("Error handling calendar load:", error);
    }
  };

  return (
    <Container>
      <CalendarContainer>
        <CloseButton onClick={handleLoadCalendar}>구글 연동</CloseButton>
        <MonthCalendar
          calendarKey={calendarKey}
          events={calendarEvents}
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
