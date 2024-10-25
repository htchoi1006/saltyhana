import React, { useState } from "react";
import * as styled from "./styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar: React.FC = () => {
  const apiKey = process.env.REACT_APP_CAL_API_KEY;
  const calendarRef = React.useRef<FullCalendar>(null);

  return (
    <styled.CalendarContainer>
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
