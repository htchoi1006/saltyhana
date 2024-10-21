import React from "react";
import { Link } from "react-router-dom";

const TestPage: React.FC = () => {
  return (
    <div>
      테스트 페이지입니다.
      <Link to={"/test/consumption"}>테스트 시작하기</Link>
    </div>
  );
};

export default TestPage;
