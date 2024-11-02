import React, { useEffect } from "react";
import {
  DateSelector as StyledDateSelector,
  DateContainer,
  DateSelectorContainer,
  DateSelectorText,
} from "./styles";

interface DateSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedDay: (day: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedYear,
  selectedMonth,
  selectedDay,
  setSelectedYear,
  setSelectedMonth,
  setSelectedDay,
}) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  // 선택된 날짜가 오늘보다 이전인지 확인하는 함수
  const isDateBeforeToday = (year: number, month: number, day: number) => {
    const selectedDate = new Date(year, month - 1, day);
    const todayDate = new Date(currentYear, currentMonth - 1, currentDay);
    return selectedDate < todayDate;
  };

  // 해당 월의 마지막 날짜를 구하는 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    // 초기 렌더링 시 오늘 이전 날짜가 선택되어 있다면 오늘 날짜로 설정
    if (isDateBeforeToday(selectedYear, selectedMonth, selectedDay)) {
      setSelectedYear(currentYear);
      setSelectedMonth(currentMonth);
      setSelectedDay(currentDay);
    }
  }, []);

  const years = [currentYear, currentYear + 1].map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  const generateMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    // 현재 년도가 선택되었을 경우 현재 월부터만 선택 가능
    if (selectedYear === currentYear) {
      return months
        .filter((month) => month >= currentMonth)
        .map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ));
    }
    return months.map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // 현재 년도와 월이 선택되었을 경우 현재 일자부터만 선택 가능
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return days
        .filter((day) => day >= currentDay)
        .map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ));
    }
    return days.map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setSelectedYear(newYear);

    // 년도 변경 시 날짜가 과거가 되는 경우 조정
    if (newYear === currentYear && selectedMonth < currentMonth) {
      setSelectedMonth(currentMonth);
      setSelectedDay(currentDay);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = Number(e.target.value);
    setSelectedMonth(newMonth);

    // 월 변경 시 날짜가 과거가 되는 경우 조정
    if (
      selectedYear === currentYear &&
      newMonth === currentMonth &&
      selectedDay < currentDay
    ) {
      setSelectedDay(currentDay);
    }

    // 선택된 일자가 새로운 월의 마지막 날짜보다 큰 경우 조정
    const daysInNewMonth = getDaysInMonth(selectedYear, newMonth);
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  };

  return (
    <DateContainer>
      <DateSelectorText>예약할 날짜와 시간을 선택해주세요.</DateSelectorText>
      <DateSelectorContainer>
        <StyledDateSelector value={selectedYear} onChange={handleYearChange}>
          {years}
        </StyledDateSelector>
        <span style={{ marginLeft: "3px", marginRight: "10px" }}>년</span>
        <StyledDateSelector value={selectedMonth} onChange={handleMonthChange}>
          {generateMonths()}
        </StyledDateSelector>
        <span style={{ marginLeft: "3px", marginRight: "10px" }}>월</span>
        <StyledDateSelector
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {generateDays()}
        </StyledDateSelector>
        <span style={{ marginLeft: "3px" }}>일</span>
      </DateSelectorContainer>
    </DateContainer>
  );
};

export default DateSelector;
