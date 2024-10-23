import React from "react";
import { Link } from "react-router-dom";

const ResultPage: React.FC = () => {
  //라우팅은 이렇게 하시면 돼요

  return (
    <div>
      성향추천 결과창 페이지입니다.
      {/* 다시하기 */}
      <Link to={"/test/consumption"}>다시하기</Link>
      {/* 목록으로 */}
      <Link to={"/home"}>목록으로</Link>
    </div>
  );
};

export default ResultPage;
