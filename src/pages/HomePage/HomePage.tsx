import React, { useState, useEffect } from "react";
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
import { ProductType, WeekDayType } from "../../type";

interface DashBoardResponseDTO {
  goal: {
    id: number;
    userName: string;
    title: string;
    goalPeriod: string;
    iconImage: string;
    customImage: string;
    currentMoney: number;
    totalMoney: number;
    percentage: number;
  } | null;
  weekdayCalendar: {
    weekday: {
      date: string;
      isAchieve: boolean;
    }[];
  } | null;
  bestProductList:
    | {
        id: number;
        title: string;
        type: string;
        subtitle: string;
        imageUrl: string;
        description: string;
      }[]
    | null;
}

export default function HomePage() {
  const [dashBoardData, setDashBoardData] = useState<DashBoardResponseDTO[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/home", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            accept: "*/*",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data: DashBoardResponseDTO[] = await response.json();
        setDashBoardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (dashBoardData.length === 0) {
    return <div>Loading...</div>;
  }

  const weekDays: WeekDayType[] =
    dashBoardData[currentIndex]?.weekdayCalendar?.weekday?.map((day) => ({
      date: new Date(day.date),
      isAchieve: day.isAchieve,
    })) || [];

  const products: ProductType[] =
    dashBoardData[currentIndex]?.bestProductList?.map((product) => ({
      title: product.title,
      subtitle: product.subtitle,
      image: product.imageUrl,
      description: product.description,
      color: "#FFFFFF",
    })) || [];
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
          {dashBoardData.map((data, index) => (
            <div className="carousel-item" key={data?.goal?.id || index}>
              <GoalContainer
                goal={data?.goal?.title || null}
                goalPeriod={data?.goal?.goalPeriod || null}
                iconImage={data?.goal?.iconImage || undefined}
                customImage={data?.goal?.customImage || undefined}
                percentage={data?.goal?.percentage || 0}
                totalMoney={data?.goal?.totalMoney || 0}
                currentMoney={data?.goal?.currentMoney || 0}
                userName={data?.goal?.userName || null}
              />
            </div>
          ))}
        </CarouselWrapper>
        <NavigationDots>
          {dashBoardData.map((_, index) => (
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
                  setCurrentIndex(index);
                }
              }}
            />
          ))}
        </NavigationDots>
      </CarouselContainer>
      {weekDays && weekDays.length > 0 && <WeekdayCalendar dates={weekDays} />}
      <ProductList products={products} />
    </PageContainer>
  );
}
