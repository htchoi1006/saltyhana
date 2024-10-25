import React from "react";

import { useNavigate } from "react-router-dom";
import * as styled from "./styles";

import beer from "../../images/beer.png";
import car from "../../images/car.png";
import carrier from "../../images/carrier.png";
import cart from "../../images/cart.png";
import clothes from "../../images/clothes.png";
import gift from "../../images/gift.png";
import house from "../../images/house.png";
import meet from "../../images/meet.png";
import money from "../../images/money.png";

const Carousel1: React.FC = () => {
  const images = [beer, car, carrier, cart, clothes, gift, house, meet, money];
  console.log("Carousel1 rendered");
  return (
    <styled.Container2>
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
    </styled.Container2>
  );
};

export default Carousel1;
