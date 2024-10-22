import React from "react";
import * as styled from "./styles";

const TeststartPage: React.FC = () => {
  return (
    <>
      <styled.Logo>자산을 하나로</styled.Logo>

      <styled.Container>
        <h1>내 소비 성향 찾기</h1>
        <p>내 소비 성향을 찾고 맞춤형 금융 상품을 찾을 수 있어요</p>
      </styled.Container>

      <styled.Element1>
        <p>8개 질문으로 간단하게!</p>
      </styled.Element1>

      <styled.Element2>
        <p>소비 성향을 분석!</p>
      </styled.Element2>

      <styled.Element3>
        <p>맞춤형 금융 상품 추천까지!</p>
      </styled.Element3>

      <styled.Button>
        <p>시작하기</p>
      </styled.Button>
    </>
  );
};

export default TeststartPage;
