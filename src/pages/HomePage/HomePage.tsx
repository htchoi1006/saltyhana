import { PageContainer } from "./styles";
import WeekdayCalendar from "../../components/WeekdayCalendar/WeekdayCalendar";
import GoalContainer from "../../components/GoalContainer/GoalContainer";
import ProductList from "../RecommendPage/ProductList";

// HomePage 컴포넌트: 홈, 대시보드 페이지를 렌더링하는 함수형 컴포넌트
export default function HomePage() {
  return (
    <PageContainer>
      {/* 목표, 진행도 박스 레이아웃  */}
      <GoalContainer
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
      <ProductList />
    </PageContainer>
  );
}
