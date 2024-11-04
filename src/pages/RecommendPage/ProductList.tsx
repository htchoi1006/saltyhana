import { useState, useRef } from "react";
import { ProductType } from "../../type";
import ProductCard from "../../components/ProductCard/ProductCard";
import ModalManager, {
  ModalManagerType,
} from "../../components/Modals/ModalManager";

import {
  ProductListWrapper,
  StyledSlider,
  CustomPrevArrow,
  CustomNextArrow,
} from "./cards_styles";

import card1 from "../../images/card_1.png";
import card2 from "../../images/card_2.png";
import card3 from "../../images/card_3.png";
import card4 from "../../images/card_4.png";
import card5 from "../../images/card_5.png";
import card6 from "../../images/card_6.png";

export default function ProductList() {
  const [productList] = useState<ProductType[]>([
    {
      title: "369 정기예금",
      subtitle: "3개월마다 중도해지 혜택",
      color: "#E6F8E0",
      image: card1,
      description: "연(세전, 1년)\n연 4.50% ~ 6.00%",
    },
    {
      title: "트래블로그 여행 적금",
      subtitle: "여행 준비의 시작",
      color: "#f2f2f2",
      image: card2,
      description: "연(세전, 1년)\n연 2.40% ~ 4.40%",
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
  ]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    initialSlide: 0,
    draggable: false, // 드래그 끝나면 모달이 켜져서 막아둠 버튼으로만 이동하게
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const modalManagerRef = useRef<ModalManagerType>(null);

  const handleCardClick = () => {
    if (modalManagerRef.current) {
      modalManagerRef.current.openModal("상담선택"); // 상담 선택 모달 열기
    }
  };

  return (
    <ProductListWrapper>
      <ModalManager ref={modalManagerRef} />
      <StyledSlider {...settings}>
        {productList.map((product, index) => (
          <div key={index} onClick={handleCardClick}>
            <ProductCard product={product} />
          </div>
        ))}
      </StyledSlider>
    </ProductListWrapper>
  );
}
