import styled from "styled-components";
import Slider from "react-slick";

// 기존 코드 수정 없이 StyledSlider를 사용하도록 변경합니다.
import React from "react";
import { Link } from "react-router-dom";

import {
  BodyWrapper,
  InnerBodyWrapper,
  PageTitle,
  PageDescription,
  TestCard,
  CustomList,
  TestCardHeader,
  TestCardLeftDiv,
  TestCardRightDiv,
  TestCardDescription,
  TestCardButton,
  TestCardHeaderIcon,
  ArrowButtonWrapper,
  ArrowIcon,
} from "./styles";

import rightClick from "../../images/recommend_right.png";
import leftClick from "../../images/recommend_left.png";

import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";
import card5 from "../../images/card_5.png";
import card6 from "../../images/card_6.png";

import ProductCard from "../../components/ProductCard/ProductCard";
import ConsumeTestImage from "../../images/ConsumeTestImage.png";
import ConsumeTestIcon from "../../images/ConsumeTestIcon.png";
import { ProductType } from "../../type";

const StyledSlider = styled(Slider)`
  height: 250px;

  .slick-slide {
    padding-right: 50px; /* 슬라이드 간격을 오른쪽에 20px 추가 */
  }

  // .slick-prev, .slick-next {
  //   opacity: 1; /* 기본 버튼을 안 보이게 설정 */
  //   pointer-events: none; /* 클릭할 수 없도록 설정 */
  // }

  .slick-prev,
  .slick-next {
    display: none; /* 기본 버튼을 숨김 */
  }
`;
const RecommendPage: React.FC = () => {
  const productList: ProductType[] = [
    {
      title: "369 정기예금",
      subtitle: "3개월마다 중도해지 혜택",
      color: "#E6F8E0",
      image: card1,
      description: "연 4.50% ~ 6.00%",
    },
    {
      title: "트래블로그 여행 적금",
      subtitle: "여행 준비의 시작",
      color: "#f2f2f2",
      image: card2,
      description: "연 2.40% ~ 4.40%",
    },
    {
      title: "하나 청년도약 계좌",
      subtitle: "하나와 함께 도약",
      image: card3,
      color: "#FFF2E4",
      description: "연(세전, 5년)\n4.50% ~ 6.00%",
    },
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
      color: "#EAF1FA",
      image: card6,
      description: "연 2.20% ~ 3.50%",
    },
  ];

  // 커스텀 화살표 컴포넌트
  const CustomPrevArrow: React.FC<any> = (props) => (
    <ArrowButtonWrapper {...props} isPrev={true}>
      <ArrowIcon src={leftClick} alt="이전" />
    </ArrowButtonWrapper>
  );

  const CustomNextArrow: React.FC<any> = (props) => (
    <ArrowButtonWrapper {...props} isPrev={false}>
      <ArrowIcon src={rightClick} alt="다음" />
    </ArrowButtonWrapper>
  );

  // Slider 설정
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <BodyWrapper>
      <PageTitle>
        <span>맞춤형 상품 추천</span>
      </PageTitle>
      <PageDescription>
        <span>목표와 소비성향에 따른 맞춤 상품을 추천 받아보세요.</span>
      </PageDescription>

      <InnerBodyWrapper>
        {/* StyledSlider 적용 */}
        <StyledSlider {...settings}>
          {productList.map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </StyledSlider>

        <CustomList>
          <TestCard>
            <TestCardLeftDiv>
              <TestCardHeader>
                <span>소비성향 TEST</span>
                <TestCardHeaderIcon src={ConsumeTestIcon} />
              </TestCardHeader>
              <TestCardDescription>
                <p>내 유형은 뭘까?</p>
                <p>테스트하고 내 성향에 맞는 투자 상품 추천 받자!</p>
              </TestCardDescription>
              <Link
                to="/teststart"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <TestCardButton>
                  <span>테스트 하러 가기</span>
                </TestCardButton>
              </Link>
            </TestCardLeftDiv>
            <TestCardRightDiv src={ConsumeTestImage} />
          </TestCard>
        </CustomList>
      </InnerBodyWrapper>
    </BodyWrapper>
  );
};

export default RecommendPage;
