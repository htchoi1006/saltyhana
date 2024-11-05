export type ProductType = {
  title: string;
  subtitle: string;
  image?: string;
  color?: string;
  opacity?: number; // opacity를 선택적 속성으로 추가
  description: string;
};

export type WeekDayType = {
  date: Date;
  isAchieve: boolean;
};
