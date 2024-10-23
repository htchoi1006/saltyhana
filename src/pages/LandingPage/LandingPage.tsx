import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles";
import Header from "../../layouts/LandingPageLayout/header";
import hand from "../../images/꿈돌이손.png";
import beer from "../../images/beer.png";
import car from "../../images/car.png";
import carrier from "../../images/carrier.png";
import cart from "../../images/cart.png";
import clothes from "../../images/clothes.png";
import gift from "../../images/gift.png";
import house from "../../images/house.png";
import meet from "../../images/meet.png";
import money from "../../images/money.png";
import flag from "../../images/flag.png";
import thumb from "../../images/thumb.png";
import trophy from "../../images/trophy.png";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  //라우팅은 이렇게 하시면 돼요
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const boxes = Array(9).fill(null);
  const images = [beer, car, carrier, cart, clothes, gift, house, meet, money];

  return (
    <>
      <Header />
      <styled.Con>
        {/* Landing 1 */}

        <styled.Container1>
          <div>
            <div>
              <styled.StyledMainText>자산을 하나로</styled.StyledMainText>
              <styled.SubText>
                오늘도 부자될 생각만 하셨나요?
                <br /> 당신의 자산을 하나로 관리하세요.
              </styled.SubText>
              <styled.Con1Button onClick={handleLoginClick}>
                시작하기
              </styled.Con1Button>
            </div>
            <div>
              <styled.Img src={hand} />
            </div>
          </div>
        </styled.Container1>
        {/* Landing 2 */}
        <styled.Container2>
          <div>
            <div>
              <styled.Con2MainText>
                매일매일
                <br />
                목표로
                <br /> 차근차근
              </styled.Con2MainText>
              <div>
                <styled.Con2SubText>
                  목표를 내가 등록할 수 있어요. <br />
                  금액은 자유롭게 선택할 수 있어요.
                </styled.Con2SubText>
              </div>
            </div>

            <styled.Con2DivforBox>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)", // 3열로 설정
                  gap: "30px", // 박스 간격
                }}
              >
                {images.map((imgSrc, index) => (
                  <styled.Box key={index}>
                    <styled.Con2DivforImage
                      src={imgSrc}
                      alt={`아이템 ${index + 1}`}
                    />
                  </styled.Box>
                ))}
              </div>
            </styled.Con2DivforBox>
          </div>
        </styled.Container2>
        {/* Landing 3 */}
        <styled.Container3>
          <div>
            <styled.Con3SubText>꾸준히 도전하고 성취감까지!</styled.Con3SubText>
          </div>

          <styled.Con3StyleDiv>
            <styled.Con3StyleDiv1>
              <span>
                함께 도전하고 목표를 이루어 성취감까지&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              </span>
              <styled.Con3Img1 src={thumb} />
              <span>즐거운 도전&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <styled.Con3Img2 src={trophy} />
              <span>함께</span>
            </styled.Con3StyleDiv1>

            <styled.Con3StyleDiv2>
              <styled.Con3Img3 src={thumb} />
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;즐거운 도전&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <styled.Con3Img4 src={trophy} />
              <span>함께 도전하고 목표를 이루어 성취감까지</span>
              <styled.Con3Img5 src={flag} />
            </styled.Con3StyleDiv2>
          </styled.Con3StyleDiv>
        </styled.Container3>
      </styled.Con>
    </>
  );
};

export default LandingPage;
