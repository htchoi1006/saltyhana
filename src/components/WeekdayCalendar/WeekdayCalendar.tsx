import { useEffect, useRef, useState } from "react";
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

  // 현재 날짜 이전 날짜 중 Achieve가 70% 이상 : smile, 50% ~ 60% : neutral, 그 이하 : sad
  const stateImg: string = (() => {
    const today = new Date();
    const todayIndex = dates.findIndex(({ date }) => {
      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      );
    });

    const archieveNumber = dates.filter(
      (d, i) => d.isAchieve && i <= todayIndex,
    ).length;

    if (archieveNumber >= Math.floor(todayIndex * 0.7)) {
      const smileList = [smile1, smile2, smile3, smile4];
      const randomIndex = Math.floor(Math.random() * smileList.length);
      return smileList[randomIndex];
    } else if (
      archieveNumber >= Math.floor(todayIndex * 0.5) &&
      archieveNumber < Math.floor(todayIndex * 0.7)
    ) {
      console.log(archieveNumber, Math.floor(todayIndex * 0.5));
      return neutral;
    } else {
      return sad;
    }
  })();

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
        <StateIcon src={stateImg} />
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
