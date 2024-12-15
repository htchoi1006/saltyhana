import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate import

import authImage from "../../images/AuthImg.png";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";
import LockPasswordIcon from "../../icons/lock-password-stroke-rounded.svg";
import SmartphoneIcon from "../../icons/smart-phone-01-stroke-rounded.svg";
import AuthInput from "../../components/AuthInput";
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
  const birthInputRef = useRef<HTMLInputElement | null>(null);
  const modalManagerRef = useRef<ModalManagerType>(null);
  const [isAgreed, setIsAgreed] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = idInputRef.current?.value?.trim();
    const id = idInputRef.current?.value?.trim();
    const email = emailInputRef.current?.value?.trim();
    const password = passwordInputRef.current?.value?.trim();
    const birth = birthInputRef.current?.value?.trim();

    // 입력값 검증
    if (!id || !email || !password || !birth) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!isAgreed) {
      alert("이용약관에 동의해주세요.");
      return;
    }

    // 입력값이 모두 유효하면 로그인 페이지로 라우팅
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
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
          <h2 style={{ marginTop: "40px" }}>하나와 함께 부자가 되는 습관</h2>
          <h1>하나 리치</h1>
          <form onSubmit={handleSubmit}>
            <InputsWrapper>
              <AuthInput
                labelName="이름"
                placeholder="이름을 입력해주세요."
                name="name"
                autoComplete="off"
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
              />
              <AuthInput
                labelName="생년월일"
                placeholder="생년월일을 입력해주세요. (YYYYMMDD)"
                name="birth"
                autoComplete="off"
                startIcon={<img src={SmartphoneIcon} alt="smartphone icon" />}
                ref={birthInputRef}
              />
            </InputsWrapper>
            <AgreementCheckWrapper
              style={{ marginTop: "10px", marginBottom: "45px" }}
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
                  onClick={handleOpenModal} // 클릭 시 이용약관 모달 열기
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
            <StyledButton type="submit">회원가입</StyledButton>
          </form>
          <FooterParagraph style={{ fontSize: "14px" }}>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </FooterParagraph>
        </Paper>
      </FormWrapper>
    </Container>
  );
}
