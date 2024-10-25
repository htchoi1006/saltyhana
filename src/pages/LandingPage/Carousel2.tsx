import React from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles";
import img1 from "../../images/TeststartImg1.png";
import img2 from "../../images/TeststartImg2.png";
import img3 from "../../images/TeststartImg3.png";
const Carousel2: React.FC = () => {
  const navigate = useNavigate();

  //라우팅은 이렇게 하시면 돼요
  const handleTestStartClick = () => {
    navigate("/teststart");
  };

  return (
    <styled.Container22>
      <div>
        <div>
          <styled.Con2MainText>
            나만의
            <br />
            소비성향
            <br /> 찾아보기
          </styled.Con2MainText>
        </div>
        <div>
          <styled.Con22SubText>
            소비 성향을 분석하고
            <br /> 내가 어떤 타입에 속하는지 확인해보세요.
            <br />
            나에게는 어떤 금융 상품이 적합할까요?
          </styled.Con22SubText>
        </div>
      </div>
      <styled.Con22Box>
        <styled.Con22h1>내 소비 성향 찾기</styled.Con22h1>
        <styled.Con22p>
          내 소비 성향을 찾고 맞춤형 금융 상품을 찾을 수 있어요
        </styled.Con22p>

        <styled.Element1>
          <styled.ElementImg src={img1} />
          <p>8개 질문으로 간단하게!</p>
        </styled.Element1>

        <styled.Element2>
          <styled.ElementImg src={img2} />
          <styled.Con22p2>소비 성향을 분석!</styled.Con22p2>
        </styled.Element2>

        <styled.Element3>
          <styled.ElementImg src={img3} />
          <p>맞춤형 금융 상품 추천까지!</p>
        </styled.Element3>

        <styled.Con22Button onClick={handleTestStartClick}>
          시작하기
        </styled.Con22Button>
      </styled.Con22Box>
    </styled.Container22>
  );
};

export default Carousel2;
