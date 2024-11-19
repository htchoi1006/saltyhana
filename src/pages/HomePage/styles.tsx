import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 42px 42px 40px;
  display: flex;
  flex-direction: column;
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px; // 하단 도트 네비게이션을 위한 여백
`;

export const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  border-radius: 35px;
  box-shadow: 4px 4px 14px 1px rgba(0, 0, 0, 0.25);
  height: 250px;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Carousel item styling */
  .carousel-item {
    flex: 0 0 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    padding: 0 1px; // 아이템 간 간격 조정
  }
`;

export const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
`;

export const Dot = styled.button<{ active: boolean }>`
  width: ${({ active }) => (active ? "24px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#008485" : "#CCCCCC")};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#008485" : "#999999")};
  }
`;
