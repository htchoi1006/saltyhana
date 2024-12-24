import React, { useState } from "react";
import axios from "axios";
import ModalsOk from "./ModalsOk";
import ModalsBackground from "./ModalsBackground";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";
import ButtonsSection from "./ButtonsSection";
import { Bank } from "../Maps/BankLocation";
import BankLocation from "../Maps/BankLocation";
import BankSearch from "./BankSearch";
import BankList from "./BankList";
import {
  MapContainer,
  LeftContainer,
  RightContainer,
  UnderMapContainer,
  DateContainer,
  Left2Container,
} from "./styles";

interface ModalsProps {
  onClose: () => void;
}

export default function Modals(props: ModalsProps) {
  const { onClose } = props;

  const [startIndex, setStartIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [nearbyBanks, setNearbyBanks] = useState<Bank[]>([]);
  const [searchBanks, setSearchBanks] = useState<Bank[]>([]);
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
  const [responseStatus, setResponseStatus] = useState<number | null>(null);

  // 기본 날짜 세팅
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const handleReserve = async () => {
    if (!selectedBank) {
      alert("예약하려는 지점을 선택해주세요.");
      return;
    } else if (!selectedTime) {
      alert("예약 시간을 선택해주세요.");
      return;
    }
    setIsReservationConfirmed(true);

    const reservationData = {
      bankName: selectedBank.name,
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      time: selectedTime,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/google-calendar/insert`,
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
            "Content-Type": "application/json",
          },
        },
      );

      setResponseStatus(response.status);

      if (response.status === 200) {
        console.log("예약 성공:", response.data);
        setIsReservationConfirmed(true); // 성공 시 OK 모달로 이동
      } else {
        alert("예약 처리 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("예약 실패:", error);
      alert("Google 연동을 먼저 진행해주세요.");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    console.log("선택된 시간:", time);
  };

  return (
    <>
      <ModalsBackground onClose={onClose}>
        <MapContainer>
          <BankLocation
            onSelectBank={setSelectedBank}
            setNearbyBanks={setNearbyBanks}
            selectedBank={selectedBank}
            setSelectedBank={setSelectedBank}
            searchQuery={searchQuery}
            onSearchResults={setSearchBanks}
            setSearchQuery={setSearchQuery} // 쿼리 업데이트 함수 전달
          />
        </MapContainer>
        <UnderMapContainer>
          <LeftContainer>
            <Left2Container>
              <BankSearch onSearch={setSearchQuery} />
              <DateContainer>
                <DateSelector
                  selectedYear={selectedYear}
                  selectedMonth={selectedMonth}
                  selectedDay={selectedDay}
                  // 날짜 변경 시 시간 초기화
                  setSelectedYear={(year) => {
                    setSelectedYear(year);
                    setSelectedTime(null);
                    setStartIndex(0);
                  }}
                  setSelectedMonth={(month) => {
                    setSelectedMonth(month);
                    setSelectedTime(null);
                    setStartIndex(0);
                  }}
                  setSelectedDay={(day) => {
                    setSelectedDay(day);
                    setSelectedTime(null);
                    setStartIndex(0);
                  }}
                />
              </DateContainer>
            </Left2Container>

            <TimeSelector
              selectedTime={selectedTime}
              handleTimeSelect={handleTimeSelect}
              startIndex={startIndex}
              setStartIndex={setStartIndex}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedDay={selectedDay}
            />
          </LeftContainer>

          <RightContainer>
            <BankList
              banks={searchQuery ? searchBanks : nearbyBanks}
              onSelectBank={setSelectedBank}
              selectedBank={selectedBank}
            />
          </RightContainer>
        </UnderMapContainer>

        <ButtonsSection onClose={onClose} handleReserve={handleReserve} />
      </ModalsBackground>

      {isReservationConfirmed && (
        <ModalsOk
          onClose={() => {
            setIsReservationConfirmed(false);
            setResponseStatus(null);
            onClose();
          }}
          statusCode={responseStatus}
          selectedBank={selectedBank ? selectedBank.name : null}
          selectedDate={`${selectedYear}-${selectedMonth}-${selectedDay}`}
          selectedTime={selectedTime}
        />
      )}
    </>
  );
}
