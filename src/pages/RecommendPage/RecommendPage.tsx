import { Link } from "react-router-dom";
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

export default function RecommendPage() {
  //임시 생성
  const productList = [
    {
      title: "369 정기예금",
      subtitle: "3개월마다 중도해지 혜택",
      color: "#E6F8E0",
      image: ConsumeTestImage, // 이미지 경로를 실제 이미지로 변경하세요.
      description: "연(세전, 1년)\n연 4.50% ~ 6.00%",
    },
    {
      title: "트래블로그 여행 적금",
      subtitle: "여행 준비의 시작",
      color: "#f2f2f2",
      image: ConsumeTestImage, // 이미지 경로를 실제 이미지로 변경하세요.
      description: "연(세전, 1년)\n연 2.40% ~ 4.40%",
    },
  ];

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

        {/* ProductList 컴포넌트에 products prop 전달 */}
        <ProductList products={productList} />

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
