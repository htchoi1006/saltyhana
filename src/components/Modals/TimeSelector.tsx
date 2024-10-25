import React from "react";
import { TimeButton, TimeButtonContainer, ScrollButton } from "./styles";
import icon_left from "../../images/modal_leftscroll.png";
import icon_right from "../../images/modal_rightscroll.png";

interface TimeSelectorProps {
  selectedTime: string | null;
  handleTimeSelect: (time: string) => void;
  startIndex: number;
  setStartIndex: (index: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  handleTimeSelect,
  startIndex,
  setStartIndex,
}) => {
  // 시간 슬롯 생성 함수
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(9); // 시작 시간 (예: 9시)
    startTime.setMinutes(0);

    // 9시부터 15시 30분까지의 시간 슬롯 생성
    while (
      startTime.getHours() < 15 ||
      (startTime.getHours() === 15 && startTime.getMinutes() <= 30)
    ) {
      const hours = startTime.getHours();
      const minutes = String(startTime.getMinutes()).padStart(2, "0");
      const formattedTime = `${String(hours).padStart(2, "0")}:${minutes}`;
      slots.push({
        key: formattedTime,
        label: formattedTime,
      });
      startTime.setMinutes(startTime.getMinutes() + 30); // 30분씩 증가
    }

    return slots;
  };
  const timeSlots = generateTimeSlots().slice(startIndex, startIndex + 7);

  const handleLeftClick = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleRightClick = () => {
    const timeSlotsLength = generateTimeSlots().length;
    if (startIndex < timeSlotsLength - 7) setStartIndex(startIndex + 1);
  };

  return (
    <div style={{ display: "flex" }}>
      <ScrollButton
        onClick={handleLeftClick}
        style={{ visibility: startIndex > 0 ? "visible" : "hidden" }}
      >
        <img src={icon_left} alt="Left Scroll" style={{ width: "15px" }} />
      </ScrollButton>
      <TimeButtonContainer>
        {timeSlots.map((time) => (
          <TimeButton
            key={time.key}
            isSelected={selectedTime === time.key}
            onClick={() => {
              handleTimeSelect(time.key);
            }}
          >
            {time.label}
          </TimeButton>
        ))}
      </TimeButtonContainer>
      <ScrollButton
        onClick={handleRightClick}
        style={{
          visibility:
            startIndex < generateTimeSlots().length - 7 ? "visible" : "hidden",
        }}
      >
        <img src={icon_right} alt="Right Scroll" style={{ width: "15px" }} />
      </ScrollButton>
    </div>
  );
};

export default TimeSelector;
