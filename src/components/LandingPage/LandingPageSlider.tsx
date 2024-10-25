import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as styled from "./styles";
import { useNavigate } from "react-router-dom";

import Carousel1 from "../../pages/LandingPage/Carousel1";
import Carousel2 from "../../pages/LandingPage/Carousel2";

const LandingSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생 설정
    autoplaySpeed: 3000, // 3초마다 전환
    pauseOnHover: false, // 마우스를 올려도 멈추지 않도록 설정
  };

  return (
    <styled.Container>
      <Slider {...settings}>
        <Carousel1 />
        <Carousel2 />
      </Slider>
    </styled.Container>
  );
};

export default LandingSlider;
