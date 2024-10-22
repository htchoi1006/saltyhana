import React from "react";

import { Container, ImgWrapper, Paper } from "./styles";
import AuthInput from "../../components/AuthInput";

const LoginPage: React.FC = () => {
  return (
    <Container>
      <div>
        <Paper>
          <AuthInput
            labelName="아이디"
            placeholder="아이디를 입력해주세요."
            startIcon={<span>123</span>}
          />
          <AuthInput
            labelName="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            startIcon={<span>123</span>}
          />
        </Paper>
      </div>
      <ImgWrapper>
        <img
          src="/Group 481529.png"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </ImgWrapper>
    </Container>
  );
};

export default LoginPage;
