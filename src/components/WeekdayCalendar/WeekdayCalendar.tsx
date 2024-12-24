import { useMemo, useRef } from "react";
import { WeekDayType } from "../../type";
import neutral from "../../images/state_neutral.png";
import smile1 from "../../images/state_smile1.png";
import smile2 from "../../images/state_smile2.png";
import smile3 from "../../images/state_smile3.png";
import smile4 from "../../images/state_smile4.png";
import sad from "../../images/state_sad.png";
import {
  CalendarContainer,
  CalendarDay,
  StateIcon,
  CalendarMonthDiv,
  CalendarWeek,
} from "./styles";
import dayjs from "dayjs";
interface WeekdayCalendarProps {
  dates: WeekDayType[]; // 외부에서 전달받은 dates 데이터
}

export default function WeekdayCalendar({ dates }: WeekdayCalendarProps) {
  const today = useRef(dayjs());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 현재 날짜 이전 날짜 중 Achieve가 70% 이상 : smile, 50% ~ 60% : neutral, 그 이하 : sad
  const stateImg = useMemo(() => {
    const today = new Date();
    const todayIndex = dates.findIndex(({ date }) => {
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    });

    const achieveNumber = dates.filter(
      (d, i) => d.isAchieve && i <= todayIndex,
    ).length;

    if (achieveNumber >= Math.floor(todayIndex * 0.7)) {
      const smileList = [smile1, smile2, smile3, smile4];
      const randomIndex = Math.floor(Math.random() * smileList.length);
      return smileList[randomIndex];
    } else if (
      achieveNumber >= Math.floor(todayIndex * 0.5) &&
      achieveNumber < Math.floor(todayIndex * 0.7)
    ) {
      console.log(achieveNumber, Math.floor(todayIndex * 0.5));
      return neutral;
    } else {
      return sad;
    }
  }, [dates]);

  return (
    <CalendarContainer ref={containerRef}>
      <CalendarMonthDiv>
        <StateIcon src={stateImg} />
        <span>{today.current.format("M월")}</span>
      </CalendarMonthDiv>
      <CalendarWeek>
        {dates.map((v, i) => {
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
