import React, { useState } from "react";
import { Plane, Flame, Check, ChevronLeft, ChevronRight } from "lucide-react";
// import styled from "styled-components";
import * as styled from "./styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarEvent {
  date: number;
  type: "plane" | "flame" | "check";
  category: "deadline" | "goal" | "work";
}

const Calendar: React.FC = () => {
  const apiKey = "AIzaSyDK1a0AFVqigb5YxHKcc0ZZTjdFUl7zMqo";
  const calendarRef = React.useRef<FullCalendar>(null);
  // 현재 날짜로 초기화
  const today = new Date();
  const [currentDate, setCurrentDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1, // getMonth()는 0-11을 반환하므로 1을 더함
  });

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { year: prev.year, month: prev.month - 1 };
    });
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      }
      return { year: prev.year, month: prev.month + 1 };
    });
  };

  // 해당 월의 총 일수 계산
  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  // 윤년 체크
  const isLeapYear = (year: number): boolean => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // 달력 데이터 생성
  const generateCalendarDays = () => {
    const days: Array<{ day: number | string; empty: boolean }> = [];

    // 해당 월의 첫 날의 요일 구하기 (0: 일요일)
    const firstDay = new Date(
      currentDate.year,
      currentDate.month - 1,
      1,
    ).getDay();

    // 해당 월의 총 일수 계산
    let totalDays: number;
    if (currentDate.month === 2) {
      // 2월
      totalDays = isLeapYear(currentDate.year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(currentDate.month)) {
      // 30일인 달
      totalDays = 30;
    } else {
      // 31일인 달
      totalDays = 31;
    }

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: "", empty: true });
    }

    // 날짜 추가
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, empty: false });
    }

    return days;
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const calendarDays = generateCalendarDays();

  // 월 이름 포맷
  const formatMonth = (month: number): string => {
    return month < 10 ? `0${month}` : `${month}`;
  };

  // 이벤트 데이터
  const events: CalendarEvent[] = [
    { date: 2, type: "plane", category: "deadline" },
    { date: 9, type: "flame", category: "goal" },
    { date: 10, type: "check", category: "work" },
  ];

  const getEventIcon = (date: number) => {
    const event = events.find((e) => e.date === date);
    if (!event) return null;

    switch (event.type) {
      case "plane":
        return <Plane color="#3B82F6" size={24} />;
      case "flame":
        return <Flame color="#F59E0B" size={24} />;
      case "check":
        return <Check color="#10B981" size={24} />;
      default:
        return null;
    }
  };

  const hasSchedule = (
    date: number,
    category: "deadline" | "goal" | "work",
  ): boolean => {
    if (category === "deadline" && [2, 3, 4, 5, 6, 7].includes(date))
      return true;
    if (category === "goal" && [9, 10].includes(date)) return true;
    return false;
  };

  return (
    <styled.CalendarContainer>
      {/* <styled.CalendarHeader>
				<styled.Title>
					<styled.NavigationButton onClick={goToPreviousMonth}>
						<ChevronLeft size={24} />
					</styled.NavigationButton>
					<styled.MonthDisplay>
						{`${formatMonth(currentDate.month)}월, ${currentDate.year}`}
					</styled.MonthDisplay>
					<styled.NavigationButton onClick={goToNextMonth}>
						<ChevronRight size={24} />
					</styled.NavigationButton>
				</styled.Title>
			</styled.CalendarHeader>

			<styled.WeekDayContainer>
				{weekDays.map((day, index) => (
					<styled.WeekDay key={index}>{day}</styled.WeekDay>
				))}
			</styled.WeekDayContainer>

			<styled.CalendarGrid>
				{calendarDays.map((date, index) => (
					<styled.DateCell
						key={index}
						isEmpty={date.empty}
						isToday={
							!date.empty &&
							date.day === today.getDate() &&
							currentDate.month === today.getMonth() + 1 &&
							currentDate.year === today.getFullYear()
						}
					>
						<span>{date.day}</span>

						{!date.empty && (
							<>
								<styled.IconWrapper>
									{getEventIcon(Number(date.day))}
								</styled.IconWrapper>

								{hasSchedule(Number(date.day), "deadline") && (
									<styled.ScheduleBar category="deadline" />
								)}
								{hasSchedule(Number(date.day), "goal") && (
									<styled.ScheduleBar category="goal" />
								)}
							</>
						)}
					</styled.DateCell>
				))}
			</styled.CalendarGrid>

			<styled.Legend>
				<styled.LegendItem>
					<styled.LegendDot color="#3B82F6" />
					<span>목표</span>
				</styled.LegendItem>
				<styled.LegendItem>
					<styled.LegendDot color="#F59E0B" />
					<span>목표</span>
				</styled.LegendItem>
				<styled.LegendItem>
					<styled.LegendDot color="#10B981" />
					<span>적금</span>
				</styled.LegendItem>
			</styled.Legend> */}

      {/* ----------------------------- */}
      {/* <FullCalendar
				plugins={[dayGridPlugin, googleCalendarPlugin]}
				initialView="dayGridMonth"
				googleCalendarApiKey={apiKey}
				events={{
					googleCalendarId: "hyuktae.choi@gmail.com",
				}}
				eventDisplay={"block"}
				eventTextColor={"#FFF"}
				eventColor={"#F2921D"}
				height={"660px"}
				// Toolbar
			/> */}

      <styled.FullCalendarWrapper>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={800}
          showNonCurrentDates={false} // 이전/다음 달 날짜 숨기기
          fixedWeekCount={false}
          googleCalendarApiKey={apiKey}
          events={{
            googleCalendarId: "hyuktae.choi@gmail.com",
            className: "gcal-event",
          }}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          titleFormat={{ year: "numeric", month: "2-digit" }}
          locale="ko"
          eventDisplay="block"
          eventTextColor="#FFF"
          eventColor="#008485"
          dayMaxEvents={2} // 최대 이벤트 표시 개수 제한
          moreLinkContent={(args) => `+${args.num}개 더보기`}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
          buttonText={{
            today: "오늘",
            month: "월",
            week: "주",
            day: "일",
            list: "목록",
          }}
          dayCellContent={(args) => {
            return args.dayNumberText.replace("일", "");
          }}
        />
      </styled.FullCalendarWrapper>
    </styled.CalendarContainer>
  );
};

export default Calendar;
