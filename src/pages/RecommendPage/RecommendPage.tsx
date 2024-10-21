import React from "react";
import { useNavigate } from "react-router-dom";

const RecommendPage: React.FC = () => {
  const navigate = useNavigate();

  //라우팅은 이렇게 하시면 돼요
  const handleTestClick = () => {
    navigate("/test");
  };

  return (
    <div>
      상품추천 페이지입니다.
      <button onClick={handleTestClick}></button>
    </div>
  );
};

export default RecommendPage;
