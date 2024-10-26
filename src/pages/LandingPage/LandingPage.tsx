import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  SectionWrapper,
  CenterFlexBox,
  Stack,
  StyledMainText,
  SubText,
  Con1Link,
  Con3StyleDiv,
  Con3SubText,
  Con3Img,
} from "./styles";
import { CenterFlexContainer } from "../ConnectingAccoutPage/styles";
import LandingPageSlider from "../../components/LandingPage/LandingPageSlider";
import hand from "../../images/꿈돌이손.png";
import flag from "../../images/flag.png";
import thumb from "../../images/thumb.png";
import trophy from "../../images/trophy.png";

const LandingPage: React.FC = () => {
  const settings = {
    dots: false,
    draggable: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    variableWidth: true,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <Container>
      <SectionWrapper>
        <div
          style={{
            width: "inherit",
            height: "100%",
            display: "flex",
            flexWrap: "wrap-reverse",
          }}
        >
          <div style={{ flex: 1 }}>
            <CenterFlexBox>
              <Stack>
                <StyledMainText>자산을 하나로</StyledMainText>
                <SubText>
                  오늘도 부자될 생각만 하셨나요?
                  <br /> 당신의 자산을 하나로 관리하세요.
                </SubText>
                <Con1Link to="/login">시작하기</Con1Link>
              </Stack>
            </CenterFlexBox>
          </div>
          <div style={{ flex: 1 }}>
            <CenterFlexBox>
              <div>
                <img src={hand} />
              </div>
            </CenterFlexBox>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper>
        <LandingPageSlider />
      </SectionWrapper>
      <SectionWrapper>
        <CenterFlexContainer style={{ width: "100%", height: "50%" }}>
          <Con3SubText>꾸준히 도전하고 성취감까지!</Con3SubText>
        </CenterFlexContainer>
        <Con3StyleDiv>
          <div>
            <Slider {...settings}>
              <span>함께 </span>
              <span>도전하고 </span>
              <span>목표를 </span>
              <span>이루어 </span>
              <span>성취감까지 </span>
              <span>
                <Con3Img src={thumb} />
              </span>
              <span>즐거운</span>
              <span>도전</span>
              <span>
                <Con3Img src={trophy} />
              </span>
              <span>함께 </span>
              <span>도전하고 </span>
              <span>목표를 </span>
              <span>이루어 </span>
              <span>성취감까지 </span>
              <span>
                <Con3Img src={thumb} />
              </span>
              <span>즐거운</span>
              <span>도전</span>
              <span>
                <Con3Img src={trophy} />
              </span>
            </Slider>
          </div>
          <div>
            <Slider {...settings}>
              <span>
                <Con3Img src={thumb} />
              </span>
              <span>즐거운</span>
              <span>도전</span>
              <span>
                <Con3Img src={trophy} />
              </span>
              <span>도전하고 </span>
              <span>목표를 </span>
              <span>이루어 </span>
              <span>성취감까지 </span>
              <span>
                <Con3Img src={thumb} />
              </span>
              <span>즐거운</span>
              <span>도전</span>
              <span>
                <Con3Img src={trophy} />
              </span>
              <span>도전하고 </span>
              <span>목표를 </span>
              <span>이루어 </span>
              <span>성취감까지 </span>
            </Slider>
          </div>
        </Con3StyleDiv>
      </SectionWrapper>
    </Container>
  );
};

export default LandingPage;
