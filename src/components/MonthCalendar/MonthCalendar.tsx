// CustomCalendar.tsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import interactionPlugin from "@fullcalendar/interaction";
import { DayCellContentArg, DayCellMountArg } from "@fullcalendar/core";
import { FullCalendarWrapper } from "./styles";

interface CustomCalendarProps {
  calendarKey: number;
  apiKey?: string;
  handleDayCellDidMount: (arg: DayCellMountArg) => void;
  handleDayCellContent: (args: DayCellContentArg) => JSX.Element;
  onDateClick: (date: string) => void;
}

export default function MonthCalendar(props: CustomCalendarProps) {
  const {
    calendarKey,
    apiKey,
    handleDayCellDidMount,
    handleDayCellContent,
    onDateClick,
  } = props;

  return (
    <FullCalendarWrapper>
      <FullCalendar
        key={calendarKey} // Use the key to force re-render
        plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={800}
        showNonCurrentDates={false}
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
        dayMaxEvents={2}
        moreLinkContent={(args: { num: number }) => `+${args.num}개 더보기`}
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
        dayCellDidMount={handleDayCellDidMount}
        dayCellContent={handleDayCellContent}
        dateClick={(info) => {
          onDateClick(info.dateStr); // 날짜 클릭 시 부모 컴포넌트로 날짜 전달
        }}
      />
    </FullCalendarWrapper>
  );
}
