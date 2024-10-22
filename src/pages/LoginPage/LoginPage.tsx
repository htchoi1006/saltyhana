import React, { useRef } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ImgWrapper,
  Paper,
  FormWrapper,
  Form,
  StyledLink,
  ButtonsWrapper,
} from "./styles";
import AuthInput from "../../components/AuthInput";

export default function LoginPage() {
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Container>
      <FormWrapper>
        <Paper>
          <h2>쉽게 들이는 저축 습관</h2>
          <h1>자산을 하나로</h1>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(idInputRef.current?.value);
              console.log(passwordInputRef.current?.value);
            }}
          >
            <AuthInput
              labelName="아이디"
              placeholder="아이디를 입력해주세요."
              name="id"
              startIcon={<span>123</span>}
              ref={idInputRef}
            />
            <AuthInput
              labelName="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              type="password"
              startIcon={<span>123</span>}
              ref={passwordInputRef}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "5px 0",
              }}
            >
              <StyledLink to="/">비밀번호를 잊어버리셨나요?</StyledLink>
            </div>
            <ButtonsWrapper>
              <button type="submit">로그인</button>
              <Link to="/signup">회원가입</Link>
            </ButtonsWrapper>
          </Form>
        </Paper>
      </FormWrapper>
      <ImgWrapper>
        <img
          src="/Group 481529.png"
          style={{ maxWidth: "50vw", maxHeight: "100vh" }}
        />
      </ImgWrapper>
    </Container>
  );
}
