// import styled from "styled-components";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as styled from "./styles";
import profileImg from "../../images/mypage_profileImg.png";
import { InputsWrapper } from "../SignupPage/styles";
import AuthInput from "../../components/AuthInput";
import EmailIcon from "../../icons/mail-02-stroke-rounded.svg";

const MyPage: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    id: "test1234",
    birth: "1999.10.06",
    password: "",
  });

  interface Props {
    labelName: string;
    value: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onSave?: (newValue: string) => void;
  }

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (field: keyof typeof userInfo) => (newValue: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      try {
        setIsUploading(true);
        // 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result as string);
            // 여기에서 실제 서버로의 업로드 로직을 추가할 수 있습니다
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload error:", error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleImageDelete = () => {
    if (window.confirm("프로필 이미지를 삭제하시겠습니까?")) {
      setProfileImage(null);
      // 여기에서 서버의 이미지도 삭제하는 API를 호출할 수 있습니다
    }
  };

  const AuthDisplay: React.FC<Props> = ({
    labelName,
    value,
    startIcon,
    endIcon,
    onSave,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      if (onSave) {
        onSave(editValue);
      }
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    return (
      <label>
        <div>
          <styled.InputLabel>{labelName}</styled.InputLabel>
        </div>
        <styled.DisplayWrapper>
          {startIcon && <div>{startIcon}</div>}
          {isEditing ? (
            <>
              <styled.EditInput
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
              <styled.Button className="cancel" onClick={handleCancel}>
                취소
              </styled.Button>
              <styled.Button onClick={handleSave}>저장</styled.Button>
            </>
          ) : (
            <>
              <styled.DisplayText>{value}</styled.DisplayText>
              <styled.Button onClick={() => setIsEditing(true)}>
                변경
              </styled.Button>
            </>
          )}
          {endIcon && <div>{endIcon}</div>}
        </styled.DisplayWrapper>
      </label>
    );
  };

  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 비밀번호 확인 검증
    if (name === "confirmPassword") {
      if (value !== passwordInfo.newPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
    if (name === "newPassword" && passwordInfo.confirmPassword) {
      if (value !== passwordInfo.confirmPassword) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }
  };

  // 비밀번호 저장 핸들러
  const handlePasswordSave = () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwordInfo.newPassword.length < 1) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }
    setPasswordError("");
  };

  // 새로운 비밀번호 컴포넌트
  const PasswordInputs = () => {
    return (
      <styled.PasswordSection>
        <label>
          <div>
            <styled.InputLabel>비밀번호</styled.InputLabel>
          </div>
          <styled.DisplayWrapper>
            <img src={EmailIcon} alt="password icon" />
            <styled.EditInput
              type="password"
              name="newPassword"
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
              placeholder="새 비밀번호 입력"
            />
          </styled.DisplayWrapper>
        </label>

        <label>
          <div>
            <styled.InputLabel>비밀번호 확인</styled.InputLabel>
          </div>
          <styled.DisplayWrapper>
            <img src={EmailIcon} alt="password icon" />
            <styled.EditInput
              type="password"
              name="confirmPassword"
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="비밀번호 확인"
            />
          </styled.DisplayWrapper>
        </label>

        {passwordError && (
          <styled.ErrorMessage>{passwordError}</styled.ErrorMessage>
        )}

        <styled.ButtonWrapper>
          <styled.Button onClick={handlePasswordSave}>
            비밀번호 변경
          </styled.Button>
        </styled.ButtonWrapper>
      </styled.PasswordSection>
    );
  };

  return (
    <styled.Container>
      <styled.ProfileSection>
        <styled.ProfileImgDiv>
          {profileImage ? (
            <>
              <styled.ProfileImg src={profileImage} alt="Profile" />
              <styled.ImageOverlay>
                <styled.OverlayButton onClick={handleImageClick}>
                  이미지 변경
                </styled.OverlayButton>
                <styled.OverlayButton onClick={handleImageDelete}>
                  이미지 삭제
                </styled.OverlayButton>
              </styled.ImageOverlay>
            </>
          ) : (
            <>
              <styled.DefaultProfileImg />
              <styled.ImageOverlay>
                <styled.SingleOverlayButton onClick={handleImageClick}>
                  이미지 등록
                </styled.SingleOverlayButton>
              </styled.ImageOverlay>
            </>
          )}
        </styled.ProfileImgDiv>
        <styled.HiddenInput
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
        />
      </styled.ProfileSection>

      <styled.NameDiv>
        <span>최혁태</span>
      </styled.NameDiv>
      <styled.InputContainer>
        <styled.InputWrapper>
          <AuthDisplay
            labelName="이메일"
            value={userInfo.email}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("email")}
          />
          <AuthDisplay
            labelName="아이디"
            value={userInfo.id}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("id")}
          />
          <AuthDisplay
            labelName="생년월일"
            value={userInfo.birth}
            startIcon={<img src={EmailIcon} alt="email icon" />}
            onSave={handleSave("birth")}
          />
          <PasswordInputs />
        </styled.InputWrapper>
      </styled.InputContainer>
    </styled.Container>
  );
};

export default MyPage;
