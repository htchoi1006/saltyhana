import React from "react";
import { Link } from "react-router-dom";

const RecommendPage: React.FC = () => {
  return (
    <div>
      상품추천 페이지입니다.
      <Link to="/test/consumption">테스트 하러 가기</Link>
    </div>
  );
};

export default RecommendPage;
