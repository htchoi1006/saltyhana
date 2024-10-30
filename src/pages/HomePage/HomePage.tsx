import React from "react";

import * as styled from "../RecommendPage/styles";
import { GoalProgressContainer, PageContainer } from "./styles";
import { ProductType } from "../../type";
import ProductCard from "../../components/ProductCard/ProductCard";
import WeekdayCalendar from "../../components/WeekdayCalendar/WeekdayCalendar";
import card4 from "../../images/card_4.png";
import card5 from "../../images/card_5.png";
import card6 from "../../images/card_6.png";

// HomePage 컴포넌트: 홈, 대시보드 페이지를 렌더링하는 함수형 컴포넌트
const HomePage: React.FC = () => {
  const productList: ProductType[] = [
    {
      title: "추가 상품 1",
      subtitle: "설명",
      color: "#F8E6E6",
      image: card4,
      description: "연 3.50% ~ 5.00%",
    },
    {
      title: "추가 상품 2",
      subtitle: "설명",
      color: "#E6F8F1",
      image: card5,
      description: "연 2.20% ~ 3.50%",
    },
    {
      title: "추가 상품 3",
      subtitle: "설명",
      color: "#E6F8F1",
      image: card6,
      description: "연 2.20% ~ 3.50%",
    },
  ];

  return (
    <PageContainer>
      {/* 목표, 진행도 박스 레이아웃  */}
      <GoalProgressContainer
        goal={"여행"}
        startdate={"2024.10.01"}
        enddate={"2024.12.23"}
        progress={80}
      />
      {/* 주간 캘린더 레이아웃 */}
      <WeekdayCalendar
        dates={[
          { isAchieve: true, date: new Date("2024-10-17") },
          { isAchieve: true, date: new Date("2024-10-18") },
          { isAchieve: true, date: new Date("2024-10-19") },
          { isAchieve: true, date: new Date("2024-10-20") },
          { isAchieve: true, date: new Date("2024-10-21") },
          { isAchieve: true, date: new Date("2024-10-22") },
          { isAchieve: true, date: new Date("2024-10-23") },
          { isAchieve: false, date: new Date("2024-10-24") },
          { isAchieve: true, date: new Date("2024-10-25") },
          { isAchieve: false, date: new Date("2024-10-26") },
          { isAchieve: true, date: new Date("2024-10-27") },
          { isAchieve: false, date: new Date("2024-10-28") },
          { isAchieve: false, date: new Date("2024-10-29") },
          { isAchieve: true, date: new Date("2024-10-30") },
          { isAchieve: true, date: new Date("2024-10-31") },
        ]}
      />
      {/* 상품 리스트가 표시되는 섹션 */}
      <styled.ProductList>
        {productList.map((v, i) => (
          <ProductCard key={i} product={v} />
        ))}
      </styled.ProductList>
    </PageContainer>
  );
};

export default HomePage;
