import React, { useState } from "react";
import { PageContainer } from "./styles";
import WeekdayCalendar from "../../components/WeekdayCalendar/WeekdayCalendar";
import GoalContainer from "../../components/GoalContainer/GoalContainer";
import ProductList from "../RecommendPage/ProductList";
import {
  CarouselContainer,
  CarouselWrapper,
  NavigationDots,
  Dot,
} from "./styles";
import dayjs from "dayjs";
import _ from "underscore";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dateCount = 12;

  const goals = [
    {
      goal: "파리 여행",
      startdate: "2024.11.01",
      enddate: "2024.11.28",
      progress: 70,
      totalmoney: 1500000,
      currentmoney: 1050000,
    },
    {
      goal: null,
      startdate: "",
      enddate: "",
      progress: 0,
      totalmoney: 0,
      currentmoney: 0,
    },

    {
      goal: "맥북 구매",
      startdate: "2024.11.08",
      enddate: "2024.12.05",
      progress: 40,
      totalmoney: 3000000,
      currentmoney: 1200000,
    },

    {
      goal: "내 집 마련",
      startdate: "2024.09.01",
      enddate: "2026.08.31",
      progress: 10,
      totalmoney: 200000000,
      currentmoney: 20000000,
    },
  ];

  const generateRandomDates = () => {
    console.log(dateCount);
    const today = dayjs();
    return _.range(dateCount)
      .map((v) => {
        const date = today.subtract(v, "d").toDate();
        return {
          date,
          isAchieve: Math.random() > 0.5, // 랜덤 생성
        };
      })
      .reverse();
  };

  const goalsWithDates = goals.map((goal) => ({
    ...goal,
    dates: generateRandomDates(),
  }));

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.offsetWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setCurrentIndex(newIndex);
  };

  return (
    <PageContainer>
      <CarouselContainer>
        <CarouselWrapper className="carousel-container" onScroll={handleScroll}>
          {goalsWithDates.map((goalData, index) => (
            <div key={index} className="carousel-item">
              <GoalContainer {...goalData} />
            </div>
          ))}
        </CarouselWrapper>
        <NavigationDots>
          {goals.map((_, index) => (
            <Dot
              key={index}
              active={currentIndex === index}
              onClick={() => {
                const container = document.querySelector(".carousel-container");
                if (container) {
                  container.scrollTo({
                    left: index * container.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
            />
          ))}
        </NavigationDots>
      </CarouselContainer>
      <WeekdayCalendar dates={goalsWithDates[currentIndex].dates} />
      <ProductList />
    </PageContainer>
  );
}
