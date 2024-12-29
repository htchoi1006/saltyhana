import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  ImgWrapper,
  Paper,
  FormWrapper,
  InputsWrapper,
  StyledButton,
  ForgotPasswordButton,
} from "../SignupPage/styles";
import authImage from "../../images/AuthImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";
import LockPasswordIcon from "../../icons/lock-password-stroke-rounded.svg";
import AuthInput from "../../components/AuthInput";

export default function LoginPage() {
  const navigate = useNavigate();
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  const getUserNameApi = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/me/simple`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        throw new Error("사용자 정보를 가져오는 중 문제가 발생하였습니다.");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

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
        `${process.env.REACT_APP_API_URL}/auth/login?${params.toString()}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인으로 돌아가기 버튼 클릭시는 검증 스킵
    if (
      (e as any).nativeEvent?.submitter?.innerText === "로그인으로 돌아가기"
    ) {
      return;
    }

    const email = emailInputRef.current?.value?.trim();

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/password/change?email=${email}`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "임시 비밀번호 발급에 실패했습니다.",
        );
      }

      alert("임시 비밀번호가 이메일로 전송되었습니다.");
      setIsResetMode(false); // 로그인 폼으로 돌아가기
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("임시 비밀번호 발급 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const identifier = idInputRef.current?.value?.trim();
    const password = passwordInputRef.current?.value;

    if (!identifier || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const loginResponse = await handleLoginApi({
        identifier,
        password,
      });

      const userInfo = {
        identifier,
        isLoggedIn: true,
        accessToken: loginResponse.accessToken,
        refreshToken: loginResponse.refreshToken,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", loginResponse.accessToken);
      localStorage.setItem("refreshToken", loginResponse.refreshToken);

      const response = await getUserNameApi();

      if (response.name) {
        localStorage.setItem("name", response.name);
      }

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
          {isResetMode ? (
            // 비밀번호 재설정 폼
            <form onSubmit={handleResetPassword}>
              <InputsWrapper>
                <div
                  style={{
                    marginTop: "40px",
                    marginBottom: "30px",
                  }}
                >
                  <h3
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#424242",
                    }}
                  >
                    임시 비밀번호를 받을 이메일을 입력하세요
                  </h3>
                </div>
                <AuthInput
                  labelName="이메일"
                  placeholder="이메일을 입력해주세요."
                  name="email"
                  autoComplete="email"
                  startIcon={<img src={EmailIcon} alt="email icon" />}
                  ref={emailInputRef}
                />
              </InputsWrapper>
              <StyledButton
                type="submit"
                style={{
                  fontFamily: "Noto Sans KR",
                  marginTop: "45px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: 1, // 버튼이 항상 보이도록 설정
                  animation: "none",
                }}
                disabled={isLoading}
              >
                <span>{isLoading ? "전송 중..." : "임시 비밀번호 전송"}</span>
              </StyledButton>

              <StyledButton
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResetMode(false);
                }}
                style={{
                  fontFamily: "Noto Sans KR",
                  marginTop: "10px",
                  backgroundColor: "#ffffff",
                  color: "#00857E",
                  border: "1px solid #00857E",
                }}
              >
                <span>로그인으로 돌아가기</span>
              </StyledButton>
            </form>
          ) : (
            // 로그인 폼
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
                  autoComplete="current-password"
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
                <ForgotPasswordButton
                  type="button"
                  onClick={() => setIsResetMode(true)}
                >
                  비밀번호를 잊어버리셨나요?
                </ForgotPasswordButton>
              </div>

              <StyledButton
                type="submit"
                style={{
                  marginTop: "45px",
                  marginBottom: "10px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                }}
                disabled={isLoading}
              >
                <span>{isLoading ? "로그인 중..." : "로그인"}</span>
              </StyledButton>

              <Link
                to="/signup"
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
              >
                <StyledButton
                  type="button"
                  style={{
                    animationDelay: "1.1s", // 회원가입 버튼에 1.2초 딜레이
                  }}
                >
                  <span>회원가입</span>
                </StyledButton>
              </Link>
            </form>
          )}
        </Paper>
      </FormWrapper>
      <ImgWrapper>
        <img
          src={authImage}
          style={{ maxWidth: "45vw", maxHeight: "100vh" }}
          alt="auth"
        />
      </ImgWrapper>
    </Container>
  );
}
