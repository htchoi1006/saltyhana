import styled, { keyframes } from "styled-components";
import Slider from "react-slick";
import rightClick from "../../images/recommend_right.png";
import leftClick from "../../images/recommend_left.png";

const fadeIn = keyframes`
from {
    opacity: 0;
    transform: translateY(20px);
    }
to {
    opacity: 1;
    transform: translateY(0);
    }
`;

// 상품 리스트를 감싸는 Wrapper
export const ProductListWrapper = styled.div`
  width: 100%;
`;

// Slider와 커스텀 화살표 버튼 스타일 정의
export const StyledSlider = styled(Slider)`
  animation: ${fadeIn} 0.5s ease-out;

  .slick-list {
    overflow: hidden;
    text-align: center;
    height: 18vw;
  }

  .slick-arrow {
    display: flex;
    z-index: 10;
    width: 3vw;
    height: 3vw;
  }

  .slick-prev {
    left: -2vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }

  .slick-next {
    right: -2vw;
    cursor: pointer;
    &::before {
      content: "";
    }
  }

  > *:nth-child(1) {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.3s;
  }

  > *:nth-child(2) {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.6s;
  }

  > *:nth-child(3) {
    opacity: 0;
    animation: ${fadeIn} 1s ease-out forwards;
    animation-delay: 0.9s;
  }
`;

// 커스텀 화살표 컴포넌트
export const CustomPrevArrow = styled.div`
  display: block;
  background-image: url(${leftClick});
  background-size: cover;
  position: absolute;
  top: 35%;
  cursor: pointer;
`;

export const CustomNextArrow = styled.div`
  display: block;
  background-image: url(${rightClick});
  background-size: cover;
  position: absolute;
  top: 35%;
  cursor: pointer;
`;
