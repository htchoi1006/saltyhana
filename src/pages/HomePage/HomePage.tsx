import React, { useState, useEffect } from "react";
import { PageContainer } from "./styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
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
import GoalAchieveCheck from "../../components/Modals/GoalAchieveCheck";

export interface Goal {
  id: number;
  name: string;
  iconUrl: string;
  category: string;
  amount: number;
  startAt: string;
  endAt: string;
  achieved: boolean;
}

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
    ended: boolean;
  } | null;
  weekdayCalendar: {
    weekday: {
      date: string;
      isAchieve: boolean;
    }[];
  };
  bestProductList:
    | {
        id: number;
        title: string;
        type: string;
        subtitle: string;
        imageUrl: string;
        description: string;
        productLink: string;
      }[]
    | null;
}

export default function HomePage() {
  const [dashBoardData, setDashBoardData] = useState<DashBoardResponseDTO[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endedGoals, setEndedGoals] = useState<Goal[]>([]);
  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/home`, {
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

    const fetchEndedGoals = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/goals/end`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              accept: "*/*",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch accounts");
        }

        const data: Goal[] = await response.json();
        setEndedGoals(data);
        setCurrentModalIndex(0); // 다음 목표 달성 확인 모달
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchDashboardData();
    fetchEndedGoals();
  }, []);

  if (dashBoardData.length === 0) {
    return <LoadingSpinner />;
  }

  const activeGoals = dashBoardData.filter(
    (data) => data.goal && !data.goal.ended,
  );

  const weekDays: WeekDayType[] = activeGoals[currentIndex]?.weekdayCalendar
    ?.weekday
    ? activeGoals[currentIndex]?.weekdayCalendar?.weekday.map((day) => ({
        date: new Date(day.date),
        isAchieve: day.isAchieve,
      }))
    : Array(11)
        .fill(null)
        .map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (10 - index));
          return {
            date,
            isAchieve: false,
          };
        });

  const products: ProductType[] =
    dashBoardData[currentIndex]?.bestProductList?.map((product) => ({
      title: product.title,
      subtitle: product.subtitle,
      image: product.imageUrl,
      description: product.description,
      productLink: product.productLink,
      color: "#FFFFFF",
    })) || [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.offsetWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setCurrentIndex(newIndex);
  };

  const handleCloseModal = () => {
    if (currentModalIndex !== null) {
      if (currentModalIndex < endedGoals.length - 1) {
        setCurrentModalIndex(currentModalIndex + 1); // 다음 목표 달성 확인 모달
      } else {
        setCurrentModalIndex(null); // 모든 목표 달성 확인 모달 닫기
      }
    }
  };

  return (
    <PageContainer>
      <CarouselContainer>
        <CarouselWrapper className="carousel-container" onScroll={handleScroll}>
          {activeGoals.map((data, index) => (
            <div className="carousel-item" key={data.goal?.id || index}>
              <GoalContainer
                goal={data.goal?.title || null}
                goalPeriod={data.goal?.goalPeriod || null}
                iconImage={data.goal?.iconImage || undefined}
                customImage={data.goal?.customImage || undefined}
                percentage={data.goal?.percentage || 0}
                totalMoney={data.goal?.totalMoney || 0}
                currentMoney={data.goal?.currentMoney || 0}
                userName={data.goal?.userName || null}
                ended={data.goal?.ended}
              />
            </div>
          ))}
        </CarouselWrapper>

        <NavigationDots>
          {activeGoals.map((_, index) => (
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

      <WeekdayCalendar dates={weekDays} />
      <ProductList products={products} />
      {currentModalIndex !== null && (
        <GoalAchieveCheck
          goal={endedGoals[currentModalIndex]}
          onClose={handleCloseModal}
        />
      )}
    </PageContainer>
  );
}
