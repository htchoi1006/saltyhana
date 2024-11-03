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

        {/* ProductList 컴포넌트 사용 */}
        <ProductList />

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
