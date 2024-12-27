import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ConsumeTestImage from "../../images/ConsumeTestImage.png";
import ConsumeTestIcon from "../../images/ConsumeTestIcon.png";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Information from "../../images/information.png";

import {
  BodyWrapper,
  InnerBodyWrapper,
  PageTitle,
  PageDescription,
  TestCard,
  TestCardHeader,
  TestCardLeftDiv,
  TestCardRightDiv,
  TestCardDescription,
  TestCardButton,
  TestCardHeaderIcon,
  TestCardWrapper,
  TestCardImage,
  TextWrapper,
  InformationIcon,
  InfoIconWrapper,
  InfoTooltip,
} from "./styles";

interface ProductData {
  type: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  description: string;
  name: string;
  tendency: string | null;
  productList: string | null;
}

const fetchRecommendedProducts = async () => {
  try {
    const response = await fetch(
      `http://localhost:9090/api/products/recommend`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          accept: "*/*",
        },
      },
    );

    if (!response.ok) {
      throw new Error("추천 상품을 불러오는데 문제가 발생하였습니다.");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("추천 상품을 불러오는데 문제가 발생하였습니다.");
  }
};

export default function RecommendPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [recommendReason, setRecommendReason] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const recommendedProducts = await fetchRecommendedProducts();

        if (recommendedProducts) {
          setProducts(recommendedProducts);
          setRecommendReason(recommendedProducts[0].reason);
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const formattedProducts = products.map((product) => ({
    title: product.title,
    subtitle: product.subTitle,
    description: product.description,
    productLink: product.productList,
  }));

  return (
    <BodyWrapper>
      <InnerBodyWrapper>
        <TextWrapper>
          <PageTitle>
            <span>맞춤형 상품 추천</span>
            <InfoIconWrapper>
              <InformationIcon
                src={Information}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <InfoTooltip>
                  <p>
                    {recommendReason ||
                      "하나은행 인기 금융 상품을 누르고 상담을 받아보세요"}
                  </p>
                </InfoTooltip>
              )}
            </InfoIconWrapper>
          </PageTitle>
          <PageDescription>
            <span>목표와 소비성향에 따른 맞춤 상품을 추천 받아보세요.</span>
          </PageDescription>
        </TextWrapper>

        <ProductList products={formattedProducts} />

        <TestCardWrapper>
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
            <TestCardRightDiv>
              <TestCardImage src={ConsumeTestImage} />
            </TestCardRightDiv>
          </TestCard>
        </TestCardWrapper>
      </InnerBodyWrapper>
    </BodyWrapper>
  );
}
