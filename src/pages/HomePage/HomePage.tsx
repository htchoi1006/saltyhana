// import { PageContainer } from "./styles";
// import WeekdayCalendar from "../../components/WeekdayCalendar/WeekdayCalendar";
// import GoalContainer from "../../components/GoalContainer/GoalContainer";
// import ProductList from "../RecommendPage/ProductList";

// // HomePage 컴포넌트: 홈, 대시보드 페이지를 렌더링하는 함수형 컴포넌트
// export default function HomePage() {
// 	return (
// 		<PageContainer>
// 			{/* 목표, 진행도 박스 레이아웃  */}
// 			<GoalContainer
// 				goal={"여행"}
// 				startdate={"2024.10.01"}
// 				enddate={"2024.12.23"}
// 				progress={80}
// 			/>
// 			{/* 주간 캘린더 레이아웃 */}
// 			<WeekdayCalendar
// 				dates={[
// 					{ isAchieve: true, date: new Date("2024-10-17") },
// 					{ isAchieve: true, date: new Date("2024-10-18") },
// 					{ isAchieve: true, date: new Date("2024-10-19") },
// 					{ isAchieve: true, date: new Date("2024-10-20") },
// 					{ isAchieve: true, date: new Date("2024-10-21") },
// 					{ isAchieve: true, date: new Date("2024-10-22") },
// 					{ isAchieve: true, date: new Date("2024-10-23") },
// 					{ isAchieve: false, date: new Date("2024-10-24") },
// 					{ isAchieve: true, date: new Date("2024-10-25") },
// 					{ isAchieve: false, date: new Date("2024-10-26") },
// 					{ isAchieve: true, date: new Date("2024-10-27") },
// 					{ isAchieve: false, date: new Date("2024-10-28") },
// 					{ isAchieve: false, date: new Date("2024-10-29") },
// 					{ isAchieve: true, date: new Date("2024-10-30") },
// 					{ isAchieve: true, date: new Date("2024-10-31") },
// 				]}
// 			/>
// 			{/* 상품 리스트가 표시되는 섹션 */}
// 			<ProductList />
// 		</PageContainer>
// 	);
// }

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
      goal: "여행",
      startdate: "2024.10.01",
      enddate: "2024.12.23",
      progress: 60,
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
