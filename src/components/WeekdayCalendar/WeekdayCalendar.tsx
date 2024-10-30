import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import calendar from "../../images/calendar.svg";
import {
  CalendarContainer,
  CalendarDay,
  CalendarIcon,
  CalendarMonthDiv,
  CalendarWeek,
} from "./styles";
import { WeekDayType } from "../../type";

interface Props {
  dates: WeekDayType[];
}

export default function WeekdayCalendar(props: Props) {
  const { dates } = props;
  const today = useRef(dayjs());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dateCount, setDateCount] = useState(0);

  const calculateDateCount = () => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.offsetWidth - 160;
      setDateCount(Math.floor(totalWidth / 90));
    }
  };

  useEffect(() => {
    calculateDateCount();
    window.addEventListener("resize", calculateDateCount);
    return () => {
      window.removeEventListener("resize", calculateDateCount);
    };
  }, []);

  return (
    <CalendarContainer ref={containerRef}>
      <CalendarMonthDiv>
        <CalendarIcon src={calendar} />
        <span>{today.current.format("M월")}</span>
      </CalendarMonthDiv>
      <CalendarWeek>
        {dates.slice(0, dateCount).map((v, i) => {
          const date = dayjs(v.date);
          const dayStr = date.format("ddd").toLocaleUpperCase();

          return (
            <CalendarDay
              key={date.toString()}
              is_achieve={v.isAchieve}
              day={dayStr}
              index={i}
              is_today={date.isSame(today.current, "date")}
            >
              <span>{dayStr}</span>
              <span>{date.format("DD")}</span>
            </CalendarDay>
          );
        })}
      </CalendarWeek>
    </CalendarContainer>
  );
}
