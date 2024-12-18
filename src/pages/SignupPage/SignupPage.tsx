import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import

import authImage from "../../images/AuthImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";
import LockPasswordIcon from "../../icons/lock-password-stroke-rounded.svg";
import SmartphoneIcon from "../../icons/smart-phone-01-stroke-rounded.svg";
import AuthInput from "../../components/AuthInput";
import CalendarIcon from "../../images/signup_calendar.png";
import ModalManager, {
  ModalManagerType,
} from "../../components/Modals/ModalManager";

import {
  Container,
  Paper,
  ImgWrapper,
  FormWrapper,
  InputsWrapper,
  StyledButton,
  FooterParagraph,
  AgreementCheckWrapper,
} from "./styles";
import { off } from "process";

export default function SignupPage() {
  const navigate = useNavigate(); // useNavigate hook
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const birthInputRef = useRef<HTMLInputElement | null>(null);
  const modalManagerRef = useRef<ModalManagerType>(null);

  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordError, setPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    modalManagerRef.current?.openModal("이용약관");
  };

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const isConfirmed = window.confirm("이용약관을 읽고 진행해주세요.");

      if (isConfirmed) {
        handleOpenModal();
      } else {
        e.preventDefault();
        e.target.checked = false;
      }
    } else {
      setIsAgreed(false);
    }
  };

  const today = new Date();
  const maxDate = today.toISOString().split("T")[0]; // 오늘
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0]; // 100년 전

  const handlePasswordChange = () => {
    const password = passwordInputRef.current?.value;
    const confirmPassword = passwordConfirmRef.current?.value;

    if (confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordMatch(false);
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordMatch(true);
        setPasswordError("");
      }
    } else {
      setPasswordMatch(true);
      setPasswordError("");
    }
  };

  const handleSignup = async (signupData: {
    identifier: string;
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    birth: string;
  }) => {
    try {
      const params = new URLSearchParams({
        identifier: signupData.identifier,
        email: signupData.email,
        password: signupData.password,
        name: signupData.name,
        confirmPassword: signupData.confirmPassword,
        birth: signupData.birth,
      });

      const response = await fetch(
        `http://localhost:9090/api/auth/signup?${params.toString()}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameInputRef.current?.value?.trim();
    const identifier = idInputRef.current?.value?.trim();
    const email = emailInputRef.current?.value?.trim();
    const password = passwordInputRef.current?.value?.trim();
    const confirmPassword = passwordConfirmRef.current?.value?.trim();
    const birth = birthInputRef.current?.value;

    // 입력값 검증
    if (
      !name ||
      !identifier ||
      !email ||
      !password ||
      !confirmPassword ||
      !birth
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!passwordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isAgreed) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    // API 호출
    setIsLoading(true);
    try {
      await handleSignup({
        identifier,
        email,
        password,
        name,
        confirmPassword,
        birth,
      });

      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailCheck = () => {
    const email = emailInputRef.current?.value?.trim();
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // 여기에 이메일 중복 확인 로직 구현
    alert("이메일 중복 확인이 필요합니다.");
  };

  const handleIdCheck = () => {
    const id = idInputRef.current?.value?.trim();
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }
    // 여기에 아이디 중복 확인 로직 구현
    alert("아이디 중복 확인이 필요합니다.");
  };

  return (
    <Container>
      <ImgWrapper>
        <img
          src={authImage}
          alt="auth-money-image"
          style={{
            marginLeft: "100px",
            maxWidth: "45vw",
            maxHeight: "100vh",
          }}
        />
      </ImgWrapper>
      <FormWrapper>
        <Paper style={{ height: "auto", marginRight: "30px" }}>
          <h2 style={{ marginTop: "0px" }}>하나와 함께 부자가 되는 습관</h2>
          <h1>하나 리치</h1>
          <form onSubmit={handleSubmit}>
            <InputsWrapper>
              <AuthInput
                labelName="이름"
                placeholder="이름을 입력해주세요."
                name="name"
                autoComplete="username"
                startIcon={<img src={EmailIcon} alt="email icon" />}
                ref={nameInputRef}
              />
              <AuthInput
                labelName="이메일"
                placeholder="이메일을 입력해주세요."
                name="email"
                autoComplete="email"
                startIcon={<img src={EmailIcon} alt="email icon" />}
                ref={emailInputRef}
                showCheckButton
                onCheck={handleEmailCheck}
              />
              <AuthInput
                labelName="아이디"
                placeholder="아이디를 입력해주세요."
                name="id"
                autoComplete="userid"
                startIcon={<img src={EmailIcon} alt="email icon" />}
                ref={idInputRef}
                showCheckButton
                onCheck={handleIdCheck}
              />
              <div>
                <AuthInput
                  labelName="비밀번호"
                  placeholder="비밀번호를 입력해주세요."
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  startIcon={
                    <img src={LockPasswordIcon} alt="lock-password icon" />
                  }
                  ref={passwordInputRef}
                  onChange={handlePasswordChange}
                />
                <div style={{ marginTop: "16px" }}>
                  <AuthInput
                    labelName="비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    name="password-confirm"
                    type="password"
                    autoComplete="new-password"
                    startIcon={
                      <img src={LockPasswordIcon} alt="lock-password icon" />
                    }
                    ref={passwordConfirmRef}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        marginLeft: "16px",
                      }}
                    >
                      {passwordError}
                    </div>
                  )}
                </div>
              </div>
              <AuthInput
                labelName="생년월일"
                placeholder="생년월일을 선택해주세요"
                name="birth"
                type="date"
                autoComplete="bday"
                startIcon={<img src={SmartphoneIcon} alt="smartphone icon" />}
                ref={birthInputRef}
                min={minDate}
                max={maxDate}
              />
            </InputsWrapper>
            <AgreementCheckWrapper
              style={{ marginTop: "10px", marginBottom: "5px" }}
            >
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={handleCheckBox}
              />
              <label>
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={handleOpenModal}
                >
                  이용약관
                </span>
                에 동의합니다.
              </label>
              <ModalManager
                ref={modalManagerRef}
                setIsAgreed={setIsAgreed}
                isAgreed={isAgreed}
              />
            </AgreementCheckWrapper>
            <StyledButton
              type="submit"
              disabled={isLoading}
              style={{
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "처리중..." : "회원가입"}
            </StyledButton>
          </form>
          <FooterParagraph style={{ fontSize: "14px" }}>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </FooterParagraph>
        </Paper>
      </FormWrapper>
    </Container>
  );
}
