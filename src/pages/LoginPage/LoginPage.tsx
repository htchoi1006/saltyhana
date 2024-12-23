import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  ImgWrapper,
  Paper,
  FormWrapper,
  InputsWrapper,
  StyledButton,
} from "../SignupPage/styles";
import { StyledLink } from "./styles";
import authImage from "../../images/AuthImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";
import LockPasswordIcon from "../../icons/lock-password-stroke-rounded.svg";
import AuthInput from "../../components/AuthInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginApi = async (loginData: {
    identifier: string;
    password: string;
  }) => {
    try {
      const params = new URLSearchParams({
        identifier: loginData.identifier,
        password: loginData.password,
      });

      const response = await fetch(
        `http://localhost:9090/api/auth/login?${params.toString()}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        // 서버에서 보낸 에러 메시지를 파싱
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "아이디 또는 비밀번호가 일치하지 않습니다.";
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifier = idInputRef.current?.value?.trim();
    const password = passwordInputRef.current?.value;

    // 입력값 검증
    if (!identifier || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await handleLoginApi({
        identifier,
        password,
      });

      // 로그인 성공 시 사용자 정보 저장
      const userInfo = {
        identifier,
        isLoggedIn: true,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Paper style={{ height: "560px" }}>
          <h2 style={{ marginTop: "40px" }}>하나와 함께 부자가 되는 습관</h2>
          <h1>하나 리치</h1>
          <form onSubmit={handleLogin}>
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
              style={{
                marginTop: "45px",
                marginBottom: "10px",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
              disabled={isLoading}
            >
              <span>{isLoading ? "로그인 중..." : "로그인"}</span>
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
        </Paper>
      </FormWrapper>
      <ImgWrapper>
        <img src={authImage} style={{ maxWidth: "45vw", maxHeight: "100vh" }} />
      </ImgWrapper>
    </Container>
  );
}
