import { useRef } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  ImgWrapper,
  Paper,
  FormWrapper,
  InputsWrapper,
  StyledButton,
  FooterParagraph,
} from "../SignupPage/styles";
import { StyledLink } from "./styles";
import authImage from "../../images/AuthImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";
import LockPasswordIcon from "../../icons/lock-password-stroke-rounded.svg";
import AuthInput from "../../components/AuthInput";

export default function LoginPage() {
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Container>
      <FormWrapper>
        <Paper style={{ height: "560px" }}>
          <h2 style={{ marginTop: "40px" }}>쉽게 들이는 저축 습관</h2>
          <h1>자산을 하나로</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(idInputRef.current?.value);
              console.log(passwordInputRef.current?.value);
            }}
          >
            <InputsWrapper>
              <AuthInput
                labelName="아이디"
                placeholder="아이디를 입력해주세요."
                name="id"
                autoComplete="username"
                startIcon={<img src={EmailIcon} alt="email icon" />}
                ref={idInputRef}
              />
              <AuthInput
                labelName="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                type="password"
                autoComplete="password"
                startIcon={
                  <img src={LockPasswordIcon} alt="lock-password icon" />
                }
                ref={passwordInputRef}
              />
            </InputsWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "5px 0",
              }}
            >
              <StyledLink to="/" style={{ marginTop: "8px", color: "#424242" }}>
                비밀번호를 잊어버리셨나요?
              </StyledLink>
            </div>
            <StyledButton
              type="submit"
              style={{ marginTop: "45px", marginBottom: "10px" }}
            >
              <span>로그인</span>
            </StyledButton>
            <Link
              to="/signup"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <StyledButton type="submit">
                <span>회원가입</span>
              </StyledButton>
            </Link>
          </form>
          {/* <FooterParagraph>
						회원이 아니신가요? <Link to="/signup">회원가입</Link>
					</FooterParagraph> */}
        </Paper>
      </FormWrapper>
      <ImgWrapper>
        <img src={authImage} style={{ maxWidth: "45vw", maxHeight: "100vh" }} />
      </ImgWrapper>
    </Container>
  );
}
