import { useState } from "react";
import icon_left from "../../images/modal_leftscroll.png";
import icon_right from "../../images/modal_rightscroll.png";
import icon_search from "../../images/modal_search.png";
import BankLocation from "../BankLocation";
import { Bank } from "../BankLocation";
import ModalsOk from "./ModalsOk";

import {
  BgModal,
  ModalContainer,
  MapContainer,
  LocationButtonContainer,
  SearchBox,
  LocationButton,
  DateSelector,
  CloseButton,
  ReserveButton,
  ButtonContainer,
  TimeButton,
  TimeButtonContainer,
  ScrollButton,
} from "./styles";

const Modals = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [startIndex, setStartIndex] = useState(0); // 현재 시작 인덱스
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false); // 예약 완료 모달 상태

  //기본 날짜 세팅
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // 월은 0부터 시작하므로 1을 더함
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  //은행 선택
  const handleSelectBank = (bank: Bank) => {
    setSelectedBank(bank.name); // 선택된 은행의 이름 저장
    console.log("선택된 은행:", bank.name);
  };

  // 모달 닫기 함수
  const handleClose = () => {
    setIsOpen(false);
  };

  // 모달 바깥을 클릭하면 모달 닫기
  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // 예약하기 버튼 클릭 처리
  const handleReserve = () => {
    if (!selectedBank) {
      // 은행이 선택되지 않았으면
      alert("예약하려는 지점을 선택해주세요.");
      return;
    } else if (!selectedTime) {
      // 시간이 선택되지 않았으면
      alert("예약 시간을 선택해주세요.");
      return;
    }
    setIsOpen(false);
    setIsReservationConfirmed(true);
  };

  // 연도 옵션 생성 함수
  const years: JSX.Element[] = [
    <option key={2024} value={2024}>
      2024
    </option>,
    <option key={2025} value={2025}>
      2025
    </option>,
  ];

  // 월 옵션 생성 함수
  const generateMonths = (): JSX.Element[] => {
    const months: JSX.Element[] = [];
    for (let month = 1; month <= 12; month++) {
      months.push(
        <option key={month} value={month}>
          {month}
        </option>,
      );
    }
    return months;
  };

  // 일 옵션 생성 함수
  const generateDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    for (let day = 1; day <= 31; day++) {
      days.push(
        <option key={day} value={day}>
          {day}
        </option>,
      );
    }
    return days;
  };

  // 시간 슬롯 생성 함수 (30분 간격)
  const generateTimeSlots = (): JSX.Element[] => {
    const times: JSX.Element[] = [];
    let currentHour: number = 9; // 시작 시간 (오전 9시)
    let currentMinute: number = 0;

    // 30분 간격으로 오후 3시 30분까지 생성
    while (currentHour < 15 || (currentHour === 15 && currentMinute <= 30)) {
      const time: string = `${currentHour < 10 ? "0" : ""}${currentHour}:${
        currentMinute === 0 ? "00" : "30"
      }`;
      times.push(
        <TimeButton
          key={time}
          isSelected={selectedTime === time}
          onClick={() => handleTimeSelect(time)}
        >
          {time}
        </TimeButton>,
      );

      if (currentMinute === 0) {
        currentMinute = 30;
      } else {
        currentMinute = 0;
        currentHour++;
      }
    }
    return times;
  };

  const handleTimeSelect = (time: string) => {
    // 이미 선택된 시간이 있을 경우, 선택을 해제하지 않고 새로 선택
    if (selectedTime !== time) {
      setSelectedTime(time); // 새로 선택
    } else {
      setSelectedTime(null); // 선택 해제
    }
    console.log(`선택된 시간: ${time}`);
  };

  // 시간 버튼 이동 함수
  const handleLeftClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleRightClick = () => {
    const timeSlotsLength = generateTimeSlots().length;
    if (startIndex < timeSlotsLength - 7) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <>
      {isOpen && (
        <BgModal onClick={handleBgClick}>
          <ModalContainer>
            <div>
              <MapContainer>
                <BankLocation onSelectBank={handleSelectBank} />
              </MapContainer>

              {/* 지점 및 시간 선택을 위한 레이아웃 */}
              <LocationButtonContainer>
                <SearchBox>
                  <input type="text" placeholder="지점을 검색하세요" />
                  <img src={icon_search} alt="Search" />
                </SearchBox>
                <LocationButton>
                  {selectedBank ? selectedBank : "지점을 선택하세요"}{" "}
                  {/* 은행 이름 또는 기본 텍스트 */}
                </LocationButton>
              </LocationButtonContainer>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "88%",
              }}
            >
              <p style={{ justifyContent: "start", marginLeft: "10px" }}>
                예약할 날짜와 시간을 선택해주세요.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <DateSelector
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {years}
                </DateSelector>
                <span style={{ marginLeft: "5px" }}>년</span>
                <DateSelector
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {generateMonths()}
                </DateSelector>{" "}
                <span style={{ marginLeft: "5px" }}>월</span>
                <DateSelector
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                >
                  {generateDays()}
                </DateSelector>
                <span style={{ marginLeft: "5px" }}>일</span>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              {/* 왼쪽 버튼 */}
              <ScrollButton
                onClick={handleLeftClick}
                style={{ visibility: startIndex > 0 ? "visible" : "hidden" }} // 버튼이 사라져도 공간 유지
              >
                <img
                  src={icon_left}
                  alt="Left Scroll"
                  style={{ width: "15px" }}
                />
              </ScrollButton>

              {/* 시간 선택 버튼 */}
              <TimeButtonContainer>
                {generateTimeSlots().slice(startIndex, startIndex + 7)}
              </TimeButtonContainer>

              {/* 오른쪽 버튼 */}
              <ScrollButton
                onClick={handleRightClick}
                style={{
                  visibility:
                    startIndex < generateTimeSlots().length - 7
                      ? "visible"
                      : "hidden",
                }} // 버튼이 사라져도 공간 유지
              >
                <img
                  src={icon_right}
                  alt="Right Scroll"
                  style={{ width: "15px" }}
                />
              </ScrollButton>
            </div>
            {/* 예약 및 닫기 버튼 */}
            <ButtonContainer>
              <CloseButton onClick={handleClose}>닫기</CloseButton>
              <ReserveButton onClick={handleReserve}>예약하기</ReserveButton>
            </ButtonContainer>
          </ModalContainer>
        </BgModal>
      )}
      {isReservationConfirmed && (
        <ModalsOk
          onClose={() => setIsReservationConfirmed(false)}
          selectedBank={selectedBank} // 선택된 은행
          selectedDate={`${selectedYear}-${selectedMonth}-${selectedDay}`} // 선택된 날짜
          selectedTime={selectedTime} // 선택된 시간
        />
      )}
    </>
  );
};

export default Modals;
