import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./ProductList";

import ConsumeTestImage from "../../images/ConsumeTestImage.png";
import ConsumeTestIcon from "../../images/ConsumeTestIcon.png";

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
} from "./styles";

interface ProductData {
  type: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  description: string;
  name: string;
  tendency: string | null;
}

export default function RecommendPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //임시 생성
  // const productList = [
  // 	{
  // 		title: "369 정기예금",
  // 		subtitle: "3개월마다 중도해지 혜택",
  // 		color: "#E6F8E0",
  // 		image: ConsumeTestImage, // 이미지 경로를 실제 이미지로 변경하세요.
  // 		description: "연(세전, 1년)\n연 4.50% ~ 6.00%",
  // 	},
  // 	{
  // 		title: "트래블로그 여행 적금",
  // 		subtitle: "여행 준비의 시작",
  // 		color: "#f2f2f2",
  // 		image: ConsumeTestImage, // 이미지 경로를 실제 이미지로 변경하세요.
  // 		description: "연(세전, 1년)\n연 2.40% ~ 4.40%",
  // 	},
  // ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          "http://localhost:9090/api/products/recommend",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              accept: "*/*",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const formattedProducts = products.map((product) => ({
    title: product.title,
    subtitle: product.subTitle,
    description: product.description,
  }));

  return (
    <BodyWrapper>
      <InnerBodyWrapper>
        <TextWrapper>
          <PageTitle>
            <span>맞춤형 상품 추천</span>
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
