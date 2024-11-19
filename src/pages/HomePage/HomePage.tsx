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

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goals = [
    {
      goal: null,
      startdate: "",
      enddate: "",
      progress: 0,
    },
    {
      goal: "결혼 자금",
      startdate: "2024.11.01",
      enddate: "2025.11.30",
      progress: 26,
    },
    {
      goal: "내 집 마련",
      startdate: "2024.09.01",
      enddate: "2026.08.31",
      progress: 10,
    },
  ];

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
          {goals.map((goalData, index) => (
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

      <WeekdayCalendar />
      <ProductList />
    </PageContainer>
  );
}
