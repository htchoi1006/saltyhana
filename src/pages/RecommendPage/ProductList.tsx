import React, { useRef } from "react";
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

interface ProductListProps {
  products: ProductType[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const modalManagerRef = useRef<ModalManagerType>(null);

  const fixedStyles = [
    {
      color: "#E6F8E0",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_1.png",
    },
    {
      color: "#f2f2f2",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_2.png",
    },
    {
      color: "#FFF2E4",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_3.png",
    },
    {
      color: "#F8E6E6",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_4.png",
    },
    {
      color: "#E6F8F1",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_5.png",
    },
    {
      color: "#EAF1FA",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_6.png",
    },
    {
      color: "#FFEDFC",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_7.png",
    },
    {
      color: "#F6EDFF",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_8.png",
    },
    {
      color: "#FFF7ED",
      image:
        "https://saltyhana-image-bucket.s3.ap-northeast-2.amazonaws.com/icon/card_9.png",
    },
  ];

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
    draggable: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handleCardClick = (productLink: string) => {
    if (modalManagerRef.current) {
      modalManagerRef.current.openModal("상담선택", productLink); // 링크 전달
    }
  };

  return (
    <ProductListWrapper>
      <ModalManager ref={modalManagerRef} />
      <StyledSlider {...settings}>
        {products.map((product, index) => (
          // <div key={index} onClick={handleCardClick}>
          <div
            key={index}
            onClick={() => handleCardClick(product.productLink || "")}
          >
            <ProductCard
              product={product}
              color={fixedStyles[index]?.color}
              image={fixedStyles[index]?.image}
            />
          </div>
        ))}
      </StyledSlider>
    </ProductListWrapper>
  );
};

export default ProductList;
