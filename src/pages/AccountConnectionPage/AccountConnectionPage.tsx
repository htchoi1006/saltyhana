import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styled from "./styles";
import check from "../../images/check.png";
import { Container } from "lucide-react";

const AccountConnectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    // 1초마다 카운트다운
    const countInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // 3초 후 로그인 페이지로 자동 이동
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    // 컴포넌트 언마운트 시 타이머들 정리
    return () => {
      clearInterval(countInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <styled.Container>
      <div>
        <styled.Img src={check} />
      </div>
      <div>
        <styled.MainText>계좌 연결이 완료되었어요</styled.MainText>
        <styled.SubText>
          {count}초 뒤에 로그인 페이지로 자동 이동됩니다
        </styled.SubText>
      </div>
    </styled.Container>
  );
};

export default AccountConnectionPage;
