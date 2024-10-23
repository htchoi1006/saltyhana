import React from "react";
import * as styled from "./styles";
import hanalogo from "../../images/hanabank_logo.png";
import { Link } from "react-router-dom";
import img from "../../images/TestresultImg1.png";
import { Redo } from "lucide-react";

const TestresultPage1: React.FC = () => {
  const onClick = () => {};
  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "12px",
          marginLeft: "12px",
        }}
      >
        <styled.HanaLogo src={hanalogo} />
        <styled.Logo>자산을 하나로</styled.Logo>
      </header>
      <styled.BackGround></styled.BackGround>
      <styled.YourType>
        <div>
          <h3>당신의 소비 유형은</h3>
          <h1>오늘만 산다</h1>
        </div>
        <styled.ResultImg src={img}></styled.ResultImg>
        <styled.YourTypeTag1>
          <h3>#YOLO</h3>
          <p>
            당장 사고 싶은 것을 바로 사야 만족하는 욜로족입니다.
            <br /> 자산을 모으긴 어려워 보입니다.
          </p>
        </styled.YourTypeTag1>
        <styled.YourTypeTag2>
          <h3>_ _ _P</h3>
        </styled.YourTypeTag2>
        <Link to="/teststart">
          <styled.Retry>
            <p>다시하기</p>
          </styled.Retry>
        </Link>
        <Link to="/home">
          <styled.ToMain>
            <p>메인으로</p>
          </styled.ToMain>
        </Link>
      </styled.YourType>
    </>
  );
};

export default TestresultPage1;
