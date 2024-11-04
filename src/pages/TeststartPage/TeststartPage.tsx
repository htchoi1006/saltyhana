import React from "react";
import {
  Container,
  TextWrapper,
  Header,
  HeaderDescription,
  Element,
  ElementDescription,
  ElementDiv,
  ElementImage,
  ButtonWrapper,
  ElementWrapper,
} from "./styles";
import img1 from "../../images/icon_teststart2.png";
import img2 from "../../images/icon_teststart3.png";
import img3 from "../../images/icon_teststart1.png";
import { Link } from "react-router-dom";

const TeststartPage: React.FC = () => {
  return (
    <Container>
      <TextWrapper>
        <Header>
          <span>내 소비 성향 찾기</span>
        </Header>
        <HeaderDescription>
          <span>소비 성향 테스트하고 맞춤형 금융 상품을 찾을 수 있어요.</span>
        </HeaderDescription>
      </TextWrapper>

      <ElementWrapper>
        <ElementDiv>
          <Element delay={0.6}>
            <ElementImage src={img1} />
            <ElementDescription>8개 질문으로 간단하게!</ElementDescription>
          </Element>
          <Element delay={0.7}>
            <ElementImage src={img2} />
            <ElementDescription>소비 성향을 분석!</ElementDescription>
          </Element>
          <Element delay={0.9}>
            <ElementImage src={img3} />
            <ElementDescription>맞춤형 금융 상품 추천까지!</ElementDescription>
          </Element>
        </ElementDiv>
      </ElementWrapper>
      <Link to="/test/consumption" style={{ textDecoration: "none" }}>
        <ButtonWrapper delay={1.2}>시작하기</ButtonWrapper>
      </Link>
    </Container>
  );
};

export default TeststartPage;
