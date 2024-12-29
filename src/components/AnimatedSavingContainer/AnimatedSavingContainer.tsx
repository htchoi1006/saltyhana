import React, { useState, useEffect } from "react";

interface AnimatedSavingContainerProps {
  dailyAmount: number;
  days: number;
}

export default function AnimatedSavingContainer(
  props: AnimatedSavingContainerProps,
) {
  const { dailyAmount, days } = props;

  const roundedDailyAmount = Math.round(dailyAmount);

  const [displayAmount, setDisplayAmount] = useState<number[]>([]);
  const [currentDays, setCurrentDays] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (roundedDailyAmount && days) {
      setIsAnimating(true);
      // 금액을 자릿수별로 분리
      const amountStr = roundedDailyAmount.toString();
      const initialDigits = new Array(amountStr.length).fill(0);
      setDisplayAmount(initialDigits);

      let currentDigitIndex = 0;
      let currentValue = [...initialDigits];
      const targetDigits = amountStr.split("").map(Number);
      let totalSteps = targetDigits.reduce((acc, curr) => acc + curr, 0);
      let currentStep = 0;

      const interval = setInterval(() => {
        if (currentDigitIndex < targetDigits.length) {
          if (
            currentValue[currentDigitIndex] < targetDigits[currentDigitIndex]
          ) {
            currentValue[currentDigitIndex]++;
            currentStep++;
            setDisplayAmount([...currentValue]);

            // 현재 진행률에 따라 날짜 계산
            const progress = currentStep / totalSteps;
            setCurrentDays(Math.round(progress * days));
          } else {
            currentDigitIndex++;
          }
        } else {
          setIsAnimating(false);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [roundedDailyAmount, days]);

  const formatAmount = (digits: number[]) => {
    if (digits.length === 0) return "0";
    const numStr = digits.join("");
    return new Intl.NumberFormat("ko-KR").format(parseInt(numStr));
  };

  const getFormattedAmount = () => {
    if (!isAnimating) {
      return roundedDailyAmount.toLocaleString();
    }
    return formatAmount(displayAmount);
  };

  if (!roundedDailyAmount || !days) return null;

  return (
    <span style={{ fontSize: "20px" }}>
      하루에{" "}
      <span
        className="font-semibold text-teal-600"
        style={{ color: "#008485", fontWeight: "700", fontSize: "25px" }}
      >
        {getFormattedAmount()}원
      </span>
      씩{" "}
      <span
        className="font-semibold text-teal-600"
        style={{ color: "#008485", fontWeight: "700", fontSize: "25px" }}
      >
        {isAnimating ? currentDays : days}일
      </span>{" "}
      동안 저축을 도와드릴게요!
    </span>
  );
}
